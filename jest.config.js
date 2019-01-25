module.exports = {
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    // include folder
    '**/src/*.{js,vue}',
    // exclude folder and files
    '!**/src/accounting.js',
    '!**/node_modules/**',
    '!**/assets/**',
    '!**/demo/**',
    '!**/coverage/**',
    '!**/dist/**',
    '!**/dist-demo/**',
    '!**/test/**',
    '!**/*rc.{js,vue}',
    '!**/*.config.{js,vue}'
  ],
  coverageDirectory: 'coverage',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^vue$': 'vue/dist/vue.common.js'
  },
  moduleFileExtensions: ['js', 'vue', 'json'],
  transform: {
    '.*\\.(vue)$': 'vue-jest',
    "^.+\\.js$": "<rootDir>/node_modules/babel-jest",
  },
  snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue'],
}
