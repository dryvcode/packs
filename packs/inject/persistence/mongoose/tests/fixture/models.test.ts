import "reflect-metadata";
import { describe, expect, test } from "bun:test";
import { model } from "mongoose";

import {
  CartItemModel,
  CartItemModelSchema,
  CartModel,
  CartModelSchema,
  CartStatus,
} from "./out/index.ts";

const Cart = model(CartModel.name, CartModelSchema);
const CartItem = model(CartItemModel.name, CartItemModelSchema);

const validItem = {
  cartId: "1b4e28ba-2fa1-11d2-883f-0016d3cca427",
  title: "Coffee",
  quantity: 2,
  unitPrice: 350,
  totalPrice: 700,
};

describe("generated Mongoose models", () => {
  test("map storage names to collections", () => {
    expect(CartModelSchema.get("collection")).toBe("carts");
    expect(CartItemModelSchema.get("collection")).toBe("cart_items");
  });

  test("type paths from semantic properties", () => {
    expect(CartItemModelSchema.path("title")).toMatchObject({ instance: "String" });
    expect(CartItemModelSchema.path("quantity")).toMatchObject({ instance: "Number" });
    expect(CartModelSchema.path("createdAt")).toMatchObject({ instance: "Date" });
    expect(CartModelSchema.path("status").options.enum).toEqual(Object.values(CartStatus));
    expect(CartModelSchema.path("status").options.default).toBe("active");
  });

  test("system uuid primary keys become string _id with a default", () => {
    expect(CartItemModelSchema.path("_id")).toMatchObject({ instance: "String" });
    expect(typeof new CartItem(validItem)._id).toBe("string");
  });

  test("references store the target id", () => {
    expect(CartItemModelSchema.path("cartId").options).toMatchObject({ ref: "CartModel" });
  });

  test("storage indexes become schema indexes", () => {
    expect(CartItemModelSchema.indexes()).toContainEqual([
      { cartId: 1, title: 1 },
      expect.objectContaining({ name: "cart_items_cart_title", unique: true }),
    ]);
  });

  test("a valid document passes validation", async () => {
    await expect(new CartItem(validItem).validate()).resolves.toBeUndefined();
    await expect(new Cart({ createdAt: new Date() }).validate()).resolves.toBeUndefined();
  });

  test("field limits are enforced", async () => {
    await expect(new CartItem({ ...validItem, title: "" }).validate()).rejects.toThrow();
    await expect(new CartItem({ ...validItem, quantity: 1000 }).validate()).rejects.toThrow();
    await expect(new CartItem({ ...validItem, quantity: 1.5 }).validate()).rejects.toThrow("integer");
    await expect(new Cart({ createdAt: new Date(), status: "lost" }).validate()).rejects.toThrow();
  });

  test("required fields are required", async () => {
    const { title: _title, ...missing } = validItem;
    await expect(new CartItem(missing).validate()).rejects.toThrow("title");
  });

  test("invariants are checked before validation", async () => {
    await expect(new CartItem({ ...validItem, totalPrice: 1 }).validate()).rejects.toThrow("Total Matches");
  });
});
