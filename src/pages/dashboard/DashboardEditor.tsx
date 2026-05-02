import { useApp, TEMPLATES, COLOR_PRESETS } from "@/store/useApp";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Smartphone, Monitor, ExternalLink, Sparkles, Check } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { TemplateRenderer } from "@/templates/TemplateRenderer";

const FONTS = [
  { id: "modern", label: "Modern", className: "font-sans" },
  { id: "elegant", label: "Elegant", className: "font-display" },
  { id: "playful", label: "Playful", className: "font-poppins" },
  { id: "bold", label: "Bold", className: "font-bebas" },
];

const SECTIONS = [
  { key: "hero", label: "Hero" }, { key: "menu", label: "Menú" },
  { key: "offers", label: "Ofertas" }, { key: "hours", label: "Horarios" },
  { key: "socials", label: "Redes" }, { key: "map", label: "Mapa" },
] as const;

export default function DashboardEditor() {
  const data = useApp((s) => s.getCurrent())!;
  const update = useApp((s) => s.updateRestaurant);
  const publish = useApp((s) => s.publish);
  const r = data.restaurant;
  const [device, setDevice] = useState<"mobile" | "desktop">("desktop");

  return (
    <div className="h-[calc(100vh-3.5rem)] md:h-screen flex flex-col">
      <div className="h-14 border-b border-border bg-card flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-3">
          <h2 className="font-semibold">Editor visual</h2>
          <div className="flex rounded-lg border border-border overflow-hidden">
            <button onClick={() => setDevice("desktop")} className={cn("p-1.5 px-2", device === "desktop" ? "bg-brand text-white" : "")}><Monitor className="h-4 w-4" /></button>
            <button onClick={() => setDevice("mobile")} className={cn("p-1.5 px-2", device === "mobile" ? "bg-brand text-white" : "")}><Smartphone className="h-4 w-4" /></button>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild><Link to={`/r/${r.slug}?preview=1`} target="_blank"><ExternalLink className="h-4 w-4 mr-1.5" />Vista previa</Link></Button>
          <Button size="sm" onClick={() => { publish(); toast.success("¡Publicado!"); }} className="bg-gradient-brand"><Sparkles className="h-4 w-4 mr-1.5" />Publicar</Button>
        </div>
      </div>

      <div className="flex-1 grid lg:grid-cols-[300px_1fr] min-h-0">
        {/* Left panel */}
        <aside className="border-r border-border overflow-y-auto bg-card">
          <Tabs defaultValue="template" className="p-4">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="template">Tema</TabsTrigger>
              <TabsTrigger value="colors">Color</TabsTrigger>
              <TabsTrigger value="font">Fuente</TabsTrigger>
              <TabsTrigger value="sections">Sec.</TabsTrigger>
            </TabsList>

            <TabsContent value="template" className="space-y-2 mt-4">
              {TEMPLATES.map((t) => (
                <button key={t.id} onClick={() => update({ template_id: t.id })}
                  className={cn("w-full p-3 rounded-xl border-2 flex items-center gap-3 text-left transition", r.template_id === t.id ? "border-brand bg-brand/10" : "border-border hover:border-muted-foreground")}>
                  <div className="h-10 w-14 rounded-md shrink-0" style={{ background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})` }} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold truncate">{t.name}</div>
                    <div className="text-xs text-muted-foreground truncate">{t.tagline}</div>
                  </div>
                  {r.template_id === t.id && <Check className="h-4 w-4 text-brand shrink-0" />}
                </button>
              ))}
            </TabsContent>

            <TabsContent value="colors" className="space-y-4 mt-4">
              <div>
                <Label className="text-sm">Paletas</Label>
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {COLOR_PRESETS.map((p) => (
                    <button key={p.primary} onClick={() => update({ primary_color: p.primary, secondary_color: p.secondary })}
                      className={cn("h-12 rounded-lg border-2 transition", r.primary_color === p.primary ? "border-foreground scale-105" : "border-transparent")}
                      style={{ background: `linear-gradient(135deg, ${p.primary}, ${p.secondary})` }} />
                  ))}
                </div>
              </div>
              <div>
                <Label className="text-sm">Color primario</Label>
                <input type="color" value={r.primary_color} onChange={(e) => update({ primary_color: e.target.value })} className="mt-1.5 w-full h-10 rounded cursor-pointer" />
              </div>
              <div>
                <Label className="text-sm">Color secundario</Label>
                <input type="color" value={r.secondary_color} onChange={(e) => update({ secondary_color: e.target.value })} className="mt-1.5 w-full h-10 rounded cursor-pointer" />
              </div>
            </TabsContent>

            <TabsContent value="font" className="space-y-2 mt-4">
              {FONTS.map((f) => (
                <button key={f.id} onClick={() => update({ font_style: f.id })}
                  className={cn("w-full p-3 rounded-xl border-2 text-left transition", r.font_style === f.id ? "border-brand bg-brand/10" : "border-border")}>
                  <div className={cn("text-xl", f.className)}>Aa</div>
                  <div className="text-sm font-medium mt-1">{f.label}</div>
                </button>
              ))}
            </TabsContent>

            <TabsContent value="sections" className="space-y-3 mt-4">
              {SECTIONS.map((s) => (
                <div key={s.key} className="flex items-center justify-between p-3 rounded-lg border border-border">
                  <Label>{s.label}</Label>
                  <Switch checked={r.visible_sections[s.key]} onCheckedChange={(v) => update({ visible_sections: { ...r.visible_sections, [s.key]: v } })} />
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </aside>

        {/* Preview */}
        <div className="bg-muted/30 overflow-auto p-4 md:p-8">
          <div className={cn("mx-auto bg-background rounded-2xl border border-border shadow-elegant overflow-hidden transition-all", device === "mobile" ? "w-[390px] max-w-full" : "w-full max-w-[1100px]")}>
            <div className="origin-top" style={{ height: device === "mobile" ? 780 : 720, overflow: "auto" }}>
              <TemplateRenderer data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
