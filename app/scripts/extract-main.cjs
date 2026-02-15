const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, '../../index.html'), 'utf8');
const start = html.indexOf('<main>') + 7;
const end = html.indexOf('</main>');
const mainContent = html.slice(start, end).replace(/images\//g, '/images/');
const escaped = mainContent
  .replace(/\\/g, '\\\\')
  .replace(/`/g, '\\`')
  .replace(/\$/g, '\\$')
  .replace(/\r\n/g, '\\n')
  .replace(/\n/g, '\\n');
const jsx = `import React from 'react'

function HomePage() {
  const content = \`${escaped}\`;
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}

export default HomePage
`;
fs.writeFileSync(path.join(__dirname, '../src/pages/HomePage.jsx'), jsx);
