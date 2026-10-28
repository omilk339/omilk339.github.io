"""네이버 블로그 RSS를 읽어 첫 화면용 posts.json과 글 대표 사진을 만듭니다.

GitHub Actions가 1시간마다 실행합니다(.github/workflows/blog-posts.yml).
브라우저는 네이버 RSS를 직접 읽을 수 없고(다른 사이트 접근 차단),
네이버 사진도 다른 사이트에서 바로 보여 줄 수 없어서 이렇게 미리 받아 둡니다.
"""
import html
import json
import os
import re
import sys
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from email.utils import parsedate_to_datetime

BLOG_ID = "simplehi-"
RSS_URL = f"https://rss.blog.naver.com/{BLOG_ID}.xml"
OUT = sys.argv[1] if len(sys.argv) > 1 else "posts.json"
THUMB_DIR = os.path.join(os.path.dirname(os.path.abspath(OUT)), "img", "posts")
UA = "Mozilla/5.0 (posts.json updater)"


def get(url, referer=None):
    headers = {"User-Agent": UA}
    if referer:
        headers["Referer"] = referer
    with urllib.request.urlopen(urllib.request.Request(url, headers=headers), timeout=30) as r:
        return r.read()


def save_thumb(post_id, description):
    """글의 첫 사진을 100×100 작은 크기로 받아 둡니다. 이미 있으면 다시 받지 않아요."""
    m = re.search(r'<img[^>]+src="([^"]+)"', description or "")
    if not m:
        return None
    # 꼬리표 없이 받으면 100×100 작은 사진이 와요. 한글 파일 이름도 받을 수 있게 주소를 바꿔 둡니다
    src = urllib.parse.quote(html.unescape(m.group(1)).split("?")[0], safe=":/%")
    name = f"{post_id}.png" if src.lower().endswith(".png") else f"{post_id}.jpg"
    path = os.path.join(THUMB_DIR, name)
    if not os.path.exists(path):
        try:
            data = get(src, referer="https://blog.naver.com/")
        except Exception as e:
            print(f"사진 못 받음 {post_id}: {e}")
            return None
        with open(path, "wb") as f:
            f.write(data)
    return f"img/posts/{name}"


def main():
    root = ET.fromstring(get(RSS_URL))
    os.makedirs(THUMB_DIR, exist_ok=True)

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
        thumb = save_thumb(m.group(1), item.findtext("description"))
        if thumb:
            post["thumb"] = thumb
        posts.append(post)

    if not posts:
        sys.exit("RSS에 글이 없어요. 기존 posts.json을 그대로 둡니다.")

    # 목록에서 빠진 글의 사진은 지워서 저장소가 커지지 않게
    keep = {os.path.basename(p["thumb"]) for p in posts if "thumb" in p}
    for f in os.listdir(THUMB_DIR):
        if f not in keep:
            os.remove(os.path.join(THUMB_DIR, f))

    with open(OUT, "w", encoding="utf-8") as f:
        json.dump({"blog": f"https://blog.naver.com/{BLOG_ID}", "posts": posts}, f, ensure_ascii=False, indent=1)
        f.write("\n")
    print(f"{len(posts)} posts, {len(keep)} thumbnails -> {OUT}")


if __name__ == "__main__":
    main()
