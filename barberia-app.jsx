import { useState } from "react";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";

const C = {
  bg: "#09090F", card: "#131320", card2: "#1C1C2E",
  gold: "#C9A252", goldL: "#E8C97A",
  text: "#F0EEE8", muted: "#7A7888",
  bdr: "rgba(255,255,255,0.07)",
  green: "#4ADE80", red: "#F87171", blue: "#60A5FA",
};

const ss = (o) => o;

const Avatar = ({ initials, size = 36, bg = "#1E2A3A", color = C.blue }) => (
  <div style={{ width: size, height: size, borderRadius: "50%", background: bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.33, fontWeight: 600, color, flexShrink: 0 }}>
    {initials}
  </div>
);

const Tag = ({ children, color = C.gold, bg = "rgba(201,162,82,0.12)" }) => (
  <span style={{ background: bg, color, fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20, letterSpacing: "0.04em", whiteSpace: "nowrap" }}>{children}</span>
);

const NewTag = () => <Tag color="#09090F" bg={C.gold}>NUEVO</Tag>;

const Btn = ({ onClick, children, style = {}, variant = "primary" }) => (
  <button onClick={onClick} style={{
    background: variant === "primary" ? C.gold : "transparent",
    color: variant === "primary" ? "#09090F" : C.muted,
    border: variant === "primary" ? "none" : `0.5px solid ${C.bdr}`,
    borderRadius: 12, padding: "12px 20px", fontSize: 14, fontWeight: 700,
    cursor: "pointer", width: "100%", fontFamily: "inherit", ...style
  }}>{children}</button>
);

const Back = ({ onBack, label = "← Volver" }) => (
  <button onClick={onBack} style={{ background: "transparent", border: "none", color: C.muted, cursor: "pointer", fontSize: 13, fontFamily: "inherit", padding: "4px 0", display: "flex", alignItems: "center", gap: 4 }}>
    {label}
  </button>
);

const Row = ({ label, value, valueColor }) => (
  <div style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: `0.5px solid ${C.bdr}` }}>
    <span style={{ fontSize: 13, color: C.muted }}>{label}</span>
    <span style={{ fontSize: 13, fontWeight: 500, color: valueColor || C.text }}>{value}</span>
  </div>
);

const BARBERIAS = [
  {
    id: 1, name: "BarberKing", city: "Fraga", dist: "0.3 km", rating: 4.9, reviews: 124,
    open: true, hours: "9:00–20:00", specialties: ["Fade", "Barba", "Navaja"],
    barberos: [
      { id: 1, name: "Carlos M.", role: "Senior · Fade", initials: "CM", rating: 5.0, slots: 3, bg: "#1E2A4A", color: C.blue },
      { id: 2, name: "Alejandro L.", role: "Barbas · Diseño", initials: "AL", rating: 4.8, slots: 5, bg: "#1A2E1A", color: C.green },
      { id: 3, name: "Marcos R.", role: "Clásico · Navaja", initials: "MR", rating: 4.7, slots: 2, bg: "#2A1A2A", color: "#C084FC" },
    ],
    services: [
      { id: 1, name: "Corte de pelo", time: 30, price: 12, vallePrice: 9, icon: "✂️" },
      { id: 2, name: "Corte + Barba", time: 50, price: 20, vallePrice: 15, icon: "✂️🧔" },
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
      { id: 4, name: "Diego F.", role: "Barbas · Diseño", initials: "DF", rating: 4.6, slots: 4, bg: "#2A1A1A", color: "#FB923C" },
      { id: 5, name: "Pablo S.", role: "Senior · Fade", initials: "PS", rating: 4.5, slots: 6, bg: "#1A1A2E", color: C.blue },
    ],
    services: [
      { id: 1, name: "Corte de pelo", time: 30, price: 10, vallePrice: 8, icon: "✂️" },
      { id: 2, name: "Corte + Barba", time: 45, price: 18, vallePrice: 14, icon: "✂️🧔" },
    ],
    styles: [
      { id: 1, name: "Fade moderno", emoji: "💈", likes: 112 },
      { id: 2, name: "Texturizado", emoji: "✂️", likes: 89 },
    ],
  },
];

const REVENUE = [
  { m: "Ene", v: 1240 }, { m: "Feb", v: 1580 }, { m: "Mar", v: 1320 },
  { m: "Abr", v: 1890 }, { m: "May", v: 2150 }, { m: "Jun", v: 2480 },
  { m: "Jul", v: 2890 }, { m: "Ago", v: 3120 },
];

const REWARDS = [
  { id: 1, name: "10% descuento", pts: 200, icon: "🏷️" },
  { id: 2, name: "Corte gratis", pts: 500, icon: "✂️" },
  { id: 3, name: "Kit de barba premium", pts: 300, icon: "🧴" },
  { id: 4, name: "Upgrade navaja", pts: 400, icon: "💎" },
];

const SLOTS = [
  { t: "09:00", ok: false, valle: false }, { t: "09:30", ok: false, valle: false },
  { t: "10:00", ok: true, valle: true }, { t: "10:30", ok: true, valle: true },
  { t: "11:00", ok: false, valle: false }, { t: "11:30", ok: true, valle: true },
  { t: "16:00", ok: true, valle: false }, { t: "17:00", ok: true, valle: false },
  { t: "17:30", ok: false, valle: false }, { t: "18:00", ok: true, valle: false },
  { t: "18:30", ok: true, valle: false }, { t: "19:00", ok: true, valle: false },
];

const PLANS = [
  { id: 1, name: "Básico", price: 19, cuts: 1, color: C.card, border: C.bdr, popular: false, perks: ["1 corte al mes", "Reserva prioritaria", "Historial completo"] },
  { id: 2, name: "Pro", price: 34, cuts: 2, color: "rgba(201,162,82,0.08)", border: "rgba(201,162,82,0.5)", popular: true, perks: ["2 cortes al mes", "Reserva prioritaria", "10% en servicios extra", "Acceso horas valle", "Puntos x2"] },
  { id: 3, name: "Premium", price: 55, cuts: 4, color: C.card, border: C.bdr, popular: false, perks: ["4 cortes al mes", "Barbero fijo asignado", "20% en servicios extra", "Acceso VIP sin espera", "Puntos x3"] },
];

// ─── SCREENS ──────────────────────────────────────────────────────────────────

function HomeScreen({ nav, setSelectedBarberia }) {
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <div>
          <p style={{ fontSize: 12, color: C.muted, marginBottom: 2 }}>Buenos días 👋</p>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: C.text }}>Javier García</h2>
        </div>
        <div style={{ position: "relative" }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: C.card, border: `0.5px solid ${C.bdr}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🔔</div>
          <div style={{ position: "absolute", top: 2, right: 2, width: 10, height: 10, borderRadius: "50%", background: C.gold, border: `2px solid ${C.bg}` }}></div>
        </div>
      </div>

      {/* Loyalty card */}
      <div onClick={() => nav("loyalty")} style={{ background: "linear-gradient(135deg,#1E1830,#2A1F42)", border: `1px solid rgba(201,162,82,0.3)`, borderRadius: 18, padding: "18px 20px", marginBottom: 16, cursor: "pointer", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -30, right: -30, width: 130, height: 130, borderRadius: "50%", background: "rgba(201,162,82,0.05)" }}></div>
        <div style={{ position: "absolute", bottom: -20, left: -20, width: 80, height: 80, borderRadius: "50%", background: "rgba(201,162,82,0.04)" }}></div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
          <div>
            <p style={{ fontSize: 10, color: "rgba(201,162,82,0.6)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>Mis puntos</p>
            <p style={{ fontSize: 34, fontWeight: 800, color: C.gold, lineHeight: 1 }}>1.240</p>
            <p style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>Nivel Oro · 260 pts para Platino</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <NewTag />
            <p style={{ fontSize: 11, color: C.muted, marginTop: 8 }}>Ver recompensas →</p>
          </div>
        </div>
        <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 8, height: 6, overflow: "hidden" }}>
          <div style={{ width: "72%", height: "100%", background: `linear-gradient(90deg,${C.gold},${C.goldL})`, borderRadius: 8 }}></div>
        </div>
        <p style={{ fontSize: 10, color: C.muted, marginTop: 5 }}>72% hacia Platino</p>
      </div>

      {/* Próxima cita */}
      <div style={{ background: C.card, border: `0.5px solid rgba(74,222,128,0.2)`, borderRadius: 14, padding: "14px 16px", marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <p style={{ fontSize: 12, color: C.muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>Próxima cita</p>
          <Tag color="#09090F" bg={C.green}>Hoy 11:30h</Tag>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Avatar initials="CM" bg="#1E2A4A" color={C.blue} size={40} />
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 14, fontWeight: 600, color: C.text }}>Corte + Barba</p>
            <p style={{ fontSize: 12, color: C.muted }}>Carlos M. · BarberKing</p>
          </div>
          <button onClick={() => nav("confirmed")} style={{ background: "rgba(201,162,82,0.1)", border: `0.5px solid rgba(201,162,82,0.35)`, borderRadius: 8, padding: "7px 12px", fontSize: 11, color: C.gold, cursor: "pointer", fontFamily: "inherit", fontWeight: 700 }}>
            📱 QR
          </button>
        </div>
      </div>

      {/* Acciones */}
      <p style={{ fontSize: 10, color: C.muted, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10 }}>Acciones rápidas</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
        {[
          { icon: "✂️", label: "Reservar ahora", action: () => nav("explore") },
          { icon: "👥", label: "Reserva grupal", action: () => nav("explore"), isNew: true },
          { icon: "📦", label: "Suscripciones", action: () => nav("plans"), isNew: true },
          { icon: "💬", label: "Chat barbería", action: () => {}, isNew: true },
        ].map((a, i) => (
          <div key={i} onClick={a.action} style={{ background: C.card, border: `0.5px solid ${C.bdr}`, borderRadius: 14, padding: "14px", cursor: "pointer", position: "relative" }}>
            {a.isNew && <div style={{ position: "absolute", top: 8, right: 8 }}><NewTag /></div>}
            <span style={{ fontSize: 24, display: "block", marginBottom: 8 }}>{a.icon}</span>
            <span style={{ fontSize: 12, fontWeight: 500, color: C.text }}>{a.label}</span>
          </div>
        ))}
      </div>

      {/* IA insight */}
      <div style={{ background: "linear-gradient(135deg,#0D1A0D,#121E12)", border: `0.5px solid rgba(74,222,128,0.2)`, borderRadius: 14, padding: "14px 16px", marginBottom: 24 }}>
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          <span style={{ fontSize: 22 }}>🤖</span>
          <div>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 5 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: C.text }}>Sugerencia IA</p>
              <NewTag />
            </div>
            <p style={{ fontSize: 12, color: C.muted, lineHeight: 1.6 }}>Basándome en tu historial, Carlos M. es tu mejor match esta semana. Hay hueco mañana a las 10:00 con tarifa valle — ahorras 5€.</p>
            <button onClick={() => nav("explore")} style={{ marginTop: 8, background: "transparent", border: "none", color: C.green, fontSize: 12, cursor: "pointer", fontFamily: "inherit", fontWeight: 600, padding: 0 }}>
              Reservar ahora →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExploreScreen({ nav, setSelectedBarberia }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Todos");
  const filters = ["Todos", "Fade", "Barba", "Navaja", "Clásico"];
  const list = BARBERIAS.filter(b =>
    (filter === "Todos" || b.specialties.includes(filter)) &&
    b.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: C.text, marginBottom: 14 }}>Explorar</h2>
      <div style={{ background: C.card, border: `0.5px solid ${C.bdr}`, borderRadius: 12, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <span>🔍</span>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar barberías..." style={{ background: "transparent", border: "none", outline: "none", color: C.text, fontSize: 13, flex: 1, fontFamily: "inherit" }} />
      </div>
      <div style={{ display: "flex", gap: 8, overflowX: "auto", marginBottom: 16, paddingBottom: 2 }}>
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ flexShrink: 0, background: filter === f ? C.gold : C.card, color: filter === f ? "#09090F" : C.muted, border: `0.5px solid ${filter === f ? "transparent" : C.bdr}`, borderRadius: 20, padding: "6px 14px", fontSize: 12, cursor: "pointer", fontWeight: filter === f ? 700 : 400, fontFamily: "inherit" }}>
            {f}
          </button>
        ))}
      </div>
      {list.map(b => (
        <div key={b.id} onClick={() => { setSelectedBarberia(b); nav("detail"); }} style={{ background: C.card, border: `0.5px solid ${C.bdr}`, borderRadius: 16, marginBottom: 12, overflow: "hidden", cursor: "pointer" }}>
          <div style={{ height: 88, background: "linear-gradient(135deg,#1A1A2E,#252545)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }}>💈</div>
          <div style={{ padding: "12px 14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
              <p style={{ fontSize: 15, fontWeight: 700, color: C.text }}>{b.name}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ fontSize: 12 }}>⭐</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{b.rating}</span>
                <span style={{ fontSize: 11, color: C.muted }}>({b.reviews})</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, fontSize: 11, color: C.muted, marginBottom: 8, flexWrap: "wrap" }}>
              <span>📍 {b.dist}</span><span>·</span>
              <span style={{ color: b.open ? C.green : C.red }}>{b.open ? "Abierto" : "Cerrado"}</span>
              <span>·</span><span>{b.hours}</span>
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {b.specialties.map(sp => <Tag key={sp}>{sp}</Tag>)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function DetailScreen({ barberia, nav, setBookingData }) {
  const [tab, setTab] = useState("barberos");
  const [selB, setSelB] = useState(null);
  const [selS, setSelS] = useState(null);
  const b = barberia || BARBERIAS[0];

  const proceed = () => {
    if (selB && selS) { setBookingData({ barberia: b, barbero: selB, servicio: selS }); nav("booking"); }
  };

  const TABS = [
    { id: "barberos", label: "Barberos" },
    { id: "servicios", label: "Servicios" },
    { id: "galeria", label: "Galería 📸" },
  ];

  return (
    <div style={{ flex: 1, overflowY: "auto" }}>
      <div style={{ height: 110, background: "linear-gradient(135deg,#1A1A2E,#252545)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 44, position: "relative" }}>
        💈
        <div style={{ position: "absolute", top: 12, left: 14 }}><Back onBack={() => nav("explore")} /></div>
      </div>

      <div style={{ padding: "14px 16px" }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: C.text }}>{b.name}</h2>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span>⭐</span><span style={{ fontWeight: 700, color: C.text }}>{b.rating}</span>
              <span style={{ fontSize: 11, color: C.muted }}>({b.reviews})</span>
            </div>
          </div>
          <p style={{ fontSize: 12, color: C.muted, marginBottom: 8 }}>📍 {b.city} · {b.dist} · {b.hours}</p>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {b.specialties.map(sp => <Tag key={sp}>{sp}</Tag>)}
          </div>
        </div>

        <div style={{ display: "flex", borderBottom: `0.5px solid ${C.bdr}`, marginBottom: 16 }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ flex: 1, background: "transparent", border: "none", borderBottom: `2px solid ${tab === t.id ? C.gold : "transparent"}`, padding: "8px 4px", fontSize: 12, color: tab === t.id ? C.gold : C.muted, cursor: "pointer", fontFamily: "inherit", fontWeight: tab === t.id ? 700 : 400 }}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === "barberos" && b.barberos.map(br => (
          <div key={br.id} onClick={() => setSelB(br)} style={{ display: "flex", alignItems: "center", gap: 12, padding: 12, background: selB?.id === br.id ? "rgba(201,162,82,0.08)" : C.card, border: `0.5px solid ${selB?.id === br.id ? "rgba(201,162,82,0.4)" : C.bdr}`, borderRadius: 12, marginBottom: 10, cursor: "pointer" }}>
            <Avatar initials={br.initials} bg={br.bg} color={br.color} />
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{br.name}</p>
              <p style={{ fontSize: 11, color: C.muted }}>{br.role}</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: 12, color: C.gold, fontWeight: 700 }}>⭐ {br.rating}</p>
              <p style={{ fontSize: 10, color: C.muted }}>{br.slots} huecos hoy</p>
            </div>
            {selB?.id === br.id && <span style={{ color: C.gold, fontSize: 16 }}>✓</span>}
          </div>
        ))}

        {tab === "servicios" && (
          <div>
            {b.services.map(sv => (
              <div key={sv.id} onClick={() => setSelS(sv)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: selS?.id === sv.id ? "rgba(201,162,82,0.08)" : C.card, border: `0.5px solid ${selS?.id === sv.id ? "rgba(201,162,82,0.4)" : C.bdr}`, borderRadius: 12, marginBottom: 10, cursor: "pointer" }}>
                <span style={{ fontSize: 22 }}>{sv.icon}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{sv.name}</p>
                  <p style={{ fontSize: 11, color: C.muted }}>⏱ {sv.time} min</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: 16, fontWeight: 700, color: C.text }}>{sv.price}€</p>
                  <p style={{ fontSize: 10, color: C.green }}>Valle: {sv.vallePrice}€</p>
                </div>
                {selS?.id === sv.id && <span style={{ color: C.gold, fontSize: 16 }}>✓</span>}
              </div>
            ))}
            <div style={{ background: "rgba(74,222,128,0.05)", border: `0.5px solid rgba(74,222,128,0.2)`, borderRadius: 10, padding: "10px 12px", marginTop: 4, display: "flex", gap: 10, alignItems: "flex-start" }}>
              <span>⚡</span>
              <div>
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 3 }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: C.text }}>Tarifa valle</p>
                  <NewTag />
                </div>
                <p style={{ fontSize: 11, color: C.muted }}>Reserva lunes–jueves antes de las 12h y ahorra hasta un 25%</p>
              </div>
            </div>
          </div>
        )}

        {tab === "galeria" && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <p style={{ fontSize: 13, color: C.muted }}>Elige tu estilo antes de reservar</p>
              <NewTag />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
              {b.styles.map(st => (
                <div key={st.id} style={{ background: C.card2, borderRadius: 10, overflow: "hidden", cursor: "pointer" }}>
                  <div style={{ height: 70, background: "linear-gradient(135deg,#1A1A2E,#252545)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>{st.emoji}</div>
                  <div style={{ padding: "7px 8px" }}>
                    <p style={{ fontSize: 11, fontWeight: 600, color: C.text, marginBottom: 2 }}>{st.name}</p>
                    <p style={{ fontSize: 10, color: C.muted }}>❤️ {st.likes}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {(selB || selS) && (
        <div style={{ padding: "12px 16px", borderTop: `0.5px solid ${C.bdr}`, background: C.card }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            {selB && <p style={{ fontSize: 12, color: C.muted }}>✓ {selB.name}</p>}
            {selS && <p style={{ fontSize: 12, color: C.gold, fontWeight: 700 }}>{selS.price}€</p>}
          </div>
          <Btn onClick={proceed} style={{ opacity: selB && selS ? 1 : 0.4 }}>
            {selB && selS ? "Elegir horario →" : "Selecciona barbero y servicio"}
          </Btn>
        </div>
      )}
    </div>
  );
}

function BookingScreen({ bookingData, nav }) {
  const [selDay, setSelDay] = useState(21);
  const [selSlot, setSelSlot] = useState(null);
  const [isGroup, setIsGroup] = useState(false);
  const [groupSize, setGroupSize] = useState(1);

  const slot = SLOTS.find(s => s.t === selSlot);
  const isValle = slot?.valle;
  const price = bookingData?.servicio?.price || 20;
  const vallePrice = bookingData?.servicio?.vallePrice || 15;
  const finalPrice = isValle ? vallePrice : price;
  const total = finalPrice * (isGroup ? groupSize : 1);

  const calEmptyDays = 3;

  return (
    <div style={{ flex: 1, overflowY: "auto" }}>
      <div style={{ padding: "14px 16px 12px", borderBottom: `0.5px solid ${C.bdr}` }}>
        <Back onBack={() => nav("detail")} />
        <h2 style={{ fontSize: 18, fontWeight: 700, color: C.text, marginTop: 8 }}>Elegir horario</h2>
        {bookingData && <p style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{bookingData.barbero?.name} · {bookingData.servicio?.name}</p>}
      </div>

      <div style={{ padding: 16 }}>
        {/* Reserva grupal */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: C.card, border: `0.5px solid ${C.bdr}`, borderRadius: 12, padding: "12px 14px", marginBottom: 14 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: C.text }}>👥 Reserva grupal</p>
              <NewTag />
            </div>
            <p style={{ fontSize: 11, color: C.muted }}>Reserva para varios amigos a la vez</p>
          </div>
          <div onClick={() => setIsGroup(!isGroup)} style={{ width: 42, height: 24, background: isGroup ? C.gold : "rgba(255,255,255,0.1)", borderRadius: 12, position: "relative", cursor: "pointer" }}>
            <div style={{ position: "absolute", top: 3, left: isGroup ? 21 : 3, width: 18, height: 18, borderRadius: "50%", background: "white", transition: "left .2s" }}></div>
          </div>
        </div>

        {isGroup && (
          <div style={{ background: C.card, border: `0.5px solid rgba(201,162,82,0.3)`, borderRadius: 12, padding: "12px 14px", marginBottom: 14 }}>
            <p style={{ fontSize: 12, color: C.muted, marginBottom: 8 }}>Número de personas</p>
            <div style={{ display: "flex", gap: 8 }}>
              {[1, 2, 3, 4].map(n => (
                <button key={n} onClick={() => setGroupSize(n)} style={{ flex: 1, padding: "9px", background: groupSize === n ? C.gold : C.card2, color: groupSize === n ? "#09090F" : C.muted, border: `0.5px solid ${groupSize === n ? "transparent" : C.bdr}`, borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                  {n}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Calendario */}
        <p style={{ fontSize: 10, color: C.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>Mayo 2026</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 2, marginBottom: 4 }}>
          {["L", "M", "X", "J", "V", "S", "D"].map(d => (
            <div key={d} style={{ textAlign: "center", fontSize: 10, color: C.muted, padding: "4px 0" }}>{d}</div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 3, marginBottom: 20 }}>
          {Array.from({ length: calEmptyDays }).map((_, i) => <div key={"e" + i}></div>)}
          {Array.from({ length: 31 }).map((_, i) => {
            const d = i + 1, past = d < 21, sel = d === selDay;
            return (
              <div key={d} onClick={() => !past && setSelDay(d)} style={{ aspectRatio: "1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, borderRadius: "50%", background: sel ? C.gold : "transparent", color: sel ? "#09090F" : past ? "rgba(255,255,255,0.2)" : C.text, cursor: past ? "default" : "pointer", fontWeight: sel ? 700 : 400 }}>
                {d}
              </div>
            );
          })}
        </div>

        {/* Slots */}
        <p style={{ fontSize: 10, color: C.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>Horarios disponibles</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 14 }}>
          {SLOTS.map(sl => (
            <div key={sl.t} onClick={() => sl.ok && setSelSlot(sl.t)} style={{ padding: "10px 6px", borderRadius: 10, textAlign: "center", border: `0.5px solid ${!sl.ok ? "rgba(255,255,255,0.04)" : selSlot === sl.t ? "rgba(201,162,82,0.6)" : sl.valle ? "rgba(74,222,128,0.25)" : C.bdr}`, background: selSlot === sl.t ? "rgba(201,162,82,0.12)" : sl.valle && sl.ok ? "rgba(74,222,128,0.05)" : "transparent", cursor: sl.ok ? "pointer" : "not-allowed" }}>
              <p style={{ fontSize: 12, fontWeight: 500, color: !sl.ok ? "rgba(255,255,255,0.18)" : selSlot === sl.t ? C.gold : C.text }}>{sl.t}</p>
              {sl.valle && sl.ok && <p style={{ fontSize: 9, color: C.green, marginTop: 2 }}>⚡ Valle</p>}
              {!sl.ok && <p style={{ fontSize: 9, color: "rgba(255,255,255,0.15)", marginTop: 2 }}>Ocupado</p>}
            </div>
          ))}
        </div>

        <div style={{ background: "rgba(74,222,128,0.05)", border: `0.5px solid rgba(74,222,128,0.15)`, borderRadius: 10, padding: "10px 12px", marginBottom: 18, display: "flex", gap: 10, alignItems: "flex-start" }}>
          <span>⚡</span>
          <div>
            <p style={{ fontSize: 12, fontWeight: 700, color: C.green, marginBottom: 2 }}>Horas valle con descuento</p>
            <p style={{ fontSize: 11, color: C.muted }}>
              {isValle && selSlot ? `Ahorro activo: ${price - vallePrice}€ 🎉` : "Los slots verdes tienen precio reducido hasta las 12h"}
            </p>
          </div>
        </div>

        {/* Resumen precio */}
        {selSlot && (
          <div style={{ background: C.card, border: `0.5px solid ${C.bdr}`, borderRadius: 12, padding: "14px", marginBottom: 16 }}>
            <Row label={bookingData?.servicio?.name || "Servicio"} value={`${price}€`} />
            {isValle && <Row label="Descuento valle ⚡" value={`-${price - vallePrice}€`} valueColor={C.green} />}
            {isGroup && groupSize > 1 && <Row label={`× ${groupSize} personas`} value={`= ${finalPrice * groupSize}€`} />}
            <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 10, marginTop: 4 }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: C.text }}>Total</span>
              <span style={{ fontSize: 20, fontWeight: 800, color: C.gold }}>{total}€</span>
            </div>
          </div>
        )}

        <Btn onClick={() => selSlot && nav("confirmed")} style={{ opacity: selSlot ? 1 : 0.35 }}>
          {selSlot ? "Confirmar reserva →" : "Selecciona un horario"}
        </Btn>
      </div>
    </div>
  );
}

function ConfirmedScreen({ nav }) {
  const [showQR, setShowQR] = useState(false);
  if (showQR) return (
    <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
      <Back onBack={() => setShowQR(false)} />
      <div style={{ textAlign: "center", marginTop: 16 }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: C.text, marginBottom: 4 }}>Tu QR de entrada</h3>
        <p style={{ fontSize: 12, color: C.muted, marginBottom: 24 }}>Muéstralo al llegar · Sin espera en caja</p>
        <div style={{ background: C.card, border: `1px solid rgba(201,162,82,0.4)`, borderRadius: 20, padding: 20, display: "inline-block", marginBottom: 14 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(9,20px)", gap: 3 }}>
            {Array.from({ length: 81 }).map((_, i) => {
              const pattern = new Set([0, 1, 2, 3, 4, 5, 6, 14, 18, 24, 27, 28, 29, 30, 31, 32, 33, 40, 42, 44, 47, 48, 53, 54, 55, 56, 57, 58, 59, 62, 66, 72, 63, 64, 65, 70, 71, 72, 73, 74, 75, 76, 7, 16, 34, 43, 61, 69, 77, 9, 11, 13, 36, 38, 45, 51, 8, 15, 35, 47, 60, 68]);
              return <div key={i} style={{ width: 18, height: 18, background: pattern.has(i) ? C.text : "transparent", borderRadius: 2 }}></div>;
            })}
          </div>
        </div>
        <p style={{ fontSize: 11, color: C.muted, marginBottom: 20 }}>BKFRAGA-2026-JG-1130</p>
        <div style={{ background: "rgba(74,222,128,0.06)", border: `0.5px solid rgba(74,222,128,0.2)`, borderRadius: 12, padding: "12px 14px", textAlign: "left" }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: C.green, marginBottom: 3 }}>📱 Check-in instantáneo</p>
          <p style={{ fontSize: 11, color: C.muted }}>El barbero ve tu llegada al escanear y te avisa cuando es tu turno. Sin esperar en recepción.</p>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "24px 16px" }}>
      <div style={{ textAlign: "center", marginBottom: 22 }}>
        <div style={{ fontSize: 56, marginBottom: 12 }}>🎉</div>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: C.text, marginBottom: 6 }}>¡Reserva confirmada!</h2>
        <p style={{ fontSize: 13, color: C.muted }}>Te esperamos en BarberKing</p>
      </div>
      <div style={{ background: C.card, border: `0.5px solid ${C.bdr}`, borderRadius: 14, padding: 16, marginBottom: 14 }}>
        <Row label="📅 Fecha" value="Hoy, 21 de mayo" />
        <Row label="⏰ Hora" value="11:30h" />
        <Row label="✂️ Servicio" value="Corte + Barba" />
        <Row label="👤 Barbero" value="Carlos M." />
        <Row label="💰 Total" value="20€" valueColor={C.gold} />
      </div>
      <div style={{ background: "rgba(201,162,82,0.08)", border: `0.5px solid rgba(201,162,82,0.25)`, borderRadius: 12, padding: "12px 14px", marginBottom: 14, display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: 24 }}>⭐</span>
        <div>
          <p style={{ fontSize: 13, fontWeight: 700, color: C.gold }}>+40 puntos ganados</p>
          <p style={{ fontSize: 11, color: C.muted }}>Total: 1.280 pts · Nivel Oro</p>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <Btn onClick={() => setShowQR(true)}>📱 Ver QR Check-in</Btn>
        <Btn onClick={() => nav("home")} variant="secondary">Volver al inicio</Btn>
      </div>
    </div>
  );
}

function AppointmentsScreen({ nav }) {
  const upcoming = [
    { service: "Corte + Barba", barber: "Carlos M.", date: "Hoy 11:30h", price: 20, status: "confirmed" },
    { service: "Corte de pelo", barber: "Alejandro L.", date: "28 may · 16:00h", price: 12, status: "pending" },
  ];
  const history = [
    { service: "Corte + Barba", barber: "Carlos M.", date: "10 may", price: 20, pts: 40, rated: true },
    { service: "Navaja + Ritual", barber: "Marcos R.", date: "24 abr", price: 28, pts: 56, rated: false },
    { service: "Corte de pelo", barber: "Alejandro L.", date: "10 abr", price: 12, pts: 24, rated: true },
  ];
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: C.text, marginBottom: 16 }}>Mis citas</h2>
      <p style={{ fontSize: 10, color: C.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>Próximas</p>
      {upcoming.map((a, i) => (
        <div key={i} style={{ background: C.card, border: `0.5px solid ${a.status === "confirmed" ? "rgba(74,222,128,0.2)" : C.bdr}`, borderRadius: 14, padding: 14, marginBottom: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{a.service}</p>
            <Tag color={a.status === "confirmed" ? "#09090F" : C.gold} bg={a.status === "confirmed" ? C.green : "rgba(201,162,82,0.12)"}>
              {a.status === "confirmed" ? "Confirmada" : "Pendiente"}
            </Tag>
          </div>
          <p style={{ fontSize: 12, color: C.muted, marginBottom: 10 }}>📅 {a.date} · 👤 {a.barber} · 💰 {a.price}€</p>
          <div style={{ display: "flex", gap: 8 }}>
            {a.status === "confirmed" && (
              <button onClick={() => nav("confirmed")} style={{ flex: 1, background: "rgba(201,162,82,0.1)", border: `0.5px solid rgba(201,162,82,0.3)`, borderRadius: 8, padding: "7px", fontSize: 11, color: C.gold, cursor: "pointer", fontFamily: "inherit", fontWeight: 700 }}>
                📱 QR Check-in
              </button>
            )}
            <button style={{ flex: 1, background: "transparent", border: `0.5px solid ${C.bdr}`, borderRadius: 8, padding: "7px", fontSize: 11, color: C.muted, cursor: "pointer", fontFamily: "inherit" }}>
              Cancelar
            </button>
          </div>
        </div>
      ))}
      <p style={{ fontSize: 10, color: C.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", margin: "16px 0 10px" }}>Historial</p>
      {history.map((a, i) => (
        <div key={i} style={{ background: C.card, border: `0.5px solid ${C.bdr}`, borderRadius: 14, padding: 14, marginBottom: 10, opacity: 0.85 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 5 }}>
            <p style={{ fontSize: 13, fontWeight: 500, color: C.text }}>{a.service}</p>
            <span style={{ fontSize: 11, color: C.gold, fontWeight: 700 }}>+{a.pts} pts</span>
          </div>
          <p style={{ fontSize: 11, color: C.muted, marginBottom: a.rated ? 0 : 8 }}>📅 {a.date} · 👤 {a.barber} · 💰 {a.price}€</p>
          {!a.rated && (
            <div style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(201,162,82,0.06)", border: `0.5px solid rgba(201,162,82,0.2)`, borderRadius: 8, padding: "8px 10px", marginTop: 8 }}>
              <span>📸</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 11, color: C.gold, fontWeight: 700 }}>¿Qué tal el resultado?</p>
                <p style={{ fontSize: 10, color: C.muted }}>Sube una foto y gana 20 pts extra</p>
              </div>
              <NewTag />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function LoyaltyScreen() {
  const [tab, setTab] = useState("rewards");
  return (
    <div style={{ flex: 1, overflowY: "auto" }}>
      <div style={{ background: "linear-gradient(135deg,#1E1830,#2A1F42)", padding: "22px 20px 26px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -30, right: -30, width: 150, height: 150, borderRadius: "50%", background: "rgba(201,162,82,0.05)" }}></div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
          <div>
            <p style={{ fontSize: 10, color: "rgba(201,162,82,0.6)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 5 }}>Nivel Oro</p>
            <p style={{ fontSize: 36, fontWeight: 800, color: C.gold, lineHeight: 1 }}>1.240</p>
            <p style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>puntos acumulados</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: 11, color: C.muted }}>Próximo nivel</p>
            <p style={{ fontSize: 15, fontWeight: 700, color: C.text }}>💎 Platino</p>
            <p style={{ fontSize: 11, color: C.muted }}>260 pts más</p>
          </div>
        </div>
        <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: 10, height: 8, overflow: "hidden" }}>
          <div style={{ width: "72%", height: "100%", background: `linear-gradient(90deg,${C.gold},${C.goldL})`, borderRadius: 10 }}></div>
        </div>
        <p style={{ fontSize: 10, color: C.muted, marginTop: 5 }}>72% hacia Platino</p>
      </div>

      <div style={{ padding: 16 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 16 }}>
          {[{ l: "Visitas", v: "31" }, { l: "Pts ganados", v: "1.540" }, { l: "Pts canjeados", v: "300" }].map(s => (
            <div key={s.l} style={{ background: C.card, borderRadius: 10, padding: "12px 10px", textAlign: "center" }}>
              <p style={{ fontSize: 18, fontWeight: 800, color: C.text, marginBottom: 2 }}>{s.v}</p>
              <p style={{ fontSize: 10, color: C.muted }}>{s.l}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", borderBottom: `0.5px solid ${C.bdr}`, marginBottom: 14 }}>
          {[{ id: "rewards", l: "Recompensas" }, { id: "history", l: "Historial" }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ flex: 1, background: "transparent", border: "none", borderBottom: `2px solid ${tab === t.id ? C.gold : "transparent"}`, padding: "8px", fontSize: 12, color: tab === t.id ? C.gold : C.muted, cursor: "pointer", fontFamily: "inherit", fontWeight: tab === t.id ? 700 : 400 }}>
              {t.l}
            </button>
          ))}
        </div>

        {tab === "rewards" && REWARDS.map(r => (
          <div key={r.id} style={{ display: "flex", alignItems: "center", gap: 12, background: C.card, border: `0.5px solid ${C.bdr}`, borderRadius: 12, padding: "12px 14px", marginBottom: 10 }}>
            <span style={{ fontSize: 28 }}>{r.icon}</span>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{r.name}</p>
              <p style={{ fontSize: 11, color: C.gold }}>{r.pts} puntos</p>
            </div>
            <button style={{ background: 1240 >= r.pts ? C.gold : "transparent", border: `0.5px solid ${1240 >= r.pts ? "transparent" : C.bdr}`, borderRadius: 8, padding: "7px 12px", fontSize: 11, color: 1240 >= r.pts ? "#09090F" : C.muted, cursor: "pointer", fontFamily: "inherit", fontWeight: 700 }}>
              {1240 >= r.pts ? "Canjear" : `Faltan ${r.pts - 1240}`}
            </button>
          </div>
        ))}

        {tab === "history" && [
          { d: "Hoy", desc: "Reserva confirmada · BarberKing", pts: "+40", c: C.gold },
          { d: "10 may", desc: "Corte + Barba · Carlos M.", pts: "+40", c: C.gold },
          { d: "24 abr", desc: "Navaja + Ritual · Marcos R.", pts: "+56", c: C.gold },
          { d: "12 abr", desc: "Canje: 10% descuento", pts: "-200", c: C.red },
          { d: "1 abr", desc: "Corte de pelo · Alejandro L.", pts: "+24", c: C.gold },
          { d: "15 mar", desc: "Bono doble (mes de aniversario)", pts: "+100", c: C.goldL },
        ].map((h, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: `0.5px solid ${C.bdr}` }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: h.c, flexShrink: 0 }}></div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 12, color: C.text }}>{h.desc}</p>
              <p style={{ fontSize: 10, color: C.muted }}>{h.d}</p>
            </div>
            <p style={{ fontSize: 13, fontWeight: 700, color: h.c }}>{h.pts}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function PlansScreen({ nav }) {
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
      <Back onBack={() => nav("home")} />
      <div style={{ marginTop: 14, marginBottom: 22, textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: C.text }}>Suscripciones</h2>
          <NewTag />
        </div>
        <p style={{ fontSize: 13, color: C.muted }}>Cortes mensuales al mejor precio</p>
      </div>
      {PLANS.map(p => (
        <div key={p.id} style={{ background: p.color, border: `${p.popular ? "1.5px" : "0.5px"} solid ${p.border}`, borderRadius: 18, padding: "18px", marginBottom: 14, position: "relative" }}>
          {p.popular && <div style={{ position: "absolute", top: -11, left: "50%", transform: "translateX(-50%)", background: C.gold, color: "#09090F", fontSize: 10, fontWeight: 800, padding: "3px 14px", borderRadius: 20, whiteSpace: "nowrap" }}>⭐ MÁS POPULAR</div>}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
            <div>
              <p style={{ fontSize: 17, fontWeight: 800, color: C.text }}>{p.name}</p>
              <p style={{ fontSize: 11, color: C.muted }}>{p.cuts} {p.cuts === 1 ? "corte" : "cortes"} al mes</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: 26, fontWeight: 800, color: p.popular ? C.gold : C.text }}>{p.price}€</p>
              <p style={{ fontSize: 10, color: C.muted }}>/mes</p>
            </div>
          </div>
          {p.perks.map(pk => (
            <div key={pk} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
              <span style={{ fontSize: 12, color: p.popular ? C.gold : C.green }}>✓</span>
              <p style={{ fontSize: 12, color: C.muted }}>{pk}</p>
            </div>
          ))}
          <button style={{ marginTop: 14, width: "100%", background: p.popular ? C.gold : "transparent", border: `0.5px solid ${p.popular ? "transparent" : C.bdr}`, borderRadius: 10, padding: "12px", fontSize: 13, color: p.popular ? "#09090F" : C.muted, cursor: "pointer", fontFamily: "inherit", fontWeight: 700 }}>
            {p.popular ? "Activar Plan Pro →" : "Elegir este plan"}
          </button>
        </div>
      ))}
    </div>
  );
}

function BusinessScreen({ setMode }) {
  const [tab, setTab] = useState("hoy");
  const agenda = [
    { time: "09:30", client: "Miguel A.", service: "Fade clásico", barber: "Carlos", price: 15, status: "done" },
    { time: "10:00", client: "Roberto P.", service: "Corte + Barba", barber: "Carlos", price: 20, status: "done" },
    { time: "10:30", client: "Javier G.", service: "Corte + Barba", barber: "Alejandro", price: 20, status: "now" },
    { time: "11:00", client: "Pedro M.", service: "Navaja + Ritual", barber: "Marcos", price: 28, status: "confirmed" },
    { time: "11:30", client: "Luis F.", service: "Corte de pelo", barber: "Carlos", price: 12, status: "confirmed" },
    { time: "12:00", client: "— Hueco libre —", service: "", barber: "", price: 0, status: "free" },
    { time: "16:00", client: "Antonio R.", service: "Arreglo de barba", barber: "Alejandro", price: 10, status: "confirmed" },
  ];
  const statusDot = { done: C.green, now: C.gold, confirmed: C.blue, free: "rgba(255,255,255,0.1)" };

  return (
    <div style={{ flex: 1, overflowY: "auto" }}>
      <div style={{ background: "#0A0A14", padding: "14px 16px 12px", borderBottom: `0.5px solid ${C.bdr}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <p style={{ fontSize: 10, color: C.muted, marginBottom: 2 }}>Panel de negocio</p>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: C.text }}>BarberKing · Fraga</h2>
        </div>
        <button onClick={() => setMode("client")} style={{ background: "rgba(255,255,255,0.05)", border: `0.5px solid ${C.bdr}`, borderRadius: 8, padding: "7px 12px", fontSize: 11, color: C.muted, cursor: "pointer", fontFamily: "inherit" }}>
          👤 Modo cliente
        </button>
      </div>

      <div style={{ padding: 16 }}>
        {/* KPIs */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
          {[
            { l: "Ingresos hoy", v: "248€", delta: "+12% vs ayer", c: C.green },
            { l: "Citas hoy", v: "12", delta: "8 completadas", c: C.gold },
            { l: "Ocupación", v: "84%", delta: "+6% esta semana", c: C.green },
            { l: "Clientes nuevos", v: "3", delta: "Este mes: 28", c: C.blue },
          ].map(k => (
            <div key={k.l} style={{ background: C.card, border: `0.5px solid ${C.bdr}`, borderRadius: 12, padding: "12px 14px" }}>
              <p style={{ fontSize: 11, color: C.muted, marginBottom: 6 }}>{k.l}</p>
              <p style={{ fontSize: 22, fontWeight: 800, color: C.text, marginBottom: 2 }}>{k.v}</p>
              <p style={{ fontSize: 10, color: k.c }}>{k.delta}</p>
            </div>
          ))}
        </div>

        {/* Gráfico */}
        <div style={{ background: C.card, border: `0.5px solid ${C.bdr}`, borderRadius: 14, padding: "14px 14px 8px", marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: C.text }}>Ingresos 2026</p>
            <Tag>+28% anual</Tag>
          </div>
          <ResponsiveContainer width="100%" height={110}>
            <AreaChart data={REVENUE} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="grd" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={C.gold} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={C.gold} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="m" tick={{ fill: C.muted, fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: C.card2, border: `0.5px solid ${C.bdr}`, borderRadius: 8, fontSize: 12, color: C.text }} formatter={v => [`${v}€`, "Ingresos"]} />
              <Area type="monotone" dataKey="v" stroke={C.gold} strokeWidth={2} fill="url(#grd)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* IA Insight */}
        <div style={{ background: "linear-gradient(135deg,#0D1A0D,#111E11)", border: `0.5px solid rgba(74,222,128,0.2)`, borderRadius: 12, padding: "12px 14px", marginBottom: 16 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <span style={{ fontSize: 20 }}>🤖</span>
            <div>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: C.green }}>Insight IA</p>
                <NewTag />
              </div>
              <p style={{ fontSize: 11, color: C.muted, lineHeight: 1.6, marginBottom: 6 }}>Los jueves 10:00–12:00h tienes un 40% de huecos libres. Activa descuento valle automático para esa franja y podrías ganar +180€/mes.</p>
              <button style={{ background: "transparent", border: "none", color: C.green, fontSize: 11, cursor: "pointer", fontFamily: "inherit", fontWeight: 700, padding: 0 }}>Activar descuento automático →</button>
            </div>
          </div>
        </div>

        {/* Tabs agenda */}
        <div style={{ display: "flex", borderBottom: `0.5px solid ${C.bdr}`, marginBottom: 14 }}>
          {[{ id: "hoy", l: "Agenda hoy" }, { id: "equipo", l: "Equipo" }, { id: "clientes", l: "Clientes" }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ flex: 1, background: "transparent", border: "none", borderBottom: `2px solid ${tab === t.id ? C.gold : "transparent"}`, padding: "8px", fontSize: 12, color: tab === t.id ? C.gold : C.muted, cursor: "pointer", fontFamily: "inherit", fontWeight: tab === t.id ? 700 : 400 }}>
              {t.l}
            </button>
          ))}
        </div>

        {tab === "hoy" && agenda.map((a, i) => (
          <div key={i} style={{ display: "flex", gap: 12, alignItems: "center", padding: "10px 0", borderBottom: `0.5px solid ${C.bdr}` }}>
            <p style={{ fontSize: 11, color: C.muted, width: 36, flexShrink: 0, fontWeight: 500 }}>{a.time}</p>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: statusDot[a.status], flexShrink: 0 }}></div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 12, fontWeight: a.status === "free" ? 400 : 600, color: a.status === "free" ? C.muted : C.text }}>{a.client}</p>
              {a.service && <p style={{ fontSize: 10, color: C.muted }}>{a.service}{a.barber ? ` · ${a.barber}` : ""}</p>}
            </div>
            {a.price > 0 && <p style={{ fontSize: 12, fontWeight: 600, color: a.status === "done" ? C.green : C.muted }}>{a.price}€</p>}
          </div>
        ))}

        {tab === "equipo" && [
          { name: "Carlos M.", initials: "CM", bg: "#1E2A4A", color: C.blue, citas: 8, rating: 5.0, ing: "156€" },
          { name: "Alejandro L.", initials: "AL", bg: "#1A2E1A", color: C.green, citas: 5, rating: 4.8, ing: "100€" },
          { name: "Marcos R.", initials: "MR", bg: "#2A1A2A", color: "#C084FC", citas: 7, rating: 4.7, ing: "120€" },
        ].map(e => (
          <div key={e.name} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px", background: C.card, border: `0.5px solid ${C.bdr}`, borderRadius: 12, marginBottom: 10 }}>
            <Avatar initials={e.initials} bg={e.bg} color={e.color} />
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{e.name}</p>
              <p style={{ fontSize: 10, color: C.muted }}>{e.citas} citas hoy · ⭐ {e.rating}</p>
            </div>
            <p style={{ fontSize: 14, fontWeight: 700, color: C.gold }}>{e.ing}</p>
          </div>
        ))}

        {tab === "clientes" && [
          { name: "Miguel A.", visits: 12, last: "Hoy", spend: "240€", loyal: true },
          { name: "Roberto P.", visits: 8, last: "Ayer", spend: "160€", loyal: false },
          { name: "Javier G.", visits: 31, last: "10 min", spend: "620€", loyal: true },
          { name: "Pedro M.", visits: 5, last: "2 semanas", spend: "100€", loyal: false },
          { name: "Luis F.", visits: 15, last: "1 semana", spend: "300€", loyal: true },
        ].map(cl => (
          <div key={cl.name} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: `0.5px solid ${C.bdr}` }}>
            <Avatar initials={cl.name.split(" ").map(n => n[0]).join("")} size={32} bg={C.card2} color={C.muted} />
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: C.text }}>{cl.name}</p>
                {cl.loyal && <Tag>Fiel</Tag>}
              </div>
              <p style={{ fontSize: 10, color: C.muted }}>{cl.visits} visitas · último: {cl.last}</p>
            </div>
            <p style={{ fontSize: 12, fontWeight: 600, color: C.gold }}>{cl.spend}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────

const NAV = [
  { id: "home", icon: "🏠", label: "Inicio" },
  { id: "explore", icon: "🔍", label: "Explorar" },
  { id: "appointments", icon: "📅", label: "Citas" },
  { id: "loyalty", icon: "⭐", label: "Puntos" },
  { id: "profile", icon: "👤", label: "Perfil" },
];

const NO_NAV = ["detail", "booking", "confirmed", "plans"];

export default function App() {
  const [view, setView] = useState("home");
  const [mode, setMode] = useState("client");
  const [selectedBarberia, setSelectedBarberia] = useState(null);
  const [bookingData, setBookingData] = useState(null);

  const nav = (v) => setView(v);
  const phone = { maxWidth: 390, margin: "0 auto", height: "100vh", display: "flex", flexDirection: "column", background: C.bg, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", color: C.text, overflow: "hidden" };

  if (mode === "business") return (
    <div style={phone}>
      <BusinessScreen setMode={setMode} />
    </div>
  );

  return (
    <div style={phone}>
      {/* Status bar */}
      <div style={{ background: C.bg, padding: "8px 16px 0", display: "flex", justifyContent: "space-between", flexShrink: 0 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: C.text }}>9:41</span>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <span style={{ fontSize: 10, color: C.text }}>●●●●</span>
          <span style={{ fontSize: 10, color: C.text }}>WiFi</span>
          <span style={{ fontSize: 10, color: C.text }}>🔋</span>
        </div>
      </div>

      {/* Screen */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {view === "home" && <HomeScreen nav={nav} setSelectedBarberia={setSelectedBarberia} />}
        {view === "explore" && <ExploreScreen nav={nav} setSelectedBarberia={setSelectedBarberia} />}
        {view === "detail" && <DetailScreen barberia={selectedBarberia || BARBERIAS[0]} nav={nav} setBookingData={setBookingData} />}
        {view === "booking" && <BookingScreen bookingData={bookingData} nav={nav} />}
        {view === "confirmed" && <ConfirmedScreen nav={nav} />}
        {view === "appointments" && <AppointmentsScreen nav={nav} />}
        {view === "loyalty" && <LoyaltyScreen />}
        {view === "plans" && <PlansScreen nav={nav} />}
        {view === "profile" && (
          <div style={{ flex: 1, padding: 16, overflowY: "auto" }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: C.text, marginBottom: 20 }}>Perfil</h2>
            <div style={{ display: "flex", alignItems: "center", gap: 14, background: C.card, border: `0.5px solid ${C.bdr}`, borderRadius: 16, padding: 16, marginBottom: 20 }}>
              <Avatar initials="JG" size={52} bg="#1E2A3A" color={C.gold} />
              <div>
                <p style={{ fontSize: 16, fontWeight: 700, color: C.text }}>Javier García</p>
                <p style={{ fontSize: 12, color: C.muted }}>javier@email.com</p>
                <p style={{ fontSize: 11, color: C.gold, marginTop: 3 }}>⭐ Nivel Oro · 1.240 pts</p>
              </div>
            </div>
            <div style={{ background: C.card, border: `0.5px solid ${C.bdr}`, borderRadius: 14, overflow: "hidden", marginBottom: 16 }}>
              {["Mis suscripciones", "Métodos de pago", "Notificaciones", "Privacidad", "Ayuda"].map((item, i, arr) => (
                <div key={item} onClick={item === "Mis suscripciones" ? () => nav("plans") : undefined} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: i < arr.length - 1 ? `0.5px solid ${C.bdr}` : "none", cursor: "pointer" }}>
                  <p style={{ fontSize: 13, color: C.text }}>{item}</p>
                  <span style={{ color: C.muted, fontSize: 14 }}>›</span>
                </div>
              ))}
            </div>
            <div style={{ background: "rgba(201,162,82,0.06)", border: `0.5px solid rgba(201,162,82,0.25)`, borderRadius: 14, padding: 16, marginBottom: 14 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: C.gold, marginBottom: 6 }}>🏪 ¿Tienes una barbería?</p>
              <p style={{ fontSize: 12, color: C.muted, marginBottom: 12 }}>Activa el modo negocio para gestionar tu agenda, equipo y estadísticas.</p>
              <Btn onClick={() => setMode("business")}>Ver panel de negocio →</Btn>
            </div>
          </div>
        )}
      </div>

      {/* Bottom nav */}
      {!NO_NAV.includes(view) && (
        <div style={{ display: "flex", borderTop: `0.5px solid ${C.bdr}`, background: C.card, flexShrink: 0 }}>
          {NAV.map(n => (
            <button key={n.id} onClick={() => nav(n.id)} style={{ flex: 1, background: "transparent", border: "none", padding: "8px 4px 10px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, fontFamily: "inherit" }}>
              <span style={{ fontSize: 20 }}>{n.icon}</span>
              <span style={{ fontSize: 9, color: view === n.id ? C.gold : C.muted, fontWeight: view === n.id ? 700 : 400 }}>{n.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
