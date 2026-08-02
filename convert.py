import re

with open('_backup_static/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Extract just the services sections and everything after them up to script tag
# The services start at: <!-- Service 01: Web Development -->
services_match = re.search(r'(<!-- Service 01: Web Development -->.*)<script src="script.js"></script>', html, re.DOTALL)
if services_match:
    content = services_match.group(1)
else:
    content = ""

# Replace class with className
content = content.replace('class="', 'className="')

# Fix style tags (e.g. style="--delay: 0.1s")
content = re.sub(r'style="(--delay:\s*[^;"]+);?"', lambda m: "style={{ '" + m.group(1).split(':')[0] + "': '" + m.group(1).split(':')[1].strip() + "' } as React.CSSProperties}", content)

# Fix other inline styles
content = content.replace('style="top: 50%; left: 20%;"', "style={{ top: '50%', left: '20%' }}")
content = content.replace('style="top: 20%; left: 70%;"', "style={{ top: '20%', left: '70%' }}")
content = content.replace('style="top: 80%; left: 70%;"', "style={{ top: '80%', left: '70%' }}")

# Fix self closing tags
content = re.sub(r'<(img|hr|br|input)([^\>]*[^/])>', r'<\1\2 />', content)
content = content.replace('<div className="mobile-notch"></div>', '<div className="mobile-notch" />')

# Convert HTML comments to JSX comments
content = re.sub(r'<!--(.*?)-->', r'{/*\1*/}', content)

tsx_content = f"""'use client';
import React, {{ useEffect, useRef, useState }} from 'react';
import {{ MorphText }} from '@/components/ui/morph-text';

export default function Home() {{
    const [scrolled, setScrolled] = useState(false);
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {{
        const handleScroll = () => {{
            setScrolled(window.scrollY > 50);
        }};
        window.addEventListener('scroll', handleScroll);
        
        observerRef.current = new IntersectionObserver((entries) => {{
            entries.forEach(entry => {{
                if (entry.isIntersecting) {{
                    entry.target.classList.add('active');
                }}
            }});
        }}, {{ threshold: 0.25 }});
        
        document.querySelectorAll('.service-panel').forEach(panel => {{
            if (observerRef.current) observerRef.current.observe(panel);
        }});
        
        return () => window.removeEventListener('scroll', handleScroll);
    }}, []);

    return (
        <main>
            <div className="site-bg-grid"></div>
            <nav className={{`navbar ${{scrolled ? 'bg-black/90 backdrop-blur-md' : 'bg-transparent'}}`}}>
                <div className="nav-container">
                    <div className="logo">xenotect</div>
                    <div className="nav-links">
                        <a href="#services">Capabilities</a>
                        <a href="#process">Process</a>
                        <a href="#testimonial">Testimonial</a>
                    </div>
                    <a href="#contact" className="btn-hire">
                        <span className="dot"></span> Hire us
                    </a>
                </div>
            </nav>
            {{/* Hero Section with MorphText */}}
            <section className="hero">
                <div className="hero-content">
                    <div className="pill animate-up" style={{{{ '--delay': '0.1s' }} as React.CSSProperties}}>Premium Digital Agency</div>
                    <div className="animate-up" style={{{{ '--delay': '0.2s' }} as React.CSSProperties}}>
                        <MorphText texts={{['Creative digital', 'Innovative tech', 'Growth driven']}} className="text-white font-medium text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight leading-tight" />
                        <h1 className="hero-title mt-2">solutions wizard</h1>
                    </div>
                    
                    <p className="hero-subtitle animate-up" style={{{{ '--delay': '0.3s' }} as React.CSSProperties}}>Helping businesses scale with pixel-perfect websites, intuitive UI/UX, and intelligent automation without the overhead of an in-house team.</p>
                    <div className="hero-buttons animate-up" style={{{{ '--delay': '0.4s' }} as React.CSSProperties}}>
                        <a href="#work" className="btn-primary">Work with us &rarr;</a>
                        <a href="#partner" className="btn-secondary">Premium Partner</a>
                    </div>
                </div>
            </section>
            
            {content}
        </main>
    );
}}
"""

with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(tsx_content)

print("page.tsx updated successfully!")
