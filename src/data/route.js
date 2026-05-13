// Ruta canónica del Camino Real desde Castillo Negro hasta Lanza del Sol.
// Distancias en km según el mapa oficial de GRRM (~4.800 km total).
//
// Coordenadas en el viewBox 100 × 192 alineadas al mapa de Wikimedia
// "Westeros Map.png" (Lands of Ice and Fire).
// Si alguna ciudad no cae donde corresponde, editá x e y acá.

export const ROUTE = [
  { id: "castle-black",   name: "Castle Black",          region: "The Wall · Night's Watch",      km: 0,    x: 47, y: 16,  type: "wall",     major: true  },
  { id: "last-hearth",    name: "Last Hearth",           region: "The North · House Umber",       km: 220,  x: 56, y: 24,  type: "tower",    major: false },
  { id: "barrowton",      name: "Barrowton",             region: "The North · House Dustin",      km: 700,  x: 34, y: 48,  type: "tower",    major: false },
  { id: "winterfell",     name: "Winterfell",            region: "The North · House Stark",       km: 965,  x: 45, y: 44,  type: "castle",   major: true  },
  { id: "moat-cailin",    name: "Moat Cailin",           region: "The Neck · ruins",              km: 1500, x: 47, y: 66,  type: "ruin",     major: false },
  { id: "twins",          name: "The Twins",             region: "Riverlands · House Frey",       km: 1930, x: 44, y: 78,  type: "bridge",   major: false },
  { id: "crossroads-inn", name: "Inn at the Crossroads", region: "Riverlands",                    km: 2300, x: 52, y: 88,  type: "inn",      major: false },
  { id: "harrenhal",      name: "Harrenhal",             region: "Cursed ruins · House Whent",    km: 2400, x: 48, y: 93,  type: "ruin",     major: false },
  { id: "kings-landing",  name: "King's Landing",        region: "Iron Throne · Crownlands",      km: 2830, x: 64, y: 103, type: "castle",   major: true  },
  { id: "storms-end",     name: "Storm's End",           region: "Stormlands · House Baratheon",  km: 3300, x: 65, y: 125, type: "castle",   major: true  },
  { id: "princes-pass",   name: "Prince's Pass",         region: "Dornish Marches",               km: 3650, x: 56, y: 140, type: "mountain", major: false },
  { id: "ghaston-grey",   name: "Ghaston Grey",          region: "Dorne · House Allyrion",        km: 3850, x: 62, y: 150, type: "tower",    major: false },
  { id: "sunspear",       name: "Sunspear",              region: "Dorne · House Martell",         km: 4800, x: 79, y: 155, type: "palace",   major: true  },
];

export const TOTAL_KM = ROUTE[ROUTE.length - 1].km;
export const LEGUA_KM = 4.8;

// Dimensiones del viewBox del mapa.
export const MAP_W = 100;
export const MAP_H = 192;
