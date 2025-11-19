import { describe, it, expect } from "vitest";
import { slugify } from "./string";

describe("slugify", () => {
  it.each([
    ["Hello World", "hello-world"],
    ["  Leading and trailing spaces  ", "leading-and-trailing-spaces"],
    ["Special!@#Characters$$%", "specialcharacters"],
    ["Multiple   Spaces", "multiple-spaces"],
    ["Mixed CASE Input", "mixed-case-input"],
    ["Esperança", "esperanca"],
    ["Paraíso", "paraiso"],
    ["Route 66", "route-66"],
    ["Watchpoint: Gibraltar", "watchpoint-gibraltar"],
  ])('slugify("%s") should return "%s"', (input, expected) => {
    expect(slugify(input)).toBe(expected);
  });
});
