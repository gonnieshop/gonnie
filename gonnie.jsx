import { useState } from "react";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";

// ─── GONNIE BRAND ─────────────────────────────────────────────────────────────
const G = {
  brand:  "#00C896",   // Gonnie teal — color principal de marca
  brandD: "#009E78",   // teal oscuro para hover
  brandL: "#33DFB0",   // teal claro
  bg:     "#080B0F",
  card:   "#0F1419",
  card2:  "#161D25",
  text:   "#EEF2F7",
  muted:  "#6B7A8D",
  bdr:    "rgba(255,255,255,0.06)",
  green:  "#34D399",
  red:    "#F87171",
  blue:   "#60A5FA",
  gold:   "#F59E0B",
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const Av = ({ txt, size = 38, bg = "#1A2535", color = G.brand }) => (
  <div style={{ width: size, height: size, borderRadius: "50%", background: bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.34, fontWeight: 700, color, flexShrink: 0 }}>
    {txt}
  </div>
);

const Pill = ({ children, color = G.brand, bg }) => (
  <span style={{ background: bg || `${color}18`, color, fontSize: 10, fontWeight: 700, padding: "2px 9px", borderRadius: 20, letterSpacing: "0.04em", whiteSpace: "nowrap" }}>
    {children}
  </span>
);

const NewPill = () => <Pill color="#080B0F" bg={G.brand}>NUEVO</Pill>;

const PrimaryBtn = ({ onClick, children, disabled, style = {} }) => (
  <button onClick={disabled ? undefined : onClick} style={{ background: disabled ? "rgba(0,200,150,0.25)" : G.brand, color: disabled ? "rgba(255,255,255,0.3)" : "#080B0F", border: "none", borderRadius: 14, padding: "13px 20px", fontSize: 14, fontWeight: 800, cursor: disabled ? "not-allowed" : "pointer", width: "100%", fontFamily: "inherit", letterSpacing: "0.01em", ...style }}>
    {children}
  </button>
);

const GhostBtn = ({ onClick, children }) => (
  <button onClick={onClick} style={{ background: "transparent", border: `0.5px solid ${G.bdr}`, borderRadius: 14, padding: "12px 20px", fontSize: 13, fontWeight: 500, cursor: "pointer", width: "100%", fontFamily: "inherit", color: G.muted }}>
    {children}
  </button>
);

const Back = ({ onBack }) => (
  <button onClick={onBack} style={{ background: `${G.brand}15`, border: "none", borderRadius: 10, padding: "6px 12px", fontSize: 12, color: G.brand, cursor: "pointer", fontFamily: "inherit", fontWeight: 600, display: "flex", alignItems: "center", gap: 5 }}>
    ← Volver
  </button>
);

const Divider = () => <div style={{ height: "0.5px", background: G.bdr, margin: "0" }} />;

const SectionLabel = ({ children }) => (
  <p style={{ fontSize: 10, color: G.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 10 }}>{children}</p>
);

// ─── LOGO ─────────────────────────────────────────────────────────────────────
const GonnieLogo = ({ size = 28, showText = true }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
    <div style={{ width: size, height: size, borderRadius: size * 0.3, background: G.brand, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ fontSize: size * 0.55, lineHeight: 1 }}>✂</span>
    </div>
    {showText && <span style={{ fontSize: size * 0.75, fontWeight: 800, color: G.text, letterSpacing: "-0.02em" }}>gonnie</span>}
  </div>
);

// ─── DATA ─────────────────────────────────────────────────────────────────────
const BARBERIAS = [
  {
    id: 1, name: "BarberKing", city: "Fraga", dist: "0.3 km", rating: 4.9, reviews: 124,
    open: true, hours: "9:00–20:00", specialties: ["Fade", "Barba", "Navaja"],
    barberos: [
      { id: 1, name: "Carlos M.", role: "Senior · Fade", initials: "CM", rating: 5.0, slots: 3, bg: "#1A2535", color: G.blue },
      { id: 2, name: "Alejandro L.", role: "Barbas · Diseño", initials: "AL", rating: 4.8, slots: 5, bg: "#1A2520", color: G.green },
      { id: 3, name: "Marcos R.", role: "Clásico · Navaja", initials: "MR", rating: 4.7, slots: 2, bg: "#251A25", color: "#C084FC" },
    ],
    services: [
      { id: 1, name: "Corte de pelo", time: 30, price: 12, vallePrice: 9, icon: "✂️" },
      { id: 2, name: "Corte + Barba", time: 50, price: 20, vallePrice: 15, icon: "💈" },
      { id: 3, name: "Arreglo de barba", time: 25, price: 10, vallePrice: 8, icon: "🧔" },
      { id: 4, name: "Navaja + Ritual", time: 60, price: 28, vallePrice: 22, icon: "💎" },
    ],
    styles: [
      { id: 1, name: "Fade clásico", emoji: "💈", likes: 234 },
      { id: 2, name: "Undercut", emoji: "✂️", likes: 189 },
      { id: 3, name: "Skin Fade", emoji: "🔥", likes: 312 },
      { id: 4, name: "Barba larga", emoji: "🧔", likes: 145 },
      { id: 5, name: "Pompadour", emoji: "⚡", likes: 98 },
      { id: 6, name: "Buzz Cut", emoji: "💫", likes: 167 },
    ],
  },
  {
    id: 2, name: "The Barber Shop", city: "Fraga", dist: "0.8 km", rating: 4.6, reviews: 87,
    open: true, hours: "10:00–19:00", specialties: ["Barba", "Fade", "Clásico"],
    barberos: [
      { id: 4, name: "Diego F.", role: "Barbas · Diseño", initials: "DF", rating: 4.6, slots: 4, bg: "#251A1A", color: "#FB923C" },
      { id: 5, name: "Pablo S.", role: "Senior · Fade", initials: "PS", rating: 4.5, slots: 6, bg: "#1A1A25", color: G.blue },
    ],
    services: [
      { id: 1, name: "Corte de pelo", time: 30, price: 10, vallePrice: 8, icon: "✂️" },
      { id: 2, name: "Corte + Barba", time: 45, price: 18, vallePrice: 14, icon: "💈" },
    ],
    styles: [
      { id: 1, name: "Fade moderno", emoji: "💈", likes: 112 },
      { id: 2, name: "Texturizado", emoji: "✂️", likes: 89 },
    ],
  },
  {
    id: 3, name: "El Rincón del Barbero", city: "Fraga", dist: "1.2 km", rating: 4.4, reviews: 56,
    open: false, hours: "10:00–18:00", specialties: ["Clásico", "Navaja"],
    barberos: [
      { id: 6, name: "Tomás G.", role: "Clásico · Navaja", initials: "TG", rating: 4.4, slots: 0, bg: "#1A2520", color: G.green },
    ],
    services: [
      { id: 1, name: "Corte clásico", time: 35, price: 11, vallePrice: 9, icon: "✂️" },
      { id: 2, name: "Navaja tradicional", time: 55, price: 22, vallePrice: 18, icon: "💎" },
    ],
    styles: [{ id: 1, name: "Corte clásico", emoji: "💈", likes: 67 }],
  },
];

const SLOTS = [
  { t: "09:00", ok: false, valle: false },
  { t: "09:30", ok: false, valle: false },
  { t: "10:00", ok: true,  valle: true  },
  { t: "10:30", ok: true,  valle: true  },
  { t: "11:00", ok: false, valle: false },
  { t: "11:30", ok: true,  valle: true  },
  { t: "12:00", ok: false, valle: false },
  { t: "16:00", ok: true,  valle: false },
  { t: "17:00", ok: true,  valle: false },
  { t: "17:30", ok: false, valle: false },
  { t: "18:00", ok: true,  valle: false },
  { t: "19:00", ok: true,  valle: false },
];

const REWARDS = [
  { id: 1, name: "10% descuento", pts: 200, icon: "🏷️", desc: "En tu próxima cita" },
  { id: 2, name: "Corte gratis", pts: 500, icon: "✂️", desc: "Cualquier barbería Gonnie" },
  { id: 3, name: "Kit de barba", pts: 300, icon: "🧴", desc: "Envío incluido" },
  { id: 4, name: "Upgrade navaja", pts: 400, icon: "💎", desc: "Ritual completo gratis" },
];

const PLANS = [
  {
    id: 1, name: "Básico", price: 19, cuts: 1,
    perks: ["1 corte al mes", "Reserva prioritaria", "Historial completo"],
    accent: G.muted, popular: false,
  },
  {
    id: 2, name: "Pro", price: 34, cuts: 2,
    perks: ["2 cortes al mes", "Reserva prioritaria", "10% en extras", "Acceso horas valle", "Puntos × 2"],
    accent: G.brand, popular: true,
  },
  {
    id: 3, name: "Premium", price: 55, cuts: 4,
    perks: ["4 cortes al mes", "Barbero fijo asignado", "20% en extras", "Acceso VIP sin espera", "Puntos × 3"],
    accent: G.gold, popular: false,
  },
];

const REVENUE_DATA = [
  { m: "Ene", v: 1240 }, { m: "Feb", v: 1580 }, { m: "Mar", v: 1320 },
  { m: "Abr", v: 1890 }, { m: "May", v: 2150 }, { m: "Jun", v: 2480 },
  { m: "Jul", v: 2890 }, { m: "Ago", v: 3120 },
];

// ─── SPLASH ───────────────────────────────────────────────────────────────────
function SplashScreen({ onDone }) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "32px 28px", background: G.bg }}>
      <div style={{ marginBottom: 32 }}>
        <div style={{ width: 80, height: 80, borderRadius: 24, background: G.brand, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 38, marginBottom: 16, marginLeft: "auto", marginRight: "auto" }}>✂</div>
        <h1 style={{ fontSize: 40, fontWeight: 900, color: G.text, textAlign: "center", letterSpacing: "-0.03em", marginBottom: 6 }}>gonnie</h1>
        <p style={{ fontSize: 14, color: G.muted, textAlign: "center" }}>Tu barbería, en tu bolsillo</p>
      </div>

      <div style={{ width: "100%", marginBottom: 24 }}>
        {[
          { icon: "⚡", text: "Reserva en menos de 30 segundos" },
          { icon: "🏆", text: "Acumula puntos con cada visita" },
          { icon: "🤖", text: "Tu barbero perfecto, sugerido por IA" },
        ].map((f, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderBottom: i < 2 ? `0.5px solid ${G.bdr}` : "none" }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: `${G.brand}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{f.icon}</div>
            <p style={{ fontSize: 13, color: G.text, fontWeight: 500 }}>{f.text}</p>
          </div>
        ))}
      </div>

      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 10 }}>
        <PrimaryBtn onClick={onDone}>Empezar →</PrimaryBtn>
        <p style={{ fontSize: 11, color: G.muted, textAlign: "center" }}>Gratis para clientes · Para barberías desde 29€/mes</p>
      </div>
    </div>
  );
}

// ─── HOME ─────────────────────────────────────────────────────────────────────
function HomeScreen({ nav }) {
  return (
    <div style={{ flex: 1, overflowY: "auto" }}>
      {/* Header */}
      <div style={{ padding: "16px 18px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <GonnieLogo size={24} />
          <p style={{ fontSize: 11, color: G.muted, marginTop: 4 }}>Buenas 👋 Javier</p>
        </div>
        <div style={{ position: "relative" }}>
          <div style={{ width: 38, height: 38, borderRadius: "50%", background: G.card, border: `0.5px solid ${G.bdr}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, cursor: "pointer" }}>🔔</div>
          <div style={{ position: "absolute", top: 2, right: 2, width: 9, height: 9, borderRadius: "50%", background: G.brand, border: `2px solid ${G.bg}` }} />
        </div>
      </div>

      <div style={{ padding: "0 18px" }}>
        {/* Puntos Gonnie */}
        <div onClick={() => nav("loyalty")} style={{ background: "linear-gradient(135deg, #0D1F1A 0%, #0A1A14 100%)", border: `1px solid ${G.brand}30`, borderRadius: 20, padding: "18px 20px", marginBottom: 16, cursor: "pointer", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -24, right: -24, width: 110, height: 110, borderRadius: "50%", background: `${G.brand}08` }} />
          <div style={{ position: "absolute", bottom: -16, left: -16, width: 70, height: 70, borderRadius: "50%", background: `${G.brand}06` }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <p style={{ fontSize: 10, color: `${G.brand}99`, letterSpacing: "0.08em", textTransform: "uppercase" }}>Gonnie Points</p>
                <NewPill />
              </div>
              <p style={{ fontSize: 36, fontWeight: 900, color: G.brand, lineHeight: 1, letterSpacing: "-0.02em" }}>1.240</p>
              <p style={{ fontSize: 11, color: G.muted, marginTop: 5 }}>Nivel Oro · 260 pts para Platino</p>
            </div>
            <div style={{ background: `${G.brand}15`, border: `0.5px solid ${G.brand}30`, borderRadius: 12, padding: "8px 12px", textAlign: "center" }}>
              <p style={{ fontSize: 18, marginBottom: 2 }}>🏆</p>
              <p style={{ fontSize: 9, color: G.brand, fontWeight: 700 }}>ORO</p>
            </div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 8, height: 5, overflow: "hidden" }}>
            <div style={{ width: "72%", height: "100%", background: `linear-gradient(90deg, ${G.brand}, ${G.brandL})`, borderRadius: 8 }} />
          </div>
          <p style={{ fontSize: 10, color: G.muted, marginTop: 5 }}>72% → Platino · Ver recompensas</p>
        </div>

        {/* Próxima cita */}
        <div style={{ background: G.card, border: `0.5px solid ${G.green}30`, borderRadius: 18, padding: "14px 16px", marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <p style={{ fontSize: 11, color: G.muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>Próxima cita</p>
            <Pill color="#080B0F" bg={G.green}>Hoy 11:30h</Pill>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Av txt="CM" size={44} bg="#1A2535" color={G.blue} />
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 15, fontWeight: 700, color: G.text }}>Corte + Barba</p>
              <p style={{ fontSize: 12, color: G.muted }}>Carlos M. · BarberKing</p>
            </div>
            <button onClick={() => nav("confirmed")} style={{ background: `${G.brand}15`, border: `0.5px solid ${G.brand}40`, borderRadius: 10, padding: "8px 12px", fontSize: 11, color: G.brand, cursor: "pointer", fontFamily: "inherit", fontWeight: 700 }}>
              📱 QR
            </button>
          </div>
        </div>

        {/* Acciones rápidas */}
        <SectionLabel>Acciones rápidas</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 18 }}>
          {[
            { icon: "✂️", label: "Reservar cita", action: () => nav("explore"), new: false },
            { icon: "👥", label: "Reserva grupal", action: () => nav("explore"), new: true },
            { icon: "📦", label: "Mis suscripciones", action: () => nav("plans"), new: true },
            { icon: "💬", label: "Chat barbería", action: () => {}, new: true },
          ].map((a, i) => (
            <div key={i} onClick={a.action} style={{ background: G.card, border: `0.5px solid ${G.bdr}`, borderRadius: 16, padding: "14px 14px 12px", cursor: "pointer", position: "relative" }}>
              {a.new && <div style={{ position: "absolute", top: 10, right: 10 }}><NewPill /></div>}
              <span style={{ fontSize: 26, display: "block", marginBottom: 8 }}>{a.icon}</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: G.text }}>{a.label}</span>
            </div>
          ))}
        </div>

        {/* IA Recomendación */}
        <div style={{ background: "linear-gradient(135deg,#091A14,#0C1F17)", border: `0.5px solid ${G.brand}25`, borderRadius: 18, padding: "16px", marginBottom: 24 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <div style={{ width: 38, height: 38, borderRadius: 12, background: `${G.brand}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>🤖</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: G.text }}>Sugerencia IA</p>
                <NewPill />
              </div>
              <p style={{ fontSize: 12, color: G.muted, lineHeight: 1.65 }}>
                Basándome en tu historial, Carlos M. en BarberKing es tu mejor opción esta semana. Mañana a las 10:00 hay un hueco con tarifa valle — <span style={{ color: G.brand, fontWeight: 600 }}>ahorras 5€</span>.
              </p>
              <button onClick={() => nav("explore")} style={{ marginTop: 10, background: "transparent", border: "none", color: G.brand, fontSize: 12, cursor: "pointer", fontFamily: "inherit", fontWeight: 700, padding: 0 }}>
                Reservar ahora →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── EXPLORE ──────────────────────────────────────────────────────────────────
function ExploreScreen({ nav, setBarberia }) {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("Todos");
  const tags = ["Todos", "Fade", "Barba", "Navaja", "Clásico"];
  const list = BARBERIAS.filter(b =>
    (filter === "Todos" || b.specialties.includes(filter)) &&
    b.name.toLowerCase().includes(q.toLowerCase())
  );
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "16px 18px" }}>
      <h2 style={{ fontSize: 22, fontWeight: 800, color: G.text, marginBottom: 14, letterSpacing: "-0.02em" }}>Explorar</h2>

      <div style={{ background: G.card, border: `0.5px solid ${G.bdr}`, borderRadius: 14, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <span style={{ fontSize: 16, color: G.muted }}>🔍</span>
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Buscar barberías..." style={{ background: "transparent", border: "none", outline: "none", color: G.text, fontSize: 13, flex: 1, fontFamily: "inherit" }} />
      </div>

      <div style={{ display: "flex", gap: 8, overflowX: "auto", marginBottom: 18, paddingBottom: 2 }}>
        {tags.map(t => (
          <button key={t} onClick={() => setFilter(t)} style={{ flexShrink: 0, background: filter === t ? G.brand : G.card, color: filter === t ? "#080B0F" : G.muted, border: `0.5px solid ${filter === t ? "transparent" : G.bdr}`, borderRadius: 20, padding: "6px 16px", fontSize: 12, cursor: "pointer", fontWeight: filter === t ? 800 : 400, fontFamily: "inherit" }}>
            {t}
          </button>
        ))}
      </div>

      {list.map(b => (
        <div key={b.id} onClick={() => { setBarberia(b); nav("detail"); }} style={{ background: G.card, border: `0.5px solid ${G.bdr}`, borderRadius: 18, marginBottom: 12, overflow: "hidden", cursor: "pointer" }}>
          <div style={{ height: 90, background: `linear-gradient(135deg, #0D1A15, #111F1A)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 38, position: "relative" }}>
            💈
            {b.open && (
              <div style={{ position: "absolute", top: 10, right: 10 }}>
                <Pill color="#080B0F" bg={G.green}>Abierto</Pill>
              </div>
            )}
            {!b.open && (
              <div style={{ position: "absolute", top: 10, right: 10 }}>
                <Pill color={G.red} bg={`${G.red}18`}>Cerrado</Pill>
              </div>
            )}
          </div>
          <div style={{ padding: "12px 14px 14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
              <p style={{ fontSize: 15, fontWeight: 800, color: G.text, letterSpacing: "-0.01em" }}>{b.name}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ fontSize: 11 }}>⭐</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: G.text }}>{b.rating}</span>
                <span style={{ fontSize: 11, color: G.muted }}>({b.reviews})</span>
              </div>
            </div>
            <p style={{ fontSize: 11, color: G.muted, marginBottom: 8 }}>📍 {b.dist} · {b.hours}</p>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {b.specialties.map(sp => <Pill key={sp}>{sp}</Pill>)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── DETAIL ───────────────────────────────────────────────────────────────────
function DetailScreen({ barberia, nav, setBooking }) {
  const [tab, setTab] = useState("barberos");
  const [selB, setSelB] = useState(null);
  const [selS, setSelS] = useState(null);
  const b = barberia || BARBERIAS[0];
  const canProceed = selB && selS;

  return (
    <div style={{ flex: 1, overflowY: "auto" }}>
      <div style={{ height: 120, background: "linear-gradient(135deg,#0D1A15,#111F1A)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48, position: "relative" }}>
        💈
        <div style={{ position: "absolute", top: 14, left: 14 }}><Back onBack={() => nav("explore")} /></div>
        <div style={{ position: "absolute", bottom: -16, left: 18, right: 18, background: G.card, border: `0.5px solid ${G.bdr}`, borderRadius: 14, padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <p style={{ fontSize: 16, fontWeight: 800, color: G.text, letterSpacing: "-0.01em" }}>{b.name}</p>
            <p style={{ fontSize: 11, color: G.muted }}>📍 {b.city} · {b.dist}</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: G.text }}>⭐ {b.rating}</p>
            <p style={{ fontSize: 10, color: G.muted }}>{b.reviews} reseñas</p>
          </div>
        </div>
      </div>

      <div style={{ padding: "28px 18px 16px" }}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
          {b.specialties.map(sp => <Pill key={sp}>{sp}</Pill>)}
          <Pill color={b.open ? G.green : G.red}>{b.open ? "Abierto · " + b.hours : "Cerrado"}</Pill>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", background: G.card2, borderRadius: 12, padding: 3, marginBottom: 18 }}>
          {[{ id: "barberos", l: "Barberos" }, { id: "servicios", l: "Servicios" }, { id: "galeria", l: "Galería" }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ flex: 1, background: tab === t.id ? G.brand : "transparent", color: tab === t.id ? "#080B0F" : G.muted, border: "none", borderRadius: 10, padding: "8px 6px", fontSize: 12, cursor: "pointer", fontFamily: "inherit", fontWeight: tab === t.id ? 800 : 500, transition: "all .15s" }}>
              {t.l}
            </button>
          ))}
        </div>

        {tab === "barberos" && b.barberos.map(br => (
          <div key={br.id} onClick={() => setSelB(br)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: selB?.id === br.id ? `${G.brand}10` : G.card, border: `0.5px solid ${selB?.id === br.id ? G.brand + "50" : G.bdr}`, borderRadius: 14, marginBottom: 10, cursor: "pointer" }}>
            <Av txt={br.initials} bg={br.bg} color={br.color} />
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: G.text }}>{br.name}</p>
              <p style={{ fontSize: 11, color: G.muted }}>{br.role}</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: 12, color: G.gold, fontWeight: 700 }}>⭐ {br.rating}</p>
              <p style={{ fontSize: 10, color: G.muted }}>{br.slots} huecos</p>
            </div>
            {selB?.id === br.id && <span style={{ color: G.brand, fontSize: 18, fontWeight: 700 }}>✓</span>}
          </div>
        ))}

        {tab === "servicios" && (
          <>
            {b.services.map(sv => (
              <div key={sv.id} onClick={() => setSelS(sv)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: selS?.id === sv.id ? `${G.brand}10` : G.card, border: `0.5px solid ${selS?.id === sv.id ? G.brand + "50" : G.bdr}`, borderRadius: 14, marginBottom: 10, cursor: "pointer" }}>
                <span style={{ fontSize: 22, width: 36, textAlign: "center", flexShrink: 0 }}>{sv.icon}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: G.text }}>{sv.name}</p>
                  <p style={{ fontSize: 11, color: G.muted }}>⏱ {sv.time} min</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: 16, fontWeight: 800, color: G.text }}>{sv.price}€</p>
                  <p style={{ fontSize: 10, color: G.green }}>Valle {sv.vallePrice}€</p>
                </div>
                {selS?.id === sv.id && <span style={{ color: G.brand, fontSize: 18, fontWeight: 700 }}>✓</span>}
              </div>
            ))}
            <div style={{ background: `${G.brand}08`, border: `0.5px solid ${G.brand}25`, borderRadius: 12, padding: "12px 14px", display: "flex", gap: 10 }}>
              <span>⚡</span>
              <div>
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 3 }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: G.text }}>Tarifa valle Gonnie</p>
                  <NewPill />
                </div>
                <p style={{ fontSize: 11, color: G.muted }}>Reserva lunes–jueves antes de las 12h y ahorra hasta un 25% automáticamente.</p>
              </div>
            </div>
          </>
        )}

        {tab === "galeria" && (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <p style={{ fontSize: 13, color: G.muted }}>Elige tu estilo antes de reservar</p>
              <NewPill />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 8 }}>
              {b.styles.map(st => (
                <div key={st.id} style={{ background: G.card2, borderRadius: 12, overflow: "hidden", cursor: "pointer" }}>
                  <div style={{ height: 72, background: "linear-gradient(135deg,#0D1A15,#111F1A)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30 }}>{st.emoji}</div>
                  <div style={{ padding: "7px 8px" }}>
                    <p style={{ fontSize: 11, fontWeight: 600, color: G.text, marginBottom: 2 }}>{st.name}</p>
                    <p style={{ fontSize: 9, color: G.muted }}>❤️ {st.likes}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {(selB || selS) && (
        <div style={{ padding: "12px 18px 16px", borderTop: `0.5px solid ${G.bdr}`, background: G.card }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <p style={{ fontSize: 12, color: G.muted }}>{selB ? `✓ ${selB.name}` : "Elige un barbero"}</p>
            <p style={{ fontSize: 14, fontWeight: 700, color: selS ? G.brand : G.muted }}>{selS ? `${selS.price}€` : "Elige un servicio"}</p>
          </div>
          <PrimaryBtn onClick={() => { if (canProceed) { setBooking({ barberia: b, barbero: selB, servicio: selS }); nav("booking"); } }} disabled={!canProceed}>
            {canProceed ? "Elegir horario →" : "Selecciona barbero y servicio"}
          </PrimaryBtn>
        </div>
      )}
    </div>
  );
}

// ─── BOOKING ──────────────────────────────────────────────────────────────────
function BookingScreen({ booking, nav }) {
  const [day, setDay] = useState(21);
  const [slot, setSlot] = useState(null);
  const [group, setGroup] = useState(false);
  const [groupN, setGroupN] = useState(1);
  const isValle = SLOTS.find(s => s.t === slot)?.valle;
  const price = booking?.servicio?.price || 20;
  const vPrice = booking?.servicio?.vallePrice || 15;
  const finalP = isValle ? vPrice : price;
  const total = finalP * (group ? groupN : 1);

  return (
    <div style={{ flex: 1, overflowY: "auto" }}>
      <div style={{ padding: "14px 18px 12px", borderBottom: `0.5px solid ${G.bdr}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Back onBack={() => nav("detail")} />
        {booking && <p style={{ fontSize: 12, color: G.muted }}>{booking.barbero?.name} · {booking.servicio?.name}</p>}
      </div>

      <div style={{ padding: "16px 18px" }}>
        {/* Reserva grupal */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: G.card, border: `0.5px solid ${G.bdr}`, borderRadius: 14, padding: "12px 14px", marginBottom: 14 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: G.text }}>👥 Reserva grupal</p>
              <NewPill />
            </div>
            <p style={{ fontSize: 11, color: G.muted }}>Reserva para amigos a la vez</p>
          </div>
          <div onClick={() => setGroup(!group)} style={{ width: 44, height: 25, background: group ? G.brand : "rgba(255,255,255,0.1)", borderRadius: 13, position: "relative", cursor: "pointer", transition: "background .2s", flexShrink: 0 }}>
            <div style={{ position: "absolute", top: 3, left: group ? 22 : 3, width: 19, height: 19, borderRadius: "50%", background: "white", transition: "left .2s" }} />
          </div>
        </div>

        {group && (
          <div style={{ background: G.card, border: `0.5px solid ${G.brand}30`, borderRadius: 14, padding: "12px 14px", marginBottom: 14 }}>
            <p style={{ fontSize: 12, color: G.muted, marginBottom: 10 }}>Número de personas</p>
            <div style={{ display: "flex", gap: 8 }}>
              {[1, 2, 3, 4].map(n => (
                <button key={n} onClick={() => setGroupN(n)} style={{ flex: 1, padding: "10px", background: groupN === n ? G.brand : G.card2, color: groupN === n ? "#080B0F" : G.muted, border: "none", borderRadius: 10, fontSize: 15, fontWeight: 800, cursor: "pointer", fontFamily: "inherit" }}>
                  {n}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Calendario */}
        <SectionLabel>Mayo 2026</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", marginBottom: 4 }}>
          {["L", "M", "X", "J", "V", "S", "D"].map(d => (
            <div key={d} style={{ textAlign: "center", fontSize: 10, color: G.muted, padding: "4px 0" }}>{d}</div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 4, marginBottom: 20 }}>
          {Array(3).fill(null).map((_, i) => <div key={"e" + i} />)}
          {Array.from({ length: 31 }, (_, i) => i + 1).map(d => {
            const past = d < 21, sel = d === day;
            return (
              <div key={d} onClick={() => !past && setDay(d)} style={{ aspectRatio: "1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, borderRadius: "50%", background: sel ? G.brand : "transparent", color: sel ? "#080B0F" : past ? "rgba(255,255,255,0.18)" : G.text, cursor: past ? "default" : "pointer", fontWeight: sel ? 800 : 400 }}>
                {d}
              </div>
            );
          })}
        </div>

        {/* Slots */}
        <SectionLabel>Horarios disponibles</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 14 }}>
          {SLOTS.map(s => (
            <div key={s.t} onClick={() => s.ok && setSlot(s.t)} style={{ padding: "10px 6px", borderRadius: 12, textAlign: "center", cursor: s.ok ? "pointer" : "not-allowed", background: slot === s.t ? `${G.brand}18` : "transparent", border: `0.5px solid ${!s.ok ? "rgba(255,255,255,0.04)" : slot === s.t ? G.brand + "70" : s.valle ? G.green + "30" : G.bdr}` }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: !s.ok ? "rgba(255,255,255,0.18)" : slot === s.t ? G.brand : G.text }}>{s.t}</p>
              {s.valle && s.ok && <p style={{ fontSize: 9, color: G.green, marginTop: 2 }}>⚡ Valle</p>}
              {!s.ok && <p style={{ fontSize: 9, color: "rgba(255,255,255,0.15)", marginTop: 2 }}>Ocupado</p>}
            </div>
          ))}
        </div>

        {isValle && slot && (
          <div style={{ background: `${G.green}08`, border: `0.5px solid ${G.green}20`, borderRadius: 12, padding: "10px 14px", marginBottom: 14, display: "flex", gap: 10, alignItems: "center" }}>
            <span>⚡</span>
            <p style={{ fontSize: 12, color: G.green, fontWeight: 700 }}>Tarifa valle activa — ahorras {price - vPrice}€ 🎉</p>
          </div>
        )}

        {slot && (
          <div style={{ background: G.card, border: `0.5px solid ${G.bdr}`, borderRadius: 14, padding: "14px 16px", marginBottom: 16 }}>
            {[
              { l: booking?.servicio?.name || "Servicio", v: `${price}€` },
              ...(isValle ? [{ l: "Descuento valle ⚡", v: `-${price - vPrice}€`, c: G.green }] : []),
              ...(group && groupN > 1 ? [{ l: `× ${groupN} personas`, v: `= ${finalP * groupN}€` }] : []),
            ].map((r, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: `0.5px solid ${G.bdr}` }}>
                <span style={{ fontSize: 13, color: G.muted }}>{r.l}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: r.c || G.text }}>{r.v}</span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 10 }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: G.text }}>Total</span>
              <span style={{ fontSize: 22, fontWeight: 900, color: G.brand }}>{total}€</span>
            </div>
          </div>
        )}

        <PrimaryBtn onClick={() => slot && nav("confirmed")} disabled={!slot}>
          {slot ? "Confirmar reserva →" : "Selecciona un horario"}
        </PrimaryBtn>
      </div>
    </div>
  );
}

// ─── CONFIRMED ────────────────────────────────────────────────────────────────
function ConfirmedScreen({ nav }) {
  const [qr, setQr] = useState(false);

  if (qr) return (
    <div style={{ flex: 1, overflowY: "auto", padding: "20px 18px" }}>
      <Back onBack={() => setQr(false)} />
      <div style={{ textAlign: "center", marginTop: 20 }}>
        <GonnieLogo size={28} />
        <h3 style={{ fontSize: 18, fontWeight: 800, color: G.text, margin: "14px 0 4px", letterSpacing: "-0.01em" }}>Tu QR de entrada</h3>
        <p style={{ fontSize: 12, color: G.muted, marginBottom: 24 }}>Muéstralo al llegar · Sin esperar en caja</p>
        <div style={{ background: G.card, border: `1.5px solid ${G.brand}40`, borderRadius: 24, padding: 22, display: "inline-block", marginBottom: 14 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(9,20px)", gap: 3 }}>
            {Array.from({ length: 81 }).map((_, i) => {
              const on = new Set([0,1,2,3,4,5,6,9,15,18,24,27,28,29,30,31,32,33,36,38,44,45,53,54,55,56,57,58,59,63,66,72,73,74,75,76,77,78,16,34,62,64,70,8,17,35,46,47,50,7,14,37,43,65,71,10,11,12,20,22,48,51,60,68]);
              return <div key={i} style={{ width: 18, height: 18, background: on.has(i) ? G.text : "transparent", borderRadius: 3 }} />;
            })}
          </div>
        </div>
        <p style={{ fontSize: 10, color: G.muted, marginBottom: 20, letterSpacing: "0.05em" }}>GONNIE-BKFRAGA-2026-JG-1130</p>
        <div style={{ background: `${G.brand}08`, border: `0.5px solid ${G.brand}25`, borderRadius: 14, padding: "14px 16px", textAlign: "left" }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: G.brand, marginBottom: 4 }}>📱 Check-in instantáneo</p>
          <p style={{ fontSize: 12, color: G.muted, lineHeight: 1.6 }}>El barbero ve tu llegada al instante y te avisa cuando es tu turno. Sin cola, sin espera en recepción.</p>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "28px 18px" }}>
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div style={{ fontSize: 58, marginBottom: 14 }}>🎉</div>
        <GonnieLogo size={28} />
        <h2 style={{ fontSize: 24, fontWeight: 900, color: G.text, margin: "12px 0 6px", letterSpacing: "-0.02em" }}>¡Reserva confirmada!</h2>
        <p style={{ fontSize: 13, color: G.muted }}>Te esperamos en BarberKing</p>
      </div>

      <div style={{ background: G.card, border: `0.5px solid ${G.bdr}`, borderRadius: 18, padding: "16px 18px", marginBottom: 14 }}>
        {[
          { l: "📅 Fecha", v: "Hoy, 21 de mayo" },
          { l: "⏰ Hora", v: "11:30h" },
          { l: "✂️ Servicio", v: "Corte + Barba" },
          { l: "👤 Barbero", v: "Carlos M." },
          { l: "💰 Total", v: "20€" },
        ].map((r, i, a) => (
          <div key={r.l} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: i < a.length - 1 ? `0.5px solid ${G.bdr}` : "none" }}>
            <span style={{ fontSize: 13, color: G.muted }}>{r.l}</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: G.text }}>{r.v}</span>
          </div>
        ))}
      </div>

      <div style={{ background: `${G.brand}10`, border: `0.5px solid ${G.brand}30`, borderRadius: 14, padding: "13px 16px", marginBottom: 18, display: "flex", gap: 12, alignItems: "center" }}>
        <span style={{ fontSize: 26 }}>⭐</span>
        <div>
          <p style={{ fontSize: 13, fontWeight: 700, color: G.brand }}>+40 Gonnie Points</p>
          <p style={{ fontSize: 11, color: G.muted }}>Total: 1.280 pts · Nivel Oro</p>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <PrimaryBtn onClick={() => setQr(true)}>📱 Ver QR Check-in</PrimaryBtn>
        <GhostBtn onClick={() => nav("home")}>Volver al inicio</GhostBtn>
      </div>
    </div>
  );
}

// ─── APPOINTMENTS ─────────────────────────────────────────────────────────────
function AppointmentsScreen({ nav }) {
  const upcoming = [
    { s: "Corte + Barba", b: "Carlos M.", d: "Hoy 11:30h", p: 20, ok: true },
    { s: "Corte de pelo", b: "Alejandro L.", d: "28 may · 16:00h", p: 12, ok: false },
  ];
  const history = [
    { s: "Corte + Barba", b: "Carlos M.", d: "10 may", p: 20, pts: 40, rated: true },
    { s: "Navaja + Ritual", b: "Marcos R.", d: "24 abr", p: 28, pts: 56, rated: false },
    { s: "Corte de pelo", b: "Alejandro L.", d: "10 abr", p: 12, pts: 24, rated: true },
  ];
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "16px 18px" }}>
      <h2 style={{ fontSize: 22, fontWeight: 800, color: G.text, marginBottom: 18, letterSpacing: "-0.02em" }}>Mis citas</h2>

      <SectionLabel>Próximas</SectionLabel>
      {upcoming.map((a, i) => (
        <div key={i} style={{ background: G.card, border: `0.5px solid ${a.ok ? G.green + "30" : G.bdr}`, borderRadius: 16, padding: "14px 16px", marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
            <p style={{ fontSize: 14, fontWeight: 800, color: G.text }}>{a.s}</p>
            <Pill color={a.ok ? "#080B0F" : G.gold} bg={a.ok ? G.green : `${G.gold}18`}>
              {a.ok ? "✓ Confirmada" : "Pendiente"}
            </Pill>
          </div>
          <p style={{ fontSize: 12, color: G.muted, marginBottom: 12 }}>📅 {a.d} · 👤 {a.b} · 💰 {a.p}€</p>
          <div style={{ display: "flex", gap: 8 }}>
            {a.ok && (
              <button onClick={() => nav("confirmed")} style={{ flex: 1, background: `${G.brand}12`, border: `0.5px solid ${G.brand}40`, borderRadius: 10, padding: "8px", fontSize: 11, color: G.brand, cursor: "pointer", fontFamily: "inherit", fontWeight: 700 }}>
                📱 QR Check-in
              </button>
            )}
            <button style={{ flex: 1, background: "transparent", border: `0.5px solid ${G.bdr}`, borderRadius: 10, padding: "8px", fontSize: 11, color: G.muted, cursor: "pointer", fontFamily: "inherit" }}>
              Cancelar
            </button>
          </div>
        </div>
      ))}

      <SectionLabel>Historial</SectionLabel>
      {history.map((a, i) => (
        <div key={i} style={{ background: G.card, border: `0.5px solid ${G.bdr}`, borderRadius: 16, padding: "14px 16px", marginBottom: 10, opacity: 0.85 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: G.text }}>{a.s}</p>
            <Pill color={G.brand}>+{a.pts} pts</Pill>
          </div>
          <p style={{ fontSize: 11, color: G.muted, marginBottom: a.rated ? 0 : 10 }}>📅 {a.d} · 👤 {a.b} · 💰 {a.p}€</p>
          {!a.rated && (
            <div style={{ background: `${G.brand}08`, border: `0.5px solid ${G.brand}20`, borderRadius: 10, padding: "10px 12px", display: "flex", gap: 10, alignItems: "center" }}>
              <span>📸</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: G.brand }}>¿Qué tal el resultado?</p>
                <p style={{ fontSize: 10, color: G.muted }}>Sube una foto y gana +20 pts</p>
              </div>
              <NewPill />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── LOYALTY ──────────────────────────────────────────────────────────────────
function LoyaltyScreen() {
  const [tab, setTab] = useState("rewards");
  return (
    <div style={{ flex: 1, overflowY: "auto" }}>
      <div style={{ background: "linear-gradient(160deg,#091A14,#0A1F18,#080B0F)", padding: "22px 20px 28px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -40, right: -40, width: 180, height: 180, borderRadius: "50%", background: `${G.brand}07` }} />
        <GonnieLogo size={22} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", margin: "16px 0 14px" }}>
          <div>
            <p style={{ fontSize: 10, color: `${G.brand}80`, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 5 }}>Gonnie Points · Nivel Oro</p>
            <p style={{ fontSize: 42, fontWeight: 900, color: G.brand, lineHeight: 1, letterSpacing: "-0.03em" }}>1.240</p>
          </div>
          <div style={{ background: `${G.brand}15`, border: `0.5px solid ${G.brand}30`, borderRadius: 16, padding: "12px 14px", textAlign: "center" }}>
            <p style={{ fontSize: 28, marginBottom: 2 }}>🏆</p>
            <p style={{ fontSize: 10, fontWeight: 800, color: G.brand, letterSpacing: "0.04em" }}>ORO</p>
          </div>
        </div>
        <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: 10, height: 7, overflow: "hidden", marginBottom: 5 }}>
          <div style={{ width: "72%", height: "100%", background: `linear-gradient(90deg,${G.brand},${G.brandL})`, borderRadius: 10 }} />
        </div>
        <p style={{ fontSize: 11, color: G.muted }}>260 pts para Platino 💎</p>
      </div>

      <div style={{ padding: "16px 18px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 18 }}>
          {[{ l: "Visitas", v: "31" }, { l: "Pts totales", v: "1.540" }, { l: "Canjeados", v: "300" }].map(s => (
            <div key={s.l} style={{ background: G.card, borderRadius: 12, padding: "12px 10px", textAlign: "center" }}>
              <p style={{ fontSize: 20, fontWeight: 900, color: G.text, marginBottom: 3 }}>{s.v}</p>
              <p style={{ fontSize: 10, color: G.muted }}>{s.l}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", background: G.card2, borderRadius: 12, padding: 3, marginBottom: 16 }}>
          {[{ id: "rewards", l: "Recompensas" }, { id: "history", l: "Historial" }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ flex: 1, background: tab === t.id ? G.brand : "transparent", color: tab === t.id ? "#080B0F" : G.muted, border: "none", borderRadius: 10, padding: "8px", fontSize: 12, cursor: "pointer", fontFamily: "inherit", fontWeight: tab === t.id ? 800 : 500 }}>
              {t.l}
            </button>
          ))}
        </div>

        {tab === "rewards" && REWARDS.map(r => (
          <div key={r.id} style={{ display: "flex", alignItems: "center", gap: 14, background: G.card, border: `0.5px solid ${G.bdr}`, borderRadius: 14, padding: "13px 14px", marginBottom: 10 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: `${G.brand}10`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>{r.icon}</div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: G.text }}>{r.name}</p>
              <p style={{ fontSize: 11, color: G.muted }}>{r.desc} · {r.pts} pts</p>
            </div>
            <button style={{ background: 1240 >= r.pts ? G.brand : "transparent", border: `0.5px solid ${1240 >= r.pts ? "transparent" : G.bdr}`, borderRadius: 10, padding: "8px 12px", fontSize: 11, color: 1240 >= r.pts ? "#080B0F" : G.muted, cursor: "pointer", fontFamily: "inherit", fontWeight: 800, flexShrink: 0 }}>
              {1240 >= r.pts ? "Canjear" : `${r.pts - 1240} más`}
            </button>
          </div>
        ))}

        {tab === "history" && [
          { d: "Hoy", t: "Reserva confirmada · BarberKing", p: "+40", c: G.brand },
          { d: "10 may", t: "Corte + Barba · Carlos M.", p: "+40", c: G.brand },
          { d: "24 abr", t: "Navaja + Ritual · Marcos R.", p: "+56", c: G.brand },
          { d: "12 abr", t: "Canje: 10% descuento", p: "-200", c: G.red },
          { d: "1 abr", t: "Corte de pelo · Alejandro L.", p: "+24", c: G.brand },
          { d: "15 mar", t: "Bono doble · Aniversario Gonnie", p: "+100", c: G.brandL },
        ].map((h, i) => (
          <div key={i} style={{ display: "flex", gap: 14, alignItems: "center", padding: "10px 0", borderBottom: `0.5px solid ${G.bdr}` }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: h.c, flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 12, fontWeight: 500, color: G.text }}>{h.t}</p>
              <p style={{ fontSize: 10, color: G.muted }}>{h.d}</p>
            </div>
            <p style={{ fontSize: 13, fontWeight: 800, color: h.c }}>{h.p}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PLANS ────────────────────────────────────────────────────────────────────
function PlansScreen({ nav }) {
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "16px 18px" }}>
      <Back onBack={() => nav("home")} />
      <div style={{ textAlign: "center", margin: "16px 0 22px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <h2 style={{ fontSize: 22, fontWeight: 900, color: G.text, letterSpacing: "-0.02em" }}>Suscripciones</h2>
          <NewPill />
        </div>
        <p style={{ fontSize: 13, color: G.muted }}>Cortes mensuales · Precio fijo · Sin sorpresas</p>
      </div>
      {PLANS.map(p => (
        <div key={p.id} style={{ background: G.card, border: `${p.popular ? "1.5px" : "0.5px"} solid ${p.popular ? G.brand + "60" : G.bdr}`, borderRadius: 20, padding: "20px 18px", marginBottom: 14, position: "relative" }}>
          {p.popular && (
            <div style={{ position: "absolute", top: -11, left: "50%", transform: "translateX(-50%)", background: G.brand, color: "#080B0F", fontSize: 10, fontWeight: 900, padding: "3px 16px", borderRadius: 20, whiteSpace: "nowrap", letterSpacing: "0.04em" }}>
              ⭐ MÁS POPULAR
            </div>
          )}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
            <div>
              <p style={{ fontSize: 18, fontWeight: 900, color: G.text, letterSpacing: "-0.01em" }}>{p.name}</p>
              <p style={{ fontSize: 11, color: G.muted }}>{p.cuts} {p.cuts === 1 ? "corte" : "cortes"} al mes</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: 28, fontWeight: 900, color: p.popular ? G.brand : G.text, letterSpacing: "-0.02em" }}>{p.price}€</p>
              <p style={{ fontSize: 10, color: G.muted }}>/mes</p>
            </div>
          </div>
          {p.perks.map(pk => (
            <div key={pk} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 12, color: p.accent, fontWeight: 700 }}>✓</span>
              <p style={{ fontSize: 12, color: G.muted }}>{pk}</p>
            </div>
          ))}
          <button style={{ marginTop: 14, width: "100%", background: p.popular ? G.brand : "transparent", border: `0.5px solid ${p.popular ? "transparent" : G.bdr}`, borderRadius: 12, padding: "13px", fontSize: 13, color: p.popular ? "#080B0F" : G.muted, cursor: "pointer", fontFamily: "inherit", fontWeight: 800 }}>
            {p.popular ? "Activar Plan Pro →" : "Elegir este plan"}
          </button>
        </div>
      ))}
    </div>
  );
}

// ─── BUSINESS DASHBOARD ───────────────────────────────────────────────────────
function BusinessScreen({ setMode }) {
  const [tab, setTab] = useState("hoy");
  const agenda = [
    { t: "09:30", c: "Miguel A.", s: "Fade clásico", b: "Carlos", p: 15, st: "done" },
    { t: "10:00", c: "Roberto P.", s: "Corte + Barba", b: "Carlos", p: 20, st: "done" },
    { t: "10:30", c: "Javier G.", s: "Corte + Barba", b: "Alejandro", p: 20, st: "now" },
    { t: "11:00", c: "Pedro M.", s: "Navaja + Ritual", b: "Marcos", p: 28, st: "next" },
    { t: "11:30", c: "Luis F.", s: "Corte de pelo", b: "Carlos", p: 12, st: "next" },
    { t: "12:00", c: "— Libre —", s: "", b: "", p: 0, st: "free" },
    { t: "16:00", c: "Antonio R.", s: "Arreglo de barba", b: "Alejandro", p: 10, st: "next" },
  ];
  const dotColor = { done: G.green, now: G.brand, next: G.muted, free: "rgba(255,255,255,0.1)" };

  return (
    <div style={{ flex: 1, overflowY: "auto" }}>
      <div style={{ background: "#060A0E", padding: "14px 18px 12px", borderBottom: `0.5px solid ${G.bdr}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <GonnieLogo size={22} />
            <p style={{ fontSize: 11, color: G.muted, marginTop: 3 }}>Panel de negocio · BarberKing Fraga</p>
          </div>
          <button onClick={() => setMode("client")} style={{ background: `${G.brand}12`, border: `0.5px solid ${G.brand}30`, borderRadius: 10, padding: "7px 12px", fontSize: 11, color: G.brand, cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}>
            👤 Cliente
          </button>
        </div>
      </div>

      <div style={{ padding: "14px 18px" }}>
        {/* KPIs */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
          {[
            { l: "Ingresos hoy", v: "248€", d: "+12% vs ayer", c: G.green },
            { l: "Citas hoy", v: "12", d: "8 completadas", c: G.brand },
            { l: "Ocupación", v: "84%", d: "+6% esta semana", c: G.green },
            { l: "Clientes nuevos", v: "3", d: "Este mes: 28", c: G.blue },
          ].map(k => (
            <div key={k.l} style={{ background: G.card, border: `0.5px solid ${G.bdr}`, borderRadius: 14, padding: "13px 14px" }}>
              <p style={{ fontSize: 11, color: G.muted, marginBottom: 7 }}>{k.l}</p>
              <p style={{ fontSize: 24, fontWeight: 900, color: G.text, marginBottom: 3, letterSpacing: "-0.02em" }}>{k.v}</p>
              <p style={{ fontSize: 10, color: k.c, fontWeight: 600 }}>{k.d}</p>
            </div>
          ))}
        </div>

        {/* Gráfico ingresos */}
        <div style={{ background: G.card, border: `0.5px solid ${G.bdr}`, borderRadius: 16, padding: "14px 14px 8px", marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: G.text }}>Ingresos 2026</p>
            <Pill>+28% anual</Pill>
          </div>
          <ResponsiveContainer width="100%" height={110}>
            <AreaChart data={REVENUE_DATA} margin={{ top: 0, right: 0, bottom: 0, left: -24 }}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={G.brand} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={G.brand} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="m" tick={{ fill: G.muted, fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: G.card2, border: `0.5px solid ${G.bdr}`, borderRadius: 10, fontSize: 12, color: G.text }} formatter={v => [`${v}€`, "Ingresos"]} />
              <Area type="monotone" dataKey="v" stroke={G.brand} strokeWidth={2.5} fill="url(#g1)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* IA Insight */}
        <div style={{ background: "linear-gradient(135deg,#091A14,#0C1F17)", border: `0.5px solid ${G.brand}25`, borderRadius: 14, padding: "13px 14px", marginBottom: 16 }}>
          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: `${G.brand}12`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>🤖</div>
            <div>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 5 }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: G.brand }}>Gonnie IA · Insight</p>
                <NewPill />
              </div>
              <p style={{ fontSize: 11, color: G.muted, lineHeight: 1.6, marginBottom: 7 }}>
                Los jueves entre 10:00–12:00h tienes un 40% de huecos libres. Activar tarifa valle automática en esa franja podría generarte <span style={{ color: G.brand, fontWeight: 700 }}>+180€/mes</span>.
              </p>
              <button style={{ background: "transparent", border: "none", color: G.brand, fontSize: 11, cursor: "pointer", fontFamily: "inherit", fontWeight: 700, padding: 0 }}>
                Activar descuento automático →
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", background: G.card2, borderRadius: 12, padding: 3, marginBottom: 14 }}>
          {[{ id: "hoy", l: "Agenda" }, { id: "equipo", l: "Equipo" }, { id: "clientes", l: "Clientes" }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ flex: 1, background: tab === t.id ? G.brand : "transparent", color: tab === t.id ? "#080B0F" : G.muted, border: "none", borderRadius: 10, padding: "8px", fontSize: 12, cursor: "pointer", fontFamily: "inherit", fontWeight: tab === t.id ? 800 : 500 }}>
              {t.l}
            </button>
          ))}
        </div>

        {tab === "hoy" && agenda.map((a, i) => (
          <div key={i} style={{ display: "flex", gap: 12, alignItems: "center", padding: "10px 0", borderBottom: `0.5px solid ${G.bdr}` }}>
            <p style={{ fontSize: 11, color: G.muted, width: 36, flexShrink: 0, fontWeight: 500 }}>{a.t}</p>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: dotColor[a.st], flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 12, fontWeight: a.st === "free" ? 400 : 600, color: a.st === "free" ? G.muted : G.text }}>{a.c}</p>
              {a.s && <p style={{ fontSize: 10, color: G.muted }}>{a.s}{a.b ? ` · ${a.b}` : ""}</p>}
            </div>
            {a.p > 0 && <p style={{ fontSize: 12, fontWeight: 700, color: a.st === "done" ? G.green : G.muted }}>{a.p}€</p>}
          </div>
        ))}

        {tab === "equipo" && [
          { name: "Carlos M.", ini: "CM", bg: "#1A2535", co: G.blue, citas: 8, r: 5.0, ing: "156€" },
          { name: "Alejandro L.", ini: "AL", bg: "#1A2520", co: G.green, citas: 5, r: 4.8, ing: "100€" },
          { name: "Marcos R.", ini: "MR", bg: "#251A25", co: "#C084FC", citas: 7, r: 4.7, ing: "120€" },
        ].map(e => (
          <div key={e.name} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 12px", background: G.card, border: `0.5px solid ${G.bdr}`, borderRadius: 12, marginBottom: 10 }}>
            <Av txt={e.ini} bg={e.bg} color={e.co} />
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: G.text }}>{e.name}</p>
              <p style={{ fontSize: 10, color: G.muted }}>{e.citas} citas · ⭐ {e.r}</p>
            </div>
            <p style={{ fontSize: 14, fontWeight: 800, color: G.brand }}>{e.ing}</p>
          </div>
        ))}

        {tab === "clientes" && [
          { n: "Javier G.", v: 31, l: "10 min", s: "620€", f: true },
          { n: "Miguel A.", v: 12, l: "Hoy", s: "240€", f: true },
          { n: "Roberto P.", v: 8, l: "Ayer", s: "160€", f: false },
          { n: "Pedro M.", v: 5, l: "2 semanas", s: "100€", f: false },
        ].map(cl => (
          <div key={cl.n} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: `0.5px solid ${G.bdr}` }}>
            <Av txt={cl.n.split(" ").map(x => x[0]).join("")} size={32} bg={G.card2} color={G.muted} />
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", gap: 7, alignItems: "center", marginBottom: 2 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: G.text }}>{cl.n}</p>
                {cl.f && <Pill>Fiel</Pill>}
              </div>
              <p style={{ fontSize: 10, color: G.muted }}>{cl.v} visitas · último: {cl.l}</p>
            </div>
            <p style={{ fontSize: 12, fontWeight: 700, color: G.brand }}>{cl.s}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PROFILE ──────────────────────────────────────────────────────────────────
function ProfileScreen({ nav, setMode }) {
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "18px" }}>
      <h2 style={{ fontSize: 22, fontWeight: 900, color: G.text, marginBottom: 18, letterSpacing: "-0.02em" }}>Perfil</h2>
      <div style={{ display: "flex", alignItems: "center", gap: 14, background: G.card, border: `0.5px solid ${G.bdr}`, borderRadius: 18, padding: "16px", marginBottom: 20 }}>
        <Av txt="JG" size={52} bg="#1A2535" color={G.brand} />
        <div>
          <p style={{ fontSize: 16, fontWeight: 800, color: G.text }}>Javier García</p>
          <p style={{ fontSize: 12, color: G.muted }}>javier@email.com</p>
          <Pill>⭐ Nivel Oro · 1.240 pts</Pill>
        </div>
      </div>

      <div style={{ background: G.card, border: `0.5px solid ${G.bdr}`, borderRadius: 16, overflow: "hidden", marginBottom: 16 }}>
        {[
          { l: "📦 Mis suscripciones", action: () => nav("plans") },
          { l: "💳 Métodos de pago", action: () => {} },
          { l: "🔔 Notificaciones", action: () => {} },
          { l: "🔒 Privacidad", action: () => {} },
          { l: "❓ Ayuda y soporte", action: () => {} },
        ].map((item, i, a) => (
          <div key={item.l} onClick={item.action} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: i < a.length - 1 ? `0.5px solid ${G.bdr}` : "none", cursor: "pointer" }}>
            <p style={{ fontSize: 13, fontWeight: 500, color: G.text }}>{item.l}</p>
            <span style={{ color: G.muted }}>›</span>
          </div>
        ))}
      </div>

      <div style={{ background: `${G.brand}08`, border: `0.5px solid ${G.brand}25`, borderRadius: 18, padding: "16px 18px", marginBottom: 14 }}>
        <p style={{ fontSize: 14, fontWeight: 800, color: G.brand, marginBottom: 6 }}>✂️ ¿Tienes una barbería?</p>
        <p style={{ fontSize: 12, color: G.muted, lineHeight: 1.6, marginBottom: 14 }}>
          Únete a la red Gonnie Business. Gestiona tu agenda, equipo y estadísticas desde el móvil.
        </p>
        <PrimaryBtn onClick={() => setMode("business")}>Abrir panel de negocio →</PrimaryBtn>
      </div>

      <p style={{ textAlign: "center", fontSize: 11, color: G.muted }}>gonnie v1.0.0 · Hecho con ♥ en España</p>
    </div>
  );
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "home", icon: "🏠", label: "Inicio" },
  { id: "explore", icon: "🔍", label: "Explorar" },
  { id: "appointments", icon: "📅", label: "Citas" },
  { id: "loyalty", icon: "⭐", label: "Points" },
  { id: "profile", icon: "👤", label: "Perfil" },
];
const NO_NAV = ["detail", "booking", "confirmed", "plans"];

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState("splash");
  const [mode, setMode] = useState("client");
  const [barberia, setBarberia] = useState(null);
  const [booking, setBooking] = useState(null);

  const nav = v => setView(v);

  const phone = {
    maxWidth: 390, margin: "0 auto", height: "100vh",
    display: "flex", flexDirection: "column",
    background: G.bg, overflow: "hidden",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    color: G.text,
  };

  if (view === "splash") return (
    <div style={phone}>
      <SplashScreen onDone={() => nav("home")} />
    </div>
  );

  if (mode === "business") return (
    <div style={phone}>
      <BusinessScreen setMode={setMode} />
    </div>
  );

  return (
    <div style={phone}>
      {/* Status bar */}
      <div style={{ background: G.bg, padding: "8px 18px 0", display: "flex", justifyContent: "space-between", flexShrink: 0 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: G.text }}>9:41</span>
        <div style={{ display: "flex", gap: 5, alignItems: "center", fontSize: 10, color: G.muted }}>
          <span>●●●●</span><span>WiFi</span><span>🔋</span>
        </div>
      </div>

      {/* Screens */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {view === "home"         && <HomeScreen nav={nav} />}
        {view === "explore"      && <ExploreScreen nav={nav} setBarberia={setBarberia} />}
        {view === "detail"       && <DetailScreen barberia={barberia || BARBERIAS[0]} nav={nav} setBooking={setBooking} />}
        {view === "booking"      && <BookingScreen booking={booking} nav={nav} />}
        {view === "confirmed"    && <ConfirmedScreen nav={nav} />}
        {view === "appointments" && <AppointmentsScreen nav={nav} />}
        {view === "loyalty"      && <LoyaltyScreen />}
        {view === "plans"        && <PlansScreen nav={nav} />}
        {view === "profile"      && <ProfileScreen nav={nav} setMode={setMode} />}
      </div>

      {/* Bottom nav */}
      {!NO_NAV.includes(view) && (
        <div style={{ display: "flex", borderTop: `0.5px solid ${G.bdr}`, background: G.card, flexShrink: 0 }}>
          {NAV_ITEMS.map(n => (
            <button key={n.id} onClick={() => nav(n.id)} style={{ flex: 1, background: "transparent", border: "none", padding: "8px 4px 10px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, fontFamily: "inherit" }}>
              <span style={{ fontSize: 20 }}>{n.icon}</span>
              <span style={{ fontSize: 9, color: view === n.id ? G.brand : G.muted, fontWeight: view === n.id ? 800 : 400 }}>{n.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
