const isColorNameValid = require("../public/js/colorValidation");

describe("isColorNameValid", () => {
	test("accepts a non-empty color name", () => {
		expect(isColorNameValid("Blue")).toBe(true);
	});

	test("rejects empty or whitespace-only names", () => {
		expect(isColorNameValid("")).toBe(false);
		expect(isColorNameValid("   ")).toBe(false);
	});

	test("rejects values that are not strings", () => {
		expect(isColorNameValid(null)).toBe(false);
		expect(isColorNameValid(42)).toBe(false);
	});
});
