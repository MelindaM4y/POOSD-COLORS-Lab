function isColorNameValid(value)
{
	return typeof value === "string" && value.trim().length > 0;
}

if( typeof module === "object" && module.exports )
{
	module.exports = isColorNameValid;
}
else
{
	window.isColorNameValid = isColorNameValid;
}
