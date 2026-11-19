import { expect, test } from "bun:test";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

// A model field may be named `list` or `dict`; the container types must stay unambiguous.
function* walk(dir: string): Generator<string> {
  for (const name of readdirSync(dir)) {
    if (name === "node_modules") continue;
    const path = join(dir, name);
    if (statSync(path).isDirectory()) yield* walk(path);
    else yield path;
  }
}

test("python model templates qualify list and dict through builtins", () => {
  for (const file of walk("packs")) {
    if (!/[/\\]\{(model|generic|row)\}[/\\].*\.py\.j2$/.test(file)) continue;
    const text = readFileSync(file, "utf8");
    expect(text.replace(/builtins\.(list|dict)\[/g, "")).not.toMatch(/(?<![\w.])(list|dict)\[/);
  }
});
