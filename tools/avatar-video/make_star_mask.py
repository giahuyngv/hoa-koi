"""Tạo mặt nạ dấu ✦ (watermark cố định góc dưới phải) từ khung 0 của nhiều video cùng kích thước. Dùng: python make_star_mask.py star_mask.png v1.mp4 v2.mp4 ..."""
import cv2,numpy as np,sys,subprocess,tempfile,os
import imageio_ffmpeg;FF=imageio_ffmpeg.get_ffmpeg_exe()
out=sys.argv[1];T=[]
for v in sys.argv[2:]:
    p=os.path.join(tempfile.mkdtemp(),'f.png')
    subprocess.run([FF,'-v','error','-y','-i',v,'-frames:v','1',p],check=True)
    a=cv2.imread(p).astype(np.float32);H,W=a.shape[:2]
    BG=np.median(a.reshape(-1,3)[:2000],axis=0)
    t=(a-BG)/np.maximum(255-BG,1);tm=t.mean(-1);ts=t.std(-1)
    bgish=np.sqrt(((a-(BG+(255-BG)*tm[...,None].clip(0,1)))**2).sum(-1))<25
    ok=(ts<0.07)&bgish&(tm>-0.05)
    box=np.zeros_like(ok);box[int(H*.86):int(H*.96),int(W*.76):int(W*.91)]=True
    T.append(np.where(ok&box,tm.clip(0,1),np.nan))
T=np.array(T);n=np.sum(~np.isnan(T),0);med=np.nanmedian(np.where(n>=2,T,np.nan),0) if len(T)>1 else T[0]
med=np.nan_to_num(med,nan=0.0);med[med<0.04]=0
cv2.imwrite(out,(med*255).round().astype(np.uint8));ys,xs=np.where(med>0)
print('star px',len(xs),'bbox',xs.min(),xs.max(),ys.min(),ys.max(),'opacity max',round(med.max(),2))
