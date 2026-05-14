// Ruta canónica desde Castle Black hasta Sunspear, recorriendo Poniente.
// Distancias en km Westeros (estimadas a partir del mapa oficial GRRM).
// Coordenadas (x,y) en el viewBox 100 × 178 alineadas al mapa de Behance.
// Total ≈ 5475 km → con scale=2 = 2737.5 km reales = 1 año @ 10k pasos/día.

const FANDOM = (p) => `https://static.wikia.nocookie.net/gameofthrones/images/${p}/revision/latest`;

export const ROUTE = [
  {
    id: "castle-black",  name: "Castle Black",  region: "The Wall · Night's Watch",
    km: 0,    x: 47, y: 15,  type: "wall",   major: true,
    photo: FANDOM("7/7b/Castle_Black.jpg"),
    desc: "Sede principal de la Guardia de la Noche. La fortaleza al pie del Muro donde Jon Snow tomó los votos. Comandada por el Lord Comandante.",
  },
  {
    id: "eastwatch",  name: "Eastwatch-by-the-Sea",  region: "The Wall · Night's Watch",
    km: 200,  x: 64, y: 13,  type: "tower",  major: false,
    photo: FANDOM("c/c0/Eastwatch-TitleS.png"),
    desc: "Castillo de la Guardia en la costa este del Muro. Puerto fortificado desde donde Davos zarpa con Jon hacia Dragonstone.",
  },
  {
    id: "last-hearth",  name: "Last Hearth",  region: "The North · House Umber",
    km: 500,  x: 56, y: 22,  type: "tower",  major: false,
    photo: null,
    desc: "Última fortaleza del Norte antes del Muro. Hogar ancestral de la Casa Umber, leales bandera Stark hasta la traición.",
  },
  {
    id: "winterfell",  name: "Winterfell",  region: "The North · House Stark",
    km: 950,  x: 45, y: 41,  type: "castle", major: true,
    photo: FANDOM("5/50/Winterfell_Exterior.jpg"),
    desc: "Fortaleza ancestral de la Casa Stark, capital del Norte. Construida sobre fuentes termales por Brandon el Constructor hace ocho mil años.",
  },
  {
    id: "white-harbor",  name: "White Harbor",  region: "The North · House Manderly",
    km: 1200, x: 60, y: 54,  type: "castle", major: false,
    photo: FANDOM("6/67/White_Harbor_Pin.png"),
    desc: "Único puerto del Norte, sede de la Casa Manderly. Ciudad amurallada con el Tritón blanco como sigilo.",
  },
  {
    id: "barrowton",  name: "Barrowton",  region: "The North · House Dustin",
    km: 1450, x: 32, y: 52,  type: "tower",  major: false,
    photo: FANDOM("d/d7/Barrowton.png"),
    desc: "Pueblo del Norte sobre los Túmulos. Sede de la Casa Dustin, construido encima de tumbas de los Primeros Hombres.",
  },
  {
    id: "moat-cailin",  name: "Moat Cailin",  region: "The Neck · ruins",
    km: 1700, x: 47, y: 61,  type: "ruin",   major: false,
    photo: FANDOM("9/9b/Moat_Cailin_5x03_%283%29.png"),
    desc: "Antigua fortaleza en El Cuello, hoy en ruinas. Trampa natural en el único paso terrestre que protege al Norte.",
  },
  {
    id: "twins",  name: "The Twins",  region: "Riverlands · House Frey",
    km: 1980, x: 44, y: 72,  type: "bridge", major: false,
    photo: FANDOM("6/6f/Twins_during_the_Dance_of_the_Dragons.png"),
    desc: "Castillo gemelo de los Frey, único cruce del Forca Verde. Tristemente famoso por la Boda Roja.",
  },
  {
    id: "riverrun",  name: "Riverrun",  region: "Riverlands · House Tully",
    km: 2200, x: 35, y: 76,  type: "castle", major: false,
    photo: FANDOM("0/0c/Riverrun.png"),
    desc: "Sede de la Casa Tully en la confluencia del Tumblestone y la Forca Roja. \"Familia, Deber, Honor\".",
  },
  {
    id: "crossroads-inn",  name: "Inn at the Crossroads",  region: "Riverlands",
    km: 2450, x: 52, y: 82,  type: "inn",    major: false,
    photo: FANDOM("f/fa/Inn_at_the_Crossroads.jpg"),
    desc: "Posada de los Cuatro Caminos, cruce de rutas del Tridente. Catelyn arrestó aquí a Tyrion Lannister.",
  },
  {
    id: "eyrie",  name: "The Eyrie",  region: "The Vale · House Arryn",
    km: 2700, x: 65, y: 74,  type: "mountain", major: false,
    photo: FANDOM("6/6e/Eyrie_Blood_Gate_Hotd.jpg"),
    desc: "Fortaleza inaccesible de la Casa Arryn, en lo alto de las Montañas de la Luna. Famosa por sus celdas del cielo.",
  },
  {
    id: "harrenhal",  name: "Harrenhal",  region: "Riverlands · cursed ruins",
    km: 2920, x: 48, y: 86,  type: "ruin",   major: false,
    photo: FANDOM("9/9b/Harrenhal.jpg"),
    desc: "Castillo maldito junto al Ojo de Dioses. Aegon el Conquistador lo quemó con Balerion durante la Conquista. El más grande de Poniente.",
  },
  {
    id: "kings-landing",  name: "King's Landing",  region: "Crownlands · Iron Throne",
    km: 3170, x: 64, y: 96,  type: "castle", major: true,
    photo: FANDOM("9/93/King%27s_Landing.jpg"),
    desc: "Capital de los Siete Reinos. Sede del Trono de Hierro en la Fortaleza Roja, construida por Aegon el Conquistador.",
  },
  {
    id: "dragonstone",  name: "Dragonstone",  region: "Crownlands · House Targaryen",
    km: 3300, x: 72, y: 97,  type: "castle", major: false,
    photo: FANDOM("2/25/Dragonstone.png"),
    desc: "Isla volcánica ancestral de la Casa Targaryen, primer hogar al llegar a Poniente. Cuna de los reyes dragón.",
  },
  {
    id: "storms-end",  name: "Storm's End",  region: "Stormlands · House Baratheon",
    km: 3580, x: 65, y: 116, type: "castle", major: true,
    photo: FANDOM("b/b0/StormsEndCompleteGuide.png"),
    desc: "Fortaleza Baratheon en el Cabo Roto, jamás conquistada. Resistió mil tormentas y el asedio del año del falso amanecer.",
  },
  {
    id: "highgarden",  name: "Highgarden",  region: "The Reach · House Tyrell",
    km: 3950, x: 38, y: 113, type: "castle", major: false,
    photo: FANDOM("d/d8/Highgarden.jpg"),
    desc: "Sede de la Casa Tyrell, capital del Dominio. Rodeada de rosales, viñedos y los jardines más bellos de Poniente.",
  },
  {
    id: "oldtown",  name: "Oldtown",  region: "The Reach · Hightower & Citadel",
    km: 4250, x: 26, y: 132, type: "castle", major: false,
    photo: FANDOM("9/94/Oldtown.png"),
    desc: "Ciudad más antigua de Poniente. Sede del Faro y de la Ciudadela donde se forjan los maestres con sus eslabones.",
  },
  {
    id: "princes-pass",  name: "Prince's Pass",  region: "Dornish Marches",
    km: 4750, x: 56, y: 130, type: "mountain", major: false,
    photo: null,
    desc: "Paso de montaña entre el Dominio y Dorne, atravesando las Montañas Rojas. Una de las pocas rutas terrestres dornienses.",
  },
  {
    id: "sunspear",  name: "Sunspear",  region: "Dorne · House Martell",
    km: 5475, x: 79, y: 144, type: "palace", major: true,
    photo: FANDOM("0/02/Sunspear.png"),
    desc: "Capital de Dorne, sede de la Casa Martell. Bajo las Torres del Sol, el Plato Antiguo y las palmeras del Mar de Verano. \"Nunca doblegado, nunca roto\".",
  },
];

export const TOTAL_KM = ROUTE[ROUTE.length - 1].km;
export const LEGUA_KM = 4.8;

export const MAP_W = 100;
export const MAP_H = 178;
