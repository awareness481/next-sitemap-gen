const path = require('path');
const fs = require('fs');

const appDir = path.dirname(require.main.path[0]);
const buildDir = path.dirname(appDir + '/.next/server/pages/.');

function hasBuildFolder() {
  return fs.existsSync(buildDir);
}

function main(buildDir) {
  if (hasBuildFolder()) {
    console.log('Build folder found!')
  } else if (!hasBuildFolder()) {
    console.log(path.dirname(require.main.filename))
    console.log(appDir);
    console.log('No build folder found. Make sure you have built your project');
    return;
  }
  let results = [];
  const files = fs.readdirSync(buildDir);
  for (let i = 0; i < files.length; i++) {
    const filename = path.join(buildDir, files[i]);
    const stat = fs.lstatSync(filename);

    if (stat.isDirectory()) {
      main(filename);
    }
    else if (filename.indexOf('.html')>=0) {
      results.push(filename);
    }
    
  }
  
  console.log(results)
  return results;
}

main(buildDir);