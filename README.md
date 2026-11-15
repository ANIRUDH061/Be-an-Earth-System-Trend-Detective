# 🌍 EARTH METRIX: India Earth System Trend Detective

### *NASA Space Apps Challenge 2026 — Be An Earth System Trend Detective!*

---

## 💡 What is This Project?

Weather changes every day, but **climate** changes over decades. 

A single process can cause opposite effects in different places — for example, while warming air makes North India face longer dry breaks, it causes intense cloudbursts in the mountains and coasts.

**EARTH METRIX** is a simple, powerful tool that analyzes **31 continuous years (1995–2025)** of real NASA satellite data across India. It answers 4 fundamental scientific questions:

1. **What is changing?** (Rainfall patterns, extreme heat domes, or farmland soil moisture)
2. **Where is it changing?** (Pinpointed across all Indian states, districts, and villages)
3. **How much is it changing?** (Exact numbers, rates, and decade-by-decade trends)
4. **Is it significant?** (Mathematically proves with >99% confidence that a trend is a permanent long-term shift, not just temporary 1-year weather noise)

---

## 🚀 Quick Start (No Installation Needed!)

You can run this project directly in any web browser (Google Chrome, Edge, Safari, Firefox) without installing any software or running commands:

* 🗺️ **Main Application**: Open [`index.html`](file:///Users/anirudhgahlot/Documents/nasa/index.html) (or [`trend_detective_tool.html`](file:///Users/anirudhgahlot/Documents/nasa/trend_detective_tool.html))

---

## 🛰️ NASA Satellites & Datasets Used

We combine 3 primary NASA Earth observation missions:

| Satellite / Mission | What It Measures | Real-World Impact |
| :--- | :--- | :--- |
| 🌧️ **GPM IMERG** | Rain & Cloudbursts (0.1° grid) | Detects heavy monsoon cloudbursts and 15–20 day dry spells. |
| ☀️ **MODIS (Terra/Aqua)** | Land Surface Skin Temperature (1 km) | Tracks scorching summer heat domes exceeding 45°C. |
| 🌱 **SMAP** | Root-Zone Soil Moisture (top 0–100 cm) | Alerts farmers to rapid agricultural flash droughts before crops wilt. |

---

## ✨ Key Features

### 1. 🌌 Orbit View (Welcome Console)
* **Interactive 3D Earth Background**: Realistic rotating globe with satellites (GPM, MODIS, SMAP) orbiting in real-time.
* **Quick Hotspot Cards**: One-click shortcuts for key Indian states:
  * **Rajasthan**: Arid Heat & Thermal Stress
  * **Odisha**: Humid Heat & Coastal Storms
  * **Maharashtra**: Agricultural Rain-Shadow & Flash Droughts
  * **Uttarakhand**: Himalayan Cloudbursts & Slope Warming
  * **Kerala**: Western Ghats Monsoon Deluges
  * **Assam & Meghalaya**: Brahmaputra Floods & Drying Cycles
* **Pan-India Location Search**: Type *any* Indian city, town, village, or address to get instant autocomplete suggestions and zoom directly into it.

### 2. 📊 Forensic Dashboard (Page 1)
* **Interactive Satellite Map**: Real satellite imagery, terrain tiles, and district boundaries.
* **Smart Zoom Interface**: Easily zoom between Whole India (5x), State View (8x), District View (11x), and Town View (14.5x).
* **Click Anywhere on the Map**: Click any spot on the map to drop a pin and instantly see the 31-year climate graph for that exact location.
* **31-Year Satellite Trend Graph**: Switch between Line charts, Bar anomalies, Scatter plots, Histograms, and 95% Confidence Area bands.
* **NASA 4 Questions & Plain-English Verdict**: Easy-to-read summary explaining what is happening, why it happens, and what to do.

### 3. 🔄 Compare Two Areas
* Put any two Indian locations side-by-side (e.g., *Rajasthan vs. Kerala* or *Delhi vs. Vidarbha*).
* See how the same global climate change causes completely opposite effects (dipoles) in different regions.

### 4. 💡 Built-In Scientific Dictionary
* Click the floating bulb icon (💡) at the bottom-right of any page.
* Features an alphabetical (A–Z) glossary explaining scientific terms (like *NDVI*, *Sen's Slope*, *Cloudburst*, *Wet-Bulb Temp*) in simple words with real-life examples.

### 5. 📄 1-Click Executive Reports
* Export plain-English reports and summaries instantly as a Word document (`.doc`), printable PDF, or raw data CSV.

### 6. 🎯 1-Click Guided Demonstration Examples
* **Case 1**: Indo-Gangetic Breadbasket Monsoon Deficit (-28 mm/dec, p = 0.008).
* **Case 2**: Central India & Vidarbha Root-Zone Flash Drought (Soil -7.2 pts/dec, p = 0.003).
* **Case 3**: Opposite Climate Dipole — Thar Desert vs. Western Ghats.

### 7. 🧭 Variable Detective Assistant
* Answers NASA's inquiry prompt: selects your environmental threat and geographic zone to auto-recommend the exact NASA satellite instrument (GPM, MODIS, SMAP).

---

## 🎨 Theme: Biosphere Mint & Pearl

The website uses a fresh ecological **Biosphere Mint & Pearl** theme (crisp white cards, soft pearl background, deep emerald and mint accents, and dark high-contrast text) with support for a **Deep Galaxy** dark theme.

---

## 🤖 Synthetic Intelligence (SI / AI) Declaration

In accordance with the official **NASA Space Apps Challenge 2026** rules:
* **Assistive Role:** Generative AI tools were used assistively for frontend user interface architecture, responsive CSS layout, SVG iconography, and documentation structuring.
* **Scientific & Data Integrity:** All satellite mission variables (NASA GPM IMERG V07, Terra/Aqua MODIS LST MOD11A1, SMAP SPL4SMGP), climatological baselines (IMD 1991–2020 30-year normal), and statistical methods (Theil-Sen median slope estimator, Mann-Kendall monotonic rank test, Benjamini-Hochberg FDR) were independently researched, verified, and formulated from peer-reviewed Earth science and hydrological literature.

---

## 📋 NASA Space Apps Submission Summary

* **Project Title**: EARTH METRIX — India Earth System Trend Detective
* **Challenge**: *Be An Earth System Trend Detective!*
* **Short Summary**: 
  > EARTH METRIX is an easy-to-use climate intelligence tool analyzing 31 continuous years (1995–2025) of NASA satellite data across India. It isolates long-term climate shifts from short-term weather noise using GPM rainfall, MODIS heat, and SMAP soil moisture data. Features an interactive satellite map, village-level search, side-by-side regional comparisons, plain-English scientific explanations, and 1-click executive reports for citizens, farmers, and planners.
