import type { TemplateData } from "./shared";
import { fmt, waLink, DAYS_ES } from "./shared";
import { MapPin, Phone, Instagram, Facebook, Youtube, MessageCircle, Clock, Sparkles, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export type Variant = "fresco" | "noche" | "minimal" | "street" | "mar" | "pizza" | "cafe" | "fast" | "tradicional";

interface VariantConfig {
  bg: string;
  fg: string;
  muted: string;
  cardBg: string;
  border: string;
  accent: string;
  fontHeading: string;
  fontBody: string;
  heroAlign: "center" | "left";
  badge: string;
  itemLayout: "grid" | "list" | "polaroid" | "horizontal";
}

const VARIANTS: Record<Variant, VariantConfig> = {
  fresco:      { bg: "#FAFAF7", fg: "#0A0A0A", muted: "#6B7280", cardBg: "#FFFFFF", border: "#E5E7EB", accent: "#22C55E", fontHeading: "font-nunito", fontBody: "font-nunito", heroAlign: "center", badge: "Fresco Market", itemLayout: "grid" },
  noche:       { bg: "#0A0A0A", fg: "#F5F5F5", muted: "#A1A1AA", cardBg: "#141414", border: "#27272A", accent: "#F59E0B", fontHeading: "font-display", fontBody: "font-display", heroAlign: "center", badge: "Noche Latina", itemLayout: "list" },
  minimal:     { bg: "#FFFFFF", fg: "#000000", muted: "#525252", cardBg: "#FFFFFF", border: "#000000", accent: "#000000", fontHeading: "font-mono", fontBody: "font-mono", heroAlign: "left", badge: "minimal/bites", itemLayout: "list" },
  street:      { bg: "#FDE047", fg: "#18181B", muted: "#3F3F46", cardBg: "#18181B", border: "#18181B", accent: "#DC2626", fontHeading: "font-bebas", fontBody: "font-sans", heroAlign: "left", badge: "STREET FOOD", itemLayout: "grid" },
  mar:         { bg: "#1E3A5F", fg: "#F0FDFF", muted: "#A5D8E8", cardBg: "#234564", border: "#365976", accent: "#06B6D4", fontHeading: "font-raleway", fontBody: "font-raleway", heroAlign: "center", badge: "Mar y Tierra", itemLayout: "grid" },
  pizza:       { bg: "#FFFFFF", fg: "#1F2937", muted: "#6B7280", cardBg: "#FEFAF6", border: "#E5E7EB", accent: "#DC2626", fontHeading: "font-lora", fontBody: "font-lora", heroAlign: "center", badge: "Pizzeria Italiana", itemLayout: "list" },
  cafe:        { bg: "#F5F0E8", fg: "#451A03", muted: "#78350F", cardBg: "#FFFBF3", border: "#D6C7AC", accent: "#78350F", fontHeading: "font-cormorant", fontBody: "font-cormorant", heroAlign: "center", badge: "Café de Autor", itemLayout: "polaroid" },
  fast:        { bg: "#FFFFFF", fg: "#0F172A", muted: "#64748B", cardBg: "#FFFFFF", border: "#E2E8F0", accent: "#F97316", fontHeading: "font-poppins", fontBody: "font-poppins", heroAlign: "left", badge: "Fast & Fresh", itemLayout: "horizontal" },
  tradicional: { bg: "#FEF3C7", fg: "#451A03", muted: "#92400E", cardBg: "#FEF9E7", border: "#FCD34D", accent: "#C2410C", fontHeading: "font-merriweather", fontBody: "font-merriweather", heroAlign: "center", badge: "Cocina Tradicional", itemLayout: "grid" },
};

export default function BaseTemplate({ data, variant }: { data: TemplateData; variant: Variant }) {
  const r = data.restaurant;
  const v = r.visible_sections;
  const c = VARIANTS[variant];
  const accent = r.primary_color || c.accent;
  const activeOffers = data.offers.filter((o) => o.is_active);

  return (
    <div className={cn("min-h-screen", c.fontBody)} style={{ background: c.bg, color: c.fg }}>
      {/* HERO */}
      {v.hero && (
        <section className="relative overflow-hidden">
          {variant === "noche" || variant === "mar" ? (
            <div className="relative min-h-[80vh] flex items-center">
              {r.cover_url && <img src={r.cover_url} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />}
              <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, transparent, ${c.bg})` }} />
              <div className="relative container py-20 text-center">
                {r.logo_url && <img src={r.logo_url} alt="" className="h-20 w-20 rounded-full object-cover mb-6 mx-auto border-2" style={{ borderColor: accent }} />}
                <div className="text-xs uppercase tracking-[0.4em] mb-4" style={{ color: accent }}>{c.badge}</div>
                <h1 className={cn("text-5xl md:text-7xl font-bold leading-tight", c.fontHeading)}>{r.name}</h1>
                {r.description && <p className="mt-6 max-w-xl mx-auto text-lg opacity-80">{r.description}</p>}
                <a href="#menu" className="inline-block mt-8 px-8 py-3 rounded-full font-semibold transition hover:scale-105" style={{ background: accent, color: c.bg }}>Ver menú</a>
              </div>
            </div>
          ) : variant === "minimal" ? (
            <div className="container py-24">
              <div className="text-xs uppercase tracking-[0.5em] mb-6">{c.badge}</div>
              <h1 className={cn("text-6xl md:text-8xl font-bold leading-none", c.fontHeading)}>{r.name}.</h1>
              {r.description && <p className="mt-8 max-w-xl text-lg">{r.description}</p>}
              <a href="#menu" className="inline-block mt-10 px-6 py-3 border-2 border-current font-bold uppercase text-sm">[ ver menú ]</a>
            </div>
          ) : variant === "street" ? (
            <div className="container py-20 relative">
              <div className="inline-block px-4 py-1 mb-6 -rotate-2 text-white" style={{ background: accent }}>
                <span className={cn("font-bold text-lg tracking-widest", c.fontHeading)}>{c.badge}</span>
              </div>
              <h1 className={cn("text-7xl md:text-9xl leading-none -rotate-1", c.fontHeading)}>{r.name}</h1>
              {r.description && <p className="mt-8 max-w-xl text-lg font-medium">{r.description}</p>}
              <a href="#menu" className="inline-block mt-8 px-10 py-4 text-yellow-300 font-bold uppercase text-xl tracking-wider rotate-1 hover:rotate-0 transition" style={{ background: c.cardBg }}>¡A comer! →</a>
            </div>
          ) : (
            // Default centered with cover
            <div className="relative">
              {r.cover_url && (
                <div className="aspect-[16/7] w-full overflow-hidden">
                  <img src={r.cover_url} alt={r.name} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="container py-12 text-center">
                {r.logo_url && <img src={r.logo_url} alt="" className="h-24 w-24 rounded-full object-cover mb-4 mx-auto -mt-20 border-4 relative z-10" style={{ borderColor: c.bg }} />}
                <div className="text-xs uppercase tracking-[0.3em] mb-3" style={{ color: accent }}>{c.badge}</div>
                <h1 className={cn("text-5xl md:text-7xl font-bold", c.fontHeading)}>{r.name}</h1>
                {r.description && <p className="mt-4 max-w-2xl mx-auto opacity-80">{r.description}</p>}
                <a href="#menu" className="inline-block mt-8 px-8 py-3 rounded-full font-semibold text-white" style={{ background: accent }}>Ver menú</a>
              </div>
            </div>
          )}
        </section>
      )}

      {/* OFFERS */}
      {v.offers && activeOffers.length > 0 && (
        <section className="py-12">
          <div className="container space-y-3">
            {activeOffers.map((o) => (
              <div key={o.id} className="rounded-2xl p-6 text-white flex items-center gap-4" style={{ background: o.banner_color }}>
                <Sparkles className="h-7 w-7 shrink-0" />
                <div>
                  <div className="font-bold text-xl">{o.title}</div>
                  {o.description && <div className="opacity-90 text-sm">{o.description}</div>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* MENU */}
      {v.menu && (
        <section id="menu" className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <div className="text-xs uppercase tracking-[0.4em] mb-3" style={{ color: accent }}>Carta</div>
              <h2 className={cn("text-4xl md:text-5xl font-bold", c.fontHeading)}>Nuestro menú</h2>
            </div>

            {data.categories.map((cat) => {
              const items = data.items.filter((i) => i.category_id === cat.id);
              if (items.length === 0) return null;
              return (
                <div key={cat.id} className="mb-12">
                  <h3 className={cn("text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3", c.fontHeading)}>
                    <span>{cat.emoji}</span> {cat.name}
                  </h3>

                  {c.itemLayout === "list" && (
                    <div className="space-y-4">
                      {items.map((it) => (
                        <div key={it.id} className="flex justify-between gap-4 pb-4 border-b" style={{ borderColor: c.border }}>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <div className={cn("font-bold text-lg", c.fontHeading)}>{it.name}</div>
                              {it.is_featured && <Star className="h-4 w-4 fill-current" style={{ color: accent }} />}
                              {it.is_new && <span className="text-xs px-2 py-0.5 rounded-full text-white" style={{ background: accent }}>NUEVO</span>}
                            </div>
                            {it.description && <p className="text-sm opacity-70 mt-1">{it.description}</p>}
                          </div>
                          <div className="text-right">
                            <div className="font-bold" style={{ color: accent }}>{fmt(it.price)}</div>
                            {it.original_price && <div className="text-xs line-through opacity-50">{fmt(it.original_price)}</div>}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {c.itemLayout === "grid" && (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {items.map((it) => (
                        <div key={it.id} className="rounded-2xl overflow-hidden border transition hover:-translate-y-1" style={{ background: c.cardBg, borderColor: c.border }}>
                          {it.image_url && <div className="aspect-[4/3]"><img src={it.image_url} alt={it.name} className="w-full h-full object-cover" /></div>}
                          <div className="p-5">
                            <div className="flex items-start justify-between gap-3">
                              <div className={cn("font-bold text-lg", c.fontHeading)}>{it.name}</div>
                              {it.is_featured && <Star className="h-4 w-4 fill-current shrink-0" style={{ color: accent }} />}
                            </div>
                            {it.description && <p className="text-sm opacity-70 mt-1.5">{it.description}</p>}
                            <div className="mt-3 flex items-baseline gap-2">
                              <span className="font-bold text-lg" style={{ color: accent }}>{fmt(it.price)}</span>
                              {it.original_price && <span className="text-sm line-through opacity-50">{fmt(it.original_price)}</span>}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {c.itemLayout === "horizontal" && (
                    <div className="grid md:grid-cols-2 gap-4">
                      {items.map((it) => (
                        <div key={it.id} className="flex gap-4 p-3 rounded-2xl border" style={{ background: c.cardBg, borderColor: c.border }}>
                          {it.image_url && <img src={it.image_url} alt={it.name} className="w-28 h-28 rounded-xl object-cover shrink-0" />}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <div className={cn("font-bold", c.fontHeading)}>{it.name}</div>
                              {it.is_featured && <span className="text-xs px-1.5 py-0.5 rounded text-white" style={{ background: accent }}>★ Más pedido</span>}
                              {it.is_new && <span className="text-xs px-1.5 py-0.5 rounded bg-green-500 text-white">Nuevo</span>}
                            </div>
                            {it.description && <p className="text-sm opacity-70 mt-1 line-clamp-2">{it.description}</p>}
                            <div className="font-bold mt-2" style={{ color: accent }}>{fmt(it.price)}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {c.itemLayout === "polaroid" && (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                      {items.map((it, idx) => (
                        <div key={it.id} className="p-3 pb-6 shadow-lg rotate-[-1deg] hover:rotate-0 transition" style={{ background: c.cardBg, transform: `rotate(${(idx % 2 ? 1 : -1) * 1.5}deg)` }}>
                          {it.image_url && <div className="aspect-square mb-3"><img src={it.image_url} alt={it.name} className="w-full h-full object-cover" /></div>}
                          <div className={cn("text-center text-xl", c.fontHeading)}>{it.name}</div>
                          <div className="text-center mt-1 font-semibold" style={{ color: accent }}>{fmt(it.price)}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* HOURS */}
      {v.hours && r.open_hours && (
        <section className="py-12 border-t" style={{ borderColor: c.border }}>
          <div className="container">
            <h2 className={cn("text-3xl font-bold mb-6 flex items-center gap-2", c.fontHeading)}><Clock /> Horarios</h2>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-1 max-w-2xl">
              {Object.entries(DAYS_ES).map(([k, label]) => {
                const d = r.open_hours![k as keyof typeof r.open_hours] as { enabled: boolean; open: string; close: string };
                return (
                  <div key={k} className="flex justify-between py-2 border-b" style={{ borderColor: c.border }}>
                    <span className="font-medium">{label}</span>
                    <span style={{ color: d?.enabled ? accent : c.muted }}>{d?.enabled ? `${d.open} – ${d.close}` : "Cerrado"}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CONTACT */}
      {v.socials && (
        <section className="py-12 border-t" style={{ borderColor: c.border }}>
          <div className="container">
            <h2 className={cn("text-3xl font-bold mb-6", c.fontHeading)}>Contacto</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {r.whatsapp && <a href={waLink(r.whatsapp)} target="_blank" rel="noreferrer" className="p-4 rounded-xl bg-green-600 text-white flex items-center gap-3 hover:opacity-90"><MessageCircle /> Escríbenos por WhatsApp</a>}
              {r.phone && <a href={`tel:${r.phone}`} className="p-4 rounded-xl border flex items-center gap-3 hover:opacity-80" style={{ borderColor: c.border }}><Phone /> {r.phone}</a>}
              {r.address && <div className="p-4 rounded-xl border flex items-center gap-3" style={{ borderColor: c.border }}><MapPin /> {r.address}</div>}
              {r.instagram_url && <a href={r.instagram_url} target="_blank" rel="noreferrer" className="p-4 rounded-xl border flex items-center gap-3" style={{ borderColor: c.border }}><Instagram /> Instagram</a>}
              {r.facebook_url && <a href={r.facebook_url} target="_blank" rel="noreferrer" className="p-4 rounded-xl border flex items-center gap-3" style={{ borderColor: c.border }}><Facebook /> Facebook</a>}
              {r.youtube_url && <a href={r.youtube_url} target="_blank" rel="noreferrer" className="p-4 rounded-xl border flex items-center gap-3" style={{ borderColor: c.border }}><Youtube /> YouTube</a>}
            </div>
          </div>
        </section>
      )}

      {/* MAP */}
      {v.map && r.google_maps_url && (
        <section className="py-12 border-t" style={{ borderColor: c.border }}>
          <div className="container">
            <h2 className={cn("text-3xl font-bold mb-4 flex items-center gap-2", c.fontHeading)}><MapPin /> Cómo llegar</h2>
            <a href={r.google_maps_url} target="_blank" rel="noreferrer" className="block aspect-[16/9] rounded-2xl border overflow-hidden hover:opacity-90 transition" style={{ borderColor: c.border }}>
              <div className="w-full h-full grid place-items-center" style={{ background: `linear-gradient(135deg, ${accent}20, ${c.cardBg})` }}>
                <div className="text-center">
                  <MapPin className="h-12 w-12 mx-auto mb-3" style={{ color: accent }} />
                  <div className="font-semibold">Abrir en Google Maps</div>
                  {r.address && <div className="text-sm opacity-70 mt-1">{r.address}</div>}
                </div>
              </div>
            </a>
          </div>
        </section>
      )}

      <footer className="py-8 border-t text-center text-sm opacity-60" style={{ borderColor: c.border }}>
        <div className="container">© {new Date().getFullYear()} {r.name} · Hecho con <a href="/" className="underline">PlatePro</a></div>
      </footer>
    </div>
  );
}
