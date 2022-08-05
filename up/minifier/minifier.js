var minify = require('html-minifier').minify;
var fs = require("fs");

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
fs.readFile("../index.html", 'utf8', function (err, data) {
  if (err) throw err;
  data = minify(data, {
    collapseWhitespace:true,
    removeScriptTypeAttributes:true,
    quoteCharacter:'"',
    minifyJS:true,
    minifyCSS:true,
  });
  for (const match of data.matchAll(/<script src="([\.a-zA-Z\/]+)"><\/script>/g)) {
    const script = fs.readFileSync('../' + match[1], 'utf8')
    data = data.replaceAll(match[0], '<script>' + script + '</script>')
  }
  for (const match of data.matchAll(/<link rel="stylesheet" href="([\.a-zA-Z\/]+)"\>/g)) {
    const script = fs.readFileSync('../' + match[1], 'utf8')
    data = data.replaceAll(match[0], '<style>' + script + '</style>')
  }
  data = data.replaceAll('</script><script>', '\n').replaceAll('</style><style>', '\n')
  data = minify(data, minifyOptions);
  if (data.includes('<script src'))
    throw 'unparsed script'
  fs.writeFile('../build.html', data, err => {if(err)throw err;});
});
