"""Tach nen trang (anh gen tren nen trang) -> PNG/WebP trong suot.

Flood-fill tu mep anh nen chi xoa vung trang noi voi nen; vung trang ben trong
nhan vat (ao trang, toc bach kim) duoc giu. Vien duoc lam mem va khu quang trang.

Dung: python tools/white_key.py <in.png> <out.png|.webp> [--thresh 28] [--max 1200] [--pocket 400]
"""
import argparse
import numpy as np
from PIL import Image, ImageDraw, ImageFilter


def white_pockets(arr, bg, min_area, lo=246):
    """Vung trang tinh khep kin (bi vien/net chuyen dong bao quanh) du lon -> coi la nen.
    Vai trang co do bong it khi trang tinh tren dien rong nen duoc giu."""
    w = ~bg & (arr.min(-1) >= lo) & ((arr.max(-1) - arr.min(-1)) < 12)
    mask = Image.fromarray((w * 255).astype(np.uint8))
    # mo hinh thai hoc: bo vet trang manh/nho -> it hat giong
    seeds = np.asarray(mask.filter(ImageFilter.MinFilter(5))) == 255
    out = np.zeros(w.shape, bool)
    while True:
        ys, xs = np.nonzero(seeds & ~out)
        if len(ys) == 0:
            break
        work = mask.copy()
        ImageDraw.floodfill(work, (int(xs[0]), int(ys[0])), 100)
        comp = np.asarray(work) == 100
        seeds = seeds & ~comp
        if comp.sum() >= min_area:
            out |= comp
    return out


def key_white(img, thresh, pocket_min=400):
    rgb = img.convert('RGB')
    w, h = rgb.size
    # xoa vien manh model hay ve sat mep (de flood-fill khong bi chan)
    ImageDraw.Draw(rgb).rectangle((0, 0, w - 1, h - 1), outline=(255, 255, 255), width=4)
    pad = Image.new('RGB', (w + 2, h + 2), (255, 255, 255))
    pad.paste(rgb, (1, 1))
    ImageDraw.floodfill(pad, (0, 0), (255, 0, 254), thresh=thresh)
    p = np.asarray(pad)[1:-1, 1:-1]
    bg = (p[..., 0] == 255) & (p[..., 1] == 0) & (p[..., 2] == 254)
    if pocket_min:
        bg |= white_pockets(np.asarray(rgb), bg, pocket_min)
    a = np.asarray(rgb).astype(np.float32) / 255.0
    # Do "trang" -> alpha mem o dai vien (2px quanh vung nen)
    soft = 1.0 - np.clip((a.min(-1) - 0.80) / 0.20, 0.0, 1.0)
    band = np.asarray(Image.fromarray((bg * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(5))) > 0
    alpha = np.where(bg, 0.0, np.where(band, np.maximum(soft, 0.35), 1.0))
    alpha = np.where(bg, 0.0, alpha)
    # khu quang trang: c = (c - (1-a)) / a
    sa = np.maximum(alpha, 1e-3)[..., None]
    out = np.clip((a - (1.0 - sa)) / sa, 0.0, 1.0)
    rgba = np.dstack([out, alpha])
    im = Image.fromarray((rgba * 255).astype(np.uint8), 'RGBA')
    im.putalpha(im.getchannel('A').filter(ImageFilter.GaussianBlur(0.5)))
    return im


def main():
    p = argparse.ArgumentParser()
    p.add_argument('src')
    p.add_argument('dst')
    p.add_argument('--thresh', type=int, default=28)
    p.add_argument('--max', type=int, default=1200)
    p.add_argument('--pocket', type=int, default=400, help='dien tich toi thieu vung trang khep kin bi xoa (0 = tat)')
    args = p.parse_args()
    im = key_white(Image.open(args.src), args.thresh, args.pocket)
    bbox = im.getchannel('A').point(lambda v: 255 if v > 8 else 0).getbbox()
    if bbox:
        m = 8
        im = im.crop((max(0, bbox[0] - m), max(0, bbox[1] - m), min(im.width, bbox[2] + m), min(im.height, bbox[3] + m)))
    if max(im.size) > args.max:
        im.thumbnail((args.max, args.max), Image.LANCZOS)
    if args.dst.lower().endswith('.webp'):
        im.save(args.dst, 'WEBP', quality=88, method=6)
    else:
        im.save(args.dst, optimize=True)
    print(args.dst, im.size)


if __name__ == '__main__':
    main()
