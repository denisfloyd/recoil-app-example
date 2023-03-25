module.exports = {
  setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.ts'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
  },
  resetMocks: true,
  moduleNameMapper: {
    '^.+\\.(css|sass|scss)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'jsdom',
  collectCoverage: false,
  collectCoverageFrom: ['src/**/*.{tsx}', '!src/main.tsx'],
  coveragePathIgnorePatterns: ['node_modules'],
  coverageDirectory: '<rootDir>/coverage/',
  coverageReporters: ['lcov', 'json'],
};
