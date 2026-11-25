console.error("This legacy script has been disabled because it contained fixed credentials.");
console.error("Set ADMIN_NAME, ADMIN_EMAIL, and ADMIN_PASSWORD in the ignored Backend/.env file, then run npm run seed:admin.");
process.exitCode = 1;
