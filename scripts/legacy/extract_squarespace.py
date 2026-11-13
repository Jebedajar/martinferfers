"""Extract the original Squarespace blog posts into clean HTML.

Run once against the archived Squarespace HTML (spark-innovation-full.tar.gz):
    python3 -I scripts/legacy/extract_squarespace.py <archive>/html scripts/legacy/posts-source.json

Images become <figure data-legacy-image> placeholders and accordions become
<details>, so the Node converter can turn them into Payload blocks.
"""
import json
import re
import sys
from pathlib import Path

from bs4 import BeautifulSoup, Comment

FILES = [
    'chatgpt-to-claude-en', 'chatgpt-to-claude-de', 'outlive', 'geldanlage',
    'crypto', 'wilma', 'weak-strength', 'hello',
]
ALLOWED = {'p', 'br', 'strong', 'b', 'em', 'i', 'u', 's', 'a', 'h1', 'h2', 'h3', 'h4',
           'ul', 'ol', 'li', 'blockquote', 'hr', 'figure', 'details', 'summary', 'code', 'pre', 'sup', 'sub'}


def fix_href(href: str) -> str:
    """Repair links that were already broken on the old site."""
    from urllib.parse import unquote
    href = href.strip()
    if href.startswith('https://www.facebook.com/sharer/sharer.php?u='):
        target = unquote(href.split('?u=', 1)[1])
        target = target if target.startswith('http') else 'https://' + target
        return 'https://www.facebook.com/sharer/sharer.php?u=' + target.replace('http://', 'https://')
    if href.startswith('applewebdata://'):
        # pasted from Apple Notes: ".../%E2%80%A2https:/www.amazon.de/..."
        rest = unquote(href).split('•', 1)[-1]
        href = rest.replace('https:/', 'https://', 1) if rest.startswith('https:/') and not rest.startswith('https://') else rest
    href = href.replace('\ufffc', '')
    href = re.sub(r'fondsliste/weltweitHier$', 'fondsliste/weltweit', href)
    return href


def clean_inline(node):
    """Strip Squarespace attributes and unwrap unknown tags."""
    for c in node.find_all(string=lambda t: isinstance(t, Comment)):
        c.extract()
    for t in node.find_all(['script', 'style', 'noscript', 'button', 'svg']):
        t.decompose()
    for t in list(node.find_all(True)):
        if t.name not in ALLOWED:
            t.unwrap()
            continue
        keep = {}
        if t.name == 'a' and t.get('href'):
            keep['href'] = fix_href(t['href'])
        if t.name == 'figure':
            keep = {k: v for k, v in t.attrs.items() if k.startswith('data-legacy')}
        t.attrs = keep
    return node


# Original blog images, saved locally in public/images/blog (key = Squarespace file name)
LOCAL_IMAGES = {
    'z_56.jpg': ('/images/blog/tulips-bitcoin-cartoon.jpg', 'Cartoon: Tulips 1636 – Bitcoin 2017'),
    '1482492537705-LQCGFI6E1UCH9KT1XDUE': ('/images/blog/wilma-weihnachtsfliege.png', 'Wilma, die Weihnachtsfliege'),
    'geldanlage-komplettloesung-martin-ferfers-sparen-zinseszins-feuerwerk.gif': ('/images/blog/geldanlage-zinseszins.gif', 'Geld sparen vs. Zinseszins: 50 € pro Monat, 10 % Zinsen pro Jahr'),
    'geldanlage-komplettloesung-martin-ferfers-sparen-anlagemix-mebfaber.gif': ('/images/blog/geldanlage-anlagestrategien.gif', 'Rendite je Anlagestrategie 1973–2012'),
    'geldanlage-komplettloesung-martin-ferfers-sparen-etf-auswahl.gif': ('/images/blog/geldanlage-etf-rendite.gif', 'Rendite unterschiedlicher ETF'),
    'martin-ferfers-spark-attia-outlive-blutmarker-zielwerte.gif': ('/images/blog/outlive-blutmarker-zielwerte.gif', 'Blutmarker und Zielwerte nach Peter Attia'),
}


def image_figure(soup, block):
    img = block.find('img')
    if img.get('data-image-dimensions') == '80x80':
        return None  # tiny "share on Facebook" icon from Squarespace
    src = img.get('data-src') or img.get('src')
    src = src.split('?')[0]
    alt = None
    for key, (local, local_alt) in LOCAL_IMAGES.items():
        if key in src:
            src, alt = local, local_alt
    cap = block.find('figcaption')
    caption = cap.get_text(' ', strip=True) if cap else ''
    fig = soup.new_tag('figure')
    fig['data-legacy-image'] = src
    fig['data-legacy-alt'] = alt or img.get('alt') or caption or ''
    fig['data-legacy-caption'] = caption
    return fig


def accordion(soup, block):
    out = []
    for li in block.find_all('li', class_='accordion-item'):
        title = li.find(class_='accordion-item__title')
        desc = li.find(class_='accordion-item__description')
        det = soup.new_tag('details')
        summ = soup.new_tag('summary')
        summ.string = title.get_text(' ', strip=True) if title else ''
        det.append(summ)
        if desc:
            for child in list(desc.children):
                det.append(child)
        out.append(det)
    return out


def extract(path: Path):
    soup = BeautifulSoup(path.read_text(encoding='utf-8'), 'html.parser')
    canonical = soup.find('link', rel='canonical')['href']
    slug = canonical.split('/blog/', 1)[1].strip('/')
    article = soup.find('article')
    title = article.find(class_=re.compile('entry-title')).get_text(' ', strip=True)
    date = article.find('time')['datetime']
    summary_meta = soup.find('meta', attrs={'name': 'description'})
    body = article.find(class_='entry-content')
    pieces = []
    for block in body.find_all(class_='sqs-block'):
        cls = ' '.join(block.get('class', []))
        if 'sqs-block-html' in cls:
            content = block.find(class_='sqs-html-content') or block
            for child in list(content.children):
                pieces.append(child)
        elif 'sqs-block-image' in cls:
            fig = image_figure(soup, block)
            if fig is not None:
                pieces.append(fig)
        elif 'sqs-block-horizontalrule' in cls:
            pieces.append(soup.new_tag('hr'))
        elif 'sqs-block-accordion' in cls:
            pieces.extend(accordion(soup, block))
        # forms (newsletter) and empty code blocks are dropped on purpose
    wrapper = soup.new_tag('div')
    for p in pieces:
        wrapper.append(p.extract() if hasattr(p, 'extract') else p)
    clean_inline(wrapper)
    html = ''.join(str(c) for c in wrapper.children)
    html = re.sub(r'\s*\n\s*', ' ', html).strip()
    html = re.sub(r'<p>\s*(&nbsp;|\xa0)?\s*</p>', '', html)
    return {
        'slug': slug,
        'title': title,
        'publishedAt': date,
        'description': summary_meta['content'] if summary_meta else '',
        'sourceUrl': canonical,
        'html': html,
    }


def excerpts(blog_list: Path):
    soup = BeautifulSoup(blog_list.read_text(encoding='utf-8'), 'html.parser')
    out = {}
    for a in soup.find_all('article'):
        link = a.find(class_=re.compile('entry-title')).find('a')['href']
        summ = a.find(class_='p-summary')
        out[link.split('/blog/', 1)[1]] = summ.get_text(' ', strip=True) if summ else None
    return out


def main():
    src, dest = Path(sys.argv[1]), Path(sys.argv[2])
    ex = excerpts(src / 'blog.html')
    posts = []
    for name in FILES:
        post = extract(src / 'blog' / f'{name}.html')
        post['excerpt'] = ex.get(post['slug'])
        if not post['excerpt']:
            first = BeautifulSoup(post['html'], 'html.parser').find('p')
            post['excerpt'] = first.get_text(' ', strip=True) if first else ''
        posts.append(post)
    dest.write_text(json.dumps(posts, ensure_ascii=False, indent=2), encoding='utf-8')
    for p in posts:
        print(f"{p['publishedAt']}  {p['slug'][:60]:60}  {len(p['html']):6} chars")


if __name__ == '__main__':
    main()
