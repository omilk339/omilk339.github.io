"""네이버 블로그 RSS를 읽어 첫 화면용 posts.json을 만듭니다.

GitHub Actions가 1시간마다 실행합니다(.github/workflows/blog-posts.yml).
브라우저는 네이버 RSS를 직접 읽을 수 없어서(다른 사이트 접근 차단) 이렇게 미리 받아 둡니다.
"""
import json
import re
import sys
import urllib.request
import xml.etree.ElementTree as ET
from email.utils import parsedate_to_datetime

BLOG_ID = "simplehi-"
RSS_URL = f"https://rss.blog.naver.com/{BLOG_ID}.xml"
OUT = sys.argv[1] if len(sys.argv) > 1 else "posts.json"
UA = "Mozilla/5.0 (posts.json updater)"


def get(url, referer=None):
    headers = {"User-Agent": UA}
    if referer:
        headers["Referer"] = referer
    with urllib.request.urlopen(urllib.request.Request(url, headers=headers), timeout=30) as r:
        return r.read()


def main():
    root = ET.fromstring(get(RSS_URL))

    posts = []
    for item in root.iter("item"):
        link = item.findtext("link") or ""
        m = re.search(rf"blog\.naver\.com/{re.escape(BLOG_ID)}/(\d+)", link)
        if not m:
            continue
        post = {
            "title": (item.findtext("title") or "").strip(),
            # 추적용 꼬리표를 떼고 글 주소만
            "url": f"https://blog.naver.com/{BLOG_ID}/{m.group(1)}",
            "date": parsedate_to_datetime(item.findtext("pubDate")).strftime("%Y-%m-%d"),
            "category": (item.findtext("category") or "").strip(),
        }
        posts.append(post)

    if not posts:
        sys.exit("RSS에 글이 없어요. 기존 posts.json을 그대로 둡니다.")

    with open(OUT, "w", encoding="utf-8") as f:
        json.dump({"blog": f"https://blog.naver.com/{BLOG_ID}", "posts": posts}, f, ensure_ascii=False, indent=1)
        f.write("\n")
    print(f"{len(posts)} posts -> {OUT}")


if __name__ == "__main__":
    main()
