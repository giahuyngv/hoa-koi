"""Hoa Koi v2: tách nền xanh lá HOẶC xanh dương (tự nhận), xoá ✦ bằng inpaint theo mặt nạ --star + cắt + xuất MP4 xếp chồng (màu trên / alpha dưới)."""
import cv2,numpy as np,glob,os,sys,subprocess,tempfile,argparse
import imageio_ffmpeg;FF=imageio_ffmpeg.get_ffmpeg_exe()
ap=argparse.ArgumentParser();ap.add_argument('src');ap.add_argument('kind');ap.add_argument('out')
ap.add_argument('--rest');ap.add_argument('--star');ap.add_argument('--crop');ap.add_argument('--width',type=int,default=400,help='0 = giữ bề ngang gốc sau khi cắt');ap.add_argument('--star-k',type=float,default=1.0)
A=ap.parse_args()
tmp=tempfile.mkdtemp();subprocess.run([FF,'-v','error','-i',A.src,'-vf','fps=24',f'{tmp}/%03d.png'],check=True)
fs=sorted(glob.glob(f'{tmp}/*.png'))
BG=np.median(cv2.imread(fs[0]).reshape(-1,3)[:2000],axis=0).astype(np.float32)
KC=int(np.argmax(BG));OC=[c for c in (0,1,2) if c!=KC]
STAR=cv2.imread(A.star,0).astype(np.float32)/255*A.star_k if A.star else None
def unstar(img):
    if STAR is None:return img
    t=np.minimum(STAR,0.9)[...,None];u=(img.astype(np.float32)-255*t)/(1-t)
    bad=((STAR>0.02)&(u.min(-1)<-30)).astype(np.uint8)
    u=u.clip(0,255).astype(np.uint8)
    return cv2.inpaint(u,cv2.dilate(bad,np.ones((3,3),np.uint8)),4,cv2.INPAINT_TELEA) if bad.any() else u
def key(a):
    a0=a.astype(np.float32);a=unstar(a).astype(np.float32);b,g,r=a[...,0],a[...,1],a[...,2];d=a[...,KC]-np.maximum(a[...,OC[0]],a[...,OC[1]])
    dist=np.sqrt(((a-BG)**2).sum(-1))
    al=np.maximum(1-np.clip((d-20)/45,0,1),np.clip((dist-45)/65,0,1))
    if STAR is not None:
        tm=((a0-BG)/np.maximum(255-BG,1)).mean(-1).clip(0,1);lin=np.sqrt(((a0-(BG+(255-BG)*tm[...,None]))**2).sum(-1))
        al=np.where((STAR>0.02)&(lin<70),0,al)
        al=np.where(cv2.dilate((STAR>0.02).astype(np.uint8),np.ones((5,5),np.uint8))>0,cv2.morphologyEx(al,cv2.MORPH_OPEN,np.ones((7,7),np.uint8)),al)
    al=cv2.erode(al,np.ones((3,3),np.uint8),1);al=cv2.GaussianBlur(al,(3,3),0);al[al<0.05]=0
    solid=((d<5)&(al>0.97)).astype(np.float32);acc=np.zeros_like(a);w=np.zeros_like(al)
    for k in (5,11,21):acc+=cv2.GaussianBlur(a*solid[...,None],(k,k),0);w+=cv2.GaussianBlur(solid,(k,k),0)
    fill=acc/np.maximum(w,1e-4)[...,None];edge=(al<0.999)|(d>5)
    c=np.where(edge[...,None]&(w[...,None]>1e-3),fill,a)
    kk=a.copy();kk[...,KC]=np.minimum(a[...,KC],np.maximum(a[...,OC[0]],a[...,OC[1]]));lo=0.299*kk[...,2]+0.587*kk[...,1]+0.114*kk[...,0];lf=0.299*fill[...,2]+0.587*fill[...,1]+0.114*fill[...,0]
    c=np.where(edge[...,None],c*np.clip(lo/np.maximum(lf,1),0.4,1.3)[...,None],c)
    m=np.maximum(c[...,OC[0]],c[...,OC[1]]);c[...,KC]=np.minimum(c[...,KC],m+4)
    return np.dstack([c,al*255]).clip(0,255)
F=[key(cv2.imread(f)) for f in fs]
if A.crop: x0,x1,y0,y1=map(int,A.crop.split(','))
else:
    ys,xs=np.where(np.max([f[...,3] for f in F],axis=0)>10);x0,x1,y0,y1=max(0,xs.min()-6),xs.max()+6,max(0,ys.min()-6),ys.max()+6
print('crop',f'{x0},{x1},{y0},{y1}')
F=[f[y0:y1,x0:x1] for f in F]
sm=lambda x:cv2.resize(x,(100,152))
step=[np.abs(sm(F[i+1])-sm(F[i])).mean() for i in range(len(F)-1)]
mv=[i for i,s in enumerate(step) if s>1.0]
first,lastm=mv[0],mv[-1]
def blend(f,g,t):
    fa,ga=f[...,3:4]/255,g[...,3:4]/255;pc=f[...,:3]*fa*(1-t)+g[...,:3]*ga*t;pa=fa*(1-t)+ga*t
    return np.dstack([pc/np.maximum(pa,1e-4),pa*255])
N=4
if A.kind=='idle':
    i0=max(0,first-1);rest=F[i0]
    j0=min(range(max(i0+24,lastm-10),len(F)),key=lambda j:np.abs(sm(F[j])-sm(rest)).mean()+0.05*abs(j-lastm))
    seq=F[i0:j0];seq=[blend(f,rest,(n-(len(seq)-N)+1)/(N+1)) if n>=len(seq)-N else f for n,f in enumerate(seq)]
    rp=os.path.splitext(A.out)[0]+'_rest.png';cv2.imwrite(rp,rest.astype(np.uint8));print('rest frame ->',rp)
else:
    rest=cv2.imread(A.rest,cv2.IMREAD_UNCHANGED).astype(np.float32)
    i0=min(range(0,first+2),key=lambda i:np.abs(sm(F[i])-sm(rest)).mean())
    j0=min(range(lastm-6,len(F)),key=lambda j:np.abs(sm(F[j])-sm(rest)).mean()+0.15*abs(j-lastm))
    seq=F[i0:j0+1];L=len(seq)
    seq=[blend(f,rest,1-(n+1)/(N+1)) if n<N else (blend(f,rest,(n-(L-N)+1)/(N+1)) if n>=L-N else f) for n,f in enumerate(seq)]
o=tempfile.mkdtemp()
for n,f in enumerate(seq):cv2.imwrite(f'{o}/{n:03d}.png',f.clip(0,255).astype(np.uint8))
subprocess.run([FF,'-v','error','-y','-framerate','24','-i',f'{o}/%03d.png','-filter_complex',
 f'[0]scale={A.width if A.width>0 else (x1-x0)//2*2}:-2:flags=lanczos,format=rgba,split[c][a];[a]alphaextract,pad=iw:ih+16:0:16:black[al];[c]format=rgb24[cc];[cc][al]vstack,format=yuv420p',
 '-c:v','libx264','-crf','24','-preset','slow','-movflags','+faststart',A.out],check=True)
print(A.out,len(seq),'khung',round(len(seq)/24,2),'s',round(os.path.getsize(A.out)/1e6,2),'MB')
import shutil;shutil.rmtree(tmp,ignore_errors=True);shutil.rmtree(o,ignore_errors=True)  # dọn PNG tạm (mỗi clip ~70-100MB)
