/**
 * =============================================================================
 * CENTRALIZED SCIENTIFIC & TECHNICAL DICTIONARY
 * =============================================================================
 * Shared across all website pages:
 * - index.html (Main EarthScope Application)
 * - trend_detective_tool.html
 * - dev/architecture_3d.html (Development Reference)
 *
 * Provides:
 * 1. Fixed floating circular Bulb (💡) icon at the bottom-right corner.
 * 2. Slide-out drawer with alphabetical A–Z navigation.
 * 3. Real-time instant search with highlighted keyword matches.
 * 4. Categorized, bolded terms with simple meanings, definitions, and real examples.
 * 5. Full Biosphere Mint & Pearl theme styling (with Deep Galaxy compatibility).
 * =============================================================================
 */

(function() {
  'use strict';

  // 1. CENTRALIZED GLOSSARY DATABASE (Automatically Alphabetically Sorted, No Duplicates)
  const RAW_DICTIONARY_DATA = [
    {
      term: "30-Year Climatological Baseline (IMD Normal)",
      category: "Statistical Analysis & Anomalies",
      simpleMeaning: "A 30-year average benchmark used by meteorologists to judge whether today's weather is normal or abnormal.",
      definition: "The World Meteorological Organization (WMO) and India Meteorological Department (IMD) standard 30-year reference window (1991–2020) representing long-term average conditions for temperature, precipitation, and soil moisture against which true climate shifts are evaluated.",
      example: "Comparing North India's 2024 monsoon rainfall against the 1991–2020 IMD normal (840 mm) reveals a -28 mm per decade structural deficit rather than a 1-year blip."
    },
    {
      term: "Agro-Climatic Zone",
      category: "Maps & Geographical Analysis",
      simpleMeaning: "A geographical region sharing similar climate, rainfall, soil type, and farming conditions.",
      definition: "A land unit defined by major climate characteristics (temperature, precipitation, length of growing period) and physiographic terrain suitable for specific crops and farming practices. India is divided into 15 national agro-climatic regions.",
      example: "The Indo-Gangetic Plains agro-climatic zone supports double-cropping of rice and wheat, but faces high vulnerability to shifting monsoon onset dates."
    },
    {
      term: "Anomaly (Climate Anomaly)",
      category: "Statistical Analysis & Anomalies",
      simpleMeaning: "The mathematical difference between observed weather today and the historical 30-year average.",
      definition: "A deviation of an atmospheric or oceanic variable (such as temperature, precipitation, or soil moisture) from its long-term climatological reference baseline. Positive anomalies denote above-average conditions; negative anomalies denote below-average conditions.",
      example: "A +3.2°C surface temperature anomaly over western Rajasthan indicates that ground skin temperatures were 3.2°C hotter than the historical seasonal average."
    },
    {
      term: "Benjamini-Hochberg False Discovery Rate (FDR)",
      category: "Statistical Analysis & Anomalies",
      simpleMeaning: "A mathematical filter that prevents scientists from mistaking pure random coincidence for a real climate trend when testing thousands of map locations.",
      definition: "A rigorous statistical procedure that controls the expected proportion of false positive discoveries among rejected null hypotheses when conducting simultaneous multiple hypothesis testing across 10-km satellite grid cells.",
      example: "When analyzing 31 years across 3,200 grid cells over India, FDR filtering ensures that reported rainfall declines are mathematically authentic climate trends and not random sampling artifacts."
    },
    {
      term: "Blue Marble",
      category: "Satellites & NASA Datasets",
      simpleMeaning: "NASA's photorealistic composite imagery showing Earth as seen from space without cloud obscurity.",
      definition: "A high-resolution, seamless global satellite mosaic developed by NASA Goddard Space Flight Center, combining multispectral imagery from Terra MODIS to depict accurate land cover, oceans, topography, and seasonal snow cover.",
      example: "The rotating 3D globe in the background uses high-resolution NASA Blue Marble Next Generation surface textures with bathymetric ocean depth relief."
    },
    {
      term: "Canopy Desiccation",
      category: "Vegetation & NDVI",
      simpleMeaning: "Severe drying and wilting of plant leaves caused by extreme atmospheric heat and lack of root moisture.",
      definition: "The loss of internal cellular moisture from plant leaf foliage when atmospheric evaporative thirst exceeds root water uptake, leading to stomatal closure, chlorophyll breakdown, and premature crop senescence.",
      example: "In Vidarbha, Maharashtra, intense pre-monsoon heatwaves combined with dry soil caused severe soybean canopy desiccation within 10 days."
    },
    {
      term: "Clausius-Clapeyron Relation",
      category: "Extreme Heat & Temperature",
      simpleMeaning: "The fundamental law of physics dictating that warmer air holds more moisture (~7% more per 1°C of warming).",
      definition: "A thermodynamic equation establishing that the saturation vapor pressure of the atmosphere increases exponentially at approximately 7% per degree Celsius of warming, enabling the atmosphere to store immense moisture before releasing it in violent bursts.",
      example: "With global temperatures up ~1.2°C, the Indian monsoon atmosphere holds ~8.5% more moisture, converting gentle week-long rains into destructive 2-hour cloudbursts."
    },
    {
      term: "Cloudburst",
      category: "Rainfall & Precipitation",
      simpleMeaning: "An extremely intense, violent downpour dumping massive volumes of rain in a very short period over a small area.",
      definition: "Meteorologically defined by the IMD as rainfall exceeding 100 mm (4 inches) per hour over a localized geographical area (typically ~20 to 30 km²), commonly triggered by rapid convective updrafts and orographic trapping in mountainous terrains.",
      example: "The July 2023 cloudburst in Himachal Pradesh dumped over 150 mm of rain in under two hours, triggering catastrophic flash floods and landslides along the Beas river basin."
    },
    {
      term: "CMR (Common Metadata Repository)",
      category: "Satellites & NASA Datasets",
      simpleMeaning: "NASA's high-speed catalog system used to search and download Earth satellite datasets.",
      definition: "A high-performance, Earth science metadata catalog maintained by NASA's Earth Science Data and Information System (ESDIS) that indexes billions of satellite granules from missions like GPM, MODIS, and SMAP for global researchers.",
      example: "The dashboard connects to the NASA CMR API endpoint to verify Level-3 gridded daily precipitation arrays for India."
    },
    {
      term: "Compound Climate Extreme",
      category: "Climate & Environmental Stress",
      simpleMeaning: "When two or more dangerous weather disasters happen at the exact same time and multiply each other's damage.",
      definition: "The simultaneous or sequential occurrence of multiple climate drivers and hazards (e.g., severe heatwave combined with acute root-zone drought), producing impacts far more devastating than either hazard occurring in isolation.",
      example: "In May 2024, western India experienced 48°C air temperatures coinciding with a -12% root-zone soil moisture deficit, overwhelming municipal electrical grids and destroying standing crops."
    },
    {
      term: "Convective Precipitation",
      category: "Rainfall & Precipitation",
      simpleMeaning: "Heavy rain caused when hot surface air rapidly rises, cools, and forms violent storm clouds.",
      definition: "Rainfall generated by localized vertical atmospheric instability, where intense surface heating forces warm, moist air to rise rapidly, condense into deep cumulonimbus towers, and discharge localized high-intensity deluge.",
      example: "Pre-monsoon afternoon thundershowers (Kalbaishakhi) over eastern India are classic convective precipitation events triggered by intense solar ground heating."
    },
    {
      term: "Coordinate Reference System (CRS)",
      category: "Maps & Geographical Analysis",
      simpleMeaning: "The standardized geographic coordinate system (latitude/longitude) used to place map points accurately on Earth.",
      definition: "A coordinate-based local, regional, or global system used to locate geographical entities on Earth's surface (e.g., WGS 84 / EPSG:4326), ensuring satellite swath data aligns perfectly with political and river basin boundaries.",
      example: "All NASA satellite rasters and Leaflet vector boundaries in this tool are reprojected into WGS 84 (EPSG:4326) coordinate space."
    },
    {
      term: "Decadal Trend Rate",
      category: "Statistical Analysis & Anomalies",
      simpleMeaning: "The measured speed and direction of climate change calculated per 10-year period.",
      definition: "The physical rate of monotonic change in an environmental parameter over a ten-year span, calculated using Sen's slope estimator across multi-decadal time-series data.",
      example: "The tool identifies a decadal rainfall trend rate of -28 mm/decade across North India, proving a persistent multi-decadal drying trajectory."
    },
    {
      term: "Diurnal Temperature Range (DTR)",
      category: "Extreme Heat & Temperature",
      simpleMeaning: "The difference between the highest daytime temperature and the coolest nighttime temperature on the same day.",
      definition: "The numerical difference between the daily maximum temperature (Tmax) and daily minimum temperature (Tmin) at a specific geographical location.",
      example: "In the Thar Desert, dry air creates a wide DTR (>18°C between blistering 46°C afternoons and 28°C nights), whereas humid coastal Mumbai exhibits a narrow DTR (<6°C)."
    },
    {
      term: "Dry Spell Interval",
      category: "Rainfall & Precipitation",
      simpleMeaning: "The number of consecutive rainless days occurring during the active monsoon crop-growing season.",
      definition: "A sequence of consecutive days during the official southwest monsoon period (June–September) receiving less than 2.5 mm of rain per day, causing agricultural soil moisture stress between convective downpours.",
      example: "In Punjab and Haryana, the average dry spell duration between monsoonal rain events has expanded from 8 days in 1995 to 19 days in recent years."
    },
    {
      term: "Evapotranspiration (ET)",
      category: "Climate & Environmental Stress",
      simpleMeaning: "The combined amount of water evaporating from the ground and transpiring through plant leaves into the air.",
      definition: "The total flux of water transfer from the Earth's surface to the atmosphere, combining direct evaporation from soil and open water bodies with transpiration through plant vegetative stomata.",
      example: "High summer temperatures accelerate evapotranspiration in central India, depleting surface reservoir levels by up to 1.5 cm per day."
    },
    {
      term: "Flash Drought",
      category: "Climate & Environmental Stress",
      simpleMeaning: "A drought that develops unusually quickly—in just 1 to 3 weeks—due to sudden extreme heat and dry winds.",
      definition: "An unusually rapid onset of drought conditions driven by high atmospheric evaporative demand (extreme heat, low humidity, strong winds) coupled with precipitation deficits, stripping soil moisture in days rather than months.",
      example: "In July 2021, an abrupt 3-week monsoon hiatus paired with 40°C heat triggered a flash drought across Vidarbha, desiccating cotton crops before farmers could deploy supplemental irrigation."
    },
    {
      term: "GeoJSON Polygon",
      category: "Maps & Geographical Analysis",
      simpleMeaning: "A digital map file format that outlines the precise borders of states, regions, and districts.",
      definition: "An open standard geospatial data interchange format based on JSON that encodes geographic boundaries, multipolygon geometries, and administrative regional properties for interactive web maps.",
      example: "The dashboard renders 6 agro-climatic boundaries using GeoJSON coordinate rings that filter NASA satellite pixels inside India's borders."
    },
    {
      term: "GPM (Global Precipitation Measurement)",
      category: "Satellites & NASA Datasets",
      simpleMeaning: "NASA and JAXA's international satellite constellation that tracks rain, snow, and cloudbursts worldwide every 30 minutes.",
      definition: "An international satellite mission initiated by NASA and the Japan Aerospace Exploration Agency (JAXA) carrying the Dual-frequency Precipitation Radar (DPR) and GPM Microwave Imager (GMI) to map global precipitation at 0.1° resolution.",
      example: "GPM IMERG satellite data captured the intense 2024 Wayanad, Kerala deluge, recording over 300 mm of rainfall in 24 hours along the Western Ghats ridgeline."
    },
    {
      term: "IMERG (Integrated Multi-satellitE Retrievals for GPM)",
      category: "Satellites & NASA Datasets",
      simpleMeaning: "NASA's algorithm that merges data from multiple radar and microwave satellites into one continuous global rain map.",
      definition: "NASA's flagship multi-satellite precipitation algorithm that combines passive microwave satellite observations, radar data, and infrared geostationary sensors with monthly surface rain gauges to produce seamless 0.1° gridded rain estimates.",
      example: "The tool leverages GPM IMERG Final Run (V07B) data spanning 1995–2025 to track 31 years of localized precipitation trends across all Indian states."
    },
    {
      term: "Indo-Gangetic Basin",
      category: "Maps & Geographical Analysis",
      simpleMeaning: "The vast, fertile northern plains of India formed by the Indus and Ganga rivers, home to 400+ million people.",
      definition: "A vast sedimentary foreland basin stretching across northern and eastern India (encompassing Punjab, Haryana, Uttar Pradesh, Bihar, and West Bengal), forming the primary agricultural breadbasket of South Asia.",
      example: "The Indo-Gangetic Basin produces over 50% of India's national wheat and rice, making its -28 mm/decade monsoon drying trend a high food security concern."
    },
    {
      term: "Land Surface Temperature (LST)",
      category: "Extreme Heat & Temperature",
      simpleMeaning: "The actual direct temperature of the ground surface when touched, which is much hotter than the air temperature reported on TV.",
      definition: "The radiative skin temperature of the land surface measured in the thermal infrared spectral bands (10.5–12.5 µm) by satellite sensors like MODIS, capturing the exact heat of bare soil, road asphalt, and vegetation canopies.",
      example: "While air thermometers in Jaipur reported 44°C during a June heatwave, MODIS satellite sensors detected a blistering Land Surface Temperature (LST) of 53.6°C on paved surfaces."
    },
    {
      term: "Mann-Kendall Trend Test",
      category: "Statistical Analysis & Anomalies",
      simpleMeaning: "A gold-standard mathematical test that proves whether climate changes are real permanent shifts or just temporary weather luck.",
      definition: "A non-parametric statistical rank test widely endorsed by the IPCC and WMO that assesses whether a time-series variable possesses a monotonic upward or downward trend over time without requiring normally distributed data.",
      example: "Applying the Mann-Kendall test to 31 years of Rajasthan thermal data yielded a Z-score of +4.21 (p < 0.0001), confirming with 99.99% mathematical confidence that summer heat is permanently increasing."
    },
    {
      term: "MODIS (Moderate Resolution Imaging Spectroradiometer)",
      category: "Satellites & NASA Datasets",
      simpleMeaning: "Key NASA satellite instruments aboard Terra and Aqua satellites that scan Earth daily for heat, vegetation, and fires.",
      definition: "A 36-band multispectral instrument operating on NASA's Terra and Aqua spacecraft, providing continuous global observations of Earth's land surface temperature, vegetation indices (NDVI/EVI), aerosol optical depth, and wildfire hotspots.",
      example: "MODIS Terra daytime thermal data (MOD11A2) tracks the expansion of extreme thermal domes across northwest India over the past 3 decades."
    },
    {
      term: "Monsoonal Dipole",
      category: "Rainfall & Precipitation",
      simpleMeaning: "A climate pattern where one part of India experiences heavy flooding while an adjacent region suffers drought.",
      definition: "An opposing regional rainfall pattern across the Indian subcontinent where large-scale circulation shifts channel excess moisture into one geographical zone (e.g., Western Ghats) while simultaneously starving another (e.g., Indo-Gangetic Plains).",
      example: "The 2024 monsoon produced severe deluges in Kerala and Gujarat while parts of eastern UP and Bihar experienced a -18% seasonal rainfall deficit."
    },
    {
      term: "Monotonic Trend",
      category: "Statistical Analysis & Anomalies",
      simpleMeaning: "A trend that consistently moves in one direction over time (either continually increasing or continually decreasing).",
      definition: "A mathematical sequence where successive values consistently increase or stay the same (monotonic increasing) or consistently decrease or stay the same (monotonic decreasing), without reversing direction over the multi-decadal timeline.",
      example: "31-year soil moisture readings in Vidarbha exhibit a monotonic downward trend, indicating continuous drying rather than cyclical oscillation."
    },
    {
      term: "NDVI (Normalized Difference Vegetation Index)",
      category: "Vegetation & NDVI",
      simpleMeaning: "A satellite number from 0 to 1 measuring plant health and greenness (higher = greener and healthier crops).",
      definition: "A remote sensing index that evaluates photosynthetic activity and canopy greenness by calculating the normalized ratio of reflected near-infrared (NIR) and red light: NDVI = (NIR - Red) / (NIR + Red). Healthy plants absorb red light and reflect NIR.",
      example: "During the August dry spell, crop NDVI dropped from 0.72 (dense green canopy) down to 0.41 (severe water stress) across central Maharashtra farmlands."
    },
    {
      term: "NetCDF (Network Common Data Form)",
      category: "Satellites & NASA Datasets",
      simpleMeaning: "The standard scientific file format used by NASA, NOAA, and climate scientists to store multi-dimensional satellite data.",
      definition: "A self-describing, machine-independent scientific array data format (NetCDF-4/HDF5) widely used in atmospheric and Earth science to store multidimensional spatial grids (latitude, longitude, time, elevation).",
      example: "The raw climate telemetry used in this project originates from NASA GES DISC NetCDF-4 daily precipitation and soil moisture raster files."
    },
    {
      term: "Orographic Lifting",
      category: "Rainfall & Precipitation",
      simpleMeaning: "When mountain ranges force moist ocean winds to rise upward, causing clouds to dump massive rainfall on one side.",
      definition: "The forced vertical ascent of warm, moist air parcels when encountering topographical barriers like mountains, causing adiabatic cooling, condensation, and intense precipitation on the windward mountain face.",
      example: "Southwest monsoon winds hitting the 2,000-meter peaks of the Western Ghats undergo intense orographic lifting, dumping over 3,000 mm of annual rain on the coastal escarpment."
    },
    {
      term: "Phenology Shift",
      category: "Vegetation & NDVI",
      simpleMeaning: "Changes in the seasonal timing of when crops and trees sprout, flower, ripen, or harvest due to shifting weather.",
      definition: "Changes in the periodic biological life-cycle events of plants and vegetation driven by variations in climate cues, such as earlier flowering, delayed sowing dates, or altered vegetative maturation windows.",
      example: "Indian farmers in western UP have shifted wheat sowing by 12–15 days later in the calendar to prevent early grain development from being scorched by March terminal heatwaves."
    },
    {
      term: "p-value (Statistical Significance)",
      category: "Statistical Analysis & Anomalies",
      simpleMeaning: "The mathematical probability that a trend happened by dumb luck; if p < 0.05, scientists consider the climate trend genuinely proven.",
      definition: "The probability of obtaining test results at least as extreme as the observed results under the null hypothesis (that no real climate trend exists). A p-value < 0.05 indicates >95% statistical confidence that the observed trend is authentic.",
      example: "A calculated p = 0.008 for North India's rainfall decrease gives scientists >99% certainty that the monsoon shift is a real physical change, not random annual weather noise."
    },
    {
      term: "Rain-Shadow Effect",
      category: "Maps & Geographical Analysis",
      simpleMeaning: "A dry region on the leeward (sheltered) side of a mountain range that gets very little rain because clouds already dumped their moisture.",
      definition: "A dry geographical area situated on the leeward side of an elevated mountain range, where descending air warms adiabatically and absorbs moisture, suppressing cloud formation and producing semi-arid conditions.",
      example: "The Deccan Plateau and Marathwada sit directly in the rain shadow of the Western Ghats, receiving only a fraction of the heavy rainfall dumped on coastal Mumbai."
    },
    {
      term: "Root-Zone Soil Moisture (RZSM)",
      category: "Climate & Environmental Stress",
      simpleMeaning: "The moisture trapped between 0 and 100 cm underground where crop roots actually absorb water and nutrients.",
      definition: "The volumetric fraction of water stored in the sub-surface soil column (typically 0–100 cm depth) accessible to agricultural plant root systems, measured in m³/m³ or percentage saturation by NASA SMAP radiometers.",
      example: "NASA SMAP radar indicates a -9% decadal drop in root-zone soil moisture across Madhya Pradesh, indicating agricultural root dehydration even during normal surface humidity."
    },
    {
      term: "Sen's Slope Estimator",
      category: "Statistical Analysis & Anomalies",
      simpleMeaning: "A reliable mathematical calculation of how fast climate is changing each year, unaffected by single extreme disaster years.",
      definition: "A non-parametric median-based estimator developed by Pranab Kumar Sen that calculates the true slope (rate of change per unit time) of a linear trend, highly robust against statistical outliers and non-normal climate distributions.",
      example: "Using Sen's slope across 1995–2025 records reveals that extreme heat days in Rajasthan are rising at an exact rate of +5.0 days per decade."
    },
    {
      term: "SMAP (Soil Moisture Active Passive)",
      category: "Satellites & NASA Datasets",
      simpleMeaning: "NASA's dedicated radar satellite that measures moisture in the top soil and root-zone from space every 2 to 3 days.",
      definition: "A NASA Earth observation satellite mission equipped with an L-band microwave radiometer operating at 1.4 GHz, designed to measure surface (top 5 cm) and root-zone (0–100 cm) soil moisture and freeze/thaw states globally.",
      example: "SMAP L4 daily root-zone soil moisture models track flash drought propagation across agricultural districts in Punjab and Vidarbha."
    },
    {
      term: "Spatial Resolution (0.1° Grid)",
      category: "Maps & Geographical Analysis",
      simpleMeaning: "The pixel size of a satellite map; a 0.1° grid divides India into neat ~10 km by 10 km square observation boxes.",
      definition: "The minimum distance between two adjacent measurement samples in a raster grid. In Earth science, a 0.1° x 0.1° grid cell corresponds to approximately 10 km x 10 km at tropical and sub-tropical latitudes over India.",
      example: "NASA GPM and IMD data are mapped onto a uniform 0.1° mesh across India, enabling pinpoint municipal and watershed-level trend tracking."
    },
    {
      term: "Thermal Skin Dome",
      category: "Extreme Heat & Temperature",
      simpleMeaning: "A huge mass of trapped, blistering hot air pushing down on the ground, creating extreme surface temperatures.",
      definition: "A semi-stationary synoptic high-pressure meteorological system that traps hot continental air beneath an atmospheric ridge, preventing cloud formation and compressing air downwards to superheat the immediate ground surface.",
      example: "A massive thermal skin dome over northwest India in May 2024 forced ground skin temperatures in Phalodi, Rajasthan past 50.5°C for 6 consecutive days."
    },
    {
      term: "Urban Heat Island (UHI)",
      category: "Extreme Heat & Temperature",
      simpleMeaning: "A city area that gets significantly hotter than surrounding rural villages because concrete, asphalt, and buildings trap heat.",
      definition: "An urban or metropolitan area that is significantly warmer than its surrounding rural regions due to human activities, high thermal mass of asphalt and concrete, reduced vegetative evaporative cooling, and waste heat generation.",
      example: "During summer nights, satellite thermal scans show Delhi's urban core is up to 4.8°C hotter than surrounding agricultural villages in Haryana."
    },
    {
      term: "Vapor Pressure Deficit (VPD)",
      category: "Climate & Environmental Stress",
      simpleMeaning: "The dryness of the air; a measure of how strongly the atmosphere acts like a sponge sucking moisture out of plants and soil.",
      definition: "The difference between the amount of moisture the air can hold when saturated and the actual amount of moisture in the air at a given temperature, representing the primary driving force behind plant transpiration and atmospheric evaporative thirst.",
      example: "When heatwaves push VPD above 3.5 kPa in central India, crops stop photosynthesizing and close their stomata to prevent dehydration, leading to heat stress even in irrigated fields."
    },
    {
      term: "Vegetation Health Index (VHI)",
      category: "Vegetation & NDVI",
      simpleMeaning: "A composite satellite health score combining temperature stress and vegetation greenness to evaluate crop drought conditions.",
      definition: "A remote sensing index that integrates the Vegetation Condition Index (VCI) derived from NDVI with the Temperature Condition Index (TCI) derived from thermal bands to provide an early warning of agricultural drought and crop yield loss.",
      example: "VHI scores below 20 across Marathwada signaled severe agricultural drought two months before official state crop loss declarations."
    },
    {
      term: "Western Ghats Escarpment",
      category: "Maps & Geographical Analysis",
      simpleMeaning: "The continuous, rugged mountain ridge running along India's southwestern coast that traps Arabian Sea monsoon clouds.",
      definition: "A continuous mountain range traversing Maharashtra, Goa, Karnataka, Kerala, and Tamil Nadu that acts as a towering meteorological barrier, generating intense orographic rainfall along the coastal strip and creating a rain-shadow plateau inland.",
      example: "The Western Ghats receive up to 5,000 mm of annual rainfall, where recent trends reveal a dangerous clustering of extreme rainfall days causing hill slope landslides."
    },
    {
      term: "Wet-Bulb Temperature (Twb)",
      category: "Extreme Heat & Temperature",
      simpleMeaning: "The temperature combining heat and humidity that reflects human survivability; at 35°C wet-bulb, the human body can no longer cool itself by sweating.",
      definition: "The lowest temperature to which air can be cooled by the evaporation of water at constant pressure, measuring the combined physiological stress of heat and humidity on living organisms. Above 35°C wet-bulb, fatal hyperthermia occurs even in shaded, ventilated conditions.",
      example: "During coastal pre-monsoon periods in Odisha and West Bengal, wet-bulb temperatures regularly exceed 31°C, placing outdoor agricultural and construction laborers at high risk of heat stroke."
    }
  ];

  // Dedup and sort alphabetically A-Z automatically
  const DICTIONARY_DATABASE = (function() {
    const seen = new Set();
    const unique = [];
    for (const item of RAW_DICTIONARY_DATA) {
      const key = item.term.trim().toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(item);
      }
    }
    unique.sort((a, b) => a.term.localeCompare(b.term, undefined, { sensitivity: 'base' }));
    return unique;
  })();

  // 2. INJECT CSS STYLES
  function injectStyles() {
    if (document.getElementById('dict-injected-styles')) return;

    const styleEl = document.createElement('style');
    styleEl.id = 'dict-injected-styles';
    styleEl.textContent = `
      /* =======================================================================
         SCIENTIFIC DICTIONARY FLOATING BULB & DRAWER (BIOSPHERE MINT & PEARL)
         ======================================================================= */
      :root {
        --dict-mint-primary: #0f766e;
        --dict-mint-accent: #10b981;
        --dict-mint-pale: #d1fae5;
        --dict-mint-dark: #065f46;
        --dict-bg-glass: rgba(255, 255, 255, 0.96);
        --dict-card-bg: #ffffff;
        --dict-card-border: rgba(16, 185, 129, 0.24);
        --dict-text-main: #0f172a;
        --dict-text-muted: #475569;
        --dict-mark-bg: #fef08a;
        --dict-mark-text: #854d0e;
      }

      body.theme-cosmic-space {
        --dict-mint-primary: #38bdf8;
        --dict-mint-accent: #2dd4bf;
        --dict-mint-pale: rgba(56, 189, 248, 0.15);
        --dict-mint-dark: #7dd3fc;
        --dict-bg-glass: rgba(10, 15, 29, 0.96);
        --dict-card-bg: rgba(17, 24, 39, 0.85);
        --dict-card-border: rgba(56, 189, 248, 0.25);
        --dict-text-main: #f8fafc;
        --dict-text-muted: #94a3b8;
        --dict-mark-bg: #854d0e;
        --dict-mark-text: #fef08a;
      }

      /* 1. Floating Help Bulb Button (Fixed Bottom-Right) */
      .dict-floating-bulb-btn {
        position: fixed;
        bottom: 24px;
        right: 24px;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: #ffffff;
        border: 2px solid #10b981;
        box-shadow: 0 0 16px rgba(16, 185, 129, 0.45), 0 4px 14px rgba(0, 0, 0, 0.15);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 22px;
        z-index: 99998;
        transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);
        outline: none;
        user-select: none;
        animation: dictBulbGlow 3s infinite alternate;
      }

      body.theme-cosmic-space .dict-floating-bulb-btn {
        background: #0d172a;
        border-color: #38bdf8;
        box-shadow: 0 0 18px rgba(56, 189, 248, 0.5), 0 4px 16px rgba(0, 0, 0, 0.6);
      }

      .dict-floating-bulb-btn:hover {
        transform: scale(1.12) translateY(-3px);
        box-shadow: 0 0 24px rgba(16, 185, 129, 0.75), 0 8px 22px rgba(0, 0, 0, 0.25);
        border-color: #059669;
      }

      body.theme-cosmic-space .dict-floating-bulb-btn:hover {
        box-shadow: 0 0 26px rgba(56, 189, 248, 0.8), 0 8px 22px rgba(0, 0, 0, 0.7);
        border-color: #7dd3fc;
      }

      .dict-floating-bulb-btn:active {
        transform: scale(0.96);
      }

      @keyframes dictBulbGlow {
        0% {
          box-shadow: 0 0 12px rgba(16, 185, 129, 0.35), 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        100% {
          box-shadow: 0 0 22px rgba(16, 185, 129, 0.65), 0 6px 16px rgba(0, 0, 0, 0.2);
        }
      }

      /* 2. Drawer Backdrop */
      .dict-drawer-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(15, 23, 42, 0.45);
        backdrop-filter: blur(4px);
        z-index: 99999;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
      }

      .dict-drawer-backdrop.open {
        opacity: 1;
        visibility: visible;
      }

      /* 3. Side Drawer Container */
      .dict-side-drawer {
        position: fixed;
        top: 0;
        right: 0;
        width: 520px;
        max-width: 92vw;
        height: 100vh;
        background: var(--dict-bg-glass);
        backdrop-filter: blur(28px);
        -webkit-backdrop-filter: blur(28px);
        box-shadow: -8px 0 35px rgba(0, 0, 0, 0.25);
        border-left: 1px solid var(--dict-card-border);
        z-index: 100000;
        display: flex;
        flex-direction: column;
        transform: translateX(100%);
        transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif;
        color: var(--dict-text-main);
        box-sizing: border-box;
      }

      .dict-side-drawer.open {
        transform: translateX(0);
      }

      /* Drawer Header */
      .dict-header {
        padding: 20px 22px 14px 22px;
        border-bottom: 1px solid var(--dict-card-border);
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 12px;
        background: rgba(255, 255, 255, 0.4);
      }

      body.theme-cosmic-space .dict-header {
        background: rgba(13, 20, 36, 0.5);
      }

      .dict-header-title-wrap h2 {
        margin: 0;
        font-size: 18px;
        font-weight: 800;
        color: var(--dict-mint-primary);
        display: flex;
        align-items: center;
        gap: 8px;
        letter-spacing: -0.2px;
      }

      .dict-header-title-wrap p {
        margin: 4px 0 0 0;
        font-size: 12px;
        color: var(--dict-text-muted);
        line-height: 1.4;
      }

      .dict-close-btn {
        background: transparent;
        border: 1px solid var(--dict-card-border);
        border-radius: 8px;
        width: 34px;
        height: 34px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 15px;
        color: var(--dict-text-muted);
        transition: all 0.18s ease;
      }

      .dict-close-btn:hover {
        background: #ef4444;
        color: #ffffff;
        border-color: #ef4444;
      }

      /* Drawer Controls (Search & A-Z) */
      .dict-controls {
        padding: 14px 22px 12px 22px;
        border-bottom: 1px solid var(--dict-card-border);
        display: flex;
        flex-direction: column;
        gap: 10px;
        background: rgba(255, 255, 255, 0.2);
      }

      body.theme-cosmic-space .dict-controls {
        background: rgba(13, 20, 36, 0.3);
      }

      /* Search Row */
      .dict-search-row {
        position: relative;
        display: flex;
        align-items: center;
      }

      .dict-search-icon {
        position: absolute;
        left: 12px;
        font-size: 14px;
        color: var(--dict-mint-primary);
        pointer-events: none;
      }

      .dict-search-input {
        width: 100%;
        padding: 10px 36px 10px 36px;
        border-radius: 10px;
        border: 1.5px solid var(--dict-card-border);
        background: #ffffff;
        font-size: 13.5px;
        color: var(--dict-text-main);
        outline: none;
        box-sizing: border-box;
        transition: all 0.2s ease;
      }

      body.theme-cosmic-space .dict-search-input {
        background: rgba(17, 24, 39, 0.9);
      }

      .dict-search-input:focus {
        border-color: var(--dict-mint-accent);
        box-shadow: 0 0 12px rgba(16, 185, 129, 0.25);
      }

      .dict-search-clear-btn {
        position: absolute;
        right: 10px;
        background: transparent;
        border: none;
        color: var(--dict-text-muted);
        font-size: 13px;
        cursor: pointer;
        padding: 4px;
        display: none;
      }

      .dict-search-clear-btn:hover {
        color: #ef4444;
      }

      /* Stats Bar */
      .dict-stats-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 11.5px;
        font-weight: 600;
        color: var(--dict-text-muted);
      }

      .dict-count-pill {
        background: var(--dict-mint-pale);
        color: var(--dict-mint-dark);
        padding: 2px 8px;
        border-radius: 4px;
        font-family: 'JetBrains Mono', monospace;
        font-size: 11px;
        font-weight: 700;
      }

      /* Alphabetical A–Z Navigation */
      .dict-az-bar {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        padding-top: 2px;
      }

      .dict-az-btn {
        min-width: 24px;
        height: 24px;
        padding: 0 4px;
        border-radius: 5px;
        border: 1px solid transparent;
        background: transparent;
        color: var(--dict-text-muted);
        font-size: 11px;
        font-weight: 700;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.15s ease;
      }

      .dict-az-btn:hover {
        background: rgba(16, 185, 129, 0.15);
        color: var(--dict-mint-primary);
      }

      .dict-az-btn.active {
        background: var(--dict-mint-primary);
        color: #ffffff !important;
        font-weight: 800;
        box-shadow: 0 2px 6px rgba(15, 118, 110, 0.3);
      }

      .dict-az-btn.disabled {
        opacity: 0.3;
        cursor: default;
        pointer-events: none;
      }

      /* Scrollable Terms List */
      .dict-list-container {
        flex: 1;
        overflow-y: auto;
        padding: 16px 22px 24px 22px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        box-sizing: border-box;
      }

      .dict-list-container::-webkit-scrollbar {
        width: 6px;
      }
      .dict-list-container::-webkit-scrollbar-thumb {
        background: rgba(148, 163, 184, 0.4);
        border-radius: 3px;
      }
      .dict-list-container::-webkit-scrollbar-thumb:hover {
        background: var(--dict-mint-accent);
      }

      /* Term Card */
      .dict-term-card {
        background: var(--dict-card-bg);
        border: 1px solid var(--dict-card-border);
        border-radius: 12px;
        padding: 14px 16px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        transition: all 0.2s ease;
      }

      .dict-term-card:hover {
        border-color: var(--dict-mint-accent);
        box-shadow: 0 4px 14px rgba(16, 185, 129, 0.12);
        transform: translateY(-1px);
      }

      .dict-term-header {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 6px;
      }

      .dict-term-title {
        margin: 0;
        font-size: 14.5px;
        font-weight: 800;
        color: var(--dict-text-main);
        letter-spacing: -0.15px;
        line-height: 1.35;
      }

      .dict-cat-badge {
        font-size: 10px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.4px;
        background: var(--dict-mint-pale);
        color: var(--dict-mint-dark);
        padding: 2px 7px;
        border-radius: 4px;
        font-family: 'JetBrains Mono', monospace;
      }

      .dict-simple-meaning {
        margin: 0;
        font-size: 12.5px;
        line-height: 1.45;
        color: var(--dict-text-main);
      }

      .dict-simple-meaning strong {
        color: var(--dict-mint-primary);
        font-weight: 700;
      }

      .dict-definition {
        margin: 0;
        font-size: 12px;
        line-height: 1.5;
        color: var(--dict-text-muted);
      }

      .dict-definition strong {
        color: var(--dict-text-main);
        font-weight: 600;
      }

      .dict-example-box {
        margin-top: 2px;
        padding: 7px 10px;
        background: rgba(16, 185, 129, 0.06);
        border-left: 3px solid var(--dict-mint-accent);
        border-radius: 4px;
        font-size: 11.5px;
        line-height: 1.45;
        color: var(--dict-text-muted);
      }

      body.theme-cosmic-space .dict-example-box {
        background: rgba(56, 189, 248, 0.08);
        border-left-color: var(--dict-mint-accent);
      }

      .dict-example-box strong {
        color: var(--dict-mint-primary);
        font-weight: 700;
      }

      /* Highlighted matching keywords */
      .dict-mark {
        background: var(--dict-mark-bg);
        color: var(--dict-mark-text);
        padding: 1px 3px;
        border-radius: 3px;
        font-weight: 700;
      }

      /* Empty State */
      .dict-empty-state {
        text-align: center;
        padding: 40px 20px;
        color: var(--dict-text-muted);
      }

      .dict-empty-icon {
        font-size: 38px;
        margin-bottom: 12px;
      }

      .dict-empty-title {
        font-size: 15px;
        font-weight: 700;
        color: var(--dict-text-main);
        margin-bottom: 6px;
      }

      .dict-empty-text {
        font-size: 12.5px;
        line-height: 1.5;
        max-width: 320px;
        margin: 0 auto;
      }

      .dict-empty-reset-btn {
        margin-top: 14px;
        padding: 6px 14px;
        background: var(--dict-mint-primary);
        color: #ffffff;
        border: none;
        border-radius: 6px;
        font-size: 12px;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.18s ease;
      }

      .dict-empty-reset-btn:hover {
        background: #115e59;
      }

      @media (max-width: 640px) {
        .dict-side-drawer {
          width: 100vw;
          max-width: 100vw;
        }
        .dict-floating-bulb-btn {
          bottom: 18px;
          right: 18px;
          width: 44px;
          height: 44px;
          font-size: 20px;
        }
      }
    `;
    document.head.appendChild(styleEl);
  }

  // 3. BUILD DOM NODES
  let currentFilterLetter = 'ALL';
  let currentSearchQuery = '';

  function buildDictionaryDOM() {
    if (document.getElementById('dict-side-drawer')) return;

    // A. Floating Bulb Button
    const bulbBtn = document.createElement('button');
    bulbBtn.id = 'dict-floating-bulb-btn';
    bulbBtn.className = 'dict-floating-bulb-btn';
    bulbBtn.setAttribute('aria-label', 'Open Scientific Dictionary');
    bulbBtn.setAttribute('title', 'Scientific Dictionary & Glossary (💡)');
    bulbBtn.innerHTML = '💡';
    bulbBtn.onclick = function() {
      openScientificDictionary();
    };
    document.body.appendChild(bulbBtn);

    // B. Backdrop
    const backdrop = document.createElement('div');
    backdrop.id = 'dict-drawer-backdrop';
    backdrop.className = 'dict-drawer-backdrop';
    backdrop.onclick = function() {
      closeScientificDictionary();
    };
    document.body.appendChild(backdrop);

    // C. Side Drawer
    const drawer = document.createElement('aside');
    drawer.id = 'dict-side-drawer';
    drawer.className = 'dict-side-drawer';
    drawer.setAttribute('aria-label', 'Scientific & Technical Dictionary');

    drawer.innerHTML = `
      <!-- Drawer Header -->
      <div class="dict-header">
        <div class="dict-header-title-wrap">
          <h2><span>💡</span> Scientific Dictionary</h2>
          <p>31-Year Remote Sensing, Satellite & Environmental Terminology</p>
        </div>
        <button class="dict-close-btn" id="dict-close-btn" title="Close Dictionary (Esc)">✕</button>
      </div>

      <!-- Controls: Search + A-Z Navigation -->
      <div class="dict-controls">
        <!-- Search Input -->
        <div class="dict-search-row">
          <span class="dict-search-icon">🔍</span>
          <input type="text" class="dict-search-input" id="dict-search-input" placeholder="Search scientific terms (e.g. GPM, LST, Drought)..." autocomplete="off" />
          <button class="dict-search-clear-btn" id="dict-search-clear" title="Clear search">✕</button>
        </div>

        <!-- Stats Bar -->
        <div class="dict-stats-bar">
          <span id="dict-stat-label">Alphabetical Glossary (A–Z)</span>
          <span class="dict-count-pill" id="dict-count-badge">${DICTIONARY_DATABASE.length} TERMS</span>
        </div>

        <!-- A-Z Alphabetical Navigation Bar -->
        <div class="dict-az-bar" id="dict-az-bar">
          <!-- Populated by JS -->
        </div>
      </div>

      <!-- Scrollable Terms List -->
      <div class="dict-list-container" id="dict-terms-list">
        <!-- Term cards rendered by JS -->
      </div>
    `;

    document.body.appendChild(drawer);

    // Wire Close Events
    const closeBtn = drawer.querySelector('#dict-close-btn');
    if (closeBtn) {
      closeBtn.onclick = closeScientificDictionary;
    }

    // Wire Search Input
    const searchInput = drawer.querySelector('#dict-search-input');
    const searchClear = drawer.querySelector('#dict-search-clear');
    if (searchInput) {
      searchInput.addEventListener('input', function(e) {
        currentSearchQuery = e.target.value.trim();
        if (searchClear) {
          searchClear.style.display = currentSearchQuery.length > 0 ? 'block' : 'none';
        }
        renderTermsList();
      });
    }

    if (searchClear) {
      searchClear.addEventListener('click', function() {
        if (searchInput) searchInput.value = '';
        currentSearchQuery = '';
        searchClear.style.display = 'none';
        renderTermsList();
        if (searchInput) searchInput.focus();
      });
    }

    // Keyboard support: Escape closes drawer
    window.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        const d = document.getElementById('dict-side-drawer');
        if (d && d.classList.contains('open')) {
          closeScientificDictionary();
        }
      }
    });

    renderAZBar();
    renderTermsList();
  }

  // 4. RENDER A-Z NAVIGATION BAR
  function renderAZBar() {
    const azBar = document.getElementById('dict-az-bar');
    if (!azBar) return;

    // Discover which letters exist in the database
    const lettersPresent = new Set();
    DICTIONARY_DATABASE.forEach(item => {
      const firstChar = item.term.trim().charAt(0).toUpperCase();
      if (/[A-Z]/.test(firstChar)) {
        lettersPresent.add(firstChar);
      }
    });

    const alphabet = ['ALL', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];
    azBar.innerHTML = '';

    alphabet.forEach(letter => {
      const btn = document.createElement('button');
      btn.className = 'dict-az-btn';
      if (letter === currentFilterLetter) {
        btn.classList.add('active');
      }

      // Check if letter has any terms
      if (letter !== 'ALL' && !lettersPresent.has(letter)) {
        btn.classList.add('disabled');
        btn.setAttribute('tabindex', '-1');
      }

      btn.textContent = letter;
      btn.onclick = function() {
        if (letter !== 'ALL' && !lettersPresent.has(letter)) return;
        currentFilterLetter = letter;

        // Update active class
        azBar.querySelectorAll('.dict-az-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        renderTermsList();
      };

      azBar.appendChild(btn);
    });
  }

  // Helper: Highlight matching text
  function highlightText(text, query) {
    if (!query || query.length === 0) return text;
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, 'gi');
    return text.replace(regex, '<mark class="dict-mark">$1</mark>');
  }

  // 5. RENDER TERMS LIST
  function renderTermsList() {
    const listContainer = document.getElementById('dict-terms-list');
    const countBadge = document.getElementById('dict-count-badge');
    const statLabel = document.getElementById('dict-stat-label');
    if (!listContainer) return;

    const query = currentSearchQuery.toLowerCase();

    // Filter terms
    const filtered = DICTIONARY_DATABASE.filter(item => {
      // 1. A-Z Letter Filter
      if (currentFilterLetter !== 'ALL') {
        const firstChar = item.term.trim().charAt(0).toUpperCase();
        if (firstChar !== currentFilterLetter) return false;
      }

      // 2. Search Query Filter
      if (query.length > 0) {
        const matchTitle = item.term.toLowerCase().includes(query);
        const matchSimple = item.simpleMeaning.toLowerCase().includes(query);
        const matchDef = item.definition.toLowerCase().includes(query);
        const matchEx = item.example.toLowerCase().includes(query);
        const matchCat = item.category.toLowerCase().includes(query);
        if (!matchTitle && !matchSimple && !matchDef && !matchEx && !matchCat) return false;
      }

      return true;
    });

    // Update count badge
    if (countBadge) {
      countBadge.textContent = `${filtered.length} ${filtered.length === 1 ? 'TERM' : 'TERMS'}`;
    }

    if (statLabel) {
      if (currentSearchQuery.length > 0) {
        statLabel.textContent = `Matching "${currentSearchQuery}"`;
      } else if (currentFilterLetter !== 'ALL') {
        statLabel.textContent = `Terms starting with '${currentFilterLetter}'`;
      } else {
        statLabel.textContent = `Alphabetical Glossary (A–Z)`;
      }
    }

    // Empty state
    if (filtered.length === 0) {
      listContainer.innerHTML = `
        <div class="dict-empty-state">
          <div class="dict-empty-icon">🔍</div>
          <div class="dict-empty-title">No Terms Found</div>
          <p class="dict-empty-text">
            No scientific terms matched "${currentSearchQuery}". Try checking spelling or searching for keywords like <strong>GPM</strong>, <strong>LST</strong>, <strong>Drought</strong>, or <strong>Mann-Kendall</strong>.
          </p>
          <button class="dict-empty-reset-btn" onclick="window.resetScientificDictionaryFilters()">Show All Terms</button>
        </div>
      `;
      return;
    }

    // Render cards
    let html = '';
    filtered.forEach(item => {
      const hTerm = highlightText(item.term, currentSearchQuery);
      const hSimple = highlightText(item.simpleMeaning, currentSearchQuery);
      const hDef = highlightText(item.definition, currentSearchQuery);
      const hEx = highlightText(item.example, currentSearchQuery);
      const hCat = highlightText(item.category, currentSearchQuery);

      html += `
        <article class="dict-term-card">
          <div class="dict-term-header">
            <h3 class="dict-term-title">${hTerm}</h3>
            <span class="dict-cat-badge">${hCat}</span>
          </div>

          <p class="dict-simple-meaning">
            <strong>Simple Meaning:</strong> ${hSimple}
          </p>

          <p class="dict-definition">
            <strong>Definition:</strong> ${hDef}
          </p>

          <div class="dict-example-box">
            <strong>Real Example:</strong> ${hEx}
          </div>
        </article>
      `;
    });

    listContainer.innerHTML = html;
  }

  // 6. GLOBAL CONTROLLER FUNCTIONS (Attached to window)
  window.openScientificDictionary = function(searchKeyword) {
    injectStyles();
    buildDictionaryDOM();

    const drawer = document.getElementById('dict-side-drawer');
    const backdrop = document.getElementById('dict-drawer-backdrop');

    if (searchKeyword && typeof searchKeyword === 'string') {
      currentSearchQuery = searchKeyword.trim();
      const input = document.getElementById('dict-search-input');
      const clear = document.getElementById('dict-search-clear');
      if (input) input.value = currentSearchQuery;
      if (clear) clear.style.display = currentSearchQuery.length > 0 ? 'block' : 'none';
      renderTermsList();
    }

    if (drawer) drawer.classList.add('open');
    if (backdrop) backdrop.classList.add('open');

    // Focus search input
    setTimeout(() => {
      const input = document.getElementById('dict-search-input');
      if (input) input.focus();
    }, 150);
  };

  window.closeScientificDictionary = function() {
    const drawer = document.getElementById('dict-side-drawer');
    const backdrop = document.getElementById('dict-drawer-backdrop');
    if (drawer) drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
  };

  window.toggleScientificDictionary = function() {
    const drawer = document.getElementById('dict-side-drawer');
    if (drawer && drawer.classList.contains('open')) {
      window.closeScientificDictionary();
    } else {
      window.openScientificDictionary();
    }
  };

  window.resetScientificDictionaryFilters = function() {
    currentFilterLetter = 'ALL';
    currentSearchQuery = '';
    const input = document.getElementById('dict-search-input');
    const clear = document.getElementById('dict-search-clear');
    if (input) input.value = '';
    if (clear) clear.style.display = 'none';

    const azBar = document.getElementById('dict-az-bar');
    if (azBar) {
      azBar.querySelectorAll('.dict-az-btn').forEach(b => {
        b.classList.toggle('active', b.textContent === 'ALL');
      });
    }

    renderTermsList();
  };

  // Export database reference if needed
  window.SCIENTIFIC_DICTIONARY_DATABASE = DICTIONARY_DATABASE;

  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      injectStyles();
      buildDictionaryDOM();
    });
  } else {
    injectStyles();
    buildDictionaryDOM();
  }
})();
