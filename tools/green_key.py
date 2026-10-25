"""Tach nen xanh chroma (#00FF00) -> PNG/WebP trong suot, co khu lem xanh (despill).

Alpha tinh theo do troi cua kenh G so voi max(R,B) nen vung trang/xam/den cua vat
the (vd than hac) khong bi an mat nhu khi tach nen trang. Chi dung cho vat the
KHONG co mau xanh la (cay thong xanh -> dung white_key.py).

Dung: python tools/green_key.py <in.png> <out.png|.webp> [--lo 40] [--hi 140] [--crop]
"""
import argparse
import numpy as np
from PIL import Image, ImageFilter


def key_green(img, lo=40, hi=140):
    a = np.asarray(img.convert('RGB')).astype(np.float32)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    spill = g - np.maximum(r, b)          # >0 khi xanh troi
    alpha = 1.0 - np.clip((spill - lo) / (hi - lo), 0.0, 1.0)
    # chi giu vung lien voi vat the chinh: bo dom xanh le
    m = Image.fromarray((alpha * 255).astype(np.uint8))
    m = m.filter(ImageFilter.MedianFilter(3))
    alpha = np.asarray(m).astype(np.float32) / 255.0
    # khu tron mau nen: c = (obs - (1-a)*bg) / a, bg = (0,255,0)
    sa = np.maximum(alpha, 1e-3)
    out = a.copy()
    out[..., 1] = (g - (1.0 - sa) * 255.0) / sa
    # despill: G khong vuot qua max(R,B) (vat the khong co mau xanh)
    out[..., 1] = np.minimum(out[..., 1], np.maximum(r, b))
    out = np.clip(out, 0, 255)
    # vien: co alpha 1px de het vet xanh mo
    am = Image.fromarray((alpha * 255).astype(np.uint8)).filter(ImageFilter.MinFilter(3))
    am = am.filter(ImageFilter.GaussianBlur(0.6))
    rgba = np.dstack([out, np.asarray(am).astype(np.float32)])
    return Image.fromarray(rgba.astype(np.uint8), 'RGBA')


if __name__ == '__main__':
    ap = argparse.ArgumentParser()
    ap.add_argument('src')
    ap.add_argument('dst')
    ap.add_argument('--lo', type=float, default=40)
    ap.add_argument('--hi', type=float, default=140)
    ap.add_argument('--crop', action='store_true', help='cat sat vat the (chua 4px)')
    ns = ap.parse_args()
    im = key_green(Image.open(ns.src), ns.lo, ns.hi)
    if ns.crop:
        x0, y0, x1, y1 = im.getchannel('A').point(lambda v: 255 if v > 8 else 0).getbbox()
        im = im.crop((max(0, x0 - 4), max(0, y0 - 4), min(im.width, x1 + 4), min(im.height, y1 + 4)))
    im.save(ns.dst)
    print(ns.dst, im.size)
