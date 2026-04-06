"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

/* ─── DATOS ─────────────────────────────────── */
const PAISES = [
  {
    id: "mauritania", num: "01", flag: "🇲🇷", name: "Mauritania", dias: "4 días · Noroeste",
    img: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=800&q=80&auto=format&fit=crop",
    actividades: [
      "El tren de hierro más largo del mundo — 700 km de desierto, 200+ vagones",
      "Subirse encima del mineral bajo las estrellas del Sáhara",
      "Amanecer llegando a Nuadibú con el océano Atlántico de fondo",
      "Puerto pesquero de Nuadibú — uno de los más grandes de África",
      "Dunas de arena en el borde del Atlántico",
    ],
    highlight: "El tren no tiene horario fijo. Hay que preguntar en la estación el mismo día. Llevá saco de dormir — el frío de noche es brutal.",
    visa: "Visa a la llegada · ~$55 USD",
  },
  {
    id: "egipto", num: "02", flag: "🇪🇬", name: "Egipto", dias: "6 días · Norte",
    img: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=800&q=80&auto=format&fit=crop",
    actividades: [
      "Pirámides de Giza + Esfinge — la única Maravilla del Mundo Antiguo que sobrevive",
      "Museo Egipcio — momia y máscara de oro de Tutankamón",
      "Khan el-Khalili — bazar histórico del siglo XIV, especias y perfumes",
      "Valle de los Reyes en Luxor — tumbas faraónicas excavadas en la roca",
      "Templo de Karnak — el complejo religioso más grande de la antigüedad",
      "Paseo en feluca al atardecer sobre el Nilo",
    ],
    highlight: "Llegá a las Pirámides antes de las 8am. Con el calor y los grupos del mediodía, la experiencia cambia radicalmente.",
    visa: "Sin visa para argentinos",
  },
  {
    id: "tanzania", num: "03", flag: "🇹🇿", name: "Tanzania", dias: "8 días · Este",
    img: "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=800&q=80&auto=format&fit=crop",
    actividades: [
      "Serengeti — el safari más famoso del mundo, llanuras infinitas",
      "Cráter del Ngorongoro — los Big Five en un solo día",
      "Globo aerostático al amanecer sobre el Serengeti (~$500) — el highlight del viaje",
      "Lago Manyara — leones que trepan árboles, flamingos rosados",
      "Zanzíbar — playas de arena blanca, Stone Town UNESCO, snorkel con tortugas",
    ],
    highlight: "El safari privado con 4–6 personas sale igual que el grupal pero tienen el jeep solo para ustedes. Vale la pena.",
    visa: "E-visa online · ~$50",
  },
  {
    id: "kenia", num: "04", flag: "🇰🇪", name: "Kenia", dias: "5 días · Este",
    img: "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=800&q=80&auto=format&fit=crop",
    actividades: [
      "Masái Mara — julio a octubre: la Gran Migración de 1.5 millones de ñus",
      "Cruce del río Mara con cocodrilos — el espectáculo más brutal de la naturaleza",
      "Visita a aldea masái — danza, artesanías y cultura real",
      "Giraffe Centre (Nairobi) — desayunar con jirafas Rothschild en peligro de extinción",
    ],
    highlight: "La Gran Migración es julio–octubre. Si el viaje es en ese período, van a estar en el lugar justo en el momento justo.",
    visa: "eTA online · ~$30",
  },
  {
    id: "zimbabwe", num: "05", flag: "🇿🇼", name: "Zimbabwe", dias: "3 días · Sur",
    img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80&auto=format&fit=crop",
    actividades: [
      "Cataratas Victoria — la caída de agua más grande del mundo",
      "Puente de los 3 países: Zimbabwe, Zambia y Botswana",
      "Rafting en el río Zambeze — uno de los mejores del mundo",
      "Sunset cruise con hipopótamos y cocodrilos, copas en mano",
    ],
    highlight: "Llevar bolsa impermeable. En temporada alta el spray de las cataratas empapa todo a 500 metros.",
    visa: "Visa en frontera · KAZA visa ~$50",
  },
  {
    id: "sudafrica", num: "06", flag: "🇿🇦", name: "Sudáfrica", dias: "5 días · Sur",
    img: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&q=80&auto=format&fit=crop",
    actividades: [
      "Table Mountain — teleférico o caminata, vista 360° de Ciudad del Cabo",
      "Cape Point + Cabo de Buena Esperanza — el fin del continente africano",
      "Pingüinos en Boulders Beach — colonia de pingüinos africanos",
      "Stellenbosch y los Winelands — ruta del vino a 45 min de Ciudad del Cabo",
      "Kruger Park opcional — safari en el parque más grande de Sudáfrica",
    ],
    highlight: "Ciudad del Cabo es la más fotogénica de África. Reserven al menos 3 noches acá antes del vuelo de vuelta a BsAs.",
    visa: "Sin visa para argentinos",
  },
];

const GALERIA = [
  { src: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80&auto=format&fit=crop", alt: "Elefantes en la sabana al atardecer" },
  { src: "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=800&q=80&auto=format&fit=crop", alt: "Serengeti, Tanzania" },
  { src: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=800&q=80&auto=format&fit=crop", alt: "Pirámides de Giza, Egipto" },
  { src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80&auto=format&fit=crop", alt: "Desierto africano" },
  { src: "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=800&q=80&auto=format&fit=crop", alt: "León en el safari" },
  { src: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=800&q=80&auto=format&fit=crop", alt: "Desierto Sáhara" },
  { src: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&q=80&auto=format&fit=crop", alt: "Ciudad del Cabo, Sudáfrica" },
  { src: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80&auto=format&fit=crop", alt: "Cataratas Victoria" },
  { src: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800&q=80&auto=format&fit=crop", alt: "Masái Mara, Kenia" },
];

const TIMELINE = [
  { dot: "1", days: "DÍA 1", place: "BsAs → Madrid → Nuadibú", desc: "Vuelo nocturno desde Ezeiza. Conexión en Madrid o Casablanca. Llegada a Mauritania." },
  { dot: "2–4", days: "DÍAS 2–4 · MAURITANIA", place: "El tren de hierro", desc: "Espera en Nuadibú, subida al tren de mineral. 14–20 horas de desierto nocturno bajo las estrellas." },
  { dot: "5", days: "DÍA 5", place: "Nuadibú → Casablanca → El Cairo", desc: "Royal Air Maroc. Llegada a El Cairo a la tarde. Check-in cerca de las pirámides." },
  { dot: "6–10", days: "DÍAS 6–10 · EGIPTO", place: "Pirámides, Luxor, el Nilo", desc: "Giza al amanecer, Museo Egipcio, Khan el-Khalili, vuelo a Luxor, Valle de los Reyes, feluca al atardecer." },
  { dot: "11", days: "DÍA 11", place: "El Cairo → Arusha, Tanzania", desc: "EgyptAir a Nairobi, conexión a Arusha. Primer lodge de safari. El África salvaje empieza acá." },
  { dot: "12–13", days: "DÍAS 12–13 · TANZANIA", place: "Ngorongoro", desc: "Descenso al cráter más grande del mundo. Los Big Five en un solo día. Glamping en el borde." },
  { dot: "14–15", days: "DÍAS 14–15 · TANZANIA", place: "Serengeti", desc: "Game drives al amanecer y atardecer. Noche en camp dentro del parque. Globo aerostático opcional." },
  { dot: "16–17", days: "DÍAS 16–17 · TANZANIA", place: "Zanzíbar", desc: "Vuelo interno. Stone Town, playas de Nungwi, snorkel con tortugas en el Índico." },
  { dot: "18–20", days: "DÍAS 18–20 · KENIA", place: "Masái Mara", desc: "La Gran Migración. 1.5 millones de ñus. Cruce del río Mara con cocodrilos. Visita aldea masái." },
  { dot: "21", days: "DÍA 21 · KENIA", place: "Nairobi — Giraffe Centre", desc: "Desayuno con jirafas Rothschild. Tarde libre en Nairobi." },
  { dot: "22–24", days: "DÍAS 22–24 · ZIMBABWE", place: "Cataratas Victoria", desc: "Vuelo vía Johannesburgo. Cataratas, puente de los 3 países, rafting, sunset cruise." },
  { dot: "25–30", days: "DÍAS 25–30 · SUDÁFRICA", place: "Ciudad del Cabo", desc: "Table Mountain, Cape Point, pingüinos, Stellenbosch y los Winelands. Kruger opcional." },
  { dot: "31–33", days: "DÍAS 31–33", place: "Johannesburgo → São Paulo → BsAs", desc: "LATAM. Vuelo nocturno desde JNB. Escala en Guarulhos. Llegada a Ezeiza al día siguiente." },
];

const SAFARIS = [
  { icon: "🎈", loc: "TANZANIA · SERENGETI", title: "Globo al amanecer", desc: "Sobrevolás el Serengeti cuando el cielo está naranja y los leones siguen en la llanura. La foto del viaje.", tag: "IMPERDIBLE · ~$500" },
  { icon: "🦁", loc: "TANZANIA · NGORONGORO", title: "Big Five en un día", desc: "El único lugar donde podés ver elefante, búfalo, rinoceronte, león y leopardo en una sola jornada.", tag: "INCLUIDO EN SAFARI" },
  { icon: "🐃", loc: "KENIA · MASÁI MARA", title: "La Gran Migración", desc: "1.5 millones de ñus cruzando el río Mara con cocodrilos esperando. Solo julio–octubre.", tag: "SOLO JUL–OCT" },
  { icon: "🚂", loc: "MAURITANIA · SÁHARA", title: "Tren de hierro", desc: "200 vagones de mineral, 700 km de desierto, 14–20 horas. Cielo sin contaminación lumínica.", tag: "GRATIS / ~$5 USD" },
  { icon: "🚣", loc: "ZIMBABWE · ZAMBEZE", title: "Rafting en el Zambeze", desc: "Justo abajo de las Cataratas Victoria, uno de los mejores ríos del mundo para rafting.", tag: "AVENTURA · ~$130" },
  { icon: "⛵", loc: "EGIPTO · NILO", title: "Feluca al atardecer", desc: "Velero tradicional sobre el Nilo en Luxor. El cielo naranja sobre el agua del río más largo del mundo.", tag: "INCLUIDO EN TOURS" },
  { icon: "🦒", loc: "KENIA · NAIROBI", title: "Desayuno con jirafas", desc: "El Giraffe Centre protege jirafas Rothschild en extinción. Podés darles de comer en la boca.", tag: "ÚNICO EN EL MUNDO" },
  { icon: "🌋", loc: "SUDÁFRICA · CIUDAD DEL CABO", title: "Table Mountain + Winelands", desc: "Teleférico hasta la cima con vista 360°. Después, un día de ruta del vino en Stellenbosch.", tag: "CIUDAD" },
];

const FAQS = [
  { q: "¿Es seguro viajar a estos países?", a: "Tanzania, Kenia, Sudáfrica y Zimbabwe son destinos turísticos consolidados. Mauritania es off-the-beaten-path pero seguro en Nuadibú. Egipto es muy seguro en El Cairo, Luxor y Asuán. El mayor riesgo es el de cualquier viaje: carteristas en mercados. Nada que no se maneje con sentido común." },
  { q: "¿Con cuánta anticipación hay que reservar?", a: "Los lodges del Serengeti y el Masái Mara en julio–agosto se agotan 6 a 8 meses antes. Los vuelos intercontinentales conviene comprarlos también con 6 meses de anticipación para agarrar los precios bajos. El tren de Mauritania y las cataratas no necesitan reserva anticipada." },
  { q: "¿Necesitamos guía o lo hacemos solos?", a: "Los safaris requieren guía certificado por regulación del parque. El resto (Egipto, Mauritania, cataratas, Ciudad del Cabo) se puede hacer solos. Para el Valle de los Reyes en Luxor conviene contratar un guía local por medio día — la diferencia es enorme." },
  { q: "¿Cómo se maneja la plata en África?", a: "El dólar americano en efectivo es el rey en toda África Oriental. En lodges y hoteles aceptan tarjeta, pero en mercados, transporte y propinas necesitás cash. Llevá billetes de $1, $5 y $20. Los $100 no sirven porque nadie tiene cambio. En Sudáfrica y Egipto los cajeros funcionan bien." },
  { q: "¿Cuántos somos para que sea viable?", a: "El número ideal es 4 a 6 personas. Con 4 ya llenás un jeep de safari y los costos se distribuyen bien. Con 6 bajan un poco más. Si son más de 6 hay que contratar dos jeeps, lo que complica la coordinación en los parques." },
  { q: "¿El tren de Mauritania es realmente así de extremo?", a: "Sí. Sin horario, puede durar 14 o 20 horas, hace frío de noche, y el polvo de mineral de hierro te tiñe todo de negro. Eso es exactamente lo que lo hace legendario. Los viajeros que lo hicieron lo describen como una de las experiencias más crudas y memorables de sus vidas." },
];

const CHECK_ITEMS = {
  "Salud — obligatorio": [
    "Vacuna fiebre amarilla (obligatoria Tanzania, gratis en hospitales públicos)",
    "Antimalárica — consultá infectólogo 4–6 semanas antes",
    "Hepatitis A y B",
    "Tifoidea y tétanos actualizados",
    "Seguro de viaje con cobertura de evacuación médica",
  ],
  "Documentación": [
    "Pasaporte con 6+ meses de vigencia",
    "E-visa Tanzania (immigration.go.tz · ~$50)",
    "eTA Kenia (etakenya.go.ke · ~$30)",
    "Mauritania — visa a la llegada (~$55 efectivo)",
    "Zimbabwe — KAZA Visa en frontera (~$50)",
  ],
  "Equipaje": [
    "Ropa safari: tonos neutros (beige, oliva, marrón). Nada blanco.",
    "Repelente DEET 30%+ — imprescindible al amanecer/atardecer",
    "Protector solar 50+",
    "Saco de dormir liviano (para el tren de Mauritania)",
    "Adaptador tipo G (UK) y tipo M para enchufes",
    "Bolsa impermeable (Cataratas Victoria)",
  ],
  "Plata & tecnología": [
    "Efectivo USD en billetes pequeños ($1, $5, $20) para propinas",
    "SIM local — Safaricom en Kenia, Airtel en Tanzania (~$5 por 5GB)",
    "Teleobjetivo o zoom 200mm+ para fotos de fauna",
    "Power bank grande — en el tren no hay electricidad",
    "Reservar safaris con 6–8 meses de anticipación",
  ],
};

/* ─── COMPONENTE PRINCIPAL ─────────────────── */
export default function Home() {
  const [openCard, setOpenCard]   = useState<string | null>(null);
  const [openFaq, setOpenFaq]     = useState<number | null>(null);
  const [budget, setBudget]       = useState<"mid" | "high">("mid");
  const [checked, setChecked]     = useState<Set<string>>(new Set());
  const [muted, setMuted]         = useState(true);
  const [audioReady, setAudioReady] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  /* Intersection Observer para fade-up */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); }
      }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".fade-up").forEach((el) => obs.observe(el));
    setTimeout(() => {
      document.querySelectorAll(".hero-fade").forEach((el) => el.classList.add("visible"));
    }, 120);
    return () => obs.disconnect();
  }, []);

  /* Audio */
  const toggleSound = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    if (muted) {
      a.volume = 0.18;
      a.play().catch(() => {});
      setMuted(false);
    } else {
      a.pause();
      setMuted(true);
    }
  }, [muted]);

  const toggleCheck = (key: string) => {
    setChecked((prev) => {
      const s = new Set(prev);
      s.has(key) ? s.delete(key) : s.add(key);
      return s;
    });
  };

  const budgetData = {
    mid:  { total: "$7.500",  sub: "Sin globo aerostático. Alojamiento mid-range.", vuelos: [3200,75], aloja: [1800,43], safari: [950,23], tours: [700,17], extras: [550,13], visas: [300,7] },
    high: { total: "$10.500", sub: "Incluye globo aerostático y lodges premium.",  vuelos: [3500,60], aloja: [3800,65], safari: [1500,26], tours: [900,15], extras: [500,9],  visas: [300,5] },
  };
  const bd = budgetData[budget];

  /* ─── RENDER ──────────────────────────────── */
  return (
    <>
      {/* Audio ambiente */}
      <audio ref={audioRef} loop preload="none" onCanPlay={() => setAudioReady(true)}>
        <source src="https://www.soundsnap.com/sites/default/files/audio/mp3/Africa_Ambience_Birds_Morning_01.mp3" type="audio/mpeg"/>
      </audio>
      {/* Botón de sonido */}
      <button
        onClick={toggleSound}
        aria-label={muted ? "Activar sonido" : "Silenciar"}
        style={{
          position: "fixed", bottom: 24, left: 20, zIndex: 1000,
          background: "rgba(44,26,14,0.92)", border: "1px solid rgba(200,136,42,0.5)",
          borderRadius: "50px", padding: "10px 16px",
          display: "flex", alignItems: "center", gap: 8,
          color: "var(--ocre)", cursor: "pointer",
          fontFamily: "var(--font-caps)", fontSize: 12, letterSpacing: "0.15em",
          backdropFilter: "blur(8px)",
        }}
      >
        <span style={{ fontSize: 16 }}>{muted ? "🔇" : "🔊"}</span>
        {muted ? "SONIDO" : "SILENCIAR"}
      </button>

            <div style={{ maxWidth:768, margin:"0 auto", position:"relative" }}>

      {/* ── HERO ── */}
      <header style={{ position:"relative", minHeight:"100svh", display:"flex", flexDirection:"column", justifyContent:"flex-end", padding:"0 0 52px", overflow:"hidden" }}>
        <div style={{
          position:"absolute", inset:0,
          background:"linear-gradient(to bottom, rgba(26,16,8,0.25) 0%, rgba(26,16,8,0.1) 30%, rgba(26,16,8,0.75) 68%, #1A1008 100%)",
        }}/>
        <Image src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1400&q=85&auto=format&fit=crop" alt="Elefantes en la sabana africana" fill style={{objectFit:"cover",objectPosition:"center",zIndex:-1}} priority/>

        <div style={{ position:"absolute", top:28, left:20, fontFamily:"var(--font-caps)", letterSpacing:"0.18em", fontSize:11, color:"var(--ocre)", border:"1px solid rgba(200,136,42,0.4)", padding:"5px 14px", borderRadius:2 }}>
          EXPEDICIÓN 2027
        </div>

        <div style={{ position:"relative", padding:"0 20px" }} className="hero-fade fade-up">
          <p style={{ fontFamily:"var(--font-caps)", letterSpacing:"0.25em", fontSize:13, color:"var(--ocre)", marginBottom:12 }}>El gran viaje</p>
          <h1 style={{ fontFamily:"var(--font-title)", fontWeight:900, lineHeight:0.88, color:"var(--hueso)", marginBottom:6, fontSize:"clamp(54px,14vw,100px)" }}>
            África<br/><em style={{ fontStyle:"italic", color:"var(--ocre)" }}>con Caballeros</em>
          </h1>
          <p style={{ fontFamily:"var(--font-body)", fontStyle:"italic", fontSize:17, color:"var(--ceniza)", margin:"18px 0 32px", maxWidth:340, lineHeight:1.5 }}>
            Seis países. Treinta y tres días. Una aventura que no se repite.
          </p>
          <div style={{ display:"flex", gap:28, flexWrap:"wrap" }}>
            {[["6","Países"],["33","Días"],["~$7.5k","Por persona"],["Jul–Ago","2027"]].map(([n,l]) => (
              <div key={l} style={{ display:"flex", flexDirection:"column" }}>
                <span style={{ fontFamily:"var(--font-caps)", fontSize:38, color:"var(--savana)", lineHeight:1 }}>{n}</span>
                <span style={{ fontFamily:"var(--font-caps)", fontSize:11, letterSpacing:"0.12em", color:"var(--ceniza)", textTransform:"uppercase" }}>{l}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position:"absolute", bottom:20, right:20, display:"flex", flexDirection:"column", alignItems:"center", gap:6, opacity:0.45 }}>
          <div style={{ width:1, height:38, background:"linear-gradient(to bottom, transparent, var(--ocre))", animation:"scrollpulse 2s ease-in-out infinite" }}/>
          <span style={{ fontSize:10, letterSpacing:"0.15em", fontFamily:"var(--font-caps)", color:"var(--ceniza)" }}>SCROLL</span>
        </div>
      </header>

      {/* ── INTRO ── */}
      <section style={{ background:"var(--carbon)", padding:"64px 20px", borderTop:"1px solid rgba(200,136,42,0.2)" }}>
        <p className="fade-up" style={{ fontFamily:"var(--font-caps)", letterSpacing:"0.3em", fontSize:11, color:"var(--savana)", marginBottom:8 }}>La idea</p>
        <p className="fade-up" style={{ fontFamily:"var(--font-body)", fontSize:20, color:"var(--ceniza)", lineHeight:1.75, fontStyle:"italic", maxWidth:600 }}>
          Mauritania, Egipto, Tanzania, Kenia, Zimbabwe y Sudáfrica. <strong style={{ color:"var(--arena)", fontStyle:"normal", fontWeight:600 }}>De noroeste a sureste.</strong> El tren de hierro más largo del mundo, las pirámides que vieron pasar 5.000 años, el Serengeti al amanecer, la Gran Migración, las Cataratas Victoria y el Cabo de Buena Esperanza. <strong style={{ color:"var(--arena)", fontStyle:"normal", fontWeight:600 }}>Un mes de vida real.</strong>
        </p>
      </section>

      {/* ── MAPA SVG CONTORNO REAL DE ÁFRICA ── */}
      <section style={{ background:"var(--noche)", padding:"64px 20px" }}>
        <p className="fade-up" style={{ fontFamily:"var(--font-caps)", letterSpacing:"0.3em", fontSize:11, color:"var(--savana)", marginBottom:8 }}>La ruta</p>
        <h2 className="fade-up" style={{ fontFamily:"var(--font-title)", fontWeight:700, lineHeight:1.05, color:"var(--hueso)", fontSize:"clamp(32px,8vw,52px)", marginBottom:8 }}>
          De <em style={{ fontStyle:"italic", color:"var(--ocre)" }}>noroeste</em> a sureste
        </h2>
        <p className="fade-up" style={{ fontSize:15, color:"var(--ceniza)", marginBottom:24 }}>Madrid · Mauritania · Egipto · Tanzania · Kenia · Zimbabwe · Sudáfrica</p>

        <div className="fade-up" style={{ background:"#0E0804", border:"1px solid rgba(200,136,42,0.2)", borderRadius:4, overflow:"hidden" }}>
          <svg viewBox="0 0 500 620" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", height:"auto", display:"block" }}>
            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <filter id="softglow">
                <feGaussianBlur stdDeviation="6" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <marker id="arr" markerWidth="7" markerHeight="7" refX="3.5" refY="3.5" orient="auto">
                <path d="M0,0 L0,7 L7,3.5 z" fill="#C8882A" opacity="0.8"/>
              </marker>
            </defs>

            {/* Contorno real de África */}
            <path
              d="M 218 18
                 L 235 16 L 255 18 L 272 22 L 285 30 L 296 42 L 302 55 L 306 70
                 L 308 90 L 305 108 L 298 118 L 310 124 L 322 132 L 330 145
                 L 332 158 L 328 170 L 318 178 L 322 192 L 330 208 L 334 225
                 L 332 242 L 324 256 L 318 270 L 316 285 L 318 300 L 322 315
                 L 326 330 L 324 345 L 316 358 L 302 370 L 285 380 L 268 388
                 L 252 396 L 238 406 L 225 418 L 215 432 L 208 445 L 204 458
                 L 202 470 L 198 482 L 188 492 L 175 498 L 162 500 L 150 498
                 L 140 492 L 134 482 L 132 470 L 128 456 L 122 444 L 112 434
                 L 100 426 L 88 420 L 76 416 L 66 412 L 58 404 L 54 394
                 L 52 380 L 50 365 L 48 350 L 46 334 L 44 318 L 46 302
                 L 50 288 L 56 276 L 60 262 L 62 248 L 60 234 L 56 220
                 L 52 206 L 50 192 L 52 178 L 58 165 L 66 154 L 62 142
                 L 58 130 L 56 116 L 58 102 L 64 90 L 72 78 L 82 68
                 L 94 60 L 108 52 L 124 46 L 140 40 L 156 34 L 172 26 L 190 20 Z"
              fill="#1A1208"
              stroke="rgba(200,136,42,0.3)"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />

            {/* Sombra interior suave */}
            <path
              d="M 218 18 L 235 16 L 255 18 L 272 22 L 285 30 L 296 42 L 302 55 L 306 70 L 308 90 L 305 108 L 298 118 L 310 124 L 322 132 L 330 145 L 332 158 L 328 170 L 318 178 L 322 192 L 330 208 L 334 225 L 332 242 L 324 256 L 318 270 L 316 285 L 318 300 L 322 315 L 326 330 L 324 345 L 316 358 L 302 370 L 285 380 L 268 388 L 252 396 L 238 406 L 225 418 L 215 432 L 208 445 L 204 458 L 202 470 L 198 482 L 188 492 L 175 498 L 162 500 L 150 498 L 140 492 L 134 482 L 132 470 L 128 456 L 122 444 L 112 434 L 100 426 L 88 420 L 76 416 L 66 412 L 58 404 L 54 394 L 52 380 L 50 365 L 48 350 L 46 334 L 44 318 L 46 302 L 50 288 L 56 276 L 60 262 L 62 248 L 60 234 L 56 220 L 52 206 L 50 192 L 52 178 L 58 165 L 66 154 L 62 142 L 58 130 L 56 116 L 58 102 L 64 90 L 72 78 L 82 68 L 94 60 L 108 52 L 124 46 L 140 40 L 156 34 L 172 26 L 190 20 Z"
              fill="none"
              stroke="rgba(200,136,42,0.08)"
              strokeWidth="8"
            />

            {/* Zonas de países iluminadas */}
            {/* Mauritania — noroeste */}
            <ellipse cx="100" cy="110" rx="32" ry="24" fill="rgba(200,136,42,0.12)" stroke="rgba(200,136,42,0.45)" strokeWidth="1"/>
            {/* Egipto — noreste */}
            <ellipse cx="270" cy="95" rx="30" ry="26" fill="rgba(192,57,43,0.12)" stroke="rgba(192,57,43,0.45)" strokeWidth="1"/>
            {/* Tanzania */}
            <ellipse cx="270" cy="318" rx="28" ry="24" fill="rgba(74,103,65,0.18)" stroke="rgba(74,103,65,0.5)" strokeWidth="1"/>
            {/* Kenia */}
            <ellipse cx="288" cy="280" rx="24" ry="20" fill="rgba(74,103,65,0.14)" stroke="rgba(74,103,65,0.4)" strokeWidth="1"/>
            {/* Zimbabwe */}
            <ellipse cx="240" cy="400" rx="24" ry="18" fill="rgba(122,155,114,0.16)" stroke="rgba(122,155,114,0.4)" strokeWidth="1"/>
            {/* Sudáfrica */}
            <ellipse cx="162" cy="475" rx="34" ry="18" fill="rgba(200,136,42,0.1)" stroke="rgba(200,136,42,0.3)" strokeWidth="1"/>

            {/* Ruta animada */}
            <path d="M 100 110 Q 190 55 270 95"  stroke="#C8882A" strokeWidth="1.8" fill="none" strokeDasharray="6 5" opacity="0.8" style={{animation:"dashMove 2s linear infinite"}} markerEnd="url(#arr)"/>
            <path d="M 270 95 Q 290 195 288 280"  stroke="#C8882A" strokeWidth="1.8" fill="none" strokeDasharray="6 5" opacity="0.8" style={{animation:"dashMove 2s linear infinite",animationDelay:"0.3s"}} markerEnd="url(#arr)"/>
            <path d="M 288 280 Q 282 298 270 318" stroke="#C8882A" strokeWidth="1.8" fill="none" strokeDasharray="6 5" opacity="0.8" style={{animation:"dashMove 2s linear infinite",animationDelay:"0.6s"}}/>
            <path d="M 270 318 Q 258 360 240 400" stroke="#C8882A" strokeWidth="1.8" fill="none" strokeDasharray="6 5" opacity="0.8" style={{animation:"dashMove 2s linear infinite",animationDelay:"0.9s"}} markerEnd="url(#arr)"/>
            <path d="M 240 400 Q 205 438 162 475" stroke="#C8882A" strokeWidth="1.8" fill="none" strokeDasharray="6 5" opacity="0.8" style={{animation:"dashMove 2s linear infinite",animationDelay:"1.2s"}} markerEnd="url(#arr)"/>

            {/* Puntos con glow */}
            {/* Mauritania */}
            <circle cx="100" cy="110" r="7" fill="rgba(200,136,42,0.2)" filter="url(#softglow)"/>
            <circle cx="100" cy="110" r="4.5" fill="#C8882A" filter="url(#glow)" style={{animation:"glowpulse 2.5s ease-in-out infinite"}}/>
            {/* Egipto */}
            <circle cx="270" cy="95" r="7" fill="rgba(192,57,43,0.2)" filter="url(#softglow)"/>
            <circle cx="270" cy="95" r="4.5" fill="#C0392B" filter="url(#glow)" style={{animation:"glowpulse 2.5s ease-in-out infinite",animationDelay:"0.4s"}}/>
            {/* Tanzania */}
            <circle cx="270" cy="318" r="7" fill="rgba(74,103,65,0.2)" filter="url(#softglow)"/>
            <circle cx="270" cy="318" r="4.5" fill="#4A6741" filter="url(#glow)" style={{animation:"glowpulse 2.5s ease-in-out infinite",animationDelay:"0.8s"}}/>
            {/* Kenia */}
            <circle cx="288" cy="280" r="7" fill="rgba(74,103,65,0.2)" filter="url(#softglow)"/>
            <circle cx="288" cy="280" r="4.5" fill="#5A8050" filter="url(#glow)" style={{animation:"glowpulse 2.5s ease-in-out infinite",animationDelay:"1s"}}/>
            {/* Zimbabwe */}
            <circle cx="240" cy="400" r="7" fill="rgba(122,155,114,0.2)" filter="url(#softglow)"/>
            <circle cx="240" cy="400" r="4.5" fill="#7A9B72" filter="url(#glow)" style={{animation:"glowpulse 2.5s ease-in-out infinite",animationDelay:"1.3s"}}/>
            {/* Sudáfrica */}
            <circle cx="162" cy="475" r="7" fill="rgba(200,136,42,0.2)" filter="url(#softglow)"/>
            <circle cx="162" cy="475" r="4.5" fill="#C8882A" filter="url(#glow)" style={{animation:"glowpulse 2.5s ease-in-out infinite",animationDelay:"1.6s"}}/>

            {/* Etiquetas — lado izquierdo para países del oeste, derecho para el este */}
            {/* Mauritania */}
            <text x="136" y="107" fill="#E8A84A" fontSize="11" fontFamily="'Bebas Neue', sans-serif" letterSpacing="1.5">MAURITANIA</text>
            <text x="136" y="120" fill="rgba(212,196,168,0.55)" fontSize="8.5" fontFamily="sans-serif">4 días · Tren de hierro</text>

            {/* Egipto — izq */}
            <text x="60" y="90" fill="#E8A84A" fontSize="11" fontFamily="'Bebas Neue', sans-serif" letterSpacing="1.5">EGIPTO</text>
            <text x="60" y="103" fill="rgba(212,196,168,0.55)" fontSize="8.5" fontFamily="sans-serif">6 días · Pirámides · Nilo</text>
            <line x1="90" y1="96" x2="266" y2="96" stroke="rgba(200,136,42,0.2)" strokeWidth="0.5" strokeDasharray="3 3"/>

            {/* Tanzania — derecha */}
            <text x="302" y="315" fill="#E8A84A" fontSize="11" fontFamily="'Bebas Neue', sans-serif" letterSpacing="1.5">TANZANIA</text>
            <text x="302" y="328" fill="rgba(212,196,168,0.55)" fontSize="8.5" fontFamily="sans-serif">8 días · Serengeti</text>

            {/* Kenia — izq */}
            <text x="62" y="276" fill="#E8A84A" fontSize="11" fontFamily="'Bebas Neue', sans-serif" letterSpacing="1.5">KENIA</text>
            <text x="62" y="289" fill="rgba(212,196,168,0.55)" fontSize="8.5" fontFamily="sans-serif">5 días · Masái Mara</text>
            <line x1="108" y1="282" x2="285" y2="282" stroke="rgba(200,136,42,0.2)" strokeWidth="0.5" strokeDasharray="3 3"/>

            {/* Zimbabwe — izq */}
            <text x="60" y="397" fill="#E8A84A" fontSize="11" fontFamily="'Bebas Neue', sans-serif" letterSpacing="1.5">ZIMBABWE</text>
            <text x="60" y="410" fill="rgba(212,196,168,0.55)" fontSize="8.5" fontFamily="sans-serif">3 días · Vic Falls</text>
            <line x1="120" y1="402" x2="233" y2="402" stroke="rgba(200,136,42,0.2)" strokeWidth="0.5" strokeDasharray="3 3"/>

            {/* Sudáfrica — derecha */}
            <text x="68" y="473" fill="#E8A84A" fontSize="11" fontFamily="'Bebas Neue', sans-serif" letterSpacing="1.5">SUDÁFRICA</text>
            <text x="68" y="486" fill="rgba(212,196,168,0.55)" fontSize="8.5" fontFamily="sans-serif">5 días · Ciudad del Cabo</text>

            {/* BsAs arrows */}
            <text x="20" y="115" fill="rgba(212,196,168,0.28)" fontSize="8" fontFamily="sans-serif">← Buenos Aires</text>
            <text x="68" y="500" fill="rgba(212,196,168,0.28)" fontSize="8" fontFamily="sans-serif">→ vuela a Buenos Aires</text>
          </svg>
        </div>
      </section>

      {/* ── GALERÍA ── */}
      <section style={{ background:"#100804", padding:"64px 0" }}>
        <div style={{ padding:"0 20px" }}>
          <p className="fade-up" style={{ fontFamily:"var(--font-caps)", letterSpacing:"0.3em", fontSize:11, color:"var(--savana)", marginBottom:8 }}>Imágenes</p>
          <h2 className="fade-up" style={{ fontFamily:"var(--font-title)", fontWeight:700, lineHeight:1.05, color:"var(--hueso)", fontSize:"clamp(32px,8vw,52px)", marginBottom:24 }}>
            Así es <em style={{ fontStyle:"italic", color:"var(--ocre)" }}>África</em>
          </h2>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:3, padding:"0 3px" }}>
          {GALERIA.map((g, i) => (
            <div key={i} className="fade-up" style={{ position:"relative", aspectRatio:"1/1", overflow:"hidden" }}>
              <Image src={g.src} alt={g.alt} fill style={{ objectFit:"cover", filter:"saturate(0.8) brightness(0.85)", transition:"transform 0.5s ease, filter 0.5s ease" }}
                onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform="scale(1.06)"; (e.currentTarget as HTMLImageElement).style.filter="saturate(1) brightness(0.9)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform="scale(1)"; (e.currentTarget as HTMLImageElement).style.filter="saturate(0.8) brightness(0.85)"; }}
                sizes="33vw"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── PAÍSES CARDS ── */}
      <section style={{ background:"#150D06", padding:"64px 20px" }}>
        <p className="fade-up" style={{ fontFamily:"var(--font-caps)", letterSpacing:"0.3em", fontSize:11, color:"var(--savana)", marginBottom:8 }}>País por país</p>
        <h2 className="fade-up" style={{ fontFamily:"var(--font-title)", fontWeight:700, lineHeight:1.05, color:"var(--hueso)", fontSize:"clamp(32px,8vw,52px)", marginBottom:6 }}>
          Qué hacer en <em style={{ fontStyle:"italic", color:"var(--ocre)" }}>cada uno</em>
        </h2>
        <p className="fade-up" style={{ fontSize:15, color:"var(--ceniza)", marginBottom:28 }}>Tocá cada país para ver el detalle.</p>

        <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
          {PAISES.map((p) => (
            <div key={p.id} style={{ position:"relative", overflow:"hidden", borderRadius:3 }}>
              <div
                style={{ position:"relative", height:220, cursor:"pointer", overflow:"hidden" }}
                onClick={() => setOpenCard(openCard === p.id ? null : p.id)}
              >
                <Image src={p.img} alt={p.name} fill style={{ objectFit:"cover", filter:"saturate(0.85) brightness(0.7)", transition:"transform 0.6s ease, filter 0.6s ease", transform: openCard === p.id ? "scale(1.04)" : "scale(1)" }} sizes="100vw"/>
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(26,16,8,0.95) 0%, rgba(26,16,8,0.35) 55%, transparent 100%)", display:"flex", flexDirection:"column", justifyContent:"flex-end", padding:20 }}>
                  <div style={{ fontSize:22, marginBottom:6 }}>{p.flag}</div>
                  <div style={{ fontFamily:"var(--font-caps)", fontSize:11, letterSpacing:"0.22em", color:"var(--savana)" }}>{p.num} · {p.name.toUpperCase()}</div>
                  <div style={{ fontFamily:"var(--font-title)", fontSize:32, fontWeight:900, color:"var(--hueso)", lineHeight:1, margin:"4px 0 2px" }}>{p.name}</div>
                  <div style={{ fontSize:13, color:"var(--ceniza)", fontFamily:"var(--font-caps)", letterSpacing:"0.12em" }}>{p.dias}</div>
                </div>
                <div style={{
                  position:"absolute", top:16, right:16, width:28, height:28,
                  borderRadius:"50%",
                  border:`1px solid ${openCard === p.id ? "var(--savana)" : "rgba(200,136,42,0.5)"}`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  color: openCard === p.id ? "#fff" : "var(--ocre)",
                  fontSize:18, transition:"all 0.3s",
                  transform: openCard === p.id ? "rotate(45deg)" : "none",
                  background: openCard === p.id ? "var(--savana)" : "rgba(26,16,8,0.7)",
                }}>+</div>
              </div>

              {openCard === p.id && (
                <div style={{ background:"#1C1006", borderTop:"1px solid rgba(200,136,42,0.15)", padding:"24px 20px" }}>
                  <div style={{ fontFamily:"var(--font-caps)", letterSpacing:"0.2em", fontSize:11, color:"var(--savana)", marginBottom:10 }}>ACTIVIDADES</div>
                  <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:8, marginBottom:20 }}>
                    {p.actividades.map((a, i) => (
                      <li key={i} style={{ display:"flex", gap:10, fontSize:16, color:"var(--ceniza)", lineHeight:1.4 }}>
                        <span style={{ color:"var(--savana)", flexShrink:0 }}>—</span>{a}
                      </li>
                    ))}
                  </ul>
                  <div style={{ background:"rgba(200,136,42,0.1)", borderLeft:"2px solid var(--savana)", padding:"10px 14px", fontSize:15, color:"var(--arena)", fontStyle:"italic", borderRadius:"0 2px 2px 0", marginBottom:12 }}>
                    {p.highlight}
                  </div>
                  <span style={{ display:"inline-block", background:"rgba(200,136,42,0.15)", border:"1px solid rgba(200,136,42,0.3)", color:"var(--ocre)", fontSize:10, fontFamily:"var(--font-caps)", letterSpacing:"0.15em", padding:"2px 8px", borderRadius:2 }}>
                    {p.visa}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section style={{ background:"var(--carbon)", padding:"64px 20px" }}>
        <p className="fade-up" style={{ fontFamily:"var(--font-caps)", letterSpacing:"0.3em", fontSize:11, color:"var(--savana)", marginBottom:8 }}>El recorrido</p>
        <h2 className="fade-up" style={{ fontFamily:"var(--font-title)", fontWeight:700, lineHeight:1.05, color:"var(--hueso)", fontSize:"clamp(32px,8vw,52px)", marginBottom:32 }}>
          33 días, <em style={{ fontStyle:"italic", color:"var(--ocre)" }}>día por día</em>
        </h2>

        <div style={{ position:"relative" }}>
          <div style={{ position:"absolute", left:18, top:0, bottom:0, width:1, background:"linear-gradient(to bottom, var(--savana), transparent)" }}/>
          {TIMELINE.map((t, i) => (
            <div key={i} className="fade-up" style={{ display:"flex", gap:20, paddingBottom:28, position:"relative" }}>
              <div style={{ flexShrink:0, width:36, height:36, borderRadius:"50%", background:"var(--noche)", border:"2px solid var(--savana)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"var(--font-caps)", fontSize:11, color:"var(--ocre)", zIndex:1 }}>
                {t.dot}
              </div>
              <div>
                <div style={{ fontFamily:"var(--font-caps)", fontSize:11, letterSpacing:"0.2em", color:"var(--savana)", marginBottom:3 }}>{t.days}</div>
                <div style={{ fontFamily:"var(--font-title)", fontSize:21, fontWeight:700, color:"var(--arena)", marginBottom:3, lineHeight:1.1 }}>{t.place}</div>
                <div style={{ fontSize:15, color:"var(--ceniza)", lineHeight:1.5 }}>{t.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRESUPUESTO ── */}
      <section style={{ background:"var(--noche)", padding:"64px 20px" }}>
        <p className="fade-up" style={{ fontFamily:"var(--font-caps)", letterSpacing:"0.3em", fontSize:11, color:"var(--savana)", marginBottom:8 }}>Plata</p>
        <h2 className="fade-up" style={{ fontFamily:"var(--font-title)", fontWeight:700, lineHeight:1.05, color:"var(--hueso)", fontSize:"clamp(32px,8vw,52px)", marginBottom:6 }}>
          El <em style={{ fontStyle:"italic", color:"var(--ocre)" }}>presupuesto</em>
        </h2>
        <p className="fade-up" style={{ fontSize:15, color:"var(--ceniza)", marginBottom:20 }}>Por persona, en USD. Grupo de 4–6 personas.</p>

        <div className="fade-up" style={{ display:"flex", gap:0, border:"1px solid rgba(200,136,42,0.3)", borderRadius:3, overflow:"hidden", marginBottom:24 }}>
          {(["mid","high"] as const).map((t) => (
            <button key={t} onClick={() => setBudget(t)} style={{ flex:1, padding:"11px 16px", fontFamily:"var(--font-caps)", letterSpacing:"0.15em", fontSize:13, background: budget===t ? "var(--savana)" : "transparent", color: budget===t ? "var(--noche)" : "var(--ceniza)", border:"none", cursor:"pointer", transition:"all 0.2s" }}>
              {t === "mid" ? "Mid-range" : "Premium"}
            </button>
          ))}
        </div>

        <div className="fade-up" style={{ textAlign:"center", padding:"32px 20px", background:"#1C1006", border:"1px solid rgba(200,136,42,0.2)", borderRadius:4, marginBottom:24 }}>
          <div style={{ fontFamily:"var(--font-caps)", letterSpacing:"0.2em", fontSize:12, color:"var(--savana)", marginBottom:8 }}>TOTAL ESTIMADO POR PERSONA</div>
          <div style={{ fontFamily:"var(--font-title)", fontSize:60, fontWeight:900, color:"var(--ocre)", lineHeight:1 }}>{bd.total}</div>
          <div style={{ fontSize:14, color:"var(--ceniza)", marginTop:6, fontStyle:"italic" }}>{bd.sub}</div>
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          {([["vuelos","Vuelos"],["aloja","Alojamiento"],["safari","Safaris & Parques"],["tours","Actividades & Tours"],["extras","Comida & Extras"],["visas","Visas & Seguro"]] as const).map(([k, label]) => (
            <div key={k} className="fade-up">
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:6 }}>
                <span style={{ fontFamily:"var(--font-caps)", letterSpacing:"0.15em", fontSize:13, color:"var(--arena)" }}>{label}</span>
                <span style={{ fontSize:15, fontWeight:600, color:"var(--ocre)" }}>${(bd[k][0] as number).toLocaleString('en-US')}</span>
              </div>
              <div style={{ height:6, background:"rgba(255,255,255,0.07)", borderRadius:3, overflow:"hidden" }}>
                <div style={{ height:"100%", borderRadius:3, background:"linear-gradient(to right, var(--tierra), var(--savana))", width:`${bd[k][1]}%`, transition:"width 0.6s ease" }}/>
              </div>
            </div>
          ))}
        </div>
        <p style={{ fontSize:13, color:"rgba(212,196,168,0.35)", marginTop:16, fontStyle:"italic" }}>* El globo aerostático sobre el Serengeti (~$500) no está incluido en mid-range. En premium, sí.</p>
      </section>

      {/* ── SAFARIS & TOURS ── */}
      <section style={{ background:"#150D06", padding:"64px 20px" }}>
        <p className="fade-up" style={{ fontFamily:"var(--font-caps)", letterSpacing:"0.3em", fontSize:11, color:"var(--savana)", marginBottom:8 }}>Experiencias</p>
        <h2 className="fade-up" style={{ fontFamily:"var(--font-title)", fontWeight:700, lineHeight:1.05, color:"var(--hueso)", fontSize:"clamp(32px,8vw,52px)", marginBottom:28 }}>
          Safaris <em style={{ fontStyle:"italic", color:"var(--ocre)" }}>&amp;</em> tours
        </h2>
        <div style={{ display:"grid", gridTemplateColumns:"1fr", gap:12 }}>
          {SAFARIS.map((s, i) => (
            <div key={i} className="fade-up" style={{ display:"flex", gap:16, padding:18, background:"rgba(255,255,255,0.02)", border:"1px solid rgba(200,136,42,0.14)", borderRadius:3 }}>
              <span style={{ fontSize:28, flexShrink:0, marginTop:2 }}>{s.icon}</span>
              <div>
                <div style={{ fontFamily:"var(--font-caps)", fontSize:10, letterSpacing:"0.2em", color:"var(--savana)", marginBottom:4 }}>{s.loc}</div>
                <div style={{ fontFamily:"var(--font-title)", fontSize:19, fontWeight:700, color:"var(--arena)", marginBottom:4 }}>{s.title}</div>
                <div style={{ fontSize:15, color:"var(--ceniza)", lineHeight:1.5, marginBottom:8 }}>{s.desc}</div>
                <span style={{ display:"inline-block", background:"rgba(200,136,42,0.13)", border:"1px solid rgba(200,136,42,0.28)", color:"var(--ocre)", fontSize:10, fontFamily:"var(--font-caps)", letterSpacing:"0.12em", padding:"2px 8px", borderRadius:2 }}>{s.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CLIMA ── */}
      <section style={{ background:"var(--carbon)", padding:"64px 20px" }}>
        <p className="fade-up" style={{ fontFamily:"var(--font-caps)", letterSpacing:"0.3em", fontSize:11, color:"var(--savana)", marginBottom:8 }}>Cuándo ir</p>
        <h2 className="fade-up" style={{ fontFamily:"var(--font-title)", fontWeight:700, lineHeight:1.05, color:"var(--hueso)", fontSize:"clamp(32px,8vw,52px)", marginBottom:8 }}>
          Épocas <em style={{ fontStyle:"italic", color:"var(--ocre)" }}>del año</em>
        </h2>
        <p className="fade-up" style={{ fontSize:15, color:"var(--ceniza)", maxWidth:480, marginBottom:24 }}>Julio–agosto es el sweet spot. Temporada seca, fauna concentrada, y la Gran Migración en su pico.</p>

        <div className="fade-up" style={{ overflowX:"auto" }}>
          <table style={{ minWidth:340, width:"100%", borderCollapse:"separate", borderSpacing:3 }}>
            <thead>
              <tr>
                <th style={{ padding:"8px 6px", fontSize:11, fontFamily:"var(--font-caps)", letterSpacing:"0.1em", color:"var(--ceniza)", textAlign:"left", fontWeight:400 }}></th>
                {["ABR","MAY","JUN","JUL","AGO","SEP"].map(m => (
                  <th key={m} style={{ padding:"8px 4px", fontSize:11, fontFamily:"var(--font-caps)", letterSpacing:"0.08em", color: ["JUN","JUL","AGO"].includes(m) ? "var(--ocre)" : "var(--ceniza)", textAlign:"center", fontWeight: ["JUN","JUL","AGO"].includes(m) ? 700 : 400 }}>{m}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { flag:"🇲🇷", name:"Mauritania", vals:["ok","ok","ideal","ideal","ok","bad"] },
                { flag:"🇪🇬", name:"Egipto",     vals:["ideal","ok","ok","ok","ok","ideal"] },
                { flag:"🇹🇿", name:"Tanzania",   vals:["bad","bad","ideal","ideal","ideal","ok"] },
                { flag:"🇰🇪", name:"Kenia",      vals:["bad","bad","ideal","ideal","ideal","ok"] },
                { flag:"🇿🇼", name:"Zimbabwe",   vals:["bad","ok","ideal","ideal","ideal","ok"] },
                { flag:"🇿🇦", name:"Sudáfrica",  vals:["ok","ok","ideal","ideal","ideal","ok"] },
              ].map(row => (
                <tr key={row.name}>
                  <td style={{ padding:"8px 4px", fontSize:12, fontFamily:"var(--font-caps)", letterSpacing:"0.06em", color:"var(--arena)", whiteSpace:"nowrap" }}>{row.flag} {row.name}</td>
                  {row.vals.map((v, i) => (
                    <td key={i} style={{ padding:"8px 4px", textAlign:"center", fontSize:11, fontFamily:"var(--font-caps)", borderRadius:2,
                      background: v==="ideal" ? "rgba(74,103,65,0.55)" : v==="ok" ? "rgba(200,136,42,0.22)" : "rgba(255,255,255,0.04)",
                      color: v==="ideal" ? "#A8D49A" : v==="ok" ? "var(--ocre)" : "rgba(212,196,168,0.3)",
                    }}>{v==="ideal" ? "★" : v==="ok" ? "OK" : "—"}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="fade-up" style={{ display:"flex", gap:16, marginTop:14, flexWrap:"wrap" }}>
          {[["rgba(74,103,65,0.7)","Ideal — temporada seca"],["rgba(200,136,42,0.4)","Aceptable"],["rgba(255,255,255,0.08)","Lluvia / no recomendado"]].map(([bg,label]) => (
            <div key={label} style={{ display:"flex", alignItems:"center", gap:6, fontSize:13, color:"var(--ceniza)" }}>
              <div style={{ width:10, height:10, borderRadius:2, background:bg, flexShrink:0 }}/>
              {label}
            </div>
          ))}
        </div>
      </section>

      {/* ── VUELOS ── */}
      <section style={{ background:"var(--noche)", padding:"64px 20px" }}>
        <p className="fade-up" style={{ fontFamily:"var(--font-caps)", letterSpacing:"0.3em", fontSize:11, color:"var(--savana)", marginBottom:8 }}>Cómo llegar</p>
        <h2 className="fade-up" style={{ fontFamily:"var(--font-title)", fontWeight:700, lineHeight:1.05, color:"var(--hueso)", fontSize:"clamp(32px,8vw,52px)", marginBottom:28 }}>
          Los <em style={{ fontStyle:"italic", color:"var(--ocre)" }}>vuelos</em>
        </h2>
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {[
            { from:"EZE → MAD", to:"Buenos Aires → Madrid", detail:"Iberia / Aerolíneas / Air Europa · ~13h", price:"~$700–900", color:"var(--savana)" },
            { from:"MAD → CMN → NDB", to:"Madrid → Casablanca → Nuadibú", detail:"Iberia + Royal Air Maroc · 2 tramos", price:"~$330–550", color:"var(--savana)" },
            { from:"NDB → CMN → CAI", to:"Nuadibú → Casablanca → El Cairo", detail:"Royal Air Maroc. 6 vuelos/semana NDB–CMN", price:"~$500–800", color:"#C0392B" },
            { from:"CAI → NBO/JRO", to:"El Cairo → Nairobi o Arusha", detail:"EgyptAir directo · ~5–6h", price:"~$250–400", color:"#4A6741" },
            { from:"Vuelos internos",  to:"Zanzíbar, Nairobi, Vic Falls, JNB", detail:"Precision Air, Kenya Airways, FlySafair", price:"~$500–860", color:"#4A6741" },
            { from:"JNB → GRU → EZE", to:"Johannesburgo → São Paulo → BsAs", detail:"LATAM · vuelo nocturno · 1 escala", price:"~$870–1.100", color:"var(--savana)" },
          ].map((f, i) => (
            <div key={i} className="fade-up" style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", padding:"16px 18px", background:"rgba(255,255,255,0.03)", border:"1px solid rgba(200,136,42,0.14)", borderRadius:3, gap:12 }}>
              <div>
                <div style={{ fontFamily:"var(--font-caps)", fontSize:13, letterSpacing:"0.12em", color: f.color, marginBottom:3 }}>{f.from}</div>
                <div style={{ fontSize:15, color:"var(--arena)", marginBottom:2 }}>{f.to}</div>
                <div style={{ fontSize:13, color:"var(--ceniza)" }}>{f.detail}</div>
              </div>
              <div style={{ fontSize:15, fontWeight:600, color:"var(--ocre)", whiteSpace:"nowrap", marginTop:4 }}>{f.price}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CHECKLIST ── */}
      <section style={{ background:"#150D06", padding:"64px 20px" }}>
        <p className="fade-up" style={{ fontFamily:"var(--font-caps)", letterSpacing:"0.3em", fontSize:11, color:"var(--savana)", marginBottom:8 }}>Preparación</p>
        <h2 className="fade-up" style={{ fontFamily:"var(--font-title)", fontWeight:700, lineHeight:1.05, color:"var(--hueso)", fontSize:"clamp(32px,8vw,52px)", marginBottom:6 }}>
          Antes de <em style={{ fontStyle:"italic", color:"var(--ocre)" }}>subir al avión</em>
        </h2>
        <p className="fade-up" style={{ fontSize:15, color:"var(--ceniza)", marginBottom:28 }}>Tachá lo que ya tenés listo.</p>

        <div style={{ display:"flex", flexDirection:"column", gap:28 }}>
          {Object.entries(CHECK_ITEMS).map(([group, items]) => (
            <div key={group} className="fade-up">
              <div style={{ fontFamily:"var(--font-caps)", letterSpacing:"0.2em", fontSize:12, color:"var(--savana)", marginBottom:12 }}>{group.toUpperCase()}</div>
              <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:10 }}>
                {items.map((item) => {
                  const key = `${group}:${item}`;
                  const isChecked = checked.has(key);
                  return (
                    <li key={item} style={{ display:"flex", gap:12, cursor:"pointer", alignItems:"flex-start" }} onClick={() => toggleCheck(key)}>
                      <div style={{
                        flexShrink:0, width:18, height:18,
                        border: `1.5px solid ${isChecked ? "var(--savana)" : "rgba(200,136,42,0.45)"}`,
                        borderRadius:2, marginTop:2,
                        display:"flex", alignItems:"center", justifyContent:"center",
                        background: isChecked ? "var(--savana)" : "transparent",
                        transition:"all 0.2s", fontSize:11, color:"#fff",
                      }}>
                        {isChecked && "✓"}
                      </div>
                      <span style={{ fontSize:16, color: isChecked ? "rgba(212,196,168,0.45)" : "var(--ceniza)", textDecoration: isChecked ? "line-through" : "none", lineHeight:1.4, transition:"all 0.2s" }}>
                        {item}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background:"var(--carbon)", padding:"64px 20px" }}>
        <p className="fade-up" style={{ fontFamily:"var(--font-caps)", letterSpacing:"0.3em", fontSize:11, color:"var(--savana)", marginBottom:8 }}>Dudas</p>
        <h2 className="fade-up" style={{ fontFamily:"var(--font-title)", fontWeight:700, lineHeight:1.05, color:"var(--hueso)", fontSize:"clamp(32px,8vw,52px)", marginBottom:28 }}>
          Preguntas <em style={{ fontStyle:"italic", color:"var(--ocre)" }}>frecuentes</em>
        </h2>
        <div>
          {FAQS.map((f, i) => (
            <div key={i} className="fade-up" style={{ borderTop:"1px solid rgba(200,136,42,0.15)", ...(i===FAQS.length-1 ? {borderBottom:"1px solid rgba(200,136,42,0.15)"} : {}) }}>
              <button onClick={() => setOpenFaq(openFaq===i ? null : i)} style={{ width:"100%", background:"none", border:"none", textAlign:"left", padding:"18px 0", cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center", gap:12 }}>
                <span style={{ fontFamily:"var(--font-title)", fontSize:18, color:"var(--arena)", fontWeight:700 }}>{f.q}</span>
                <span style={{ flexShrink:0, width:24, height:24, border:`1px solid ${openFaq===i ? "var(--savana)" : "rgba(200,136,42,0.4)"}`, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", color: openFaq===i ? "#fff" : "var(--ocre)", fontSize:14, transition:"all 0.3s", transform: openFaq===i ? "rotate(45deg)" : "none", background: openFaq===i ? "var(--savana)" : "transparent" }}>+</span>
              </button>
              {openFaq === i && <div style={{ paddingBottom:20, fontSize:16, color:"var(--ceniza)", lineHeight:1.65 }}>{f.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* ── CIERRE ── */}
      <section style={{ position:"relative", textAlign:"center", padding:"90px 20px 70px", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(26,16,8,0.92) 0%, rgba(26,16,8,0.55) 50%, rgba(26,16,8,0.92) 100%)" }}/>
        <Image src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1400&q=85&auto=format&fit=crop" alt="Desierto africano" fill style={{ objectFit:"cover", zIndex:-1, filter:"saturate(0.7)" }}/>
        <div style={{ position:"relative" }} className="fade-up">
          <h2 style={{ fontFamily:"var(--font-title)", fontWeight:900, lineHeight:0.9, color:"var(--hueso)", fontSize:"clamp(38px,11vw,76px)", marginBottom:12 }}>
            El que tenga<br/><em style={{ fontStyle:"italic", color:"var(--ocre)" }}>huevos,</em><br/>lo hace.
          </h2>
          <div style={{ width:48, height:2, background:"var(--savana)", margin:"24px auto" }}/>
          <p style={{ fontSize:17, color:"var(--ceniza)", fontStyle:"italic", maxWidth:340, margin:"0 auto", lineHeight:1.6 }}>Treinta y tres días. Seis países. Un solo viaje que vale por diez.</p>
          <p style={{ fontFamily:"var(--font-caps)", letterSpacing:"0.25em", fontSize:12, color:"var(--savana)", marginTop:28 }}>ÁFRICA CON CABALLEROS · 2027</p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background:"var(--carbon)", borderTop:"1px solid rgba(200,136,42,0.2)", padding:"24px 20px", textAlign:"center" }}>
        <p style={{ fontSize:12, color:"rgba(212,196,168,0.35)", fontFamily:"var(--font-caps)", letterSpacing:"0.15em" }}>
          ÁFRICA CON CABALLEROS &nbsp;·&nbsp; EXPEDICIÓN 2027 &nbsp;·&nbsp; 6 PAÍSES · 33 DÍAS
        </p>
      </footer>
      </div>
    </>
  );
}
