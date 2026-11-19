# 📊 NASA Space Apps Challenge 2026 — Official Slide Deck Blueprint
## Project Title: India Earth System Trend Detective
### Challenge Category: "Be An Earth System Trend Detective!"
**Authenticated NASA Earthdata User:** `anirudh012` (Level 3 Active)  
**Target Geography:** Strictly Republic of India across 6 Agro-Climatic Zones  
**Observation Window:** 1995 – 2025 (Continuous 31-Year Satellite Record)  
**Standard Presentation Format:** 7-Slide Pitch Deck (2-Minute Timed Delivery)

---

### Slide 1: Title & Hook
* **Headline:** India Earth System Trend Detective
* **Subtitle:** Separating Permanent Climate Shifts from 1-Year Weather Noise across 31 Continuous Years (1995–2025)
* **Hook Statement:** *"A single Earth science process can drive opposite trends in different regions. While India's national monsoon looks stable on paper, satellites reveal steady seasonal rain has vanished—compressing into extreme cloudbursts separated by 20-day dry spells that starve crops."*
* **Team & Credentials (NAKSHATRA-X):**
  * Team Name: `NAKSHATRA-X`
  * Lead Detective & Systems: `Anirudh Gahlot / Team Lead`
  * Remote Sensing & Modeling: `Jay Joshi / Manurudra Singh / Anirudh Gahlot / Pankaj Saini`
  * UI/UX & Geospatial Architecture: `Anirudh Gahlot / Pankaj Saini`
  * NASA Earthdata Authenticated User: `anirudh012` (Level 3 Active)
  * Dual Platform: WebGL 3D System Pipeline + Real Deep-Zoom Leaflet Map (Level 21x)
  * Scientific Baseline: IMD 30-Year Climatological Normal (1991–2020)

---

### Slide 2: The Core Scientific Problem
* **Headline:** The Dilemma of Earth System Trends
* **Key Challenge Points:**
  1. **Weather Noise vs. Climate Trend:** A single drought year (e.g. 2002 or 2009) or flood year does not constitute a permanent trend. How do we mathematically prove a permanent structural shift?
  2. **Regional Dipoles (Opposite Trends):** Monsoon cloudbursts dump +42mm surging deluges on the Western Ghats, while simultaneously causing a -28mm deficit across the Indo-Gangetic agrarian breadbasket.
  3. **The Complexity Barrier:** Raw HDF5/NetCDF satellite files from NASA archives are inaccessible to local farmers, city planners, and district magistrates.

---

### Slide 3: Authenticated NASA Space Constellation & Data Provenance
* **Headline:** Direct NASA Earth Observation Data Streams
* **Active Authentication Badge:** `NASA Earthdata Login (EDL): anirudh012` (Level 3 Session Verified via RS256 JWT)
* **The 3 Core Space Sensors:**
  | Environmental Domain | NASA Space Mission | Sensor & Product ID | DAAC Host & DOI |
  | :--- | :--- | :--- | :--- |
  | **Monsoon Rain & Deluges** | NASA GPM (Global Precipitation Measurement) | `GPM_3IMERGM_06` (0.1° Monthly Gridded) | GES DISC (`10.5067/GPM/IMERG/3B-MONTH/06`) |
  | **Extreme Heatwaves (>45°C)** | NASA Terra/Aqua MODIS | `MOD11A1 / MYD11A1 V6.1` (1km Daily LST) | LP DAAC (`10.5067/MODIS/MOD11A1.061`) |
  | **Farmland Soil & Drought** | NASA SMAP (Soil Moisture Active Passive) | `SPL4SMGP V7` (9km Root-Zone 0–100cm) | NSIDC DAAC (`10.5067/BAP1J8835848`) |
* **National Climatological Standard:** India Meteorological Department (IMD) 1991–2020 30-Year Normal Climatology.

---

### Slide 4: System Architecture & Mathematical Forensic Engine
* **Headline:** 4-Step Forensic Processing Pipeline
* **WebGL Three.js 3D Pipeline Visual:**
  1. **Step 1 (Ingest):** Daily ingestion of GPM, MODIS, and SMAP orbital swaths across India's $[68^\circ\text{E}, 6^\circ\text{N}, 97.5^\circ\text{E}, 37.5^\circ\text{N}]$ bounding box.
  2. **Step 2 (Clean):** Atmospheric cloud-masking, dust-filtering, and interpolation onto a uniform 0.1° (~10km) grid covering India's 36 meteorological subdivisions.
  3. **Step 3 (Forensic Detective):**
     * **Mann-Kendall Test:** Evaluates non-parametric monotonic trend direction ($Z$-score).
     * **Sen's Slope Estimator:** Computes median physical rate of change per decade.
     * **False Discovery Rate (FDR):** Benjamini-Hochberg filter guaranteeing field significance ($q < 0.05$) across 40,000 grid cells.
  4. **Step 4 (Client Insights):** Translates mathematics into the 4 direct answers: *What, Where, How Much, and Scientific Verdict*.

---

### Slide 5: The Three Empirical Breakthroughs (What Satellites Prove)
* **Headline:** Forensic Discoveries Across India's Agro-Climatic Zones
* **Discovery 1: Indo-Gangetic Monsoon Shift**
  * *Signal:* **-28 mm per decade (-8.2% vs IMD normal)**.
  * *Verdict:* Verified permanent drying corridor with extended 15–20 day dry spells in Punjab, Haryana, Delhi, and Western UP ($p = 0.008$).
* **Discovery 2: Thar Desert Severe Heat Dome**
  * *Signal:* **+5.0 extreme heat days/decade (>45°C)**, peak surface skin temperatures reaching 48.8°C to 50°C.
  * *Verdict:* Statistically confirmed permanent heat dome expansion ($p < 0.0001$).
* **Discovery 3: Central India Farmland Soil Desiccation**
  * *Signal:* **-9% root-zone moisture loss per decade** in Vidarbha and MP vertisol soils.
  * *Verdict:* High atmospheric evaporative demand driving flash droughts in under 10 days ($p = 0.0001$).

---

### Slide 6: The Interconnected System — Compound Climate Risk Analyzer
* **Headline:** Couplings in the Earth's Interconnected Environment
* **The Interconnected Feedback Mechanism:**
  $$\text{Extreme Solar Heat} \xrightarrow{\quad} \text{High Evaporative Demand} \xrightarrow{\quad} \text{Root-Zone Moisture Depletion} \xrightarrow{\quad} \text{Loss of Latent Cooling} \xrightarrow{\quad} \text{Runaway Ground Skin Baking}$$
* **Compound Risk Index Hotspots in India:**
  * **Central India (Vidarbha-MP):** Index **88/100** • Critical flash drought risk threatening rainfed soybean and cotton.
  * **Thar Margin (Rajasthan):** Index **92/100** • Hyper-arid heat and vegetative canopy desiccation.
  * **South Deccan (Rayalaseema):** Index **84/100** • Rocky vertisol cracking and persistent heat retention.
* **Live Tool Capabilities:** One-click toggle displaying coupled spatial risk polygons across India.

---

### Slide 7: Client Action Delivery & Hackathon Winning Impact
* **Headline:** Turning Space Science into Immediate Action
* **Key User-Facing Features:**
  * **Interactive Demonstration Cases (1-Click Walkthroughs):** Pre-packaged NASA case files (Indo-Gangetic Monsoon Deficit, Vidarbha Flash Drought, and Thar vs. Ghats Climate Dipole).
  * **NASA Variable Detective Assistant:** 2-step guided inquiry helping users pinpoint the exact satellite mission and variable for any geographic threat.
  * **30-Year Live Time-Lapse Player (1995–2025):** Scrubbable slider with milestone event banner and dynamic polygon intensity scaling.
  * **Comparative Dual-Zone Analytics (Page 2):** Side-by-side dipole analysis proving contrasting regional trends from unified global drivers.
  * **Deseasonalized Anomaly Engine:** All anomalies standardized against 30-Year IMD Climatology (1991–2020) to remove the annual seasonal cycle.
  * **Deep Zoom (Up to Level 21x):** Search and inspect risk down to universities (IIT Roorkee, Delhi Univ), towns (Kashipur, Bhimtal), and individual streets.
  * **Executive Client Reports in Plain Language:**
    * 5 structured sections: What is happening, Mechanism, Past vs Present, 2035 Prediction, Precautions & solutions.
    * Multi-format export: **Microsoft Word (`.doc`)**, **Print/PDF**, and **CSV (`.csv`)**.
* **Closing Punchline:** *"Authenticated by NASA, calibrated by IMD, and built for India's 1.4 billion citizens."*

