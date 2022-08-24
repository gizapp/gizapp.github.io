var fs = require("fs");
var minimize = require('minimize')
var UglifyJs = require('uglify-js')
var CleanCSS = require('clean-css')

const appName = process.argv[2]
const notice = process.argv[3]
svgUrl = 'http://www.w3.org/2000/svg'
require(`../${appName}/custom.js`) // custom.js is expected to define the global variables dynamicManifest and minifierProps
customProps = {...dynamicManifest, ...minifierProps}
customProps.keywords = customProps.categories.join(', ')

let finalStep = false
const css = new CleanCSS({level:2})
const mmz = new minimize({loose:true, plugins:[
  { id: 'code',
    element: function(node, next) {
      if (node.type === 'script' && node.children.length === 1)
        node.children[0].data = UglifyJs.minify(node.children[0].data.replace("'use strict';", '').replace('"use strict";', ''), {mangle:{toplevel:finalStep}}).code
      if (node.type === 'style' && node.children.length === 1) {
        node.children[0].data = css.minify(node.children[0].data).styles
      }
    },
  },
]})
fs.readFile(`../${appName}/index.html`, 'utf8', function (err, data) {
  if (err) throw err;
  data = mmz.parse(data)
  for (const match of data.matchAll(/<script src="?([\.a-zA-Z\/]+)"?><\/script>/g)) {
    const script = fs.readFileSync(`../${appName}/` + match[1], 'utf8')
    data = data.replaceAll(match[0], '<script>' + script + '</script>')
  }
  for (const match of data.matchAll(/<link rel="?stylesheet"? href="?([\.a-zA-Z\/]+)"?\>/g)) {
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
  data = data.replaceAll(/<title> ?<\/title>/g, `<title>${customProps.name}</title>`)

  //data = data.replaceAll(/<\/script> ?<script>/g, '\n').replaceAll(/<\/style> ?<style>/g, '\n')
  data = data.replaceAll(/<\/script> ?<script>/g, '\n')
  finalStep = true
  data = notice + mmz.parse(data).replaceAll('&nbsp;', '\u00A0').replaceAll('&emsp;', '\u2003').replaceAll('&ensp;', '\u2002').replaceAll('&emsp14;', '\u2005')
  if (data.includes('<script src'))
    throw 'unparsed script'
  fs.writeFile(`../../${appName}/index.html`, data, err => {if(err)throw err;});
});
