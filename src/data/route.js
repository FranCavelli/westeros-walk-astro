// Ruta canónica desde Castle Black hasta Sunspear, recorriendo Poniente.
// 28 paradas. Total ≈ 5475 km → con scale=2 = 1 año @ 10k pasos/día.
// Coordenadas (x,y) calibradas visualmente sobre el mapa de Behance.
// viewBox 100 × 178. Eje Y: 0 = top, 178 = bottom.

const FANDOM = (p) => `https://static.wikia.nocookie.net/gameofthrones/images/${p}/revision/latest`;

export const ROUTE = [
  {
    id: "castle-black",    name: "Castle Black",     region: "The Wall · Night's Watch",
    km: 0,    x: 42, y: 21, type: "wall",   major: true,
    photo: FANDOM("7/7b/Castle_Black.jpg"),
    desc: "Sede principal de la Guardia de la Noche. La fortaleza al pie del Muro donde Jon Snow tomó los votos.",
  },
  {
    id: "eastwatch",       name: "Eastwatch-by-the-Sea", region: "The Wall · Night's Watch",
    km: 200,  x: 62, y: 20, type: "tower",  major: false,
    photo: FANDOM("c/c0/Eastwatch-TitleS.png"),
    desc: "Castillo de la Guardia en la costa este del Muro. Puerto fortificado.",
  },
  {
    id: "karhold",         name: "Karhold",          region: "The North · House Karstark",
    km: 380,  x: 68, y: 26, type: "castle", major: false,
    photo: null,
    desc: "Sede de la Casa Karstark en el extremo noreste del Norte.",
  },
  {
    id: "last-hearth",     name: "Last Hearth",      region: "The North · House Umber",
    km: 540,  x: 49, y: 32, type: "tower",  major: false,
    photo: null,
    desc: "Última fortaleza del Norte antes del Muro. Hogar de la Casa Umber.",
  },
  {
    id: "dreadfort",       name: "The Dreadfort",    region: "The North · House Bolton",
    km: 760,  x: 45, y: 38, type: "castle", major: false,
    photo: null,
    desc: "Fortaleza de la Casa Bolton, los desollados. Tristemente célebre por las cámaras de tortura.",
  },
  {
    id: "winterfell",      name: "Winterfell",       region: "The North · House Stark",
    km: 980,  x: 30, y: 43, type: "castle", major: true,
    photo: FANDOM("5/50/Winterfell_Exterior.jpg"),
    desc: "Fortaleza ancestral de la Casa Stark, capital del Norte. Construida sobre fuentes termales por Brandon el Constructor hace ocho mil años.",
  },
  {
    id: "white-harbor",    name: "White Harbor",     region: "The North · House Manderly",
    km: 1200, x: 51, y: 60, type: "castle", major: false,
    photo: FANDOM("6/67/White_Harbor_Pin.png"),
    desc: "Único puerto del Norte, sede de la Casa Manderly. Ciudad amurallada con el Tritón blanco.",
  },
  {
    id: "barrowton",       name: "Barrowton",        region: "The North · House Dustin",
    km: 1450, x: 20, y: 53, type: "tower",  major: false,
    photo: FANDOM("d/d7/Barrowton.png"),
    desc: "Pueblo del Norte sobre los Túmulos. Construido encima de tumbas de los Primeros Hombres.",
  },
  {
    id: "moat-cailin",     name: "Moat Cailin",      region: "The Neck · ruins",
    km: 1680, x: 37, y: 68, type: "ruin",   major: false,
    photo: FANDOM("9/9b/Moat_Cailin_5x03_%283%29.png"),
    desc: "Antigua fortaleza en ruinas. Trampa natural en el único paso terrestre que protege al Norte.",
  },
  {
    id: "twins",           name: "The Twins",        region: "Riverlands · House Frey",
    km: 1900, x: 37, y: 74, type: "bridge", major: false,
    photo: FANDOM("6/6f/Twins_during_the_Dance_of_the_Dragons.png"),
    desc: "Castillo gemelo de los Frey, único cruce del Forca Verde. Tristemente famoso por la Boda Roja.",
  },
  {
    id: "seagard",         name: "Seagard",          region: "Riverlands · House Mallister",
    km: 2050, x: 19, y: 75, type: "tower",  major: false,
    photo: null,
    desc: "Fortaleza costera de la Casa Mallister. Defensa contra las incursiones de los Hijos del Hierro.",
  },
  {
    id: "riverrun",        name: "Riverrun",         region: "Riverlands · House Tully",
    km: 2200, x: 30, y: 86, type: "castle", major: false,
    photo: FANDOM("0/0c/Riverrun.png"),
    desc: "Sede de la Casa Tully en la confluencia del Tumblestone y la Forca Roja. \"Familia, Deber, Honor\".",
  },
  {
    id: "eyrie",           name: "The Eyrie",        region: "The Vale · House Arryn",
    km: 2480, x: 62, y: 78, type: "mountain", major: false,
    photo: FANDOM("6/6e/Eyrie_Blood_Gate_Hotd.jpg"),
    desc: "Fortaleza inaccesible en lo alto de las Montañas de la Luna. Famosa por sus celdas del cielo.",
  },
  {
    id: "crossroads-inn",  name: "Inn at the Crossroads", region: "Riverlands",
    km: 2680, x: 44, y: 88, type: "inn",    major: false,
    photo: FANDOM("f/fa/Inn_at_the_Crossroads.jpg"),
    desc: "Posada de los Cuatro Caminos. Catelyn arrestó aquí a Tyrion Lannister.",
  },
  {
    id: "harrenhal",       name: "Harrenhal",        region: "Riverlands · cursed ruins",
    km: 2850, x: 44, y: 93, type: "ruin",   major: false,
    photo: FANDOM("9/9b/Harrenhal.jpg"),
    desc: "Castillo maldito junto al Ojo de Dioses. Aegon el Conquistador lo quemó con Balerion durante la Conquista.",
  },
  {
    id: "golden-tooth",    name: "The Golden Tooth", region: "Westerlands · House Lefford",
    km: 3050, x: 23, y: 92, type: "mountain", major: false,
    photo: null,
    desc: "Paso fortificado entre las Tierras de los Ríos y las del Oeste.",
  },
  {
    id: "lannisport",      name: "Lannisport",       region: "Westerlands · House Lannister",
    km: 3250, x: 15, y: 92, type: "castle", major: false,
    photo: null,
    desc: "Tercera ciudad más grande de Poniente, puerto Lannister al pie de Roca Casterly.",
  },
  {
    id: "casterly-rock",   name: "Casterly Rock",    region: "Westerlands · House Lannister",
    km: 3320, x: 18, y: 89, type: "palace", major: true,
    photo: null,
    desc: "Sede ancestral de la Casa Lannister, tallada en una montaña de roca sobre el Mar del Ocaso. Cuna de las minas de oro.",
  },
  {
    id: "kings-landing",   name: "King's Landing",   region: "Crownlands · Iron Throne",
    km: 3650, x: 51, y: 105, type: "castle", major: true,
    photo: FANDOM("9/93/King%27s_Landing.jpg"),
    desc: "Capital de los Siete Reinos. Sede del Trono de Hierro en la Fortaleza Roja, construida por Aegon el Conquistador.",
  },
  {
    id: "dragonstone",     name: "Dragonstone",      region: "Crownlands · House Targaryen",
    km: 3780, x: 66, y: 102, type: "castle", major: false,
    photo: FANDOM("2/25/Dragonstone.png"),
    desc: "Isla volcánica ancestral de la Casa Targaryen, primer hogar al llegar a Poniente.",
  },
  {
    id: "storms-end",      name: "Storm's End",      region: "Stormlands · House Baratheon",
    km: 4040, x: 53, y: 124, type: "castle", major: true,
    photo: FANDOM("b/b0/StormsEndCompleteGuide.png"),
    desc: "Fortaleza Baratheon en el Cabo Roto, jamás conquistada. Resistió mil tormentas.",
  },
  {
    id: "bitterbridge",    name: "Bitterbridge",     region: "The Reach · House Caswell",
    km: 4350, x: 45, y: 117, type: "bridge", major: false,
    photo: null,
    desc: "Puente sobre el Mander, sede de la Casa Caswell. Lugar de la coronación de Renly Baratheon.",
  },
  {
    id: "highgarden",      name: "Highgarden",       region: "The Reach · House Tyrell",
    km: 4530, x: 38, y: 122, type: "castle", major: false,
    photo: FANDOM("d/d8/Highgarden.jpg"),
    desc: "Sede de la Casa Tyrell, capital del Dominio. Rodeada de rosales y viñedos.",
  },
  {
    id: "oldtown",         name: "Oldtown",          region: "The Reach · Hightower & Citadel",
    km: 4770, x: 24, y: 142, type: "castle", major: false,
    photo: FANDOM("9/94/Oldtown.png"),
    desc: "Ciudad más antigua de Poniente. Sede del Faro y de la Ciudadela donde se forjan los maestres.",
  },
  {
    id: "arbor",           name: "The Arbor",        region: "The Reach · House Redwyne",
    km: 4870, x: 26, y: 159, type: "castle", major: false,
    photo: null,
    desc: "Isla de viñedos al sur del Dominio. Produce el vino dorado más renombrado de Poniente.",
  },
  {
    id: "princes-pass",    name: "Prince's Pass",    region: "Dornish Marches",
    km: 5100, x: 43, y: 135, type: "mountain", major: false,
    photo: null,
    desc: "Paso de montaña entre el Dominio y Dorne, atravesando las Montañas Rojas.",
  },
  {
    id: "yronwood",        name: "Yronwood",         region: "Dorne · House Yronwood",
    km: 5290, x: 53, y: 151, type: "castle", major: false,
    photo: null,
    desc: "Sede de la Casa Yronwood, los \"Reyes de la Piedra\" antes de los Martell.",
  },
  {
    id: "sunspear",        name: "Sunspear",         region: "Dorne · House Martell",
    km: 5475, x: 68, y: 156, type: "palace", major: true,
    photo: FANDOM("0/02/Sunspear.png"),
    desc: "Capital de Dorne, sede de la Casa Martell. \"Nunca doblegado, nunca roto\".",
  },
];

export const TOTAL_KM = ROUTE[ROUTE.length - 1].km;
export const LEGUA_KM = 4.8;

export const MAP_W = 100;
export const MAP_H = 178;
