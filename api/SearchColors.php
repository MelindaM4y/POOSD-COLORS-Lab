<?php

	$inData = getRequestInfo();
	
	$searchResults = "";
	$searchCount = 0;

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
			returnWithError( $conn->connect_error );
		} 
		else
		{
			$stmt = $conn->prepare("select Name from Colors where Name like ? and UserID=?");
			$colorName = "%" . $inData["search"] . "%";
			$stmt->bind_param("ss", $colorName, $inData["userId"]);
			$stmt->execute();
			
			$result = $stmt->get_result();
			
			while($row = $result->fetch_assoc())
			{
				if( $searchCount > 0 )
				{
					$searchResults .= ",";
				}
				$searchCount++;
				$searchResults .= '"' . $row["Name"] . '"';
			}
			
			if( $searchCount == 0 )
			{
				returnWithError( "No Records Found" );
			}
			else
			{
				returnWithInfo( $searchResults );
			}
			
			$stmt->close();
			$conn->close();
		}
	}


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
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $searchResults )
	{
		$retValue = '{"results":[' . $searchResults . '],"error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>