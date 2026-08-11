import os

def replace_in_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'https://xenotect.com' in content:
        new_content = content.replace('https://xenotect.com', 'https://www.xenotectsolution.com')
        # Also handle cases where xenotect.com is used as a bare domain (but not in emails)
        # We'll leave emails and xenotect.com as is unless it's the url.
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

def main():
    for root, dirs, files in os.walk('src'):
        for file in files:
            if file.endswith(('.ts', '.tsx', '.js', '.jsx', '.json')):
                replace_in_file(os.path.join(root, file))

if __name__ == '__main__':
    main()
