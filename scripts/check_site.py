#!/usr/bin/env python3
"""Check GitHub Pages relative references, accessibility landmarks, and duplicate IDs."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit
import sys

ROOT = Path(__file__).resolve().parents[1]


class PageParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.refs = []
        self.ids = []
        self.tags = set()

    def handle_starttag(self, tag, attrs):
        data = dict(attrs)
        self.tags.add(tag)
        if data.get("id"):
            self.ids.append(data["id"])
        if tag in ("a", "link", "script", "img"):
            attr = "href" if tag in ("a", "link") else "src"
            if attr in data and data[attr]:
                self.refs.append(data[attr])


def check(path):
    document = path.read_text(encoding="utf-8")
    p = PageParser()
    p.feed(document)
    issues = []
    relative = path.relative_to(ROOT)
    if not document.strip():
        issues.append("empty page")
    if "site-nav" not in document:
        issues.append("shared navigation missing")
    if 'name="viewport"' not in document:
        issues.append("viewport meta missing")
    if "main-content" not in p.ids:
        issues.append("skip target missing")
    if "title" not in p.tags:
        issues.append("title element missing")
    if len(set(p.ids)) != len(p.ids):
        issues.append("duplicate IDs")
    for ref in p.refs:
        value = urlsplit(ref)
        if value.scheme or value.netloc or ref.startswith(("#", "//", "mailto:", "data:")):
            continue
        target = (path.parent / value.path).resolve()
        if not target.is_relative_to(ROOT):
            issues.append(f"reference escapes repo: {ref}")
        elif value.path and not target.is_file():
            issues.append(f"missing reference: {ref}")
    return [(str(relative), issue) for issue in issues]


def main():
    pages = sorted(ROOT.rglob("*.html"))
    issues = [item for page in pages for item in check(page)]
    for page, message in issues:
        print(f"{page}: {message}", file=sys.stderr)
    print(f"Checked {len(pages)} HTML pages; {len(issues)} issue(s)")
    return 1 if issues else 0


if __name__ == "__main__":
    sys.exit(main())
