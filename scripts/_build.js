const fs = require("fs");
const { exec } = require("child_process");

fs.chmod("scripts/_build.sh", 0o775, (error) => {
  if (error) {
    throw error;
  }
  console.log("success: chmod +x _build.sh");
});

exec("scripts/_build.sh", (error) => {
  if (error) {
    throw error;
  }
  console.log("success: npm run build");
});
