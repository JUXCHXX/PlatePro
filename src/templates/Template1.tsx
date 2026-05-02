import type { TemplateData } from "./shared";
import { fmt, waLink, DAYS_ES } from "./shared";
import { MapPin, Phone, Instagram, Facebook, Youtube, MessageCircle, Clock, Flame } from "lucide-react";

export default function Template1({ data }: { data: TemplateData }) {
  const r = data.restaurant;
  const v = r.visible_sections;
  const activeOffers = data.offers.filter((o) => o.is_active);

  return (
    <div className="min-h-screen text-white font-oswald" style={{ background: "#0D0D0D" }}>
      {/* HERO */}
      {v.hero && (
        <section className="relative min-h-[90vh] flex items-end overflow-hidden">
          {r.cover_url && <img src={r.cover_url} alt={r.name} className="absolute inset-0 w-full h-full object-cover" />}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
          <div className="relative z-10 container py-16 md:py-24">
            {r.logo_url && <img src={r.logo_url} alt="" className="h-20 w-20 rounded-full object-cover mb-6 border-2" style={{ borderColor: r.primary_color }} />}
            <div className="inline-flex items-center gap-2 mb-4 text-sm uppercase tracking-[0.3em]" style={{ color: r.primary_color }}>
              <Flame className="h-4 w-4" /> Brasa & Fuego
            </div>
            <h1 className="text-6xl md:text-8xl font-bold uppercase tracking-tight leading-none">{r.name}</h1>
            {r.description && <p className="mt-6 max-w-xl text-lg text-white/80">{r.description}</p>}
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#menu" className="px-8 py-4 font-bold uppercase tracking-wide hover:scale-105 transition" style={{ background: r.primary_color }}>Ver menú</a>
              {r.whatsapp && <a href={waLink(r.whatsapp)} target="_blank" rel="noreferrer" className="px-8 py-4 font-bold uppercase border-2 border-white/30 hover:border-white transition">WhatsApp</a>}
            </div>
          </div>
        </section>
      )}

      {/* OFFERS */}
      {v.offers && activeOffers.length > 0 && (
        <section className="py-12 border-y-2" style={{ borderColor: r.primary_color }}>
          <div className="container space-y-3">
            {activeOffers.map((o) => (
              <div key={o.id} className="p-6 flex items-center gap-4" style={{ background: o.banner_color + "20", borderLeft: `4px solid ${o.banner_color}` }}>
                <Flame className="h-8 w-8" style={{ color: o.banner_color }} />
                <div className="flex-1">
                  <div className="font-bold text-2xl uppercase">{o.title}</div>
                  {o.description && <div className="text-white/70">{o.description}</div>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* MENU */}
      {v.menu && (
        <section id="menu" className="py-20">
          <div className="container">
            <div className="text-center mb-14">
              <div className="text-sm uppercase tracking-[0.4em] mb-3" style={{ color: r.primary_color }}>El menú</div>
              <h2 className="text-5xl md:text-6xl font-bold uppercase">Sabor a fuego</h2>
            </div>
            {data.categories.map((c) => {
              const items = data.items.filter((i) => i.category_id === c.id);
              if (items.length === 0) return null;
              return (
                <div key={c.id} className="mb-14">
                  <h3 className="text-3xl font-bold uppercase mb-6 flex items-center gap-3">
                    <span>{c.emoji}</span> {c.name}
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {items.map((it) => (
                      <div key={it.id} className="border border-white/10 hover:border-current transition group" style={{ color: r.primary_color }}>
                        {it.image_url && <div className="aspect-[4/3] overflow-hidden"><img src={it.image_url} alt={it.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" /></div>}
                        <div className="p-5 text-white">
                          <div className="flex justify-between items-start gap-3">
                            <div className="font-bold text-xl uppercase">{it.name}</div>
                            <div className="text-right">
                              <div className="font-bold text-lg" style={{ color: r.primary_color }}>{fmt(it.price)}</div>
                              {it.original_price && <div className="text-xs line-through text-white/40">{fmt(it.original_price)}</div>}
                            </div>
                          </div>
                          {it.description && <p className="text-white/60 text-sm mt-2">{it.description}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* HOURS */}
      {v.hours && r.open_hours && (
        <section className="py-16 bg-white/5">
          <div className="container">
            <h2 className="text-4xl font-bold uppercase mb-8 flex items-center gap-3"><Clock /> Horarios</h2>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-2 max-w-2xl">
              {Object.entries(DAYS_ES).map(([k, label]) => {
                const d = r.open_hours![k as keyof typeof r.open_hours] as { enabled: boolean; open: string; close: string };
                return (
                  <div key={k} className="flex justify-between py-2 border-b border-white/10 uppercase">
                    <span>{label}</span>
                    <span style={{ color: d?.enabled ? r.primary_color : undefined }} className={!d?.enabled ? "text-white/40" : ""}>
                      {d?.enabled ? `${d.open} – ${d.close}` : "Cerrado"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CONTACT */}
      {v.socials && (
        <section className="py-16">
          <div className="container">
            <h2 className="text-4xl font-bold uppercase mb-8">Encuéntranos</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
              {r.whatsapp && <a href={waLink(r.whatsapp)} target="_blank" rel="noreferrer" className="p-5 bg-green-600 flex items-center gap-3 hover:opacity-90"><MessageCircle /> WhatsApp</a>}
              {r.phone && <a href={`tel:${r.phone}`} className="p-5 border border-white/20 flex items-center gap-3 hover:bg-white/5"><Phone /> {r.phone}</a>}
              {r.instagram_url && <a href={r.instagram_url} target="_blank" rel="noreferrer" className="p-5 border border-white/20 flex items-center gap-3 hover:bg-white/5"><Instagram /> Instagram</a>}
              {r.facebook_url && <a href={r.facebook_url} target="_blank" rel="noreferrer" className="p-5 border border-white/20 flex items-center gap-3 hover:bg-white/5"><Facebook /> Facebook</a>}
              {r.youtube_url && <a href={r.youtube_url} target="_blank" rel="noreferrer" className="p-5 border border-white/20 flex items-center gap-3 hover:bg-white/5"><Youtube /> YouTube</a>}
              {r.address && <div className="p-5 border border-white/20 flex items-center gap-3"><MapPin /> {r.address}</div>}
            </div>
          </div>
        </section>
      )}

      <footer className="py-8 border-t border-white/10 text-center text-white/40 text-sm">
        <div className="container">© {new Date().getFullYear()} {r.name} · Hecho con <a href="/" className="hover:text-white">PlatePro</a></div>
      </footer>
    </div>
  );
}
