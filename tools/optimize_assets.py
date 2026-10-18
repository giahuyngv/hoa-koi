# Chuyển ảnh nặng trong public/assets sang WebP (chỉ chạy ở máy dev, cần Pillow).
# Usage: python tools/optimize_assets.py
# - Ảnh gốc được chuyển vào _backup_assets/<đường dẫn cũ> (không deploy), script đọc lại từ đó nên chạy lại được.
# - Thêm ảnh mới (.jpg/.png) vào các thư mục dưới → chạy lại script rồi đổi đuôi tham chiếu trong src/ sang .webp.
import glob
import os
import shutil
import sys

from PIL import Image

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
BACKUP = os.path.join(ROOT, '_backup_assets')

# (glob trong public/assets, quality WebP)
GROUPS = [
    ('characters/*.jpg', 82),          # chân dung 896x1200
    ('yaku_popup/*.png', 85),          # ảnh popup Yaku (alpha)
    ('diorama/month9/*.png', 85),      # tiểu cảnh tháng 9 (alpha)
    ('cards/*.jpg', 85),               # 48 lá bài
    ('backs/*.jpg', 85),               # mặt sau
    ('pvp_arena_banner.jpg', 82),
]
SKIP = {'yaku_popup/paper_mask.png'}   # mask đã nhúng base64 trong main.css, không dùng file


def rel(p):
    return os.path.relpath(p, ROOT).replace('\\', '/')


def main():
    before = after = count = 0
    for pattern, quality in GROUPS:
        live = glob.glob(os.path.join(ROOT, 'public', 'assets', pattern))
        backed = glob.glob(os.path.join(BACKUP, 'public', 'assets', pattern))
        sources = {}
        for p in backed + live:  # bản trong public (mới thêm) ưu tiên hơn bản backup
            sources[rel(p).split('public/assets/', 1)[1]] = p
        for key, src in sorted(sources.items()):
            if key in SKIP:
                continue
            live_path = os.path.join(ROOT, 'public', 'assets', key)
            backup_path = os.path.join(BACKUP, 'public', 'assets', key)
            out_path = os.path.splitext(live_path)[0] + '.webp'
            im = Image.open(src)
            im.load()
            if im.mode not in ('RGB', 'RGBA'):
                im = im.convert('RGBA' if 'A' in im.getbands() or 'transparency' in im.info else 'RGB')
            im.save(out_path, 'WEBP', quality=quality, method=6, alpha_quality=90)
            if os.path.exists(live_path):
                os.makedirs(os.path.dirname(backup_path), exist_ok=True)
                shutil.move(live_path, backup_path)
            b, a = os.path.getsize(backup_path), os.path.getsize(out_path)
            before += b
            after += a
            count += 1
            print(f'{key}: {b // 1024} KB -> {a // 1024} KB')
    if count:
        print(f'\n{count} file: {before / 1048576:.2f} MB -> {after / 1048576:.2f} MB (-{100 - 100 * after / before:.0f}%)')
    return 0


if __name__ == '__main__':
    sys.exit(main())
