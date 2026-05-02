import { useState } from "react";
import { useApp } from "@/store/useApp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Pencil, Trash2, Copy, Megaphone } from "lucide-react";
import type { Offer, DiscountType } from "@/types";
import { toast } from "sonner";

const COLORS = ["#E85D24", "#7C3AED", "#22C55E", "#3B82F6", "#EC4899", "#F59E0B", "#0EA5E9", "#DC2626"];

export default function DashboardOffers() {
  const data = useApp((s) => s.getCurrent())!;
  const { addOffer, updateOffer, deleteOffer } = useApp();
  const [modal, setModal] = useState<Offer | "new" | null>(null);

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl md:text-4xl font-bold">Ofertas</h1>
          <p className="text-muted-foreground mt-1">{data.offers.filter((o) => o.is_active).length} activas · {data.offers.length} totales</p>
        </div>
        <Button onClick={() => setModal("new")} className="bg-gradient-brand"><Plus className="h-4 w-4 mr-1.5" />Nueva oferta</Button>
      </div>

      {data.offers.length === 0 ? (
        <Card className="p-12 text-center border-dashed">
          <Megaphone className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
          <h3 className="font-semibold text-lg">Aún no tienes ofertas</h3>
          <p className="text-muted-foreground mb-4">Las ofertas atraen clientes y aumentan ventas</p>
          <Button onClick={() => setModal("new")} className="bg-gradient-brand">Crear mi primera oferta</Button>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.offers.map((o) => (
            <Card key={o.id} className="overflow-hidden">
              <div className="h-32 relative" style={{ backgroundColor: o.banner_color }}>
                {o.image_url && <img src={o.image_url} className="w-full h-full object-cover opacity-70" alt="" />}
                <div className="absolute inset-0 p-4 flex flex-col justify-between text-white">
                  <Badge variant="secondary" className="self-start text-xs">
                    {o.discount_type === "percentage" && `${o.discount_value}% OFF`}
                    {o.discount_type === "fixed" && `-$${o.discount_value}`}
                    {o.discount_type === "2x1" && "2x1"}
                    {o.discount_type === "free_item" && "GRATIS"}
                  </Badge>
                  <div>
                    <div className="font-bold text-lg leading-tight">{o.title}</div>
                  </div>
                </div>
              </div>
              <div className="p-4 space-y-3">
                <div className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5em]">{o.description}</div>
                <div className="flex items-center justify-between">
                  <Badge variant={o.is_active ? "default" : "secondary"} className={o.is_active ? "bg-green-500" : ""}>
                    {o.is_active ? "Activa" : "Inactiva"}
                  </Badge>
                  <div className="flex gap-1">
                    <button onClick={() => { addOffer({ ...o, title: o.title + " (copia)" }); toast.success("Oferta duplicada"); }} className="p-1.5 hover:bg-muted rounded" title="Duplicar"><Copy className="h-4 w-4" /></button>
                    <button onClick={() => setModal(o)} className="p-1.5 hover:bg-muted rounded"><Pencil className="h-4 w-4" /></button>
                    <button onClick={() => { deleteOffer(o.id); toast.success("Eliminada"); }} className="p-1.5 hover:bg-destructive hover:text-white rounded"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <OfferModal open={modal} onClose={() => setModal(null)}
        onSave={(o) => {
          if (modal === "new") { addOffer(o); toast.success("Oferta creada"); }
          else if (modal) { updateOffer(modal.id, o); toast.success("Actualizada"); }
        }}
      />
    </div>
  );
}

function OfferModal({ open, onClose, onSave }: {
  open: Offer | "new" | null; onClose: () => void;
  onSave: (o: Omit<Offer, "id" | "restaurant_id">) => void;
}) {
  const cur = open && open !== "new" ? open : null;
  const [title, setTitle] = useState(cur?.title || "");
  const [description, setDescription] = useState(cur?.description || "");
  const [type, setType] = useState<DiscountType>(cur?.discount_type || "percentage");
  const [value, setValue] = useState(cur?.discount_value?.toString() || "");
  const [color, setColor] = useState(cur?.banner_color || COLORS[0]);
  const [isActive, setIsActive] = useState(cur?.is_active ?? true);
  const [endsAt, setEndsAt] = useState(cur?.ends_at?.slice(0, 10) || "");

  useState(() => {
    if (open) {
      setTitle(cur?.title || ""); setDescription(cur?.description || "");
      setType(cur?.discount_type || "percentage"); setValue(cur?.discount_value?.toString() || "");
      setColor(cur?.banner_color || COLORS[0]); setIsActive(cur?.is_active ?? true);
      setEndsAt(cur?.ends_at?.slice(0, 10) || "");
    }
  });

  return (
    <Dialog open={!!open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader><DialogTitle>{open === "new" ? "Nueva oferta" : "Editar oferta"}</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div><Label>Título</Label><Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Combo de verano 🌞" className="mt-1.5" /></div>
          <div><Label>Descripción</Label><Textarea value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1.5" rows={2} /></div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Tipo de descuento</Label>
              <Select value={type} onValueChange={(v) => setType(v as DiscountType)}>
                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Porcentaje (%)</SelectItem>
                  <SelectItem value="fixed">Valor fijo</SelectItem>
                  <SelectItem value="2x1">2x1</SelectItem>
                  <SelectItem value="free_item">Producto gratis</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {(type === "percentage" || type === "fixed") && (
              <div><Label>Valor</Label><Input type="number" value={value} onChange={(e) => setValue(e.target.value)} className="mt-1.5" /></div>
            )}
          </div>
          <div>
            <Label>Color del banner</Label>
            <div className="flex gap-2 mt-1.5 flex-wrap">
              {COLORS.map((c) => (
                <button key={c} onClick={() => setColor(c)} className={`h-9 w-9 rounded-lg border-2 transition-all ${color === c ? "border-foreground scale-110" : "border-transparent"}`} style={{ backgroundColor: c }} />
              ))}
            </div>
          </div>
          <div><Label>Termina el (opcional)</Label><Input type="date" value={endsAt} onChange={(e) => setEndsAt(e.target.value)} className="mt-1.5" /></div>
          <div className="flex items-center justify-between rounded-lg border p-3"><Label>Activa</Label><Switch checked={isActive} onCheckedChange={setIsActive} /></div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={() => {
            if (!title) return toast.error("Falta título");
            onSave({
              title, description, discount_type: type,
              discount_value: value ? parseFloat(value) : undefined,
              banner_color: color, is_active: isActive,
              ends_at: endsAt ? new Date(endsAt).toISOString() : undefined,
            });
            onClose();
          }} className="bg-gradient-brand">Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
