const { spawnSync } = require("node:child_process");
const path = require("node:path");

describe("SearchColors API", () => {
	test("returns the JSON error shape when database configuration is missing", () => {
		const projectRoot = path.resolve(__dirname, "..");
		const result = spawnSync(
			"php",
			[path.join(projectRoot, "api", "SearchColors.php")],
			{
				cwd: projectRoot,
				encoding: "utf8",
				env: {
					...process.env,
					DB_HOST: "",
					DB_USER: "",
					DB_PASS: "",
					DB_NAME: "",
				},
			},
		);

		if (result.error) {
			throw result.error;
		}

		expect(result.status).toBe(0);
		expect(result.stderr).toBe("");
		expect(JSON.parse(result.stdout)).toEqual({
			id: 0,
			firstName: "",
			lastName: "",
			error: "Database configuration is missing. Set DB_USER and DB_PASS in the environment.",
		});
	});
});
