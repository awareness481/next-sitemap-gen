#!/usr/bin/env node

const path = require('path');
const fs = require('fs');

const appDir = path.dirname(require.main.path[0]);
const buildDir = path.dirname(appDir + '/.next/server/pages/.');
const length = buildDir.length;

let results = [];

function hasBuildFolder() {
  return fs.existsSync(buildDir);
}

function createFile(results) {
  if (!fs.existsSync(appDir + '/public')) {
    fs.mkdirSync(appDir + '/public/')
  }
  const writeStream = fs.createWriteStream("./public/sitemap.xml");

  writeStream.write(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"> 
    `
  )
  
  results.map((r) => {
    writeStream.write(
    `
  <url>
    <loc>${process.argv[2]}${r}</loc>
  </url>
`);
  })

  writeStream.write('</urlset>')

  writeStream.end();
  console.log('File created on the public folder!');
}

function main(builDdir) {
  if (hasBuildFolder()) {
    console.log('Build folder found!')
  } else if (!hasBuildFolder()) {
    console.log(path.dirname(require.main.filename))
    console.log(appDir);
    console.log('No build folder found. Make sure you have built your project');
    return;
  }
  const files = fs.readdirSync(builDdir);
  for (let i = 0; i < files.length; i++) {
    const filename = path.join(builDdir, files[i]);
    const stat = fs.lstatSync(filename);

    if (stat.isDirectory()) {
      main(filename);
    }
    else if (filename.indexOf('.html')>=0) {
      if (buildDir.length === length)
        results.push(path.basename(filename, '.html'));
      else {
        let filePath = filename.substring(length - 1, filename.length);
        const arr = filePath.split('\\');
        filePath = arr.join('/');
        results.push(filePath.substring(0, filePath.length - 5));
      }
    }
    
  }
  
  console.log(results)
}

function start() {
  main(buildDir);
  createFile(results);
}
start();
