module.exports = {
    bail: true,
    collectCoverageFrom: ["**/*.js", "!**/node_modules/**"],
    collectCoverage: true,
    coverageDirectory: "./coverage",
    coveragePathIgnorePatterns: ["./node_modules", "./coverage", "./dist", "./build", "./test", "./*.config.*"],
    coverageThreshold: {
        "./src/": {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100
        }
    },
    notify: true,
    verbose: true
};
