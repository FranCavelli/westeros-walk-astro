// Roster de personajes: GoT + Casa del Dragón. Si la foto falla se cae al sigilo.

const TA = (img) => `https://thronesapi.com/assets/images/${img}`;
const FANDOM = (path) => `https://static.wikia.nocookie.net/gameofthrones/images/${path}/revision/latest`;

export const CHARACTERS = [
  // Game of Thrones
  // Stark
  { id: "jon-snow",   name: "Jon Snow",        house: "Stark",     saga: "got",  sigil: "🐺", color: "#3a3a3a", accent: "#e8e8e8", photo: TA("jon-snow.jpg") },
  { id: "ned",        name: "Eddard Stark",    house: "Stark",     saga: "got",  sigil: "🐺", color: "#3a3a3a", accent: "#e8e8e8", photo: TA("ned-stark.jpg") },
  { id: "catelyn",    name: "Catelyn Stark",   house: "Stark",     saga: "got",  sigil: "🐟", color: "#3a3a3a", accent: "#3a6b8a", photo: TA("catelyn-stark.jpg") },
  { id: "robb",       name: "Robb Stark",      house: "Stark",     saga: "got",  sigil: "🐺", color: "#3a3a3a", accent: "#e8e8e8", photo: TA("robb-stark.jpg") },
  { id: "sansa",      name: "Sansa Stark",     house: "Stark",     saga: "got",  sigil: "🐺", color: "#3a3a3a", accent: "#e8e8e8", photo: TA("sansa-stark.jpeg") },
  { id: "arya",       name: "Arya Stark",      house: "Stark",     saga: "got",  sigil: "🐺", color: "#3a3a3a", accent: "#e8e8e8", photo: TA("arya-stark.jpg") },
  { id: "bran",       name: "Bran Stark",      house: "Stark",     saga: "got",  sigil: "🦅", color: "#3a3a3a", accent: "#e8e8e8", photo: TA("bran-stark.jpg") },
  { id: "rickon",     name: "Rickon Stark",    house: "Stark",     saga: "got",  sigil: "🐺", color: "#3a3a3a", accent: "#e8e8e8", photo: TA("rickon.jpg") },
  { id: "hodor",      name: "Hodor",           house: "Stark",     saga: "got",  sigil: "🛡️", color: "#3a3a3a", accent: "#a0a0a0", photo: TA("hodor.jpg") },
  // Lannister
  { id: "tywin",      name: "Tywin Lannister",   house: "Lannister", saga: "got", sigil: "🦁", color: "#7a0303", accent: "#d4af37", photo: TA("tywin-lannister.jpg") },
  { id: "cersei",     name: "Cersei Lannister",  house: "Lannister", saga: "got", sigil: "🦁", color: "#7a0303", accent: "#d4af37", photo: TA("cersei.jpg") },
  { id: "jaime",      name: "Jaime Lannister",   house: "Lannister", saga: "got", sigil: "🦁", color: "#7a0303", accent: "#d4af37", photo: TA("jaime-lannister.jpg") },
  { id: "tyrion",     name: "Tyrion Lannister",  house: "Lannister", saga: "got", sigil: "🦁", color: "#7a0303", accent: "#d4af37", photo: TA("tyrion-lannister.jpg") },
  { id: "joffrey",    name: "Joffrey Baratheon", house: "Lannister", saga: "got", sigil: "🦁", color: "#7a0303", accent: "#d4af37", photo: TA("joffrey.jpg") },
  { id: "tommen",     name: "Tommen Baratheon",  house: "Lannister", saga: "got", sigil: "🦁", color: "#7a0303", accent: "#d4af37", photo: TA("tommen.jpg") },
  // Targaryen (GoT)
  { id: "daenerys",   name: "Daenerys Targaryen", house: "Targaryen", saga: "got", sigil: "🐉", color: "#2b0000", accent: "#a30000", photo: TA("daenerys.jpg") },
  { id: "viserys",    name: "Viserys Targaryen",  house: "Targaryen", saga: "got", sigil: "🐉", color: "#2b0000", accent: "#a30000", photo: TA("viserys-targaryan.jpg") },
  // Baratheon
  { id: "robert",     name: "Robert Baratheon",  house: "Baratheon", saga: "got", sigil: "🦌", color: "#1a1a1a", accent: "#d4af37", photo: TA("king-robert.jpg") },
  { id: "stannis",    name: "Stannis Baratheon", house: "Baratheon", saga: "got", sigil: "🦌", color: "#1a1a1a", accent: "#d4af37", photo: TA("stannis.jpg") },
  { id: "gendry",     name: "Gendry",            house: "Baratheon", saga: "got", sigil: "🦌", color: "#1a1a1a", accent: "#d4af37", photo: TA("gendry.jpg") },
  // Tyrell
  { id: "margaery",   name: "Margaery Tyrell", house: "Tyrell",  saga: "got", sigil: "🌹", color: "#2d5b2d", accent: "#e8c547", photo: TA("margaery-tyrell.jpg") },
  { id: "olenna",     name: "Olenna Tyrell",   house: "Tyrell",  saga: "got", sigil: "🌹", color: "#2d5b2d", accent: "#e8c547", photo: TA("olenna-tyrell.jpg") },
  // Martell
  { id: "oberyn",     name: "Oberyn Martell",  house: "Martell", saga: "got", sigil: "☀️", color: "#b34000", accent: "#ffd700", photo: TA("red-viper.jpg") },
  { id: "ellaria",    name: "Ellaria Sand",    house: "Martell", saga: "got", sigil: "☀️", color: "#b34000", accent: "#ffd700", photo: TA("ellaria-sand.jpg") },
  // Greyjoy
  { id: "theon",      name: "Theon Greyjoy",   house: "Greyjoy", saga: "got", sigil: "🐙", color: "#1a1a2e", accent: "#c9b27f", photo: TA("theon.jpg") },
  { id: "yara",       name: "Yara Greyjoy",    house: "Greyjoy", saga: "got", sigil: "🐙", color: "#1a1a2e", accent: "#c9b27f", photo: TA("yara-greyjoy.jpg") },
  { id: "euron",      name: "Euron Greyjoy",   house: "Greyjoy", saga: "got", sigil: "🐙", color: "#1a1a2e", accent: "#c9b27f", photo: TA("euron-greyjoy.jpg") },
  // Mormont
  { id: "jorah",      name: "Jorah Mormont",     house: "Mormont", saga: "got", sigil: "🐻", color: "#2d3d2d", accent: "#a0a060", photo: TA("jorah-mormont.jpg") },
  { id: "jeor",       name: "Jeor Mormont",      house: "Mormont", saga: "got", sigil: "🐻", color: "#2d3d2d", accent: "#a0a060", photo: TA("lord-commander-mormont.jpg") },
  // Bolton
  { id: "roose",      name: "Roose Bolton",      house: "Bolton",  saga: "got", sigil: "🩸", color: "#3a1a1a", accent: "#9a8a70", photo: TA("roose-bolton.jpg") },
  { id: "ramsay",     name: "Ramsay Bolton",     house: "Bolton",  saga: "got", sigil: "🩸", color: "#3a1a1a", accent: "#9a8a70", photo: TA("ramsey-bolton.jpg") },
  // Tarly
  { id: "samwell",    name: "Samwell Tarly",     house: "Tarly",     saga: "got", sigil: "📚", color: "#5a2020", accent: "#d4af37", photo: TA("sam.jpg") },
  { id: "gilly",      name: "Gilly",             house: "Pueblo Libre", saga: "got", sigil: "🪶", color: "#3a3a4a", accent: "#c8dde6", photo: TA("gilly.jpg") },
  // Pueblo Libre
  { id: "tormund",    name: "Tormund",           house: "Pueblo Libre", saga: "got", sigil: "🪓", color: "#3a3a4a", accent: "#c8dde6", photo: TA("tormund-giantsbane.jpg") },
  { id: "ygritte",    name: "Ygritte",           house: "Pueblo Libre", saga: "got", sigil: "🏹", color: "#3a3a4a", accent: "#c8dde6", photo: TA("ygritte.jpg") },
  // Sin casa / otros
  { id: "sandor",     name: "Sandor 'el Perro'", house: "Clegane",  saga: "got", sigil: "🐕", color: "#4a3020", accent: "#a0a0a0", photo: TA("the-hound.jpg") },
  { id: "bronn",      name: "Bronn",             house: "Sin casa", saga: "got", sigil: "⚔️", color: "#4a3020", accent: "#a0a0a0", photo: TA("bronn.jpg") },
  { id: "brienne",    name: "Brienne de Tarth",  house: "Tarth",    saga: "got", sigil: "🛡️", color: "#1a5a8a", accent: "#f5e6c2", photo: TA("brienne-tarth.jpeg") },
  { id: "davos",      name: "Davos Seaworth",    house: "Seaworth", saga: "got", sigil: "🧅", color: "#5a4a30", accent: "#c9b27f", photo: TA("davos-seaworth.png") },
  { id: "melisandre", name: "Melisandre",        house: "R'hllor",  saga: "got", sigil: "🔥", color: "#8a0303", accent: "#ffd700", photo: TA("melisandre.jpg") },
  { id: "varys",      name: "Varys",             house: "Sin casa", saga: "got", sigil: "🕷️", color: "#3a2a1a", accent: "#b8893a", photo: TA("varys.jpg") },
  { id: "baelish",    name: "Petyr Baelish",     house: "Baelish",  saga: "got", sigil: "🐦", color: "#3a4a3a", accent: "#c9b27f", photo: TA("littlefinger.jpg") },
  { id: "drogo",      name: "Khal Drogo",        house: "Dothraki", saga: "got", sigil: "🐎", color: "#6a3020", accent: "#d4af37", photo: TA("khal-drogo.jpg") },
  { id: "daario",     name: "Daario Naharis",    house: "Segundos Hijos", saga: "got", sigil: "⚔️", color: "#3a4a3a", accent: "#d4af37", photo: TA("daario.jpg") },
  { id: "missandei",  name: "Missandei",         house: "Naath",    saga: "got", sigil: "🌊", color: "#3a6b8a", accent: "#f5e6c2", photo: TA("missandei.jpeg") },
  { id: "grey-worm",  name: "Gusano Gris",       house: "Inmaculados", saga: "got", sigil: "🛡️", color: "#3a3a3a", accent: "#c9b27f", photo: TA("greyworm.jpg") },
  { id: "jaqen",      name: "Jaqen H'ghar",      house: "Hombres sin Rostro", saga: "got", sigil: "🎭", color: "#1a1a1a", accent: "#c9b27f", photo: TA("jaqen-hghar.jpg") },
  { id: "high-sparrow", name: "El Gorrión Supremo", house: "Fe de los Siete", saga: "got", sigil: "🕊️", color: "#a0a0a0", accent: "#f5e6c2", photo: TA("the-high-sparrow.jpg") },

  // House of the Dragon
  { id: "viserys-1",  name: "Viserys I",          house: "Targaryen", saga: "hotd", sigil: "🐉", color: "#2b0000", accent: "#a30000",
    photo: FANDOM("0/07/Viserys_Promo_Poster.jpg") },
  { id: "rhaenyra",   name: "Rhaenyra Targaryen", house: "Targaryen", saga: "hotd", sigil: "🐉", color: "#2b0000", accent: "#a30000",
    photo: FANDOM("9/97/Rhaenyra-110-Portrait.jpg") },
  { id: "daemon",     name: "Daemon Targaryen",   house: "Targaryen", saga: "hotd", sigil: "🐉", color: "#2b0000", accent: "#a30000",
    photo: FANDOM("2/22/Daemon-Targaryen-profile.png") },
  { id: "alicent",    name: "Alicent Hightower",  house: "Hightower", saga: "hotd", sigil: "🗼", color: "#3a5a2d", accent: "#f5e6c2",
    photo: FANDOM("7/77/Alicent_Promo_Poster.jpg") },
  { id: "otto",       name: "Otto Hightower",     house: "Hightower", saga: "hotd", sigil: "🗼", color: "#3a5a2d", accent: "#f5e6c2",
    photo: FANDOM("4/41/Otto_Promo_Poster.jpg") },
  { id: "aegon-2",    name: "Aegon II Targaryen", house: "Targaryen", saga: "hotd", sigil: "🐉", color: "#2b0000", accent: "#a30000",
    photo: FANDOM("e/e7/King_Aegon_II_profile.png") },
  { id: "aemond",     name: "Aemond Targaryen",   house: "Targaryen", saga: "hotd", sigil: "🐉", color: "#2b0000", accent: "#3a3a3a",
    photo: FANDOM("a/a4/Aemond-TLotT-profile.png") },
  { id: "helaena",    name: "Helaena Targaryen",  house: "Targaryen", saga: "hotd", sigil: "🦋", color: "#2b0000", accent: "#a30000",
    photo: FANDOM("e/e9/Helaena_Dress_1.png") },
  { id: "rhaenys",    name: "Rhaenys Targaryen",  house: "Velaryon",  saga: "hotd", sigil: "🌊", color: "#0a2a3a", accent: "#88ccdd",
    photo: FANDOM("1/1d/Rhaenys_Promo_Poster.jpg") },
  { id: "corlys",     name: "Corlys Velaryon",    house: "Velaryon",  saga: "hotd", sigil: "🌊", color: "#0a2a3a", accent: "#88ccdd",
    photo: FANDOM("d/d2/Corlys_Council_Promo.jpg") },
  { id: "laenor",     name: "Laenor Velaryon",    house: "Velaryon",  saga: "hotd", sigil: "🌊", color: "#0a2a3a", accent: "#88ccdd",
    photo: FANDOM("6/63/LaenorVelaryonHotD_Trailer_2.PNG") },
  { id: "laena",      name: "Laena Velaryon",     house: "Velaryon",  saga: "hotd", sigil: "🌊", color: "#0a2a3a", accent: "#88ccdd",
    photo: FANDOM("8/8d/Laena_Dress_1.png") },
  { id: "jacaerys",   name: "Jacaerys Velaryon",  house: "Velaryon",  saga: "hotd", sigil: "🐉", color: "#2b0000", accent: "#88ccdd",
    photo: FANDOM("0/0d/JacaerysVelaryonOlderInfobox.PNG") },
  { id: "lucerys",    name: "Lucerys Velaryon",   house: "Velaryon",  saga: "hotd", sigil: "🐉", color: "#2b0000", accent: "#88ccdd",
    photo: FANDOM("3/32/LucerysVelaryonTLotT.PNG") },
  { id: "baela",      name: "Baela Targaryen",    house: "Targaryen", saga: "hotd", sigil: "🐉", color: "#2b0000", accent: "#a30000",
    photo: FANDOM("8/8d/BaelaTargaryen2x03.PNG") },
  { id: "rhaena",     name: "Rhaena Targaryen",   house: "Targaryen", saga: "hotd", sigil: "🐉", color: "#2b0000", accent: "#a30000",
    photo: FANDOM("4/43/RhaenaTargaryen2x03.PNG") },
  { id: "criston",    name: "Criston Cole",       house: "Kingsguard", saga: "hotd", sigil: "🛡️", color: "#f5e6c2", accent: "#7a0303",
    photo: FANDOM("d/de/Criston_Promo_Poster.jpg") },
  { id: "larys",      name: "Larys Strong",       house: "Strong",    saga: "hotd", sigil: "👣", color: "#3a2a1a", accent: "#a0a060",
    photo: FANDOM("b/b4/LarysStrongTrailer.PNG") },
  { id: "mysaria",    name: "Mysaria",            house: "Lys",       saga: "hotd", sigil: "🕊️", color: "#5a3a3a", accent: "#e8d8a8",
    photo: FANDOM("d/da/Mysaria_Promo_Poster.jpg") },
];

export const SAGAS = [
  { id: "todas", label: "Todas" },
  { id: "got",   label: "Game of Thrones" },
  { id: "hotd",  label: "Casa del Dragón" },
];

export const HOUSES = ["Todas", ...new Set(CHARACTERS.map((c) => c.house))];

export const charById = (id) => CHARACTERS.find((c) => c.id === id) || CHARACTERS[0];
