// Interactive Space Quiz Questions Database
// Scientifically verified questions across multiple difficulty tiers and categories

export type QuizDifficulty = "beginner" | "intermediate" | "advanced";

export type QuizCategory = 
  | "all"
  | "solar-system"
  | "isro-missions"
  | "rocket-science"
  | "satellites"
  | "astronomy"
  | "space-tech";

export interface QuizQuestion {
  id: string;
  category: QuizCategory;
  difficulty: QuizDifficulty;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  funFact: string;
}

export const QUIZ_CATEGORIES: { id: QuizCategory; label: string; icon: string }[] = [
  { id: "all", label: "All Categories", icon: "Sparkles" },
  { id: "isro-missions", label: "ISRO Missions", icon: "Rocket" },
  { id: "solar-system", label: "Solar System", icon: "Globe" },
  { id: "rocket-science", label: "Rocket Science", icon: "Cpu" },
  { id: "satellites", label: "Satellites & Orbits", icon: "Orbit" },
  { id: "astronomy", label: "Deep Astronomy", icon: "Atom" },
  { id: "space-tech", label: "Space Technology", icon: "Compass" }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // ISRO MISSIONS
  {
    id: "isro-1",
    category: "isro-missions",
    difficulty: "beginner",
    question: "On what date did India's Chandrayaan-3 land on the Moon, making India the 1st nation to land near the Lunar South Pole?",
    options: [
      "14 July 2023",
      "23 August 2023",
      "5 September 2023",
      "26 January 2024"
    ],
    correctIndex: 1,
    explanation: "Chandrayaan-3 launched on 14 July 2023 and completed its historic soft touchdown on 23 August 2023 at 18:04 IST. The landing spot was named 'Shiv Shakti Point'.",
    funFact: "India declared August 23 as 'National Space Day' to commemorate this historic scientific achievement!"
  },
  {
    id: "isro-2",
    category: "isro-missions",
    difficulty: "beginner",
    question: "What was the name of the robotic 6-wheeled rover carried inside Chandrayaan-3's Vikram lander?",
    options: [
      "Pragyan",
      "Perseverance",
      "Curiosity",
      "Sojourner"
    ],
    correctIndex: 0,
    explanation: "'Pragyan' is a Sanskrit word meaning 'Wisdom'. The 26 kg rover rolled down Vikram's ramp and explored 103 meters across the lunar regolith.",
    funFact: "Pragyan's rear wheels were embossed with the ISRO logo and the Ashoka Lion State Emblem, stamping them into lunar dust as it drove!"
  },
  {
    id: "isro-3",
    category: "isro-missions",
    difficulty: "intermediate",
    question: "Which scientific instrument on the Pragyan rover unambiguously confirmed the presence of Sulphur (S) on the lunar south pole?",
    options: [
      "ChaSTE thermal probe",
      "LIBS (Laser-Induced Breakdown Spectroscope)",
      "ILSA seismometer",
      "RAMBHA Langmuir Probe"
    ],
    correctIndex: 1,
    explanation: "LIBS fired high-powered laser pulses onto the lunar rock, vaporizing a tiny speck into localized micro-plasma. By analyzing light emitted from the plasma, LIBS confirmed elemental Sulphur, Aluminium, Calcium, and Iron.",
    funFact: "ChaSTE and ILSA were mounted on the Vikram lander, whereas LIBS and APXS were carried on the Pragyan rover."
  },
  {
    id: "isro-4",
    category: "isro-missions",
    difficulty: "intermediate",
    question: "India's Mars Orbiter Mission (Mangalyaan) achieved what unprecedented worldwide milestone?",
    options: [
      "First nation to land a rover on Mars",
      "First nation in the world to reach Mars orbit on its maiden attempt",
      "Discovered running liquid water oceans on Mars",
      "Fastest spacecraft to ever leave Earth"
    ],
    correctIndex: 1,
    explanation: "No other nation or space agency had ever reached Mars on its first attempt. ISRO achieved Mars Orbit Insertion on 24 September 2014 using its workhorse PSLV-C25 launcher.",
    funFact: "The total cost of Mangalyaan was ~$74 million, which was less than the budget of the Hollywood movie 'Gravity' ($100 million)!"
  },
  {
    id: "isro-5",
    category: "isro-missions",
    difficulty: "advanced",
    question: "Around which Lagrange point is India's solar observatory Aditya-L1 placed in a Halo orbit?",
    options: [
      "Sun-Earth L1",
      "Earth-Moon L2",
      "Sun-Mars L4",
      "Sun-Earth L5"
    ],
    correctIndex: 0,
    explanation: "Aditya-L1 is stationed in a halo orbit around Sun-Earth L1, located ~1.5 million kilometers from Earth. At L1, the gravitational pulls of Sun and Earth balance the orbital centripetal force, allowing 24/7 unhindered solar views.",
    funFact: "From L1, Aditya-L1 never experiences solar eclipses or night time!"
  },

  // SOLAR SYSTEM
  {
    id: "sol-1",
    category: "solar-system",
    difficulty: "beginner",
    question: "Which planet in our Solar System is the hottest, despite not being the closest to the Sun?",
    options: [
      "Mercury",
      "Venus",
      "Mars",
      "Jupiter"
    ],
    correctIndex: 1,
    explanation: "Venus is the hottest planet (surface ~464°C) due to a runaway greenhouse effect caused by a dense atmosphere of 96.5% carbon dioxide and sulfuric acid clouds.",
    funFact: "Mercury is closer to the Sun, but has no thick atmosphere to trap heat, so its night temperatures drop to -180°C!"
  },
  {
    id: "sol-2",
    category: "solar-system",
    difficulty: "beginner",
    question: "What is Olympus Mons, and which planet is it located on?",
    options: [
      "A deep submarine canyon on Venus",
      "The largest volcano in the Solar System, located on Mars",
      "A frozen methane ocean on Neptune",
      "An impact crater on Mercury"
    ],
    correctIndex: 1,
    explanation: "Olympus Mons on Mars is a colossal shield volcano standing ~22 km high—nearly three times the height of Mount Everest above sea level!",
    funFact: "Because Mars lacks tectonic plate movement, magma poured out over the exact same hotspot for millions of years, building this gargantuan volcano."
  },
  {
    id: "sol-3",
    category: "solar-system",
    difficulty: "intermediate",
    question: "Which planet rotates on its side with an axial tilt of nearly 98 degrees?",
    options: [
      "Saturn",
      "Uranus",
      "Neptune",
      "Jupiter"
    ],
    correctIndex: 1,
    explanation: "Uranus has an extreme tilt of 97.8°, likely caused by a cataclysmic collision with an Earth-sized protoplanet billions of years ago. It rolls around the Sun like a ball!",
    funFact: "Because of this tilt, each of Uranus's poles experiences 42 continuous Earth years of sunlight followed by 42 years of complete darkness!"
  },
  {
    id: "sol-4",
    category: "solar-system",
    difficulty: "advanced",
    question: "Saturn's moon Titan is unique among all moons in the Solar System because it possesses:",
    options: [
      "Active water geysers shooting into space",
      "A dense nitrogen-rich atmosphere and liquid methane/ethane lakes",
      "A magnetic field stronger than Earth's",
      "A radioactive uranium surface"
    ],
    correctIndex: 1,
    explanation: "Titan is the only moon with a substantial, dense atmosphere (1.5 times Earth's atmospheric pressure) and the only celestial body besides Earth with stable liquid lakes and rain (made of liquid methane and ethane).",
    funFact: "Because of Titan's thick air and weak gravity (0.14g), a human equipped with artificial wings strapped to their arms could literally flap and fly!"
  },

  // ROCKET SCIENCE
  {
    id: "rock-1",
    category: "rocket-science",
    difficulty: "beginner",
    question: "Which of Newton's Laws of Motion is the fundamental operational principle behind rocket propulsion?",
    options: [
      "First Law (Inertia)",
      "Second Law (F = ma)",
      "Third Law (Action and Reaction)",
      "Law of Universal Gravitation"
    ],
    correctIndex: 2,
    explanation: "Newton's Third Law states: 'For every action, there is an equal and opposite reaction.' When high-pressure exhaust gas is forced backward through the rocket nozzle, it exerts an equal reaction force pushing the rocket forward.",
    funFact: "Rockets do NOT need air to 'push against'! In fact, rocket engines work more efficiently in the vacuum of space because there is no atmospheric backpressure to impede exhaust expansion."
  },
  {
    id: "rock-2",
    category: "rocket-science",
    difficulty: "intermediate",
    question: "Why do orbital launch vehicles use multiple 'stages' instead of one giant single-stage rocket?",
    options: [
      "To prevent the rocket from getting too hot from friction",
      "To discard heavy empty fuel tanks and engines, reducing mass to achieve orbital velocity",
      "Because different stages are made by different countries",
      "To allow the astronauts to sleep between stages"
    ],
    correctIndex: 1,
    explanation: "According to Tsiolkovsky's Rocket Equation, accelerating empty tanks requires exponential amounts of fuel. Discarding empty stages sheds dead weight so subsequent engines only accelerate the payload.",
    funFact: "Over 85-90% of a rocket's total mass at liftoff is just propellant. By the time it reaches orbit, only ~2-4% remains as usable payload!"
  },
  {
    id: "rock-3",
    category: "rocket-science",
    difficulty: "intermediate",
    question: "What is 'Max Q' in aerospace rocketry?",
    options: [
      "Maximum fuel flow rate into the turbopump",
      "The point of maximum dynamic aerodynamic pressure exerted on the rocket structure",
      "Maximum speed of the rocket before stage separation",
      "Maximum temperature inside the combustion chamber"
    ],
    correctIndex: 1,
    explanation: "Max Q is the moment during ascent when aerodynamic stress on the rocket structure peaks, combining high air density and supersonic velocity ($q = \\frac{1}{2}\\rho v^2$). Rocket engines often throttle down slightly at Max Q to prevent structural damage.",
    funFact: "Max Q on a standard orbital launch usually occurs roughly 60 to 80 seconds after liftoff at an altitude of 10 to 14 km."
  },
  {
    id: "rock-4",
    category: "rocket-science",
    difficulty: "advanced",
    question: "In cryogenic rocket engines like ISRO's CE-20, what propellants are utilized?",
    options: [
      "Solid hydroxyl-terminated polybutadiene (HTPB)",
      "Liquid Oxygen (LOX) and Liquid Hydrogen (LH2)",
      "Hydrazine and Nitrogen Tetroxide (N2O4)",
      "Kerosene (RP-1) and Liquid Methane"
    ],
    correctIndex: 1,
    explanation: "Cryogenic engines burn Liquid Hydrogen (fuel, stored at -253°C) and Liquid Oxygen (oxidizer, stored at -183°C). This combination delivers the highest specific impulse (efficiency) of any chemical propellant.",
    funFact: "The only byproduct of burning pure hydrogen and oxygen is clean water vapor ($H_2O$)!"
  },

  // SATELLITES & ORBITS
  {
    id: "sat-1",
    category: "satellites",
    difficulty: "beginner",
    question: "What is the approximate altitude and orbital period of a Geostationary Orbit (GEO)?",
    options: [
      "400 km and 90 minutes",
      "2,000 km and 6 hours",
      "35,786 km and 24 hours",
      "384,400 km and 28 days"
    ],
    correctIndex: 2,
    explanation: "At an altitude of 35,786 km above Earth's equator, a satellite's orbital period matches Earth's rotation period exactly (23 hours, 56 minutes, 4 seconds). It appears stationary in the sky to ground antennas.",
    funFact: "British sci-fi author and physicist Arthur C. Clarke first popularized the concept of geostationary telecommunications in 1945, which is why GEO is also called the 'Clarke Orbit'."
  },
  {
    id: "sat-2",
    category: "satellites",
    difficulty: "intermediate",
    question: "Why do Earth observation and weather satellites frequently use Polar or Sun-Synchronous Orbits (SSO)?",
    options: [
      "To avoid space debris in the equator",
      "Because the satellite passes over every spot on Earth with identical solar lighting angles",
      "Because Earth's gravity is zero at the poles",
      "To stay closer to the Moon"
    ],
    correctIndex: 1,
    explanation: "A Sun-Synchronous Orbit (SSO) precesses at the same rate Earth orbits the Sun, ensuring the satellite passes over any given surface coordinate at the exact same local solar mean time, ensuring consistent lighting and shadow conditions for imaging.",
    funFact: "This allows environmental scientists to detect subtle changes in crops, glaciers, and deforestation over months and years without lighting discrepancies."
  },
  {
    id: "sat-3",
    category: "satellites",
    difficulty: "advanced",
    question: "What is India's regional satellite navigation system called, providing positioning services across the subcontinent?",
    options: [
      "GLONASS",
      "Galileo",
      "NavIC (IRNSS)",
      "Beidou"
    ],
    correctIndex: 2,
    explanation: "NavIC (Navigation with Indian Constellation), officially designated IRNSS, consists of a constellation of 7 satellites (in geostationary and geosynchronous orbits) providing sub-5 meter positioning accuracy over India and 1,500 km surrounding it.",
    funFact: "'NavIC' means 'Sailor' or 'Navigator' in Sanskrit and Hindi!"
  },

  // DEEP ASTRONOMY
  {
    id: "astro-1",
    category: "astronomy",
    difficulty: "beginner",
    question: "What is a 'light-year'?",
    options: [
      "The time it takes Earth to orbit the Sun",
      "The distance light travels in a vacuum in one Earth year",
      "The brightness of a star seen from Earth",
      "The time it takes sunlight to reach Pluto"
    ],
    correctIndex: 1,
    explanation: "A light-year is a unit of astronomical distance, equal to approximately 9.46 trillion kilometers ($9.46 \\times 10^{12}\\text{ km}$).",
    funFact: "The closest star system to our Sun is Alpha Centauri, located about 4.24 light-years away."
  },
  {
    id: "astro-2",
    category: "astronomy",
    difficulty: "intermediate",
    question: "What remains at the center of our Milky Way galaxy, around which all stars orbit?",
    options: [
      "A giant dying pulsar",
      "A supermassive black hole named Sagittarius A*",
      "The ancient planetary nebula of the first star",
      "A cluster of 1,000 neutron stars"
    ],
    correctIndex: 1,
    explanation: "Sagittarius A* (pronounced 'Sagittarius A-star') is a supermassive black hole with a mass equivalent to approximately 4.3 million Suns, located ~26,000 light-years from Earth.",
    funFact: "Andrea Ghez and Reinhard Genzel won the 2020 Nobel Prize in Physics for tracking stars orbiting Sagittarius A* for nearly 30 years to prove its mass and existence!"
  },
  {
    id: "astro-3",
    category: "astronomy",
    difficulty: "advanced",
    question: "What is the boundary surrounding a black hole beyond which nothing, not even light, can escape?",
    options: [
      "Accretion Disk",
      "Photon Sphere",
      "Event Horizon",
      "Roche Limit"
    ],
    correctIndex: 2,
    explanation: "The Event Horizon is the theoretical boundary where the escape velocity of the black hole equals the speed of light ($c$). Crossing the event horizon means all possible future paths lead to the central gravitational singularity.",
    funFact: "The distance from the center to the event horizon is called the Schwarzschild radius: $r_s = \\frac{2GM}{c^2}$."
  }
];

