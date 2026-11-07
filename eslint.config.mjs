import js from "@eslint/js";

export default [
    js.configs.recommended,
    {
        languageOptions: {
            globals: {
                window: "readonly",
                document: "readonly",
                console: "readonly",
                XMLHttpRequest: "readonly",
                module: "readonly"
            }
        },
        rules: {
            "no-unused-vars": "warn"
        }
    }
];
