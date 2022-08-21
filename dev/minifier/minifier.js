var minify = require('html-minifier').minify;
var fs = require("fs");

const appName = process.argv[2]
const notice = process.argv[3]
require(`../${appName}/custom.js`) // custom.js is expected to define the global variables dynamicManifest and minifierProps
customProps = {...dynamicManifest, ...minifierProps}
customProps.keywords = customProps.categories.join(', ')

const minifyOptions = {
  collapseWhitespace:true,
  collapseBooleanAttributes:true,
  decodeEntities:true,
  html5:true,
  minifyJS:true,
  minifyCSS:true,
  minifyURL:true,
  removeComments:true,
  removeEmptyAttributes:true,
  removeOptionalTags:true,
  removeRedundantAttributes:true,
  removeStyleLinkTypeAttributes:true,
  useShortDoctype:true,
}
fs.readFile(`../${appName}/index.html`, 'utf8', function (err, data) {
  if (err) throw err;
  data = minify(data, {
    collapseWhitespace:true,
    removeScriptTypeAttributes:true,
    quoteCharacter:'"',
    minifyJS:true,
    minifyCSS:true,
  });
  for (const match of data.matchAll(/<script src="([\.a-zA-Z\/]+)"><\/script>/g)) {
    const script = fs.readFileSync(`../${appName}/` + match[1], 'utf8')
    data = data.replaceAll(match[0], '<script>' + script + '</script>')
  }
  for (const match of data.matchAll(/<link rel="stylesheet" href="([\.a-zA-Z\/]+)"\>/g)) {
    const script = fs.readFileSync(`../${appName}/` + match[1], 'utf8')
    data = data.replaceAll(match[0], '<style>' + script + '</style>')
  }
  const updateMeta = (property, manifestProp) =>
    data = data.replaceAll(`<meta property="${property}">`, `<meta property="${property}" content="${customProps[manifestProp]}">`)
      .replaceAll(`<meta name="${property}">`, `<meta name="${property}" content="${customProps[manifestProp]}">`)
  updateMeta('og:title', 'name')
  updateMeta('og:description', 'description')
  updateMeta('og:image', 'previewImg')
  updateMeta('og:image:width', 'previewImgWidth')
  updateMeta('og:image:height', 'previewImgHeight')
  updateMeta('og:image:alt', 'previewImgAlt')

  updateMeta('twitter:title', 'name')
  updateMeta('twitter:description', 'description')
  updateMeta('twitter:image', 'previewImg')

  updateMeta('description', 'description')
  updateMeta('keywords', 'keywords')
  data = data.replaceAll('<title></title>', `<title>${customProps.name}</title>`)

  data = data.replaceAll('</script><script>', '\n').replaceAll('</style><style>', '\n')
  data = notice + minify(data, minifyOptions);
  if (data.includes('<script src'))
    throw 'unparsed script'
  fs.writeFile(`../../${appName}/index.html`, data, err => {if(err)throw err;});
});
