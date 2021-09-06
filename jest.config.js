module.exports = {
  preset: '@shelf/jest-mongodb',
  moduleFileExtensions: ["js", "json"],
  coverageProvider: "v8",
  coverageDirectory: "coverage",
  testMatch: ["**/__tests__/**/.js", "**/*.*spec.js"],
  testTimeout: 20000,
  clearMocks: true,
}