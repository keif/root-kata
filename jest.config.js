module.exports = {
    bail: false,
    collectCoverageFrom: ["**/*.js", "!**/node_modules/**"],
    collectCoverage: true,
    coverageDirectory: "./coverage",
    coveragePathIgnorePatterns: ["./node_modules", "./coverage", "./dist", "./build", "./test", "./*.config.*"],
    coverageThreshold: {
        "./src/": {
            branches: [85, 92],
            functions: [90, 97],
            lines: [90, 97],
            statements: [90, 97]
        }
    },
    modulePathIgnorePatterns: ["./src/main.js", "./src/core/*"],
    notify: true,
    verbose: true
};
