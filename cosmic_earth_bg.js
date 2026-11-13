/**
 * =========================================================================
 * COSMIC 3D EARTH & ORBITAL SATELLITE CONSTELLATION (GPM • MODIS • SMAP)
 * Authentic NASA Mission Control Photorealistic Background Engine
 * =========================================================================
 *
 * 1. Photorealistic, 100% Opaque Central 3D Earth:
 *    - Scaled 2.4x and shifted to the right so half sphere covers right area.
 *    - 100% solid, opaque, rich azure oceans, lush continents, golden deserts,
 *      snow-capped Himalayas, and night-side city light clusters.
 *    - Ocean specular reflectivity & realistic Rayleigh atmospheric halo.
 *    - Independent swirling cloud layer with realistic atmospheric drift.
 *    - Balanced cinematic solar illumination (crisp day/night terminator).
 *    - 4,500+ multi-spectral stars in deep space.
 *
 * 2. Hyper-Realistic 3D Background Satellites (SMAP, MODIS, GPM):
 *    - Procedural PBR materials: Photovoltaic solar cells with silver busbars,
 *      quilted gold Kapton MLI thermal blankets, brushed aerospace titanium,
 *      carbon-fiber composite trusses, and gold wire mesh reflectors.
 *    - SMAP: Octagonal composite bus, 6m deployable mesh reflector antenna on
 *      angled boom, offset RF feed horn, articulated solar wing, star trackers.
 *    - MODIS (Terra): Multi-bay gold/radiator chassis, Earth-facing optical
 *      aperture sunshade & cooler, steerable HGA dish, ASTER/CERES pods, 4-panel wing.
 *    - GPM Core: Hexagonal aerospace bus, symmetric port/starboard solar wings,
 *      nadir Dual-frequency Precipitation Radar, GMI radiometer dish.
 *    - Jewel-faceted beacon cores with dynamic PointLight illumination.
 *    - ZERO flat vector shapes: Volumetric 3D trajectory tubes (THREE.TubeGeometry)
 *      and dual-layer telemetry pulse packets replace flat lines and circles.
 *
 * 3. Distinct Foreground / Background Separation & Biosphere Mint Theme:
 *    - Background layer strictly at z-index: 1 with pointer-events: none.
 *    - HUD tags at z-index: 2 with pointer-events: none and frosted glass blur.
 *    - Smart screen margin opacity dimming behind left UI console cards.
 *    - Theme colors: Biosphere Mint (#10b981), Forest Teal (#0f766e),
 *      GPM Atmospheric Cyan (#0284c7), MODIS Thermal Amber (#d97706),
 *      SMAP Biosphere Emerald (#059669).
 * =========================================================================
 */

(function () {
  'use strict';

  // Global Namespace
  window.CosmicEarthBackground = {
    initialized: false,
    scene: null,
    camera: null,
    renderer: null,
    earth: null,
    clouds: null,
    satellites: [],
    animId: null,
    _aeroMats: null
  };

  /* Inject required CSS for HUD tags and Background Layer */
  function injectStyles() {
    if (document.getElementById('cosmic-earth-bg-styles')) return;
    const style = document.createElement('style');
    style.id = 'cosmic-earth-bg-styles';
    style.textContent = `
      #cosmic-earth-bg-layer {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        z-index: 1 !important;
        pointer-events: none !important;
        overflow: hidden !important;
        background: transparent !important;
      }

      #cosmic-earth-canvas {
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        width: 100% !important;
        height: 100% !important;
        pointer-events: none !important;
        display: block !important;
      }

      #satellite-hud-overlay {
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        width: 100% !important;
        height: 100% !important;
        pointer-events: none !important;
        overflow: hidden !important;
        z-index: 2 !important;
      }

      /* Satellite HUD Tags - Theme-Adaptive Translucent Frosted Glass */
      .sat-hud-tag {
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        pointer-events: none !important;
        user-select: none !important;
        backdrop-filter: blur(14px) !important;
        -webkit-backdrop-filter: blur(14px) !important;
        border-radius: 8px !important;
        padding: 5px 11px !important;
        font-family: 'JetBrains Mono', 'Inter', monospace !important;
        display: flex !important;
        flex-direction: column !important;
        gap: 3px !important;
        transition: opacity 0.25s ease, background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease !important;
        will-change: transform, opacity !important;
        white-space: nowrap !important;
        z-index: 2 !important;
      }

      /* 1. Biosphere Mint & Pearl Theme (Default / Fresh Ecological) */
      :root .sat-hud-tag,
      body.theme-biosphere-mint .sat-hud-tag {
        background: rgba(255, 255, 255, 0.82) !important;
        border: 1px solid rgba(16, 185, 129, 0.45) !important;
        box-shadow: 0 8px 24px rgba(15, 118, 110, 0.14), 0 2px 6px rgba(0, 0, 0, 0.04) !important;
      }
      :root .sat-hud-tag.gpm,
      body.theme-biosphere-mint .sat-hud-tag.gpm {
        border-left: 3.5px solid #0284c7 !important;
        box-shadow: 0 6px 20px rgba(2, 132, 199, 0.20) !important;
      }
      :root .sat-hud-tag.modis,
      body.theme-biosphere-mint .sat-hud-tag.modis {
        border-left: 3.5px solid #d97706 !important;
        box-shadow: 0 6px 20px rgba(217, 119, 6, 0.20) !important;
      }
      :root .sat-hud-tag.smap,
      body.theme-biosphere-mint .sat-hud-tag.smap {
        border-left: 3.5px solid #059669 !important;
        box-shadow: 0 6px 20px rgba(5, 150, 105, 0.20) !important;
      }

      :root .sat-hud-tag.gpm .sat-beacon-dot,
      body.theme-biosphere-mint .sat-hud-tag.gpm .sat-beacon-dot {
        background: #0284c7 !important;
        box-shadow: 0 0 10px #0284c7 !important;
      }
      :root .sat-hud-tag.modis .sat-beacon-dot,
      body.theme-biosphere-mint .sat-hud-tag.modis .sat-beacon-dot {
        background: #d97706 !important;
        box-shadow: 0 0 10px #d97706 !important;
      }
      :root .sat-hud-tag.smap .sat-beacon-dot,
      body.theme-biosphere-mint .sat-hud-tag.smap .sat-beacon-dot {
        background: #059669 !important;
        box-shadow: 0 0 10px #059669 !important;
      }

      :root .sat-title,
      body.theme-biosphere-mint .sat-title {
        font-size: 11px !important;
        font-weight: 800 !important;
        color: #0f172a !important;
        letter-spacing: 0.3px !important;
      }
      :root .sat-hud-tag.gpm .sat-title,
      body.theme-biosphere-mint .sat-hud-tag.gpm .sat-title {
        color: #0369a1 !important;
      }
      :root .sat-hud-tag.modis .sat-title,
      body.theme-biosphere-mint .sat-hud-tag.modis .sat-title {
        color: #92400e !important;
      }
      :root .sat-hud-tag.smap .sat-title,
      body.theme-biosphere-mint .sat-hud-tag.smap .sat-title {
        color: #065f46 !important;
      }

      :root .sat-alt-chip,
      body.theme-biosphere-mint .sat-alt-chip {
        font-size: 9px !important;
        font-weight: 700 !important;
        padding: 1.5px 6px !important;
        border-radius: 4px !important;
        background: rgba(16, 185, 129, 0.12) !important;
        color: #065f46 !important;
        border: 1px solid rgba(16, 185, 129, 0.30) !important;
        letter-spacing: 0.3px !important;
      }
      :root .sat-coords-val,
      body.theme-biosphere-mint .sat-coords-val {
        font-size: 10px !important;
        font-weight: 600 !important;
        color: #334155 !important;
        letter-spacing: 0.2px !important;
      }

      /* 2. Deep Galaxy Cosmic Space Theme (Translucent Dark Cyber Glass) */
      body.theme-cosmic-space .sat-hud-tag {
        background: rgba(8, 14, 28, 0.76) !important;
        border: 1px solid rgba(56, 189, 248, 0.35) !important;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.65) !important;
      }
      body.theme-cosmic-space .sat-hud-tag.gpm {
        border-left: 3.5px solid #38bdf8 !important;
        box-shadow: 0 4px 20px rgba(56, 189, 248, 0.25) !important;
      }
      body.theme-cosmic-space .sat-hud-tag.modis {
        border-left: 3.5px solid #f59e0b !important;
        box-shadow: 0 4px 20px rgba(245, 158, 11, 0.25) !important;
      }
      body.theme-cosmic-space .sat-hud-tag.smap {
        border-left: 3.5px solid #10b981 !important;
        box-shadow: 0 4px 20px rgba(16, 185, 129, 0.25) !important;
      }

      body.theme-cosmic-space .sat-hud-tag.gpm .sat-beacon-dot {
        background: #38bdf8 !important;
        box-shadow: 0 0 10px #38bdf8 !important;
      }
      body.theme-cosmic-space .sat-hud-tag.modis .sat-beacon-dot {
        background: #f59e0b !important;
        box-shadow: 0 0 10px #f59e0b !important;
      }
      body.theme-cosmic-space .sat-hud-tag.smap .sat-beacon-dot {
        background: #10b981 !important;
        box-shadow: 0 0 10px #10b981 !important;
      }

      body.theme-cosmic-space .sat-title {
        font-size: 11px !important;
        font-weight: 800 !important;
        color: #ffffff !important;
        letter-spacing: 0.4px !important;
      }
      body.theme-cosmic-space .sat-alt-chip {
        font-size: 9px !important;
        font-weight: 700 !important;
        padding: 1px 5px !important;
        border-radius: 4px !important;
        background: rgba(30, 41, 59, 0.8) !important;
        color: #cbd5e1 !important;
        border: 1px solid rgba(148, 163, 184, 0.25) !important;
        letter-spacing: 0.3px !important;
      }
      body.theme-cosmic-space .sat-coords-val {
        font-size: 10px !important;
        font-weight: 600 !important;
        color: #94a3b8 !important;
        letter-spacing: 0.2px !important;
      }

      .sat-hud-top {
        display: flex !important;
        align-items: center !important;
        gap: 6px !important;
      }

      .sat-beacon-dot {
        width: 7px !important;
        height: 7px !important;
        border-radius: 50% !important;
        display: inline-block !important;
        flex-shrink: 0 !important;
        animation: satPulseAnim 1.8s infinite ease-in-out !important;
      }

      @keyframes satPulseAnim {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.45; transform: scale(0.85); }
      }

      .sat-hud-tag.occluded {
        opacity: 0.20 !important;
        filter: grayscale(0.6) !important;
      }
    `;
    document.head.appendChild(style);
  }

  /* High-Resolution Photorealistic Earth Texture Generator (Vivid, Opaque, Non-Faded) */
  function createPhotorealisticEarthTexture() {
    const c = document.createElement('canvas');
    c.width = 2048;
    c.height = 1024;
    const ctx = c.getContext('2d');

    // 1. Vibrant Deep Azure Ocean with realistic oceanic depth gradient
    const oceanGrad = ctx.createLinearGradient(0, 0, 0, 1024);
    oceanGrad.addColorStop(0, '#03142e');    // Arctic ocean
    oceanGrad.addColorStop(0.2, '#052355');  // Mid-latitude north
    oceanGrad.addColorStop(0.5, '#073273');  // Tropical equatorial ocean (rich royal navy)
    oceanGrad.addColorStop(0.8, '#052355');  // Mid-latitude south
    oceanGrad.addColorStop(1, '#020f26');    // Antarctic ocean
    ctx.fillStyle = oceanGrad;
    ctx.fillRect(0, 0, 2048, 1024);

    // 2. Continental Shelf Marine Turquoise Glow around coastlines
    ctx.strokeStyle = 'rgba(14, 165, 233, 0.4)';
    ctx.lineWidth = 14;

    // 3. Continents & Landmasses Rendering
    // AFRICA & ARABIA
    ctx.fillStyle = '#1c6028'; // Lush Sub-Saharan green
    ctx.beginPath();
    ctx.ellipse(980, 540, 145, 215, 0.08, 0, Math.PI * 2);
    ctx.fill();
    // Sahara & Sahel (Vivid Desert Gold/Tan)
    ctx.fillStyle = '#b3823d';
    ctx.beginPath();
    ctx.ellipse(965, 415, 155, 78, 0.02, 0, Math.PI * 2);
    ctx.fill();
    // Arabian Peninsula
    ctx.fillStyle = '#bf934e';
    ctx.beginPath();
    ctx.moveTo(1110, 420);
    ctx.lineTo(1190, 440);
    ctx.lineTo(1170, 510);
    ctx.lineTo(1125, 490);
    ctx.closePath();
    ctx.fill();

    // EURASIA (Europe, Siberia, Central Asia)
    ctx.fillStyle = '#1e6827';
    ctx.beginPath();
    ctx.ellipse(1350, 310, 380, 175, 0, 0, Math.PI * 2);
    ctx.fill();
    // Gobi & Central Asian Steppe
    ctx.fillStyle = '#9e7c45';
    ctx.beginPath();
    ctx.ellipse(1385, 335, 145, 58, 0.05, 0, Math.PI * 2);
    ctx.fill();
    // Snow-capped Himalayas / Tibetan Plateau (Bright Pristine White)
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.ellipse(1435, 360, 95, 32, -0.05, 0, Math.PI * 2);
    ctx.fill();

    // NORTH & SOUTH AMERICA
    ctx.fillStyle = '#1c5e26'; // North America
    ctx.beginPath();
    ctx.ellipse(450, 340, 165, 195, -0.2, 0, Math.PI * 2);
    ctx.fill();
    // North American Western Deserts (Great Basin / Mojave)
    ctx.fillStyle = '#9c7940';
    ctx.beginPath();
    ctx.ellipse(390, 360, 45, 65, 0.1, 0, Math.PI * 2);
    ctx.fill();
    // South America (Amazon Basin & Andes)
    ctx.fillStyle = '#155220';
    ctx.beginPath();
    ctx.ellipse(585, 680, 125, 225, 0.2, 0, Math.PI * 2);
    ctx.fill();

    // AUSTRALIA (Vivid Red-Ochre Outback + Green Eastern Coast)
    ctx.fillStyle = '#a65427';
    ctx.beginPath();
    ctx.ellipse(1685, 720, 125, 88, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#1e6b2c';
    ctx.beginPath();
    ctx.ellipse(1780, 725, 25, 70, 0.1, 0, Math.PI * 2);
    ctx.fill();

    // ANTARCTICA & ARCTIC POLAR ICE CAPS (Opaque Pure White)
    ctx.fillStyle = '#f1f5f9';
    // Antarctica (South Pole)
    ctx.beginPath();
    ctx.ellipse(1024, 990, 1024, 85, 0, 0, Math.PI * 2);
    ctx.fill();
    // Greenland & Arctic Ice
    ctx.beginPath();
    ctx.ellipse(780, 160, 75, 110, -0.2, 0, Math.PI * 2);
    ctx.fill();

    // PHOTOREALISTIC INDIAN SUBCONTINENT
    // Lush Indo-Gangetic Plain, Deccan Plateau, Western & Eastern Ghats
    ctx.fillStyle = '#1e7529'; // Rich Agrarian Green
    ctx.beginPath();
    ctx.moveTo(1440, 380);
    ctx.lineTo(1515, 415); // Northeast India / Brahmaputra
    ctx.lineTo(1480, 520); // Odisha / Andhra / Bay of Bengal coast
    ctx.lineTo(1450, 670); // Kanyakumari Tip (Southern apex)
    ctx.lineTo(1405, 560); // Kerala / Western Ghats coastal belt
    ctx.lineTo(1370, 460); // Gujarat Kathiawar peninsula
    ctx.lineTo(1390, 405); // Punjab / Rajasthan
    ctx.closePath();
    ctx.fill();

    // Thar Desert (Golden Arid Sand)
    ctx.fillStyle = '#c99b4d';
    ctx.beginPath();
    ctx.ellipse(1396, 428, 32, 26, 0.2, 0, Math.PI * 2);
    ctx.fill();

    // Sri Lanka Island
    ctx.fillStyle = '#1e7529';
    ctx.beginPath();
    ctx.ellipse(1468, 695, 14, 20, 0.1, 0, Math.PI * 2);
    ctx.fill();

    // 4. Subtle Night-Side City Light Clusters (Golden urban glow on land)
    ctx.fillStyle = 'rgba(254, 240, 138, 0.75)';
    const cityCenters = [
      [1430, 420], [1390, 490], [1440, 600], [1480, 490], // India: Delhi, Mumbai, Bengaluru, Kolkata
      [1040, 270], [1090, 290], [1160, 280],              // Europe: London, Paris, Berlin
      [470, 340], [420, 370], [530, 350],                // US: Chicago, LA, NY
      [1580, 370], [1630, 380], [1620, 440]               // East Asia: Beijing, Tokyo, Shanghai
    ];
    cityCenters.forEach(([cx, cy]) => {
      for (let p = 0; p < 8; p++) {
        const ox = (Math.random() - 0.5) * 22;
        const oy = (Math.random() - 0.5) * 16;
        ctx.fillRect(cx + ox, cy + oy, 2, 2);
      }
    });

    // 5. Swirling Photorealistic Cloud Belts
    ctx.fillStyle = 'rgba(255, 255, 255, 0.32)';
    for (let i = 0; i < 45; i++) {
      const cx = (i * 47) % 2048;
      const cy = 200 + (Math.sin(i * 1.3) * 320) + 250;
      const rw = 70 + (i % 6) * 18;
      const rh = 16 + (i % 4) * 8;
      ctx.beginPath();
      ctx.ellipse(cx, cy, rw, rh, (i % 2 === 0 ? 0.2 : -0.2), 0, Math.PI * 2);
      ctx.fill();
    }

    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.minFilter = THREE.LinearFilter;
    tex.generateMipmaps = true;
    return tex;
  }

  /* Cloud Texture Generator */
  function createProceduralCloudTexture() {
    const c = document.createElement('canvas');
    c.width = 1024;
    c.height = 512;
    const ctx = c.getContext('2d');
    ctx.clearRect(0, 0, 1024, 512);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    for (let i = 0; i < 70; i++) {
      const x = Math.random() * 1024;
      const y = 80 + Math.random() * 350;
      const r1 = 30 + Math.random() * 80;
      const r2 = 12 + Math.random() * 28;
      const angle = (Math.random() - 0.5) * 0.6;
      ctx.beginPath();
      ctx.ellipse(x, y, r1, r2, angle, 0, Math.PI * 2);
      ctx.fill();
    }

    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    return tex;
  }

  /* =========================================================================
   * PROCEDURAL PBR TEXTURE GENERATORS (Metallic, Solar & Thermal Insulation)
   * ========================================================================= */

  // 1. High-Efficiency Photovoltaic Solar Panel Texture (512x256)
  function createSolarPanelTexture() {
    const c = document.createElement('canvas');
    c.width = 512;
    c.height = 256;
    const ctx = c.getContext('2d');

    // Deep sapphire / navy blue photovoltaic silicon base
    const grad = ctx.createLinearGradient(0, 0, 512, 256);
    grad.addColorStop(0, '#041026');
    grad.addColorStop(0.5, '#081d45');
    grad.addColorStop(1, '#051433');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 256);

    // Silicon wafer cell grid (8 cols x 4 rows)
    const cols = 8;
    const rows = 4;
    const cellW = (512 - (cols + 1) * 3) / cols;
    const cellH = (256 - (rows + 1) * 3) / rows;

    for (let r = 0; r < rows; r++) {
      for (let cIdx = 0; cIdx < cols; cIdx++) {
        const x = 3 + cIdx * (cellW + 3);
        const y = 3 + r * (cellH + 3);

        // Wafer base
        ctx.fillStyle = '#092557';
        ctx.fillRect(x, y, cellW, cellH);

        // Anti-reflective coating gradient sheen
        const cellGrad = ctx.createLinearGradient(x, y, x + cellW, y + cellH);
        cellGrad.addColorStop(0, 'rgba(37, 99, 235, 0.45)');
        cellGrad.addColorStop(0.5, 'rgba(14, 165, 233, 0.25)');
        cellGrad.addColorStop(1, 'rgba(2, 132, 199, 0.40)');
        ctx.fillStyle = cellGrad;
        ctx.fillRect(x, y, cellW, cellH);

        // Delicate wafer bevel edge
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 1;
        ctx.strokeRect(x + 0.5, y + 0.5, cellW - 1, cellH - 1);

        // Silver central busbar conductor lines (vertical)
        ctx.fillStyle = '#cbd5e1';
        const bus1 = x + cellW * 0.33;
        const bus2 = x + cellW * 0.67;
        ctx.fillRect(bus1 - 0.75, y, 1.5, cellH);
        ctx.fillRect(bus2 - 0.75, y, 1.5, cellH);

        // Horizontal micro-contact finger lines
        ctx.fillStyle = 'rgba(203, 213, 225, 0.22)';
        for (let fy = y + 4; fy < y + cellH - 2; fy += 4) {
          ctx.fillRect(x + 1, fy, cellW - 2, 0.6);
        }
      }
    }

    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }

  // 2. Quilted Multi-Layer Insulation (MLI) Gold Kapton Thermal Blanket Texture (512x512)
  function createGoldFoilTexture() {
    const c = document.createElement('canvas');
    c.width = 512;
    c.height = 512;
    const ctx = c.getContext('2d');

    // Rich aerospace Kapton gold base
    const grad = ctx.createLinearGradient(0, 0, 512, 512);
    grad.addColorStop(0, '#d97706');
    grad.addColorStop(0.3, '#f59e0b');
    grad.addColorStop(0.7, '#b45309');
    grad.addColorStop(1, '#fde047');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);

    // Quilted MLI thermal blanket pattern (diamonds)
    const step = 32;
    for (let y = -step; y < 512 + step; y += step) {
      for (let x = -step; x < 512 + step; x += step) {
        ctx.beginPath();
        ctx.moveTo(x + step / 2, y);
        ctx.lineTo(x + step, y + step / 2);
        ctx.lineTo(x + step / 2, y + step);
        ctx.lineTo(x, y + step / 2);
        ctx.closePath();

        // Embossed highlight/shadow
        ctx.fillStyle = ((x + y) / step) % 2 === 0 ? 'rgba(254, 240, 138, 0.35)' : 'rgba(146, 64, 14, 0.35)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(92, 40, 6, 0.45)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Thermal blanket stitch dot in center
        ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
        ctx.fillRect(x + step / 2 - 1, y + step / 2 - 1, 2, 2);
      }
    }

    // Micro-wrinkles
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 0.8;
    for (let i = 0; i < 40; i++) {
      const wx = Math.random() * 512;
      const wy = Math.random() * 512;
      ctx.beginPath();
      ctx.moveTo(wx, wy);
      ctx.lineTo(wx + (Math.random() - 0.5) * 24, wy + (Math.random() - 0.5) * 24);
      ctx.stroke();
    }

    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }

  // 3. Brushed Aerospace Titanium Alloy Texture (512x512)
  function createTitaniumTexture() {
    const c = document.createElement('canvas');
    c.width = 512;
    c.height = 512;
    const ctx = c.getContext('2d');

    // Brushed aerospace titanium
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(0, 0, 512, 512);

    // Horizontal brush grain
    for (let y = 0; y < 512; y += 2) {
      const alpha = 0.04 + Math.random() * 0.08;
      ctx.fillStyle = Math.random() > 0.5 ? `rgba(255, 255, 255, ${alpha})` : `rgba(30, 41, 59, ${alpha})`;
      ctx.fillRect(0, y, 512, 1.5);
    }

    // Modular aerospace panel seam lines & fasteners
    ctx.strokeStyle = 'rgba(15, 23, 42, 0.35)';
    ctx.lineWidth = 2;
    ctx.strokeRect(4, 4, 248, 248);
    ctx.strokeRect(256, 4, 252, 248);
    ctx.strokeRect(4, 256, 248, 252);
    ctx.strokeRect(256, 256, 252, 252);

    // Rivet fastener dots along seams
    ctx.fillStyle = '#334155';
    for (let p = 12; p < 512; p += 24) {
      ctx.fillRect(251, p, 2, 2);
      ctx.fillRect(p, 251, 2, 2);
    }

    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }

  // 4. Dark Carbon Fiber Composite Texture (256x256)
  function createCarbonTexture() {
    const c = document.createElement('canvas');
    c.width = 256;
    c.height = 256;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, 256, 256);

    const sz = 8;
    for (let y = 0; y < 256; y += sz) {
      for (let x = 0; x < 256; x += sz) {
        const dark = ((x / sz) + (y / sz)) % 2 === 0;
        ctx.fillStyle = dark ? '#1e293b' : '#0f172a';
        ctx.fillRect(x, y, sz, sz);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.strokeRect(x, y, sz, sz);
      }
    }

    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }

  // 5. Gold Wire Mesh Reflector Texture for SMAP Antenna (256x256)
  function createMeshDishTexture() {
    const c = document.createElement('canvas');
    c.width = 256;
    c.height = 256;
    const ctx = c.getContext('2d');
    ctx.clearRect(0, 0, 256, 256);

    // Fine gold molybdenum wire mesh grid
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1;
    for (let x = 0; x < 256; x += 8) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 256);
      ctx.stroke();
    }
    for (let y = 0; y < 256; y += 8) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(256, y);
      ctx.stroke();
    }

    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }

  // Aerospace Material Cache Helper
  function getAerospaceMaterials() {
    if (window.CosmicEarthBackground._aeroMats) {
      return window.CosmicEarthBackground._aeroMats;
    }

    const solarTex = createSolarPanelTexture();
    const goldTex = createGoldFoilTexture();
    const tiTex = createTitaniumTexture();
    const carbonTex = createCarbonTexture();
    const meshTex = createMeshDishTexture();

    const mats = {
      solar: new THREE.MeshStandardMaterial({
        map: solarTex,
        metalness: 0.90,
        roughness: 0.16,
        color: 0x93c5fd,
        side: THREE.DoubleSide
      }),
      solarBack: new THREE.MeshStandardMaterial({
        map: carbonTex,
        metalness: 0.35,
        roughness: 0.65,
        color: 0x334155
      }),
      goldFoil: new THREE.MeshStandardMaterial({
        map: goldTex,
        metalness: 0.95,
        roughness: 0.22,
        color: 0xffd700
      }),
      titanium: new THREE.MeshStandardMaterial({
        map: tiTex,
        metalness: 0.92,
        roughness: 0.24,
        color: 0xf1f5f9
      }),
      darkChassis: new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        metalness: 0.85,
        roughness: 0.30
      }),
      carbonTruss: new THREE.MeshStandardMaterial({
        map: carbonTex,
        color: 0x475569,
        metalness: 0.45,
        roughness: 0.45
      }),
      goldMesh: new THREE.MeshStandardMaterial({
        map: meshTex,
        color: 0xfbbf24,
        emissive: 0x78350f,
        emissiveIntensity: 0.35,
        metalness: 0.95,
        roughness: 0.15,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.88
      }),
      chromeAntenna: new THREE.MeshStandardMaterial({
        color: 0xf8fafc,
        metalness: 0.98,
        roughness: 0.08
      }),
      thrusterNozzle: new THREE.MeshStandardMaterial({
        color: 0x334155,
        metalness: 0.90,
        roughness: 0.32
      })
    };

    window.CosmicEarthBackground._aeroMats = mats;
    return mats;
  }

  /* =========================================================================
   * HYPER-REALISTIC 3D SATELLITE MODEL ASSEMBLERS (SMAP, MODIS, GPM)
   * ========================================================================= */
  function buildSatelliteModel(type, colorHex) {
    const group = new THREE.Group();
    const mats = getAerospaceMaterials();

    if (type === 'smap') {
      // ---------------------------------------------------------------------
      // NASA SMAP (Soil Moisture Active Passive)
      // Features: Octagonal gold/titanium bus, 6m deployable golden wireframe
      // mesh reflector dish on angled graphite boom, offset RF feed horn,
      // 3-panel articulated photovoltaic solar wing, RCS thruster pods.
      // ---------------------------------------------------------------------

      // 1. Octagonal Main Spacecraft Bus
      const busGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.85, 8);
      const bus = new THREE.Mesh(busGeo, mats.goldFoil);
      group.add(bus);

      // Top avionics deck (anodized titanium)
      const topDeckGeo = new THREE.CylinderGeometry(0.53, 0.53, 0.08, 8);
      const topDeck = new THREE.Mesh(topDeckGeo, mats.titanium);
      topDeck.position.set(0, 0.44, 0);
      group.add(topDeck);

      // Bottom propulsion bulkhead
      const btmDeckGeo = new THREE.CylinderGeometry(0.53, 0.53, 0.08, 8);
      const btmDeck = new THREE.Mesh(btmDeckGeo, mats.darkChassis);
      btmDeck.position.set(0, -0.44, 0);
      group.add(btmDeck);

      // 4 RCS Thruster Pods
      for (let i = 0; i < 4; i++) {
        const thAngle = (i * Math.PI) / 2 + Math.PI / 4;
        const tx = Math.cos(thAngle) * 0.52;
        const tz = Math.sin(thAngle) * 0.52;
        const thrusterGeo = new THREE.ConeGeometry(0.045, 0.09, 8);
        const thruster = new THREE.Mesh(thrusterGeo, mats.thrusterNozzle);
        thruster.position.set(tx, -0.46, tz);
        thruster.rotation.x = Math.PI;
        group.add(thruster);
      }

      // Star Tracker Baffles
      const stGeo = new THREE.CylinderGeometry(0.04, 0.06, 0.12, 8);
      const st1 = new THREE.Mesh(stGeo, mats.darkChassis);
      st1.position.set(0.42, 0.25, 0.32);
      st1.rotation.z = -Math.PI / 4;
      group.add(st1);

      // 2. Deployable Mesh Reflector Boom & Iconic 6-Meter Golden Dish
      const boomGroup = new THREE.Group();

      // Lower hinge mast
      const lowerBoomGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.55, 8);
      const lowerBoom = new THREE.Mesh(lowerBoomGeo, mats.carbonTruss);
      lowerBoom.position.set(-0.35, 0.35, 0);
      lowerBoom.rotation.z = -Math.PI / 3.8;
      boomGroup.add(lowerBoom);

      // Main boom extending out to the reflector mount
      const mainBoomGeo = new THREE.CylinderGeometry(0.038, 0.038, 1.4, 8);
      const mainBoom = new THREE.Mesh(mainBoomGeo, mats.carbonTruss);
      mainBoom.position.set(-0.85, 0.95, 0);
      mainBoom.rotation.z = -Math.PI / 4.2;
      boomGroup.add(mainBoom);

      // Parabolic Golden Wireframe Mesh Reflector Assembly (end of boom)
      const dishMount = new THREE.Group();
      dishMount.position.set(-1.35, 1.45, 0);
      dishMount.rotation.y = Math.PI / 3;
      dishMount.rotation.x = 0.22;

      // Deployable perimeter rim torus
      const rimGeo = new THREE.TorusGeometry(0.92, 0.045, 12, 36);
      const rim = new THREE.Mesh(rimGeo, mats.goldFoil);
      dishMount.add(rim);

      // Parabolic wire mesh dish surface
      const meshDishGeo = new THREE.ConeGeometry(0.92, 0.28, 36, 3, true);
      const meshDish = new THREE.Mesh(meshDishGeo, mats.goldMesh);
      meshDish.rotation.x = Math.PI; // Inverted concave dish
      meshDish.position.set(0, 0, 0.14);
      dishMount.add(meshDish);

      // 8 Radial graphite ribs connecting rim to central hub
      for (let r = 0; r < 8; r++) {
        const rAngle = (r / 8) * Math.PI * 2;
        const ribGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.92, 6);
        const rib = new THREE.Mesh(ribGeo, mats.carbonTruss);
        rib.position.set(Math.cos(rAngle) * 0.46, Math.sin(rAngle) * 0.46, 0.07);
        rib.rotation.z = rAngle + Math.PI / 2;
        dishMount.add(rib);
      }

      // Central Hub
      const hubGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.08, 12);
      const hub = new THREE.Mesh(hubGeo, mats.titanium);
      hub.position.set(0, 0, 0.14);
      dishMount.add(hub);

      boomGroup.add(dishMount);
      group.add(boomGroup);

      // 3. Offset RF Feed Horn Tower (aimed into dish)
      const feedBaseGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.35, 8);
      const feedBase = new THREE.Mesh(feedBaseGeo, mats.carbonTruss);
      feedBase.position.set(-0.25, 0.62, 0);
      feedBase.rotation.z = Math.PI / 5;
      group.add(feedBase);

      const feedHornGeo = new THREE.ConeGeometry(0.08, 0.16, 12, 1, true);
      const feedHorn = new THREE.Mesh(feedHornGeo, mats.chromeAntenna);
      feedHorn.position.set(-0.35, 0.78, 0);
      feedHorn.rotation.z = -Math.PI / 3;
      group.add(feedHorn);

      // 4. Articulated 3-Panel Photovoltaic Solar Array Wing
      const yokeGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.35, 8);
      const yoke = new THREE.Mesh(yokeGeo, mats.titanium);
      yoke.rotation.z = Math.PI / 2;
      yoke.position.set(0.68, -0.15, 0);
      group.add(yoke);

      const panelGeo = new THREE.BoxGeometry(2.1, 0.038, 0.62);
      const panelMats = [
        mats.titanium,  // +X edge
        mats.titanium,  // -X edge
        mats.solar,     // +Y top face (photovoltaic silicon)
        mats.solarBack, // -Y bottom face (carbon weave)
        mats.titanium,  // +Z edge
        mats.titanium   // -Z edge
      ];
      const solarWing = new THREE.Mesh(panelGeo, panelMats);
      solarWing.position.set(1.85, -0.15, 0);
      group.add(solarWing);

      // Panel segment hinges
      for (let h = 0; h < 2; h++) {
        const hingeGeo = new THREE.BoxGeometry(0.04, 0.05, 0.64);
        const hinge = new THREE.Mesh(hingeGeo, mats.titanium);
        hinge.position.set(1.15 + h * 0.7, -0.15, 0);
        group.add(hinge);
      }

    } else if (type === 'modis') {
      // ---------------------------------------------------------------------
      // NASA MODIS / TERRA (EOS AM-1)
      // Features: Multi-bay modular gold Kapton MLI and silver radiator bus,
      // Earth-facing MODIS optical aperture sunshade barrel, passive radiative
      // cooler door, gimbaled High-Gain Antenna (HGA) dish for TDRSS link,
      // large 4-panel solar array, ASTER & CERES pods, aft rocket thrusters.
      // ---------------------------------------------------------------------

      // 1. Modular Equipment Chassis Bus
      const busGeo = new THREE.BoxGeometry(1.15, 0.72, 0.82);
      const busMats = [
        mats.titanium,  // +X (solar drive interface)
        mats.titanium,  // -X (propulsion aft deck)
        mats.goldFoil,  // +Y (sun-facing gold MLI blanket)
        mats.titanium,  // -Y (nadir Earth-facing deck)
        mats.goldFoil,  // +Z (gold Kapton blanket)
        mats.titanium   // -Z (space-facing silver radiator)
      ];
      const bus = new THREE.Mesh(busGeo, busMats);
      group.add(bus);

      // Radiator Louvers on -Z side
      const radGeo = new THREE.BoxGeometry(0.9, 0.5, 0.04);
      const rad = new THREE.Mesh(radGeo, mats.titanium);
      rad.position.set(0, 0, -0.42);
      group.add(rad);

      // 2. Earth-Facing MODIS Optical Observation Package (Nadir)
      // Cylindrical scan mirror aperture hood / barrel pointed downward
      const hoodGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.45, 24);
      const hood = new THREE.Mesh(hoodGeo, mats.darkChassis);
      hood.position.set(0.1, -0.52, 0.15);
      group.add(hood);

      // Chrome aperture ring bezel
      const hoodRingGeo = new THREE.TorusGeometry(0.24, 0.035, 12, 24);
      const hoodRing = new THREE.Mesh(hoodRingGeo, mats.chromeAntenna);
      hoodRing.rotation.x = Math.PI / 2;
      hoodRing.position.set(0.1, -0.74, 0.15);
      group.add(hoodRing);

      // Passive Radiative Cooler Door (Angled 45° shield)
      const coolerGeo = new THREE.BoxGeometry(0.38, 0.03, 0.32);
      const cooler = new THREE.Mesh(coolerGeo, mats.titanium);
      cooler.position.set(0.1, -0.55, -0.28);
      cooler.rotation.x = Math.PI / 4;
      group.add(cooler);

      // Auxiliary Sensor Pods (CERES & ASTER)
      const ceresGeo = new THREE.BoxGeometry(0.24, 0.22, 0.24);
      const ceres = new THREE.Mesh(ceresGeo, mats.darkChassis);
      ceres.position.set(-0.35, -0.46, 0.12);
      group.add(ceres);

      // 3. Gimbaled High-Gain Antenna (HGA) for NASA TDRSS Relay
      const hgaMastGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.95, 8);
      const hgaMast = new THREE.Mesh(hgaMastGeo, mats.carbonTruss);
      hgaMast.position.set(-0.55, 0.72, -0.32);
      hgaMast.rotation.z = Math.PI / 5;
      group.add(hgaMast);

      const hgaDishGeo = new THREE.ConeGeometry(0.42, 0.16, 24, 1, true);
      const hgaDish = new THREE.Mesh(hgaDishGeo, mats.chromeAntenna);
      hgaDish.position.set(-0.75, 1.15, -0.32);
      hgaDish.rotation.z = -Math.PI / 3;
      group.add(hgaDish);

      const hgaSubGeo = new THREE.SphereGeometry(0.06, 10, 10);
      const hgaSub = new THREE.Mesh(hgaSubGeo, mats.chromeAntenna);
      hgaSub.position.set(-0.82, 1.25, -0.32);
      group.add(hgaSub);

      // 4. Large 4-Panel Articulated Solar Array Wing
      const yokeGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.45, 8);
      const yoke = new THREE.Mesh(yokeGeo, mats.titanium);
      yoke.rotation.z = Math.PI / 2;
      yoke.position.set(0.78, 0.16, 0);
      group.add(yoke);

      const panelGeo = new THREE.BoxGeometry(2.7, 0.038, 0.78);
      const panelMats = [
        mats.titanium,  // +X
        mats.titanium,  // -X
        mats.solar,     // +Y (photovoltaic silicon cells)
        mats.solarBack, // -Y (carbon backing)
        mats.titanium,  // +Z
        mats.titanium   // -Z
      ];
      const solarWing = new THREE.Mesh(panelGeo, panelMats);
      solarWing.position.set(2.2, 0.16, 0);
      group.add(solarWing);

      // 5. Aft Propulsion Deck & 4 Rocket Thrusters
      for (let r = 0; r < 4; r++) {
        const ry = (r < 2 ? 0.2 : -0.2);
        const rz = (r % 2 === 0 ? 0.24 : -0.24);
        const nozzleGeo = new THREE.ConeGeometry(0.065, 0.13, 10);
        const nozzle = new THREE.Mesh(nozzleGeo, mats.thrusterNozzle);
        nozzle.position.set(-0.62, ry, rz);
        nozzle.rotation.z = Math.PI / 2;
        group.add(nozzle);
      }

    } else {
      // ---------------------------------------------------------------------
      // NASA / JAXA GPM (Global Precipitation Measurement Core Observatory)
      // Features: Hexagonal aerospace bus with silver MLI and gold trim,
      // symmetric port and starboard solar wings, nadir Dual-frequency
      // Precipitation Radar (DPR) phased array, GMI microwave radiometer dish.
      // ---------------------------------------------------------------------

      // 1. Hexagonal Spacecraft Chassis
      const busGeo = new THREE.CylinderGeometry(0.68, 0.68, 0.95, 6);
      const bus = new THREE.Mesh(busGeo, mats.titanium);
      group.add(bus);

      // Gold MLI upper blanket cap
      const topCapGeo = new THREE.CylinderGeometry(0.66, 0.66, 0.06, 6);
      const topCap = new THREE.Mesh(topCapGeo, mats.goldFoil);
      topCap.position.set(0, 0.49, 0);
      group.add(topCap);

      // Bottom avionics deck
      const btmCapGeo = new THREE.CylinderGeometry(0.66, 0.66, 0.06, 6);
      const btmCap = new THREE.Mesh(btmCapGeo, mats.darkChassis);
      btmCap.position.set(0, -0.49, 0);
      group.add(btmCap);

      // 2. Symmetric Dual Solar Wings (Port & Starboard Wings)
      const leftYokeGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.35, 8);
      const leftYoke = new THREE.Mesh(leftYokeGeo, mats.titanium);
      leftYoke.rotation.z = Math.PI / 2;
      leftYoke.position.set(-0.82, 0, 0);
      group.add(leftYoke);

      const rightYokeGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.35, 8);
      const rightYoke = new THREE.Mesh(rightYokeGeo, mats.titanium);
      rightYoke.rotation.z = Math.PI / 2;
      rightYoke.position.set(0.82, 0, 0);
      group.add(rightYoke);

      const wingGeo = new THREE.BoxGeometry(1.85, 0.038, 0.68);
      const wingMats = [
        mats.titanium,
        mats.titanium,
        mats.solar,     // Photovoltaic cells
        mats.solarBack, // Carbon composite backing
        mats.titanium,
        mats.titanium
      ];

      const leftWing = new THREE.Mesh(wingGeo, wingMats);
      leftWing.position.set(-1.85, 0, 0);
      const rightWing = new THREE.Mesh(wingGeo, wingMats);
      rightWing.position.set(1.85, 0, 0);
      group.add(leftWing, rightWing);

      // 3. Dual-Frequency Precipitation Radar (DPR) Phased-Array Nadir Face
      const dprGeo = new THREE.BoxGeometry(0.78, 0.08, 0.64);
      const dpr = new THREE.Mesh(dprGeo, mats.darkChassis);
      dpr.position.set(0, -0.56, 0);
      group.add(dpr);

      // Metallic waveguide grid plate
      const gridGeo = new THREE.BoxGeometry(0.72, 0.02, 0.58);
      const grid = new THREE.Mesh(gridGeo, mats.chromeAntenna);
      grid.position.set(0, -0.60, 0);
      group.add(grid);

      // 4. GPM Microwave Imager (GMI) Conical Radiometer Reflector Dish
      const gmiMount = new THREE.Group();
      gmiMount.position.set(0, 0.62, 0.32);
      gmiMount.rotation.x = -Math.PI / 4;

      const gmiDishGeo = new THREE.ConeGeometry(0.44, 0.18, 24, 1, true);
      const gmiDish = new THREE.Mesh(gmiDishGeo, mats.goldFoil);
      gmiMount.add(gmiDish);

      const gmiFeedMastGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.35, 8);
      const gmiFeedMast = new THREE.Mesh(gmiFeedMastGeo, mats.carbonTruss);
      gmiFeedMast.position.set(0, 0.16, 0.14);
      gmiMount.add(gmiFeedMast);

      group.add(gmiMount);

      // 5. Communications Steerable Antenna Dish
      const antMastGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.55, 8);
      const antMast = new THREE.Mesh(antMastGeo, mats.carbonTruss);
      antMast.position.set(0, 0.68, -0.28);
      group.add(antMast);

      const antDishGeo = new THREE.ConeGeometry(0.32, 0.12, 16, 1, true);
      const antDish = new THREE.Mesh(antDishGeo, mats.chromeAntenna);
      antDish.position.set(0, 0.95, -0.28);
      antDish.rotation.x = Math.PI / 3;
      group.add(antDish);
    }

    // =========================================================================
    // DIMENSIONAL JEWEL-FACETED BEACON EMITTER & CINEMATIC POINT LIGHT
    // (ZERO Flat Vector Shapes: 3D Collar + Polished Bezel + Optical Lens)
    // =========================================================================
    const beaconCollarGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.18, 12);
    const beaconCollar = new THREE.Mesh(beaconCollarGeo, mats.titanium);
    beaconCollar.position.set(0, 0.48, 0);
    group.add(beaconCollar);

    const bezelGeo = new THREE.TorusGeometry(0.22, 0.035, 10, 20);
    const bezel = new THREE.Mesh(bezelGeo, mats.chromeAntenna);
    bezel.rotation.x = Math.PI / 2;
    bezel.position.set(0, 0.56, 0);
    group.add(bezel);

    const lensGeo = new THREE.SphereGeometry(0.24, 16, 16);
    const lensMat = new THREE.MeshStandardMaterial({
      color: colorHex,
      emissive: colorHex,
      emissiveIntensity: 1.45,
      roughness: 0.12,
      metalness: 0.90
    });
    const lens = new THREE.Mesh(lensGeo, lensMat);
    lens.position.set(0, 0.56, 0);
    group.add(lens);

    // Dynamic Point Light casting realistic radiant illumination onto satellite
    const pointLight = new THREE.PointLight(colorHex, 4.8, 28);
    pointLight.position.set(0, 0.56, 0);
    group.add(pointLight);

    // Scale up the satellite proportionally to the 2.4x enlarged Earth
    group.scale.set(1.9, 1.9, 1.9);

    return group;
  }

  /* Main Initialization Function */
  window.initCosmicEarthBackground = function (options) {
    if (window.CosmicEarthBackground.initialized) {
      console.log('CosmicEarthBackground already initialized.');
      return;
    }

    // Auto-create or target #cosmic-earth-bg-layer container
    let container = document.getElementById('cosmic-earth-bg-layer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'cosmic-earth-bg-layer';
      document.body.insertBefore(container, document.body.firstChild);
    }

    injectStyles();

    // Canvas
    let canvas = document.getElementById('cosmic-earth-canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'cosmic-earth-canvas';
      container.appendChild(canvas);
    }

    // HUD overlay
    let hudOverlay = document.getElementById('satellite-hud-overlay');
    if (!hudOverlay) {
      hudOverlay = document.createElement('div');
      hudOverlay.id = 'satellite-hud-overlay';
      container.appendChild(hudOverlay);
    }

    // 1. Scene, Camera, Renderer Setup
    const scene = new THREE.Scene();
    window.CosmicEarthBackground.scene = scene;

    // Perspective Camera: Clean framing of central Earth and foreground orbits
    const camera = new THREE.PerspectiveCamera(44, window.innerWidth / window.innerHeight, 0.1, 1000);
    const baseCamDist = 52;
    camera.position.set(0, 1.5, baseCamDist);
    camera.lookAt(0, 0, 0);
    window.CosmicEarthBackground.camera = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    window.CosmicEarthBackground.renderer = renderer;

    // 2. Realistic Cinematic Space Lighting tuned for Biosphere Mint & Genuine Earth
    const ambientLight = new THREE.AmbientLight(0x0f274a, 1.25);
    scene.add(ambientLight);

    // Primary Sun Light: Strong directional sunlight casting day/night terminator
    const sunLight = new THREE.DirectionalLight(0xfffaea, 2.9);
    sunLight.position.set(-42, 16, 30);
    scene.add(sunLight);

    // Secondary Biosphere Mint ecological limb rim light
    const rimLight = new THREE.DirectionalLight(0x10b981, 0.70);
    rimLight.position.set(36, -12, -20);
    scene.add(rimLight);

    // 3. Deep Galaxy Starfield (4,500 Stars with Spectral Classes)
    const starGeo = new THREE.BufferGeometry();
    const starCount = 4500;
    const starPos = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
      const radius = 35 + Math.random() * 180;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      starPos[i] = radius * Math.cos(phi) * Math.cos(theta);
      starPos[i + 1] = radius * Math.sin(phi);
      starPos[i + 2] = radius * Math.cos(phi) * Math.sin(theta) - 25;

      const rand = Math.random();
      if (rand > 0.82) {
        starColors[i] = 0.58; starColors[i + 1] = 0.82; starColors[i + 2] = 1.0; // Blue-white
      } else if (rand > 0.45) {
        starColors[i] = 0.98; starColors[i + 1] = 0.99; starColors[i + 2] = 1.0; // Crisp White
      } else if (rand > 0.15) {
        starColors[i] = 1.0; starColors[i + 1] = 0.88; starColors[i + 2] = 0.72; // Warm Solar
      } else {
        starColors[i] = 0.92; starColors[i + 1] = 0.55; starColors[i + 2] = 0.95; // Soft Violet
      }
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.9,
      vertexColors: true,
      transparent: true,
      opacity: 0.88
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // 4. Photorealistic 3D Earth (2.4x Larger, 100% Opaque, Genuine NASA Imagery)
    const earthRadius = 22.8; // Scaled 2.4x
    const earthGeo = new THREE.SphereGeometry(earthRadius, 64, 64);

    // Group holding Earth and all 360° satellite orbit planes
    const earthSystemGroup = new THREE.Group();
    earthSystemGroup.name = 'earthSystemGroup';
    scene.add(earthSystemGroup);
    window.CosmicEarthBackground.earthSystemGroup = earthSystemGroup;

    // Start immediately with high-detail procedural texture (zero delay, zero faded look)
    const proceduralTex = createPhotorealisticEarthTexture();
    const earthMat = new THREE.MeshStandardMaterial({
      map: proceduralTex,
      roughness: 0.42,
      metalness: 0.05,
      transparent: false,
      opacity: 1.0, // Very low transparency (100% solid, opaque, rich & vibrant)
      depthWrite: true,
      side: THREE.FrontSide
    });

    const centralEarth = new THREE.Mesh(earthGeo, earthMat);
    centralEarth.position.set(0, 0, 0);
    centralEarth.rotation.x = 0.23; // Realistic Earth axial tilt (~13.5°)
    centralEarth.rotation.z = -0.06;
    earthSystemGroup.add(centralEarth);
    window.CosmicEarthBackground.earth = centralEarth;

    // Asynchronously upgrade to high-res NASA Blue Marble satellite imagery
    const texLoader = new THREE.TextureLoader();
    texLoader.crossOrigin = 'anonymous';
    texLoader.load(
      'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg',
      function (loadedTex) {
        loadedTex.wrapS = THREE.RepeatWrapping;
        earthMat.map = loadedTex;
        earthMat.needsUpdate = true;
      },
      undefined,
      function () {
        texLoader.load('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg', function (altTex) {
          altTex.wrapS = THREE.RepeatWrapping;
          earthMat.map = altTex;
          earthMat.needsUpdate = true;
        });
      }
    );

    // 5. Dynamic Clouds Layer (Crisp, High-Definition)
    const cloudGeo = new THREE.SphereGeometry(earthRadius * 1.018, 64, 64);
    const cloudTex = createProceduralCloudTexture();
    const cloudMat = new THREE.MeshStandardMaterial({
      map: cloudTex,
      color: 0xffffff,
      transparent: true,
      opacity: 0.58,
      roughness: 0.95,
      depthWrite: false,
      side: THREE.FrontSide
    });
    const cloudsMesh = new THREE.Mesh(cloudGeo, cloudMat);
    centralEarth.add(cloudsMesh);
    window.CosmicEarthBackground.clouds = cloudsMesh;

    texLoader.load(
      'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png',
      function (cloudImg) {
        cloudImg.wrapS = THREE.RepeatWrapping;
        cloudMat.map = cloudImg;
        cloudMat.needsUpdate = true;
      }
    );

    // 6. Atmospheric Rayleigh Scattering Halo (Crisp Cyan/Mint Limb)
    const innerAtmoGeo = new THREE.SphereGeometry(earthRadius * 1.032, 64, 64);
    const innerAtmoMat = new THREE.MeshBasicMaterial({
      color: 0x2dd4bf, // Cyan / Mint glow
      transparent: true,
      opacity: 0.45,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending
    });
    const innerAtmo = new THREE.Mesh(innerAtmoGeo, innerAtmoMat);
    centralEarth.add(innerAtmo);

    const outerAtmoGeo = new THREE.SphereGeometry(earthRadius * 1.065, 64, 64);
    const outerAtmoMat = new THREE.MeshBasicMaterial({
      color: 0x059669, // Fresh ecological emerald limb
      transparent: true,
      opacity: 0.25,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending
    });
    const outerAtmo = new THREE.Mesh(outerAtmoGeo, outerAtmoMat);
    centralEarth.add(outerAtmo);

    // 7. Satellite Constellation Specification (GPM, MODIS, SMAP)
    const SAT_CONFIGS = [
      {
        id: 'gpm',
        name: 'GPM IMERG',
        subName: 'Rainfall & Cloudburst Radar',
        altitudeKm: 407,
        colorHex: 0x0284c7, // Atmospheric Cyan (Biosphere Mint theme)
        colorCss: '#0284c7',
        orbitRadius: 33.2,  // ~1.46x Earth Radius
        inclinationX: 32,   // 32° orbital tilt
        inclinationZ: 14,
        raanY: 25,
        speed: 0.0075,      // Fast inner orbit
        angle: 0.4,
        maxLat: 65.0,
        modelType: 'gpm'
      },
      {
        id: 'modis',
        name: 'MODIS LST',
        subName: 'Thermal Skin Temp (>45°C)',
        altitudeKm: 705,
        colorHex: 0xd97706, // Thermal Amber Gold
        colorCss: '#d97706',
        orbitRadius: 41.2,  // ~1.81x Earth Radius
        inclinationX: 76,   // 76° near-polar sun-synchronous
        inclinationZ: -28,
        raanY: 110,
        speed: 0.0052,      // Medium orbit
        angle: 2.2,
        maxLat: 82.5,
        modelType: 'modis'
      },
      {
        id: 'smap',
        name: 'SMAP RADAR',
        subName: 'Root-Zone Soil Moisture',
        altitudeKm: 685,
        colorHex: 0x059669, // Biosphere Emerald Mint
        colorCss: '#059669',
        orbitRadius: 49.2,  // ~2.16x Earth Radius
        inclinationX: -52,  // -52° cross-polar orbit
        inclinationZ: 42,
        raanY: -65,
        speed: 0.0038,      // Stately outer foreground orbit
        angle: 4.1,
        maxLat: 85.0,
        modelType: 'smap'
      }
    ];

    const satellites = [];

    // Create 3D Volumetric Orbit Tubes & Realistic Satellite Assemblies
    SAT_CONFIGS.forEach(function (cfg) {
      // Orbit Plane Group (tilted relative to Central Earth)
      const orbitPlane = new THREE.Group();
      orbitPlane.rotation.x = THREE.MathUtils.degToRad(cfg.inclinationX);
      orbitPlane.rotation.z = THREE.MathUtils.degToRad(cfg.inclinationZ);
      orbitPlane.rotation.y = THREE.MathUtils.degToRad(cfg.raanY);
      earthSystemGroup.add(orbitPlane);

      // VOLUMETRIC 3D ORBIT TRAJECTORY TUBE (ZERO flat 1-pixel lines!)
      const ringSegments = 140;
      const ringPoints = [];
      for (let j = 0; j <= ringSegments; j++) {
        const theta = (j / ringSegments) * Math.PI * 2;
        ringPoints.push(new THREE.Vector3(
          cfg.orbitRadius * Math.cos(theta),
          0,
          cfg.orbitRadius * Math.sin(theta)
        ));
      }
      const curvePath = new THREE.CatmullRomCurve3(ringPoints, true);
      const tubeGeo = new THREE.TubeGeometry(curvePath, 140, 0.085, 8, true);
      const tubeMat = new THREE.MeshStandardMaterial({
        color: cfg.colorHex,
        emissive: cfg.colorHex,
        emissiveIntensity: 0.58,
        roughness: 0.22,
        metalness: 0.85,
        transparent: true,
        opacity: 0.70,
        blending: THREE.AdditiveBlending
      });
      const orbitTube = new THREE.Mesh(tubeGeo, tubeMat);
      orbitPlane.add(orbitTube);

      // 3D Hyper-Realistic Satellite Node
      const satModel = buildSatelliteModel(cfg.modelType, cfg.colorHex);
      orbitPlane.add(satModel);

      // DIMENSIONAL 3D TELEMETRY PULSE PACKET (ZERO flat unshaded circles!)
      const pulseGroup = new THREE.Group();

      // High-detail metallic core
      const pulseCoreGeo = new THREE.SphereGeometry(0.48, 16, 16);
      const pulseCoreMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: cfg.colorHex,
        emissiveIntensity: 1.25,
        metalness: 0.85,
        roughness: 0.18
      });
      const pulseCore = new THREE.Mesh(pulseCoreGeo, pulseCoreMat);
      pulseGroup.add(pulseCore);

      // Volumetric halo ring oriented with the orbital trajectory
      const pulseHaloGeo = new THREE.TorusGeometry(0.85, 0.08, 8, 24);
      const pulseHaloMat = new THREE.MeshBasicMaterial({
        color: cfg.colorHex,
        transparent: true,
        opacity: 0.70,
        blending: THREE.AdditiveBlending
      });
      const pulseHalo = new THREE.Mesh(pulseHaloGeo, pulseHaloMat);
      pulseHalo.rotation.x = Math.PI / 2;
      pulseGroup.add(pulseHalo);

      orbitPlane.add(pulseGroup);

      // DOM HUD Tag in Overlay
      const hudEl = document.createElement('div');
      hudEl.className = 'sat-hud-tag ' + cfg.id;
      hudEl.id = 'hud-' + cfg.id;
      hudEl.innerHTML = `
        <div class="sat-hud-top">
          <span class="sat-beacon-dot"></span>
          <span class="sat-title">${cfg.name}</span>
          <span class="sat-alt-chip">${cfg.altitudeKm} KM</span>
        </div>
        <div class="sat-coords-val" id="coords-${cfg.id}">LAT 23.4°N • LON 78.2°E</div>
      `;
      hudOverlay.appendChild(hudEl);

      satellites.push({
        config: cfg,
        orbitPlane: orbitPlane,
        model: satModel,
        pulseGroup: pulseGroup,
        hudEl: hudEl,
        coordsEl: hudEl.querySelector('.sat-coords-val'),
        angle: cfg.angle,
        speed: cfg.speed,
        radius: cfg.orbitRadius
      });
    });

    window.CosmicEarthBackground.satellites = satellites;

    // 8. Occlusion Helper (Detects when satellite is behind Earth)
    const tempSatPos = new THREE.Vector3();
    const toCameraRay = new THREE.Vector3();

    function checkOcclusion(worldPos) {
      toCameraRay.copy(worldPos).sub(camera.position);
      const distToSat = toCameraRay.length();
      toCameraRay.normalize();

      const earthCenter = earthSystemGroup ? earthSystemGroup.position : new THREE.Vector3(0, 0, 0);
      const toEarth = earthCenter.clone().sub(camera.position);
      const t = toEarth.dot(toCameraRay);

      if (t > 0 && t < distToSat) {
        const closestPoint = camera.position.clone().addScaledVector(toCameraRay, t);
        const distToCenter = closestPoint.distanceTo(earthCenter);
        if (distToCenter < (earthRadius * 0.98)) {
          return true; // Occluded behind solid Earth
        }
      }
      return false;
    }

    // 9. Continuous Smooth Animation Loop
    function animate() {
      window.CosmicEarthBackground.animId = requestAnimationFrame(animate);

      // Slow realistic axial rotation of Earth
      if (centralEarth) {
        centralEarth.rotation.y += 0.0010;
      }
      if (cloudsMesh) {
        cloudsMesh.rotation.y += 0.0015; // Atmospheric drift
      }
      if (starField) {
        starField.rotation.y += 0.00012; // Deep galactic drift
      }

      const earthRotY = centralEarth ? centralEarth.rotation.y : 0;

      // Update 360° Continuous Orbit of each satellite
      satellites.forEach(function (sat) {
        sat.angle = (sat.angle + sat.speed) % (Math.PI * 2);

        // Position in orbital plane
        const x = sat.radius * Math.cos(sat.angle);
        const z = sat.radius * Math.sin(sat.angle);
        sat.model.position.set(x, 0, z);

        // Orient satellite forward along orbital flight tangent
        sat.model.rotation.y = -sat.angle + Math.PI / 2;

        // Position trailing volumetric pulse packet slightly behind
        const pulseAngle = (sat.angle - 0.28 + Math.PI * 2) % (Math.PI * 2);
        sat.pulseGroup.position.set(
          sat.radius * Math.cos(pulseAngle),
          0,
          sat.radius * Math.sin(pulseAngle)
        );
        sat.pulseGroup.rotation.y = -pulseAngle + Math.PI / 2;

        // Compute 3D World Position
        sat.model.getWorldPosition(tempSatPos);

        // Sub-satellite geographic coordinate calculations
        // Latitude derived from orbital inclination sine wave
        const latVal = Math.sin(sat.angle) * sat.config.maxLat;
        const latStr = Math.abs(latVal).toFixed(1) + '°' + (latVal >= 0 ? 'N' : 'S');

        // Longitude derived from orbital motion relative to Earth's axial rotation
        const lonRaw = (((sat.angle * 180 / Math.PI) - (earthRotY * 180 / Math.PI * 1.6)) % 360 + 360) % 360;
        const lonNorm = lonRaw > 180 ? (lonRaw - 360) : lonRaw;
        const lonStr = Math.abs(lonNorm).toFixed(1) + '°' + (lonNorm >= 0 ? 'E' : 'W');

        // Project 3D satellite position to 2D Screen Space
        const projected = tempSatPos.clone().project(camera);
        const screenX = (projected.x * 0.5 + 0.5) * window.innerWidth;
        const screenY = (-(projected.y * 0.5) + 0.5) * window.innerHeight;

        // Check if satellite is occluded behind the solid Earth
        const isOccluded = checkOcclusion(tempSatPos);

        // Smoothly position HUD badge next to satellite
        sat.hudEl.style.transform = `translate3d(${screenX + 16}px, ${screenY - 22}px, 0)`;

        // Foreground / Background separation:
        // When satellite HUD badge moves into the left UI card region (screenX < 380px on desktop),
        // softly dim its opacity so it never interferes with interactive console selectors.
        if (screenX < 380 && window.innerWidth > 900) {
          sat.hudEl.style.opacity = '0.12';
        } else if (isOccluded) {
          sat.hudEl.classList.add('occluded');
          sat.hudEl.style.opacity = '';
        } else {
          sat.hudEl.classList.remove('occluded');
          sat.hudEl.style.opacity = '';
        }

        if (isOccluded) {
          sat.coordsEl.textContent = `[BEHIND EARTH] • ${latStr}, ${lonStr}`;
        } else {
          sat.coordsEl.textContent = `LAT ${latStr} • LON ${lonStr}`;
        }
      });

      renderer.render(scene, camera);
    }

    animate();

    // 10. Responsive Viewport Resize Handler with Dynamic Framing (Shift to right, half sphere visible)
    function updateFraming() {
      if (!camera || !renderer) return;
      const aspect = window.innerWidth / window.innerHeight;
      camera.aspect = aspect;
      if (aspect < 1.0) {
        // Portrait screens: gently move camera further back so orbits fit horizontally
        camera.position.z = baseCamDist / aspect;
      } else {
        camera.position.z = baseCamDist;
      }
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);

      // Dynamically position Earth system shifted to the right so only half sphere is visible
      const halfH = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
      const halfW = halfH * aspect;

      if (earthSystemGroup) {
        if (aspect >= 1.15) {
          // Desktop / widescreen: shift Earth right so center is near right screen boundary
          earthSystemGroup.position.x = halfW * 0.68;
          earthSystemGroup.position.y = -1.2;
        } else {
          // Portrait screens
          earthSystemGroup.position.x = halfW * 0.40;
          earthSystemGroup.position.y = -0.5;
        }
      }
    }

    window.addEventListener('resize', updateFraming);
    updateFraming();

    window.CosmicEarthBackground.initialized = true;
    console.log('CosmicEarthBackground initialized successfully.');
  };

  // Auto-initialize if DOM is ready
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(function () {
      if (typeof THREE !== 'undefined' && !window.CosmicEarthBackground.initialized) {
        window.initCosmicEarthBackground();
      }
    }, 40);
  } else {
    document.addEventListener('DOMContentLoaded', function () {
      if (typeof THREE !== 'undefined' && !window.CosmicEarthBackground.initialized) {
        window.initCosmicEarthBackground();
      }
    });
  }
})();
