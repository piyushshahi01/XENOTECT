const fs = require('fs');

const filePath = 'C:\\Users\\Piyush\\Downloads\\www.xenotectsolution.com-20260810T110454.html';
const html = fs.readFileSync(filePath, 'utf-8');

// Extract the lighthouse JSON object from the HTML
const match = html.match(/window\.__LIGHTHOUSE_JSON__ = (\{.*?\});<\/script>/s);

if (match && match[1]) {
  try {
    const data = JSON.parse(match[1]);
    console.log("=== Lighthouse Scores ===");
    const categories = data.categories;
    for (const key in categories) {
      console.log(`${categories[key].title}: Math.round(${categories[key].score} * 100)`);
    }

    console.log("\n=== Failing Audits ===");
    const audits = data.audits;
    for (const key in audits) {
      const audit = audits[key];
      if (audit.score !== null && audit.score < 0.9 && audit.scoreDisplayMode !== 'manual') {
        console.log(`- ${audit.title} (Score: ${audit.score}): ${audit.displayValue || ''}`);
        if (audit.details && audit.details.items && audit.details.items.length > 0) {
          console.log(`  Items: ${audit.details.items.length}`);
          if (audit.details.items[0].url) {
             console.log(`  e.g. ${audit.details.items[0].url.substring(0, 100)}`);
          }
        }
      }
    }
  } catch (err) {
    console.error("Failed to parse JSON", err);
  }
} else {
  console.log("JSON not found in HTML");
}
