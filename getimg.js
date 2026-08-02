const fs = require('fs');
fetch('https://easygoing-actions-831179.framer.app/')
  .then(r => r.text())
  .then(html => {
    const urls = [...new Set(html.match(/https:\/\/[^"']+/g))];
    const images = urls.filter(u => u.includes('framerusercontent.com/images') || u.includes('unsplash.com'));
    console.log(images);
  });
