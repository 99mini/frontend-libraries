const fs = require("fs");
const { exec } = require("child_process");
const { dirname } = require("path");

fs.chmod(`${dirname(require.main.filename)}/postinstall.sh`, 0o775, (error) => {
  if (error) {
    throw error;
  }
  console.log("success: chmod +x postinstall");
});

exec(`${dirname(require.main.filename)}/postinstall.sh`, (error) => {
  if (error) {
    throw error;
  }
  console.log("success: npm run postinstall");
});
