test('code', () => {
  const { code } = require('./code')
  expect(typeof code).toBe('string')
  const { code: codeTemplate } = require('./code.template')
  expect(typeof codeTemplate).toBe('string')
})
