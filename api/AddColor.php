<?php
	$inData = getRequestInfo();

	$id = 0;
	$firstName = "";
	$lastName = "";

	$dbHost = getenv("DB_HOST") ?: $_ENV["DB_HOST"] ?? "localhost";
	$dbUser = getenv("DB_USER") ?: $_ENV["DB_USER"] ?? "";
	$dbPass = getenv("DB_PASS") ?: $_ENV["DB_PASS"] ?? "";
	$dbName = getenv("DB_NAME") ?: $_ENV["DB_NAME"] ?? "COP4331";

	if ($dbUser === "" || $dbPass === "")
	{
		returnWithError("Database configuration is missing. Set DB_USER and DB_PASS in the environment.");
	}
	else
	{
		$conn = new mysqli($dbHost, $dbUser, $dbPass, $dbName);
		if ($conn->connect_error)
		{
			returnWithError($conn->connect_error);
		}
		else
		{
			$stmt = $conn->prepare("INSERT into Colors (UserId,Name) VALUES(?,?)");
			$stmt->bind_param("ss", $userId, $color);
			$stmt->execute();
			$stmt->close();
			$conn->close();
		}
	}
	
	returnWithError("");

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>