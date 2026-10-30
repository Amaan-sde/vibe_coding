// Scientifically accurate Solar System & Planetary Mechanics data

export interface PlanetData {
  id: string;
  name: string;
  type: "Terrestrial Planet" | "Gas Giant" | "Ice Giant" | "Star";
  diameterKm: number;
  diameterRelative: number; // Relative to Earth (Earth = 1.0)
  distanceFromSunKm: number; // Millions of km
  distanceAU: number; // Astronomical Units
  orbitalPeriodDays: number; // Days to complete 1 revolution
  orbitalPeriodEarthYears: string;
  rotationPeriodHours: number; // Hours to rotate once on axis (negative means retrograde)
  rotationDescription: string;
  gravityMps2: number; // Surface gravity in m/s^2
  gravityRelative: number; // Relative to Earth (Earth = 1.0g)
  moonsCount: number;
  meanTemperatureC: number;
  atmosphere: string[];
  color: string;
  glowColor: string;
  summary: string;
  keyFacts: string[];
  scientificSignificance: string;
  illustrativeOrbitRadius: number; // For visualization canvas
  illustrativeSize: number; // Pixel diameter for illustrative model
  orbitalSpeedKmS: number; // Mean orbital speed km/s
}

export const SOLAR_SYSTEM_BODIES: PlanetData[] = [
  {
    id: "sun",
    name: "Sun",
    type: "Star",
    diameterKm: 1392700,
    diameterRelative: 109.2,
    distanceFromSunKm: 0,
    distanceAU: 0,
    orbitalPeriodDays: 0,
    orbitalPeriodEarthYears: "Center of Solar System",
    rotationPeriodHours: 648, // ~27 days differential
    rotationDescription: "27 Earth days (differential rotation at equator)",
    gravityMps2: 274.0,
    gravityRelative: 27.9,
    moonsCount: 8, // 8 planets
    meanTemperatureC: 5500, // Photosphere (Core is 15M°C)
    atmosphere: ["Hydrogen (73.4%)", "Helium (25.0%)", "Oxygen, Carbon, Neon, Iron"],
    color: "#f59e0b",
    glowColor: "rgba(245, 158, 11, 0.4)",
    summary: "The yellow dwarf star at the heart of our solar system, containing 99.86% of the entire solar system's mass.",
    keyFacts: [
      "Generates energy by nuclear fusion, fusing ~600 million tons of hydrogen into helium every single second.",
      "Light takes approximately 8 minutes and 20 seconds to travel from the Sun to Earth.",
      "The core temperature reaches an astonishing 15,000,000°C under enormous gravitational pressure."
    ],
    scientificSignificance: "Drives Earth's climate, weather, ocean currents, seasons, and space weather through the solar wind.",
    illustrativeOrbitRadius: 0,
    illustrativeSize: 42,
    orbitalSpeedKmS: 0
  },
  {
    id: "mercury",
    name: "Mercury",
    type: "Terrestrial Planet",
    diameterKm: 4879,
    diameterRelative: 0.383,
    distanceFromSunKm: 57.9,
    distanceAU: 0.387,
    orbitalPeriodDays: 88,
    orbitalPeriodEarthYears: "0.24 Earth years (88 days)",
    rotationPeriodHours: 1407.6, // 58.6 Earth days
    rotationDescription: "58.6 Earth days (3:2 spin-orbit resonance)",
    gravityMps2: 3.7,
    gravityRelative: 0.38,
    moonsCount: 0,
    meanTemperatureC: 167, // -180°C at night to +430°C by day
    atmosphere: ["Trace exosphere: Oxygen, Sodium, Hydrogen, Helium, Potassium"],
    color: "#a3a3a3",
    glowColor: "rgba(163, 163, 163, 0.3)",
    summary: "The smallest planet and closest to the Sun, with extreme temperature swings and a heavily cratered surface.",
    keyFacts: [
      "Has no substantial atmosphere to trap heat, leading to temperature swings from +430°C in daylight to -180°C at night.",
      "Despite being closest to the Sun, water ice exists inside permanently shadowed polar craters.",
      "Has a gigantic metallic iron core making up about 85% of the planet's radius."
    ],
    scientificSignificance: "Its orbital precession provided the first key empirical confirmation of Albert Einstein's General Theory of Relativity.",
    illustrativeOrbitRadius: 75,
    illustrativeSize: 10,
    orbitalSpeedKmS: 47.4
  },
  {
    id: "venus",
    name: "Venus",
    type: "Terrestrial Planet",
    diameterKm: 12104,
    diameterRelative: 0.949,
    distanceFromSunKm: 108.2,
    distanceAU: 0.723,
    orbitalPeriodDays: 224.7,
    orbitalPeriodEarthYears: "0.62 Earth years (225 days)",
    rotationPeriodHours: -5832.5, // 243 days retrograde
    rotationDescription: "243 Earth days (Retrograde: rotates backwards!)",
    gravityMps2: 8.87,
    gravityRelative: 0.90,
    moonsCount: 0,
    meanTemperatureC: 464, // Runaway greenhouse effect
    atmosphere: ["Carbon Dioxide (96.5%)", "Nitrogen (3.5%)", "Sulfuric Acid clouds"],
    color: "#eab308",
    glowColor: "rgba(234, 179, 8, 0.35)",
    summary: "Earth's 'twin' in size, but enveloped in a crushing, scorching atmosphere that makes it the hottest planet.",
    keyFacts: [
      "The hottest planet in the solar system (464°C), hot enough to melt lead, due to an intense runaway greenhouse effect.",
      "Atmospheric pressure at the surface is 92 times greater than Earth's—equivalent to being 900 meters underwater.",
      "Rotates clockwise (retrograde), meaning the Sun rises in the west and sets in the east."
    ],
    scientificSignificance: "Serves as a crucial planetary model for understanding runaway greenhouse effects and climate tipping points.",
    illustrativeOrbitRadius: 110,
    illustrativeSize: 16,
    orbitalSpeedKmS: 35.0
  },
  {
    id: "earth",
    name: "Earth",
    type: "Terrestrial Planet",
    diameterKm: 12742,
    diameterRelative: 1.0,
    distanceFromSunKm: 149.6,
    distanceAU: 1.0,
    orbitalPeriodDays: 365.25,
    orbitalPeriodEarthYears: "1.0 Earth year (365.25 days)",
    rotationPeriodHours: 23.93,
    rotationDescription: "23 hours, 56 minutes, 4 seconds",
    gravityMps2: 9.81,
    gravityRelative: 1.0,
    moonsCount: 1, // The Moon
    meanTemperatureC: 15,
    atmosphere: ["Nitrogen (78.1%)", "Oxygen (20.9%)", "Argon (0.93%)", "Carbon Dioxide (0.04%)"],
    color: "#3b82f6",
    glowColor: "rgba(59, 130, 246, 0.4)",
    summary: "Our home planet: the only known world harboring abundant liquid water, a protective magnetic field, and thriving life.",
    keyFacts: [
      "Approximately 71% of Earth's surface is covered by liquid water oceans.",
      "Its active molten iron-nickel outer core generates a powerful magnetosphere that deflects lethal solar cosmic radiation.",
      "Its relatively large Moon stabilizes Earth's axial tilt (23.5°), ensuring moderate and predictable climate seasons."
    ],
    scientificSignificance: "The gold standard for planetary habitability and the benchmark against which all exoplanets are evaluated.",
    illustrativeOrbitRadius: 155,
    illustrativeSize: 18,
    orbitalSpeedKmS: 29.8
  },
  {
    id: "mars",
    name: "Mars",
    type: "Terrestrial Planet",
    diameterKm: 6779,
    diameterRelative: 0.532,
    distanceFromSunKm: 227.9,
    distanceAU: 1.524,
    orbitalPeriodDays: 687,
    orbitalPeriodEarthYears: "1.88 Earth years (687 days)",
    rotationPeriodHours: 24.62,
    rotationDescription: "24 hours, 37 minutes (1 Martian Sol)",
    gravityMps2: 3.72,
    gravityRelative: 0.38,
    moonsCount: 2, // Phobos and Deimos
    meanTemperatureC: -63,
    atmosphere: ["Carbon Dioxide (95.3%)", "Nitrogen (2.6%)", "Argon (1.9%)"],
    color: "#ef4444",
    glowColor: "rgba(239, 68, 68, 0.4)",
    summary: "The 'Red Planet', colored by iron oxide (rust) on its surface, hosting giant extinct volcanoes and deep canyons.",
    keyFacts: [
      "Home to Olympus Mons, the largest volcano in the solar system, standing 21.9 km high (nearly 2.5 times Mount Everest!).",
      "Valles Marineris is a colossal canyon system stretching over 4,000 km long and up to 7 km deep.",
      "Clear geological evidence proves liquid water flowed abundantly across ancient Martian river valleys billions of years ago."
    ],
    scientificSignificance: "The primary candidate for human interplanetary settlement and searching for past microbial biosignatures.",
    illustrativeOrbitRadius: 200,
    illustrativeSize: 13,
    orbitalSpeedKmS: 24.1
  },
  {
    id: "jupiter",
    name: "Jupiter",
    type: "Gas Giant",
    diameterKm: 139820,
    diameterRelative: 10.97,
    distanceFromSunKm: 778.6,
    distanceAU: 5.204,
    orbitalPeriodDays: 4333,
    orbitalPeriodEarthYears: "11.86 Earth years",
    rotationPeriodHours: 9.93,
    rotationDescription: "9 hours, 55 minutes (Fastest spinning planet!)",
    gravityMps2: 24.79,
    gravityRelative: 2.53,
    moonsCount: 95, // Including Galilean moons: Io, Europa, Ganymede, Callisto
    meanTemperatureC: -110,
    atmosphere: ["Hydrogen (89.8%)", "Helium (10.2%)", "Methane, Ammonia, Water vapor"],
    color: "#f97316",
    glowColor: "rgba(249, 115, 22, 0.35)",
    summary: "The solar system's titan: more than twice as massive as all other planets combined, with a famous Great Red Spot anticyclone.",
    keyFacts: [
      "The Great Red Spot is a monstrous storm wider than Earth that has raged continuously for at least 350 years.",
      "Its moon Ganymede is the largest moon in the solar system, even bigger than the planet Mercury!",
      "Europa harbors a vast subterranean liquid saltwater ocean beneath its icy crust, holding twice as much water as all of Earth's oceans."
    ],
    scientificSignificance: "Acts as a gravitational 'cosmic vacuum cleaner', protecting inner planets by deflecting and capturing comets and asteroids.",
    illustrativeOrbitRadius: 260,
    illustrativeSize: 32,
    orbitalSpeedKmS: 13.1
  },
  {
    id: "saturn",
    name: "Saturn",
    type: "Gas Giant",
    diameterKm: 116460,
    diameterRelative: 9.14,
    distanceFromSunKm: 1433.5,
    distanceAU: 9.582,
    orbitalPeriodDays: 10759,
    orbitalPeriodEarthYears: "29.45 Earth years",
    rotationPeriodHours: 10.7,
    rotationDescription: "10 hours, 42 minutes",
    gravityMps2: 10.44,
    gravityRelative: 1.06,
    moonsCount: 146, // Most moons of any planet!
    meanTemperatureC: -140,
    atmosphere: ["Hydrogen (96.3%)", "Helium (3.25%)", "Methane, Ammonia"],
    color: "#fde047",
    glowColor: "rgba(253, 224, 71, 0.3)",
    summary: "World-renowned for its dazzling, extensive ring system made of billions of chunks of ice and rock.",
    keyFacts: [
      "Its majestic rings span up to 282,000 km in width, but are extraordinarily thin—averaging just 10 to 30 meters thick!",
      "Has the lowest density of any planet (0.687 g/cm³)—if you had an ocean large enough, Saturn would literally float on water!",
      "Its giant moon Titan has a dense nitrogen atmosphere and liquid hydrocarbon lakes of methane and ethane."
    ],
    scientificSignificance: "Moon Enceladus ejects cryovolcanic water plumes containing organic compounds into space, making it a top target for astrobiology.",
    illustrativeOrbitRadius: 320,
    illustrativeSize: 26,
    orbitalSpeedKmS: 9.7
  },
  {
    id: "uranus",
    name: "Uranus",
    type: "Ice Giant",
    diameterKm: 50724,
    diameterRelative: 3.98,
    distanceFromSunKm: 2872.5,
    distanceAU: 19.2,
    orbitalPeriodDays: 30687,
    orbitalPeriodEarthYears: "84.0 Earth years",
    rotationPeriodHours: -17.24, // Retrograde
    rotationDescription: "17 hours, 14 minutes (Tilted 97.8° on its side)",
    gravityMps2: 8.69,
    gravityRelative: 0.89,
    moonsCount: 28,
    meanTemperatureC: -195,
    atmosphere: ["Hydrogen (82.5%)", "Helium (15.2%)", "Methane (2.3% gives cyan color)"],
    color: "#06b6d4",
    glowColor: "rgba(6, 182, 212, 0.35)",
    summary: "The sideways ice giant with an extreme 98° axial tilt, rolling along its orbit like a bowling ball.",
    keyFacts: [
      "Its extreme axial tilt (97.8°) causes 42 years of continuous polar daylight followed by 42 years of continuous darkness.",
      "Contains an icy mantle of water, ammonia, and methane ices over a small rocky core.",
      "Recorded the coldest temperature ever measured in the solar system's planetary atmospheres: -224°C."
    ],
    scientificSignificance: "Serves as the archetypal representative for 'sub-Neptunes' and ice giants, which constitute the most common exoplanets detected in the Milky Way.",
    illustrativeOrbitRadius: 375,
    illustrativeSize: 20,
    orbitalSpeedKmS: 6.8
  },
  {
    id: "neptune",
    name: "Neptune",
    type: "Ice Giant",
    diameterKm: 49244,
    diameterRelative: 3.86,
    distanceFromSunKm: 4495.1,
    distanceAU: 30.05,
    orbitalPeriodDays: 60190,
    orbitalPeriodEarthYears: "164.8 Earth years",
    rotationPeriodHours: 16.11,
    rotationDescription: "16 hours, 6 minutes",
    gravityMps2: 11.15,
    gravityRelative: 1.14,
    moonsCount: 16, // Including Triton
    meanTemperatureC: -200,
    atmosphere: ["Hydrogen (80%)", "Helium (19%)", "Methane (1.5%)"],
    color: "#2563eb",
    glowColor: "rgba(37, 99, 235, 0.4)",
    summary: "The outermost major planet: a dark, cold, vivid azure world swept by the fastest supersonic winds in the solar system.",
    keyFacts: [
      "Features supersonic winds whipping through the upper atmosphere at up to 2,100 km/h (faster than the speed of sound on Earth!).",
      "Was the first planet discovered through mathematical prediction rather than empirical observation (calculated by Le Verrier).",
      "Its largest moon, Triton, has active nitrogen geysers and orbits backwards (retrograde), proving it was a captured Kuiper Belt object."
    ],
    scientificSignificance: "Marks the outer frontier of major planets, with gravitational resonances shaping the Kuiper Belt and Pluto's orbit.",
    illustrativeOrbitRadius: 430,
    illustrativeSize: 19,
    orbitalSpeedKmS: 5.4
  }
];

// Gravity simulator celestial bodies
export interface GravityBody {
  id: string;
  name: string;
  category: "Planet" | "Moon" | "Star";
  gravityMps2: number;
  relativeToEarth: number;
  dropTime10m: number; // Time in seconds for 10m drop in vacuum: t = sqrt(2*h/g)
  finalVelocity10m: number; // v = sqrt(2*g*h)
  funFact: string;
  color: string;
}

export const GRAVITY_BODIES: GravityBody[] = [
  {
    id: "moon",
    name: "The Moon",
    category: "Moon",
    gravityMps2: 1.62,
    relativeToEarth: 0.165,
    dropTime10m: 3.51,
    finalVelocity10m: 5.69,
    funFact: "You would weigh roughly 1/6th of your Earth weight! Apollo astronauts could easily bunny-hop across the surface.",
    color: "#d4d4d8"
  },
  {
    id: "mars",
    name: "Mars",
    category: "Planet",
    gravityMps2: 3.72,
    relativeToEarth: 0.379,
    dropTime10m: 2.32,
    finalVelocity10m: 8.63,
    funFact: "A 100 kg person weighs only 38 kg on Mars. You could jump nearly three times higher than on Earth!",
    color: "#f87171"
  },
  {
    id: "earth",
    name: "Earth",
    category: "Planet",
    gravityMps2: 9.81,
    relativeToEarth: 1.0,
    dropTime10m: 1.43,
    finalVelocity10m: 14.01,
    funFact: "Standard gravity (1.0g). Used as the universal benchmark for human biology, structural engineering, and acceleration.",
    color: "#60a5fa"
  },
  {
    id: "saturn",
    name: "Saturn",
    category: "Planet",
    gravityMps2: 10.44,
    relativeToEarth: 1.06,
    dropTime10m: 1.38,
    finalVelocity10m: 14.45,
    funFact: "Despite being 95 times more massive than Earth, Saturn's surface gravity at cloud level is only 6% stronger than Earth's due to its low density and huge radius!",
    color: "#fde047"
  },
  {
    id: "jupiter",
    name: "Jupiter",
    category: "Planet",
    gravityMps2: 24.79,
    relativeToEarth: 2.53,
    dropTime10m: 0.90,
    finalVelocity10m: 22.27,
    funFact: "You would weigh 2.5 times your Earth weight! Walking would feel like carrying two adults on your shoulders.",
    color: "#fb923c"
  },
  {
    id: "sun",
    name: "Sun (Surface)",
    category: "Star",
    gravityMps2: 274.0,
    relativeToEarth: 27.9,
    dropTime10m: 0.27,
    finalVelocity10m: 74.03,
    funFact: "An object dropped from 10 meters hits the surface in a fraction of a second at 266 km/h. A 70 kg person would weigh nearly 2 tons!",
    color: "#f59e0b"
  }
];

// Test objects for dropping in the gravity simulator
export interface DroppableObject {
  id: string;
  name: string;
  massKg: number;
  icon: string;
  description: string;
}

export const DROPPABLE_OBJECTS: DroppableObject[] = [
  {
    id: "apple",
    name: "Isaac Newton's Apple",
    massKg: 0.2,
    icon: "🍎",
    description: "The classic symbol of gravitational revelation."
  },
  {
    id: "helmet",
    name: "Astronaut Helmet",
    massKg: 4.5,
    icon: "👨‍🚀",
    description: "Pressurized EVA helmet with gold-coated visor."
  },
  {
    id: "probe",
    name: "Mini Space Probe",
    massKg: 25.0,
    icon: "🛰️",
    description: "Scientific sensor payload with solar wings."
  },
  {
    id: "feather",
    name: "Falcon Feather (Vacuum)",
    massKg: 0.005,
    icon: "🪶",
    description: "Demonstrates Apollo 15 experiment: in a vacuum, a feather and hammer fall at the EXACT same rate!"
  }
];

