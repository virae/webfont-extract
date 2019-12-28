import path from 'path'
import fs from 'graceful-fs'
import mkdir from 'mkdirp'
import { DOMParser } from 'xmldom'

const webfontExtract = (fontFile, destinationFolder) => {
  return new Promise((resolve, reject) => {
    try {
      const svgFontContent = fs.readFileSync(fontFile, 'utf-8')

      const doc = new DOMParser().parseFromString(svgFontContent, 'text/xml').documentElement
      const fontSpec = doc.getElementsByTagName('font')[0]
      const defaultCharWidth = fontSpec.getAttribute('horiz-adv-x')
      const fontFace = doc.getElementsByTagName('font-face')[0]
      const defaultCharHeight = fontFace.getAttribute('units-per-em')
      const defaultCharAscent = fontFace.getAttribute('ascent')
      const glyphs = doc.getElementsByTagName('glyph')

      // "square" fonts tend to be based at the center (like glyphicon)
      // white other fonts tend to be based around the charAscent mark
      // so when need to flip them with different adjustments
      // (defaultCharWidth == defaultCharHeight ? defaultCharHeight : defaultCharAscent),
      const translateOffset = defaultCharAscent

      let svgData = []
      for (let i = 0; i < glyphs.length; i++) {
        const glyph = glyphs[i]
        // some strange fonts put empty glyphs in them
        if (!glyph) continue
        let iconCode = glyph.getAttribute('unicode')
        const pathData = glyph.getAttribute('d')
        const customWidthMatch = glyph.getAttribute('horiz-adv-x')
        const contentWidth = customWidthMatch || defaultCharWidth

        // some glyphs matched without a unicode value so we should ignore them
        if (!iconCode) continue

        // handle encoded values
        if (iconCode.indexOf('&#') !== -1) {
          iconCode = iconCode.replace('&#x', '')
        } else {
          iconCode = iconCode.codePointAt(0).toString(16)
        }

        // Skip empty-looking glyphs
        if (!iconCode.length || !pathData || pathData.length < 10) continue

        const useCharacterName = glyph.getAttribute('glyph-name') || iconCode

        const charInfo = {
          code: iconCode,
          name: useCharacterName,
          ref: useCharacterName || iconCode,
          path: pathData,
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${contentWidth} ${defaultCharHeight}">
            <g transform="scale(1,-1) translate(0 -${translateOffset})">
              <path d="${pathData}"/>
            </g></svg>`
        }
        svgData = svgData.concat(charInfo)
      }

      console.info(`Found ${svgData.length} available icons in the font`)

      if (destinationFolder) {
        writeSvgData(svgData, destinationFolder)
      }

      resolve(svgData)
    } catch (e) {
      reject(e)
    }
  })
}

const writeSvgData = (svgData, destinationFolder) => {
  console.info('Generating SVG content for each character...')
  const outputDir = path.resolve(process.cwd(), path.join(destinationFolder, 'svg'))

  if (!fs.existsSync(outputDir)) {
    mkdir.sync(outputDir)
  }

  svgData.forEach((char) => {
    const filename = char.name ? char.name : char.code

    fs.writeFileSync(path.join(outputDir, filename + '.svg'), char.svg)
  })

  console.info(`Saved files to ${outputDir}`)
}

export default webfontExtract
