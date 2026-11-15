/**
 * =============================================================================
 * BNR EARTHSCOPE TREND DETECTIVE - AI CLIMATE CO-PILOT (POWERED BY GEMINI)
 * =============================================================================
 * Biosphere Mint & Pearl Theme with Scalable Purple Robot Vector Icon.
 *
 * Capabilities:
 * 1. Queries state climate data (Uttarakhand, Rajasthan, UP, Kerala, Vidarbha, etc.)
 * 2. 1-Click direct navigation to live forensic maps and trend graphs.
 * 3. Compares dual-zone regions (e.g., Rajasthan vs Kerala) on Dual Dashboard.
 * 4. Explains past (1995-2025), present, and future (2030-2050) SSP climate projections.
 * 5. Integrates complete 68-term scientific dictionary (NDVI, Wet-Bulb, Sen's Slope).
 * 6. Session memory: Persists across internal page shifts; resets on reload (F5) or shutdown.
 * 7. Clean simple greeting: "Hello! How can I help you today?"
 * 8. Responds in English by default; switches to Roman Hinglish when explicitly requested.
 * =============================================================================
 */

(function() {
  'use strict';

  // 1. CONFIGURATION & CONSTANTS
  const GEMINI_API_KEY = window.GEMINI_API_KEY || (function() {
    try {
      return atob("QVEuQWI4Uk42THJZaEtEeHZ2RlpKU2VGRUNpQWEwWW1BWV9lcGdxVmZmMU1Sel9weXNrTnc=");
    } catch(e) { return ""; }
  })();
  const PRIMARY_MODEL = "gemini-1.5-flash";
  const FALLBACK_MODEL = "gemini-2.0-flash";
  const SESSION_KEY = "bnr_trend_detective_chat_v8";

  // Vector Robot Icon (Crisp, Retina-ready, Never broken or missing)
  const ROBOT_ICON_SVG = `<svg viewBox="0 0 100 86" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="display:block;">
    <rect width="100" height="86" rx="16" fill="#0c1222"/>
    <rect x="44" y="6" width="12" height="12" rx="6" fill="#a78bfa"/>
    <rect x="12" y="16" width="76" height="58" rx="24" stroke="#a78bfa" stroke-width="11" fill="none"/>
    <rect x="22" y="26" width="56" height="38" rx="14" fill="#0c1222"/>
    <circle cx="38" cy="45" r="7.5" fill="#a78bfa"/>
    <circle cx="62" cy="45" r="7.5" fill="#a78bfa"/>
  </svg>`;

  // 2. SESSION LIFECYCLE: Reset on Page Reload (F5) or Browser Shutdown
  (function initSessionLifecycle() {
    try {
      const navEntries = performance.getEntriesByType && performance.getEntriesByType('navigation');
      if (navEntries && navEntries.length > 0) {
        if (navEntries[0].type === 'reload') {
          sessionStorage.removeItem(SESSION_KEY);
          return;
        }
      }
      if (performance.navigation && performance.navigation.type === 1) {
        sessionStorage.removeItem(SESSION_KEY);
      }
    } catch (err) {
      console.warn('[TrendDetectiveAI] Session check error:', err);
    }
  })();

  // 3. CENTRALIZED SCIENTIFIC GLOSSARY (Incorporated into AI Knowledge Base)


  const RAW_DICTIONARY_DATA = [
    {
      term: "30-Year Climatological Baseline (IMD Normal)",
      category: "Statistical Analysis & Anomalies",
      aliases: ["30-year climatological baseline (imd normal)", "30-year climatological baseline", "imd normal", "30 year climatological baseline (imd normal)", "baseline", "climatological baseline", "normal baseline", "30 year baseline", "historical baseline"],
      simpleMeaning: "A 30-year average benchmark used by meteorologists to judge whether today's weather is normal or abnormal.",
      simpleMeaningHi: "Mausam vibhag ka 30 saal ka average benchmark jisse check karte hain ki aaj ka mausam aam hai ya abnormal.",
      definition: "The World Meteorological Organization (WMO) and India Meteorological Department (IMD) standard 30-year reference window (1991\u20132020) representing long-term average conditions for temperature, precipitation, and soil moisture against which true climate shifts are evaluated.",
      example: "Comparing North India's 2024 monsoon rainfall against the 1991\u20132020 IMD normal (840 mm) reveals a -28 mm per decade structural deficit rather than a 1-year blip."
    },
    {
      term: "Agro-Climatic Zone",
      category: "Maps & Geographical Analysis",
      aliases: ["agro-climatic zone", "agro climatic zone", "agro climatic", "agro-climatic", "farming zone", "crop zone"],
      simpleMeaning: "A geographical region sharing similar climate, rainfall, soil type, and farming conditions.",
      simpleMeaningHi: "Ek jaisa mausam, baarish aur mitti wala kheti ka ilaaqa jahan ek jaisi faslein ugana sabse behtar hota hai.",
      definition: "A land unit defined by major climate characteristics (temperature, precipitation, length of growing period) and physiographic terrain suitable for specific crops and farming practices. India is divided into 15 national agro-climatic regions.",
      example: "The Indo-Gangetic Plains agro-climatic zone supports double-cropping of rice and wheat, but faces high vulnerability to shifting monsoon onset dates."
    },
    {
      term: "Anomaly (Climate Anomaly)",
      category: "Statistical Analysis & Anomalies",
      aliases: ["anomaly (climate anomaly)", "anomaly", "climate anomaly", "temperature anomaly", "rainfall anomaly"],
      simpleMeaning: "The mathematical difference between observed weather today and the historical 30-year average.",
      simpleMeaningHi: "Normal 30-saal ke average se kitna alag mausam raha (jaise +1.5\u00b0C zyada garmi ya -20% kam baarish).",
      definition: "A deviation of an atmospheric or oceanic variable (such as temperature, precipitation, or soil moisture) from its long-term climatological reference baseline. Positive anomalies denote above-average conditions; negative anomalies denote below-average conditions.",
      example: "A +3.2\u00b0C surface temperature anomaly over western Rajasthan indicates that ground skin temperatures were 3.2\u00b0C hotter than the historical seasonal average."
    },
    {
      term: "Benjamini-Hochberg False Discovery Rate (FDR)",
      category: "Statistical Analysis & Anomalies",
      aliases: ["benjamini-hochberg false discovery rate (fdr)", "benjamini-hochberg false discovery rate", "fdr", "benjamini hochberg false discovery rate (fdr)", "benjamini hochberg", "false discovery rate"],
      simpleMeaning: "A mathematical filter that prevents scientists from mistaking pure random coincidence for a real climate trend when testing thousands of map locations.",
      simpleMeaningHi: "Maths ka test jo yeh pakadta hai ki statistical graph mein dikhne wala trend sacha hai ya koi coincidence.",
      definition: "A rigorous statistical procedure that controls the expected proportion of false positive discoveries among rejected null hypotheses when conducting simultaneous multiple hypothesis testing across 10-km satellite grid cells.",
      example: "When analyzing 31 years across 3,200 grid cells over India, FDR filtering ensures that reported rainfall declines are mathematically authentic climate trends and not random sampling artifacts."
    },
    {
      term: "Blue Marble",
      category: "Satellites & NASA Datasets",
      aliases: ["blue marble", "nasa blue marble"],
      simpleMeaning: "NASA's photorealistic composite imagery showing Earth as seen from space without cloud obscurity.",
      simpleMeaningHi: "NASA ka satellite view jo antariksh (space) se hamari prithvi ko neele samundar aur safed badalon ke sath dikhata hai.",
      definition: "A high-resolution, seamless global satellite mosaic developed by NASA Goddard Space Flight Center, combining multispectral imagery from Terra MODIS to depict accurate land cover, oceans, topography, and seasonal snow cover.",
      example: "The rotating 3D globe in the background uses high-resolution NASA Blue Marble Next Generation surface textures with bathymetric ocean depth relief."
    },
    {
      term: "Canopy Desiccation",
      category: "Vegetation & NDVI",
      aliases: ["canopy desiccation", "crop drying", "forest drying", "tree drying", "desiccation"],
      simpleMeaning: "Severe drying and wilting of plant leaves caused by extreme atmospheric heat and lack of root moisture.",
      simpleMeaningHi: "Lambi garmi aur dhoop ki wajah se pedon aur jungle ki hari pattiyon ka sookh kar jhulas jana.",
      definition: "The loss of internal cellular moisture from plant leaf foliage when atmospheric evaporative thirst exceeds root water uptake, leading to stomatal closure, chlorophyll breakdown, and premature crop senescence.",
      example: "In Vidarbha, Maharashtra, intense pre-monsoon heatwaves combined with dry soil caused severe soybean canopy desiccation within 10 days."
    },
    {
      term: "Clausius-Clapeyron Relation",
      category: "Extreme Heat & Temperature",
      aliases: ["clausius-clapeyron relation", "clausius clapeyron relation", "clausius", "clausius clapeyron", "clausius-clapeyron"],
      simpleMeaning: "The fundamental law of physics dictating that warmer air holds more moisture (~7% more per 1\u00b0C of warming).",
      simpleMeaningHi: "Physics ka niyam: har 1\u00b0C garmi badhne par hawa 7% zyada paani rok sakti hai, jisse achanak baadh aati hai.",
      definition: "A thermodynamic equation establishing that the saturation vapor pressure of the atmosphere increases exponentially at approximately 7% per degree Celsius of warming, enabling the atmosphere to store immense moisture before releasing it in violent bursts.",
      example: "With global temperatures up ~1.2\u00b0C, the Indian monsoon atmosphere holds ~8.5% more moisture, converting gentle week-long rains into destructive 2-hour cloudbursts."
    },
    {
      term: "Cloudburst",
      category: "Rainfall & Precipitation",
      aliases: ["cloudburst", "cloud burst", "mountain deluge", "baadal fatna"],
      simpleMeaning: "An extremely intense, violent downpour dumping massive volumes of rain in a very short period over a small area.",
      simpleMeaningHi: "Pahadon mein thode se ilaqe par ek ghante mein 100 mm se zyada tez baarish ka achanak toot padna.",
      definition: "Meteorologically defined by the IMD as rainfall exceeding 100 mm (4 inches) per hour over a localized geographical area (typically ~20 to 30 km\u00b2), commonly triggered by rapid convective updrafts and orographic trapping in mountainous terrains.",
      example: "The July 2023 cloudburst in Himachal Pradesh dumped over 150 mm of rain in under two hours, triggering catastrophic flash floods and landslides along the Beas river basin."
    },
    {
      term: "CMR (Common Metadata Repository)",
      category: "Satellites & NASA Datasets",
      aliases: ["cmr (common metadata repository)", "cmr", "common metadata repository", "nasa cmr"],
      simpleMeaning: "NASA's high-speed catalog system used to search and download Earth satellite datasets.",
      simpleMeaningHi: "NASA ka main search engine jahan se poori duniya ke satellite files aur live records download hote hain.",
      definition: "A high-performance, Earth science metadata catalog maintained by NASA's Earth Science Data and Information System (ESDIS) that indexes billions of satellite granules from missions like GPM, MODIS, and SMAP for global researchers.",
      example: "The dashboard connects to the NASA CMR API endpoint to verify Level-3 gridded daily precipitation arrays for India."
    },
    {
      term: "Compound Climate Extreme",
      category: "Climate & Environmental Stress",
      aliases: ["compound climate extreme", "compound extreme", "compound risk", "compound disaster"],
      simpleMeaning: "When two or more dangerous weather disasters happen at the exact same time and multiply each other's damage.",
      simpleMeaningHi: "Ek hi sath do ya zyada musibaton ka tootna\u2014jaise 45\u00b0C garmi ke sath zameen ka paani bilkul sookh jana.",
      definition: "The simultaneous or sequential occurrence of multiple climate drivers and hazards (e.g., severe heatwave combined with acute root-zone drought), producing impacts far more devastating than either hazard occurring in isolation.",
      example: "In May 2024, western India experienced 48\u00b0C air temperatures coinciding with a -12% root-zone soil moisture deficit, overwhelming municipal electrical grids and destroying standing crops."
    },
    {
      term: "Convective Precipitation",
      category: "Rainfall & Precipitation",
      aliases: ["convective precipitation", "convective rain", "thunderstorm rain"],
      simpleMeaning: "Heavy rain caused when hot surface air rapidly rises, cools, and forms violent storm clouds.",
      simpleMeaningHi: "Garmiyon ki dopahar mein zameen garam hone se hawa upar uthkar achanak garaj ke sath tez baarish karna.",
      definition: "Rainfall generated by localized vertical atmospheric instability, where intense surface heating forces warm, moist air to rise rapidly, condense into deep cumulonimbus towers, and discharge localized high-intensity deluge.",
      example: "Pre-monsoon afternoon thundershowers (Kalbaishakhi) over eastern India are classic convective precipitation events triggered by intense solar ground heating."
    },
    {
      term: "Coordinate Reference System (CRS)",
      category: "Maps & Geographical Analysis",
      aliases: ["coordinate reference system (crs)", "coordinate reference system", "crs", "epsg", "coordinate system"],
      simpleMeaning: "The standardized geographic coordinate system (latitude/longitude) used to place map points accurately on Earth.",
      simpleMeaningHi: "Earth ke kisi bhi shehar ya khet ka exact GPS latitude aur longitude batane wala system.",
      definition: "A coordinate-based local, regional, or global system used to locate geographical entities on Earth's surface (e.g., WGS 84 / EPSG:4326), ensuring satellite swath data aligns perfectly with political and river basin boundaries.",
      example: "All NASA satellite rasters and Leaflet vector boundaries in this tool are reprojected into WGS 84 (EPSG:4326) coordinate space."
    },
    {
      term: "Decadal Trend Rate",
      category: "Statistical Analysis & Anomalies",
      aliases: ["decadal trend rate", "decadal trend", "decadal rate", "decade trend"],
      simpleMeaning: "The measured speed and direction of climate change calculated per 10-year period.",
      simpleMeaningHi: "10 saal ke dauran kisi jagah ki garmi ya baarish mein kul kitna permanent badlaav aaya.",
      definition: "The physical rate of monotonic change in an environmental parameter over a ten-year span, calculated using Sen's slope estimator across multi-decadal time-series data.",
      example: "The tool identifies a decadal rainfall trend rate of -28 mm/decade across North India, proving a persistent multi-decadal drying trajectory."
    },
    {
      term: "Diurnal Temperature Range (DTR)",
      category: "Extreme Heat & Temperature",
      aliases: ["diurnal temperature range (dtr)", "diurnal temperature range", "dtr", "diurnal range", "day night temperature", "diurnal temperature"],
      simpleMeaning: "The difference between the highest daytime temperature and the coolest nighttime temperature on the same day.",
      simpleMeaningHi: "Din ki tez garmi aur raat ki thandak ke beech ka fasla. Iska kam hona raat ke garam hone ka sanket hai.",
      definition: "The numerical difference between the daily maximum temperature (Tmax) and daily minimum temperature (Tmin) at a specific geographical location.",
      example: "In the Thar Desert, dry air creates a wide DTR (>18\u00b0C between blistering 46\u00b0C afternoons and 28\u00b0C nights), whereas humid coastal Mumbai exhibits a narrow DTR (<6\u00b0C)."
    },
    {
      term: "Dry Spell Interval",
      category: "Rainfall & Precipitation",
      aliases: ["dry spell interval", "dry spell", "dry break", "dry days", "dry interval"],
      simpleMeaning: "The number of consecutive rainless days occurring during the active monsoon crop-growing season.",
      simpleMeaningHi: "Monsoon ke mausam mein do baarishon ke beech aane wala 10\u201320 din ka sookha break.",
      definition: "A sequence of consecutive days during the official southwest monsoon period (June\u2013September) receiving less than 2.5 mm of rain per day, causing agricultural soil moisture stress between convective downpours.",
      example: "In Punjab and Haryana, the average dry spell duration between monsoonal rain events has expanded from 8 days in 1995 to 19 days in recent years."
    },
    {
      term: "Evapotranspiration (ET)",
      category: "Climate & Environmental Stress",
      aliases: ["evapotranspiration (et)", "evapotranspiration", "et", "evaporative cooling", "plant sweating"],
      simpleMeaning: "The combined amount of water evaporating from the ground and transpiring through plant leaves into the air.",
      simpleMeaningHi: "Mitti aur fasalon se paani ka bhaap ban kar aasmaan mein udna. Yeh prithvi ka natural cooling system hai.",
      definition: "The total flux of water transfer from the Earth's surface to the atmosphere, combining direct evaporation from soil and open water bodies with transpiration through plant vegetative stomata.",
      example: "High summer temperatures accelerate evapotranspiration in central India, depleting surface reservoir levels by up to 1.5 cm per day."
    },
    {
      term: "Flash Drought",
      category: "Climate & Environmental Stress",
      aliases: ["flash drought", "rapid drought", "sudden drought"],
      simpleMeaning: "A drought that develops unusually quickly\u2014in just 1 to 3 weeks\u2014due to sudden extreme heat and dry winds.",
      simpleMeaningHi: "Achanak 10\u201315 din mein aane wala sookha jab tez dhoop mitti ki jado'n ka sara paani sookh leti hai.",
      definition: "An unusually rapid onset of drought conditions driven by high atmospheric evaporative demand (extreme heat, low humidity, strong winds) coupled with precipitation deficits, stripping soil moisture in days rather than months.",
      example: "In July 2021, an abrupt 3-week monsoon hiatus paired with 40\u00b0C heat triggered a flash drought across Vidarbha, desiccating cotton crops before farmers could deploy supplemental irrigation."
    },
    {
      term: "GeoJSON Polygon",
      category: "Maps & Geographical Analysis",
      aliases: ["geojson polygon", "geojson", "polygon", "spatial boundary"],
      simpleMeaning: "A digital map file format that outlines the precise borders of states, regions, and districts.",
      simpleMeaningHi: "Computer map par kisi rajya, zile ya khet ki boundary line khinchne ka digital format.",
      definition: "An open standard geospatial data interchange format based on JSON that encodes geographic boundaries, multipolygon geometries, and administrative regional properties for interactive web maps.",
      example: "The dashboard renders 6 agro-climatic boundaries using GeoJSON coordinate rings that filter NASA satellite pixels inside India's borders."
    },
    {
      term: "GPM (Global Precipitation Measurement)",
      category: "Satellites & NASA Datasets",
      aliases: ["gpm (global precipitation measurement)", "gpm", "global precipitation measurement", "gpm satellite", "gpm radar"],
      simpleMeaning: "NASA and JAXA's international satellite constellation that tracks rain, snow, and cloudbursts worldwide every 30 minutes.",
      simpleMeaningHi: "NASA ka global satellite constellation jo poori prithvi par hone wali baarish aur baraf napta hai.",
      definition: "An international satellite mission initiated by NASA and the Japan Aerospace Exploration Agency (JAXA) carrying the Dual-frequency Precipitation Radar (DPR) and GPM Microwave Imager (GMI) to map global precipitation at 0.1\u00b0 resolution.",
      example: "GPM IMERG satellite data captured the intense 2024 Wayanad, Kerala deluge, recording over 300 mm of rainfall in 24 hours along the Western Ghats ridgeline."
    },
    {
      term: "IMERG (Integrated Multi-satellitE Retrievals for GPM)",
      category: "Satellites & NASA Datasets",
      aliases: ["imerg (integrated multi-satellite retrievals for gpm)", "imerg", "integrated multi-satellite retrievals for gpm", "imerg (integrated multi satellite retrievals for gpm)", "gpm imerg", "imerg rainfall", "precipitation radar"],
      simpleMeaning: "NASA's algorithm that merges data from multiple radar and microwave satellites into one continuous global rain map.",
      simpleMeaningHi: "NASA ka global rainfall radar network jo har 30 minute mein tez baarish aur cloudburst ka data deta hai.",
      definition: "NASA's flagship multi-satellite precipitation algorithm that combines passive microwave satellite observations, radar data, and infrared geostationary sensors with monthly surface rain gauges to produce seamless 0.1\u00b0 gridded rain estimates.",
      example: "The tool leverages GPM IMERG Final Run (V07B) data spanning 1995\u20132025 to track 31 years of localized precipitation trends across all Indian states."
    },
    {
      term: "Indo-Gangetic Basin",
      category: "Maps & Geographical Analysis",
      aliases: ["indo-gangetic basin", "indo gangetic basin", "indo gangetic", "indo-gangetic", "gangetic plains"],
      simpleMeaning: "The vast, fertile northern plains of India formed by the Indus and Ganga rivers, home to 400+ million people.",
      simpleMeaningHi: "North India ka bada maidaan (Punjab se Bengal tak) jahan gehu aur chawal ki sabse zyada kheti hoti hai.",
      definition: "A vast sedimentary foreland basin stretching across northern and eastern India (encompassing Punjab, Haryana, Uttar Pradesh, Bihar, and West Bengal), forming the primary agricultural breadbasket of South Asia.",
      example: "The Indo-Gangetic Basin produces over 50% of India's national wheat and rice, making its -28 mm/decade monsoon drying trend a high food security concern."
    },
    {
      term: "Land Surface Temperature (LST)",
      category: "Extreme Heat & Temperature",
      aliases: ["land surface temperature (lst)", "land surface temperature", "lst", "surface temperature", "ground temperature", "skin temperature"],
      simpleMeaning: "The actual direct temperature of the ground surface when touched, which is much hotter than the air temperature reported on TV.",
      simpleMeaningHi: "Zameen ki satah ka tapmaan jo sadak ya sookhe khet par hawa ke muqable 10\u00b0C\u201315\u00b0C zyada garm hota hai.",
      definition: "The radiative skin temperature of the land surface measured in the thermal infrared spectral bands (10.5\u201312.5 \u00b5m) by satellite sensors like MODIS, capturing the exact heat of bare soil, road asphalt, and vegetation canopies.",
      example: "While air thermometers in Jaipur reported 44\u00b0C during a June heatwave, MODIS satellite sensors detected a blistering Land Surface Temperature (LST) of 53.6\u00b0C on paved surfaces."
    },
    {
      term: "Mann-Kendall Trend Test",
      category: "Statistical Analysis & Anomalies",
      aliases: ["mann-kendall trend test", "mann kendall trend test", "mann kendall", "mann-kendall", "mk test", "kendall test", "monotonic trend"],
      simpleMeaning: "A gold-standard mathematical test that proves whether climate changes are real permanent shifts or just temporary weather luck.",
      simpleMeaningHi: "NASA dwara use kiya jane wala maths test jo batata hai ki pichhle 31 saal mein data lagatar badh ya ghat raha hai.",
      definition: "A non-parametric statistical rank test widely endorsed by the IPCC and WMO that assesses whether a time-series variable possesses a monotonic upward or downward trend over time without requiring normally distributed data.",
      example: "Applying the Mann-Kendall test to 31 years of Rajasthan thermal data yielded a Z-score of +4.21 (p < 0.0001), confirming with 99.99% mathematical confidence that summer heat is permanently increasing."
    },
    {
      term: "MODIS (Moderate Resolution Imaging Spectroradiometer)",
      category: "Satellites & NASA Datasets",
      aliases: ["modis (moderate resolution imaging spectroradiometer)", "modis", "moderate resolution imaging spectroradiometer", "modis satellite", "terra aqua", "terra modis", "aqua modis"],
      simpleMeaning: "Key NASA satellite instruments aboard Terra and Aqua satellites that scan Earth daily for heat, vegetation, and fires.",
      simpleMeaningHi: "NASA ke Terra aur Aqua satellites jo rozana zameen ka tapmaan aur jungle ki aag ko scan karte hain.",
      definition: "A 36-band multispectral instrument operating on NASA's Terra and Aqua spacecraft, providing continuous global observations of Earth's land surface temperature, vegetation indices (NDVI/EVI), aerosol optical depth, and wildfire hotspots.",
      example: "MODIS Terra daytime thermal data (MOD11A2) tracks the expansion of extreme thermal domes across northwest India over the past 3 decades."
    },
    {
      term: "Monsoonal Dipole",
      category: "Rainfall & Precipitation",
      aliases: ["monsoonal dipole", "dipole", "monsoon dipole", "climate dipole"],
      simpleMeaning: "A climate pattern where one part of India experiences heavy flooding while an adjacent region suffers drought.",
      simpleMeaningHi: "Jab ek hi monsoon mein do rajyon par ulta asar pade\u2014ek taraf baadh aaye aur doosri taraf sookha reh jaye.",
      definition: "An opposing regional rainfall pattern across the Indian subcontinent where large-scale circulation shifts channel excess moisture into one geographical zone (e.g., Western Ghats) while simultaneously starving another (e.g., Indo-Gangetic Plains).",
      example: "The 2024 monsoon produced severe deluges in Kerala and Gujarat while parts of eastern UP and Bihar experienced a -18% seasonal rainfall deficit."
    },
    {
      term: "Monotonic Trend",
      category: "Statistical Analysis & Anomalies",
      aliases: ["monotonic trend", "monotonic", "steady trend"],
      simpleMeaning: "A trend that consistently moves in one direction over time (either continually increasing or continually decreasing).",
      simpleMeaningHi: "Ek hi disha mein lagatar chalne wala badlaav (lagatar badhna ya lagatar ghatna) bina achanak ulat-phulat ke.",
      definition: "A mathematical sequence where successive values consistently increase or stay the same (monotonic increasing) or consistently decrease or stay the same (monotonic decreasing), without reversing direction over the multi-decadal timeline.",
      example: "31-year soil moisture readings in Vidarbha exhibit a monotonic downward trend, indicating continuous drying rather than cyclical oscillation."
    },
    {
      term: "NDVI (Normalized Difference Vegetation Index)",
      category: "Vegetation & NDVI",
      aliases: ["ndvi (normalized difference vegetation index)", "ndvi", "normalized difference vegetation index", "vegetation index", "greenness", "crop greenness", "plant greenness"],
      simpleMeaning: "A satellite number from 0 to 1 measuring plant health and greenness (higher = greener and healthier crops).",
      simpleMeaningHi: "Satellite se fasalon aur jungle ki hariyali napne ka formula. Swasth fasal ka score zyada hota hai.",
      definition: "A remote sensing index that evaluates photosynthetic activity and canopy greenness by calculating the normalized ratio of reflected near-infrared (NIR) and red light: NDVI = (NIR - Red) / (NIR + Red). Healthy plants absorb red light and reflect NIR.",
      example: "During the August dry spell, crop NDVI dropped from 0.72 (dense green canopy) down to 0.41 (severe water stress) across central Maharashtra farmlands."
    },
    {
      term: "NetCDF (Network Common Data Form)",
      category: "Satellites & NASA Datasets",
      aliases: ["netcdf (network common data form)", "netcdf", "network common data form", "nc4", "netcdf4"],
      simpleMeaning: "The standard scientific file format used by NASA, NOAA, and climate scientists to store multi-dimensional satellite data.",
      simpleMeaningHi: "NASA ka scientific file format jo gigabytes ke satellite records ko compress karke store karta hai.",
      definition: "A self-describing, machine-independent scientific array data format (NetCDF-4/HDF5) widely used in atmospheric and Earth science to store multidimensional spatial grids (latitude, longitude, time, elevation).",
      example: "The raw climate telemetry used in this project originates from NASA GES DISC NetCDF-4 daily precipitation and soil moisture raster files."
    },
    {
      term: "Orographic Lifting",
      category: "Rainfall & Precipitation",
      aliases: ["orographic lifting", "orographic rain", "mountain lifting"],
      simpleMeaning: "When mountain ranges force moist ocean winds to rise upward, causing clouds to dump massive rainfall on one side.",
      simpleMeaningHi: "Baadlon ka pahad se takra kar unchai par chadna aur thande hokar pahad ke ek hi taraf bhyankar baarish girana.",
      definition: "The forced vertical ascent of warm, moist air parcels when encountering topographical barriers like mountains, causing adiabatic cooling, condensation, and intense precipitation on the windward mountain face.",
      example: "Southwest monsoon winds hitting the 2,000-meter peaks of the Western Ghats undergo intense orographic lifting, dumping over 3,000 mm of annual rain on the coastal escarpment."
    },
    {
      term: "Phenology Shift",
      category: "Vegetation & NDVI",
      aliases: ["phenology shift", "phenology", "flowering shift"],
      simpleMeaning: "Changes in the seasonal timing of when crops and trees sprout, flower, ripen, or harvest due to shifting weather.",
      simpleMeaningHi: "Mausam garam hone ke karan pedon par phool ya fasal ka normal time se hafton pehle khil jana.",
      definition: "Changes in the periodic biological life-cycle events of plants and vegetation driven by variations in climate cues, such as earlier flowering, delayed sowing dates, or altered vegetative maturation windows.",
      example: "Indian farmers in western UP have shifted wheat sowing by 12\u201315 days later in the calendar to prevent early grain development from being scorched by March terminal heatwaves."
    },
    {
      term: "p-value (Statistical Significance)",
      category: "Statistical Analysis & Anomalies",
      aliases: ["p-value (statistical significance)", "p-value", "statistical significance", "p value (statistical significance)", "p value", "pvalue", "p < 0.05", "p<0.05", "significance", "confidence test", "noise vs trend"],
      simpleMeaning: "The mathematical probability that a trend happened by dumb luck; if p < 0.05, scientists consider the climate trend genuinely proven.",
      simpleMeaningHi: "Maths ka proof jo batata hai ki badlaav sacha permanent climate trend hai (p < 0.05) ya sirf temporary mausam ka shor.",
      definition: "The probability of obtaining test results at least as extreme as the observed results under the null hypothesis (that no real climate trend exists). A p-value < 0.05 indicates >95% statistical confidence that the observed trend is authentic.",
      example: "A calculated p = 0.008 for North India's rainfall decrease gives scientists >99% certainty that the monsoon shift is a real physical change, not random annual weather noise."
    },
    {
      term: "Rain-Shadow Effect",
      category: "Maps & Geographical Analysis",
      aliases: ["rain-shadow effect", "rain shadow effect", "rain shadow", "rain-shadow", "dry lee side"],
      simpleMeaning: "A dry region on the leeward (sheltered) side of a mountain range that gets very little rain because clouds already dumped their moisture.",
      simpleMeaningHi: "Pahad ki doosri taraf ka ilaaqa jahan baadal pahunch hi nahi paate aur wahan hamesha sookha rehta hai.",
      definition: "A dry geographical area situated on the leeward side of an elevated mountain range, where descending air warms adiabatically and absorbs moisture, suppressing cloud formation and producing semi-arid conditions.",
      example: "The Deccan Plateau and Marathwada sit directly in the rain shadow of the Western Ghats, receiving only a fraction of the heavy rainfall dumped on coastal Mumbai."
    },
    {
      term: "Root-Zone Soil Moisture (RZSM)",
      category: "Climate & Environmental Stress",
      aliases: ["root-zone soil moisture (rzsm)", "root-zone soil moisture", "rzsm", "root zone soil moisture (rzsm)", "root zone soil moisture", "root zone", "soil moisture", "topsoil moisture"],
      simpleMeaning: "The moisture trapped between 0 and 100 cm underground where crop roots actually absorb water and nutrients.",
      simpleMeaningHi: "Mitti mein 1 meter gehraai tak jado'n ka paani jo fasal ko sookhe se bacha kar rakhta hai.",
      definition: "The volumetric fraction of water stored in the sub-surface soil column (typically 0\u2013100 cm depth) accessible to agricultural plant root systems, measured in m\u00b3/m\u00b3 or percentage saturation by NASA SMAP radiometers.",
      example: "NASA SMAP radar indicates a -9% decadal drop in root-zone soil moisture across Madhya Pradesh, indicating agricultural root dehydration even during normal surface humidity."
    },
    {
      term: "Sen's Slope Estimator",
      category: "Statistical Analysis & Anomalies",
      aliases: ["sen's slope estimator", "sen's slope", "sens slope", "sen slope", "theil-sen", "theil sen", "theilsen", "median slope", "theil sen slope", "slope"],
      simpleMeaning: "A reliable mathematical calculation of how fast climate is changing each year, unaffected by single extreme disaster years.",
      simpleMeaningHi: "31 saal ke data mein sachi median trend line banana jo kisi ek saal ke ajeeb data se dhokha nahi khati.",
      definition: "A non-parametric median-based estimator developed by Pranab Kumar Sen that calculates the true slope (rate of change per unit time) of a linear trend, highly robust against statistical outliers and non-normal climate distributions.",
      example: "Using Sen's slope across 1995\u20132025 records reveals that extreme heat days in Rajasthan are rising at an exact rate of +5.0 days per decade."
    },
    {
      term: "SMAP (Soil Moisture Active Passive)",
      category: "Satellites & NASA Datasets",
      aliases: ["smap (soil moisture active passive)", "smap", "soil moisture active passive", "smap radar", "smap satellite"],
      simpleMeaning: "NASA's dedicated radar satellite that measures moisture in the top soil and root-zone from space every 2 to 3 days.",
      simpleMeaningHi: "NASA ka radar satellite jo mitti ke andar jado'n tak ka paani napta hai aur fasal sookhne se pehle alert karta hai.",
      definition: "A NASA Earth observation satellite mission equipped with an L-band microwave radiometer operating at 1.4 GHz, designed to measure surface (top 5 cm) and root-zone (0\u2013100 cm) soil moisture and freeze/thaw states globally.",
      example: "SMAP L4 daily root-zone soil moisture models track flash drought propagation across agricultural districts in Punjab and Vidarbha."
    },
    {
      term: "Spatial Resolution (0.1\u00b0 Grid)",
      category: "Maps & Geographical Analysis",
      aliases: ["spatial resolution (0.1\u00b0 grid)", "spatial resolution", "0.1\u00b0 grid", "0.1 grid", "pixel resolution", "grid resolution"],
      simpleMeaning: "The pixel size of a satellite map; a 0.1\u00b0 grid divides India into neat ~10 km by 10 km square observation boxes.",
      simpleMeaningHi: "Satellite map ki safaai (10 km x 10 km grid), jisse har kasbe aur zile ka alag data milta hai.",
      definition: "The minimum distance between two adjacent measurement samples in a raster grid. In Earth science, a 0.1\u00b0 x 0.1\u00b0 grid cell corresponds to approximately 10 km x 10 km at tropical and sub-tropical latitudes over India.",
      example: "NASA GPM and IMD data are mapped onto a uniform 0.1\u00b0 mesh across India, enabling pinpoint municipal and watershed-level trend tracking."
    },
    {
      term: "Thermal Skin Dome",
      category: "Extreme Heat & Temperature",
      aliases: ["thermal skin dome", "thermal skin", "skin dome", "heat dome"],
      simpleMeaning: "A huge mass of trapped, blistering hot air pushing down on the ground, creating extreme surface temperatures.",
      simpleMeaningHi: "Badi garmi ke dauran zameen ke upar banne wala garma-garm hawa ka gumbad jo garmi ko bahar nahi jane deta.",
      definition: "A semi-stationary synoptic high-pressure meteorological system that traps hot continental air beneath an atmospheric ridge, preventing cloud formation and compressing air downwards to superheat the immediate ground surface.",
      example: "A massive thermal skin dome over northwest India in May 2024 forced ground skin temperatures in Phalodi, Rajasthan past 50.5\u00b0C for 6 consecutive days."
    },
    {
      term: "Urban Heat Island (UHI)",
      category: "Extreme Heat & Temperature",
      aliases: ["urban heat island (uhi)", "urban heat island", "uhi", "heat island", "city heat"],
      simpleMeaning: "A city area that gets significantly hotter than surrounding rural villages because concrete, asphalt, and buildings trap heat.",
      simpleMeaningHi: "Sheharon mein sadkon aur buildingon ki wajah se paas ke gaon ke mukable 3\u00b0C se 7\u00b0C zyada garmi ka hona.",
      definition: "An urban or metropolitan area that is significantly warmer than its surrounding rural regions due to human activities, high thermal mass of asphalt and concrete, reduced vegetative evaporative cooling, and waste heat generation.",
      example: "During summer nights, satellite thermal scans show Delhi's urban core is up to 4.8\u00b0C hotter than surrounding agricultural villages in Haryana."
    },
    {
      term: "Vapor Pressure Deficit (VPD)",
      category: "Climate & Environmental Stress",
      aliases: ["vapor pressure deficit (vpd)", "vapor pressure deficit", "vpd", "air thirst", "atmospheric thirst"],
      simpleMeaning: "The dryness of the air; a measure of how strongly the atmosphere acts like a sponge sucking moisture out of plants and soil.",
      simpleMeaningHi: "Hawa ki pyas. Jab VPD zyada hota hai, to hawa paudhon ke andar ka sara paani nichhod leti hai.",
      definition: "The difference between the amount of moisture the air can hold when saturated and the actual amount of moisture in the air at a given temperature, representing the primary driving force behind plant transpiration and atmospheric evaporative thirst.",
      example: "When heatwaves push VPD above 3.5 kPa in central India, crops stop photosynthesizing and close their stomata to prevent dehydration, leading to heat stress even in irrigated fields."
    },
    {
      term: "Vegetation Health Index (VHI)",
      category: "Vegetation & NDVI",
      aliases: ["vegetation health index (vhi)", "vegetation health index", "vhi", "crop health index"],
      simpleMeaning: "A composite satellite health score combining temperature stress and vegetation greenness to evaluate crop drought conditions.",
      simpleMeaningHi: "Hariyali (NDVI) aur garmi (LST) ko jodkar fasal ke swasthya ka ek combined score nikalna.",
      definition: "A remote sensing index that integrates the Vegetation Condition Index (VCI) derived from NDVI with the Temperature Condition Index (TCI) derived from thermal bands to provide an early warning of agricultural drought and crop yield loss.",
      example: "VHI scores below 20 across Marathwada signaled severe agricultural drought two months before official state crop loss declarations."
    },
    {
      term: "Western Ghats Escarpment",
      category: "Maps & Geographical Analysis",
      aliases: ["western ghats escarpment", "western ghats", "ghats", "western ghats rainfall"],
      simpleMeaning: "The continuous, rugged mountain ridge running along India's southwestern coast that traps Arabian Sea monsoon clouds.",
      simpleMeaningHi: "Bharat ke pashchimi tat ke oonche pahad jo monsoon hawaon ko rok kar Kerala aur Maharashtra mein bhari baarish karate hain.",
      definition: "A continuous mountain range traversing Maharashtra, Goa, Karnataka, Kerala, and Tamil Nadu that acts as a towering meteorological barrier, generating intense orographic rainfall along the coastal strip and creating a rain-shadow plateau inland.",
      example: "The Western Ghats receive up to 5,000 mm of annual rainfall, where recent trends reveal a dangerous clustering of extreme rainfall days causing hill slope landslides."
    },
    {
      term: "Wet-Bulb Temperature (Twb)",
      category: "Extreme Heat & Temperature",
      aliases: ["wet-bulb temperature (twb)", "wet-bulb temperature", "twb", "wet bulb temperature (twb)", "wet-bulb", "wet bulb", "wet bulb temperature", "humid heat", "heat stress"],
      simpleMeaning: "The temperature combining heat and humidity that reflects human survivability; at 35\u00b0C wet-bulb, the human body can no longer cool itself by sweating.",
      simpleMeaningHi: "Garmi aur chipchipi humidity ka jod. Jab yeh 35\u00b0C paar karta hai, to insani shareer pasina chhod kar thanda nahi ho pata.",
      definition: "The lowest temperature to which air can be cooled by the evaporation of water at constant pressure, measuring the combined physiological stress of heat and humidity on living organisms. Above 35\u00b0C wet-bulb, fatal hyperthermia occurs even in shaded, ventilated conditions.",
      example: "During coastal pre-monsoon periods in Odisha and West Bengal, wet-bulb temperatures regularly exceed 31\u00b0C, placing outdoor agricultural and construction laborers at high risk of heat stroke."
    },
    {
      term: "Aerospace Mission Telemetry Ribbon",
      category: "Website Architecture & Analytical Modes",
      aliases: ["aerospace mission telemetry ribbon", "telemetry ribbon", "telemetry", "mission telemetry"],
      simpleMeaning: "The live status ticker at the very top of the screen showing current satellite status, mission UTC/IST time clocks, sensor orbital altitudes, and Indian spatial boundaries.",
      simpleMeaningHi: "Website par upar chalne wali ribbon jo NASA satellites ki live orbital position aur data speed dikhati hai.",
      definition: "A persistent telemetry banner displayed at the top of the interface showing synchronized UTC and IST mission clocks, active NASA sensor constellations (GPM 407 km, MODIS 705 km, SMAP 685 km), and geographic bounding coordinates [68.0\\u00b0E\\u201397.5\\u00b0E, 6.0\\u00b0N\\u201337.5\\u00b0N].",
      example: "The aerospace mission telemetry ribbon displays live satellite altitudes and time synchronization at the top of every dashboard view."
    },
    {
      term: "Agricultural Flash Drought",
      category: "Climate & Environmental Stress",
      aliases: ["agricultural flash drought", "flash drought", "rapid drought", "sudden drought", "crop flash drought"],
      simpleMeaning: "A sudden, aggressive dry-out of farm soil that happens in just 2 to 3 weeks due to intense heat and wind, catching farmers by surprise before normal weather forecasts can warn them.",
      simpleMeaningHi: "Kheti ke dauran achanak 15 din ke andar mitti ka sookh jana jisse fasal phelne se pehle hi murjha jati hai.",
      definition: "A rapid-onset drought characterized by steep, accelerated depletion of root-zone soil moisture (0\\u2013100 cm) driven by abnormally high temperatures, strong winds, and high vapor pressure deficit, causing crop failure within weeks rather than months.",
      example: "SMAP L-band radar tracked an agricultural flash drought across eastern Uttar Pradesh in July 2023, where root-zone soil moisture plunged from 34% to 18% in just 16 days."
    },
    {
      term: "Bar Distribution (Epochal Regime Comparison Mode)",
      category: "Statistical Analysis & Anomalies",
      aliases: ["bar distribution (epochal regime comparison mode)", "bar distribution", "epochal regime comparison mode", "bar chart", "epochal comparison"],
      simpleMeaning: "A bar chart view that color-codes each time period (green for past normal, amber for recent observed, red for future projected) to easily compare multi-year shifts.",
      simpleMeaningHi: "Teen dashakon (1995\u20132010 vs 2011\u20132025 vs 2040) ka bar chart jo mausam ka badlaav seedhe dikhata hai.",
      definition: "A discrete categorical visualization mode that groups the 31-year NASA record and 15-year projection horizon into distinct colored bars, enabling instant visual comparison of decadal shifts and multi-year anomalies against historical thresholds.",
      example: "The Bar Distribution view clearly highlights how recent years (2018\\u20132024) consistently display tall amber bars exceeding the 42\\u00b0C heat threshold compared to modest green bars during the 1990s."
    },
    {
      term: "Biosphere Mint & Pearl Theme",
      category: "Website Architecture & Analytical Modes",
      aliases: ["biosphere mint & pearl theme", "biosphere mint", "pearl theme", "mint theme", "website theme"],
      simpleMeaning: "The website's fresh, ecological daytime theme featuring crisp mint greens, pearl white backgrounds, and high-contrast text for effortless readability in bright light.",
      simpleMeaningHi: "Website ka mint green aur pearl white visual design jo prakriti aur clean science ko darshata hai.",
      definition: "The default high-contrast visual design system of the platform, utilizing deep emerald and teal tones (#044e39, #065f46), mint accents (#10b981), and pearl translucent glass surfaces (#f0fdf4, #f8fafc) engineered for optimal accessibility and executive presentations.",
      example: "The Biosphere Mint & Pearl theme delivers crisp clarity for daytime slide projections, while the Sun/Moon toggle icon allows instant switching to the Deep Cosmic Galaxy dark mode."
    },
    {
      term: "Clausius-Clapeyron Thermodynamic Feedback",
      category: "Climate & Environmental Stress",
      aliases: ["clausius-clapeyron thermodynamic feedback", "clausius clapeyron thermodynamic feedback", "thermodynamic feedback", "moisture feedback"],
      simpleMeaning: "A fundamental law of physics: every time the air warms up by 1\\u00b0C, it can hold 7% more moisture\\u2014acting like a thirsty sponge that dries the ground, only to unleash violent rainstorms later.",
      simpleMeaningHi: "Garmi badhne se hawa mein zyada nami jama hona, jisse badal fatne ka khatra aur badh jata hai.",
      definition: "A physical thermodynamic relationship governing the saturation water vapor pressure of the atmosphere as a function of temperature. For each 1\\u00b0C increase in tropospheric temperature, the air's water-holding capacity increases by approximately 7%, driving intensified surface evaporation and amplifying violent convective cloudbursts.",
      example: "In the Himalayan foothills, +1.8\\u00b0C of atmospheric warming increased atmospheric moisture capacity by ~13%, triggering devastating 120 mm/hr flash cloudburst episodes."
    },
    {
      term: "Climatological Regime Shift",
      category: "Statistical Analysis & Anomalies",
      aliases: ["climatological regime shift", "regime shift", "climate regime shift"],
      simpleMeaning: "A permanent, long-term change in a region's weather patterns\\u2014like rain permanently shifting from gentle steady showers to rare violent cloudbursts.",
      simpleMeaningHi: "Kisi ilaaqe ke mausam ka purana pattern todkar ek naye, zyada garam ya sookhe daur mein pravesh kar jana.",
      definition: "A rapid and sustained transformation of an Earth system state from one statistical baseline regime to a structurally different regime, persisting across multiple decades rather than fluctuating within seasonal boundaries.",
      example: "NASA satellite data proves a regime shift in the Indo-Gangetic monsoon after 2011, characterized by a 35% increase in dry spell duration punctuated by intense convective bursts."
    },
    {
      term: "Compound Climate Multi-Risk Index",
      category: "Climate & Environmental Stress",
      aliases: ["compound climate multi-risk index", "compound climate multi risk index", "multi-risk index", "compound risk index", "compound index"],
      simpleMeaning: "A single 0 to 100 risk score that measures the combined danger when extreme heat, sudden downpours, and dying soil hit a region at the exact same time.",
      simpleMeaningHi: "Garmi, sookhe aur tez baarish ka ek combined score jo batata hai ki koi ilaaqa kitne khatre mein hai.",
      definition: "A unified vulnerability metric that synthesizes multiple interdependent climate stressors (heatwave frequency, precipitation volatility, and subsoil moisture desiccation) into a single normalized index ranging from 0 (minimal stress) to 100 (critical compound failure).",
      example: "Central India's compound risk index spiked to 88/100 during May 2024 as 46\\u00b0C surface temperatures coincided with a 45-day rainless interval and severe subsoil desiccation."
    },
    {
      term: "Confidence Interval (95% Climatological Band)",
      category: "Statistical Analysis & Anomalies",
      aliases: ["confidence interval (95% climatological band)", "confidence interval", "95% climatological band", "95% band", "climatological band"],
      simpleMeaning: "A shaded safety band on our charts showing the range where true climate values are 95% certain to fall, helping distinguish real changes from normal variation.",
      simpleMeaningHi: "Statistical band jo batata hai ki 95% certainty ke sath sacha trend kahan chal raha hai.",
      definition: "A statistical margin of error representing the range of values within which the true population parameter is expected to lie with 95% probability. In time-series charts, the shaded confidence envelope illustrates parameter uncertainty and inter-annual volatility around the trend line.",
      example: "In the EcoTimeline 2026\\u20132040+ outlook, the 95% confidence interval shows that even in the coolest expected future scenario, temperatures remain above the historical baseline."
    },
    {
      term: "Crop Region (Adaptive Spatial Zoom)",
      category: "Website Architecture & Analytical Modes",
      aliases: ["crop region (adaptive spatial zoom)", "crop region", "adaptive spatial zoom", "spatial zoom"],
      simpleMeaning: "A button on the map that instantly zooms in and frames only your selected state or hotspot, hiding irrelevant outside areas.",
      simpleMeaningHi: "Map par kisi khas kheti wale ilaaqe ko zoom karke fasal ki zameen ka data dekhna.",
      definition: "An adaptive camera and viewport feature that automatically recalculates geographical bounding coordinates to tightly crop, center, and zoom the interactive canvas on the active district or state polygon.",
      example: "Clicking 'Crop Region' while Moradabad is selected immediately locks and zooms the thermal canvas to western Uttar Pradesh's agricultural boundary."
    },
    {
      term: "Dual-Zone Comparison Console (Compare Areas)",
      category: "Website Architecture & Analytical Modes",
      aliases: ["dual-zone comparison console (compare areas)", "dual-zone comparison console", "compare areas", "dual zone comparison console (compare areas)", "dual zone", "comparison console", "dual-zone comparison"],
      simpleMeaning: "A split-screen comparison tool that places any two Indian states or regions side-by-side to see why one suffers drought while another suffers floods.",
      simpleMeaningHi: "Do alag-alag rajyon ko aamne-saamne rakh kar unke mausam aur khatron ka mukabla karne wala tool.",
      definition: "An operational comparative dashboard mode allowing synchronous side-by-side evaluation of two distinct geographic zones on identical satellite scales, exposing regional dipoles, inverse teleconnections, and divergent ecological trajectories.",
      example: "Comparing North India (Indo-Gangetic) against Western Ghats (Kerala) in the Dual-Zone console demonstrates the national monsoon dipole: rainfall decreasing by -28 mm/decade in the north while extreme rainfall days surge by +45% in the south."
    },
    {
      term: "Earth Metrix (Navigation Slidebar)",
      category: "Website Architecture & Analytical Modes",
      aliases: ["earth metrix (navigation slidebar)", "earth metrix", "navigation slidebar", "earthmetrix"],
      simpleMeaning: "The deep teal top menu button on the website that slides down to reveal all application views: Orbit View, Forensic Dashboard, Compare Areas, EcoTimeline, and Executive Brief.",
      simpleMeaningHi: "Website ka slide-out menu drawer jahan se sabhi pages aur tools par 1-click mein ja sakte hain.",
      definition: "The primary navigation interface and persistent control anchor located at the top-left of the user interface. Styled as a rounded rectangle with deep teal branding, it expands a responsive command drawer providing single-click access across all spatial, forensic, comparative, and export features.",
      example: "Clicking the EARTH METRIX slidebar at the top left opens the full navigation bar to switch between the 3D Orbit View and the Dual-Zone Compare Areas console."
    },
    {
      term: "EcoTimeline",
      category: "Website Architecture & Analytical Modes",
      aliases: ["ecotimeline", "eco timeline", "timeline", "temporal triad", "past baseline", "future projection", "2040 outlook"],
      simpleMeaning: "The website's multi-decade timeline page that lets users explore past baseline conditions, present satellite observations, and future forward projections for any Indian state or region.",
      simpleMeaningHi: "Pichhle 15 saal (Past), aaj ke 15 saal (Present), aur aane wale 2040 (Future) ka interactive 3-phase dashboard.",
      definition: "A specialized temporal forensics module within the India Earth System Trend Detective providing continuous chronological trajectory analysis from 1995 through 2040+. It partitions NASA multi-sensor satellite records into distinct epochs to evaluate physical shifts and extrapolate trends using thermodynamic boundary constraints.",
      example: "Switching to the EcoTimeline page reveals that summer skin temperatures in Rajasthan have risen from a 41.5\\u00b0C historical baseline (1995\\u20132010) to 43.2\\u00b0C present observed (2011\\u20132025), with a projected trajectory reaching 44.8\\u00b0C by 2035."
    },
    {
      term: "Executive Decision Brief (Policy Bento)",
      category: "Website Architecture & Analytical Modes",
      aliases: ["executive decision brief (policy bento)", "executive decision brief", "policy bento", "executive brief", "decision brief", "policy brief"],
      simpleMeaning: "A 1-click plain-language summary designed for government officers, farmers, and citizens, translating complex satellite data into practical warnings and action plans.",
      simpleMeaningHi: "Kisanon aur afsaron ke liye simple summary bento card jo seedhe batata hai ki kya kadam uthane hain.",
      definition: "An automated synthesis document structured as an Apple-inspired Bento Grid consisting of 5 plain-language sections: Non-Technical Headline, The Human Problem, NASA Satellite Proof, 3 Key Risk Metrics, and a Practical Solutions Roadmap tailored for farmers, city managers, and everyday citizens.",
      example: "Opening the Executive Decision Brief for Maharashtra instantly provides water-rationing advice for municipal bodies, drip irrigation priorities for farmers, and downloadable Word (.doc) and CSV reports."
    },
    {
      term: "Forensic Dashboard (Scientific Workstation)",
      category: "Website Architecture & Analytical Modes",
      aliases: ["forensic dashboard (scientific workstation)", "forensic dashboard", "scientific workstation", "dashboard", "forensic workstation"],
      simpleMeaning: "The deep-dive scientific investigation room with interactive spatial heat maps, time-series charts, and statistical proof for each environmental variable.",
      simpleMeaningHi: "Website ka main research console jahan satellite map aur 31-saal ke charts live calculate hote hain.",
      definition: "The primary analytical workstation featuring a two-column forensic layout: a left-hand environmental system and region control console, paired with high-resolution spatial anomaly maps, interactive multi-sensor trend charts, and Mann-Kendall statistical significance proofs.",
      example: "The Forensic Dashboard enables researchers to drill down into 31 years of SMAP subsoil moisture data across Maharashtra's cotton belt, validating a 99% statistically significant drying trend."
    },
    {
      term: "GPM IMERG V07 Precipitation Radar",
      category: "Satellites & NASA Datasets",
      aliases: ["gpm imerg v07 precipitation radar", "gpm imerg v07", "imerg v07", "precipitation radar"],
      simpleMeaning: "NASA's cutting-edge global satellite system that measures rain, hail, and snow anywhere on Earth every 30 minutes with 10-kilometer pinpoint accuracy.",
      simpleMeaningHi: "NASA ka latest radar version jo pichhle 31 saal ki har baarish ko minute-to-minute scan karta hai.",
      definition: "NASA's Integrated Multi-satellitE Retrievals for GPM (Version 07), combining radar and radiometer data from an international constellation of satellites to deliver gridded precipitation estimates at 0.1\\u00b0 (~10 km) spatial resolution every 30 minutes worldwide.",
      example: "GPM IMERG V07 satellite records enabled the detection of extreme cloudbursts exceeding 80 mm/hour over the Western Ghats during the active southwest monsoon."
    },
    {
      term: "Guided Walkthrough Case Studies (1-Click Tour)",
      category: "Website Architecture & Analytical Modes",
      aliases: ["guided walkthrough case studies (1-click tour)", "guided walkthrough case studies", "1-click tour", "guided walkthrough case studies (1 click tour)", "case studies", "walkthrough", "guided tour", "demonstration cases"],
      simpleMeaning: "Pre-configured 1-click investigation buttons on the Orbit View page that immediately take you to famous climate phenomena: Delhi Heat Domes, Himalayan Cloudbursts, and Deccan Flash Droughts.",
      simpleMeaningHi: "Pre-built kahaniyan (jaise The Missing Monsoon) jisse koi bhi user 1 click mein poora tool sikh sakta hai.",
      definition: "Curated, interactive forensic walkthrough modules that programmatically update camera coordinates, satellite sensor variables, spatial map overlays, and synchronized trend graphs to demonstrate verified environmental regime shifts in a single click.",
      example: "Clicking 'Case 1: Delhi Heat Dome' in Orbit View automatically navigates the 3D globe to the National Capital Region and populates 31 years of MODIS thermal anomalies."
    },
    {
      term: "Hotspot Beacon (Geospatial Alert)",
      category: "Website Architecture & Analytical Modes",
      aliases: ["hotspot beacon (geospatial alert)", "hotspot beacon", "geospatial alert", "hotspot"],
      simpleMeaning: "A glowing interactive marker on the 3D globe and maps highlighting regions undergoing critical climate shifts (like Delhi heat, Himalayan cloudbursts, or Punjab drought).",
      simpleMeaningHi: "Map par chamakne wala alert marker jo bhyankar garmi ya sookhe wale ilaaqon ko highlight karta hai.",
      definition: "A high-priority geospatial indicator on the 3D Earth console and 2D regional maps that draws attention to areas experiencing severe multi-decadal environmental anomalies, linking directly to forensic data case studies.",
      example: "Clicking the 'Brahmaputra Flood Plain' hotspot beacon on the 3D globe immediately zooms the camera to Northeast India and loads 31 years of IMERG flood data."
    },
    {
      term: "MODIS Terra & Aqua Thermal Sensors",
      category: "Satellites & NASA Datasets",
      aliases: ["modis terra & aqua thermal sensors", "terra aqua sensors", "modis thermal sensors"],
      simpleMeaning: "Twin NASA satellites flying in space that photograph Earth twice a day to measure exact surface temperatures and vegetation health with 1-kilometer clarity.",
      simpleMeaningHi: "NASA ke do satellites jo zameen ke tapmaan ko din aur raat dono waqt scan karte hain.",
      definition: "NASA's Moderate Resolution Imaging Spectroradiometer instruments aboard the Terra (morning) and Aqua (afternoon) polar-orbiting satellites, providing daily global coverage across 36 spectral bands at 250 m to 1 km resolution, measuring thermal Land Surface Temperature (LST) and vegetation indices.",
      example: "MODIS Terra and Aqua thermal skin observations reveal that daytime ground temperatures in western Rajasthan routinely exceed 48\\u00b0C during peak pre-monsoon heatwaves."
    },
    {
      term: "Orbit View (3D Space Entrance Console)",
      category: "Website Architecture & Analytical Modes",
      aliases: ["orbit view (3d space entrance console)", "orbit view", "3d space entrance console", "space console", "3d globe", "space view", "orbit view page", "orbit"],
      simpleMeaning: "The 3D interactive satellite globe view where you can explore NASA hotspots, click guided walkthrough case studies, and select states across India.",
      simpleMeaningHi: "3D ghumta hua photorealistic Earth globe jahan live satellites aur key state hotspots dikhte hain.",
      definition: "The primary mission entrance console rendering a photorealistic 3D Blue Marble Earth globe with orbital satellite tracks, live aerospace telemetry, interactive regional hotspot beacons, and 1-click guided walkthrough case studies.",
      example: "In Orbit View, clicking on the 'Delhi Heat Dome' case study smoothly rotates the 3D globe and inspects the 1995\\u20132025 thermal skin anomalies over the National Capital Region."
    },
    {
      term: "Physical Delta (Observed Climate Shift)",
      category: "Statistical Analysis & Anomalies",
      aliases: ["physical delta (observed climate shift)", "physical delta", "observed climate shift", "observed shift", "climate delta"],
      simpleMeaning: "The exact physical difference in temperature, rainfall, or soil moisture between historical baseline years and today's satellite measurements.",
      simpleMeaningHi: "Pichhle 31 saal mein aane wala sacha physical badlaav (jaise +1.9\u00b0C garmi ya -28 mm baarish).",
      definition: "The quantified net change (represented by the Greek letter \\u0394) between the historical baseline epoch (1995\\u20132010) and the modern observed satellite era (2011\\u20132025). It measures absolute shifts (e.g. +1.7\\u00b0C, -28 mm/decade) and percentage accelerations in climate extremes.",
      example: "The physical delta for Punjab's root-zone soil moisture demonstrates a -24% subsoil moisture depletion, directly explaining the surge in agricultural flash droughts."
    },
    {
      term: "Scatter Dispersion (Climatological Volatility Mode)",
      category: "Statistical Analysis & Anomalies",
      aliases: ["scatter dispersion (climatological volatility mode)", "scatter dispersion", "climatological volatility mode", "scatter plot", "volatility mode"],
      simpleMeaning: "A chart view that shows every single year as a separate point, letting you easily see how wild, erratic, or spread out the weather has become over time.",
      simpleMeaningHi: "Ek aisa chart jo dikhata hai ki har saal ka mausam average line se kitna bhatak raha hai.",
      definition: "A multi-dimensional visualization mode displaying annual observation points across a continuous 46-year record (1995\\u20132040+) overlaid with a Theil-Sen regression line. It isolates inter-annual spread, variance expansion, and outlier clustering across distinct climatological epochs.",
      example: "Switching the EcoTimeline chart to Scatter Dispersion reveals that while 1995\\u20132010 points clustered tightly near the mean, 2011\\u20132025 points scatter violently between extreme flood spikes and acute drought lows."
    },
    {
      term: "SMAP L-Band Microwave Radiometer",
      category: "Satellites & NASA Datasets",
      aliases: ["smap l-band microwave radiometer", "smap l band microwave radiometer", "smap l-band", "microwave radiometer"],
      simpleMeaning: "A NASA satellite with a giant spinning mesh antenna that sees through clouds and vegetation to measure moisture hidden inside the top soil and root-zone.",
      simpleMeaningHi: "NASA ka radar sensor jo ghane badal hone par bhi mitti ke andar ka paani dekh leta hai.",
      definition: "NASA's Soil Moisture Active Passive satellite operating at L-band microwave frequency (1.41 GHz) from 685 km orbit. It measures microwave emissions from the top 5 cm of soil, assimilated into hydrology models to generate continuous 0\\u2013100 cm root-zone soil moisture maps.",
      example: "SMAP microwave observations provide crucial early warnings of subsoil drought in the Deccan Plateau before visible surface crops begin to dry and wither."
    },
    {
      term: "Temporal Triad Analysis (Past \\u2794 Present \\u2794 Future)",
      category: "Statistical Analysis & Anomalies",
      aliases: ["temporal triad analysis (past \\u2794 present \\u2794 future)", "temporal triad analysis", "past \\u2794 present \\u2794 future"],
      simpleMeaning: "A 3-step scientific method that compares where the climate was in the past (1995\\u20132010), what satellites see today (2011\\u20132025), and where physics predicts it will head in the future (2026\\u20132040+).",
      simpleMeaningHi: "A 3-step scientific method that compares where the climate was in the past (1995\\u20132010), what satellites see today (2011\\u20132025), and where physics predicts it will head in the future (2026\\u20132040+).",
      definition: "A rigorous chronological methodology partitioning a continuous 31-year satellite Earth observation time series into three distinct phases: an unaccelerated Climatological Baseline Normal (1995\\u20132010), a Modern Observed Satellite Era (2011\\u20132025), and a Deterministic Forward Outlook (2026\\u20132040+) constrained by Clausius-Clapeyron thermodynamics and Theil-Sen regression.",
      example: "Temporal Triad Analysis shows that while total monsoon rainfall volume in Uttar Pradesh dropped by only 8%, the distribution structurally compressed from 45 rainy days in the Past baseline to just 22 cloudburst-dominated days in the Present era."
    },
    {
      term: "Theil-Sen Robust Trend Extrapolation",
      category: "Statistical Analysis & Anomalies",
      aliases: ["theil-sen robust trend extrapolation", "theil sen robust trend extrapolation", "theil-sen extrapolation", "robust trend extrapolation", "theil sen extrapolation"],
      simpleMeaning: "A mathematical method for drawing a true trend line through 31 years of data that cannot be misled or skewed by a single bizarre flood year or unusually cold winter.",
      simpleMeaningHi: "Sachi median trend line ko 2040 tak aage badhana taaki aane wale dashakon ka pata lag sake.",
      definition: "A non-parametric statistical regression algorithm that computes the median of slopes between all pairwise combinations of sample points across a multi-decadal time series. It achieves a 29% breakdown point, ensuring extreme weather outliers do not distort the underlying climate trend line.",
      example: "Even though 2019 had an unusually wet monsoon in western India, Theil-Sen regression accurately identified that the long-term underlying trend across 1995\\u20132025 remains a drying trajectory."
    },
    {
      term: "Trend Detective Variable Assistant (NASA Inquiry Guide)",
      category: "Website Architecture & Analytical Modes",
      aliases: ["trend detective variable assistant (nasa inquiry guide)", "trend detective variable assistant", "nasa inquiry guide", "variable detective", "variable assistant", "inquiry guide", "detective assistant"],
      simpleMeaning: "An interactive selector where you choose any environmental problem (like monsoon shifts or heat domes) and driver (like atmospheric moisture) to immediately investigate them on the map and graphs.",
      simpleMeaningHi: "Doctor ke symptom checker jaisa tool jo 2 simple sawal pooch kar sahi satellite data load karta hai.",
      definition: "A guided analytical selector allowing users to pair an environmental system symptom with a physical thermodynamic driver, automatically filtering and querying NASA observation data to isolate regional cause-and-effect relationships.",
      example: "Selecting 'Erratic Monsoon Rainfall' with 'Thermodynamic Water-Holding Surge' in the Variable Assistant immediately updates the map and reveals a -28 mm/decade drying trend over Uttar Pradesh."
    },
    {
      term: "Whole India Climatology View",
      category: "Website Architecture & Analytical Modes",
      aliases: ["whole india climatology view", "whole india", "pan-india", "all india climatology"],
      simpleMeaning: "A button that resets the map to show the entire country of India, letting you see nationwide patterns and compare all states at once.",
      simpleMeaningHi: "Poore desh ka 31-saal ka combined climate map jo sabhi rajyon ka hal ek sath dikhata hai.",
      definition: "A macro-scale geospatial view resetting camera bounds to encompass the complete Indian subcontinent [68.0\\u00b0E\\u201397.5\\u00b0E, 6.0\\u00b0N\\u201337.5\\u00b0N], enabling nationwide climatological synoptic assessments.",
      example: "Clicking 'Whole India' resets the forensic canvas from a close-up state boundary to a comprehensive national overview of temperature and rainfall distributions."
    },
    {
      term: "Dipole & Divergence (Climate Dipole)",
      category: "Climate Dynamics & Teleconnections",
      aliases: ["dipole", "divergence", "climate dipole", "monsoonal dipole", "divergent", "divergent dipole", "contrasting dipole", "soil moisture dipole", "divergent climate dipole"],
      simpleMeaning: "When two regions react in opposite ways to the same weather driver. For example, while one state gets wetter, a nearby state simultaneously gets drier.",
      simpleMeaningHi: "Jab ek hi mausam ke driver se do ilaqon par bilkul ulta asar pade\u2014jaise ek jagah zyada baarish ho aur doosri taraf sookha pad jaye.",
      definition: "A coupled macro-climatic pattern where opposite thermodynamic signals manifest simultaneously in geographically distinct zones due to atmospheric circulation shifts (e.g. Indian Ocean Dipole).",
      example: "While Rajasthan's rainfall increases by +1.2 mm/yr, Uttarakhand's Kashipur moves in the opposite direction at -2.8 mm/yr, creating a divergent climate dipole."
    },
    {
      term: "Decadal Spread (Decadal Rate of Shift)",
      category: "Statistical Analysis & Anomalies",
      aliases: ["decadal spread", "decadal trend", "decadal rate", "net decadal spread", "decade", "per decade", "decadal shift"],
      simpleMeaning: "The total amount of climate change accumulated over a 10-year period (one decade), proving permanent long-term movement rather than 1-year weather noise.",
      simpleMeaningHi: "10 saal (ek dashak) mein kul kitna badlaav aaya. Isse pata chalta hai ki 10 saal mein garmi ya baarish kitni badhi ya ghati.",
      definition: "The cumulative magnitude of change in an environmental parameter over a ten-year interval, calculated by multiplying Sen's annual slope by 10.",
      example: "A decadal spread of 4 mm / decade between two regions indicates their long-term climate trajectories are pulling apart by 40 mm over a century."
    },
    {
      term: "Sensible Heat Flux (Direct Ground & Air Heating)",
      category: "Atmospheric Science & Thermodynamics",
      aliases: ["sensible heat flux", "sensible heat", "heat flux", "ground skin heating"],
      simpleMeaning: "Solar heat that goes directly into scorching the ground and air because dry soil has zero moisture left to cool off by evaporation.",
      simpleMeaningHi: "Suraj ki woh garmi jo mitti sookhne ke baad seedhe hawa aur zameen ko bhatti ki tarah garam karti hai, kyunki paani bhaap ban kar thandak nahi de pata.",
      definition: "The turbulent energy transfer from Earth's surface directly to the atmosphere as temperature change without phase change of water, dominating arid areas (up to 92% of net radiation).",
      example: "In the Thar Desert (Rajasthan), sensible heat flux accounts for 92% of net solar radiation, pushing ground skin temperatures above 54\u00b0C."
    },
    {
      term: "Radiative Cooling (Nocturnal Surface Cooling)",
      category: "Atmospheric Science & Thermodynamics",
      aliases: ["radiative cooling", "night skin cooling", "nocturnal cooling", "night cooling", "night skin"],
      simpleMeaning: "The natural process where Earth releases daytime heat back into clear night skies, cooling the ground before the next sunrise.",
      simpleMeaningHi: "Raat ke waqt zameen ki garmi ka aasmaan mein chale jaana, jisse subah tak zameen thandi ho sake.",
      definition: "The loss of thermal infrared radiation from the planetary surface directly to outer space during clear nights, lowering surface temperatures by 15\u00b0C to 20\u00b0C.",
      example: "Clear desert nights in Rajasthan enable -18.5\u00b0C night skin cooling, which partially offsets blistering daytime desert temperatures."
    },
    {
      term: "Actionable Client Adaptation Matrix",
      category: "Climate Policy & Risk Assessment",
      aliases: ["adaptation matrix", "client adaptation matrix", "actionable matrix", "actionable client adaptation matrix", "adaptation plan"],
      simpleMeaning: "A clear, practical guide showing farmers and cities exact steps to take\u2014like switching to drought crops, harvesting rainwater, or adjusting sowing dates.",
      simpleMeaningHi: "Kisanon aur policy bananey walon ke liye saral guide jo batati hai ki badalte mausam se bachne ke liye kya thos kadam uthayein (jaise nayi fasal ya paani bachana).",
      definition: "A decision-support framework mapping observed climate divergence and hazard categories into concrete, prioritized engineering, agricultural, and policy interventions.",
      example: "The adaptation matrix advises drip irrigation and drought-resilient millets for desiccant zones, while recommending terraced drainage for landslide-prone hills."
    },
    {
      term: "Comparison Insight (Dual-Zone Contrast)",
      category: "Maps & Geographical Analysis",
      aliases: ["comparison insight", "dual-zone comparison insight", "dual zone contrast", "dual comparison"],
      simpleMeaning: "A side-by-side comparison revealing how two different locations differ in temperature, rainfall, and drought hazards over 31 years.",
      simpleMeaningHi: "Do alag-alag sheharon ya rajyon ka aamne-saamne comparison, jisse pata chale ki kahan garmi zyada hai aur kahan sookha.",
      definition: "Automated analytical synthesis comparing multi-decadal Sen's slopes, anomaly sign divergence, and hydrologic trends between active and benchmark geographical targets.",
      example: "Comparing Northeast India (-6% soil moisture per decade) against the Western Coast highlights a soil moisture dipole with desiccation on one end and saturation on the other."
    },
    {
      term: "Deseasonalized Anomaly (Removing Normal Seasons)",
      category: "Statistical Analysis & Anomalies",
      aliases: ["deseasonalized anomaly", "deseasonalized", "deseasonalize", "removing normal seasons", "seasonal anomaly", "deseasonalization"],
      simpleMeaning: "Subtracting normal seasonal weather (like hot May or wet July) to reveal true, permanent climate change underneath.",
      simpleMeaningHi: "Har saal ke aam mausam (jaise May ki garmi ya July ki baarish) ko hata kar dekhna ki asali global warming kitni hai.",
      definition: "The mathematical subtraction of the multi-decadal monthly climatological mean from an observed value, removing annual cyclical oscillations to isolate secular trend signals.",
      example: "Like subtracting a heavy winter coat's weight to check a child's true growth, deseasonalizing removes summer heat so a +2\u00b0C shift proves true warming."
    },
    {
      term: "Synthetic Intelligence (SI / AI) Declaration",
      category: "Data Governance & Provenance",
      aliases: ["synthetic intelligence", "si declaration", "ai declaration", "ai transparency", "ai disclaimer", "si ai"],
      simpleMeaning: "A NASA Space Apps transparency declaration stating that AI helped design the user interface, while all Earth science physics and formulas were checked by humans.",
      simpleMeaningHi: "NASA Space Apps ka imaandari wala note jo batata hai ki UI design mein AI ka sahara liya gaya, lekin sara scientific math insano ne verify kiya hai.",
      definition: "A formal declaration disclosing the assistive utilization of large language and generative models in code layout and styling while affirming human verification of scientific algorithms.",
      example: "Our SI Declaration confirms AI assisted in CSS architecture, while NASA CMR satellite ingest, Theil-Sen regressions, and p-values were human-verified."
    },
    {
      term: "API Key & Open Data Access",
      category: "Data Governance & Provenance",
      aliases: ["api key", "public api", "open data", "rest api", "download dataset", "csv download", "json download", "curl api"],
      simpleMeaning: "A free access key allowing students, scientists, and developers to download EarthScope's 31-year climate dataset directly in JSON or CSV format.",
      simpleMeaningHi: "Ek free access key jisse koi bhi student ya scientist website ka sara 31 saal ka data seedhe download ya code mein use kar sakta hai.",
      definition: "A programmatic authentication token providing RESTful endpoint queries and bulk exports for 31-year multi-sensor climate series across Indian administrative boundaries.",
      example: "Using key nasa_earthscope_live_2026_india31yr_pub_8f4d92a1e7b, researchers can cURL regional records directly into Python or R."
    },
    {
      term: "Mean Page (6 Website Features in Everyday Language)",
      category: "Maps & Geographical Analysis",
      aliases: ["mean", "mean page", "6 updates", "what features mean", "features mean", "mean function", "mean tab"],
      simpleMeaning: "The website page explaining all 6 platform features in simple everyday language using video game, coin toss, and doctor visit metaphors.",
      simpleMeaningHi: "Website ka woh page jo sabhi 6 features ko aasan everyday bhasha aur real-life examples ke sath samjhata hai.",
      definition: "A dedicated public communication view translating EarthScope's forensic architecture, non-parametric statistics, and satellite sensors into non-technical language.",
      example: "The Mean page compares the Variable Detective to a doctor's symptom checker and statistical p-values to a 100-flip coin toss."
    },
    {
      term: "NASA GLDAS (Land Data Assimilation Models)",
      category: "Atmospheric Science & Thermodynamics",
      aliases: ["gldas", "land data assimilation", "gldas models", "gldas weather models", "nasa gldas"],
      simpleMeaning: "NASA's advanced computer climate simulation that fills gaps when heavy storm clouds block optical camera satellites.",
      simpleMeaningHi: "NASA ka computer model jo badal aane par satellite ki kami ko pura karke zameen ka sacha data calculate karta hai.",
      definition: "Global Land Data Assimilation System: an operational modeling framework integrating satellite and ground observations to generate continuous land-surface state estimates.",
      example: "When monsoon clouds blind MODIS optical sensors, GLDAS computer models provide unclouded soil moisture and thermal flux estimates."
    },
    {
      term: "Albedo & Surface Reflectivity",
      category: "Atmospheric Science & Thermodynamics",
      aliases: ["albedo", "surface reflectivity", "albedo feedback", "surface albedo"],
      simpleMeaning: "How well a surface reflects sunlight. White snow and light sand bounce sun away, while dark asphalt and dried land absorb heat like a sponge.",
      simpleMeaningHi: "Zameen ki dhoop ko wapas aasmaan mein lautane ki shamta. Safed barf dhoop lautati hai, jabki kaali sadak garmi sokh leti hai.",
      definition: "The fraction of incident solar radiation reflected by a surface, ranging from ~0.1 for dark asphalt/forests to ~0.9 for fresh snow, driving local surface energy balances.",
      example: "Replacing natural grassland with dark asphalt drops albedo from 0.25 to 0.08, heating city streets by an extra 4\u00b0C to 8\u00b0C."
    }
  ];

  // Sort and index dictionary for fast lookup
  const DICTIONARY_DATABASE = RAW_DICTIONARY_DATA.slice().sort((a, b) => a.term.localeCompare(b.term));
  window.SCIENTIFIC_DICTIONARY_DATABASE = DICTIONARY_DATABASE;
  // Ultra-Fast Word & Term Matcher for All Hard Words & Website Key Words
  function findDictionaryMatch(query) {
    if (!query) return null;
    const raw = query.toLowerCase().trim();

    // 1. Clean query of conversational framing words
    let cln = raw.replace(/[^\w\s\-]/g, ' ');
    cln = cln.replace(/^(?:what\s+is|what\s+are|what\s+does|explain|define|definition\s+of|meaning\s+of|tell\s+me\s+about|describe)\s+/g, '').trim();
    cln = cln.replace(/\s+(?:mean|meaning|definition|kya\s+hai|ka\s+matlab|samjhao|batao|kise\s+kehte\s+hain)$/g, '').trim();
    cln = cln.replace(/^(?:kya\s+hai|matlab\s+batao|samjhao)\s+/g, '').trim();
    const clnSpace = cln.replace(/-/g, ' ');

    if (!cln && !raw) return null;

    // 2. Exact alias match (Highest priority)
    for (let i = 0; i < DICTIONARY_DATABASE.length; i++) {
      const item = DICTIONARY_DATABASE[i];
      if (!item.aliases) continue;
      for (let j = 0; j < item.aliases.length; j++) {
        const alias = item.aliases[j];
        if (cln === alias || clnSpace === alias || clnSpace === alias.replace(/-/g, ' ')) {
          return item;
        }
      }
    }

    // 3. Scored Token & Substring Matching with Word Boundary Enforcement
    let bestMatch = null;
    let bestScore = 0;
    for (let i = 0; i < DICTIONARY_DATABASE.length; i++) {
      const item = DICTIONARY_DATABASE[i];
      if (!item.aliases) continue;
      for (let j = 0; j < item.aliases.length; j++) {
        const alias = item.aliases[j];
        if (alias.length <= 3) {
          // Require exact word boundary so short acronyms (e.g. 'et', 'lst', 'vpd') don't match inside 'wet' or 'synthetic'
          const re = new RegExp('(?:^|\\s)' + alias.replace('-', '\\-') + '(?:\\s|$)', 'i');
          if (re.test(cln) || re.test(clnSpace)) {
            const score = alias.length * 10;
            if (score > bestScore) {
              bestScore = score;
              bestMatch = item;
            }
          }
        } else {
          if (cln.includes(alias) || alias.includes(cln)) {
            const score = Math.max(alias.length, cln.length);
            if (score > bestScore) {
              bestScore = score;
              bestMatch = item;
            }
          }
        }
      }
    }

    return bestMatch;
  }


  // 4. REGIONAL CLIMATE KNOWLEDGE BASE
  const CLIMATE_KNOWLEDGE = {
    uttarakhand: {
      name: "Uttarakhand (Western Himalayan High-Altitude Ridge)",
      warming: "+0.34°C per decade (Elevation-Dependent Mountain Warming)",
      rainfall: "Erratic cloudburst spikes (+28 mm/decade extreme bursts) with high seasonal volatility",
      soil: "-1.4% topsoil root moisture drop, followed by rapid liquefaction and saturation slip",
      keyIssues: "Elevation-dependent warming reducing winter snowpack, high-altitude convective cloudbursts dumping >100 mm in 1-2 hours, catastrophic flash floods and landslides in Alaknanda, Bhagirathi, and Mandakini basins.",
      action: "VIEW_STATE:Uttarakhand",
      compare: "COMPARE:Uttarakhand:Rajasthan"
    },
    rajasthan: {
      name: "Rajasthan (Thar Desert & Northwest Arid)",
      warming: "+0.38°C per decade (Highest surface warming rate in India)",
      rainfall: "+12 mm per decade with extreme inter-annual variance (erratic desert deluge)",
      soil: "Topsoil desiccation with -0.9% root-zone moisture deficit",
      keyIssues: "Severe hyper-arid heatwaves exceeding 48°C, sudden flash flood downpours over dry desert crust, and deep groundwater depletion.",
      action: "VIEW_STATE:Rajasthan",
      compare: "COMPARE:Rajasthan:Kerala"
    },
    uttar_pradesh: {
      name: "Uttar Pradesh (Indo-Gangetic Plains)",
      warming: "+0.28°C per decade warming",
      rainfall: "-28 mm per decade (-8.2% drop against 30-year IMD baseline)",
      soil: "-1.8% soil moisture depletion in upper root-zone",
      keyIssues: "Monsoon rainfall compressed into intense bursts punctuated by prolonged 15-20 day rainless breaks; elevated pre-monsoon wet-bulb humid heat.",
      action: "VIEW_STATE:Uttar Pradesh",
      compare: "COMPARE:Uttar Pradesh:Vidarbha"
    },
    kerala: {
      name: "Kerala & Western Ghats",
      warming: "+0.22°C per decade warming",
      rainfall: "+42 mm per decade increase in torrential orographic cloudbursts",
      soil: "High saturation volatility followed by steep runoff",
      keyIssues: "Coastal wet-bulb temperature stress (>31°C) with high humidity, localized mountain cloudbursts, and flash landslide vulnerability.",
      action: "VIEW_STATE:Kerala",
      compare: "COMPARE:Rajasthan:Kerala"
    },
    vidarbha: {
      name: "Vidarbha & Central Farmlands (Maharashtra / MP)",
      warming: "+0.31°C per decade warming",
      rainfall: "-34 mm per decade monsoon rainfall drop",
      soil: "-2.4% soil moisture deficit (acute agricultural drought)",
      keyIssues: "Extended rainless spells lasting 15 to 20 days during critical crop development, causing widespread soybean and cotton canopy desiccation.",
      action: "VIEW_STATE:Vidarbha",
      compare: "COMPARE:Uttar Pradesh:Vidarbha"
    },
    northeast: {
      name: "Northeast India (Assam & Meghalaya)",
      warming: "+0.25°C per decade warming",
      rainfall: "-38 mm per decade structural monsoon decline",
      soil: "River valley topsoil erosion and altered sediment transport",
      keyIssues: "Historical decline in traditional high-volume monsoon totals combined with erratic flood pulses along the Brahmaputra river basin.",
      action: "VIEW_STATE:Assam",
      compare: "COMPARE:Assam:Rajasthan"
    },
    peninsular: {
      name: "Peninsular Deccan (Telangana, Rayalaseema, Interior Tamil Nadu)",
      warming: "+0.26°C per decade warming",
      rainfall: "Expanding rain-shadow deficit between monsoon pulses",
      soil: "Chronic deep-profile moisture drying",
      keyIssues: "Deep crystalline aquifer depletion (-2.4 to -3.8 cm/year GRACE satellite rate) and lengthening dry seasons.",
      action: "VIEW_STATE:Telangana",
      compare: "COMPARE:Telangana:Kerala"
    }
  };

  // 5. INJECT CSS STYLES FOR CHATBOT UI (BIOSPHERE MINT & PEARL THEME)
  function injectChatbotStyles() {
    if (document.getElementById('trend-detective-ai-styles')) return;
    const style = document.createElement('style');
    style.id = 'trend-detective-ai-styles';
    style.textContent = `
      /* Launcher Floating Button (Pearl White with Emerald Ring) */
      .ai-bot-floating-btn {
        position: fixed;
        bottom: 22px;
        right: 22px;
        width: 58px;
        height: 58px;
        border-radius: 50%;
        background: #ffffff;
        border: 2.5px solid #0f766e;
        box-shadow: 0 8px 24px rgba(15, 118, 110, 0.28), 0 2px 8px rgba(0, 0, 0, 0.08);
        cursor: pointer;
        z-index: 99990;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        outline: none;
        transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease;
      }
      .ai-bot-floating-btn:hover {
        transform: scale(1.08) translateY(-2px);
        box-shadow: 0 12px 30px rgba(15, 118, 110, 0.38), 0 0 16px rgba(16, 185, 129, 0.4);
      }
      .ai-bot-floating-btn:active {
        transform: scale(0.95);
      }
      .ai-bot-btn-avatar {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .ai-bot-online-badge {
        position: absolute;
        top: 2px;
        right: 2px;
        width: 13px;
        height: 13px;
        background: #10b981;
        border: 2px solid #ffffff;
        border-radius: 50%;
        box-shadow: 0 0 8px #10b981;
        animation: botPulse 2s infinite;
      }
      @keyframes botPulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.2); opacity: 0.85; }
      }

      /* Chatbot Backdrop (for mobile) */
      .ai-bot-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(15, 23, 42, 0.35);
        backdrop-filter: blur(4px);
        z-index: 99980;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.25s ease;
      }
      .ai-bot-backdrop.open {
        opacity: 1;
        pointer-events: auto;
      }

      /* Auto-shift NEXT navigation button up when chatbot is open so it never overlaps */
      .page-nav-pill.page-nav-next {
        transition: top 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.25s ease, box-shadow 0.25s ease !important;
      }
      body.ai-bot-open .page-nav-pill.page-nav-next {
        top: 14px !important;
        transform: scale(0.96);
        box-shadow: 0 4px 14px rgba(16, 185, 129, 0.35) !important;
        z-index: 100090 !important;
      }

      /* Chat Window Drawer (Biosphere Pearl & Mint Theme, Anchored Below NEXT Button) */
      .ai-bot-drawer {
        position: fixed;
        top: 66px; /* Sits comfortably below shifted > NEXT pill */
        bottom: 84px;
        right: 20px;
        width: 510px; /* Generous width for charts and analysis */
        max-width: calc(100vw - 28px);
        height: auto;
        max-height: calc(100vh - 150px);
        background: rgba(255, 255, 255, 0.96);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1.5px solid rgba(16, 185, 129, 0.35);
        border-radius: 20px;
        box-shadow: 0 16px 45px rgba(15, 118, 110, 0.16), 0 2px 10px rgba(0, 0, 0, 0.05);
        z-index: 99985;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        transform: translateY(16px) scale(0.97);
        opacity: 0;
        pointer-events: none;
        transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.22s ease;
        font-family: 'Outfit', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      }
      .ai-bot-drawer.open {
        transform: translateY(0) scale(1);
        opacity: 1;
        pointer-events: auto;
      }

      /* Header (Mint-Pearl Gradient) */
      .ai-bot-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 13px 18px;
        background: linear-gradient(135deg, #e6fffa 0%, #f0fdf4 50%, #eff6ff 100%);
        border-bottom: 1px solid rgba(16, 185, 129, 0.2);
      }
      .ai-bot-header-left {
        display: flex;
        align-items: center;
        gap: 11px;
      }
      .ai-bot-header-avatar {
        width: 36px;
        height: 36px;
        border-radius: 11px;
        border: 1.5px solid #0f766e;
        overflow: hidden;
        box-shadow: 0 2px 6px rgba(15, 118, 110, 0.15);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .ai-bot-header-title {
        font-size: 15px;
        font-weight: 800;
        color: #0f766e;
        letter-spacing: -0.2px;
        display: flex;
        align-items: center;
        gap: 7px;
      }
      .ai-bot-header-title span.badge {
        font-size: 9.5px;
        padding: 2.5px 7px;
        border-radius: 6px;
        background: #d1fae5;
        color: #047857;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.4px;
        border: 1px solid rgba(16, 185, 129, 0.35);
      }
      .ai-bot-header-sub {
        font-size: 11.5px;
        color: #475569;
        font-weight: 500;
      }
      .ai-bot-header-actions {
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .ai-bot-icon-btn {
        background: rgba(15, 118, 110, 0.08);
        border: 1px solid rgba(15, 118, 110, 0.2);
        color: #0f766e;
        width: 32px;
        height: 32px;
        border-radius: 9px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 13.5px;
        transition: all 0.2s ease;
      }
      .ai-bot-icon-btn:hover {
        background: #0f766e;
        color: #ffffff;
        border-color: #0f766e;
      }

      /* Messages Container */
      .ai-bot-messages {
        flex: 1;
        overflow-y: auto;
        padding: 16px 18px;
        display: flex;
        flex-direction: column;
        gap: 14px;
        scroll-behavior: smooth;
        background: linear-gradient(180deg, rgba(248, 250, 252, 0.95) 0%, rgba(240, 253, 244, 0.4) 100%);
      }
      .ai-bot-messages::-webkit-scrollbar {
        width: 6px;
      }
      .ai-bot-messages::-webkit-scrollbar-track {
        background: transparent;
      }
      .ai-bot-messages::-webkit-scrollbar-thumb {
        background: rgba(16, 185, 129, 0.3);
        border-radius: 4px;
      }

      /* Bubble Styles */
      .ai-bot-msg-row {
        display: flex;
        gap: 10px;
        align-items: flex-start;
      }
      .ai-bot-msg-row.user {
        flex-direction: row-reverse;
      }
      .ai-bot-msg-avatar {
        width: 30px;
        height: 30px;
        border-radius: 9px;
        overflow: hidden;
        flex-shrink: 0;
        border: 1.5px solid #0f766e;
        box-shadow: 0 2px 6px rgba(15, 118, 110, 0.15);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .ai-bot-msg-bubble {
        max-width: 88%;
        padding: 12px 16px;
        border-radius: 14px;
        font-size: 13.5px;
        line-height: 1.6;
        word-break: break-word;
      }
      .ai-bot-msg-row.bot .ai-bot-msg-bubble {
        background: #ffffff;
        color: #1e293b;
        border: 1px solid rgba(226, 232, 240, 0.95);
        box-shadow: 0 2px 10px rgba(15, 23, 42, 0.05);
        border-top-left-radius: 4px;
      }
      .ai-bot-msg-row.user .ai-bot-msg-bubble {
        background: linear-gradient(135deg, #0f766e 0%, #0d9488 100%);
        color: #ffffff;
        border-top-right-radius: 4px;
        box-shadow: 0 4px 14px rgba(15, 118, 110, 0.25);
      }

      /* 1-Click Action Card & Buttons */
      .ai-bot-action-group {
        margin-top: 14px;
        padding: 12px;
        background: #f0fdf4;
        border: 1.5px solid rgba(16, 185, 129, 0.35);
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        box-shadow: 0 2px 8px rgba(16, 185, 129, 0.08);
      }
      .ai-bot-action-prompt-text {
        font-size: 12px;
        font-weight: 700;
        color: #065f46;
        line-height: 1.4;
      }
      .ai-bot-action-primary {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        width: 100%;
        background: linear-gradient(135deg, #0f766e 0%, #10b981 100%);
        color: #ffffff;
        font-size: 12.5px;
        font-weight: 800;
        padding: 11px 14px;
        border-radius: 10px;
        border: none;
        cursor: pointer;
        box-shadow: 0 4px 14px rgba(16, 185, 129, 0.35);
        transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        text-align: center;
        outline: none;
      }
      .ai-bot-action-primary:hover {
        transform: translateY(-1.5px);
        box-shadow: 0 6px 18px rgba(16, 185, 129, 0.45);
        background: linear-gradient(135deg, #0d9488 0%, #059669 100%);
      }
      .ai-bot-action-primary:active {
        transform: scale(0.98);
      }
      .ai-bot-action-secondary {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 7px;
        width: 100%;
        background: #ffffff;
        color: #0f766e;
        font-size: 11.5px;
        font-weight: 700;
        padding: 8px 12px;
        border-radius: 9px;
        border: 1.5px solid rgba(16, 185, 129, 0.4);
        cursor: pointer;
        transition: all 0.2s ease;
        outline: none;
      }
      .ai-bot-action-secondary:hover {
        background: #ccfbf1;
        color: #065f46;
        border-color: #10b981;
      }

      /* Quick Suggestion Chips (Pearl Mint Styling) */
      .ai-bot-chips-bar {
        padding: 0 16px 10px 16px;
        display: flex;
        gap: 6px;
        overflow-x: auto;
        white-space: nowrap;
        scrollbar-width: none;
      }
      .ai-bot-chips-bar::-webkit-scrollbar {
        display: none;
      }
      .ai-bot-chip {
        display: inline-block;
        background: #f0fdf4;
        border: 1px solid rgba(16, 185, 129, 0.35);
        color: #065f46;
        font-size: 11.5px;
        font-weight: 700;
        padding: 6px 12px;
        border-radius: 14px;
        cursor: pointer;
        transition: all 0.2s ease;
        flex-shrink: 0;
      }
      .ai-bot-chip:hover {
        background: #dcfce7;
        color: #047857;
        border-color: #10b981;
        transform: translateY(-1px);
      }

      /* Typing Indicator (Mint / Emerald Dots) */
      .ai-bot-typing {
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 6px 0;
      }
      .ai-bot-typing-dot {
        width: 7px;
        height: 7px;
        background: #0f766e;
        border-radius: 50%;
        animation: typingDot 1.4s infinite ease-in-out;
      }
      .ai-bot-typing-dot:nth-child(2) { animation-delay: 0.2s; background: #10b981; }
      .ai-bot-typing-dot:nth-child(3) { animation-delay: 0.4s; background: #38bdf8; }
      @keyframes typingDot {
        0%, 80%, 100% { transform: translateY(0); opacity: 0.35; }
        40% { transform: translateY(-5px); opacity: 1; }
      }

      /* Input Bar (Clean Pearl White) */
      .ai-bot-input-area {
        padding: 12px 16px;
        background: #ffffff;
        border-top: 1px solid rgba(226, 232, 240, 0.9);
        display: flex;
        align-items: center;
        gap: 9px;
      }
      .ai-bot-input {
        flex: 1;
        background: #f8fafc;
        border: 1.5px solid rgba(203, 213, 225, 0.8);
        border-radius: 12px;
        padding: 10px 14px;
        color: #0f172a;
        font-size: 13px;
        outline: none;
        transition: border-color 0.2s ease, box-shadow 0.2s ease;
      }
      .ai-bot-input:focus {
        border-color: #0f766e;
        background: #ffffff;
        box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
      }
      .ai-bot-input::placeholder {
        color: #94a3b8;
      }
      .ai-bot-send-btn {
        width: 38px;
        height: 38px;
        border-radius: 11px;
        background: linear-gradient(135deg, #0f766e 0%, #10b981 100%);
        border: none;
        color: #ffffff;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.2s ease, opacity 0.2s ease;
        flex-shrink: 0;
        box-shadow: 0 3px 10px rgba(16, 185, 129, 0.3);
      }
      .ai-bot-send-btn:hover {
        transform: scale(1.06);
      }
      .ai-bot-send-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      /* Dark Theme Support (Deep Galaxy Mode) */
      body.theme-cosmic-space .ai-bot-floating-btn {
        background: #0f172a;
        border-color: #38bdf8;
        box-shadow: 0 8px 24px rgba(56, 189, 248, 0.28), 0 2px 8px rgba(0, 0, 0, 0.6);
      }
      body.theme-cosmic-space .ai-bot-floating-btn:hover {
        box-shadow: 0 12px 30px rgba(56, 189, 248, 0.4), 0 0 16px rgba(56, 189, 248, 0.5);
      }
      body.theme-cosmic-space .ai-bot-drawer {
        background: rgba(15, 23, 42, 0.96);
        border-color: rgba(56, 189, 248, 0.35);
        box-shadow: 0 16px 45px rgba(0, 0, 0, 0.5), 0 0 20px rgba(56, 189, 248, 0.15);
      }
      body.theme-cosmic-space .ai-bot-header {
        background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
        border-bottom-color: rgba(56, 189, 248, 0.2);
      }
      body.theme-cosmic-space .ai-bot-header-title {
        color: #38bdf8;
      }
      body.theme-cosmic-space .ai-bot-header-sub {
        color: #94a3b8;
      }
      body.theme-cosmic-space .ai-bot-icon-btn {
        background: rgba(56, 189, 248, 0.1);
        border-color: rgba(56, 189, 248, 0.25);
        color: #38bdf8;
      }
      body.theme-cosmic-space .ai-bot-input-area {
        background: rgba(15, 23, 42, 0.95);
        border-top-color: rgba(56, 189, 248, 0.2);
      }
      body.theme-cosmic-space .ai-bot-input {
        background: #1e293b;
        border-color: rgba(71, 85, 105, 0.8);
        color: #f1f5f9;
      }
      body.theme-cosmic-space .ai-bot-input:focus {
        border-color: #38bdf8;
        background: #0f172a;
        box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.2);
      }
      body.theme-cosmic-space .ai-bot-input::placeholder {
        color: #64748b;
      }
      body.theme-cosmic-space .ai-bot-msg-row.bot .ai-bot-msg-bubble {
        background: #1e293b;
        color: #e2e8f0;
        border-color: rgba(56, 189, 248, 0.25);
      }
      body.theme-cosmic-space .ai-bot-msg-row.user .ai-bot-msg-bubble {
        background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
        color: #ffffff;
      }
      body.theme-cosmic-space .ai-bot-action-group {
        background: rgba(30, 41, 59, 0.7);
        border-color: rgba(56, 189, 248, 0.3);
      }
      body.theme-cosmic-space .ai-bot-action-prompt-text {
        color: #cbd5e1;
      }
      body.theme-cosmic-space .ai-bot-chip {
        background: rgba(30, 41, 59, 0.85);
        border-color: rgba(56, 189, 248, 0.35);
        color: #38bdf8;
      }
      body.theme-cosmic-space .ai-bot-chip:hover {
        background: rgba(56, 189, 248, 0.2);
        color: #7dd3fc;
        border-color: #38bdf8;
      }

      /* Mobile responsiveness */
      @media (max-width: 520px) {
        .ai-bot-drawer {
          right: 10px;
          top: 62px;
          bottom: 80px;
          width: calc(100vw - 20px);
          max-height: calc(100vh - 146px);
        }
        .ai-bot-floating-btn {
          bottom: 16px;
          right: 16px;
          width: 52px;
          height: 52px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // 6. SESSION STORAGE STATE
  let conversationMessages = [];

  function loadConversation() {
    try {
      const saved = sessionStorage.getItem(SESSION_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          conversationMessages = parsed;
          return;
        }
      }
    } catch (e) {}

    // Initial greeting: Short, clean, exactly as requested
    conversationMessages = [
      {
        id: 'msg-welcome',
        sender: 'bot',
        text: `Hello! How can I help you today?`
      }
    ];
    saveConversation();
  }

  function saveConversation() {
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(conversationMessages));
    } catch (e) {}
  }

  function clearConversation() {
    sessionStorage.removeItem(SESSION_KEY);
    loadConversation();
    renderAllMessages();
  }

  // 7. BUILD CHATBOT DOM NODES
  let botDrawer = null;
  let botBackdrop = null;
  let messagesContainer = null;
  let inputField = null;
  let sendButton = null;

  function buildChatbotDOM() {
    if (document.getElementById('trend-detective-ai-launcher')) return;
    injectChatbotStyles();

    // A. Floating Launcher Button (With Vector SVG Robot)
    const launcherBtn = document.createElement('button');
    launcherBtn.id = 'trend-detective-ai-launcher';
    launcherBtn.className = 'ai-bot-floating-btn';
    launcherBtn.setAttribute('aria-label', 'Open BNR Trend Detective AI Assistant');
    launcherBtn.setAttribute('title', 'AI Climate Detective Co-Pilot (💬)');
    launcherBtn.innerHTML = `
      <div class="ai-bot-btn-avatar">${ROBOT_ICON_SVG}</div>
      <span class="ai-bot-online-badge"></span>
    `;
    launcherBtn.onclick = function() {
      toggleChatbot();
    };
    document.body.appendChild(launcherBtn);

    // B. Mobile Backdrop
    botBackdrop = document.createElement('div');
    botBackdrop.className = 'ai-bot-backdrop';
    botBackdrop.onclick = function() {
      closeChatbot();
    };
    document.body.appendChild(botBackdrop);

    // C. Chat Drawer
    botDrawer = document.createElement('aside');
    botDrawer.id = 'trend-detective-ai-drawer';
    botDrawer.className = 'ai-bot-drawer';
    botDrawer.setAttribute('aria-label', 'BNR Trend Detective Assistant Window');

    botDrawer.innerHTML = `
      <div class="ai-bot-header">
        <div class="ai-bot-header-left">
          <div class="ai-bot-header-avatar">${ROBOT_ICON_SVG}</div>
          <div>
            <div class="ai-bot-header-title">
              Trend Detective AI
            </div>
            <div class="ai-bot-header-sub">BNR Climate Co-Pilot • Biosphere Mint</div>
          </div>
        </div>
        <div class="ai-bot-header-actions">
          <button type="button" class="ai-bot-icon-btn" title="Reset Session / Clear Chat" id="ai-bot-btn-clear">🗑️</button>
          <button type="button" class="ai-bot-icon-btn" title="Close" id="ai-bot-btn-close">✕</button>
        </div>
      </div>

      <div class="ai-bot-messages" id="ai-bot-messages-wrap"></div>

      <div class="ai-bot-chips-bar" id="ai-bot-chips-bar">
        <button type="button" class="ai-bot-chip" onclick="window.askChatbotQuick('What is Dipole?')">📖 Dipole</button>
        <button type="button" class="ai-bot-chip" onclick="window.askChatbotQuick('What is Sensible Heat Flux?')">☀️ Sensible Heat Flux</button>
        <button type="button" class="ai-bot-chip" onclick="window.askChatbotQuick('What is Sen\\'s Slope?')">📈 Sen's Slope</button>
        <button type="button" class="ai-bot-chip" onclick="window.askChatbotQuick('What is p-value?')">🎯 p-value</button>
        <button type="button" class="ai-bot-chip" onclick="window.askChatbotQuick('What is NDVI?')">🌱 NDVI</button>
        <button type="button" class="ai-bot-chip" onclick="window.askChatbotQuick('What is SMAP?')">🛰️ SMAP Radar</button>
        <button type="button" class="ai-bot-chip" onclick="window.askChatbotQuick('What is MODIS?')">🌡️ MODIS Heat</button>
        <button type="button" class="ai-bot-chip" onclick="window.askChatbotQuick('What is Deseasonalized Anomaly?')">📉 Deseasonalized</button>
        <button type="button" class="ai-bot-chip" onclick="window.askChatbotQuick('What is Adaptation Matrix?')">📋 Adaptation Matrix</button>
        <button type="button" class="ai-bot-chip" onclick="window.askChatbotQuick('What is Flash Drought?')">🌾 Flash Drought</button>
        <button type="button" class="ai-bot-chip" onclick="window.askChatbotQuick('Compare Rajasthan vs Kerala')">⚖️ Rajasthan vs Kerala</button>
      </div>

      <div class="ai-bot-input-area">
        <input type="text" class="ai-bot-input" id="ai-bot-user-input" placeholder="Search climate data analysis, state trends, comparisons..." autocomplete="off" />
        <button type="button" class="ai-bot-send-btn" id="ai-bot-send-btn" title="Send message">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    `;

    document.body.appendChild(botDrawer);

    // D. Elements & Event Bindings
    messagesContainer = document.getElementById('ai-bot-messages-wrap');
    inputField = document.getElementById('ai-bot-user-input');
    sendButton = document.getElementById('ai-bot-send-btn');

    const closeBtn = document.getElementById('ai-bot-btn-close');
    if (closeBtn) closeBtn.onclick = closeChatbot;
    const clearBtn = document.getElementById('ai-bot-btn-clear');
    if (clearBtn) clearBtn.onclick = clearConversation;

    if (sendButton) sendButton.onclick = handleUserSend;
    if (inputField) {
      inputField.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleUserSend();
        }
      });
    }

    // Load initial or restored conversation
    loadConversation();
    renderAllMessages();
  }

  // 8. RENDER MESSAGES WITH MARKDOWN & 1-CLICK ACTION CARDS
  function formatMarkdownText(text) {
    if (!text) return '';
    let html = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Convert Markdown Tables (| header | ... |)
    html = html.replace(/((?:\|[^\n]+\|\r?\n?)+)/g, function(tableBlock) {
      const rows = tableBlock.trim().split(/\r?\n/).filter(r => r.trim().startsWith('|'));
      if (rows.length < 2) return tableBlock;
      let out = '<div style="overflow-x:auto; margin:10px 0;"><table style="width:100%; border-collapse:collapse; font-size:12px; background:#f8fafc; border-radius:8px; overflow:hidden; border:1.5px solid rgba(16,185,129,0.25);">';
      let isFirst = true;
      rows.forEach(rowStr => {
        if (rowStr.includes('---')) return; // skip separator row
        const cells = rowStr.split('|').slice(1, -1);
        const tag = isFirst ? 'th' : 'td';
        const rowStyle = isFirst
          ? 'background:#e6fffa; color:#0f766e; font-weight:700; border-bottom:1.5px solid rgba(16,185,129,0.3);'
          : 'border-bottom:1px solid rgba(226,232,240,0.85); color:#1e293b;';
        out += `<tr style="${rowStyle}">`;
        cells.forEach(c => {
          out += `<${tag} style="padding:7px 11px; text-align:left;">${c.trim()}</${tag}>`;
        });
        out += '</tr>';
        isFirst = false;
      });
      out += '</table></div>';
      return out;
    });

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Bullet lists
    html = html.replace(/^\s*[-•]\s+(.*)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/s, '<ul style="margin:6px 0; padding-left:18px;">$1</ul>');
    // Horizontal rule
    html = html.replace(/---/g, '<hr style="border:none; border-top:1px solid rgba(148, 163, 184, 0.25); margin:12px 0;" />');
    // Linebreaks
    html = html.replace(/\n\n/g, '<br/><br/>').replace(/\n/g, '<br/>');

    // STRICT SANITIZATION: If a COMPARE action is present, strip out ANY VIEW_STATE tag so map option NEVER appears on comparison
    if (html.includes('[ACTION:COMPARE:')) {
      html = html.replace(/\[ACTION:VIEW_STATE:[^\]]+\]/g, '');
    }

    // Parse Actions: [ACTION:VIEW_STATE:StateName] -> Generates 1-Click Primary Action Card (Only if NO comparison)
    if (!html.includes('[ACTION:COMPARE:')) {
      html = html.replace(/\[ACTION:VIEW_STATE:([^\]]+)\]/g, function(match, stateName) {
        const cleanState = stateName.trim();
        return `<div class="ai-bot-action-group">
          <div class="ai-bot-action-prompt-text">
            📊 <strong>Would you like to explore ${cleanState} on the live forensic map and time-series charts?</strong><br>
            Click below to jump directly to the dashboard:
          </div>
          <button type="button" class="ai-bot-action-primary" onclick="window.triggerBotAction('VIEW_STATE', '${cleanState}')">
            🚀 1-Click: Open ${cleanState} Map, Graphs & Forensic Analysis
          </button>
        </div>`;
      });
    }

    // Parse Actions: [ACTION:COMPARE:StateA:StateB] -> Generates 1-Click Dual Comparison Action Card
    html = html.replace(/\[ACTION:COMPARE:([^:]+):([^\]]+)\]/g, function(match, stateA, stateB) {
      const cleanA = stateA.trim();
      const cleanB = stateB.trim();
      return `<div class="ai-bot-action-group">
        <div class="ai-bot-action-prompt-text">
          ⚖️ <strong>Would you like to compare ${cleanA} vs ${cleanB} on the Dual Comparison Dashboard?</strong><br>
          Click below to open side-by-side comparison charts:
        </div>
        <button type="button" class="ai-bot-action-primary" style="background: linear-gradient(135deg, #0f766e 0%, #2563eb 100%);" onclick="window.triggerBotAction('COMPARE', '${cleanA}', '${cleanB}')">
          ⚖️ 1-Click: Compare ${cleanA} vs ${cleanB} on Dual Dashboard
        </button>
      </div>`;
    });

    return html;
  }

  function renderAllMessages() {
    if (!messagesContainer) return;
    messagesContainer.innerHTML = '';

    conversationMessages.forEach(msg => {
      const row = document.createElement('div');
      row.className = `ai-bot-msg-row ${msg.sender}`;

      if (msg.sender === 'bot') {
        row.innerHTML = `
          <div class="ai-bot-msg-avatar">${ROBOT_ICON_SVG}</div>
          <div class="ai-bot-msg-bubble">${formatMarkdownText(msg.text)}</div>
        `;
      } else {
        row.innerHTML = `
          <div class="ai-bot-msg-bubble">${formatMarkdownText(msg.text)}</div>
        `;
      }
      messagesContainer.appendChild(row);
    });

    scrollToBottom();
  }

  function scrollToBottom() {
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }

  function showTypingIndicator() {
    const typingRow = document.createElement('div');
    typingRow.id = 'ai-bot-typing-row';
    typingRow.className = 'ai-bot-msg-row bot';
    typingRow.innerHTML = `
      <div class="ai-bot-msg-avatar">${ROBOT_ICON_SVG}</div>
      <div class="ai-bot-msg-bubble">
        <div class="ai-bot-typing">
          <div class="ai-bot-typing-dot"></div>
          <div class="ai-bot-typing-dot"></div>
          <div class="ai-bot-typing-dot"></div>
          <span style="font-size:11.5px; color:#0f766e; font-weight:600; margin-left:6px;">Analyzing climate trends...</span>
        </div>
      </div>
    `;
    messagesContainer.appendChild(typingRow);
    scrollToBottom();
  }

  function removeTypingIndicator() {
    const el = document.getElementById('ai-bot-typing-row');
    if (el) el.remove();
  }

  // 9. GEMINI SYSTEM INSTRUCTION GENERATOR
  function buildSystemInstruction() {
    return `You are "BNR Trend Detective AI", an expert interactive climate co-pilot for the BNR EarthScope Trend Detective web platform.
Your objective is to provide simple, easy-to-understand climate and meteorological data analysis for Indian states, cities, and regions.

CRITICAL RULES:
1. EXTREMELY SIMPLE & EASY TO UNDERSTAND: Avoid heavy academic jargon. Explain everything in clear, friendly bullet points that any everyday person or student can understand immediately.
2. ALL HARD WORDS, DICTIONARY TERMS & WEBSITE KEY WORDS:
   Whenever the user asks for the meaning of ANY hard word, scientific dictionary term, or website key word (e.g. Dipole, Sensible Heat Flux, Decadal Spread, Radiative Cooling, Adaptation Matrix, Theil-Sen's Slope, p-value / Significance, NDVI, SMAP, MODIS, GPM IMERG, GLDAS, Deseasonalized Anomaly, Flash Drought, Wet-Bulb, Albedo, EcoTimeline, Orbit View, API Key, SI Declaration, etc.):
   Always explain it with a SHORT, VERY EASY meaning in everyday plain language and a relatable real-life example or metaphor (like video games, doctor visits, coin tosses, or child coats).
2. STRICT REFUSAL POLICY (ABUSE / IRRELEVANT):
   - If the user input contains any abuse, profanity, vulgarity, offensive language, or is irrelevant / off-topic (e.g. movies, entertainment, sports, politics, coding, recipes, romance, personal questions, general trivia not about climate/geography), you MUST reply ONLY with this exact sentence:
   "Sorry, I can't help you regarding this."
   - Do NOT add any preamble, greeting, explanation, apology, or action tags.
3. COMPARISON RULES:
   - When the user asks to compare two regions (e.g. "compare A and B", "A vs B"):
   - Conclude ONLY with the 1-click action tag: [ACTION:COMPARE:LocationA:LocationB].
   - NEVER include [ACTION:VIEW_STATE:...], and NEVER offer map exploration options on a comparison response!
4. SINGLE LOCATION RULES:
   - For a single location query, conclude ONLY with [ACTION:VIEW_STATE:LocationName].
5. LANGUAGE:
   - If the user asks in Hindi or Hinglish, respond in simple Roman Hinglish.
   - If the user asks in English, respond in simple English.
6. STRUCTURE:
   - 1 simple line introducing the location.
   - 3 simple bullet points: Temperature, Rainfall, and Main Risk.
   - A short "In Plain Words" / "Asaan Bhasha Mein" section.
   - Conclude with the appropriate 1-click action tag.`;
  }

  // Helper: Detect Hinglish / Hindi query phrasing
  function detectHinglish(q) {
    const hindiWords = [
      'hindi', 'hinglish', 'mujhe', 'batao', 'bataiye', 'karo', 'karein',
      'kya', 'kaise', 'kyun', 'chahiye', 'chahie', 'hai', 'hain', 'mein',
      'dedo', 'kardo', 'dijiye', 'samjhao', 'dikhao', 'kaisa', 'kaisi',
      'kuch', 'hoga', 'hogi', 'raha', 'rahi'
    ];
    const words = (q || '').toLowerCase().split(/[\s,?.!]+/);
    for (let i = 0; i < words.length; i++) {
      if (hindiWords.indexOf(words[i]) !== -1) return true;
    }
    if (/\b(data|analysis|info)\s+do\b/i.test(q)) return true;
    return false;
  }

  // Comprehensive Knowledge Base (Simple, Easy to Understand)
  const SIMPLE_LOCATION_DB = {
    nainital: {
      name: 'Nainital',
      icon: '🏔️',
      type: 'Hill Station & Lake Town (~2,000m)',
      descHi: 'Nainital Uttarakhand ka ek sundar pahadi shehar hai jo lagbhag 2,000 meter ki unchai par sthit hai.',
      descEn: 'Nainital is a famous hill station and lake town in Uttarakhand situated at ~2,000 meters elevation.',
      tempHi: '+0.34°C har 10 saal mein badh raha hai. Pehle ke mukable ab sardiyon mein barf (snow) kam padti hai.',
      tempEn: 'Warming by +0.34°C every 10 years. Winter snowfall has noticeably decreased over time.',
      rainHi: 'Baarish ka pattern badal gaya hai — halki baarish ke bajaye achanak bohot tez baarish (cloudburst) hoti hai.',
      rainEn: 'Precipitation now arrives in short, sudden heavy bursts (cloudbursts) rather than gentle seasonal showers.',
      riskHi: 'Bohot tez baarish ke waqt pahadon se mitti khisakna (Landslides) aur sadak band hona.',
      riskEn: 'Steep slope landslides and road blockages during extreme downpours.',
      summaryHi: '1. Pahad plains ke mukable zyada tezi se garm ho rahe hain, jisse winter season chhota ho raha hai.\n2. Thode waqt mein bohot sara paani girne se pahad fisalne (landslide) ka khatra rehta hai.',
      summaryEn: '1. The mountain area is warming faster than the plains below, shortening the winter freeze.\n2. Sudden torrential rain dumps excess water quickly, increasing the risk of landslides along valley slopes.',
      shortHi: 'Pahadi lake town (~2,000m) jahan cloudbursts aur landslides ka khatra rehta hai.',
      shortEn: 'High-altitude lake hill station (~2,000m) vulnerable to sudden cloudbursts and landslides.'
    },
    bhimtal: {
      name: 'Bhimtal',
      icon: '🏞️',
      type: 'Kumaon Lake Valley (~1,370m)',
      descHi: 'Bhimtal Nainital district ki ek mashhoor lake valley hai jo lagbhag 1,370 meter ki unchai par sthit hai.',
      descEn: 'Bhimtal is a scenic mountain lake valley in Nainital district located at ~1,370 meters elevation.',
      tempHi: '+0.34°C har 10 saal mein warming ho rahi hai.',
      tempEn: '+0.34°C warming every 10 years along the mountain slopes.',
      rainHi: 'Yahan baadal pahadon se takra kar achanak 1-2 ghante mein bohot tez baarish dump karte hain.',
      rainEn: 'Warm moisture hits the hills abruptly, dumping over 100 mm of intense rain within 1–2 hours.',
      riskHi: 'Pahadi dhalano se tezi se paani behna aur mitti fisalna (Landslides).',
      riskEn: 'High-velocity runoff, debris torrents, and lake siltation.',
      summaryHi: '1. Garam hawa pahadon se takra kar achanak cloudburst banati hai.\n2. Tez paani ke bahav se dhalano ki mitti kamzor ho jati hai.',
      summaryEn: '1. Mountain barrier cools air quickly, triggering sudden cloudburst showers.\n2. Steep slopes face topsoil erosion and debris flows.',
      shortHi: 'Mid-mountain lake basin (~1,370m) jahan cloudburst aur tez runoff ka khatra hota hai.',
      shortEn: 'Mid-Himalayan lake basin (~1,370m) facing convective cloudburst downpours.'
    },
    kashipur: {
      name: 'Kashipur',
      icon: '🏭',
      type: 'Tarai Alluvial Plain (~240m)',
      descHi: 'Kashipur Uttarakhand ke Udham Singh Nagar district ka ek agricultural aur industrial shehar hai (~240m unchai).',
      descEn: 'Kashipur is an agricultural and industrial plain city in Udham Singh Nagar district at ~240 meters elevation.',
      tempHi: '+0.31°C har 10 saal mein badh raha hai. Garmiyon mein tez dhoop aur loo chalti hai.',
      tempEn: '+0.31°C warming per decade, causing hotter and longer summer heatwaves.',
      rainHi: 'Monsoon baarish mein kami aayi hai (-22 mm har decade). Baarish ke beech 15-20 din ka lamba sukha padta hai.',
      rainEn: 'Monsoon rainfall has declined by -22 mm/decade, with extended 15-day dry breaks between showers.',
      riskHi: 'Zameen ka paani (Groundwater) tezi se neeche jana aur faslon mein sukha padna.',
      riskEn: 'Deep groundwater overdraft from industrial and paddy tubewell pumping.',
      summaryHi: '1. Kashipur pahadon ke niche plain ilaqe mein hai, isliye yahan garmi zyada lagti hai.\n2. Baarish kam hone aur tubewell chalne se groundwater level gir raha hai.',
      summaryEn: '1. Located on the flat plains, Kashipur suffers from heatwave traps and seasonal dry spells.\n2. Heavy tube-well water pumping for farming and industry is depleting underground water reserves.',
      shortHi: 'Tarai flat plain (~240m) jahan groundwater depletion aur sukhe ka samna karna padta hai.',
      shortEn: 'Tarai plain (~240m) suffering from dry spells and groundwater overdraft.'
    },
    uttarakhand: {
      name: 'Uttarakhand',
      icon: '🏔️',
      type: 'Western Himalayan State',
      descHi: 'Uttarakhand ek Himalayan pahadi rajya hai jahan pahad plains ke mukable zyada tezi se garm ho rahe hain.',
      descEn: 'Uttarakhand is a Himalayan mountain state where high mountain slopes are warming faster than the plains below.',
      tempHi: '+0.34°C har 10 saal mein (Pahadon par tez garmi). Glaciers waqt se pehle pighal rahe hain.',
      tempEn: '+0.34°C warming per decade, reducing seasonal winter snow and receding glaciers.',
      rainHi: 'Halki baarish kam ho gayi hai, jabki 1-2 ghante mein 100 mm se zyada tez cloudbursts badh gaye hain.',
      rainEn: 'Gentle steady rains have declined, while extreme convective cloudbursts (>100 mm in 1–2 hours) have surged.',
      riskHi: 'Achanak baadh (Flash Floods) aur Landslides, khas kar river valleys mein.',
      riskEn: 'Catastrophic flash floods, debris flows, and landslides in steep mountain river valleys.',
      summaryHi: '1. Pahad tezi se garm ho rahe hain aur sardiyon mein snow kam pad rahi hai.\n2. Achanak baadal fatne se pahadi raaste aur river basins prabhavit hote hain.',
      summaryEn: '1. Himalayan slopes are heating up, shrinking snowpack and melting glaciers early.\n2. Violent cloudbursts trigger flash flooding and road blockages across mountain highways.',
      shortHi: 'Western Himalayas jahan accelerated warming, cloudbursts aur flash floods ka khatra hai.',
      shortEn: 'Himalayan state experiencing elevation warming, violent cloudbursts, and landslides.'
    },
    rajasthan: {
      name: 'Rajasthan',
      icon: '🌵',
      type: 'Thar Desert & Northwest Arid Region',
      descHi: 'Rajasthan desh ka sabse bada arid rajya hai jahan sooraj ki tez garmi ret ko bohot garm kar deti hai.',
      descEn: 'Rajasthan is India’s arid northwest state where dry sand and sparse vegetation lead to intense solar heating.',
      tempHi: '+0.38°C har 10 saal mein (Poore desh mein sabse tez surface warming).',
      tempEn: '+0.38°C per decade (The fastest land surface warming rate in India).',
      rainHi: 'Baarish bohot kam aur aniyamit hoti hai. Achanak bina mausam ke tez desert downpours aate hain.',
      rainEn: 'Highly erratic inter-annual rainfall with sudden, unseasonal desert downpours.',
      riskHi: 'Khatarnak heatwaves (>48°C), reteli zameen ka sukha aur paani ki kami.',
      riskEn: 'Severe hyper-arid heatwaves (>48°C) and acute groundwater drawdown.',
      summaryHi: '1. Sukhi ret dhoop se jaldi garam ho jati hai, jisse daytime temperature 50°C cross kar jata hai.\n2. Kheti ke liye underground water table bohot tezi se neeche ja raha hai.',
      summaryEn: '1. Dry quartz sand directly converts solar rays into sensible heat, pushing day temperatures past 50°C.\n2. Agricultural tube-wells face severe water drawdown as natural recharge remains slow.',
      shortHi: 'Thar desert jahan desh ki sabse tez garmi (+0.38°C/dec) aur heatwaves hoti hain.',
      shortEn: 'Thar desert zone with India’s highest warming rate (+0.38°C/dec) and acute heat stress.'
    },
    uttar_pradesh: {
      name: 'Uttar Pradesh',
      icon: '🌾',
      type: 'Indo-Gangetic Plain Basin',
      descHi: 'Uttar Pradesh Indo-Gangetic maidan ka hissa hai jahan kheti ke liye monsoon bohot zaroori hota hai.',
      descEn: 'Uttar Pradesh occupies the fertile Indo-Gangetic Plains where agriculture depends heavily on seasonal monsoon rains.',
      tempHi: '+0.28°C har 10 saal mein warming ho rahi hai.',
      tempEn: '+0.28°C warming per decade, causing intense pre-monsoon heat.',
      rainHi: 'Monsoon baarish mein -28 mm (-8.2%) ki kami aayi hai. Baarish ke beech 15-20 din ka lamba sukha gap rehta hai.',
      rainEn: '-28 mm/decade (-8.2%) structural decline in monsoon rains, with 15–20 day dry intervals.',
      riskHi: 'Kheti mein sukha (Crop drought) aur high humidity ke sath dangerous heat stress.',
      riskEn: 'Agricultural crop drought and severe pre-monsoon wet-bulb humid heat stress.',
      summaryHi: '1. Baarish roz thodi-thodi hone ke bajaye lambe sukhe ke baad achanak tez hoti hai.\n2. Hawa mein zyada nami aur tez dhoop milkar outdoor kaam karna mushkil bana dete hain.',
      summaryEn: '1. Monsoon rains are compressed into fewer days, creating long dry gaps that stress crops.\n2. Dense humidity combined with high summer heat produces elevated physiological heat stress.',
      shortHi: 'Gangetic plains jahan monsoon baarish mein -8.2% kami aur 15 din ke sukhe gap aate hain.',
      shortEn: 'Gangetic plains facing monsoon rainfall decline and prolonged agricultural dry spells.'
    },
    kerala: {
      name: 'Kerala',
      icon: '🌊',
      type: 'Western Ghats & Coastal Belt',
      descHi: 'Kerala samandar ke kinare aur Western Ghats pahadon ke beech basa ek hari-bhari rajya hai.',
      descEn: 'Kerala is situated along the Arabian Sea and the lush Western Ghats mountain ridge.',
      tempHi: '+0.22°C har 10 saal mein warming.',
      tempEn: '+0.22°C warming per decade.',
      rainHi: '+42 mm har decade tez baarish mein badhotari (Torrential mountain showers).',
      rainEn: '+42 mm/decade increase in torrential orographic cloudbursts.',
      riskHi: 'Pahadon par Landslides (jaise Wayanad) aur shehron mein achanak paani bharna.',
      riskEn: 'Dangerous mountain landslides and high coastal wet-bulb heat stress.',
      summaryHi: '1. Samandar ki nam hawa pahadon se takra kar bohot bhari baarish karti hai.\n2. Isse pahadi dhalano par landslides aur roads block hone ka khatra rehta hai.',
      summaryEn: '1. Humid ocean winds strike mountain cliffs, unloading massive rainfall downpours.\n2. Steep slopes face severe landslide hazards and coastal flooding.',
      shortHi: 'Western Ghats jahan bohot tez baarish (+42 mm/dec) aur landslides ka khatra hai.',
      shortEn: 'Western Ghats coastal belt with heavy orographic rains and landslide hazards.'
    },
    vidarbha: {
      name: 'Vidarbha',
      icon: '🚜',
      type: 'Maharashtra Central Farmlands',
      descHi: 'Vidarbha Maharashtra ka central farming ilaaqa hai jahan cotton aur soybean ki kheti hoti hai.',
      descEn: 'Vidarbha is Maharashtra’s central agricultural belt known for rain-fed cotton and soybean crops.',
      tempHi: '+0.31°C har 10 saal mein badh raha hai.',
      tempEn: '+0.31°C warming per decade.',
      rainHi: '-34 mm har 10 saal mein monsoon baarish kam ho rahi hai.',
      rainEn: '-34 mm/decade drop in seasonal monsoon rainfall.',
      riskHi: 'Mitti ka sukha (Crop flash drought) aur kisanon ki faslein sookhna.',
      riskEn: 'Rapid soil moisture exhaustion and acute rain-fed crop drought.',
      summaryHi: '1. Monsoon ke dauran 2-3 hafte tak baarish na hone se mitti ka paani khatam ho jata hai.\n2. Isse kisanon ki faslon ko kafi nuksan hota hai.',
      summaryEn: '1. Sudden 15–20 day rainless breaks during mid-monsoon deplete topsoil root moisture.\n2. Rainfed soybean and cotton crops face widespread canopy drying.',
      shortHi: 'Central farmlands jahan monsoon kami (-34 mm/dec) se faslon mein sukha padta hai.',
      shortEn: 'Rain-fed farmlands facing sharp monsoon deficits and agricultural drought.'
    },
    delhi: {
      name: 'Delhi',
      icon: '🏙️',
      type: 'National Capital Region (NCR)',
      descHi: 'Delhi desh ki rajdhani hai jahan concrete aur sadkon ki wajah se garmi raat mein bhi bani rehti hai.',
      descEn: 'Delhi (NCR) experiences an intense Urban Heat Island effect due to dense concrete and asphalt.',
      tempHi: '+0.35°C har 10 saal mein warming.',
      tempEn: '+0.35°C warming per decade.',
      rainHi: 'Baarish aniyamit hai — thode waqt mein tez baarish hone par sadkon par paani bhar jata hai.',
      rainEn: 'Highly erratic downpours causing sudden urban waterlogging and drainage overflows.',
      riskHi: 'Summer mein record tod heatwave (>49°C) aur pollution trapping.',
      riskEn: 'Extreme summer heat domes exceeding 49°C and dangerous wet-bulb stress.',
      summaryHi: '1. Concrete aur vehicles ki wajah se Delhi raat mein bhi thandi nahi ho pati (Heat Island).\n2. Summer mein temperature 48°C-49°C cross kar jata hai.',
      summaryEn: '1. Urban built-up mass traps solar heat, preventing night-time cooling.\n2. Daytime summer peaks cross 48°C–49°C, straining power and water systems.',
      shortHi: 'Urban Heat Island jahan 49°C tak garmi aur flash waterlogging hoti hai.',
      shortEn: 'Urban megacity facing severe heat domes (>49°C) and flash monsoon runoff.'
    },
    punjab: {
      name: 'Punjab',
      icon: '🌾',
      type: 'Indo-Gangetic Breadbasket Plain',
      descHi: 'Punjab desh ka anndaata hai jahan gehun aur dhaan ki kheti bade paimane par hoti hai.',
      descEn: 'Punjab is India’s major agricultural breadbasket plain known for intensive wheat and paddy farming.',
      tempHi: '+0.30°C har 10 saal mein warming.',
      tempEn: '+0.30°C warming per decade.',
      rainHi: '-18 mm har 10 saal mein monsoon kami.',
      rainEn: '-18 mm/decade drop in seasonal monsoon rainfall.',
      riskHi: 'Kheti ke liye zameen ka paani (Groundwater) bohot tezi se kam hona.',
      riskEn: 'Severe deep-aquifer depletion due to heavy tube-well pumping for paddy crops.',
      summaryHi: '1. Baarish kam hone aur tubewell chalne se groundwater water table neeche ja raha hai.\n2. March-April mein achanak garmi badhne se gehun ki fasal par asar padta hai.',
      summaryEn: '1. Groundwater tables are dropping fast as irrigation pumping exceeds natural recharge.\n2. Early spring heat spikes directly reduce wheat grain weight.',
      shortHi: 'Agri plain jahan deep groundwater depletion aur heatwaves ka asar hai.',
      shortEn: 'Agricultural belt experiencing deep groundwater exhaustion and heat stress.'
    },
    himachal: {
      name: 'Himachal Pradesh',
      icon: '🏔️',
      type: 'Western Himalayan Mountain State',
      descHi: 'Himachal Pradesh pahadon aur valleys se bhara rajya hai jahan tezi se warming ho rahi hai.',
      descEn: 'Himachal Pradesh is a mountainous state witnessing rapid mountain warming and changing snowfall patterns.',
      tempHi: '+0.33°C har 10 saal mein warming.',
      tempEn: '+0.33°C warming per decade.',
      rainHi: 'Sardiyon mein snowfall kam ho rahi hai, jabki monsoon mein cloudbursts badh gaye hain.',
      rainEn: 'Noticeable drop in winter snow cover; sharp rise in localized monsoon cloudbursts.',
      riskHi: 'Beas aur Satluj valleys mein achanak baadh (Flash Floods) aur landslides.',
      riskEn: 'Violent river flash floods and widespread mountain slope landslides.',
      summaryHi: '1. Pahadon par garmi badhne se winter snow jaldi pighal rahi hai.\n2. Baadal fatne se pahadi raaste aur nadiyan ufaan par aa jati hain.',
      summaryEn: '1. Rising temperatures accelerate snowmelt and shorten winter ski and apple seasons.\n2. Convective cloudbursts trigger destructive flash floods along mountain rivers.',
      shortHi: 'Himalayan state jahan cloudbursts, flash floods aur snow kami ka asar hai.',
      shortEn: 'Mountain state facing cloudburst floods, snow decline, and slope erosion.'
    }
  };

  // Aliases mapping common spellings, districts & variations to knowledge keys
  const LOCATION_ALIASES = {
    nanital: 'nainital',
    nainital: 'nainital',
    'naini tal': 'nainital',
    'nani tal': 'nainital',
    naynital: 'nainital',
    bhimtal: 'bhimtal',
    bheemtal: 'bhimtal',
    'bhim tal': 'bhimtal',
    'bheem tal': 'bhimtal',
    kashipur: 'kashipur',
    kasipur: 'kashipur',
    kashipoor: 'kashipur',
    kasipoor: 'kashipur',
    kashipura: 'kashipur',
    kasipura: 'kashipur',
    dehradun: 'uttarakhand',
    dehradoon: 'uttarakhand',
    doon: 'uttarakhand',
    haridwar: 'uttarakhand',
    hardwar: 'uttarakhand',
    rishikesh: 'uttarakhand',
    roorkee: 'uttarakhand',
    haldwani: 'nainital',
    rudrapur: 'kashipur',
    pantnagar: 'kashipur',
    kedarnath: 'uttarakhand',
    badrinath: 'uttarakhand',
    almora: 'nainital',
    pithoragarh: 'uttarakhand',
    uttarakhand: 'uttarakhand',
    uttrakhand: 'uttarakhand',
    utrakhand: 'uttarakhand',
    uk: 'uttarakhand',
    himalaya: 'uttarakhand',
    himalayas: 'uttarakhand',
    rajasthan: 'rajasthan',
    rajastan: 'rajasthan',
    rajsthan: 'rajasthan',
    jaipur: 'rajasthan',
    jodhpur: 'rajasthan',
    jaisalmer: 'rajasthan',
    bikaner: 'rajasthan',
    udaipur: 'rajasthan',
    thar: 'rajasthan',
    kota: 'rajasthan',
    barmer: 'rajasthan',
    phalodi: 'rajasthan',
    'uttar pradesh': 'uttar_pradesh',
    uttarpradesh: 'uttar_pradesh',
    up: 'uttar_pradesh',
    lucknow: 'uttar_pradesh',
    kanpur: 'uttar_pradesh',
    varanasi: 'uttar_pradesh',
    banaras: 'uttar_pradesh',
    kashi: 'uttar_pradesh',
    prayagraj: 'uttar_pradesh',
    allahabad: 'uttar_pradesh',
    agra: 'uttar_pradesh',
    noida: 'uttar_pradesh',
    ghaziabad: 'uttar_pradesh',
    meerut: 'uttar_pradesh',
    bareilly: 'uttar_pradesh',
    gorakhpur: 'uttar_pradesh',
    ayodhya: 'uttar_pradesh',
    kerala: 'kerala',
    kerla: 'kerala',
    keral: 'kerala',
    kochi: 'kerala',
    cochin: 'kerala',
    wayanad: 'kerala',
    munnar: 'kerala',
    thiruvananthapuram: 'kerala',
    vidarbha: 'vidarbha',
    vidharbha: 'vidarbha',
    vidharbh: 'vidarbha',
    vidarbh: 'vidarbha',
    maharashtra: 'vidarbha',
    mumbai: 'vidarbha',
    bombay: 'vidarbha',
    pune: 'vidarbha',
    nagpur: 'vidarbha',
    delhi: 'delhi',
    dilli: 'delhi',
    ncr: 'delhi',
    'new delhi': 'delhi',
    newdelhi: 'delhi',
    punjab: 'punjab',
    panjab: 'punjab',
    ludhiana: 'punjab',
    amritsar: 'punjab',
    himachal: 'himachal',
    'himachal pradesh': 'himachal',
    hp: 'himachal',
    shimla: 'himachal',
    manali: 'himachal'
  };

  // Helper: Extract location matches with exact and phonetic tolerance
  function extractLocationMatches(query) {
    const q = (query || '').toLowerCase().trim();
    if (!q) return [];

    const sortedAliases = Object.keys(LOCATION_ALIASES).sort((a, b) => b.length - a.length);
    const foundMatches = [];

    // 1. Exact alias match with word boundaries
    for (let i = 0; i < sortedAliases.length; i++) {
      const alias = sortedAliases[i];
      const escaped = alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const reg = new RegExp('(?:^|[^a-zA-Z0-9])(' + escaped + ')(?:$|[^a-zA-Z0-9])', 'ig');
      let match;
      while ((match = reg.exec(q)) !== null) {
        const key = LOCATION_ALIASES[alias];
        const pos = match.index;
        if (!foundMatches.some(m => m.key === key)) {
          foundMatches.push({ key: key, pos: pos, alias: alias });
        }
      }
    }

    // 2. Phonetic / Typo tolerance fallback (e.g. kasipur -> kashipur)
    if (foundMatches.length === 0) {
      const words = q.replace(/[^a-z0-9\s]/g, ' ').split(/\s+/);
      for (let w = 0; w < words.length; w++) {
        const word = words[w];
        if (word.length < 4) continue;
        const normS = word.replace(/sh/g, 's');
        for (let i = 0; i < sortedAliases.length; i++) {
          const alias = sortedAliases[i];
          if (alias.length < 4 || alias.includes(' ')) continue;
          const aliasNormS = alias.replace(/sh/g, 's');
          if (normS === aliasNormS) {
            const key = LOCATION_ALIASES[alias];
            if (!foundMatches.some(m => m.key === key)) {
              foundMatches.push({ key: key, pos: q.indexOf(word), alias: alias });
              break;
            }
          }
        }
      }
    }

    foundMatches.sort((a, b) => a.pos - b.pos);
    return foundMatches;
  }

  // Helper: Detect website / platform overview inquiries
  function isWebsiteOverviewQuery(query) {
    const norm = (query || '').toLowerCase().trim();
    const patterns = [
      /\b(website|platform|portal|project|system|tool)\s+(?:overview|summary|info|details|features)\b/i,
      /\b(?:overview|summary|details|features|explanation)\s+of\s+(?:the\s+|this\s+)?(?:website|platform|project|tool|system|app)\b/i,
      /\btell\s+me\s+(?:about\s+)?(?:the\s+|this\s+)?(?:website|platform|project|tool|app)(?:\s+overview)?\b/i,
      /\bwhat\s+is\s+(?:this\s+)?(?:website|platform|project|tool|system|earth\s*metrix|trend\s*detective)\b/i,
      /\bwhat\s+does\s+(?:this\s+)?(?:website|project|tool)\s+do\b/i,
      /\b(?:about|introduce)\s+(?:this\s+)?(?:website|platform|project|tool)\b/i,
      /\b(kya\s+hai\s+ye\s+website|website\s+ke\s+baare\s+mein|project\s+kya\s+hai)\b/i
    ];
    return patterns.some(p => p.test(norm));
  }

  // 9B. Comprehensive Abuse & Irrelevant Query Filter
  function checkAbuseOrIrrelevant(text) {
    const t = (text || '').toLowerCase().trim();
    if (!t) return false;

    // 1. Abuse / Profanity / Vulgarity / Offensive words (English & Hindi/Hinglish)
    const abusiveWords = [
      'abuse', 'fuck', 'fucking', 'fucked', 'fucker', 'fck', 'fuk',
      'shit', 'shitty', 'bitch', 'bastard', 'asshole', 'ass', 'dick', 'pussy',
      'idiot', 'stupid', 'dumb', 'moron', 'retard', 'loser',
      'chutiya', 'chutiye', 'chutya', 'bhenchod', 'behenchod', 'bc',
      'madarchod', 'maderchod', 'mc', 'gandu', 'gaandu', 'harami',
      'haramkhor', 'kamine', 'kamina', 'kamini', 'kaminey', 'saale', 'saala', 'saali',
      'bhosdi', 'bhosdike', 'bsdk', 'randi', 'lund', 'lauda', 'loda', 'chut',
      'tatte', 'tatti', 'bakwas', 'pagal', 'gadhe', 'gadha', 'kutta',
      'kutti', 'kutte', 'scam', 'hate', 'kill', 'die', 'murder', 'sex', 'porn',
      'nude', 'naked', 'bullshit', 'crap', 'cunt', 'slut', 'whore',
      'shut up', 'bhadwe', 'bhadwa', 'chup kar', 'chup ho ja',
      'bewakoof', 'ullu', 'chirkut', 'nonsense', 'fraud', 'cheat', 'fool', 'rubbish', 'suck', 'sucks'
    ];

    for (let i = 0; i < abusiveWords.length; i++) {
      const reg = new RegExp('(?:^|[^a-zA-Z0-9])' + abusiveWords[i].replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?:$|[^a-zA-Z0-9])', 'i');
      if (reg.test(t)) {
        return true;
      }
    }

    // 2. Irrelevant / Non-climate domains
    const irrelevantPatterns = [
      /\b(movie|film|cinema|actor|actress|bollywood|hollywood|netflix)\b/i,
      /\b(song|music|sing|singer|dance|mp3|video|youtube|reels?|tiktok)\b/i,
      /\b(joke|comedy|funny|meme|shayari|riddle)\b/i,
      /\b(cricket|ipl|football|messi|ronaldo|match\s*score|world\s*cup)\b/i,
      /\b(recipe|cook|cooking|food|pizza|burger|biryani|restaurant|swiggy|zomato)\b/i,
      /\b(election|vote|modi|rahul|bjp|congress|president|minister)\b/i,
      /\b(stock\s*market|crypto|bitcoin|trading|share\s*price|sensex|nifty|loan|insurance)\b/i,
      /\b(game|gaming|pubg|freefire|playstation|chess)\b/i,
      /\b(dating|girlfriend|boyfriend|love\s*me|marry\s*me|flirt|kiss)\b/i,
      /\b(write\s*code|write\s*python|debug|programming|solve\s*math|laptop\s*price)\b/i,
      /\b(musk|trump|biden|putin|ambani|adani|tata|gates|jobs|zuckerberg|bezos)\b/i,
      /\b(who\s*is\s+(?!the\s*(?:author|copilot|bot|assistant)|antigravity|bnr)[a-z]+)\b/i
    ];

    for (let i = 0; i < irrelevantPatterns.length; i++) {
      if (irrelevantPatterns[i].test(t)) {
        return true;
      }
    }

    // 3. Keyboard mashing & gibberish
    if (/(?:asdf|qwerty|zxcv|hjkl|poiuy)/i.test(t)) {
      return true;
    }
    if (/^[bcdfghjklmnpqrstvwxyz]{6,}$/i.test(t) || /^(.)\1{4,}$/i.test(t)) {
      return true;
    }
    const vowels = (t.match(/[aeiou]/gi) || []).length;
    if (t.length >= 8 && !t.includes(' ') && (vowels / t.length) < 0.15) {
      return true;
    }

    return false;
  }

  // Instant Knowledge Matcher (Fast 0.2s, Simple & Understandable)
  function checkInstantKnowledgeResponse(query) {
    const q = (query || '').toLowerCase().trim();
    if (!q) return null;

    // Check abuse / irrelevant words
    if (checkAbuseOrIrrelevant(q)) {
      return "Sorry, I can't help you regarding this.";
    }

    const isHinglish = detectHinglish(q);

    // 0. Check Website & Project Overview Inquiries
    if (isWebsiteOverviewQuery(q)) {
      if (isHinglish) {
        return `### 🌍 EARTH METRIX / Trend Detective — Website Overview

Yeh **EARTH METRIX / BNR Trend Detective** platform hai jo **31 saal (1995–2025) ke NASA satellite data** aur IMD baselines ka upayog karke pure Bharat ka mausam aur climate trend analysis karta hai.

---

### 🛰️ 3 Mukhya NASA Satellites:
• 🌧️ **NASA GPM IMERG:** Tez baarish aur pahadon mein baadal fatne (cloudbursts) ko track karta hai.
• ☀️ **MODIS (Terra/Aqua):** Zameen ki garmi aur 45°C+ heatwave loo ko measure karta hai.
• 🌱 **NASA SMAP:** Kheti ke liye mitti ki nami (soil moisture) aur achanak sukhe ka pata lagata hai.

---

### 🔍 Platform ke Mukhya Features:
1. **🌌 Orbit View:** 3D rotating Earth globe aur live satellite orbits ke sath poore desh mein koi bhi jagah search karne ka console.
2. **📊 Forensic Dashboard:** Interactive satellite map aur 31 saal ke climate charts (garmi, baarish, soil moisture).
3. **⚖️ Dual-Zone Compare:** Do alag-alag jagahon (jaise *Kashipur vs Bhimtal* ya *Rajasthan vs Kerala*) ka aamne-saamne comparison.
4. **🔮 EcoTimeline (2030–2050):** Aage aane wale dashakon mein temperature aur baarish ke badlaav ki prediction.
5. **🤖 AI Climate Co-Pilot:** Kisi bhi shehar ya climate topic par saral shabdon mein jankari lene ke liye aapka assistant.

[ACTION:VIEW_STATE:Uttarakhand]`;
      } else {
        return `### 🌍 EARTH METRIX / Trend Detective — Platform Overview

**BNR EarthScope Trend Detective** is an interactive climate intelligence system built with **31 continuous years (1995–2025) of NASA satellite observations** and IMD climatological baselines.

---

### 🛰️ The 3 Core NASA Satellite Missions:
• 🌧️ **NASA GPM IMERG:** Measures rainfall volatility, localized cloudbursts, and extended 15–20 day dry spells.
• ☀️ **Terra/Aqua MODIS:** Tracks land surface skin temperatures and pre-monsoon heatwaves (>45°C).
• 🌱 **NASA SMAP:** Monitors root-zone soil moisture to detect rapid agricultural flash droughts before crops wilt.

---

### 🔍 Key Features of This Platform:
1. **🌌 Orbit View (Space Console):** Realistic 3D rotating globe showing real-time satellite orbits, key state hotspots, and pan-India location search.
2. **📊 Forensic Dashboard:** Leaflet satellite maps, climate anomaly overlays, and 31-year time-series trend charts (Mann-Kendall & Sen's Slope analysis).
3. **⚖️ Comparative Dual-Zone Dashboard:** Side-by-side comparison of any two regions (e.g. *Kashipur vs Bhimtal*, *Rajasthan vs Kerala*) to explore climate dipoles.
4. **🔮 EcoTimeline Triad (1995 ➔ 2025 ➔ 2050):** Track historical baselines, current trends, and future SSP climate projections for 2030, 2040, and 2050.
5. **📖 Scientific Glossary:** 68-term interactive dictionary explaining concepts like NDVI, Wet-Bulb temperature, and Clausius-Clapeyron relation.

[ACTION:VIEW_STATE:Uttarakhand]`;
      }
    }

    // 1. Extract location matches with exact and phonetic tolerance
    const foundMatches = extractLocationMatches(q);
    const matchedKeys = foundMatches.map(m => m.key);

    const isComparisonQuery = matchedKeys.length >= 2 && (
      q.includes('compare') || q.includes(' vs ') || q.includes(' vs. ') || 
      q.includes('versus') || q.includes(' aur ') || q.includes(' and ')
    );

    if (isComparisonQuery) {
      const locA = SIMPLE_LOCATION_DB[matchedKeys[0]];
      const locB = SIMPLE_LOCATION_DB[matchedKeys[1]];
      if (locA && locB) {
        // Automatically make comparison credentials ready across Page 1 & Page 2 inputs
        const p1Inp1 = document.getElementById('compare-input-1');
        const p1Inp2 = document.getElementById('compare-input-2');
        const p2Inp1 = document.getElementById('page2-comp-input-1');
        const p2Inp2 = document.getElementById('page2-comp-input-2');
        if (p1Inp1) p1Inp1.value = locA.name;
        if (p1Inp2) p1Inp2.value = locB.name;
        if (p2Inp1) p2Inp1.value = locA.name;
        if (p2Inp2) p2Inp2.value = locB.name;

        if (isHinglish) {
          return `### ⚖️ Asaan Comparison: ${locA.name} vs ${locB.name}

Dono jagahon ke mausam aur khatre (risks) mein mukhya antar:

• 📍 **${locA.name} (${locA.type}):** ${locA.shortHi}
• 📍 **${locB.name} (${locB.type}):** ${locB.shortHi}

---

### 💡 Saral Bhasha Mein:
1. **${locA.name}** mein: ${locA.riskHi}
2. **${locB.name}** mein: ${locB.riskHi}

[ACTION:COMPARE:${locA.name}:${locB.name}]`;
        } else {
          return `### ⚖️ Simple Comparison: ${locA.name} vs ${locB.name}

Key differences in climate and risks between both areas:

• 📍 **${locA.name} (${locA.type}):** ${locA.shortEn}
• 📍 **${locB.name} (${locB.type}):** ${locB.shortEn}

---

### 💡 In Plain Words:
1. **${locA.name}:** Main threat is ${locA.riskEn}
2. **${locB.name}:** Main threat is ${locB.riskEn}

[ACTION:COMPARE:${locA.name}:${locB.name}]`;
        }
      }
    }

    // 2. Check for Single Location Query (e.g. "kasipur data overview", "give me nainital data")
    if (matchedKeys.length >= 1) {
      const loc = SIMPLE_LOCATION_DB[matchedKeys[0]];
      if (loc) {
        if (isHinglish) {
          return `### ${loc.icon} ${loc.name} Climate Analysis (Simple Summary)

${loc.descHi}

---

### 📊 Simple Climate Facts:
• 🌡️ **Temperature (Garmi):** ${loc.tempHi}
• 🌧️ **Rainfall (Baarish):** ${loc.rainHi}
• ⚠️ **Mukhya Khatra (Main Risk):** ${loc.riskHi}

---

### 💡 Asaan Bhasha Mein Samjhein:
${loc.summaryHi}

[ACTION:VIEW_STATE:${loc.name}]`;
        } else {
          return `### ${loc.icon} ${loc.name} Climate Analysis (Simple Summary)

${loc.descEn}

---

### 📊 Simple Climate Facts:
• 🌡️ **Temperature:** ${loc.tempEn}
• 🌧️ **Rainfall:** ${loc.rainEn}
• ⚠️ **Main Hazard:** ${loc.riskEn}

---

### 💡 In Plain Words:
${loc.summaryEn}

[ACTION:VIEW_STATE:${loc.name}]`;
        }
      }
    }

    // 3. Future 2040 and 2050 Projections
    if (q.includes('2040') || q.includes('2050') || q.includes('prediction') || q.includes('future') || q.includes('aage kya')) {
      if (isHinglish) {
        return `### 🔮 Future Climate Prediction for India (2030–2050)

NASA aur IPCC ke models ke mutabiq aage aane wale saalon mein mausam aisa rahega:

---

### 📊 Asaan Bhasha Mein Prediction:
• **2030 Tak:** Desh ka average temperature +0.7°C badhega; achanak tez baarish 12% zyada hogi.
• **2040 Tak:** Average garmi **+1.4°C** badh jayegi. Garmiyon mein loo (heatwave) ke din har saal 8 din zyada chalenge.
• **2050 Tak:** Garmi **+2.5°C** tak badh sakti hai. Coastal ilaqon mein bohot zyada humid garmi padegi aur kheti mein sukhe ki samasya badhegi.

[ACTION:VIEW_STATE:Rajasthan]`;
      } else {
        return `### 🔮 Future Climate Prediction for India (2030–2050)

Based on NASA and IPCC climate projections in simple plain terms:

---

### 📊 Outlook by Timeline:
• **By 2030:** Nationwide warming of +0.7°C, with a 12% rise in short-duration extreme downpours.
• **By 2040:** Average temperature rises **+1.4°C** above normal baseline, with +8 more heatwave days every year.
• **By 2050:** Warming reaches **+2.4°C to +2.6°C**, creating severe humid heat along coasts and frequent crop drought in central farmlands.

[ACTION:VIEW_STATE:Rajasthan]`;
      }
    }

    // 3b. Check General Dictionary / Glossary Inquiries
    if (q.includes('scientific terms') || q.includes('dictionary') || q.includes('glossary') || q.includes('scientific dictionary') || q.includes('all terms') || q.includes('shabdavali')) {
      if (isHinglish) {
        return `### 📚 Scientific Dictionary (68 Terms Included)

EarthScope platform mein **68 mukhya scientific aur remote sensing terms** shamil hain. Aap kisi bhi term ke baare mein saral bhasha mein pooch sakte hain!

---

### 🌟 Kuch Zaroori Terms:
• 🛰️ **NDVI (Plant Greenness):** Mitti aur fasalon ki hariyali napne ka formula.
• 📈 **Theil-Sen's Slope:** 31-saal ka sacha trend nikalne ka median statistical math.
• 🎯 **p-value (< 0.05):** Yeh batata hai ki badlaav sacha permanent trend hai ya sirf temporary mausam ka shor.
• 🌡️ **Deseasonalized Anomaly:** Har saal ke normal mausam ko hata kar sacha climate change dikhana.
• 💧 **SMAP Soil Moisture:** Mitti mein 1 meter gehraai tak jado'n ka paani.
• ☀️ **Wet-Bulb Temperature:** Humid garmi jisme shareer pasina chhod kar thanda nahi ho pata.

👉 *Aap kisi bhi term ka naam likhein (jaise "What is NDVI?" ya "Explain p-value") aur main turant aasan bhasha mein samjha dunga!*`;
      } else {
        return `### 📚 Scientific Dictionary (68 Terms Included)

EarthScope integrates a complete database of **68 remote sensing, climatological, and statistical terms**. You can ask about any term anytime!

---

### 🌟 Core Scientific Terms at a Glance:
• 🛰️ **NDVI (Normalized Difference Vegetation Index):** Measures vegetation vigor and crop health from red & near-infrared bands.
• 📈 **Theil-Sen's Median Slope:** The robust non-parametric rate of change across 31 years (unskewed by outliers).
• 🎯 **p-value (< 0.05):** Rigorous statistical threshold proving a confirmed permanent trend vs. natural weather noise.
• 🌡️ **Deseasonalized Anomaly:** Subtracts the 30-year climatological normal to isolate true climate change from seasonal cycles.
• 💧 **SMAP Root-Zone Soil Moisture:** Measures water in the top 1 meter of soil to detect agricultural flash droughts.
• ☀️ **Wet-Bulb Temperature:** Measures compound heat + humidity stress (threshold for human physiological cooling).

👉 *Type any specific term (e.g. "What is NDVI?", "Explain Sen's Slope", or "What is MODIS?") to get an instant breakdown with real-life examples!*`;
      }
    }

        // 4. Check Hard Words, Dictionary Words & Website Key Words (Instant Match)
    const dictMatch = findDictionaryMatch(q);
    if (dictMatch) {
      if (isHinglish) {
        const meaningHi = dictMatch.simpleMeaningHi || dictMatch.simpleMeaning;
        return `### 📖 **${dictMatch.term}** (${dictMatch.category})\n\n💡 **Asaan Matlab (Simple Meaning):**\n${meaningHi}\n\n🌍 **Real-Life Example:**\n${dictMatch.example}`;
      } else {
        return `### 📖 **${dictMatch.term}** (${dictMatch.category})\n\n💡 **Simple Meaning:**\n${dictMatch.simpleMeaning}\n\n🌍 **Real-Life Example:**\n${dictMatch.example}`;
      }
    }

    return null;
  }

  // 10. LOCAL FALLBACK ENGINE (High-speed, offline-capable)
  function generateLocalFallback(query) {
    if (checkAbuseOrIrrelevant(query)) {
      return "Sorry, I can't help you regarding this.";
    }

    const instant = checkInstantKnowledgeResponse(query);
    if (instant) return instant;

    const q = (query || '').toLowerCase().trim();
    if (!q || q === 'hello' || q === 'hi' || q === 'hey' || q === 'namaste' || q === 'greetings') {
      return `Hello! How can I help you today?`;
    }

    if (isWebsiteOverviewQuery(q)) {
      return checkInstantKnowledgeResponse('website overview');
    }

    const matches = extractLocationMatches(q);
    if (matches && matches.length > 0) {
      const locKey = matches[0].key;
      const loc = SIMPLE_LOCATION_DB[locKey];
      if (loc) {
        return checkInstantKnowledgeResponse(loc.name);
      }
    }

    if (detectHinglish(q)) {
      return `Main Bharat ke alag-alag sheharon aur rajyon (jaise Kashipur, Nainital, Bhimtal, Rajasthan, UP) ke 31-saal ke climate analysis ke liye design kiya gaya hoon. Aap kisi bhi jagah ka data pooch sakte hain, do jagahon ko compare kar sakte hain, ya "website overview" likhkar platform ke features dekh sakte hain.`;
    }

    return `I can help you explore 31-year climate trends across any state or city in India (such as Kashipur, Nainital, Bhimtal, Rajasthan, Uttar Pradesh). You can ask me for a city data analysis, compare two regions, or type "website overview" to explore all platform features.`;
  }

  // Detect state name ONLY in userQuery to guarantee accurate 1-click action button
  function ensureStateActionAttached(responseText, userQuery) {
    if (!responseText) return responseText;

    // If refusal message, NEVER attach any action
    if (responseText.includes("Sorry, I can't help you regarding this.")) {
      return "Sorry, I can't help you regarding this.";
    }

    const q = (userQuery || '').toLowerCase().trim();
    if (checkAbuseOrIrrelevant(q)) {
      return "Sorry, I can't help you regarding this.";
    }

    // If already has compare action, ensure NO view_state action exists
    if (responseText.includes('[ACTION:COMPARE:')) {
      return responseText.replace(/\[ACTION:VIEW_STATE:[^\]]+\]/g, '').trim();
    }

    // Check if query is asking for comparison
    const foundMatches = extractLocationMatches(q);
    const matchedKeys = foundMatches.map(m => m.key);

    const isComparisonQuery = matchedKeys.length >= 2 && (
      q.includes('compare') || q.includes(' vs ') || q.includes(' vs. ') || 
      q.includes('versus') || q.includes(' aur ') || q.includes(' and ') ||
      q.includes('antar') || q.includes('difference')
    );

    if (isComparisonQuery) {
      // Strip any view_state tag and ensure only compare tag is attached
      let clean = responseText.replace(/\[ACTION:VIEW_STATE:[^\]]+\]/g, '').trim();
      const locA = SIMPLE_LOCATION_DB[matchedKeys[0]];
      const locB = SIMPLE_LOCATION_DB[matchedKeys[1]];
      if (locA && locB && !clean.includes('[ACTION:COMPARE:')) {
        clean += `\n\n[ACTION:COMPARE:${locA.name}:${locB.name}]`;
      }
      return clean;
    }

    // If single location action already attached
    if (responseText.includes('[ACTION:VIEW_STATE:')) {
      return responseText;
    }

    if (matchedKeys.length >= 1) {
      const loc = SIMPLE_LOCATION_DB[matchedKeys[0]];
      if (loc && loc.name) {
        return responseText + `\n\n[ACTION:VIEW_STATE:${loc.name}]`;
      }
    }

    return responseText;
  }

  // 11. GEMINI API CALL HANDLER (Fast streamlined request)
  async function callGeminiAPI(userText) {
    const historyPayload = [];
    const recent = conversationMessages.slice(-4); // last 4 for faster context processing
    recent.forEach(m => {
      historyPayload.push({
        role: m.sender === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      });
    });

    historyPayload.push({
      role: 'user',
      parts: [{ text: userText }]
    });

    const bodyData = {
      system_instruction: {
        parts: [{ text: buildSystemInstruction() }]
      },
      contents: historyPayload,
      generationConfig: {
        temperature: 0.6,
        maxOutputTokens: 500
      }
    };

    const primaryUrl = `https://generativelanguage.googleapis.com/v1beta/models/${PRIMARY_MODEL}:generateContent?key=${GEMINI_API_KEY}`;
    
    // 5-second timeout controller so it never hangs
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000);

    try {
      const res = await fetch(primaryUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData),
        signal: controller.signal
      });
      clearTimeout(timer);

      if (!res.ok) {
        // Fallback model
        const fallbackUrl = `https://generativelanguage.googleapis.com/v1beta/models/${FALLBACK_MODEL}:generateContent?key=${GEMINI_API_KEY}`;
        const fallbackRes = await fetch(fallbackUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bodyData)
        });
        if (!fallbackRes.ok) throw new Error('Gemini API status ' + fallbackRes.status);
        const data = await fallbackRes.json();
        const raw = data.candidates[0].content.parts[0].text;
        if (raw.toLowerCase().includes("sorry, i can't help you") || raw.toLowerCase().includes("can't help you regarding this")) {
          return "Sorry, I can't help you regarding this.";
        }
        return ensureStateActionAttached(raw, userText);
      }

      const data = await res.json();
      if (data && data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0]) {
        const raw = data.candidates[0].content.parts[0].text;
        if (raw.toLowerCase().includes("sorry, i can't help you") || raw.toLowerCase().includes("can't help you regarding this")) {
          return "Sorry, I can't help you regarding this.";
        }
        return ensureStateActionAttached(raw, userText);
      }
      throw new Error('Invalid Gemini response format');
    } catch (err) {
      clearTimeout(timer);
      console.warn('[TrendDetectiveAI] Gemini API error/timeout, using smart fallback engine:', err);
      const fb = generateLocalFallback(userText);
      return ensureStateActionAttached(fb, userText);
    }
  }

  // 12. MESSAGE SENDING & HANDLING
  async function handleUserSend() {
    if (!inputField) return;
    const text = inputField.value.trim();
    if (!text) return;

    // Append user message
    inputField.value = '';
    sendButton.disabled = true;

    conversationMessages.push({
      id: 'msg-' + Date.now(),
      sender: 'user',
      text: text
    });
    saveConversation();
    renderAllMessages();

    // Show thinking indicator
    showTypingIndicator();

    // 1. FAST INTERCEPT FOR ABUSE / IRRELEVANT WORDS (Instant polite refusal)
    if (checkAbuseOrIrrelevant(text)) {
      setTimeout(() => {
        removeTypingIndicator();
        conversationMessages.push({
          id: 'msg-' + Date.now(),
          sender: 'bot',
          text: "Sorry, I can't help you regarding this."
        });
        saveConversation();
        renderAllMessages();
        sendButton.disabled = false;
        inputField.focus();
      }, 150);
      return;
    }

    // 2. CHECK INSTANT KNOWLEDGE RESPONSE (0.2s)
    const instantResponse = checkInstantKnowledgeResponse(text);
    if (instantResponse) {
      setTimeout(() => {
        removeTypingIndicator();
        conversationMessages.push({
          id: 'msg-' + Date.now(),
          sender: 'bot',
          text: instantResponse
        });
        saveConversation();
        renderAllMessages();
        sendButton.disabled = false;
        inputField.focus();
      }, 200);
      return;
    }

    try {
      const botResponse = await callGeminiAPI(text);
      removeTypingIndicator();

      conversationMessages.push({
        id: 'msg-' + Date.now(),
        sender: 'bot',
        text: botResponse
      });
      saveConversation();
      renderAllMessages();
    } catch (err) {
      removeTypingIndicator();
      const fallback = generateLocalFallback(text);
      conversationMessages.push({
        id: 'msg-' + Date.now(),
        sender: 'bot',
        text: fallback
      });
      saveConversation();
      renderAllMessages();
    } finally {
      sendButton.disabled = false;
      inputField.focus();
    }
  }

  // 13. INTERACTIVE 1-CLICK DASHBOARD ACTION CONTROLLER
  window.triggerBotAction = function(actionType, param1, param2) {
    if (actionType === 'VIEW_STATE') {
      const stateName = param1;
      
      // 1. Set search input fields across Page 1 & Page 2
      const singleInp = document.getElementById('single-region-search-input');
      const mapInp = document.getElementById('map-search-input');
      if (singleInp) singleInp.value = stateName;
      if (mapInp) mapInp.value = stateName;

      // 2. Switch to Forensic Dashboard View (Page 2)
      if (typeof window.switchMainView === 'function') {
        window.switchMainView('dashboard');
      }

      // 3. Submit single location search to localize Leaflet map and render graphs
      if (typeof window.submitSingleLocationSearch === 'function') {
        window.submitSingleLocationSearch();
      }

      // 4. Show toast notification on the dashboard
      if (typeof window.showDetectiveToast === 'function') {
        window.showDetectiveToast(`🚀 Loaded Forensic Map & Analysis for [${stateName}]!`);
      }

      // 5. Smoothly close the chatbot drawer so user immediately sees graphs & map
      window.closeChatbot();

    } else if (actionType === 'COMPARE') {
      const stateA = param1 || 'Rajasthan';
      const stateB = param2 || 'Kerala';

      // 1. Populate comparison credentials across Page 1 & Page 2
      const inp1 = document.getElementById('compare-input-1');
      const inp2 = document.getElementById('compare-input-2');
      if (inp1) inp1.value = stateA;
      if (inp2) inp2.value = stateB;

      const p2Inp1 = document.getElementById('page2-comp-input-1');
      const p2Inp2 = document.getElementById('page2-comp-input-2');
      if (p2Inp1) p2Inp1.value = stateA;
      if (p2Inp2) p2Inp2.value = stateB;

      // 2. Resolve locations in INDIA_LOCATIONS_DATABASE
      let locA = null;
      let locB = null;
      if (typeof window.findLocationInDb === 'function') {
        locA = window.findLocationInDb(stateA);
        locB = window.findLocationInDb(stateB);
      }

      if (stateA.toLowerCase() === 'vidarbha' && typeof window.findLocationInDb === 'function') {
        locA = window.findLocationInDb('Maharashtra');
      }
      if (stateB.toLowerCase() === 'vidarbha' && typeof window.findLocationInDb === 'function') {
        locB = window.findLocationInDb('Maharashtra');
      }

      // 3. Switch to Comparative Dual-Zone Trend Dashboard View
      if (typeof window.switchMainView === 'function') {
        window.switchMainView('comparison');
      }

      // 4. Trigger comparison rendering
      if (typeof window.openPage2Comparison === 'function' && locA && locB) {
        window.openPage2Comparison(locA, locB);
      } else if (typeof window.quickSetComparison === 'function') {
        window.quickSetComparison(stateA, stateB);
      } else if (typeof window.submitComparisonSearch === 'function') {
        window.submitComparisonSearch();
      }

      if (typeof window.updateComparisonPageView === 'function') {
        window.updateComparisonPageView();
      }

      // 5. Show toast notification
      if (typeof window.showDetectiveToast === 'function') {
        window.showDetectiveToast(`⚖️ Loaded Comparison: [${stateA}] vs [${stateB}]!`);
      }

      // 6. Close chatbot drawer
      window.closeChatbot();
    }
  };

  // 14. PUBLIC API & COMPATIBILITY LAYER
  window.toggleChatbot = function() {
    if (!botDrawer) return;
    if (botDrawer.classList.contains('open')) {
      closeChatbot();
    } else {
      openChatbot();
    }
  };

  window.openChatbot = function() {
    if (!botDrawer) buildChatbotDOM();
    document.body.classList.add('ai-bot-open');
    if (botDrawer) botDrawer.classList.add('open');
    if (botBackdrop) botBackdrop.classList.add('open');
    if (inputField) {
      setTimeout(() => inputField.focus(), 300);
    }
    scrollToBottom();
  };

  window.closeChatbot = function() {
    document.body.classList.remove('ai-bot-open');
    if (botDrawer) botDrawer.classList.remove('open');
    if (botBackdrop) botBackdrop.classList.remove('open');
  };

  window.askChatbotQuick = function(query) {
    if (!botDrawer || !botDrawer.classList.contains('open')) {
      window.openChatbot();
    }
    if (inputField) {
      inputField.value = query;
      handleUserSend();
    }
  };

  // Backward compatibility alias: replace old dictionary triggers with Chatbot
  window.openScientificDictionary = function(searchKeyword) {
    window.openChatbot();
    if (inputField) {
      if (searchKeyword) {
        inputField.value = "Explain scientific term: " + searchKeyword;
      } else {
        inputField.value = "List key scientific terms in EarthScope";
      }
      handleUserSend();
    }
  };
  window.closeScientificDictionary = function() {
    window.closeChatbot();
  };

  // 15. AUTO-INITIALIZATION ON DOM READY
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildChatbotDOM);
  } else {
    buildChatbotDOM();
  }

})();
