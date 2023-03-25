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
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{tsx,ts}',
    '!<rootDir>/src/main.tsx',
    '!<rootDir>/src/App.tsx',
    '!<rootDir>/src/api/**',
    '!<rootDir>/src/components/providers/**',
    '!<rootDir>/src/services/**',
    '!<rootDir>/src/tests/**',
    '!<rootDir>/src/types/**',
    '!<rootDir>/src/lib/**',
    '!<rootDir>/src/*.d.ts',
  ],
  coveragePathIgnorePatterns: ['node_modules'],
  coverageDirectory: '<rootDir>/coverage/',
  coverageReporters: ['lcov', 'json', 'text'],
};
