import { useApp } from "@/store/useApp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Copy, Share2 } from "lucide-react";
import { slugify } from "@/lib/slug";
import { useState } from "react";

type DayKey = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
const DAYS: { key: DayKey; label: string }[] = [
  { key: "monday", label: "Lunes" },
  { key: "tuesday", label: "Martes" },
  { key: "wednesday", label: "Miércoles" },
  { key: "thursday", label: "Jueves" },
  { key: "friday", label: "Viernes" },
  { key: "saturday", label: "Sábado" },
  { key: "sunday", label: "Domingo" },
];

export default function DashboardSettings() {
  const data = useApp((s) => s.getCurrent())!;
  const update = useApp((s) => s.updateRestaurant);
  const r = data.restaurant;
  const [slugInput, setSlugInput] = useState(r.slug);

  const url = `${window.location.origin}/r/${r.slug}`;

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto">
      <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Configuración</h1>
      <p className="text-muted-foreground mb-8">Toda la información de tu restaurante</p>

      <Tabs defaultValue="restaurant">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6">
          <TabsTrigger value="restaurant">Mi restaurante</TabsTrigger>
          <TabsTrigger value="social">Redes y contacto</TabsTrigger>
          <TabsTrigger value="hours">Horarios</TabsTrigger>
          <TabsTrigger value="url">Mi URL</TabsTrigger>
        </TabsList>

        <TabsContent value="restaurant">
          <Card className="p-6 space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <Label>Logo (URL)</Label>
                <Input value={r.logo_url || ""} onChange={(e) => update({ logo_url: e.target.value })} placeholder="https://..." className="mt-1.5" />
              </div>
              <div>
                <Label>Foto de portada (URL)</Label>
                <Input value={r.cover_url || ""} onChange={(e) => update({ cover_url: e.target.value })} placeholder="https://..." className="mt-1.5" />
              </div>
            </div>
            <div>
              <Label>Nombre del restaurante</Label>
              <Input value={r.name} onChange={(e) => update({ name: e.target.value })} className="mt-1.5" />
            </div>
            <div>
              <Label>Descripción <span className="text-muted-foreground text-xs">({(r.description || "").length}/160)</span></Label>
              <Textarea maxLength={160} value={r.description || ""} onChange={(e) => update({ description: e.target.value })} className="mt-1.5" rows={3} />
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <Label>Dirección</Label>
                <Input value={r.address || ""} onChange={(e) => update({ address: e.target.value })} className="mt-1.5" />
              </div>
              <div>
                <Label>Ciudad</Label>
                <Input value={r.city || ""} onChange={(e) => update({ city: e.target.value })} className="mt-1.5" />
              </div>
              <div>
                <Label>Teléfono</Label>
                <Input value={r.phone || ""} onChange={(e) => update({ phone: e.target.value })} className="mt-1.5" />
              </div>
              <div>
                <Label>Email</Label>
                <Input value={r.email || ""} onChange={(e) => update({ email: e.target.value })} className="mt-1.5" />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="social">
          <Card className="p-6 space-y-5">
            <div>
              <Label>WhatsApp <span className="text-muted-foreground text-xs">(con código de país)</span></Label>
              <Input value={r.whatsapp || ""} onChange={(e) => update({ whatsapp: e.target.value })} placeholder="+573001234567" className="mt-1.5" />
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <div><Label>Facebook</Label><Input value={r.facebook_url || ""} onChange={(e) => update({ facebook_url: e.target.value })} className="mt-1.5" /></div>
              <div><Label>Instagram</Label><Input value={r.instagram_url || ""} onChange={(e) => update({ instagram_url: e.target.value })} className="mt-1.5" /></div>
              <div><Label>TikTok</Label><Input value={r.tiktok_url || ""} onChange={(e) => update({ tiktok_url: e.target.value })} className="mt-1.5" /></div>
              <div><Label>YouTube</Label><Input value={r.youtube_url || ""} onChange={(e) => update({ youtube_url: e.target.value })} className="mt-1.5" /></div>
              <div><Label>Google Maps (link)</Label><Input value={r.google_maps_url || ""} onChange={(e) => update({ google_maps_url: e.target.value })} className="mt-1.5" /></div>
              <div><Label>Sitio web</Label><Input value={r.website || ""} onChange={(e) => update({ website: e.target.value })} className="mt-1.5" /></div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="hours">
          <Card className="p-6 space-y-3">
            {DAYS.map((d) => {
              const day = r.open_hours?.[d.key];
              return (
                <div key={d.key} className="flex items-center gap-4 py-2 border-b border-border last:border-0">
                  <div className="w-28 font-medium">{d.label}</div>
                  <Switch
                    checked={!!day?.enabled}
                    onCheckedChange={(v) => update({ open_hours: { ...r.open_hours!, [d.key]: { ...day!, enabled: v } } })}
                  />
                  {day?.enabled ? (
                    <div className="flex items-center gap-2">
                      <Input type="time" value={day.open} onChange={(e) => update({ open_hours: { ...r.open_hours!, [d.key]: { ...day, open: e.target.value } } })} className="w-32" />
                      <span className="text-muted-foreground">a</span>
                      <Input type="time" value={day.close} onChange={(e) => update({ open_hours: { ...r.open_hours!, [d.key]: { ...day, close: e.target.value } } })} className="w-32" />
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground">Cerrado</span>
                  )}
                </div>
              );
            })}
            <div>
              <Label>Horario especial (opcional)</Label>
              <Input value={r.open_hours?.special || ""} onChange={(e) => update({ open_hours: { ...r.open_hours!, special: e.target.value } })} placeholder="Ej: Cerrado feriados" className="mt-1.5" />
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="url">
          <Card className="p-6 space-y-5">
            <div>
              <Label>URL de tu página</Label>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-muted-foreground text-sm">{window.location.origin}/r/</span>
                <Input value={slugInput} onChange={(e) => setSlugInput(slugify(e.target.value))} />
              </div>
              <Button className="mt-3" onClick={() => { update({ slug: slugInput }); toast.success("URL actualizada"); }}>Guardar URL</Button>
            </div>
            <div className="p-4 rounded-lg bg-muted">
              <div className="text-xs text-muted-foreground mb-1">Tu URL pública</div>
              <div className="font-mono text-sm break-all">{url}</div>
              <div className="flex gap-2 mt-3">
                <Button size="sm" variant="outline" onClick={() => { navigator.clipboard.writeText(url); toast.success("Copiado"); }}>
                  <Copy className="h-3.5 w-3.5 mr-1.5" />Copiar
                </Button>
                <Button size="sm" variant="outline" onClick={async () => {
                  if (navigator.share) await navigator.share({ url, title: r.name });
                  else { navigator.clipboard.writeText(url); toast.success("Copiado"); }
                }}>
                  <Share2 className="h-3.5 w-3.5 mr-1.5" />Compartir
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
