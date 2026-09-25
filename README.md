# POOSD-COLORS-Lab

The COLORS application is a simple LAMP-stack web app that lets users log in and manage a personal list of colors. After signing in, users can search for colors and add new ones to their account-specific list.

## Technologies used

- Apache
- PHP
- MySQL
- HTML
- CSS
- JavaScript

## High-level setup instructions

1. Install Apache, PHP, and MySQL on your local or lab server.
2. Create a MySQL database named `COP4331`.
3. Create the required tables for the app:
   - `Users` with fields such as `ID`, `Login`, `Password`, `firstName`, and `lastName`
   - `Colors` with fields such as `ID`, `UserId`, and `Name`
4. Configure the PHP database connection using environment variables such as `DB_HOST`, `DB_USER`, `DB_PASS`, and `DB_NAME`.
5. Place the project files in your web server directory so the app can be served from the browser.

## How to run and access the application

1. Start your Apache server.
2. Open the app in a browser using your local server URL, for example:
   - `http://localhost/POOSD-COLORS-Lab/index.html`
3. Log in on the main page.
4. After login, use the color page to search for colors or add a new one to your list.

## Assumptions and limitations

- The app assumes a basic LAMP environment and a MySQL database is available.
- Database credentials and server-specific configuration are not stored in the repository and should be provided via environment variables.
- The project is designed for a simple single-server setup and does not include production-level security, scaling, or deployment automation.

## AI Assistance

- **Tool**: GitHub Copilot (Microsoft, github.com/copilot)
- **Dates**: September 25, 2026
- **Scope**: Updating README content, and aligning the documentation with the current codebase.
- **Use**: Documentation review

All AI-assisted suggestions were reviewed, validated, and adjusted to match the actual project implementation.