const https = require('https');

https.get('https://www.sliderrevolution.com/templates/artistic-parallax-slider/', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    // Slider Revolution stores its module config in a script tag containing RevSlider setup
    // Or it might be an iframe. Let's look for iframe.
    const iframeMatch = data.match(/<iframe[^>]+src="([^"]+)"/g);
    console.log("IFRAMES:", iframeMatch);

    // Let's find any string that looks like an image URL ending in png
    const pngs = data.match(/https:\/\/[^"']+\.png/g);
    if (pngs) {
      const unique = [...new Set(pngs)];
      console.log("PNGS:", unique.filter(u => u.includes('revslider') || u.includes('artistic')));
    }
  });
}).on('error', (err) => {
  console.log("Error: " + err.message);
});
