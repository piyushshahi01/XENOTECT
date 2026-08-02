import urllib.request
import re

queries = ['business-strategy', 'software-engineering', 'ui-design', 'video-production', 'digital-marketing']

for q in queries:
    req = urllib.request.Request(f'https://unsplash.com/s/photos/{q}', headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    try:
        html = urllib.request.urlopen(req).read().decode('utf-8')
        urls = re.findall(r'https://images\.unsplash\.com/photo-[a-zA-Z0-9\-]+', html)
        unique_urls = list(dict.fromkeys(urls))
        print(f"--- {q} ---")
        for u in unique_urls[:3]:
            print(f"{u}?auto=format&fit=crop&q=80&w=1280")
    except Exception as e:
        print(f"Error on {q}: {e}")
