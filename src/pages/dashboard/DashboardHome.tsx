import { Link } from "react-router-dom";
import { useApp, TEMPLATES } from "@/store/useApp";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Plus, Palette, Megaphone, Eye, Globe, Copy, Sparkles, Check } from "lucide-react";
import { toast } from "sonner";

export default function DashboardHome() {
  const data = useApp((s) => s.getCurrent())!;
  const publish = useApp((s) => s.publish);
  const r = data.restaurant;
  const url = `${window.location.origin}/r/${r.slug}`;

  // completeness
  const checks = [
    { label: "Logo del restaurante", done: !!r.logo_url },
    { label: "Foto de portada", done: !!r.cover_url },
    { label: "Descripción", done: !!r.description },
    { label: "Datos de contacto (WhatsApp)", done: !!r.whatsapp },
    { label: "Al menos 3 productos en el menú", done: data.items.length >= 3 },
    { label: "Plantilla elegida", done: !!r.template_id },
  ];
  const done = checks.filter((c) => c.done).length;
  const pct = Math.round((done / checks.length) * 100);

  const tpl = TEMPLATES.find((t) => t.id === r.template_id);

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="font-display text-3xl md:text-4xl font-bold">¡Hola, {r.name}! 👋</h1>
        <p className="text-muted-foreground mt-1">Aquí tienes el resumen de tu página.</p>
      </div>

      {/* Status */}
      <Card className="p-6 bg-gradient-card border-border">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`h-12 w-12 rounded-xl grid place-items-center ${r.is_published ? "bg-green-500/15 text-green-400" : "bg-yellow-500/15 text-yellow-400"}`}>
              <Globe className="h-6 w-6" />
            </div>
            <div>
              <div className="font-semibold text-lg">{r.is_published ? "Tu página está publicada" : "Borrador sin publicar"}</div>
              {r.is_published ? (
                <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                  <span className="font-mono">{url}</span>
                  <button onClick={() => { navigator.clipboard.writeText(url); toast.success("URL copiada"); }} className="hover:text-foreground">
                    <Copy className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                <div className="text-sm text-muted-foreground mt-1">Publica para compartir el link con tus clientes</div>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            {r.is_published ? (
              <Button asChild variant="outline"><Link to={`/r/${r.slug}`} target="_blank"><Eye className="h-4 w-4 mr-2" />Ver página</Link></Button>
            ) : (
              <Button onClick={() => { publish(); toast.success("¡Tu página está publicada!"); }} className="bg-gradient-brand">
                <Sparkles className="h-4 w-4 mr-2" /> Publicar ahora
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Completeness */}
      <Card className="p-6 border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-lg">Completa tu perfil</h3>
            <p className="text-sm text-muted-foreground">Páginas más completas convierten más</p>
          </div>
          <div className="text-3xl font-display font-bold text-gradient-brand">{pct}%</div>
        </div>
        <Progress value={pct} className="h-2" />
        <ul className="mt-5 grid sm:grid-cols-2 gap-2.5">
          {checks.map((c) => (
            <li key={c.label} className="flex items-center gap-2 text-sm">
              <div className={`h-5 w-5 rounded-full grid place-items-center ${c.done ? "bg-green-500/20 text-green-400" : "bg-muted text-muted-foreground"}`}>
                {c.done && <Check className="h-3 w-3" />}
              </div>
              <span className={c.done ? "text-foreground" : "text-muted-foreground"}>{c.label}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Quick actions */}
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { to: "/dashboard/menu", icon: Plus, title: "Agregar producto", desc: "Suma platos a tu menú" },
          { to: "/dashboard/offers", icon: Megaphone, title: "Crear oferta", desc: "Atrae más clientes" },
          { to: "/dashboard/editor", icon: Palette, title: "Editar plantilla", desc: "Personaliza el diseño" },
        ].map((a) => (
          <Link key={a.to} to={a.to} className="group p-6 rounded-2xl border border-border bg-card hover:border-brand/50 hover:-translate-y-0.5 transition-all">
            <a.icon className="h-7 w-7 text-brand mb-3" />
            <div className="font-semibold">{a.title}</div>
            <div className="text-sm text-muted-foreground">{a.desc}</div>
          </Link>
        ))}
      </div>

      {/* Current template */}
      {tpl && (
        <Card className="p-6 border-border">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-24 rounded-lg" style={{ background: `linear-gradient(135deg, ${tpl.primary}, ${tpl.secondary})` }} />
              <div>
                <div className="text-xs uppercase tracking-wide text-muted-foreground">Plantilla actual</div>
                <div className="font-semibold text-lg">{tpl.name}</div>
                <div className="text-sm text-muted-foreground">{tpl.tagline}</div>
              </div>
            </div>
            <Button variant="outline" asChild><Link to="/dashboard/editor">Cambiar</Link></Button>
          </div>
        </Card>
      )}
    </div>
  );
}
