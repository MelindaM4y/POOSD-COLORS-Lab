import js from "@eslint/js";
import globals from "globals";

export default [
	js.configs.recommended,
	{
		files: ["public/js/**/*.js"],
		languageOptions: {
			sourceType: "script",
		},
	},
	{
		files: ["public/js/code.js"],
		languageOptions: {
			globals: {
				...globals.browser,
				isColorNameValid: "readonly",
			},
		},
	},
	{
		files: ["public/js/colorValidation.js"],
		languageOptions: {
			globals: {
				window: "readonly",
				module: "readonly",
			},
		},
	},
	{
		files: ["tests/**/*.js"],
		languageOptions: {
			globals: {
				...globals.node,
				...globals.jest,
			},
		},
	},
];
