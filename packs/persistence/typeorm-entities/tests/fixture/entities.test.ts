import "reflect-metadata";
import { describe, expect, test } from "bun:test";
import { getMetadataArgsStorage } from "typeorm";

import { CartEntity, CartItemEntity } from "./out/src/index.ts";

const storage = getMetadataArgsStorage();
const table = (target: Function) => storage.tables.find((item) => item.target === target);
const columns = (target: Function) =>
  storage.columns.filter((item) => item.target === target);

describe("generated TypeORM entities", () => {
  test("map storage name and namespace", () => {
    expect(table(CartItemEntity)).toMatchObject({ name: "cart_items", schema: "commerce" });
    expect(table(CartEntity)).toMatchObject({ name: "carts", schema: "commerce" });
  });

  test("type columns from semantic properties", () => {
    const byProperty = Object.fromEntries(
      columns(CartItemEntity).map((item) => [item.propertyName, item.options]),
    );
    expect(byProperty.id).toMatchObject({ name: "id" });
    expect(byProperty.cartId).toMatchObject({ name: "cart_id", type: "uuid" });
    expect(byProperty.title).toMatchObject({ name: "title", type: "varchar", length: 120 });
    expect(byProperty.quantity).toMatchObject({ type: "integer" });
    expect(byProperty.unitPrice).toMatchObject({ name: "unit_price", type: "bigint" });
    expect(byProperty.metadata).toMatchObject({ type: "jsonb", nullable: true });

    const cart = Object.fromEntries(
      columns(CartEntity).map((item) => [item.propertyName, item.options]),
    );
    expect(cart.status).toMatchObject({ type: "enum", default: "active" });
    expect(cart.discountRate).toMatchObject({ type: "numeric", precision: 5, scale: 2 });
    expect(cart.createdAt).toMatchObject({ type: "timestamptz" });
  });

  test("turn invariants into checks and storage indexes into indexes", () => {
    const checks = storage.checks
      .filter((item) => item.target === CartItemEntity)
      .map((item) => item.expression);
    expect(checks).toContain("quantity > 0");
    expect(checks).toContain("total_price = (unit_price * quantity)");

    const indexes = storage.indices.filter((item) => item.target === CartItemEntity);
    expect(indexes.find((item) => item.name === "cart_items_cart_title")).toMatchObject({
      unique: true,
    });
  });

  test("relate both sides", () => {
    const relations = storage.relations.filter(
      (item) => item.target === CartItemEntity || item.target === CartEntity,
    );
    expect(
      relations.map((item) => [item.propertyName, item.relationType, item.options.onDelete]),
    ).toEqual(
      expect.arrayContaining([
        ["cart", "many-to-one", "CASCADE"],
        ["items", "one-to-many", undefined],
      ]),
    );
  });
});
