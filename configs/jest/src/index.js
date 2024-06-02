/** @type {import('jest').Config} */
const config = {
  moduleNameMapper: {
    "^.+\\.(css|less|scss)$": "babel-jest",
  },
  testEnvironment: "jsdom",
  coverageReporters: ["json-summary", "text", "lcov"],
};

module.exports = config;
