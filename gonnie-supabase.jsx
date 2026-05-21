const { useState, useEffect, useCallback } = React;
const { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } = Recharts;

// ─── SUPABASE CONFIG ──────────────────────────────────────────────────────────
const SUPABASE_URL = "https://fnjqzcnufkhrfzxfallj.supabase.co";
const SUPABASE_KEY = "sb_publishable_PHk3rHljiDKOQ5ByIoME0Q_jPa2Ldd-";

const DB_HEADERS = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  "Content-Type": "application/json",
  Prefer: "return=representation",
};

async function dbGet(table, query = "") {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}${query}`, { headers: DB_HEADERS });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

async function dbInsert(table, data) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: "POST", headers: DB_HEADERS, body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// ─── BRAND ────────────────────────────────────────────────────────────────────
const G = {
  brand: "#00C896", brandD: "#009E78", brandL: "#33DFB0",
  bg: "#080B0F", card: "#0F1419", card2: "#161D25",
  text: "#EEF2F7", muted: "#6B7A8D",
  bdr: "rgba(255,255,255,0.06)",
  green: "#34D399", red: "#F87171", blue: "#60A5FA", gold: "#F59E0B",
};

// ─── UI HELPERS ───────────────────────────────────────────────────────────────
const Av = ({ txt, size = 38, bg = "#1A2535", color = G.brand }) => (
  <div style={{ width: size, height: size, borderRadius: "50%", background: bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.34, fontWeight: 700, color, flexShrink: 0 }}>{txt}</div>
);

const Pill = ({ children, color = G.brand, bg }) => (
  <span style={{ background: bg || `${color}18`, color, fontSize: 10, fontWeight: 700, padding: "2px 9px", borderRadius: 20, letterSpacing: "0.04em", whiteSpace: "nowrap" }}>{children}</span>
);

const NewPill = () => <Pill color="#080B0F" bg={G.brand}>NUEVO</Pill>;

const PrimaryBtn = ({ onClick, children, disabled, style = {} }) => (
  <button onClick={disabled ? undefined : onClick} style={{ background: disabled ? `${G.brand}40` : G.brand, color: disabled ? "rgba(255,255,255,0.3)" : "#080B0F", border: "none", borderRadius: 14, padding: "13px 20px", fontSize: 14, fontWeight: 800, cursor: disabled ? "not-allowed" : "pointer", width: "100%", fontFamily: "inherit", ...style }}>
    {children}
  </button>
);

const GhostBtn = ({ onClick, children }) => (
  <button onClick={onClick} style={{ background: "transparent", border: `0.5px solid ${G.bdr}`, borderRadius: 14, padding: "12px 20px", fontSize: 13, fontWeight: 500, cursor: "pointer", width: "100%", fontFamily: "inherit", color: G.muted }}>
    {children}
  </button>
);

const Back = ({ onBack }) => (
  <button onClick={onBack} style={{ background: `${G.brand}15`, border: "none", borderRadius: 10, padding: "6px 12px", fontSize: 12, color: G.brand, cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}>
    ← Volver
  </button>
);

const SLabel = ({ children }) => (
  <p style={{ fontSize: 10, color: G.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 10 }}>{children}</p>
);

const Skeleton = ({ h = 60, r = 14 }) => (
  <div style={{ height: h, borderRadius: r, background: G.card, border: `0.5px solid ${G.bdr}`, marginBottom: 12, opacity: 0.6 }} />
);

const GonnieLogo = ({ size = 26 }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
    <div style={{ width: size, height: size, borderRadius: size * 0.3, background: G.brand, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.55 }}>✂</div>
    <span style={{ fontSize: size * 0.75, fontWeight: 900, color: G.text, letterSpacing: "-0.02em" }}>gonnie</span>
  </div>
);

// ─── BARBERO COLORS ───────────────────────────────────────────────────────────
const BARBER_COLORS = [
  { bg: "#1A2535", color: G.blue },
  { bg: "#1A2520", color: G.green },
  { bg: "#251A25", color: "#C084FC" },
  { bg: "#2A1A1A", color: "#FB923C" },
];

// ─── SPLASH ───────────────────────────────────────────────────────────────────
function SplashScreen({ onDone }) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "32px 28px" }}>
      <div style={{ marginBottom: 36 }}>
        <div style={{ width: 84, height: 84, borderRadius: 26, background: G.brand, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, marginBottom: 18, marginLeft: "auto", marginRight: "auto" }}>✂</div>
        <h1 style={{ fontSize: 44, fontWeight: 900, color: G.text, textAlign: "center", letterSpacing: "-0.04em", marginBottom: 6 }}>gonnie</h1>
        <p style={{ fontSize: 14, color: G.muted, textAlign: "center" }}>Tu barbería, en tu bolsillo</p>
      </div>
      <div style={{ width: "100%", marginBottom: 28 }}>
        {[
          { icon: "⚡", label: "Reserva en menos de 30 segundos" },
          { icon: "🏆", label: "Acumula puntos con cada visita" },
          { icon: "🤖", label: "Tu barbero ideal sugerido por IA" },
        ].map((f, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderBottom: i < 2 ? `0.5px solid ${G.bdr}` : "none" }}>
            <div style={{ width: 38, height: 38, borderRadius: 11, background: `${G.brand}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{f.icon}</div>
            <p style={{ fontSize: 13, color: G.text, fontWeight: 500 }}>{f.label}</p>
          </div>
        ))}
      </div>
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 10 }}>
        <PrimaryBtn onClick={onDone}>Empezar →</PrimaryBtn>
        <p style={{ fontSize: 11, color: G.muted, textAlign: "center" }}>Gratis para clientes · Barberías desde 29€/mes</p>
      </div>
    </div>
  );
}

// ─── HOME ─────────────────────────────────────────────────────────────────────
function HomeScreen({ nav }) {
  return (
    <div style={{ flex: 1, overflowY: "auto" }}>
      <div style={{ padding: "16px 18px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div><GonnieLogo /><p style={{ fontSize: 11, color: G.muted, marginTop: 4 }}>Buenas 👋 Javier</p></div>
        <div style={{ position: "relative" }}>
          <div style={{ width: 38, height: 38, borderRadius: "50%", background: G.card, border: `0.5px solid ${G.bdr}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🔔</div>
          <div style={{ position: "absolute", top: 2, right: 2, width: 9, height: 9, borderRadius: "50%", background: G.brand, border: `2px solid ${G.bg}` }} />
        </div>
      </div>

      <div style={{ padding: "0 18px" }}>
        {/* Puntos */}
        <div onClick={() => nav("loyalty")} style={{ background: "linear-gradient(135deg,#091A14,#0A1F18)", border: `1px solid ${G.brand}30`, borderRadius: 20, padding: "18px 20px", marginBottom: 16, cursor: "pointer", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: `${G.brand}07` }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
            <div>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
                <p style={{ fontSize: 10, color: `${G.brand}90`, letterSpacing: "0.08em", textTransform: "uppercase" }}>Gonnie Points</p>
                <NewPill />
              </div>
              <p style={{ fontSize: 38, fontWeight: 900, color: G.brand, lineHeight: 1, letterSpacing: "-0.03em" }}>1.240</p>
              <p style={{ fontSize: 11, color: G.muted, marginTop: 4 }}>Nivel Oro · 260 pts para Platino</p>
            </div>
            <div style={{ background: `${G.brand}15`, border: `0.5px solid ${G.brand}30`, borderRadius: 14, padding: "10px 12px", textAlign: "center" }}>
              <p style={{ fontSize: 22, marginBottom: 2 }}>🏆</p>
              <p style={{ fontSize: 9, fontWeight: 800, color: G.brand, letterSpacing: "0.04em" }}>ORO</p>
            </div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 8, height: 5, overflow: "hidden" }}>
            <div style={{ width: "72%", height: "100%", background: `linear-gradient(90deg,${G.brand},${G.brandL})`, borderRadius: 8 }} />
          </div>
        </div>

        {/* Próxima cita */}
        <div style={{ background: G.card, border: `0.5px solid ${G.green}30`, borderRadius: 18, padding: "14px 16px", marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <p style={{ fontSize: 10, color: G.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>Próxima cita</p>
            <Pill color="#080B0F" bg={G.green}>Hoy 11:30h</Pill>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Av txt="CM" size={42} bg="#1A2535" color={G.blue} />
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 15, fontWeight: 700, color: G.text }}>Corte + Barba</p>
              <p style={{ fontSize: 12, color: G.muted }}>Carlos M. · BarberKing</p>
            </div>
            <button onClick={() => nav("confirmed")} style={{ background: `${G.brand}15`, border: `0.5px solid ${G.brand}40`, borderRadius: 10, padding: "8px 12px", fontSize: 11, color: G.brand, cursor: "pointer", fontFamily: "inherit", fontWeight: 700 }}>
              📱 QR
            </button>
          </div>
        </div>

        {/* Acciones */}
        <SLabel>Acciones rápidas</SLabel>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 18 }}>
          {[
            { icon: "✂️", label: "Reservar cita", action: () => nav("explore") },
            { icon: "👥", label: "Reserva grupal", action: () => nav("explore"), isNew: true },
            { icon: "📦", label: "Suscripciones", action: () => nav("plans"), isNew: true },
            { icon: "💬", label: "Chat barbería", action: () => {}, isNew: true },
          ].map((a, i) => (
            <div key={i} onClick={a.action} style={{ background: G.card, border: `0.5px solid ${G.bdr}`, borderRadius: 16, padding: "14px 14px 12px", cursor: "pointer", position: "relative" }}>
              {a.isNew && <div style={{ position: "absolute", top: 10, right: 10 }}><NewPill /></div>}
              <span style={{ fontSize: 26, display: "block", marginBottom: 8 }}>{a.icon}</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: G.text }}>{a.label}</span>
            </div>
          ))}
        </div>

        {/* IA */}
        <div style={{ background: "linear-gradient(135deg,#091A14,#0C1F17)", border: `0.5px solid ${G.brand}25`, borderRadius: 18, padding: "16px", marginBottom: 24 }}>
          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ width: 38, height: 38, borderRadius: 12, background: `${G.brand}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>🤖</div>
            <div>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: G.text }}>Sugerencia IA</p>
                <NewPill />
              </div>
              <p style={{ fontSize: 12, color: G.muted, lineHeight: 1.65 }}>
                Basándome en tu historial, Carlos M. es tu mejor match esta semana. Mañana a las 10:00 hay tarifa valle —{" "}
                <span style={{ color: G.brand, fontWeight: 600 }}>ahorras 5€</span>.
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

// ─── EXPLORE — carga datos reales de Supabase ─────────────────────────────────
function ExploreScreen({ nav, setBarberia }) {
  const [barberias, setBarberias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("Todos");
  const tags = ["Todos", "Fade", "Barba", "Navaja", "Clásico"];

  useEffect(() => {
    dbGet("barberias", "?select=*&order=rating.desc")
      .then(data => { setBarberias(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(e => { setError(e.message); setLoading(false); });
  }, []);

  const list = barberias.filter(b =>
    (filter === "Todos" || (b.specialties || []).includes(filter)) &&
    b.name.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "16px 18px" }}>
      <h2 style={{ fontSize: 22, fontWeight: 900, color: G.text, marginBottom: 14, letterSpacing: "-0.02em" }}>Explorar</h2>

      <div style={{ background: G.card, border: `0.5px solid ${G.bdr}`, borderRadius: 14, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <span style={{ color: G.muted }}>🔍</span>
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Buscar barberías..." style={{ background: "transparent", border: "none", outline: "none", color: G.text, fontSize: 13, flex: 1, fontFamily: "inherit" }} />
      </div>

      <div style={{ display: "flex", gap: 8, overflowX: "auto", marginBottom: 18, paddingBottom: 2 }}>
        {tags.map(t => (
          <button key={t} onClick={() => setFilter(t)} style={{ flexShrink: 0, background: filter === t ? G.brand : G.card, color: filter === t ? "#080B0F" : G.muted, border: `0.5px solid ${filter === t ? "transparent" : G.bdr}`, borderRadius: 20, padding: "6px 16px", fontSize: 12, cursor: "pointer", fontWeight: filter === t ? 800 : 400, fontFamily: "inherit" }}>
            {t}
          </button>
        ))}
      </div>

      {loading && [1, 2, 3].map(i => <Skeleton key={i} h={140} />)}

      {error && (
        <div style={{ background: `${G.red}10`, border: `0.5px solid ${G.red}30`, borderRadius: 14, padding: 16, marginBottom: 12 }}>
          <p style={{ fontSize: 13, color: G.red, fontWeight: 700, marginBottom: 4 }}>Error al cargar</p>
          <p style={{ fontSize: 11, color: G.muted }}>{error}</p>
        </div>
      )}

      {!loading && list.map((b, idx) => (
        <div key={b.id} onClick={() => { setBarberia(b); nav("detail"); }} style={{ background: G.card, border: `0.5px solid ${G.bdr}`, borderRadius: 18, marginBottom: 12, overflow: "hidden", cursor: "pointer" }}>
          <div style={{ height: 90, background: `linear-gradient(135deg,#0D1A15,#111F1A)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, position: "relative" }}>
            💈
            <div style={{ position: "absolute", top: 10, right: 10 }}>
              <Pill color={b.is_open ? "#080B0F" : G.red} bg={b.is_open ? G.green : `${G.red}18`}>{b.is_open ? "Abierto" : "Cerrado"}</Pill>
            </div>
          </div>
          <div style={{ padding: "12px 14px 14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
              <p style={{ fontSize: 15, fontWeight: 800, color: G.text }}>{b.name}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ fontSize: 11 }}>⭐</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: G.text }}>{b.rating}</span>
                <span style={{ fontSize: 11, color: G.muted }}>({b.reviews_count})</span>
              </div>
            </div>
            <p style={{ fontSize: 11, color: G.muted, marginBottom: 8 }}>📍 {b.city}{b.address ? ` · ${b.address}` : ""} · {b.hours}</p>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {(b.specialties || []).map(sp => <Pill key={sp}>{sp}</Pill>)}
            </div>
          </div>
        </div>
      ))}

      {!loading && list.length === 0 && !error && (
        <div style={{ textAlign: "center", padding: "40px 20px" }}>
          <p style={{ fontSize: 32, marginBottom: 10 }}>🔍</p>
          <p style={{ fontSize: 14, color: G.muted }}>No hay barberías con ese filtro</p>
        </div>
      )}
    </div>
  );
}

// ─── DETAIL — carga barberos y servicios reales ───────────────────────────────
function DetailScreen({ barberia, nav, setBooking }) {
  const [tab, setTab] = useState("barberos");
  const [barberos, setBarberos] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [estilos, setEstilos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selB, setSelB] = useState(null);
  const [selS, setSelS] = useState(null);

  const b = barberia;

  useEffect(() => {
    if (!b?.id) return;
    setLoading(true);
    Promise.all([
      dbGet("barberos", `?barberia_id=eq.${b.id}&select=*&order=rating.desc`),
      dbGet("servicios", `?barberia_id=eq.${b.id}&select=*&order=price.asc`),
      dbGet("estilos", `?barberia_id=eq.${b.id}&select=*&order=likes.desc`),
    ]).then(([brs, svs, sts]) => {
      setBarberos(Array.isArray(brs) ? brs : []);
      setServicios(Array.isArray(svs) ? svs : []);
      setEstilos(Array.isArray(sts) ? sts : []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [b?.id]);

  if (!b) return null;

  return (
    <div style={{ flex: 1, overflowY: "auto" }}>
      <div style={{ height: 110, background: "linear-gradient(135deg,#0D1A15,#111F1A)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 44, position: "relative" }}>
        💈
        <div style={{ position: "absolute", top: 14, left: 14 }}><Back onBack={() => nav("explore")} /></div>
        <div style={{ position: "absolute", bottom: -18, left: 18, right: 18, background: G.card, border: `0.5px solid ${G.bdr}`, borderRadius: 14, padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <p style={{ fontSize: 16, fontWeight: 800, color: G.text }}>{b.name}</p>
            <p style={{ fontSize: 11, color: G.muted }}>📍 {b.city} · {b.hours}</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: G.text }}>⭐ {b.rating}</p>
            <p style={{ fontSize: 10, color: G.muted }}>{b.reviews_count} reseñas</p>
          </div>
        </div>
      </div>

      <div style={{ padding: "30px 18px 14px" }}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
          {(b.specialties || []).map(sp => <Pill key={sp}>{sp}</Pill>)}
          <Pill color={b.is_open ? G.green : G.red}>{b.is_open ? "Abierto" : "Cerrado"}</Pill>
        </div>

        <div style={{ display: "flex", background: G.card2, borderRadius: 12, padding: 3, marginBottom: 18 }}>
          {[{ id: "barberos", l: "Barberos" }, { id: "servicios", l: "Servicios" }, { id: "galeria", l: "Galería" }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ flex: 1, background: tab === t.id ? G.brand : "transparent", color: tab === t.id ? "#080B0F" : G.muted, border: "none", borderRadius: 10, padding: "8px", fontSize: 12, cursor: "pointer", fontFamily: "inherit", fontWeight: tab === t.id ? 800 : 500 }}>
              {t.l}
            </button>
          ))}
        </div>

        {loading && [1, 2, 3].map(i => <Skeleton key={i} h={64} />)}

        {tab === "barberos" && !loading && barberos.map((br, idx) => {
          const col = BARBER_COLORS[idx % BARBER_COLORS.length];
          return (
            <div key={br.id} onClick={() => setSelB(br)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: selB?.id === br.id ? `${G.brand}10` : G.card, border: `0.5px solid ${selB?.id === br.id ? G.brand + "50" : G.bdr}`, borderRadius: 14, marginBottom: 10, cursor: "pointer" }}>
              <Av txt={br.initials || br.name.slice(0, 2).toUpperCase()} bg={col.bg} color={col.color} />
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: G.text }}>{br.name}</p>
                <p style={{ fontSize: 11, color: G.muted }}>{br.role}</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: 12, color: G.gold, fontWeight: 700 }}>⭐ {br.rating}</p>
                <p style={{ fontSize: 10, color: G.muted }}>{br.available_slots} huecos</p>
              </div>
              {selB?.id === br.id && <span style={{ color: G.brand, fontSize: 18 }}>✓</span>}
            </div>
          );
        })}

        {tab === "servicios" && !loading && (
          <>
            {servicios.map(sv => (
              <div key={sv.id} onClick={() => setSelS(sv)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: selS?.id === sv.id ? `${G.brand}10` : G.card, border: `0.5px solid ${selS?.id === sv.id ? G.brand + "50" : G.bdr}`, borderRadius: 14, marginBottom: 10, cursor: "pointer" }}>
                <span style={{ fontSize: 22, width: 36, textAlign: "center", flexShrink: 0 }}>{sv.icon}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: G.text }}>{sv.name}</p>
                  <p style={{ fontSize: 11, color: G.muted }}>⏱ {sv.duration_min} min</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: 16, fontWeight: 800, color: G.text }}>{sv.price}€</p>
                  {sv.valle_price && <p style={{ fontSize: 10, color: G.green }}>Valle {sv.valle_price}€</p>}
                </div>
                {selS?.id === sv.id && <span style={{ color: G.brand, fontSize: 18 }}>✓</span>}
              </div>
            ))}
            <div style={{ background: `${G.brand}08`, border: `0.5px solid ${G.brand}25`, borderRadius: 12, padding: "12px 14px", display: "flex", gap: 10 }}>
              <span>⚡</span>
              <div>
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 3 }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: G.text }}>Tarifa valle Gonnie</p>
                  <NewPill />
                </div>
                <p style={{ fontSize: 11, color: G.muted }}>Reserva lun–jue antes de las 12h y ahorra hasta un 25%.</p>
              </div>
            </div>
          </>
        )}

        {tab === "galeria" && !loading && (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <p style={{ fontSize: 13, color: G.muted }}>Elige tu estilo antes de reservar</p>
              <NewPill />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
              {estilos.map(st => (
                <div key={st.id} style={{ background: G.card2, borderRadius: 12, overflow: "hidden", cursor: "pointer" }}>
                  <div style={{ height: 70, background: "linear-gradient(135deg,#0D1A15,#111F1A)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>{st.emoji}</div>
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
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <p style={{ fontSize: 12, color: G.muted }}>{selB ? `✓ ${selB.name}` : "Elige un barbero"}</p>
            <p style={{ fontSize: 14, fontWeight: 700, color: selS ? G.brand : G.muted }}>{selS ? `${selS.price}€` : "Elige un servicio"}</p>
          </div>
          <PrimaryBtn onClick={() => { if (selB && selS) { setBooking({ barberia: b, barbero: selB, servicio: selS }); nav("booking"); } }} disabled={!selB || !selS}>
            {selB && selS ? "Elegir horario →" : "Selecciona barbero y servicio"}
          </PrimaryBtn>
        </div>
      )}
    </div>
  );
}

// ─── BOOKING — guarda reserva en Supabase ────────────────────────────────────
const SLOTS = [
  { t: "09:00", ok: false, valle: false }, { t: "09:30", ok: false, valle: false },
  { t: "10:00", ok: true,  valle: true  }, { t: "10:30", ok: true,  valle: true  },
  { t: "11:00", ok: false, valle: false }, { t: "11:30", ok: true,  valle: true  },
  { t: "16:00", ok: true,  valle: false }, { t: "17:00", ok: true,  valle: false },
  { t: "17:30", ok: false, valle: false }, { t: "18:00", ok: true,  valle: false },
  { t: "19:00", ok: true,  valle: false },
];

function BookingScreen({ booking, nav, setConfirmedAppt }) {
  const [day, setDay] = useState(21);
  const [slot, setSlot] = useState(null);
  const [group, setGroup] = useState(false);
  const [groupN, setGroupN] = useState(1);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const slotData = SLOTS.find(s => s.t === slot);
  const isValle = slotData?.valle;
  const price = Number(booking?.servicio?.price || 20);
  const vPrice = Number(booking?.servicio?.valle_price || price);
  const finalP = isValle ? vPrice : price;
  const total = finalP * (group ? groupN : 1);

  const confirm = async () => {
    if (!slot) return;
    setSaving(true);
    setSaveError(null);
    try {
      const appt = {
        barberia_id:  booking.barberia.id,
        barbero_id:   booking.barbero.id,
        servicio_id:  booking.servicio.id,
        client_name:  "Javier García",
        client_email: "javier@gonnie.app",
        date:         `2026-05-${String(day).padStart(2, "0")}`,
        time:         slot,
        status:       "confirmed",
        price:        total,
        is_valle:     isValle || false,
        group_size:   group ? groupN : 1,
        points_earned: Math.floor(total * 2),
      };
      const result = await dbInsert("appointments", appt);
      setConfirmedAppt(Array.isArray(result) ? result[0] : appt);
      nav("confirmed");
    } catch (e) {
      setSaveError("No se pudo guardar la reserva. Comprueba la conexión.");
      setSaving(false);
    }
  };

  return (
    <div style={{ flex: 1, overflowY: "auto" }}>
      <div style={{ padding: "14px 18px 12px", borderBottom: `0.5px solid ${G.bdr}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Back onBack={() => nav("detail")} />
        {booking && <p style={{ fontSize: 12, color: G.muted }}>{booking.barbero?.name} · {booking.servicio?.name}</p>}
      </div>

      <div style={{ padding: "16px 18px" }}>
        {/* Grupal */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: G.card, border: `0.5px solid ${G.bdr}`, borderRadius: 14, padding: "12px 14px", marginBottom: 14 }}>
          <div>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 3 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: G.text }}>👥 Reserva grupal</p><NewPill />
            </div>
            <p style={{ fontSize: 11, color: G.muted }}>Para amigos y familia</p>
          </div>
          <div onClick={() => setGroup(!group)} style={{ width: 44, height: 25, background: group ? G.brand : "rgba(255,255,255,0.1)", borderRadius: 13, position: "relative", cursor: "pointer" }}>
            <div style={{ position: "absolute", top: 3, left: group ? 22 : 3, width: 19, height: 19, borderRadius: "50%", background: "white", transition: "left .2s" }} />
          </div>
        </div>

        {group && (
          <div style={{ background: G.card, border: `0.5px solid ${G.brand}30`, borderRadius: 14, padding: "12px 14px", marginBottom: 14 }}>
            <p style={{ fontSize: 12, color: G.muted, marginBottom: 10 }}>Número de personas</p>
            <div style={{ display: "flex", gap: 8 }}>
              {[1, 2, 3, 4].map(n => (
                <button key={n} onClick={() => setGroupN(n)} style={{ flex: 1, padding: "10px", background: groupN === n ? G.brand : G.card2, color: groupN === n ? "#080B0F" : G.muted, border: "none", borderRadius: 10, fontSize: 15, fontWeight: 800, cursor: "pointer", fontFamily: "inherit" }}>{n}</button>
              ))}
            </div>
          </div>
        )}

        {/* Calendario */}
        <SLabel>Mayo 2026</SLabel>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", marginBottom: 4 }}>
          {["L","M","X","J","V","S","D"].map(d => <div key={d} style={{ textAlign: "center", fontSize: 10, color: G.muted, padding: "4px 0" }}>{d}</div>)}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 3, marginBottom: 20 }}>
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

        <SLabel>Horarios disponibles</SLabel>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 14 }}>
          {SLOTS.map(s => (
            <div key={s.t} onClick={() => s.ok && setSlot(s.t)} style={{ padding: "10px 6px", borderRadius: 12, textAlign: "center", cursor: s.ok ? "pointer" : "not-allowed", background: slot === s.t ? `${G.brand}18` : "transparent", border: `0.5px solid ${!s.ok ? "rgba(255,255,255,0.04)" : slot === s.t ? G.brand + "70" : s.valle ? G.green + "30" : G.bdr}` }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: !s.ok ? "rgba(255,255,255,0.18)" : slot === s.t ? G.brand : G.text }}>{s.t}</p>
              {s.valle && s.ok && <p style={{ fontSize: 9, color: G.green, marginTop: 2 }}>⚡ Valle</p>}
              {!s.ok && <p style={{ fontSize: 9, color: "rgba(255,255,255,0.15)", marginTop: 2 }}>Ocupado</p>}
            </div>
          ))}
        </div>

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

        {saveError && (
          <div style={{ background: `${G.red}10`, border: `0.5px solid ${G.red}30`, borderRadius: 12, padding: "10px 14px", marginBottom: 12 }}>
            <p style={{ fontSize: 12, color: G.red }}>{saveError}</p>
          </div>
        )}

        <PrimaryBtn onClick={confirm} disabled={!slot || saving}>
          {saving ? "Guardando reserva..." : slot ? "Confirmar reserva →" : "Selecciona un horario"}
        </PrimaryBtn>
      </div>
    </div>
  );
}

// ─── CONFIRMED ────────────────────────────────────────────────────────────────
function ConfirmedScreen({ nav, appt }) {
  const [qr, setQr] = useState(false);
  const pts = appt?.points_earned || 40;

  if (qr) return (
    <div style={{ flex: 1, overflowY: "auto", padding: "20px 18px" }}>
      <Back onBack={() => setQr(false)} />
      <div style={{ textAlign: "center", marginTop: 20 }}>
        <GonnieLogo />
        <h3 style={{ fontSize: 18, fontWeight: 800, color: G.text, margin: "16px 0 4px" }}>Tu QR de entrada</h3>
        <p style={{ fontSize: 12, color: G.muted, marginBottom: 24 }}>Muéstralo al llegar · Sin colas</p>
        <div style={{ background: G.card, border: `1.5px solid ${G.brand}40`, borderRadius: 22, padding: 22, display: "inline-block", marginBottom: 14 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(9,20px)", gap: 3 }}>
            {Array.from({ length: 81 }).map((_, i) => {
              const on = new Set([0,1,2,3,4,5,6,9,15,18,24,27,28,29,30,31,32,33,36,38,44,45,53,54,55,56,57,58,59,63,66,72,73,74,75,76,77,78,16,34,62,64,70,8,17,35,46,47,50,7,14,37,43,65,71,10,11,12,20,22,48,51,60,68]);
              return <div key={i} style={{ width: 18, height: 18, background: on.has(i) ? G.text : "transparent", borderRadius: 3 }} />;
            })}
          </div>
        </div>
        <p style={{ fontSize: 10, color: G.muted, marginBottom: 20, letterSpacing: "0.05em" }}>
          {appt?.id ? `GONNIE-${appt.id.slice(0, 8).toUpperCase()}` : "GONNIE-BKFRAGA-2026"}
        </p>
        <div style={{ background: `${G.brand}08`, border: `0.5px solid ${G.brand}25`, borderRadius: 14, padding: "14px 16px", textAlign: "left" }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: G.brand, marginBottom: 4 }}>📱 Check-in instantáneo</p>
          <p style={{ fontSize: 12, color: G.muted, lineHeight: 1.6 }}>El barbero ve tu llegada al escanear y te avisa cuando es tu turno. Sin espera.</p>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "28px 18px" }}>
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div style={{ fontSize: 56, marginBottom: 14 }}>🎉</div>
        <GonnieLogo />
        <h2 style={{ fontSize: 24, fontWeight: 900, color: G.text, margin: "12px 0 6px", letterSpacing: "-0.02em" }}>¡Reserva confirmada!</h2>
        <p style={{ fontSize: 13, color: G.muted }}>
          {appt?.id ? "Guardada en tu base de datos ✓" : "Te esperamos en BarberKing"}
        </p>
      </div>

      <div style={{ background: G.card, border: `0.5px solid ${G.bdr}`, borderRadius: 18, padding: "16px 18px", marginBottom: 14 }}>
        {[
          { l: "📅 Fecha", v: appt?.date || "Hoy, 21 de mayo" },
          { l: "⏰ Hora", v: appt?.time || "11:30h" },
          { l: "💰 Total", v: `${appt?.price || 20}€` },
          { l: "👥 Personas", v: appt?.group_size || 1 },
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
          <p style={{ fontSize: 13, fontWeight: 700, color: G.brand }}>+{pts} Gonnie Points</p>
          <p style={{ fontSize: 11, color: G.muted }}>Acumulados en tu cuenta</p>
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
  const [appts, setAppts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dbGet("appointments", "?select=*,barberos(name),servicios(name),barberias(name)&order=created_at.desc&limit=10")
      .then(data => { setAppts(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "16px 18px" }}>
      <h2 style={{ fontSize: 22, fontWeight: 900, color: G.text, marginBottom: 18, letterSpacing: "-0.02em" }}>Mis citas</h2>

      {loading && [1, 2].map(i => <Skeleton key={i} h={100} />)}

      {!loading && appts.length > 0 && (
        <>
          <SLabel>Reservas en Gonnie</SLabel>
          {appts.map((a, i) => (
            <div key={a.id || i} style={{ background: G.card, border: `0.5px solid ${a.status === "confirmed" ? G.green + "30" : G.bdr}`, borderRadius: 16, padding: "14px 16px", marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: G.text }}>{a.servicios?.name || "Servicio"}</p>
                <Pill color={a.status === "confirmed" ? "#080B0F" : G.gold} bg={a.status === "confirmed" ? G.green : `${G.gold}18`}>
                  {a.status === "confirmed" ? "✓ Confirmada" : a.status}
                </Pill>
              </div>
              <p style={{ fontSize: 12, color: G.muted, marginBottom: 10 }}>
                📅 {a.date} · ⏰ {a.time} · 💰 {a.price}€ · 👥 {a.group_size}
              </p>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => nav("confirmed")} style={{ flex: 1, background: `${G.brand}12`, border: `0.5px solid ${G.brand}40`, borderRadius: 10, padding: "8px", fontSize: 11, color: G.brand, cursor: "pointer", fontFamily: "inherit", fontWeight: 700 }}>
                  📱 QR Check-in
                </button>
                <button style={{ flex: 1, background: "transparent", border: `0.5px solid ${G.bdr}`, borderRadius: 10, padding: "8px", fontSize: 11, color: G.muted, cursor: "pointer", fontFamily: "inherit" }}>
                  Cancelar
                </button>
              </div>
            </div>
          ))}
        </>
      )}

      {!loading && appts.length === 0 && (
        <div style={{ textAlign: "center", padding: "40px 20px" }}>
          <p style={{ fontSize: 36, marginBottom: 12 }}>📅</p>
          <p style={{ fontSize: 15, fontWeight: 700, color: G.text, marginBottom: 6 }}>Sin reservas aún</p>
          <p style={{ fontSize: 13, color: G.muted, marginBottom: 20 }}>Haz tu primera reserva en Gonnie</p>
          <PrimaryBtn onClick={() => nav("explore")} style={{ maxWidth: 200, margin: "0 auto" }}>Explorar barberías</PrimaryBtn>
        </div>
      )}
    </div>
  );
}

// ─── LOYALTY (estática por ahora) ─────────────────────────────────────────────
function LoyaltyScreen() {
  const [tab, setTab] = useState("rewards");
  const REWARDS = [
    { id: 1, name: "10% descuento", pts: 200, icon: "🏷️", desc: "En tu próxima cita" },
    { id: 2, name: "Corte gratis", pts: 500, icon: "✂️", desc: "Cualquier barbería Gonnie" },
    { id: 3, name: "Kit de barba", pts: 300, icon: "🧴", desc: "Envío incluido" },
    { id: 4, name: "Upgrade navaja", pts: 400, icon: "💎", desc: "Ritual completo gratis" },
  ];
  return (
    <div style={{ flex: 1, overflowY: "auto" }}>
      <div style={{ background: "linear-gradient(160deg,#091A14,#0A1F18,#080B0F)", padding: "22px 20px 28px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -40, right: -40, width: 180, height: 180, borderRadius: "50%", background: `${G.brand}07` }} />
        <GonnieLogo />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", margin: "16px 0 14px" }}>
          <div>
            <p style={{ fontSize: 10, color: `${G.brand}80`, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 5 }}>Nivel Oro</p>
            <p style={{ fontSize: 42, fontWeight: 900, color: G.brand, lineHeight: 1, letterSpacing: "-0.03em" }}>1.240</p>
          </div>
          <div style={{ background: `${G.brand}15`, border: `0.5px solid ${G.brand}30`, borderRadius: 16, padding: "12px 14px", textAlign: "center" }}>
            <p style={{ fontSize: 28, marginBottom: 2 }}>🏆</p>
            <p style={{ fontSize: 10, fontWeight: 800, color: G.brand }}>ORO</p>
          </div>
        </div>
        <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: 10, height: 7, overflow: "hidden", marginBottom: 5 }}>
          <div style={{ width: "72%", height: "100%", background: `linear-gradient(90deg,${G.brand},${G.brandL})`, borderRadius: 10 }} />
        </div>
        <p style={{ fontSize: 11, color: G.muted }}>260 pts para Platino 💎</p>
      </div>
      <div style={{ padding: "16px 18px" }}>
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
            <button style={{ background: 1240 >= r.pts ? G.brand : "transparent", border: `0.5px solid ${1240 >= r.pts ? "transparent" : G.bdr}`, borderRadius: 10, padding: "8px 12px", fontSize: 11, color: 1240 >= r.pts ? "#080B0F" : G.muted, cursor: "pointer", fontFamily: "inherit", fontWeight: 800 }}>
              {1240 >= r.pts ? "Canjear" : `${r.pts - 1240} más`}
            </button>
          </div>
        ))}
        {tab === "history" && [
          { d: "Hoy", t: "Reserva confirmada", p: "+40", c: G.brand },
          { d: "10 may", t: "Corte + Barba · Carlos M.", p: "+40", c: G.brand },
          { d: "24 abr", t: "Navaja + Ritual · Marcos R.", p: "+56", c: G.brand },
          { d: "12 abr", t: "Canje: 10% descuento", p: "-200", c: G.red },
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
  const PLANS = [
    { id: 1, name: "Básico", price: 19, cuts: 1, accent: G.muted, popular: false, perks: ["1 corte al mes", "Reserva prioritaria", "Historial completo"] },
    { id: 2, name: "Pro", price: 34, cuts: 2, accent: G.brand, popular: true, perks: ["2 cortes al mes", "Reserva prioritaria", "10% en extras", "Acceso horas valle", "Puntos × 2"] },
    { id: 3, name: "Premium", price: 55, cuts: 4, accent: G.gold, popular: false, perks: ["4 cortes al mes", "Barbero fijo asignado", "20% en extras", "VIP sin espera", "Puntos × 3"] },
  ];
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "16px 18px" }}>
      <Back onBack={() => nav("home")} />
      <div style={{ textAlign: "center", margin: "16px 0 22px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <h2 style={{ fontSize: 22, fontWeight: 900, color: G.text, letterSpacing: "-0.02em" }}>Suscripciones</h2>
          <NewPill />
        </div>
        <p style={{ fontSize: 13, color: G.muted }}>Precio fijo · Sin sorpresas · Cancela cuando quieras</p>
      </div>
      {PLANS.map(p => (
        <div key={p.id} style={{ background: G.card, border: `${p.popular ? "1.5px" : "0.5px"} solid ${p.popular ? G.brand + "60" : G.bdr}`, borderRadius: 20, padding: "20px 18px", marginBottom: 14, position: "relative" }}>
          {p.popular && <div style={{ position: "absolute", top: -11, left: "50%", transform: "translateX(-50%)", background: G.brand, color: "#080B0F", fontSize: 10, fontWeight: 900, padding: "3px 16px", borderRadius: 20, whiteSpace: "nowrap" }}>⭐ MÁS POPULAR</div>}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
            <div><p style={{ fontSize: 18, fontWeight: 900, color: G.text }}>{p.name}</p><p style={{ fontSize: 11, color: G.muted }}>{p.cuts} {p.cuts === 1 ? "corte" : "cortes"} al mes</p></div>
            <div style={{ textAlign: "right" }}><p style={{ fontSize: 28, fontWeight: 900, color: p.popular ? G.brand : G.text }}>{p.price}€</p><p style={{ fontSize: 10, color: G.muted }}>/mes</p></div>
          </div>
          {p.perks.map(pk => (
            <div key={pk} style={{ display: "flex", gap: 10, marginBottom: 7 }}>
              <span style={{ fontSize: 12, color: p.accent }}>✓</span>
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

// ─── BUSINESS ─────────────────────────────────────────────────────────────────
function BusinessScreen({ setMode }) {
  const [tab, setTab] = useState("hoy");
  const [appts, setAppts] = useState([]);
  const REVENUE_DATA = [
    { m: "Ene", v: 1240 }, { m: "Feb", v: 1580 }, { m: "Mar", v: 1320 },
    { m: "Abr", v: 1890 }, { m: "May", v: 2150 }, { m: "Jun", v: 2480 },
    { m: "Jul", v: 2890 }, { m: "Ago", v: 3120 },
  ];

  useEffect(() => {
    dbGet("appointments", "?select=*,barberos(name),servicios(name)&order=time.asc&limit=10")
      .then(data => setAppts(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  return (
    <div style={{ flex: 1, overflowY: "auto" }}>
      <div style={{ background: "#060A0E", padding: "14px 18px 12px", borderBottom: `0.5px solid ${G.bdr}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div><GonnieLogo /><p style={{ fontSize: 11, color: G.muted, marginTop: 3 }}>Panel de negocio · BarberKing</p></div>
        <button onClick={() => setMode("client")} style={{ background: `${G.brand}12`, border: `0.5px solid ${G.brand}30`, borderRadius: 10, padding: "7px 12px", fontSize: 11, color: G.brand, cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}>
          👤 Cliente
        </button>
      </div>
      <div style={{ padding: "14px 18px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
          {[
            { l: "Ingresos hoy", v: "248€", d: "+12% vs ayer", c: G.green },
            { l: "Citas hoy", v: String(appts.length || 12), d: "en tiempo real", c: G.brand },
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

        <div style={{ background: G.card, border: `0.5px solid ${G.bdr}`, borderRadius: 16, padding: "14px 14px 8px", marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
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

        <div style={{ background: "linear-gradient(135deg,#091A14,#0C1F17)", border: `0.5px solid ${G.brand}25`, borderRadius: 14, padding: "13px 14px", marginBottom: 16 }}>
          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: `${G.brand}12`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>🤖</div>
            <div>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: G.brand }}>Gonnie IA · Insight</p><NewPill />
              </div>
              <p style={{ fontSize: 11, color: G.muted, lineHeight: 1.6, marginBottom: 6 }}>
                Los jueves 10:00–12:00h tienes un 40% de huecos libres. Activa tarifa valle automática y genera{" "}
                <span style={{ color: G.brand, fontWeight: 700 }}>+180€/mes</span>.
              </p>
              <button style={{ background: "transparent", border: "none", color: G.brand, fontSize: 11, cursor: "pointer", fontFamily: "inherit", fontWeight: 700, padding: 0 }}>Activar →</button>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", background: G.card2, borderRadius: 12, padding: 3, marginBottom: 14 }}>
          {[{ id: "hoy", l: "Agenda" }, { id: "equipo", l: "Equipo" }, { id: "clientes", l: "Clientes" }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ flex: 1, background: tab === t.id ? G.brand : "transparent", color: tab === t.id ? "#080B0F" : G.muted, border: "none", borderRadius: 10, padding: "8px", fontSize: 12, cursor: "pointer", fontFamily: "inherit", fontWeight: tab === t.id ? 800 : 500 }}>
              {t.l}
            </button>
          ))}
        </div>

        {tab === "hoy" && (
          appts.length > 0 ? appts.map((a, i) => (
            <div key={a.id || i} style={{ display: "flex", gap: 12, alignItems: "center", padding: "10px 0", borderBottom: `0.5px solid ${G.bdr}` }}>
              <p style={{ fontSize: 11, color: G.muted, width: 36, flexShrink: 0 }}>{a.time}</p>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: a.status === "done" ? G.green : G.brand, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: G.text }}>{a.client_name || "Cliente"}</p>
                <p style={{ fontSize: 10, color: G.muted }}>{a.servicios?.name || "Servicio"}</p>
              </div>
              <p style={{ fontSize: 12, fontWeight: 700, color: a.status === "done" ? G.green : G.muted }}>{a.price}€</p>
            </div>
          )) : [
            { t: "10:30", c: "Javier G.", s: "Corte + Barba", p: 20, st: "now" },
            { t: "11:00", c: "Pedro M.", s: "Navaja + Ritual", p: 28, st: "next" },
            { t: "12:00", c: "— Libre —", s: "", p: 0, st: "free" },
            { t: "16:00", c: "Antonio R.", s: "Arreglo de barba", p: 10, st: "next" },
          ].map((a, i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "center", padding: "10px 0", borderBottom: `0.5px solid ${G.bdr}` }}>
              <p style={{ fontSize: 11, color: G.muted, width: 36, flexShrink: 0 }}>{a.t}</p>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: a.st === "now" ? G.brand : a.st === "free" ? "rgba(255,255,255,0.1)" : G.muted, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 12, fontWeight: a.st === "free" ? 400 : 600, color: a.st === "free" ? G.muted : G.text }}>{a.c}</p>
                {a.s && <p style={{ fontSize: 10, color: G.muted }}>{a.s}</p>}
              </div>
              {a.p > 0 && <p style={{ fontSize: 12, fontWeight: 700, color: G.muted }}>{a.p}€</p>}
            </div>
          ))
        )}

        {tab === "equipo" && [
          { n: "Carlos M.", i: "CM", bg: "#1A2535", co: G.blue, c: 8, r: 5.0, v: "156€" },
          { n: "Alejandro L.", i: "AL", bg: "#1A2520", co: G.green, c: 5, r: 4.8, v: "100€" },
          { n: "Marcos R.", i: "MR", bg: "#251A25", co: "#C084FC", c: 7, r: 4.7, v: "120€" },
        ].map(e => (
          <div key={e.n} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 12px", background: G.card, border: `0.5px solid ${G.bdr}`, borderRadius: 12, marginBottom: 10 }}>
            <Av txt={e.i} bg={e.bg} color={e.co} />
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: G.text }}>{e.n}</p>
              <p style={{ fontSize: 10, color: G.muted }}>{e.c} citas · ⭐ {e.r}</p>
            </div>
            <p style={{ fontSize: 14, fontWeight: 800, color: G.brand }}>{e.v}</p>
          </div>
        ))}

        {tab === "clientes" && [
          { n: "Javier G.", v: 31, l: "10 min", s: "620€", f: true },
          { n: "Miguel A.", v: 12, l: "Hoy", s: "240€", f: true },
          { n: "Roberto P.", v: 8, l: "Ayer", s: "160€", f: false },
        ].map(cl => (
          <div key={cl.n} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: `0.5px solid ${G.bdr}` }}>
            <Av txt={cl.n.split(" ").map(x => x[0]).join("")} size={32} bg={G.card2} color={G.muted} />
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", gap: 7, alignItems: "center", marginBottom: 2 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: G.text }}>{cl.n}</p>
                {cl.f && <Pill>Fiel</Pill>}
              </div>
              <p style={{ fontSize: 10, color: G.muted }}>{cl.v} visitas · {cl.l}</p>
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
      <h2 style={{ fontSize: 22, fontWeight: 900, color: G.text, marginBottom: 18 }}>Perfil</h2>
      <div style={{ display: "flex", alignItems: "center", gap: 14, background: G.card, border: `0.5px solid ${G.bdr}`, borderRadius: 18, padding: 16, marginBottom: 20 }}>
        <Av txt="JG" size={52} bg="#1A2535" color={G.brand} />
        <div>
          <p style={{ fontSize: 16, fontWeight: 800, color: G.text }}>Javier García</p>
          <p style={{ fontSize: 12, color: G.muted }}>javier@gonnie.app</p>
          <div style={{ marginTop: 4 }}><Pill>⭐ Nivel Oro · 1.240 pts</Pill></div>
        </div>
      </div>
      <div style={{ background: G.card, border: `0.5px solid ${G.bdr}`, borderRadius: 16, overflow: "hidden", marginBottom: 16 }}>
        {["📦 Mis suscripciones", "💳 Métodos de pago", "🔔 Notificaciones", "🔒 Privacidad", "❓ Ayuda"].map((item, i, a) => (
          <div key={item} onClick={item.includes("suscripciones") ? () => nav("plans") : undefined} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: i < a.length - 1 ? `0.5px solid ${G.bdr}` : "none", cursor: "pointer" }}>
            <p style={{ fontSize: 13, fontWeight: 500, color: G.text }}>{item}</p>
            <span style={{ color: G.muted }}>›</span>
          </div>
        ))}
      </div>
      <div style={{ background: `${G.brand}08`, border: `0.5px solid ${G.brand}25`, borderRadius: 18, padding: "16px 18px" }}>
        <p style={{ fontSize: 14, fontWeight: 800, color: G.brand, marginBottom: 6 }}>✂️ ¿Tienes una barbería?</p>
        <p style={{ fontSize: 12, color: G.muted, lineHeight: 1.6, marginBottom: 14 }}>Únete a Gonnie Business. Gestiona agenda, equipo y clientes.</p>
        <PrimaryBtn onClick={() => setMode("business")}>Abrir panel de negocio →</PrimaryBtn>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "home", icon: "🏠", label: "Inicio" },
  { id: "explore", icon: "🔍", label: "Explorar" },
  { id: "appointments", icon: "📅", label: "Citas" },
  { id: "loyalty", icon: "⭐", label: "Points" },
  { id: "profile", icon: "👤", label: "Perfil" },
];
const NO_NAV = ["detail", "booking", "confirmed", "plans"];

export default function App() {
  const [view, setView] = useState("splash");
  const [mode, setMode] = useState("client");
  const [barberia, setBarberia] = useState(null);
  const [booking, setBooking] = useState(null);
  const [confirmedAppt, setConfirmedAppt] = useState(null);

  const nav = v => setView(v);
  const phone = { maxWidth: 390, margin: "0 auto", height: "100vh", display: "flex", flexDirection: "column", background: G.bg, overflow: "hidden", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", color: G.text };

  if (view === "splash") return <div style={phone}><SplashScreen onDone={() => nav("home")} /></div>;
  if (mode === "business") return <div style={phone}><BusinessScreen setMode={setMode} /></div>;

  return (
    <div style={phone}>
      <div style={{ background: G.bg, padding: "8px 18px 0", display: "flex", justifyContent: "space-between", flexShrink: 0 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: G.text }}>9:41</span>
        <div style={{ display: "flex", gap: 5, alignItems: "center", fontSize: 10, color: G.muted }}>
          <span>●●●●</span><span>WiFi</span><span>🔋</span>
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {view === "home"         && <HomeScreen nav={nav} />}
        {view === "explore"      && <ExploreScreen nav={nav} setBarberia={setBarberia} />}
        {view === "detail"       && <DetailScreen barberia={barberia || { id: "a0000001-0000-0000-0000-000000000001", name: "BarberKing", city: "Fraga", rating: 4.9, reviews_count: 124, is_open: true, hours: "9:00–20:00", specialties: ["Fade","Barba","Navaja"] }} nav={nav} setBooking={setBooking} />}
        {view === "booking"      && <BookingScreen booking={booking} nav={nav} setConfirmedAppt={setConfirmedAppt} />}
        {view === "confirmed"    && <ConfirmedScreen nav={nav} appt={confirmedAppt} />}
        {view === "appointments" && <AppointmentsScreen nav={nav} />}
        {view === "loyalty"      && <LoyaltyScreen />}
        {view === "plans"        && <PlansScreen nav={nav} />}
        {view === "profile"      && <ProfileScreen nav={nav} setMode={setMode} />}
      </div>
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
