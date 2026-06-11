// Spacecraft UI data, telemetry, and translations
export interface MissionInfo {
  id: string;
  number: string;
  title: string;
  headline: string;
  description: string;
  stats: {
    crewCount: string;
    distance: string;
    vessel: string;
    temperature: string;
  };
  astronauts: {
    name: string;
    role: string;
    avatarInitials: string;
    status: string;
  }[];
  solarSystem: {
    earth: {
      name: string;
      tag: string;
      desc: string;
      metrics: string[];
    };
    planets: {
      name: string;
      tag: string;
      desc: string;
      metrics: string[];
    };
    meteors: {
      name: string;
      tag: string;
      desc: string;
      metrics: string[];
    };
  };
}

export const MISSIONS: Record<string, MissionInfo> = {
  "01": {
    id: "01",
    number: "01",
    title: "Intergalactic Cosmos",
    headline: "Bridging the Gap between Earth and Humanity",
    description: "It offers a wide range of content pointed to space tourism, including articles, videos and tour guides.",
    stats: {
      crewCount: "+102k Active",
      distance: "384,400 KM",
      vessel: "Artemis III",
      temperature: "-130°C to 120°C"
    },
    astronauts: [
      { name: "Moyorh Vance", role: "Mission Commander", avatarInitials: "MV", status: "FLIGHT ACTIVE" },
      { name: "Helen Cho", role: "Astrophysicist", avatarInitials: "HC", status: "LIFE SUPPORT OK" },
      { name: "Marcus Reed", role: "Systems Engineer", avatarInitials: "MR", status: "TELEMETRY STABLE" }
    ],
    solarSystem: {
      earth: {
        name: "Earth",
        tag: "Base Station Blue",
        desc: "The cradle of humanity. Experience low-gravity Earth orbital luxury cruises and atmospheric thermosphere flights.",
        metrics: ["Gravity: 1.0g", "Orbit Altitude: 400km", "Speed: 27,600 km/h"]
      },
      planets: {
        name: "Planets",
        tag: "Arid Red & Gas Giants",
        desc: "Embark on Martian red-dune expeditions or hover over spectacular Jovian hurricane rings.",
        metrics: ["Voyage: 6 Months", "Gravity: 0.38g", "Key Base: Olympus City"]
      },
      meteors: {
        name: "Meteors",
        tag: "Prospecting Fields",
        desc: "High-octane deep space excursions to luxury mining hubs on Near-Earth Asteroids like Psyche 16.",
        metrics: ["Yield: 10k Tons", "Metal Density: 94%", "Safety Rating: Class-A"]
      }
    }
  },
  "02": {
    id: "02",
    number: "02",
    title: "Aetherius Settlement",
    headline: "Unveiling Horizons on Martian Sovereignty",
    description: "Venturing beyond our celestial shores to cultivate the next golden age of research and localized biological domes.",
    stats: {
      crewCount: "+15k Settlers",
      distance: "225M KM",
      vessel: "Zephyr Transporter",
      temperature: "-153°C to 20°C"
    },
    astronauts: [
      { name: "Evelyn Finch", role: "Lead Xenobiologist", avatarInitials: "EF", status: "RESEARCH ACTIVE" },
      { name: "Devon Kaiser", role: "Habitation Captain", avatarInitials: "DK", status: "PRESSURE OK" },
      { name: "Aria Sterling", role: "Terraforming Ops", avatarInitials: "AS", status: "MAINFRAME STABLE" }
    ],
    solarSystem: {
      earth: {
        name: "Earth",
        tag: "Comm-Link Mainframe",
        desc: "Gateway to the stars. Direct daily quantum laser data feeds communicating terraforming grids directly.",
        metrics: ["Ping: 14 Minutes", "Feed: 4.8 Pbps", "Silos: Active"]
      },
      planets: {
        name: "Planets",
        tag: "Martian Frontier",
        desc: "Take part in high-end subsurface cave mapping, Olympus Mons hover-boarding, and solar storm viewings.",
        metrics: ["Days: 24h 39m", "Atmosphere: CO2 Grid", "Shielding: Magnetic Dome"]
      },
      meteors: {
        name: "Meteors",
        tag: "Phobos Fuel Stations",
        desc: "Deimos and Phobos fuel depots loading water ice extracts into heavy interplanetary haulers.",
        metrics: ["Ice Core: 82%", "Refining: Autonomous", "Docking: Gate-B"]
      }
    }
  },
  "03": {
    id: "03",
    number: "03",
    title: "Stellar Prospecting",
    headline: "Tapping the Incalculable Asteroid Hoard",
    description: "The economic backbone of humanity's expansion. Mining supermassive heavy-metal asteroid fields with deep-space rigs.",
    stats: {
      crewCount: "+4.2k Miners",
      distance: "450M KM",
      vessel: "Goliath Hull VIII",
      temperature: "-180°C to -10°C"
    },
    astronauts: [
      { name: "Kaelen Voss", role: "Drilling Supervisor", avatarInitials: "KV", status: "OPERATION ACTIVE" },
      { name: "Nari Patel", role: "Geophysical Tech", avatarInitials: "NP", status: "SCANNING RADAR" },
      { name: "Tariq Vance", role: "Heavy Pilot", avatarInitials: "TV", status: "DOCKING CLAMPS IN" }
    ],
    solarSystem: {
      earth: {
        name: "Earth",
        tag: "Logistics Terminal",
        desc: "Direct shipping routes delivering rare-earth ores directly to high-altitude space elevator docks.",
        metrics: ["Freight: 1.2M Tons/mo", "Elevators: 3 Active", "Yield: Premium Gold"]
      },
      planets: {
        name: "Planets",
        tag: "Ceres Command HQ",
        desc: "The inner solar system's logistics capital. Heavy freight control coordinating outer belts.",
        metrics: ["Station: Ceres Ring", "Population: 8.4k", "Artificial G: 0.3g"]
      },
      meteors: {
        name: "Meteors",
        tag: "Psyche Core Slicers",
        desc: "High-yield thermal cutters harvesting solid platinum, nickel-iron cores, and rare asteroid diamond nodes.",
        metrics: ["Diameter: 220km", "Value: $10Q Est.", "Laser Drills: 16 Units"]
      }
    }
  }
};

// Simple translations or labels to toggle language with
export const TRANSLATIONS = {
  EN: {
    menu: "Menu",
    searching: "Searching...",
    discover: "Discover",
    more: "More",
    earth: "Earth",
    planets: "Planets",
    meteors: "Meteors",
    searchPlaceholder: "Search solar systems...",
    crew: "Astronaut Crew",
    stars: "Universal Stars",
    ready: "Get ready with us",
    travelWithUs: "Enjoy travel with us.",
    travelSub: "For anyone incorporated in exploring outer space travel."
  },
  FR: {
    menu: "Menu",
    searching: "Recherche...",
    discover: "Découvrir",
    more: "Plus d'infos",
    earth: "Terre",
    planets: "Planètes",
    meteors: "Météores",
    searchPlaceholder: "Rechercher des systèmes...",
    crew: "Équipage d'astronautes",
    stars: "Étoiles Universelles",
    ready: "Préparez-vous avec nous",
    travelWithUs: "Profitez du voyage avec nous.",
    travelSub: "Pour tous ceux qui souhaitent explorer l'espace lointain."
  }
};
