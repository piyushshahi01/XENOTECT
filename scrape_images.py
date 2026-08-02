import urllib.request
import re

url = "https://www.sliderrevolution.com/templates/artistic-parallax-slider/"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    # Find all PNG/WEBP images inside the HTML (even in JS strings)
    imgs = re.findall(r'https?://[^"\']+\.(?:png|webp)', html)
    unique_imgs = set(imgs)
    print("PNG IMAGES:")
    for img in sorted(list(unique_imgs)):
        if 'artistic-parallax-slider' in img:
            print(img)
            
    # Maybe the iframe is under a different attribute
    iframes = re.findall(r'<iframe[^>]+', html)
    print("\nIFRAMES:", iframes)
except Exception as e:
    print("Error:", e)
