const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();
  
  // Navigate to the local file
  const filePath = `file:///${path.resolve('_backup_static/index.html').replace(/\\/g, '/')}`;
  await page.goto(filePath);
  
  // Wait for animations and fonts
  await page.waitForTimeout(2000);
  
  // Inject some CSS to hide navbar and remove scrollbars during capture
  await page.evaluate(() => {
    document.querySelector('.navbar').style.display = 'none';
    document.body.style.overflow = 'hidden';
    
    // Add "active" class to all panels to trigger reveal animations
    document.querySelectorAll('.service-panel').forEach(p => p.classList.add('active'));
  });
  
  // Wait for reveal animations to finish
  await page.waitForTimeout(2000);
  
  // Create output directory if it doesn't exist
  const outDir = path.resolve('public/services');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  
  // Take screenshots of each service panel
  const panels = await page.$$('.service-panel');
  for (let i = 0; i < panels.length; i++) {
    console.log(`Capturing service-${i + 1}.jpg...`);
    await panels[i].screenshot({
      path: path.join(outDir, `service-${i + 1}.jpg`),
      type: 'jpeg',
      quality: 90
    });
  }
  
  await browser.close();
  console.log("Screenshots captured successfully!");
})();
