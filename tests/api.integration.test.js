/* global require, __dirname, process, fetch, setTimeout */
const assert = require("node:assert/strict");
const {spawn} = require("node:child_process");
const net = require("node:net");
const path = require("node:path");
const {test} = require("node:test");

const projectRoot = path.resolve(__dirname, "..");

function delay(milliseconds)
{
	return new Promise(resolve => setTimeout(resolve, milliseconds));
}

function findAvailablePort()
{
	return new Promise((resolve, reject) =>
	{
		const server = net.createServer();
		server.once("error", reject);
		server.listen(0, "127.0.0.1", () =>
		{
			const {port} = server.address();
			server.close(error =>
			{
				if( error )
				{
					reject(error);
					return;
				}

				resolve(port);
			});
		});
	});
}

function isServerReady(port)
{
	return new Promise(resolve =>
	{
		const socket = net.createConnection({host: "127.0.0.1", port});
		socket.once("connect", () =>
		{
			socket.destroy();
			resolve(true);
		});
		socket.once("error", () => resolve(false));
	});
}

async function waitForServer(server, port)
{
	let startupError;
	server.once("error", error =>
	{
		startupError = error;
	});

	for( let attempt = 0; attempt < 50; attempt++ )
	{
		if( startupError )
		{
			throw startupError;
		}
		if( server.exitCode !== null )
		{
			throw new Error(`PHP server exited with code ${server.exitCode}`);
		}
		if( await isServerReady(port) )
		{
			return;
		}
		await delay(100);
	}

	throw new Error("PHP server did not start within 5 seconds");
}

test("Login API responds with its documented JSON fields", {timeout: 20000}, async () =>
{
	const port = await findAvailablePort();
	const server = spawn("php", ["-S", `127.0.0.1:${port}`, "-t", projectRoot], {
		cwd: projectRoot,
		env: {
			...process.env,
			DB_HOST: "",
			DB_USER: "",
			DB_PASS: "",
			DB_NAME: ""
		},
		stdio: "ignore"
	});

	try
	{
		await waitForServer(server, port);
		const response = await fetch(`http://127.0.0.1:${port}/api/Login.php`, {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({login: "test-user", password: "test-password"})
		});

		assert.equal(response.status, 200);
		const responseText = await response.text();
		assert.match(response.headers.get("content-type"), /application\/json/i, responseText);

		const body = JSON.parse(responseText);
		assert.deepEqual(Object.keys(body).sort(), ["error", "firstName", "id", "lastName"]);
		assert.equal(body.id, 0);
		assert.equal(body.error, "Database configuration is missing. Set DB_USER and DB_PASS in the environment.");
	}
	finally
	{
		if( server.exitCode === null )
		{
			const exited = new Promise(resolve => server.once("exit", resolve));
			server.kill();
			await exited;
		}
	}
});
