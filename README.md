# Webfont extract

Simple library to extract SVG files or SVG data from any icon based webfont (e.g. Material Design Icons, Entypo, Font Awesome, ...). Project is heavily inspired by [font-blast](https://github.com/eugene1g/font-blast).

## Installation

Add `webfont-extract` as a project dependency

```sh
npm install @virae/webfont-extract
```

or

```sh
yarn add @virae/webfont-extract
```

## Usage

```sh
import webfontExtract from '@virae/webfont-extract'

# path to the custom icon font
const fontPath = 'assets/custom-font.svg'

# extract and get SVG data from the given font
const svgData = await webfontExtract(fontPath)

# or ... extract and save SVGs to specified output directory
await webfontExtract(fontPath, 'path-to-output-directory')
```

## Support

Please [open an issue](https://github.com/virae/webfont-extract/issues) for support.

## Contributing

Please contribute using [Github Flow](https://guides.github.com/introduction/flow/). Create a branch, add commits, and [open a pull request](https://github.com/virae/webfont-extract/compare/).
