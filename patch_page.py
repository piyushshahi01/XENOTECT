import re

with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
    tsx = f.read()

# 1. Update description max-width
tsx = tsx.replace('className="description reveal-item"', 'className="description reveal-item max-w-[65ch]"')

# 2. Add micro-labels under the heading (title)
micro_label = '''<div className="text-xs font-semibold tracking-widest text-[#888] uppercase mb-4 reveal-item" style={{ '--delay': '0.15s' } as React.CSSProperties}>Digital Experiences<span className="block text-[#aaa] font-normal tracking-normal normal-case mt-1">Built for speed, scalability, and business growth.</span></div>'''

# Insert the micro_label after every </h2>
tsx = re.sub(r'(<h2 className="title reveal-item">.*?</h2>)', r'\1\n            ' + micro_label, tsx, flags=re.DOTALL)

# 3. Replace Best For tags across all sections
best_for = '''<div className="bf-tags">
                    <span className="bf-tag">Startups</span>
                    <span className="bf-tag">SaaS Platforms</span>
                    <span className="bf-tag">Growing Businesses</span>
                    <span className="bf-tag">E-Commerce Brands</span>
                </div>'''
tsx = re.sub(r'<div className="bf-tags">.*?</div>', best_for, tsx, flags=re.DOTALL)

# 4. Remove checkmarks from list-title and list tags
tsx = tsx.replace('&#10003; ', '')

# 5. Make the analytics card pulse
tsx = tsx.replace('analytics-card layer-front floating-element anim-card delay-3', 'analytics-card layer-front floating-element anim-card anim-pulse delay-3')

with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(tsx)

print("Patched page.tsx successfully.")
