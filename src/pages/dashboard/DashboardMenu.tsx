import { useState } from "react";
import { useApp, formatPrice } from "@/store/useApp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, Star, Sparkles } from "lucide-react";
import type { MenuCategory, MenuItem } from "@/types";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function DashboardMenu() {
  const data = useApp((s) => s.getCurrent())!;
  const { addCategory, updateCategory, deleteCategory, addItem, updateItem, deleteItem } = useApp();
  const [selectedCat, setSelectedCat] = useState<string | null>(data.categories[0]?.id || null);
  const [catModal, setCatModal] = useState<MenuCategory | "new" | null>(null);
  const [itemModal, setItemModal] = useState<MenuItem | "new" | null>(null);

  const items = data.items.filter((i) => !selectedCat || i.category_id === selectedCat);

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl md:text-4xl font-bold">Menú</h1>
          <p className="text-muted-foreground mt-1">{data.items.length} productos · {data.categories.length} categorías</p>
        </div>
        <Button onClick={() => setItemModal("new")} className="bg-gradient-brand"><Plus className="h-4 w-4 mr-1.5" />Nuevo producto</Button>
      </div>

      <div className="grid lg:grid-cols-[260px_1fr] gap-6">
        {/* Categories */}
        <aside>
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Categorías</div>
            <Button size="sm" variant="ghost" onClick={() => setCatModal("new")}><Plus className="h-4 w-4" /></Button>
          </div>
          <div className="space-y-1.5">
            <button onClick={() => setSelectedCat(null)} className={cn("w-full text-left px-3 py-2 rounded-lg text-sm transition-colors", !selectedCat ? "bg-brand/15 text-brand" : "hover:bg-muted")}>
              Todos los productos <span className="text-muted-foreground">({data.items.length})</span>
            </button>
            {data.categories.map((c) => {
              const count = data.items.filter((i) => i.category_id === c.id).length;
              return (
                <div key={c.id} className={cn("group flex items-center gap-1 rounded-lg pr-1", selectedCat === c.id && "bg-brand/15")}>
                  <button onClick={() => setSelectedCat(c.id)} className={cn("flex-1 text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2", selectedCat === c.id ? "text-brand" : "hover:bg-muted")}>
                    <span>{c.emoji}</span>
                    <span className="flex-1 truncate">{c.name}</span>
                    <span className="text-xs text-muted-foreground">{count}</span>
                  </button>
                  <button onClick={() => setCatModal(c)} className="opacity-0 group-hover:opacity-100 p-1 hover:text-brand"><Pencil className="h-3.5 w-3.5" /></button>
                </div>
              );
            })}
          </div>
        </aside>

        {/* Items */}
        <div>
          {items.length === 0 ? (
            <Card className="p-12 text-center border-dashed">
              <p className="text-muted-foreground mb-4">No hay productos en esta categoría</p>
              <Button onClick={() => setItemModal("new")} className="bg-gradient-brand"><Plus className="h-4 w-4 mr-1.5" />Agregar producto</Button>
            </Card>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {items.map((it) => (
                <Card key={it.id} className="overflow-hidden group hover:border-brand/50 transition-all">
                  <div className="aspect-square bg-muted relative overflow-hidden">
                    {it.image_url ? <img src={it.image_url} alt={it.name} className="w-full h-full object-cover" /> : <div className="w-full h-full grid place-items-center text-muted-foreground text-4xl">🍽️</div>}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {it.is_featured && <Badge className="bg-brand text-white"><Star className="h-3 w-3 mr-1" />Destacado</Badge>}
                      {it.is_new && <Badge className="bg-green-500 text-white">Nuevo</Badge>}
                      {!it.is_available && <Badge variant="secondary">No disponible</Badge>}
                    </div>
                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition">
                      <button onClick={() => setItemModal(it)} className="h-8 w-8 rounded-lg bg-background/90 grid place-items-center hover:bg-background"><Pencil className="h-4 w-4" /></button>
                      <button onClick={() => { deleteItem(it.id); toast.success("Producto eliminado"); }} className="h-8 w-8 rounded-lg bg-background/90 grid place-items-center hover:bg-destructive hover:text-white"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="font-semibold truncate">{it.name}</div>
                    <div className="text-sm text-muted-foreground line-clamp-2 mt-0.5">{it.description}</div>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-lg font-bold">{formatPrice(it.price)}</span>
                      {it.original_price && <span className="text-sm text-muted-foreground line-through">{formatPrice(it.original_price)}</span>}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <CategoryModal open={catModal} onClose={() => setCatModal(null)}
        onSave={(c) => {
          if (catModal === "new") { addCategory(c); toast.success("Categoría creada"); }
          else if (catModal) { updateCategory(catModal.id, c); toast.success("Actualizada"); }
        }}
        onDelete={() => { if (catModal && catModal !== "new") { deleteCategory(catModal.id); toast.success("Categoría eliminada"); setSelectedCat(null); } }}
      />
      <ItemModal open={itemModal} categories={data.categories} onClose={() => setItemModal(null)}
        onSave={(it) => {
          if (itemModal === "new") { addItem(it); toast.success("Producto creado"); }
          else if (itemModal) { updateItem(itemModal.id, it); toast.success("Actualizado"); }
        }}
      />
    </div>
  );
}

function CategoryModal({ open, onClose, onSave, onDelete }: {
  open: MenuCategory | "new" | null; onClose: () => void;
  onSave: (c: Omit<MenuCategory, "id" | "restaurant_id" | "position">) => void; onDelete: () => void;
}) {
  const isNew = open === "new";
  const cur = open && open !== "new" ? open : null;
  const [name, setName] = useState(cur?.name || "");
  const [emoji, setEmoji] = useState(cur?.emoji || "🍽️");
  const [description, setDescription] = useState(cur?.description || "");
  const [is_active, setActive] = useState(cur?.is_active ?? true);

  useState(() => {
    if (open) { setName(cur?.name || ""); setEmoji(cur?.emoji || "🍽️"); setDescription(cur?.description || ""); setActive(cur?.is_active ?? true); }
  });

  return (
    <Dialog open={!!open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        <DialogHeader><DialogTitle>{isNew ? "Nueva categoría" : "Editar categoría"}</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-[80px_1fr] gap-3">
            <div><Label>Emoji</Label><Input value={emoji} onChange={(e) => setEmoji(e.target.value)} className="text-center text-2xl mt-1.5" /></div>
            <div><Label>Nombre</Label><Input value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5" placeholder="Entradas" /></div>
          </div>
          <div><Label>Descripción</Label><Textarea value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1.5" rows={2} /></div>
          <div className="flex items-center justify-between"><Label>Categoría activa</Label><Switch checked={is_active} onCheckedChange={setActive} /></div>
        </div>
        <DialogFooter className="flex-row justify-between sm:justify-between">
          {!isNew && <Button variant="ghost" className="text-destructive" onClick={() => { onDelete(); onClose(); }}>Eliminar</Button>}
          <div className="flex gap-2 ml-auto">
            <Button variant="outline" onClick={onClose}>Cancelar</Button>
            <Button onClick={() => { if (!name) return toast.error("Falta nombre"); onSave({ name, emoji, description, is_active }); onClose(); }} className="bg-gradient-brand">Guardar</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ItemModal({ open, categories, onClose, onSave }: {
  open: MenuItem | "new" | null; categories: MenuCategory[]; onClose: () => void;
  onSave: (it: Omit<MenuItem, "id" | "restaurant_id" | "position">) => void;
}) {
  const cur = open && open !== "new" ? open : null;
  const [name, setName] = useState(cur?.name || "");
  const [description, setDescription] = useState(cur?.description || "");
  const [price, setPrice] = useState(cur?.price?.toString() || "");
  const [originalPrice, setOriginalPrice] = useState(cur?.original_price?.toString() || "");
  const [imageUrl, setImageUrl] = useState(cur?.image_url || "");
  const [categoryId, setCategoryId] = useState(cur?.category_id || categories[0]?.id || "");
  const [isAvailable, setIsAvailable] = useState(cur?.is_available ?? true);
  const [isFeatured, setIsFeatured] = useState(cur?.is_featured ?? false);
  const [isNew, setIsNew] = useState(cur?.is_new ?? false);
  const [tags, setTags] = useState(cur?.tags?.join(", ") || "");

  useState(() => {
    if (open) {
      setName(cur?.name || ""); setDescription(cur?.description || "");
      setPrice(cur?.price?.toString() || ""); setOriginalPrice(cur?.original_price?.toString() || "");
      setImageUrl(cur?.image_url || ""); setCategoryId(cur?.category_id || categories[0]?.id || "");
      setIsAvailable(cur?.is_available ?? true); setIsFeatured(cur?.is_featured ?? false);
      setIsNew(cur?.is_new ?? false); setTags(cur?.tags?.join(", ") || "");
    }
  });

  return (
    <Dialog open={!!open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle>{open === "new" ? "Nuevo producto" : "Editar producto"}</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Imagen (URL)</Label>
            <Input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://..." className="mt-1.5" />
            {imageUrl && <img src={imageUrl} alt="" className="mt-2 w-32 h-32 object-cover rounded-lg" />}
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div><Label>Nombre</Label><Input value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5" /></div>
            <div>
              <Label>Categoría</Label>
              <Select value={categoryId} onValueChange={setCategoryId}>
                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>{categories.map((c) => <SelectItem key={c.id} value={c.id}>{c.emoji} {c.name}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>
          <div><Label>Descripción</Label><Textarea value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1.5" rows={2} /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><Label>Precio</Label><Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="mt-1.5" /></div>
            <div><Label>Precio original (opcional)</Label><Input type="number" value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} className="mt-1.5" /></div>
          </div>
          <div><Label>Tags (separados por coma)</Label><Input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="picante, vegetariano" className="mt-1.5" /></div>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center justify-between rounded-lg border p-3"><Label className="text-sm">Disponible</Label><Switch checked={isAvailable} onCheckedChange={setIsAvailable} /></div>
            <div className="flex items-center justify-between rounded-lg border p-3"><Label className="text-sm">Destacado</Label><Switch checked={isFeatured} onCheckedChange={setIsFeatured} /></div>
            <div className="flex items-center justify-between rounded-lg border p-3"><Label className="text-sm">Nuevo</Label><Switch checked={isNew} onCheckedChange={setIsNew} /></div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={() => {
            if (!name || !price) return toast.error("Nombre y precio requeridos");
            onSave({
              name, description, price: parseFloat(price),
              original_price: originalPrice ? parseFloat(originalPrice) : undefined,
              image_url: imageUrl, category_id: categoryId,
              is_available: isAvailable, is_featured: isFeatured, is_new: isNew,
              tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
            });
            onClose();
          }} className="bg-gradient-brand"><Sparkles className="h-4 w-4 mr-1.5" />Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
