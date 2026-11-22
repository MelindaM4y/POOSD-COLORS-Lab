/* global require, __dirname */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const {test} = require("node:test");
const vm = require("node:vm");
const path = require("node:path");

const validationScript = fs.readFileSync(
	path.join(__dirname, "..", "public", "js", "colorValidation.js"),
	"utf8"
);
const browser = {window: {}};
vm.runInNewContext(validationScript, browser);
const {isValidColorName} = browser.window;

test("accepts non-empty color names", () =>
{
	assert.equal(isValidColorName("blue"), true);
	assert.equal(isValidColorName("  blue  "), true);
});

test("rejects empty or non-string color names", () =>
{
	assert.equal(isValidColorName(""), false);
	assert.equal(isValidColorName("   "), false);
	assert.equal(isValidColorName(null), false);
});
