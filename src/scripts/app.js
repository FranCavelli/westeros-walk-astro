// =========================================================
//  The Kingsroad — Castle Black a Sunspear (Astro)
// =========================================================

import { CHARACTERS, HOUSES, SAGAS, charById } from "../data/characters.js";
import { ROUTE, TOTAL_KM, LEGUA_KM, MAP_W, MAP_H } from "../data/route.js";

import { firebaseConfig, DEFAULT_ROOM } from "./firebase-config.js";

// =========================================================
//  Parámetros fijos (desde .env, NO editables en runtime)
// =========================================================
const ENV = import.meta.env;
const FIXED = {
  scale:       Number(ENV.PUBLIC_SCALE)       || 20,
  strideCm:    Number(ENV.PUBLIC_STRIDE_CM)   || 75,
  sensitivity: Number(ENV.PUBLIC_SENSITIVITY) || 1.10,
};

// =========================================================
//  Estado
// =========================================================
const DEFAULTS = {
  realMeters: 0,
  detectedMode: null,
  journal: [],
  lastMilestoneIdx: 0,
  player: { id: null, name: "", characterId: "jon-snow" },
  room: DEFAULT_ROOM,
};

function loadState() {
  try {
    const raw = localStorage.getItem("westeros-walk");
    if (!raw) return structuredClone(DEFAULTS);
    return { ...structuredClone(DEFAULTS), ...JSON.parse(raw) };
  } catch {
    return structuredClone(DEFAULTS);
  }
}
function saveState() { localStorage.setItem("westeros-walk", JSON.stringify(state)); }

const state = loadState();
if (!state.player.id) state.player.id = crypto.randomUUID();
if (!state.room) state.room = DEFAULT_ROOM;

// =========================================================
//  Fotos: precarga con fallback a sigilo
// =========================================================
const loadedPhotos = new Set();
function preloadPhotos() {
  return Promise.all(
    CHARACTERS.filter((c) => c.photo).map(
      (c) =>
        new Promise((resolve) => {
          const img = new Image();
          img.onload = () => { loadedPhotos.add(c.id); resolve(); };
          img.onerror = () => resolve();
          img.src = c.photo;
        })
    )
  );
}
const hasPhoto = (charId) => loadedPhotos.has(charId);
const photoFor = (charId) => {
  const c = charById(charId);
  return hasPhoto(charId) ? c.photo : null;
};

// =========================================================
//  Helpers
// =========================================================
const $ = (id) => document.getElementById(id);
const fmtKm = (km) => km.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtInt = (n) => Math.round(n).toLocaleString("es-AR");
const fmtLeguas = (km) => fmtInt(km / LEGUA_KM);
const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" })[c]);

const westerosKm = () => (state.realMeters / 1000) * FIXED.scale;

function segmentAt(wKm) {
  for (let i = ROUTE.length - 1; i >= 0; i--) {
    if (wKm >= ROUTE[i].km) return { idx: i, here: ROUTE[i], next: ROUTE[i + 1] || null };
  }
  return { idx: 0, here: ROUTE[0], next: ROUTE[1] };
}
function posAt(wKm) {
  const { here, next } = segmentAt(wKm);
  if (!next) return { x: here.x, y: here.y, here, next: null };
  const t = Math.max(0, Math.min(1, (wKm - here.km) / (next.km - here.km)));
  return { x: here.x + (next.x - here.x) * t, y: here.y + (next.y - here.y) * t, here, next, t };
}

// Medallón HTML (avatar pill, character grid, traveler card)
function medallionHTML(charId, sizeClass = "") {
  const c = charById(charId);
  const photo = photoFor(charId);
  const bg = `background: radial-gradient(circle, ${c.accent} 0%, ${c.color} 100%)`;
  const imgTag = photo
    ? `<img src="${photo}" alt="" loading="lazy" onerror="this.style.display='none'" />`
    : "";
  return `
    <div class="avatar-medallion ${sizeClass}" style="${bg}">
      <span class="sigil">${c.sigil}</span>
      ${imgTag}
    </div>`;
}

// =========================================================
//  Iconos de lugares (estilo wax-seal sobre el mapa canónico)
// =========================================================
function landmarkIcon(type) {
  switch (type) {
    case "wall":     return `
      <rect x="-1.6" y="-1.4" width="3.2" height="1" fill="#0a1a2a" stroke="#f5e6c2" stroke-width="0.14"/>
      <rect x="-0.55" y="-2.0" width="1.1" height="0.7" fill="#0a1a2a" stroke="#f5e6c2" stroke-width="0.14"/>
      <rect x="-0.15" y="-1.85" width="0.3" height="0.45" fill="#7a1818"/>`;
    case "tower":    return `
      <rect x="-0.6" y="-1.7" width="1.2" height="1.7" fill="#7a1818" stroke="#f5e6c2" stroke-width="0.12"/>
      <polygon points="-0.85,-1.7 0,-2.3 0.85,-1.7" fill="#7a1818" stroke="#f5e6c2" stroke-width="0.12"/>
      <rect x="-0.18" y="-1.2" width="0.36" height="0.4" fill="#0a0a0a"/>`;
    case "castle":   return `
      <rect x="-1.3" y="-1.3" width="2.6" height="1.3" fill="#7a1818" stroke="#f5e6c2" stroke-width="0.13"/>
      <rect x="-1.55" y="-1.8" width="0.55" height="1.8" fill="#7a1818" stroke="#f5e6c2" stroke-width="0.13"/>
      <rect x="1" y="-1.8" width="0.55" height="1.8" fill="#7a1818" stroke="#f5e6c2" stroke-width="0.13"/>
      <rect x="-0.3" y="-1.9" width="0.6" height="0.6" fill="#7a1818" stroke="#f5e6c2" stroke-width="0.13"/>
      <polygon points="-0.45,-1.9 0,-2.4 0.45,-1.9" fill="#7a1818" stroke="#f5e6c2" stroke-width="0.13"/>
      <rect x="-0.18" y="-0.9" width="0.36" height="0.9" fill="#0a0a0a"/>`;
    case "ruin":     return `
      <polygon points="-1.3,0 -1.3,-1.2 -0.85,-1.2 -0.85,-1.65 -0.4,-1.65 -0.4,-0.85 0.15,-0.85 0.15,-1.5 0.7,-1.5 0.7,-0.7 1.2,-0.7 1.2,0"
              fill="#5a3a1e" stroke="#f5e6c2" stroke-width="0.12"/>`;
    case "bridge":   return `
      <rect x="-1.6" y="-1.6" width="0.7" height="1.6" fill="#7a1818" stroke="#f5e6c2" stroke-width="0.12"/>
      <polygon points="-1.75,-1.6 -1.25,-2 -0.75,-1.6" fill="#7a1818" stroke="#f5e6c2" stroke-width="0.12"/>
      <rect x="0.9" y="-1.6" width="0.7" height="1.6" fill="#7a1818" stroke="#f5e6c2" stroke-width="0.12"/>
      <polygon points="0.75,-1.6 1.25,-2 1.75,-1.6" fill="#7a1818" stroke="#f5e6c2" stroke-width="0.12"/>
      <rect x="-0.95" y="-1.1" width="1.9" height="0.35" fill="#7a1818" stroke="#f5e6c2" stroke-width="0.1"/>`;
    case "inn":      return `
      <rect x="-0.95" y="-0.85" width="1.9" height="0.85" fill="#7a4818" stroke="#f5e6c2" stroke-width="0.12"/>
      <polygon points="-1.15,-0.85 0,-1.65 1.15,-0.85" fill="#7a1818" stroke="#f5e6c2" stroke-width="0.12"/>
      <rect x="0.35" y="-1.5" width="0.25" height="0.5" fill="#7a1818" stroke="#f5e6c2" stroke-width="0.08"/>
      <rect x="-0.2" y="-0.55" width="0.4" height="0.55" fill="#0a0a0a"/>`;
    case "mountain": return `
      <polygon points="-1.6,0 -0.5,-1.85 0.05,-0.9 0.55,-2.05 1.6,0" fill="#5a4020" stroke="#f5e6c2" stroke-width="0.12"/>
      <polygon points="-0.7,-1.7 -0.5,-1.85 -0.3,-1.7" fill="#f5e6c2" opacity="0.85"/>
      <polygon points="0.4,-1.9 0.55,-2.05 0.7,-1.9" fill="#f5e6c2" opacity="0.85"/>`;
    case "palace":   return `
      <rect x="-1.55" y="-1.4" width="3.1" height="1.4" fill="#7a1818" stroke="#f5e6c2" stroke-width="0.13"/>
      <polygon points="-1.6,-1.4 0,-2.3 1.6,-1.4" fill="#7a1818" stroke="#f5e6c2" stroke-width="0.13"/>
      <circle cx="0" cy="-1.85" r="0.3" fill="#ffd700" stroke="#1a1a1a" stroke-width="0.1"/>
      <rect x="-1.55" y="-1.95" width="0.4" height="0.55" fill="#7a1818" stroke="#f5e6c2" stroke-width="0.1"/>
      <rect x="1.15" y="-1.95" width="0.4" height="0.55" fill="#7a1818" stroke="#f5e6c2" stroke-width="0.1"/>
      <rect x="-0.2" y="-0.85" width="0.4" height="0.85" fill="#0a0a0a"/>`;
    default: return `<circle r="0.8" fill="#7a1818" stroke="#f5e6c2" stroke-width="0.12"/>`;
  }
}

// =========================================================
//  Construcción del mapa (overlay sobre el mapa canónico)
// =========================================================
function buildMap() {
  const map = $("map");
  const roadD = ROUTE.map((p, i) => (i ? "L" : "M") + p.x + " " + p.y).join(" ");

  const landmarks = ROUTE.map((p, i) => {
    const visited = westerosKm() >= p.km ? " visited" : "";
    const labelAnchor = p.x > 50 ? "start" : "end";
    const lx = labelAnchor === "start" ? 2.6 : -2.6;
    return `
      <g class="landmark${visited}${p.major ? " major" : ""}" data-city="${i}" transform="translate(${p.x} ${p.y})">
        <circle class="pin-base" r="${p.major ? 2.3 : 1.7}"/>
        <g class="pin-icon">${landmarkIcon(p.type)}</g>
        <text class="city-label" x="${lx}" y="0.6" text-anchor="${labelAnchor}">${p.name}</text>
      </g>`;
  }).join("");

  map.innerHTML = `
    <defs>
      <clipPath id="myAvatarClip"><circle r="2.4" cx="0" cy="0"/></clipPath>
    </defs>

    <path class="road" d="${roadD}" />
    <path id="roadTraveled" class="road-traveled" d="" />

    <g id="landmarksLayer">${landmarks}</g>

    <g id="otherTravelers"></g>

    <g id="myTraveler" class="traveler-marker me" transform="translate(${ROUTE[0].x} ${ROUTE[0].y})">
      <circle class="pulse" r="3.5"/>
      <circle class="ring" r="3"/>
      <circle class="inner" r="2.5"/>
      <g class="avatar"></g>
      <text class="me-label" y="-4.2" text-anchor="middle">Vos</text>
    </g>

    <g transform="translate(${MAP_W - 6} ${MAP_H - 3})">
      <text class="compass" text-anchor="middle">N</text>
      <text class="compass" y="-3.5" text-anchor="middle">↑</text>
    </g>
  `;

  renderMyTravelerAvatar();

  map.querySelectorAll(".landmark").forEach((g) => {
    g.addEventListener("click", () => {
      const i = parseInt(g.dataset.city);
      log(`Mirás hacia ${ROUTE[i].name}…`);
    });
  });
}

function renderMyTravelerAvatar() {
  const g = $("myTraveler");
  if (!g) return;
  const slot = g.querySelector(".avatar");
  const ch = charById(state.player.characterId);
  const photo = photoFor(state.player.characterId);
  slot.innerHTML = photo
    ? `<image href="${photo}" x="-2.4" y="-2.4" width="4.8" height="4.8" preserveAspectRatio="xMidYMid slice" clip-path="url(#myAvatarClip)"/>`
    : `<text text-anchor="middle" y="0.8" font-size="3" fill="${ch.accent}">${ch.sigil}</text>`;
  // Label = nombre del jugador
  const label = g.querySelector(".me-label");
  label.textContent = (state.player.name || "Vos").slice(0, 14);
}

function updateMap() {
  const wKm = westerosKm();
  const pos = posAt(wKm);
  const { idx } = segmentAt(wKm);

  const segs = [];
  for (let i = 0; i <= idx; i++) {
    segs.push((i === 0 ? "M" : "L") + ROUTE[i].x + " " + ROUTE[i].y);
  }
  segs.push("L" + pos.x + " " + pos.y);
  $("roadTraveled").setAttribute("d", segs.join(" "));

  const me = $("myTraveler");
  if (me) me.setAttribute("transform", `translate(${pos.x} ${pos.y})`);

  document.querySelectorAll(".landmark").forEach((g, i) => {
    g.classList.toggle("visited", westerosKm() >= ROUTE[i].km);
  });

  renderOtherTravelers();
}

function renderOtherTravelers() {
  const layer = $("otherTravelers");
  if (!layer) return;
  const players = Object.values(otherPlayers);
  layer.innerHTML = players
    .map((p) => {
      const ch = charById(p.characterId);
      const pos = posAt(p.westerosKm || 0);
      const photo = photoFor(p.characterId);
      const imageTag = photo
        ? `<image href="${photo}" x="-1.8" y="-1.8" width="3.6" height="3.6" preserveAspectRatio="xMidYMid slice" clip-path="circle(50%)"/>`
        : `<text text-anchor="middle" y="0.6" font-size="2">${ch.sigil}</text>`;
      return `
      <g class="traveler-marker other" data-uid="${p.uid}" transform="translate(${pos.x} ${pos.y})">
        <circle r="2" fill="${ch.color}" stroke="${ch.accent}" stroke-width="0.55"/>
        ${imageTag}
        <text class="label" y="3.8" text-anchor="middle">${escapeHtml((p.name || ch.name).slice(0, 14))}</text>
      </g>`;
    })
    .join("");

  layer.querySelectorAll(".traveler-marker").forEach((g) => {
    g.addEventListener("click", () => showTravelerDetail(g.dataset.uid));
  });
}

// =========================================================
//  UI updates
// =========================================================
function updateUI() {
  const wKm = westerosKm();
  const { here, next } = segmentAt(wKm);
  const realKm = state.realMeters / 1000;
  const steps = (realKm * 1000) / (FIXED.strideCm / 100);
  const onCity = next ? wKm - here.km < (next.km - here.km) * 0.05 : true;

  $("currentPlace").textContent = next ? (onCity ? here.name : `Hacia ${next.name}`) : here.name;
  $("currentRegion").textContent = here.region;
  $("statusLabel").textContent = !next ? "Viaje completado" : onCity ? "Estás en" : "En camino";

  if (next) {
    $("nextPlace").textContent = next.name;
    $("nextDistance").textContent = `${fmtLeguas(next.km - wKm)} leguas`;
  } else {
    $("nextPlace").textContent = "—";
    $("nextDistance").textContent = "fin del viaje";
  }

  $("realKm").textContent = `${fmtKm(realKm)} km`;
  $("realSteps").textContent = `${fmtInt(steps)} pasos`;
  $("westerosKm").textContent = `${fmtLeguas(wKm)} leguas`;
  $("progressPct").textContent = `${((wKm / TOTAL_KM) * 100).toFixed(1)}% del viaje`;
  $("remaining").textContent = `${fmtLeguas(Math.max(0, TOTAL_KM - wKm))} leguas`;

  updateMap();
  checkMilestone();
  renderJournal();
  renderMyAvatar();
  pushPlayerState();
}

function renderMyAvatar() {
  const pill = $("myAvatar");
  pill.querySelector(".avatar-medallion").outerHTML = medallionHTML(state.player.characterId, "small").trim();
  $("myName").textContent = state.player.name || "Anónimo";
  $("myHouse").textContent = `Casa ${charById(state.player.characterId).house}`;
}

function renderJournal() {
  const j = $("journal");
  if (!state.journal.length) {
    j.innerHTML = `<li><time>—</time><span><em>Tu viaje aún no comenzó. Que los dioses antiguos y los nuevos te acompañen.</em></span></li>`;
    return;
  }
  j.innerHTML = state.journal
    .slice()
    .reverse()
    .slice(0, 20)
    .map((e) => {
      const dt = new Date(e.t);
      const when =
        dt.toLocaleDateString("es-AR", { day: "2-digit", month: "short" }) +
        " " +
        dt.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });
      if (e.kind === "arrival") return `<li class="arrival"><time>${when}</time><span>Llegaste a <strong>${escapeHtml(e.place)}</strong></span></li>`;
      return `<li><time>${when}</time><span>${escapeHtml(e.text)}</span></li>`;
    })
    .join("");
}

function checkMilestone() {
  const { idx } = segmentAt(westerosKm());
  if (idx > state.lastMilestoneIdx) {
    for (let i = state.lastMilestoneIdx + 1; i <= idx; i++) {
      state.journal.push({ t: Date.now(), kind: "arrival", place: ROUTE[i].name });
    }
    state.lastMilestoneIdx = idx;
    saveState();
  }
}

function log(text) {
  state.journal.push({ t: Date.now(), kind: "log", text });
  if (state.journal.length > 200) state.journal = state.journal.slice(-200);
  saveState();
  renderJournal();
}

// =========================================================
//  Tracking auto-detect
// =========================================================
const Tracking = {
  stepHandler: null, gpsWatchId: null,
  lastPeakT: 0, lowFlag: true, lastGps: null,
  locked: false,

  async startAll(autoOnly = false) {
    this.locked = !!state.detectedMode;
    if (this.locked) {
      if (state.detectedMode === "steps") await this.startSteps(autoOnly);
      else if (state.detectedMode === "gps") this.startGps();
      updateLiveBadge();
      return;
    }
    const gpsOk = this.startGps();
    const stepsOk = await this.startSteps(autoOnly);
    if (!gpsOk && !stepsOk) setBanner("error", "No pude activar ni GPS ni podómetro.");
    updateLiveBadge();
  },

  stopAll() { this.stopSteps(); this.stopGps(); updateLiveBadge(); },

  async startSteps(autoOnly = false) {
    if (typeof DeviceMotionEvent === "undefined") return false;
    const needsPerm = typeof DeviceMotionEvent.requestPermission === "function";
    if (needsPerm) {
      if (autoOnly) { $("trackingHint").classList.remove("hidden"); return false; }
      try {
        const r = await DeviceMotionEvent.requestPermission();
        if (r !== "granted") return false;
      } catch { return false; }
    }
    this.stepHandler = (ev) => {
      const a = ev.accelerationIncludingGravity || ev.acceleration;
      if (!a || a.x == null) return;
      const g = Math.sqrt(a.x*a.x + a.y*a.y + a.z*a.z) / 9.81;
      const now = performance.now();
      if (this.lowFlag && g > FIXED.sensitivity && now - this.lastPeakT > 280) {
        this.lastPeakT = now;
        this.lowFlag = false;
        this.onSample("steps", FIXED.strideCm / 100);
      }
      if (g < 0.85) this.lowFlag = true;
    };
    window.addEventListener("devicemotion", this.stepHandler);
    return true;
  },

  stopSteps() {
    if (this.stepHandler) {
      window.removeEventListener("devicemotion", this.stepHandler);
      this.stepHandler = null;
    }
  },

  startGps() {
    if (!navigator.geolocation) return false;
    this.gpsWatchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        if (accuracy > 25) return;
        if (this.lastGps) {
          const d = haversine(this.lastGps.lat, this.lastGps.lon, latitude, longitude);
          if (d > 1.5 && d < 50) this.onSample("gps", d);
        }
        this.lastGps = { lat: latitude, lon: longitude };
      },
      () => {},
      { enableHighAccuracy: true, maximumAge: 1000, timeout: 10000 }
    );
    return true;
  },

  stopGps() {
    if (this.gpsWatchId != null) {
      navigator.geolocation.clearWatch(this.gpsWatchId);
      this.gpsWatchId = null;
      this.lastGps = null;
    }
  },

  onSample(source, meters) {
    if (!this.locked) {
      state.detectedMode = source;
      this.locked = true;
      saveState();
      if (source === "steps") this.stopGps();
      else this.stopSteps();
      $("trackingHint").classList.add("hidden");
      setBanner("connected", `Modo ${source === "steps" ? "Pasos" : "GPS"} detectado y fijado.`, 4000);
      log(`Se enganchó al modo ${source === "steps" ? "Pasos" : "GPS"}`);
      $("detectedOut").value = source === "steps" ? "👣 Pasos (aceleómetro)" : "📡 GPS";
      updateLiveBadge();
    }
    state.realMeters += meters;
    saveState();
    updateUI();
  },

  redetect() {
    this.stopAll();
    state.detectedMode = null;
    saveState();
    this.locked = false;
    $("detectedOut").value = "— ninguno aún —";
    this.startAll(true);
  },
};

function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const φ1 = (lat1 * Math.PI) / 180, φ2 = (lat2 * Math.PI) / 180;
  const dφ = ((lat2 - lat1) * Math.PI) / 180;
  const dλ = ((lon2 - lon1) * Math.PI) / 180;
  const a = Math.sin(dφ/2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(dλ/2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

function updateLiveBadge() {
  const badge = $("liveBadge");
  if (Tracking.stepHandler || Tracking.gpsWatchId != null) {
    badge.classList.remove("hidden");
    if (state.detectedMode === "steps") $("liveText").textContent = "Contando pasos";
    else if (state.detectedMode === "gps") $("liveText").textContent = "Siguiendo GPS";
    else $("liveText").textContent = "Detectando…";
  } else {
    badge.classList.add("hidden");
  }
}

// =========================================================
//  Multijugador (Firebase Realtime DB)
// =========================================================
let fb = null, myUid = null, mpUnsubscribe = null;
let otherPlayers = {};
let lastPushAt = 0;

const isFirebaseConfigured = () =>
  firebaseConfig &&
  firebaseConfig.apiKey &&
  firebaseConfig.projectId &&
  firebaseConfig.databaseURL &&
  !String(firebaseConfig.apiKey).startsWith("PEGA_ACA");

async function initMultiplayer() {
  if (!isFirebaseConfigured()) {
    setBanner("solo", "Modo solitario · editá /firebase-config.js para activar multijugador.");
    return;
  }
  try {
    const [appMod, dbMod, authMod] = await Promise.all([
      import(/* @vite-ignore */ "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js"),
      import(/* @vite-ignore */ "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js"),
      import(/* @vite-ignore */ "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"),
    ]);
    const app = appMod.initializeApp(firebaseConfig);
    const auth = authMod.getAuth(app);
    await authMod.signInAnonymously(auth);
    myUid = auth.currentUser.uid;
    const db = dbMod.getDatabase(app);
    fb = { app, auth, db, ref: dbMod.ref, set: dbMod.set, update: dbMod.update, onValue: dbMod.onValue, onDisconnect: dbMod.onDisconnect };
    subscribeRoom();
    setBanner("connected", `Multijugador conectado · sala "${state.room}"`, 4000);
    pushPlayerState(true);
  } catch (err) {
    console.error(err);
    setBanner("error", "No pude conectar a Firebase: " + err.message);
  }
}

function subscribeRoom() {
  if (!fb || !myUid) return;
  const myRef = fb.ref(fb.db, `rooms/${state.room}/players/${myUid}`);
  fb.onDisconnect(myRef).update({ online: false });
  const allRef = fb.ref(fb.db, `rooms/${state.room}/players`);
  mpUnsubscribe = fb.onValue(allRef, (snap) => {
    const all = snap.val() || {};
    otherPlayers = {};
    Object.entries(all).forEach(([uid, data]) => {
      if (uid === myUid) return;
      if (!data || !data.lastUpdate) return;
      if (Date.now() - data.lastUpdate > 7 * 24 * 3600 * 1000) return;
      otherPlayers[uid] = { uid, ...data };
    });
    renderOtherTravelers();
    renderTravelersList();
  });
}

function pushPlayerState(force = false) {
  if (!fb || !myUid) return;
  const now = Date.now();
  if (!force && now - lastPushAt < 4000) return;
  lastPushAt = now;
  const wKm = westerosKm();
  const { idx, here, next } = segmentAt(wKm);
  const onCity = next ? wKm - here.km < (next.km - here.km) * 0.05 : true;
  const data = {
    name: state.player.name || "Anónimo",
    characterId: state.player.characterId,
    realMeters: Math.round(state.realMeters),
    scale: FIXED.scale,
    westerosKm: Math.round(wKm),
    cityIdx: idx,
    cityName: onCity ? here.name : `Camino a ${next ? next.name : "—"}`,
    online: true,
    lastUpdate: now,
  };
  fb.set(fb.ref(fb.db, `rooms/${state.room}/players/${myUid}`), data).catch(() => {});
}

async function changeRoom(newRoom) {
  if (!fb || !myUid) { state.room = newRoom; saveState(); return; }
  try { await fb.set(fb.ref(fb.db, `rooms/${state.room}/players/${myUid}`), null); } catch {}
  if (mpUnsubscribe) mpUnsubscribe();
  state.room = newRoom;
  saveState();
  otherPlayers = {};
  renderOtherTravelers();
  renderTravelersList();
  subscribeRoom();
  pushPlayerState(true);
  setBanner("connected", `Sala cambiada a "${state.room}"`, 3000);
}

// =========================================================
//  Lista de viajeros
// =========================================================
function renderTravelersList() {
  const list = $("travelersList");
  const players = Object.values(otherPlayers).sort((a, b) => (b.westerosKm || 0) - (a.westerosKm || 0));
  $("travelersCount").textContent = players.length;
  if (!players.length) {
    list.innerHTML = `<li class="empty">Nadie más en el camino todavía…</li>`;
    return;
  }
  list.innerHTML = players
    .map((p) => {
      const ch = charById(p.characterId);
      const pct = (((p.westerosKm || 0) / TOTAL_KM) * 100).toFixed(1);
      return `
      <li class="traveler-card" data-uid="${p.uid}">
        ${medallionHTML(p.characterId, "")}
        <div class="info">
          <strong>${escapeHtml(p.name)}</strong>
          <small>${escapeHtml(p.cityName || ch.name)}</small>
        </div>
        <span class="pct">${pct}%</span>
      </li>`;
    })
    .join("");
  list.querySelectorAll(".traveler-card").forEach((c) => {
    c.addEventListener("click", () => showTravelerDetail(c.dataset.uid));
  });
}

function showTravelerDetail(uid) {
  const p = otherPlayers[uid];
  if (!p) return;
  const ch = charById(p.characterId);
  const pct = (((p.westerosKm || 0) / TOTAL_KM) * 100).toFixed(1);
  $("travelerDetail").innerHTML = `
    <div class="traveler-detail-card">
      <div style="display: flex; justify-content: center;">
        ${medallionHTML(p.characterId, "large")}
      </div>
      <h3>${escapeHtml(p.name)}</h3>
      <p class="house-name">Casa ${escapeHtml(ch.house)} · "${escapeHtml(ch.name)}"</p>
      <div class="stats">
        <div class="stat"><span class="label">En Poniente</span><span class="value">${fmtLeguas(p.westerosKm || 0)} leguas</span></div>
        <div class="stat"><span class="label">Progreso</span><span class="value">${pct}%</span></div>
        <div class="stat"><span class="label">Caminado real</span><span class="value">${fmtKm((p.realMeters || 0) / 1000)} km</span></div>
        <div class="stat"><span class="label">Escala</span><span class="value">×${p.scale || 1}</span></div>
      </div>
      <p class="here">Va por <strong>${escapeHtml(p.cityName || "—")}</strong></p>
    </div>
  `;
  $("travelerDialog").showModal();
}

// =========================================================
//  Banner
// =========================================================
let bannerTimeout = null;
function setBanner(kind, text, autoHideMs) {
  const b = $("mpBanner");
  b.className = "mp-banner " + kind;
  b.textContent = text;
  b.classList.remove("hidden");
  if (bannerTimeout) clearTimeout(bannerTimeout);
  if (autoHideMs) bannerTimeout = setTimeout(() => b.classList.add("hidden"), autoHideMs);
}

// =========================================================
//  Onboarding
// =========================================================
let selectedCharId = null;
let activeSaga = "todas";
let activeHouse = "Todas";

function buildOnboarding() {
  selectedCharId = state.player.characterId || CHARACTERS[0].id;
  $("nameInput").value = state.player.name || "";
  $("roomInput").value = state.room && /^\d+$/.test(state.room) ? state.room : "";
  buildSagaFilter();
  buildHouseFilter();
  buildCharacterGrid();
}

function buildSagaFilter() {
  $("sagaFilter").innerHTML = SAGAS.map(
    (s) => `<button type="button" class="saga-chip${s.id === activeSaga ? " active" : ""}" data-saga="${escapeHtml(s.id)}">${escapeHtml(s.label)}</button>`
  ).join("");
  $("sagaFilter").querySelectorAll(".saga-chip").forEach((b) => {
    b.addEventListener("click", () => {
      activeSaga = b.dataset.saga;
      activeHouse = "Todas";
      buildSagaFilter();
      buildHouseFilter();
      buildCharacterGrid();
    });
  });
}

function buildHouseFilter() {
  const visibleChars = activeSaga === "todas" ? CHARACTERS : CHARACTERS.filter((c) => c.saga === activeSaga);
  const houses = ["Todas", ...new Set(visibleChars.map((c) => c.house))];
  $("houseFilter").innerHTML = houses
    .map((h) => `<button type="button" class="house-chip${h === activeHouse ? " active" : ""}" data-house="${escapeHtml(h)}">${escapeHtml(h)}</button>`)
    .join("");
  $("houseFilter").querySelectorAll(".house-chip").forEach((b) => {
    b.addEventListener("click", () => {
      activeHouse = b.dataset.house;
      buildHouseFilter();
      buildCharacterGrid();
    });
  });
}

function buildCharacterGrid() {
  let list = activeSaga === "todas" ? CHARACTERS : CHARACTERS.filter((c) => c.saga === activeSaga);
  if (activeHouse !== "Todas") list = list.filter((c) => c.house === activeHouse);
  $("characterGrid").innerHTML = list
    .map(
      (c) => `
    <button type="button" class="character-card${c.id === selectedCharId ? " selected" : ""}" data-id="${c.id}" title="${escapeHtml(c.name)}">
      ${medallionHTML(c.id, "")}
      <span class="name">${escapeHtml(c.name)}</span>
    </button>`
    )
    .join("");
  $("characterGrid").querySelectorAll(".character-card").forEach((card) => {
    card.addEventListener("click", () => {
      selectedCharId = card.dataset.id;
      buildCharacterGrid();
    });
  });
}

function maybeShowOnboarding() {
  if (!state.player.name) {
    buildOnboarding();
    $("onboardingDialog").showModal();
    return true;
  }
  return false;
}

// =========================================================
//  Wire
// =========================================================
function wire() {
  $("onboardingForm").addEventListener("submit", async (e) => {
    const name = $("nameInput").value.trim();
    if (!name || !selectedCharId) { e.preventDefault(); return; }
    const roomInputVal = ($("roomInput").value || "").replace(/[^0-9]/g, "");
    const newRoom = roomInputVal || DEFAULT_ROOM;
    const roomChanged = newRoom !== state.room;
    state.player.name = name;
    state.player.characterId = selectedCharId;
    state.room = newRoom;
    saveState();
    renderMyAvatar();
    renderMyTravelerAvatar();
    setTimeout(() => Tracking.startAll(false), 300);
    if (fb && roomChanged) {
      await changeRoom(newRoom);
    } else if (!fb) {
      initMultiplayer();
    } else {
      pushPlayerState(true);
    }
  });

  // Filtrar input de sala a solo dígitos
  $("roomInput").addEventListener("input", () => {
    const v = $("roomInput").value.replace(/[^0-9]/g, "");
    if (v !== $("roomInput").value) $("roomInput").value = v;
  });

  $("enableMotionBtn").addEventListener("click", async () => {
    $("trackingHint").classList.add("hidden");
    const ok = await Tracking.startSteps(false);
    if (!ok) setBanner("error", "No pude activar el podómetro. Probá GPS o Manual.", 4000);
    updateLiveBadge();
  });

  const dlg = $("settingsDialog");
  $("settingsBtn").addEventListener("click", () => {
    $("currentRoomOut").value = state.room;
    $("detectedOut").value =
      state.detectedMode === "steps" ? "👣 Pasos (aceleómetro)" :
      state.detectedMode === "gps" ? "📡 GPS" : "— ninguno aún —";
    dlg.showModal();
  });

  $("redetectBtn").addEventListener("click", () => Tracking.redetect());
  $("changeCharBtn").addEventListener("click", () => {
    dlg.close();
    buildOnboarding();
    $("onboardingDialog").showModal();
  });
  $("resetBtn").addEventListener("click", () => {
    if (!confirm("¿Reiniciar el viaje? Volvés a Castle Black.")) return;
    state.realMeters = 0;
    state.journal = [];
    state.lastMilestoneIdx = 0;
    saveState();
    updateUI();
  });
}

// =========================================================
//  Boot
// =========================================================
(async function boot() {
  await preloadPhotos();
  buildMap();
  wire();
  renderMyAvatar();
  updateUI();
  if (maybeShowOnboarding()) {
    // El submit del onboarding arranca tracking + multijugador
  } else {
    Tracking.startAll(true);
    initMultiplayer();
  }
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  }
})();
