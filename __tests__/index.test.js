const webfontExtract = require('../dist/webfont-extract.umd')
const path = require('path')

const fontFile = path.resolve(path.join(__dirname, '__data__', 'font.svg'))

// The assertion for a promise must be returned.
it('it extracts all SVG glyphs', async () => {
  expect.assertions(1)

  const data = await webfontExtract(fontFile)
  expect(data.length).toEqual(151)
});

// The assertion for a promise must be returned.
it('it extracts correct SVG data', async () => {
  expect.assertions(1)

  const data = await webfontExtract(fontFile)
  expect(data).toMatchSnapshot()
});
