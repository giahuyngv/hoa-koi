// 2.5D Ambient, Tabletop-Landing & Impact Particle Renderer
// Supports all 12 Hanafuda Month Floral Themes + Legacy Opponent Particle Themes

const MONTH_PARTICLE_MAP = {
  1: 'matsu',
  2: 'ume',
  3: 'sakura',
  4: 'fuji',
  5: 'ayame',
  6: 'botan',
  7: 'hagi',
  8: 'susuki',
  9: 'kiku',
  10: 'momiji',
  11: 'yanagi',
  12: 'kiri'
};

export class ParticleSystem25D {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.theme = 'kiku';
    this.monthNumber = 9;
    this.ambientParticles = [];
    this.landedParticles = [];
    this.burstParticles = [];
    this.running = false;
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    // Preload Month 9 (Kiku) standalone watercolor petal sprites (2 red + 2 yellow)
    this.kikuPetalSprites = [
      './public/assets/diorama/month9/kiku_petal_red_1.webp?v=32',
      './public/assets/diorama/month9/kiku_petal_yellow_1.webp?v=32',
      './public/assets/diorama/month9/kiku_petal_red_2.webp?v=32',
      './public/assets/diorama/month9/kiku_petal_yellow_2.webp?v=32'
    ].map((src) => {
      const img = new Image();
      img.decoding = 'async';
      img.src = src;
      return img;
    });

    this.handleResize = () => {
      if (!this.canvas) return;
      this.width = this.canvas.width = window.innerWidth;
      this.height = this.canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
    this.initAmbient(20);
  }

  setTheme(theme) {
    this.theme = theme || 'kiku';
    this.landedParticles = [];
    this.initAmbient(20);
  }

  setMonthTheme(monthNumber = 9) {
    const m = ((Number(monthNumber) - 1) % 12) + 1;
    this.monthNumber = m;
    this.theme = MONTH_PARTICLE_MAP[m] || 'kiku';
    this.landedParticles = [];
    this.initAmbient(20);
  }

  initAmbient(count = 20) {
    this.ambientParticles = [];
    for (let i = 0; i < count; i++) {
      this.ambientParticles.push(this.createAmbientParticle(true));
    }
  }

  createAmbientParticle(randomY = false) {
    const isRain = this.theme === 'yanagi';
    // Concentrate 85% of falling petals within the central playing board horizontal bounds
    const inBoardBand = Math.random() < 0.85;
    const x = inBoardBand
      ? this.width * (0.27 + Math.random() * 0.46)
      : Math.random() * this.width;
    const y = randomY ? Math.random() * (this.height * 0.68) : -24 - Math.random() * 40;
    // Co theo tỉ lệ UI (mobile/iPad) để cánh hoa không quá to so với bàn chơi
    const uiScale = window.HK_UI_SCALE || 1;
    const size = (isRain ? 7 + Math.random() * 8 : 6.5 + Math.random() * 8.0) * uiScale;
    const speedY = (isRain ? 4.2 + Math.random() * 2.8 : 0.44 + Math.random() * 0.82) * uiScale;
    const speedX = (isRain ? -1.1 - Math.random() * 0.6 : -0.42 + Math.random() * 0.88) * uiScale;
    const rot = Math.random() * Math.PI * 2;
    const rotSpeed = (-0.02 + Math.random() * 0.04);

    // 55% of particles passing through the central tabletop region land on the mat
    const canLandOnTable = Math.random() < 0.55;
    const tableTopY = this.height * 0.18;
    const tableBottomY = this.height * 0.64;
    const landY = tableTopY + Math.random() * (tableBottomY - tableTopY);

    return {
      x,
      y,
      size,
      speedX,
      speedY,
      rot,
      rotSpeed,
      alpha: 0.68 + Math.random() * 0.3,
      swayOffset: Math.random() * 100,
      variant: Math.floor(Math.random() * 4),
      canLandOnTable,
      landY
    };
  }

  isInsideTableBounds(x, y) {
    const left = this.width * 0.27;
    const right = this.width * 0.73;
    const top = this.height * 0.17;
    const bottom = this.height * 0.65;
    return x >= left && x <= right && y >= top && y <= bottom;
  }

  spawnLandedParticle(p) {
    if (this.landedParticles.length >= 10) {
      this.landedParticles.shift();
    }
    const isWaterRipple = this.theme === 'yanagi' || this.theme === 'ayame';
    this.landedParticles.push({
      x: p.x,
      y: p.y,
      size: p.size * 0.95,
      rot: p.rot,
      alpha: isWaterRipple ? 0.65 : 0.92,
      maxLife: isWaterRipple ? 1.35 : 5.0 + Math.random() * 2.8,
      age: 0,
      swayOffset: p.swayOffset,
      variant: p.variant,
      isWaterRipple
    });
  }

  /**
   * Triggers a celebratory burst at screen coordinates (x, y) when cards are captured or Yaku is formed
   */
  triggerBurst(x, y, color = '#ffd166', count = 26) {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.3;
      const speed = 2.2 + Math.random() * 6.5;
      this.burstParticles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.2,
        size: (3 + Math.random() * 5.5) * (window.HK_UI_SCALE || 1),
        color,
        alpha: 1,
        decay: 0.02 + Math.random() * 0.02
      });
    }
  }

  start() {
    if (this.running) return;
    this.running = true;
    let lastTime = performance.now();
    const tick = (now) => {
      if (!this.running) return;
      // Tab ẩn: dừng hẳn vòng lặp, chạy lại khi tab hiện (xem visibilitychange bên dưới)
      if (document.hidden) {
        this.pausedByVisibility = true;
        return;
      }
      const dt = Math.min(0.05, (now - lastTime) * 0.001);
      lastTime = now;
      this.updateAndDraw(now * 0.001, dt);
      requestAnimationFrame(tick);
    };
    if (!this.handleVisibility) {
      this.handleVisibility = () => {
        if (!document.hidden && this.running && this.pausedByVisibility) {
          this.pausedByVisibility = false;
          lastTime = performance.now();
          requestAnimationFrame(tick);
        }
      };
      document.addEventListener('visibilitychange', this.handleVisibility);
    }
    requestAnimationFrame(tick);
  }

  stop() {
    this.running = false;
  }

  drawSingleFloraMotif(ctx, size, variant = 0, isLanded = false) {
    switch (this.theme) {
      case 'matsu': {
        // Pine needle cluster or golden New Year snow crystal
        if (variant === 0) {
          ctx.fillStyle = '#ffd166';
          ctx.beginPath();
          ctx.arc(0, 0, size * 0.32, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.strokeStyle = '#2d6a4f';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(0, size * 0.55);
          ctx.lineTo(-size * 0.45, -size * 0.65);
          ctx.moveTo(0, size * 0.55);
          ctx.lineTo(size * 0.45, -size * 0.65);
          ctx.stroke();
        }
        break;
      }

      case 'ume': {
        // Rounded red/pink Ume plum blossom petal
        const r = size * 0.58;
        ctx.fillStyle = variant === 0 ? '#e63946' : '#ff758f';
        ctx.strokeStyle = '#9e1b24';
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#ffd166';
        ctx.beginPath();
        ctx.arc(0, 0, r * 0.28, 0, Math.PI * 2);
        ctx.fill();
        break;
      }

      case 'fuji': {
        // Lavender & violet Wisteria teardrop petal
        const r = size * 0.68;
        ctx.fillStyle = variant === 0 ? '#9d4edd' : '#c77dff';
        ctx.strokeStyle = '#5a189a';
        ctx.lineWidth = 0.65;
        ctx.beginPath();
        ctx.moveTo(0, -r * 0.85);
        ctx.quadraticCurveTo(r * 0.75, 0, 0, r * 0.85);
        ctx.quadraticCurveTo(-r * 0.75, 0, 0, -r * 0.85);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        break;
      }

      case 'ayame': {
        // Iris violet petal or glowing pond dewdrop
        if (variant === 0) {
          ctx.fillStyle = '#4cc9f0';
          ctx.shadowColor = '#4895ef';
          ctx.shadowBlur = isLanded ? 2 : 6;
          ctx.beginPath();
          ctx.arc(0, 0, size * 0.36, 0, Math.PI * 2);
          ctx.fill();
        } else {
          const r = size * 0.68;
          ctx.fillStyle = '#5e60ce';
          ctx.strokeStyle = '#ffd166';
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.ellipse(0, 0, r * 0.48, r * 0.85, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        }
        break;
      }

      case 'botan': {
        // Lush ruffled crimson/rose Peony petal + gold butterfly dust
        if (variant === 0) {
          ctx.fillStyle = '#ffd166';
          ctx.beginPath();
          ctx.arc(0, 0, size * 0.32, 0, Math.PI * 2);
          ctx.fill();
        } else {
          const r = size * 0.76;
          ctx.fillStyle = variant === 1 ? '#d90429' : '#ff4d6d';
          ctx.strokeStyle = '#ffd166';
          ctx.lineWidth = 0.75;
          ctx.beginPath();
          ctx.moveTo(0, r * 0.7);
          ctx.bezierCurveTo(-r, r * 0.2, -r * 0.9, -r * 0.75, -r * 0.3, -r * 0.65);
          ctx.quadraticCurveTo(0, -r * 0.95, r * 0.3, -r * 0.65);
          ctx.bezierCurveTo(r * 0.9, -r * 0.75, r, r * 0.2, 0, r * 0.7);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        }
        break;
      }

      case 'hagi': {
        // Small magenta/rose Bush Clover floret
        const r = size * 0.52;
        ctx.fillStyle = variant === 0 ? '#d81159' : '#ff70a6';
        ctx.strokeStyle = '#7209b7';
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.ellipse(0, 0, r * 0.85, r * 0.52, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        break;
      }

      case 'susuki': {
        // Silver pampas grass seed plume & warm Tsukimi moon mote
        if (variant === 0) {
          ctx.fillStyle = '#fff3b0';
          ctx.shadowColor = '#ffd166';
          ctx.shadowBlur = isLanded ? 2 : 7;
          ctx.beginPath();
          ctx.arc(0, 0, size * 0.34, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.strokeStyle = '#f8f9fa';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(-size * 0.6, size * 0.3);
          ctx.quadraticCurveTo(0, -size * 0.2, size * 0.65, -size * 0.35);
          ctx.stroke();
        }
        break;
      }

      case 'kiku': {
        // Draw one of the 4 standalone watercolor Chrysanthemum petal PNGs (2 red + 2 yellow)
        const sprite =
          this.kikuPetalSprites &&
          this.kikuPetalSprites[Math.abs(variant) % this.kikuPetalSprites.length];
        if (sprite && sprite.complete && sprite.naturalWidth > 0) {
          const h = size * (isLanded ? 2.25 : 2.45);
          const w = h * (sprite.naturalWidth / sprite.naturalHeight);
          if (isLanded) {
            ctx.shadowColor = 'rgba(20, 10, 5, 0.42)';
            ctx.shadowBlur = 3;
            ctx.shadowOffsetY = 2;
          }
          ctx.drawImage(sprite, -w * 0.5, -h * 0.5, w, h);
        } else {
          const r = size * 0.78;
          ctx.fillStyle = variant % 2 === 0 ? '#e02424' : '#ffb703';
          ctx.strokeStyle = '#18100c';
          ctx.lineWidth = 1.1;
          ctx.beginPath();
          ctx.ellipse(0, 0, r * 0.36, r * 0.9, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        }
        break;
      }

      case 'momiji': {
        // 5-lobed Japanese Autumn Maple Leaf
        ctx.fillStyle = variant === 0 ? '#d93829' : '#f48c06';
        ctx.strokeStyle = '#780000';
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(0, -size);
        ctx.lineTo(size * 0.32, -size * 0.35);
        ctx.lineTo(size * 0.88, -size * 0.22);
        ctx.lineTo(size * 0.42, size * 0.18);
        ctx.lineTo(size * 0.55, size * 0.75);
        ctx.lineTo(0, size * 0.38);
        ctx.lineTo(-size * 0.55, size * 0.75);
        ctx.lineTo(-size * 0.42, size * 0.18);
        ctx.lineTo(-size * 0.88, -size * 0.22);
        ctx.lineTo(-size * 0.32, -size * 0.35);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        break;
      }

      case 'yanagi': {
        // Slanted silver-blue raindrop or slender green willow leaf
        if (variant === 0) {
          ctx.fillStyle = '#2a9d8f';
          ctx.strokeStyle = '#1d3557';
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.ellipse(0, 0, size * 0.22, size * 0.85, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        } else {
          ctx.strokeStyle = 'rgba(168, 218, 220, 0.82)';
          ctx.lineWidth = 1.35;
          ctx.beginPath();
          ctx.moveTo(0, -size * 0.8);
          ctx.lineTo(-size * 0.25, size * 0.8);
          ctx.stroke();
        }
        break;
      }

      case 'kiri':
      case 'celestial': {
        // Imperial violet Paulownia blossom or golden Phoenix feather spark
        if (variant === 0) {
          ctx.fillStyle = '#ffd166';
          ctx.shadowColor = '#f48c06';
          ctx.shadowBlur = isLanded ? 3 : 8;
          ctx.beginPath();
          ctx.ellipse(0, 0, size * 0.28, size * 0.75, 0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          const r = size * 0.65;
          ctx.fillStyle = '#9d4edd';
          ctx.strokeStyle = '#ffd166';
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(0, -r * 0.8);
          ctx.bezierCurveTo(r * 0.8, -r * 0.5, r * 0.7, r * 0.6, 0, r * 0.85);
          ctx.bezierCurveTo(-r * 0.7, r * 0.6, -r * 0.8, -r * 0.5, 0, -r * 0.8);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        }
        break;
      }

      case 'goldleaf':
        ctx.fillStyle = '#e09f1f';
        ctx.strokeStyle = '#fff3b0';
        ctx.lineWidth = 0.8;
        ctx.fillRect(-size * 0.42, -size * 0.42, size * 0.84, size * 0.84);
        ctx.strokeRect(-size * 0.42, -size * 0.42, size * 0.84, size * 0.84);
        break;

      case 'spiritfire':
      case 'lantern':
        ctx.fillStyle = this.theme === 'spiritfire' ? '#2b9348' : '#e85d04';
        ctx.shadowColor = this.theme === 'spiritfire' ? '#52b788' : '#ff9e00';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(0, 0, size * 0.42, 0, Math.PI * 2);
        ctx.fill();
        break;

      case 'sakura':
      default: {
        // Notched pink Sakura cherry blossom petal
        const r = size * 0.74;
        ctx.fillStyle = variant === 0 ? '#ffb3c6' : '#ff8fab';
        ctx.strokeStyle = '#e64980';
        ctx.lineWidth = 0.75;
        ctx.beginPath();
        ctx.moveTo(0, r * 0.75);
        ctx.bezierCurveTo(-r * 0.9, r * 0.25, -r * 0.85, -r * 0.65, -r * 0.22, -r * 0.85);
        ctx.lineTo(0, -r * 0.48);
        ctx.lineTo(r * 0.22, -r * 0.85);
        ctx.bezierCurveTo(r * 0.85, -r * 0.65, r * 0.9, r * 0.25, 0, r * 0.75);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        break;
      }
    }
  }

  updateAndDraw(t, dt = 0.016) {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    // 1. Draw Landed Petals / Water Ripples Resting on the 2.5D Tabletop
    for (let i = this.landedParticles.length - 1; i >= 0; i--) {
      const lp = this.landedParticles[i];
      lp.age += dt;
      if (lp.age >= lp.maxLife) {
        this.landedParticles.splice(i, 1);
        continue;
      }

      const progress = lp.age / lp.maxLife;
      const fadeAlpha =
        progress < 0.15
          ? (progress / 0.15) * lp.alpha
          : progress > 0.72
          ? ((1 - progress) / 0.28) * lp.alpha
          : lp.alpha;

      ctx.save();
      ctx.globalAlpha = Math.max(0, fadeAlpha);

      if (lp.isWaterRipple) {
        const radius = 3 + progress * 22;
        ctx.translate(lp.x, lp.y);
        ctx.scale(1, 0.58); // 2.5D tabletop foreshortening
        ctx.strokeStyle = this.theme === 'ayame' ? '#90e0ef' : '#a8dadc';
        ctx.lineWidth = 1.4 * (1 - progress);
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.stroke();
      } else {
        const breezeQuiver = Math.sin(t * 2.4 + lp.swayOffset) * 1.1;
        ctx.translate(lp.x + breezeQuiver, lp.y);
        ctx.scale(1, 0.72); // Flatten slightly onto the 2.5D Tatami plane
        ctx.rotate(lp.rot + Math.sin(t * 1.8 + lp.swayOffset) * 0.08);
        this.drawSingleFloraMotif(ctx, lp.size, lp.variant, true);
      }
      ctx.restore();
    }

    // 2. Ambient Airborne Particles (Flying & Landing on Tabletop)
    for (let p of this.ambientParticles) {
      const windSway = this.theme === 'yanagi' ? 0.1 : Math.sin(t * 1.3 + p.swayOffset) * 0.55;
      p.x += p.speedX + windSway;
      p.y += p.speedY;
      if (this.theme !== 'yanagi') {
        p.rot += p.rotSpeed;
      }

      // Check if this particle should gently land on the 2.5D playing table
      if (
        p.canLandOnTable &&
        p.y >= p.landY &&
        this.isInsideTableBounds(p.x, p.y)
      ) {
        this.spawnLandedParticle(p);
        p.y = -24 - Math.random() * 30;
        p.x = Math.random() * this.width;
        p.landY = this.height * (0.16 + Math.random() * 0.51);
        continue;
      }

      if (p.y > this.height + 30) {
        p.y = -20;
        p.x = Math.random() * this.width;
      }
      if (p.x < -30) p.x = this.width + 20;
      if (p.x > this.width + 30) p.x = -20;

      ctx.save();
      ctx.translate(p.x, p.y);
      if (this.theme !== 'yanagi') {
        ctx.rotate(p.rot);
      }
      ctx.globalAlpha = p.alpha;
      this.drawSingleFloraMotif(ctx, p.size, p.variant, false);
      ctx.restore();
    }

    // 3. Celebratory Impact Burst Particles
    for (let i = this.burstParticles.length - 1; i >= 0; i--) {
      const b = this.burstParticles[i];
      b.x += b.vx;
      b.y += b.vy;
      b.vy += 0.14;
      b.alpha -= b.decay;

      if (b.alpha <= 0) {
        this.burstParticles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = Math.max(0, b.alpha);
      ctx.fillStyle = b.color;
      ctx.shadowColor = b.color;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }
}

