// Space Knowledge Hub Encyclopedia Data
// Designed for STEM education (Ages 10-16 and space enthusiasts)

export type KnowledgeCategory = "astronomy" | "space-science" | "aerospace" | "space-objects";

export interface KnowledgeTopic {
  id: string;
  category: KnowledgeCategory;
  title: string;
  subtitle: string;
  readingTimeMin: number;
  badge: string;
  simpleIntroduction: string;
  scientificExplanation: string;
  realWorldExamples: string[];
  mindBlowingFacts: string[];
  whyItMatters: string;
  relatedTopicIds: string[];
  keyTerms: { term: string; definition: string }[];
}

export const KNOWLEDGE_CATEGORIES: { id: KnowledgeCategory; name: string; description: string; icon: string }[] = [
  {
    id: "astronomy",
    name: "Astronomy",
    description: "The cosmic study of celestial bodies, stars, galaxies, and the grand architecture of the universe.",
    icon: "Sparkles"
  },
  {
    id: "space-science",
    name: "Space Science",
    description: "The physics, forces, radiations, and fundamental principles governing the cosmos.",
    icon: "Atom"
  },
  {
    id: "aerospace",
    name: "Aerospace Engineering",
    description: "The cutting-edge technology, propulsion, rockets, and spacecraft built to conquer the void.",
    icon: "Rocket"
  },
  {
    id: "space-objects",
    name: "Space Objects",
    description: "Asteroids, comets, meteors, and dwarf planets wandering through our cosmic neighborhood.",
    icon: "Orbit"
  }
];

export const KNOWLEDGE_TOPICS: KnowledgeTopic[] = [
  // ASTRONOMY
  {
    id: "stars",
    category: "astronomy",
    title: "Stars",
    subtitle: "Luminous Spheres of Plasma Powered by Nuclear Fusion",
    readingTimeMin: 3,
    badge: "Cosmic Engines",
    simpleIntroduction: "Stars are massive, glowing spheres of hot gas that light up the night sky. Our Sun is the closest star to Earth. Without stars, the universe would be pitch black and devoid of elements necessary for life!",
    scientificExplanation: "A star is held together by its own immense self-gravity. In its extremely hot and dense core, hydrogen nuclei collide with tremendous force to fuse into helium (the proton-proton chain or CNO cycle). This thermonuclear fusion releases tremendous energy in the form of photons (light) and thermal pressure, which pushes outward, exactly balancing the inward pull of gravity in a state known as hydrostatic equilibrium.",
    realWorldExamples: [
      "The Sun: A middle-aged G-type main-sequence yellow dwarf star (~4.6 billion years old).",
      "Betelgeuse: A dying red supergiant star in Orion that is over 700 times wider than the Sun.",
      "Sirius: The brightest star in our night sky, located only 8.6 light-years away."
    ],
    mindBlowingFacts: [
      "Every atom of carbon, oxygen, and iron inside your body was forged inside the heart of an ancient dying star that exploded billions of years ago!",
      "A teaspoon of matter from a neutron star (a collapsed dead star core) would weigh about 6 billion tons on Earth!"
    ],
    whyItMatters: "Stars synthesize all the heavy chemical elements that create planets, oceans, and living creatures. Studying stellar evolution unlocks how our own Sun will behave over the next 5 billion years.",
    relatedTopicIds: ["black-holes", "nebulae", "galaxies"],
    keyTerms: [
      { term: "Hydrostatic Equilibrium", definition: "The delicate balance between outward thermal pressure from nuclear fusion and inward gravitational collapse." },
      { term: "Supernova", definition: "The catastrophic explosion of a massive star at the end of its life." }
    ]
  },
  {
    id: "galaxies",
    category: "astronomy",
    title: "Galaxies",
    subtitle: "Cosmic Islands of Billions of Stars, Gas, and Dark Matter",
    readingTimeMin: 4,
    badge: "Cosmic Structures",
    simpleIntroduction: "A galaxy is a gigantic cosmic city containing millions to trillions of stars, dust clouds, and planets, all bound together by gravity. We live in the Milky Way galaxy, which looks like a shimmering spiral.",
    scientificExplanation: "Galaxies come in three primary morphological classes classified by Edwin Hubble: Spiral (like the Milky Way and Andromeda), Elliptical (smooth, featureless spheres or ovals containing older stars), and Irregular (chaotic structures often deformed by gravitational collisions). Galaxies are embedded within massive halos of invisible Dark Matter, which provides the extra gravitational glue preventing their outer stars from flying off into intergalactic space.",
    realWorldExamples: [
      "Milky Way: Our home barred-spiral galaxy, stretching roughly 100,000 light-years across and harboring 100–400 billion stars.",
      "Andromeda (M31): Our nearest major galactic neighbor, 2.5 million light-years away and steadily approaching us.",
      "Whirlpool Galaxy (M51): A spectacular face-on spiral galaxy interacting with a smaller companion."
    ],
    mindBlowingFacts: [
      "Astronomers estimate there are at least 2 trillion galaxies across the observable universe!",
      "In about 4.5 billion years, the Milky Way and Andromeda galaxies will collide and merge into a giant elliptical galaxy nicknamed 'Milkdromeda'."
    ],
    whyItMatters: "Understanding galaxy formation helps scientists trace the timeline of the universe from the Big Bang to the cosmic structures we observe today.",
    relatedTopicIds: ["stars", "black-holes", "nebulae"],
    keyTerms: [
      { term: "Spiral Arm", definition: "Density waves sweeping through a disk galaxy that compress gas clouds to spark new star birth." },
      { term: "Dark Matter", definition: "Hypothetical, non-luminous matter that makes up ~85% of all matter in the universe." }
    ]
  },
  {
    id: "nebulae",
    category: "astronomy",
    title: "Nebulae",
    subtitle: "Stellar Nurseries and Cosmic Clouds of Glowing Dust and Gas",
    readingTimeMin: 3,
    badge: "Star Nurseries",
    simpleIntroduction: "Nebulae (singular: nebula) are enormous clouds of gas and dust drifting through interstellar space. Some nebulae are stellar nurseries where infant stars are born, while others are the colorful remains of dying stars.",
    scientificExplanation: "Nebulae are categorized into Emission nebulae (ionized gas that glows with light, like the Orion Nebula), Reflection nebulae (clouds that scatter and reflect light from nearby stars, typically blue), Dark nebulae (dense clouds that block visible light, like the Horsehead Nebula), and Planetary nebulae (expanding shells of ionized gas ejected by sun-like stars in their red giant death phase).",
    realWorldExamples: [
      "Orion Nebula (M42): One of the brightest stellar nurseries visible to the naked eye, located 1,344 light-years away.",
      "Eagle Nebula (Pillars of Creation): Towering fingers of cold molecular hydrogen photographed by Hubble and JWST.",
      "Crab Nebula (M1): A vibrant supernova remnant expanding outward from an exploded star seen on Earth in 1054 CE."
    ],
    mindBlowingFacts: [
      "A single nebula can span hundreds of light-years across, containing enough mass to birth thousands of solar systems!",
      "Despite looking dense and colorful in telescopes, the gas inside a nebula is far thinner than the best vacuum we can create in labs on Earth."
    ],
    whyItMatters: "Nebulae are the cradle of new star and planet formation, recycling heavy elements created by dying stars into new generations of worlds.",
    relatedTopicIds: ["stars", "galaxies", "black-holes"],
    keyTerms: [
      { term: "Interstellar Medium (ISM)", definition: "The matter and radiation that exists in the space between the star systems in a galaxy." },
      { term: "Proto-star", definition: "An early stage in star formation before nuclear fusion has ignited in the core." }
    ]
  },
  {
    id: "black-holes",
    category: "astronomy",
    title: "Black Holes",
    subtitle: "Regions of Infinite Density Where Even Light Cannot Escape",
    readingTimeMin: 4,
    badge: "Extreme Physics",
    simpleIntroduction: "A black hole is an object in space with gravity so extraordinarily powerful that nothing—not even light, the fastest thing in the universe—can escape its grasp once it gets too close!",
    scientificExplanation: "Predicted by Einstein's General Theory of Relativity, a black hole forms when a massive star exhausts its nuclear fuel and undergoes runaway gravitational collapse down to an infinitesimally small point called a Singularity (infinite density and curvature). The boundary surrounding the singularity is the Event Horizon; crossing this point of no return requires an escape velocity exceeding the speed of light ($c = 300,000\\text{ km/s}$).",
    realWorldExamples: [
      "Sagittarius A*: The supermassive black hole at the center of our Milky Way, weighing 4.3 million times the mass of the Sun.",
      "M87*: The giant black hole whose shadow was famously imaged by the Event Horizon Telescope (EHT) in 2019.",
      "Cygnus X-1: One of the first confirmed stellar-mass black holes in our galaxy, stripping gas from a blue supergiant companion."
    ],
    mindBlowingFacts: [
      "Time slows down drastically near a black hole due to gravitational time dilation. If you watched an astronaut fall in, they would appear to freeze at the horizon forever!",
      "If you fell feet-first into a stellar black hole, the gravitational difference between your head and toes would stretch you like spaghetti—a real physics term called 'Spaghettification'!"
    ],
    whyItMatters: "Black holes are the ultimate cosmic laboratories for testing quantum gravity, the limits of Einstein's relativity, and spacetime physics.",
    relatedTopicIds: ["stars", "gravity", "galaxies"],
    keyTerms: [
      { term: "Event Horizon", definition: "The boundary marking the limits of a black hole where the escape velocity equals the speed of light." },
      { term: "Singularity", definition: "A one-dimensional point at the center of a black hole where spacetime curvature becomes infinite." }
    ]
  },
  {
    id: "exoplanets",
    category: "astronomy",
    title: "Exoplanets",
    subtitle: "Alien Worlds Orbiting Distant Stars Beyond Our Solar System",
    readingTimeMin: 3,
    badge: "Alien Worlds",
    simpleIntroduction: "An exoplanet (extrasolar planet) is any planet that orbits a star other than our Sun. Over 5,500 exoplanets have been confirmed so far, ranging from scorching gas giants to rocky worlds that could support water!",
    scientificExplanation: "Astronomers detect exoplanets using various astronomical techniques: Transit Photometry (measuring the tiny dip in a star's brightness when a planet passes in front of it, used by Kepler and TESS), Radial Velocity (detecting the microscopic wobble of a star caused by the planet's gravitational pull), Direct Imaging, and Gravitational Microlensing. Planets in the 'Habitable Zone' (Goldilocks Zone) maintain temperatures allowing liquid surface water.",
    realWorldExamples: [
      "TRAPPIST-1 System: A red dwarf star hosting seven Earth-sized rocky planets, three of which reside in the habitable zone.",
      "Proxima Centauri b: The closest known exoplanet to Earth, orbiting our nearest stellar neighbor just 4.2 light-years away.",
      "WASP-76b: An ultra-hot gas giant where temperatures exceed 2,400°C and vaporized iron rains from the sky."
    ],
    mindBlowingFacts: [
      "Statistically, there are more planets in our Milky Way galaxy than there are stars!",
      "Some exoplanets orbit two stars simultaneously (circumbinary planets), creating double sunsets like Tatooine in Star Wars!"
    ],
    whyItMatters: "Studying exoplanet atmospheres for biosignature gases (like methane, oxygen, and ozone) brings humanity closer to answering: 'Are we alone in the universe?'",
    relatedTopicIds: ["stars", "planets", "space-exploration"],
    keyTerms: [
      { term: "Habitable Zone", definition: "The orbital region around a star where temperatures allow liquid water to pool on a planet's surface." },
      { term: "Transit", definition: "The passage of an exoplanet across the face of its parent star, temporarily blocking a fraction of starlight." }
    ]
  },

  // SPACE SCIENCE
  {
    id: "gravity",
    category: "space-science",
    title: "Gravity",
    subtitle: "The Fundamental Force That Shapes Spacetime and Governs Orbits",
    readingTimeMin: 4,
    badge: "Fundamental Force",
    simpleIntroduction: "Gravity is the invisible force that pulls objects toward one another. It keeps your feet on the ground, holds the Moon in orbit around the Earth, and keeps Earth circling the Sun.",
    scientificExplanation: "Sir Isaac Newton described gravity as an attractive force proportional to masses and inversely proportional to the square of their distance: $F = G (m_1 m_2) / r^2$. Albert Einstein revised this in 1915 with General Relativity: gravity is not a traditional force, but the warping and curvature of four-dimensional spacetime caused by mass and energy. Objects moving in 'free fall' follow the shortest curved paths (geodesics) through warped space.",
    realWorldExamples: [
      "Tides: The Moon's gravitational pull draws ocean water into bulges, causing high and low tides on Earth twice a day.",
      "Orbital Motion: Satellites in orbit are actually in perpetual free-fall around Earth, continuously falling forward at horizontal speeds that match Earth's curvature (~7.8 km/s).",
      "Gravitational Lensing: Massive clusters of galaxies bend and magnify the light of galaxies behind them like a cosmic magnifying glass."
    ],
    mindBlowingFacts: [
      "Astronauts aboard the International Space Station are NOT in zero gravity! Gravity at ISS altitude (400 km) is ~90% as strong as on the ground; they float because the station is falling around Earth at 27,600 km/h!",
      "Gravity is the weakest of all four fundamental forces—a tiny refrigerator magnet can easily overcome the gravitational pull of the entire Earth to pick up a paperclip!"
    ],
    whyItMatters: "Mastering gravity is essential for orbital navigation, satellite launches, planetary gravity assists, and space station architecture.",
    relatedTopicIds: ["black-holes", "rockets", "satellites"],
    keyTerms: [
      { term: "Escape Velocity", definition: "The minimum speed required for a non-propelled object to break free from the gravitational pull of a primary body." },
      { term: "Microgravity", definition: "The condition of apparent weightlessness experienced by objects in continuous free-fall." }
    ]
  },
  {
    id: "light-years",
    category: "space-science",
    title: "Light Years & Cosmic Distances",
    subtitle: "Measuring the Unfathomable Depths of Interstellar Space",
    readingTimeMin: 3,
    badge: "Cosmic Yardstick",
    simpleIntroduction: "A light-year is NOT a unit of time—it is a unit of DISTANCE! It is how far a beam of light travels in one vacuum year, roughly 9.46 trillion kilometers (5.88 trillion miles).",
    scientificExplanation: "Because cosmic distances are too staggering to express in kilometers or miles, astronomers use light travel time as a cosmic ruler. Light travels at $c = 299,792\\text{ km/s}$. In one year (31.5 million seconds), light traverses $9.461 \\times 10^{12}\\text{ km}$. For smaller distances within our solar system, scientists use Astronomical Units (1 AU = ~149.6 million km, the average distance between Earth and Sun).",
    realWorldExamples: [
      "Moon to Earth: ~1.3 light-seconds away (384,400 km).",
      "Sun to Earth: ~8.3 light-minutes away (1 AU).",
      "Proxima Centauri: ~4.24 light-years away (the closest star system).",
      "Andromeda Galaxy: ~2.5 million light-years away."
    ],
    mindBlowingFacts: [
      "Looking out into space is literally looking backward in time! When you gaze at Andromeda through a telescope, you see it as it was 2.5 million years ago, when early human ancestors were first walking on Earth!",
      "The farthest galaxy observed by the James Webb Space Telescope emitted its light over 13.3 billion years ago, just a few hundred million years after the Big Bang."
    ],
    whyItMatters: "Understanding light-speed limits shows why interstellar travel is so challenging and why real-time communication across the solar system experiences unavoidable lag.",
    relatedTopicIds: ["stars", "galaxies", "exoplanets"],
    keyTerms: [
      { term: "Astronomical Unit (AU)", definition: "The mean distance from the center of the Earth to the center of the Sun (~149.6 million km)." },
      { term: "Parsec", definition: "An astronomical distance unit equal to approximately 3.26 light-years, derived from stellar parallax angles." }
    ]
  },
  {
    id: "solar-flares",
    category: "space-science",
    title: "Solar Flares & Space Weather",
    subtitle: "Explosive Releases of Magnetic Energy on the Sun",
    readingTimeMin: 3,
    badge: "Solar Dynamics",
    simpleIntroduction: "A solar flare is an intense, explosive burst of radiation on the Sun caused by the sudden snapping and reconnecting of tangled magnetic field lines around sunspots.",
    scientificExplanation: "When magnetic field lines on the solar surface become violently twisted and stressed, they undergo magnetic reconnection, releasing up to $10^{25}$ joules of energy in minutes. Solar flares emit radiation across the entire electromagnetic spectrum—from radio waves and visible light to X-rays and gamma rays. They are frequently accompanied by Coronal Mass Ejections (CMEs), which eject billions of tons of magnetized plasma into the solar system.",
    realWorldExamples: [
      "Carrington Event (1859): The most powerful geomagnetic storm in recorded history; auroras were seen near the equator, and telegraph wires sparked and caught fire!",
      "May 2024 Geomagnetic Storms: G5 extreme storms triggered breathtaking auroras worldwide and were monitored by ISRO's Aditya-L1 observatory.",
      "Halloween Solar Storms (2003): Damaged several communications satellites and forced airline flights to reroute away from polar zones."
    ],
    mindBlowingFacts: [
      "A single major X-class solar flare releases energy equivalent to millions of 100-megaton hydrogen bombs detonating at the same time!",
      "Radiation from a solar flare reaches Earth at the speed of light in just 8 minutes, but the slower plasma cloud of a CME takes 1 to 3 days to arrive."
    ],
    whyItMatters: "Solar flares can disrupt high-frequency radio communications, fry satellite electronics, distort GPS navigation by tens of meters, and induce destructive surges in power grids on Earth.",
    relatedTopicIds: ["gravity", "satellites", "stars"],
    keyTerms: [
      { term: "Coronal Mass Ejection (CME)", definition: "A massive expulsion of magnetized plasma and magnetic fields from the Sun's outer corona into interplanetary space." },
      { term: "Sunspot", definition: "A cooler, darker region on the solar surface created by concentrated bundles of intense magnetic flux." }
    ]
  },

  // AEROSPACE ENGINEERING
  {
    id: "rockets",
    category: "aerospace",
    title: "Rockets & Staging",
    subtitle: "The Machines That Pierce the Sky Using Newton's Third Law",
    readingTimeMin: 5,
    badge: "Space Propulsion",
    simpleIntroduction: "A rocket is a specialized vehicle powered by rocket engines that carry both fuel and oxidizer. By shooting hot gas out the back at supersonic speeds, the rocket is thrust forward into space!",
    scientificExplanation: "Rocket propulsion is a pure physical manifestation of Newton's Third Law of Motion: For every action, there is an equal and opposite reaction. The thrust produced is given by $F = \\dot{m} v_e + (p_e - p_0) A_e$. To reach orbit, rockets must achieve speeds exceeding $7.8\\text{ km/s}$ (~28,000 km/h). According to Konstantin Tsiolkovsky's Rocket Equation: $\\Delta v = v_e \\ln(m_0 / m_f)$, single-stage rockets cannot carry enough fuel to reach orbit; hence, rockets discard empty tanks in 'stages' (Multistage rockets) to shed dead structural weight.",
    realWorldExamples: [
      "ISRO LVM3: India's heaviest rocket, using two S200 solid strap-ons, a twin-Vikas liquid core, and a C25 cryogenic upper stage.",
      "ISRO PSLV: The versatile 4-stage workhorse that launched Chandrayaan-1, Mangalyaan, and Aditya-L1.",
      "Saturn V: The Apollo moon rocket standing 111 meters tall, producing 34.5 million Newtons of liftoff thrust."
    ],
    mindBlowingFacts: [
      "Over 85% to 90% of a rocket's total liftoff weight is just propellant (fuel + oxidizer)! The actual payload (satellite or crew) is typically only 2% to 4% of total mass!",
      "Cryogenic rocket engines burn liquid hydrogen (-253°C) and liquid oxygen (-183°C), yet their combustion chamber flames exceed 3,000°C—hot enough to vaporize steel!"
    ],
    whyItMatters: "Rocket engineering is the cornerstone of all space exploration, satellite communications, lunar outposts, and interplanetary commerce.",
    relatedTopicIds: ["satellites", "gravity", "space-exploration"],
    keyTerms: [
      { term: "Specific Impulse (Isp)", definition: "A measure of rocket propellant efficiency, indicating thrust produced per unit propellant flow rate (measured in seconds)." },
      { term: "Multistage Rocket", definition: "A rocket that uses two or more successive stages, jettisoning spent stages to shed useless structural mass." }
    ]
  },
  {
    id: "satellites",
    category: "aerospace",
    title: "Satellites & Orbital Mechanics",
    subtitle: "Artificial Sentinels Orbiting Earth for Communication, Navigation, and Weather",
    readingTimeMin: 4,
    badge: "Orbital Systems",
    simpleIntroduction: "A satellite is an object that orbits a planet. While the Moon is Earth's natural satellite, humans have launched thousands of artificial satellites to provide GPS, predict weather, and beam internet across continents.",
    scientificExplanation: "To stay in orbit, a satellite must travel at an exact orbital velocity where centrifugal inertia counterbalances Earth's gravitational pull: $v = \\sqrt{GM / r}$. The higher the orbit, the slower the satellite moves and the longer its orbital period ($T = 2\\pi \\sqrt{r^3 / GM}$). At 35,786 km altitude (Geostationary Orbit / GEO), the orbital period is exactly 24 hours, making the satellite appear frozen in the sky over one spot on Earth!",
    realWorldExamples: [
      "International Space Station (ISS): Orbits at 400 km in LEO, completing an orbit every 92 minutes at 27,600 km/h.",
      "NavIC (IRNSS): India's regional satellite navigation constellation providing sub-5 meter positioning.",
      "INSAT-3DR: ISRO advanced meteorological satellite tracking cyclones, storms, and cloud covers over the Indian Ocean."
    ],
    mindBlowingFacts: [
      "Geostationary satellites orbit at 35,786 km—almost one-tenth of the distance to the Moon!",
      "Satellites in Low Earth Orbit experience 16 sunrises and 16 sunsets every single Earth day!"
    ],
    whyItMatters: "Modern civilization cannot function without satellites: global banking, weather alerts, GPS navigation, and disaster management depend on them 24/7.",
    relatedTopicIds: ["rockets", "gravity", "space-exploration"],
    keyTerms: [
      { term: "Low Earth Orbit (LEO)", definition: "Orbits between 160 km and 2,000 km altitude, ideal for high-resolution imaging and fast communications." },
      { term: "Geostationary Orbit (GEO)", definition: "A circular 35,786 km orbit aligned with Earth's equator where orbital speed matches Earth's rotation rate." }
    ]
  },
  {
    id: "space-exploration",
    category: "aerospace",
    title: "Space Exploration & Rovers",
    subtitle: "Robotic Pioneers and Human Voyages Across the Frontiers",
    readingTimeMin: 4,
    badge: "Pioneering Voyages",
    simpleIntroduction: "Space exploration uses robotic probes, rovers, and human astronauts to venture into the unknown, analyze alien rocks, search for extraterrestrial life, and expand human horizons.",
    scientificExplanation: "Planetary exploration relies heavily on autonomous robotic rovers equipped with Rocker-Bogie suspensions, multi-spectral stereoscopic cameras, and spectrometers. Because radio signals travel at light speed and take anywhere from minutes (Mars) to hours (Jupiter) to reach Earth, deep-space rovers must utilize onboard computer vision and AI hazard detection to navigate autonomously around rocks, crevasses, and sand traps.",
    realWorldExamples: [
      "Pragyan (ISRO): 6-wheeled lunar rover that demonstrated autonomous roving and soil spectroscopy on the Moon's South Pole.",
      "Curiosity & Perseverance (NASA): Car-sized Martian rovers searching for past micro-fossil biosignatures in ancient crater lake beds.",
      "Voyager 1: Launched in 1977, now over 24 billion km from Earth in true interstellar space, still transmitting faint radio signals!"
    ],
    mindBlowingFacts: [
      "Radio signals from the Perseverance rover on Mars take anywhere from 4 to 24 minutes to reach Earth, meaning live joystick control is completely impossible!",
      "Voyager 1 carries a Golden Record containing greetings in 55 languages, animal sounds, music, and brainwave recordings for any extraterrestrial civilization that might intercept it."
    ],
    whyItMatters: "Space exploration sparks technological spin-offs (like digital image sensors, solar cells, and MRI imaging) and secures the long-term survival of human civilization.",
    relatedTopicIds: ["rockets", "satellites", "exoplanets"],
    keyTerms: [
      { term: "Rocker-Bogie Mechanism", definition: "A specialized 6-wheel suspension system that maintains uniform ground contact on rocky, uneven terrain without springs." },
      { term: "Biosignature", definition: "Any substance, element, or pattern that provides scientific evidence of past or present life." }
    ]
  },

  // SPACE OBJECTS
  {
    id: "meteors",
    category: "space-objects",
    title: "Meteoroids, Meteors & Meteorites",
    subtitle: "From Cosmic Rocks in Space to Shooting Stars in Our Skies",
    readingTimeMin: 3,
    badge: "Shooting Stars",
    simpleIntroduction: "Did you know that 'shooting stars' aren't stars at all? They are small pebbles and sand grains burning up in Earth's atmosphere! Here is how to tell them apart: Meteoroid (in space), Meteor (in the air), Meteorite (on the ground).",
    scientificExplanation: "A Meteoroid is a small rocky or metallic body drifting through space. When it enters Earth's atmosphere at hypervelocity (11 to 72 km/s), intense ram pressure compresses the air ahead of it, heating the air to thousands of degrees. This incandescent streak of glowing air and vaporized rock is a Meteor ('shooting star'). If any fragment survives this fiery descent and impacts Earth's surface, it is termed a Meteorite.",
    realWorldExamples: [
      "Perseid Meteor Shower: Occurs every August as Earth passes through the debris trail left behind by Comet Swift-Tuttle.",
      "Chelyabinsk Meteor (2013): A 20-meter asteroid exploded over Russia with the energy of ~30 Hiroshima bombs, shattering windows for kilometers.",
      "Hoba Meteorite (Namibia): The largest known intact meteorite on Earth, a massive 60-ton iron chunk that never left a crater."
    ],
    mindBlowingFacts: [
      "Over 40,000 tons of cosmic dust and micrometeorites fall onto Earth every year!",
      "Most shooting stars that create brilliant streaks in the night sky are no bigger than a grain of sand or a grain of rice!"
    ],
    whyItMatters: "Meteorites are pristine time capsules preserved from the birth of our solar system 4.6 billion years ago, revealing the exact chemical ingredients that formed our planet.",
    relatedTopicIds: ["comets", "asteroids", "gravity"],
    keyTerms: [
      { term: "Ram Pressure", definition: "The intense aerodynamic compression of air in front of a supersonic object that heats the air to glowing plasma." },
      { term: "Bolide", definition: "An exceptionally bright meteor that often explodes in a violent atmospheric airburst." }
    ]
  },
  {
    id: "comets",
    category: "space-objects",
    title: "Comets",
    subtitle: "Dirty Snowballs from the Frozen Depths of the Solar System",
    readingTimeMin: 3,
    badge: "Icy Travelers",
    simpleIntroduction: "Comets are icy celestial bodies made of frozen water, methane, ammonia, and dust. When their highly eccentric orbits bring them close to the Sun, the ice vaporizes, producing spectacular glowing tails millions of kilometers long!",
    scientificExplanation: "Comets originate in two cold, distant reservoirs: the Kuiper Belt (short-period comets, <200 years) and the Oort Cloud (long-period comets, thousands of years). As a comet approaches the Sun, solar radiation causes subsurface ices to sublimate (turn directly from solid to gas), creating an atmospheric cloud called a Coma. The solar wind and radiation pressure push this gas and dust away from the Sun, creating two distinct tails: a curved white dust tail and a straight blue ion (gas) tail that always points away from the Sun.",
    realWorldExamples: [
      "Halley's Comet: The most famous periodic comet, visible from Earth every 75–76 years (next visit in 2061!).",
      "Comet 67P/Churyumov-Gerasimenko: Explored up close by the European Space Agency's Rosetta mission and Philae lander.",
      "Comet NEOWISE (C/2020 F3): Stunned stargazers worldwide in July 2020 with its twin tails."
    ],
    mindBlowingFacts: [
      "A comet's tail does NOT trail behind it like smoke from a car! Because the tail is pushed by the solar wind, it always points directly AWAY from the Sun, even when the comet is flying away from the Sun!",
      "Many scientists believe comets colliding with early Earth delivered a significant portion of our oceans' water and pre-biotic organic molecules."
    ],
    whyItMatters: "Comets hold pristine organic molecules and primordial water ices frozen in deep-freeze since the solar nebula collapsed.",
    relatedTopicIds: ["meteors", "asteroids", "solar-flares"],
    keyTerms: [
      { term: "Sublimation", definition: "The physical transition where a substance passes directly from the solid to the gas phase without melting into a liquid." },
      { term: "Oort Cloud", definition: "A colossal spherical shell of icy objects surrounding the solar system at distances up to 100,000 AU." }
    ]
  },
  {
    id: "asteroids",
    category: "space-objects",
    title: "Asteroids & Planetary Defense",
    subtitle: "Rocky Remnants of Planetary Creation and Near-Earth Hazards",
    readingTimeMin: 4,
    badge: "Space Rocks",
    simpleIntroduction: "Asteroids are rocky, airless worlds left over from the formation of our solar system 4.6 billion years ago. Most orbit in the Main Asteroid Belt between Mars and Jupiter.",
    scientificExplanation: "Asteroids range in size from tiny boulders to miniature planets hundreds of kilometers across (like Ceres). They are classified into three chemical types: C-type (carbonaceous, dark, rich in water and organic compounds), S-type (silicate and rocky), and M-type (metallic nickel-iron). Gravitational nudges from Jupiter can kick asteroids into Earth-crossing orbits, designating them as Near-Earth Asteroids (NEAs) and Potentially Hazardous Asteroids (PHAs).",
    realWorldExamples: [
      "16 Psyche: A giant metallic asteroid thought to be the exposed iron-nickel core of a shattered protoplanet, currently being visited by NASA's Psyche probe.",
      "Chicxulub Impactor: The 10-km asteroid that struck Mexico's Yucatan Peninsula 66 million years ago, ending the age of the dinosaurs.",
      "DART Mission (Double Asteroid Redirection Test): In 2022, NASA intentionally crashed a spacecraft into asteroid Dimorphos, successfully altering its orbit in humanity's first planetary defense test!"
    ],
    mindBlowingFacts: [
      "If you gathered all the millions of asteroids in the Main Asteroid Belt together, their combined mass would still be smaller than Earth's Moon!",
      "The precious metals (gold, platinum, nickel) contained inside asteroid 16 Psyche alone are estimated to be worth over $10,000 quadrillion—more than the entire global economy!"
    ],
    whyItMatters: "Tracking asteroids is essential for Planetary Defense (preventing catastrophic impacts) and will fuel the future space economy through in-situ asteroid resource mining.",
    relatedTopicIds: ["meteors", "comets", "gravity"],
    keyTerms: [
      { term: "Planetary Defense", definition: "The coordinated global scientific effort to detect, track, and deflect hazardous asteroids that threaten Earth." },
      { term: "Kinetic Impactor", definition: "A technique to deflect an asteroid by ramming a heavy spacecraft into it at high speed to change its velocity vector." }
    ]
  }
];

