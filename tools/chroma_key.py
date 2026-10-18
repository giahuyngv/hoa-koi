"""Tach nen chroma (xanh la #00FF00 hoac hong #FF00FF) -> PNG trong suot.

Dung: python tools/chroma_key.py <in.png> <out.png> [--key green|magenta] [--max 768]
"""
import argparse
import numpy as np
from PIL import Image, ImageFilter


def key_out(img, key):
    a = np.asarray(img.convert('RGB')).astype(np.float32) / 255.0
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    if key == 'green':
        # do "troi" cua kenh xanh so voi 2 kenh con lai
        spill = g - np.maximum(r, b)
    else:
        spill = np.minimum(r, b) - g
    # spill ~1 o nen thuan, ~0 o chu the
    alpha = 1.0 - np.clip((spill - 0.12) / (0.55 - 0.12), 0.0, 1.0)
    # khu loang mau nen o vien (despill)
    s = np.clip(spill, 0.0, 1.0)
    if key == 'green':
        out = np.stack([r, g - s, b], -1)
    else:
        out = np.stack([r - s, g, b - s], -1)
    rgba = np.dstack([out, alpha])
    im = Image.fromarray((rgba * 255).astype(np.uint8), 'RGBA')
    # lam muot vien alpha 1 chut
    al = im.getchannel('A').filter(ImageFilter.GaussianBlur(0.6))
    im.putalpha(al)
    return im


def main():
    p = argparse.ArgumentParser()
    p.add_argument('src')
    p.add_argument('dst')
    p.add_argument('--key', default='green', choices=['green', 'magenta'])
    p.add_argument('--max', type=int, default=768)
    args = p.parse_args()
    im = key_out(Image.open(args.src), args.key)
    bbox = im.getchannel('A').point(lambda v: 255 if v > 8 else 0).getbbox()
    if bbox:
        pad = 12
        bbox = (max(0, bbox[0] - pad), max(0, bbox[1] - pad), min(im.width, bbox[2] + pad), min(im.height, bbox[3] + pad))
        im = im.crop(bbox)
    im.thumbnail((args.max, args.max), Image.LANCZOS)
    im.save(args.dst, optimize=True)
    print(args.dst, im.size)


if __name__ == '__main__':
    main()
