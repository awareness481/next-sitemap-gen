const path = require('path');
const fs = require('fs');

const appDir = path.dirname(require.main.path[0]);
const buildDir = path.dirname(appDir + '/.next/server/pages/.');

function hasBuildFolder() {
  return fs.existsSync(buildDir);
}

function main() {
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
    results.push(filename);
  }
  
  console.log(results)
  return results;
}

main();