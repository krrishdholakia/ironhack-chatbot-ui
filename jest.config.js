const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

const customJestConfig = {
  clearMocks: true,
  collectCoverageFrom: [
    '**/!(*.spec).{ts,tsx}',
    '!**/types/**',
    '!**/lib/**',
    '!**/utils/**',
    '!**/_document.page.tsx/**',
    '!**/_app.page.tsx/**',
    '!**/api/**',
    '!**/context/**',
    '!**/theme/**',
    '!**/bugsnag.ts/**',
    '!**/index.ts',
    '!*.d.ts',
  ],
  coverageReporters: ['lcov', 'text'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  moduleNameMapper: {
    '^@/common/(.*)$': '<rootDir>/common/$1',
    '^@/config$': '<rootDir>/config',
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/lib/(.*)$': '<rootDir>/lib/$1',
    '^@/pages/(.*)$': '<rootDir>/pages/$1',
  },
  resetModules: true,
  restoreMocks: true,
  setupFilesAfterEnv: ['./jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
};

module.exports = createJestConfig(customJestConfig);
