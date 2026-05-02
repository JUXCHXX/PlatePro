import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Palette, UtensilsCrossed, Megaphone, Smartphone, Rocket, MapPin, Sparkles, Check } from "lucide-react";
import { TEMPLATES } from "@/store/useApp";
import heroMockup from "@/assets/hero-mockup.jpg";

const features = [
  { icon: Palette, title: "10 plantillas para restaurantes", desc: "Elige y personaliza en segundos. Diseñadas por chefs y diseñadores." },
  { icon: UtensilsCrossed, title: "Menú digital completo", desc: "Fotos, precios, categorías, disponibilidad. Todo organizado." },
  { icon: Megaphone, title: "Ofertas que convierten", desc: "Descuentos, 2x1, banners llamativos con countdown." },
  { icon: Smartphone, title: "WhatsApp y redes sociales", desc: "Todo conectado. Tus clientes a un tap de distancia." },
  { icon: Rocket, title: "Publica en 1 clic", desc: "Tu página lista al instante. Comparte el link y listo." },
  { icon: MapPin, title: "Google Maps integrado", desc: "Que te encuentren fácil con un mapa interactivo." },
];

const steps = [
  { n: "01", title: "Crea tu cuenta gratis", desc: "Sin tarjeta de crédito. Sin trampas." },
  { n: "02", title: "Elige tu plantilla", desc: "10 diseños listos para tu tipo de restaurante." },
  { n: "03", title: "Agrega tu menú", desc: "Fotos, precios y categorías en minutos." },
  { n: "04", title: "Publica y comparte", desc: "Tu link único listo para WhatsApp y redes." },
];

export default function Marketing() {
  return (
    <div className="min-h-screen bg-background">
      {/* HERO */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,hsl(var(--brand)/0.15),transparent_50%)]" />
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-card/50 backdrop-blur text-sm text-muted-foreground mb-6">
              <Sparkles className="h-4 w-4 text-brand" />
              100% gratis · Sin tarjeta de crédito
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight">
              Tu restaurante merece <br />
              <span className="text-gradient-brand">una página que venda</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Crea tu landing page en minutos. Menú digital, ofertas, redes sociales.
              Sin código. Gratis.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" asChild className="bg-gradient-brand hover:opacity-90 text-base h-12 px-8 shadow-elegant">
                <Link to="/auth/register">Crear mi página gratis <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="h-12 px-8">
                <a href="#templates">Ver ejemplos</a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-16 relative max-w-4xl mx-auto"
          >
            <div className="absolute inset-0 bg-gradient-brand opacity-20 blur-3xl rounded-full" />
            <img src={heroMockup} alt="PlatePro app preview" width={1280} height={960} className="relative w-full rounded-2xl shadow-elegant" />
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 border-t border-border/40">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold">Todo lo que necesitas, nada de más</h2>
            <p className="mt-4 text-muted-foreground text-lg">Diseñado pensando en restaurantes reales.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group p-8 rounded-2xl border border-border bg-gradient-card hover:border-brand/50 transition-all hover:-translate-y-1"
              >
                <div className="h-12 w-12 rounded-xl bg-brand/10 grid place-items-center mb-5 group-hover:bg-brand/20 transition-colors">
                  <f.icon className="h-6 w-6 text-brand" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                <p className="text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TEMPLATES */}
      <section id="templates" className="py-24 border-t border-border/40 bg-card/20">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-bold">10 plantillas. Cero límites.</h2>
            <p className="mt-4 text-muted-foreground text-lg">Cada plantilla es única. Pensada para un tipo de cocina.</p>
          </div>
          <div className="overflow-x-auto scrollbar-hide -mx-6 px-6">
            <div className="flex gap-5 pb-4 min-w-max">
              {TEMPLATES.map((t, i) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className="w-72 rounded-2xl border border-border overflow-hidden bg-gradient-card group hover:border-brand/50 transition-all"
                >
                  <div className="h-44 relative" style={{ background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})` }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-3 left-3 text-xs font-medium px-2 py-1 rounded-md bg-black/40 backdrop-blur text-white">
                      {t.id.replace("template_", "Tema ")}
                    </div>
                  </div>
                  <div className="p-5">
                    <h4 className="font-semibold text-lg">{t.name}</h4>
                    <p className="text-sm text-muted-foreground">{t.tagline}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-24 border-t border-border/40">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold">Listo en 4 pasos</h2>
            <p className="mt-4 text-muted-foreground text-lg">No se necesita experiencia técnica.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="relative p-6 rounded-2xl border border-border bg-card"
              >
                <div className="text-5xl font-display font-bold text-gradient-brand mb-4">{s.n}</div>
                <h3 className="font-semibold text-lg mb-1">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-border/40">
        <div className="container">
          <div className="relative max-w-4xl mx-auto p-12 md:p-16 rounded-3xl bg-gradient-brand text-center overflow-hidden shadow-elegant">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent_50%)]" />
            <div className="relative">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white">Empieza hoy. Es gratis.</h2>
              <p className="mt-4 text-white/90 text-lg">Únete a cientos de restaurantes que ya venden más con PlatePro.</p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/90">
                <span className="inline-flex items-center gap-1.5"><Check className="h-4 w-4" /> Sin tarjeta</span>
                <span className="inline-flex items-center gap-1.5"><Check className="h-4 w-4" /> Listo en minutos</span>
                <span className="inline-flex items-center gap-1.5"><Check className="h-4 w-4" /> Soporte en español</span>
              </div>
              <Button size="lg" asChild className="mt-8 h-12 px-8 bg-white text-brand hover:bg-white/90">
                <Link to="/auth/register">Crear mi página gratis <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-border/40">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-md bg-gradient-brand grid place-items-center text-primary-foreground font-bold text-sm">P</div>
            <span className="font-display text-lg font-bold">PlatePro</span>
          </div>
          <p className="text-sm text-muted-foreground">Hecho con ❤️ para restaurantes de Latinoamérica</p>
        </div>
      </footer>
    </div>
  );
}
