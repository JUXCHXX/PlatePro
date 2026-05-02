import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthUser, MenuCategory, MenuItem, Offer, Restaurant, TemplateId } from "@/types";
import { slugify, uid } from "@/lib/slug";

interface DemoData {
  restaurant: Restaurant;
  categories: MenuCategory[];
  items: MenuItem[];
  offers: Offer[];
}

function buildDemo(userId: string, name: string, city: string): DemoData {
  const rid = uid();
  const cats: MenuCategory[] = [
    { id: uid(), restaurant_id: rid, name: "Entradas", emoji: "🥗", position: 0, is_active: true, description: "Para abrir el apetito" },
    { id: uid(), restaurant_id: rid, name: "Platos fuertes", emoji: "🍖", position: 1, is_active: true, description: "Nuestras estrellas" },
    { id: uid(), restaurant_id: rid, name: "Postres", emoji: "🍰", position: 2, is_active: true, description: "El final perfecto" },
    { id: uid(), restaurant_id: rid, name: "Bebidas", emoji: "🥤", position: 3, is_active: true },
  ];
  const items: MenuItem[] = [
    { id: uid(), restaurant_id: rid, category_id: cats[0].id, name: "Patacones con hogao", description: "Crujientes patacones con hogao casero y suero costeño", price: 18000, image_url: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600", is_available: true, is_featured: false, is_new: true, tags: ["vegetariano"], position: 0 },
    { id: uid(), restaurant_id: rid, category_id: cats[0].id, name: "Ceviche del chef", description: "Pescado fresco curado en limón con cilantro y ají", price: 28000, image_url: "https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=600", is_available: true, is_featured: true, is_new: false, tags: ["picante"], position: 1 },
    { id: uid(), restaurant_id: rid, category_id: cats[1].id, name: "Bandeja paisa", description: "Frijoles, arroz, carne molida, chicharrón, huevo, plátano y aguacate", price: 38000, original_price: 45000, image_url: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600", is_available: true, is_featured: true, is_new: false, tags: ["tradicional"], position: 0 },
    { id: uid(), restaurant_id: rid, category_id: cats[1].id, name: "Lomo a la parrilla", description: "Lomo de res 300g con papas rústicas y chimichurri", price: 52000, image_url: "https://images.unsplash.com/photo-1546964124-0cce460f38ef?w=600", is_available: true, is_featured: true, is_new: false, tags: [], position: 1 },
    { id: uid(), restaurant_id: rid, category_id: cats[1].id, name: "Pasta carbonara", description: "Pasta fresca con panceta, huevo, pecorino y pimienta negra", price: 32000, image_url: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=600", is_available: true, is_featured: false, is_new: false, tags: [], position: 2 },
    { id: uid(), restaurant_id: rid, category_id: cats[2].id, name: "Tres leches", description: "Bizcocho empapado en tres leches con canela", price: 14000, image_url: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=600", is_available: true, is_featured: false, is_new: false, tags: ["dulce"], position: 0 },
    { id: uid(), restaurant_id: rid, category_id: cats[3].id, name: "Limonada de coco", description: "Refrescante limonada cremosa de coco", price: 9000, image_url: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=600", is_available: true, is_featured: false, is_new: false, tags: [], position: 0 },
  ];
  const offers: Offer[] = [
    { id: uid(), restaurant_id: rid, title: "2x1 en cocteles los jueves 🍹", description: "De 6pm a 9pm en barra", discount_type: "2x1", banner_color: "#E85D24", is_active: true },
    { id: uid(), restaurant_id: rid, title: "20% en almuerzos ejecutivos", description: "Lunes a viernes de 12 a 3pm", discount_type: "percentage", discount_value: 20, banner_color: "#7C3AED", is_active: true },
  ];
  const restaurant: Restaurant = {
    id: rid,
    user_id: userId,
    slug: slugify(name) || "mi-restaurante",
    name,
    description: "Cocina latina con alma. Ingredientes frescos y sabores que enamoran.",
    logo_url: "",
    cover_url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600",
    template_id: "template_1",
    primary_color: "#E85D24",
    secondary_color: "#FFF8F0",
    font_style: "modern",
    address: "Calle 84 # 12-34",
    city,
    phone: "+57 300 123 4567",
    whatsapp: "+573001234567",
    email: "hola@mirestaurante.com",
    instagram_url: "https://instagram.com/mirestaurante",
    facebook_url: "",
    tiktok_url: "",
    youtube_url: "",
    google_maps_url: "https://maps.google.com",
    website: "",
    open_hours: {
      monday: { enabled: true, open: "12:00", close: "22:00" },
      tuesday: { enabled: true, open: "12:00", close: "22:00" },
      wednesday: { enabled: true, open: "12:00", close: "22:00" },
      thursday: { enabled: true, open: "12:00", close: "23:00" },
      friday: { enabled: true, open: "12:00", close: "00:00" },
      saturday: { enabled: true, open: "12:00", close: "00:00" },
      sunday: { enabled: false, open: "12:00", close: "20:00" },
    },
    is_published: false,
    visible_sections: { hero: true, menu: true, offers: true, hours: true, socials: true, map: true },
  };
  return { restaurant, categories: cats, items, offers };
}

interface AppState {
  user: AuthUser | null;
  restaurants: Record<string, DemoData>; // by restaurant id
  currentRestaurantId: string | null;

  // Auth
  register: (name: string, email: string, password: string, city: string) => void;
  login: (email: string, password: string) => boolean;
  logout: () => void;

  // Restaurant
  getCurrent: () => DemoData | null;
  getBySlug: (slug: string) => DemoData | null;
  updateRestaurant: (patch: Partial<Restaurant>) => void;
  publish: () => void;
  unpublish: () => void;

  // Categories
  addCategory: (c: Omit<MenuCategory, "id" | "restaurant_id" | "position">) => void;
  updateCategory: (id: string, patch: Partial<MenuCategory>) => void;
  deleteCategory: (id: string) => void;

  // Items
  addItem: (i: Omit<MenuItem, "id" | "restaurant_id" | "position">) => void;
  updateItem: (id: string, patch: Partial<MenuItem>) => void;
  deleteItem: (id: string) => void;

  // Offers
  addOffer: (o: Omit<Offer, "id" | "restaurant_id">) => void;
  updateOffer: (id: string, patch: Partial<Offer>) => void;
  deleteOffer: (id: string) => void;
}

export const useApp = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      restaurants: {},
      currentRestaurantId: null,

      register: (name, email, _password, city) => {
        const userId = uid();
        const user: AuthUser = { id: userId, email, name };
        const demo = buildDemo(userId, name, city);
        // ensure unique slug
        const existing = Object.values(get().restaurants).map((d) => d.restaurant.slug);
        let s = demo.restaurant.slug;
        let i = 2;
        while (existing.includes(s)) s = `${demo.restaurant.slug}-${i++}`;
        demo.restaurant.slug = s;
        set({
          user,
          restaurants: { ...get().restaurants, [demo.restaurant.id]: demo },
          currentRestaurantId: demo.restaurant.id,
        });
      },

      login: (email) => {
        // demo login: find any restaurant whose user email matches; otherwise create demo
        const found = Object.values(get().restaurants).find(() => true);
        if (found && get().user?.email === email) {
          set({ currentRestaurantId: found.restaurant.id });
          return true;
        }
        if (found) {
          set({ user: { id: found.restaurant.user_id, email, name: found.restaurant.name }, currentRestaurantId: found.restaurant.id });
          return true;
        }
        // create a demo account on the fly
        get().register("Mi Restaurante", email, "demo", "Bogotá");
        return true;
      },

      logout: () => set({ user: null, currentRestaurantId: null }),

      getCurrent: () => {
        const id = get().currentRestaurantId;
        return id ? get().restaurants[id] || null : null;
      },

      getBySlug: (slug) => {
        return Object.values(get().restaurants).find((d) => d.restaurant.slug === slug) || null;
      },

      updateRestaurant: (patch) => {
        const id = get().currentRestaurantId;
        if (!id) return;
        const cur = get().restaurants[id];
        if (!cur) return;
        // if slug changed, ensure unique
        let nextSlug = patch.slug ?? cur.restaurant.slug;
        if (patch.slug) {
          const others = Object.values(get().restaurants).filter((d) => d.restaurant.id !== id).map((d) => d.restaurant.slug);
          let s = slugify(patch.slug);
          let i = 2;
          while (others.includes(s)) s = `${slugify(patch.slug)}-${i++}`;
          nextSlug = s;
        }
        const next = { ...cur, restaurant: { ...cur.restaurant, ...patch, slug: nextSlug } };
        set({ restaurants: { ...get().restaurants, [id]: next } });
      },

      publish: () => {
        const id = get().currentRestaurantId;
        if (!id) return;
        const cur = get().restaurants[id];
        const next = { ...cur, restaurant: { ...cur.restaurant, is_published: true, published_at: new Date().toISOString() } };
        set({ restaurants: { ...get().restaurants, [id]: next } });
      },

      unpublish: () => {
        const id = get().currentRestaurantId;
        if (!id) return;
        const cur = get().restaurants[id];
        const next = { ...cur, restaurant: { ...cur.restaurant, is_published: false } };
        set({ restaurants: { ...get().restaurants, [id]: next } });
      },

      addCategory: (c) => {
        const id = get().currentRestaurantId;
        if (!id) return;
        const cur = get().restaurants[id];
        const newCat: MenuCategory = { ...c, id: uid(), restaurant_id: id, position: cur.categories.length };
        const next = { ...cur, categories: [...cur.categories, newCat] };
        set({ restaurants: { ...get().restaurants, [id]: next } });
      },

      updateCategory: (catId, patch) => {
        const id = get().currentRestaurantId;
        if (!id) return;
        const cur = get().restaurants[id];
        const next = { ...cur, categories: cur.categories.map((c) => (c.id === catId ? { ...c, ...patch } : c)) };
        set({ restaurants: { ...get().restaurants, [id]: next } });
      },

      deleteCategory: (catId) => {
        const id = get().currentRestaurantId;
        if (!id) return;
        const cur = get().restaurants[id];
        const next = {
          ...cur,
          categories: cur.categories.filter((c) => c.id !== catId),
          items: cur.items.filter((i) => i.category_id !== catId),
        };
        set({ restaurants: { ...get().restaurants, [id]: next } });
      },

      addItem: (i) => {
        const id = get().currentRestaurantId;
        if (!id) return;
        const cur = get().restaurants[id];
        const newItem: MenuItem = { ...i, id: uid(), restaurant_id: id, position: cur.items.length };
        const next = { ...cur, items: [...cur.items, newItem] };
        set({ restaurants: { ...get().restaurants, [id]: next } });
      },

      updateItem: (itemId, patch) => {
        const id = get().currentRestaurantId;
        if (!id) return;
        const cur = get().restaurants[id];
        const next = { ...cur, items: cur.items.map((i) => (i.id === itemId ? { ...i, ...patch } : i)) };
        set({ restaurants: { ...get().restaurants, [id]: next } });
      },

      deleteItem: (itemId) => {
        const id = get().currentRestaurantId;
        if (!id) return;
        const cur = get().restaurants[id];
        const next = { ...cur, items: cur.items.filter((i) => i.id !== itemId) };
        set({ restaurants: { ...get().restaurants, [id]: next } });
      },

      addOffer: (o) => {
        const id = get().currentRestaurantId;
        if (!id) return;
        const cur = get().restaurants[id];
        const newOffer: Offer = { ...o, id: uid(), restaurant_id: id };
        const next = { ...cur, offers: [...cur.offers, newOffer] };
        set({ restaurants: { ...get().restaurants, [id]: next } });
      },

      updateOffer: (offerId, patch) => {
        const id = get().currentRestaurantId;
        if (!id) return;
        const cur = get().restaurants[id];
        const next = { ...cur, offers: cur.offers.map((o) => (o.id === offerId ? { ...o, ...patch } : o)) };
        set({ restaurants: { ...get().restaurants, [id]: next } });
      },

      deleteOffer: (offerId) => {
        const id = get().currentRestaurantId;
        if (!id) return;
        const cur = get().restaurants[id];
        const next = { ...cur, offers: cur.offers.filter((o) => o.id !== offerId) };
        set({ restaurants: { ...get().restaurants, [id]: next } });
      },
    }),
    { name: "platepro-store", version: 1 }
  )
);

// Helpers
export const TEMPLATES: { id: TemplateId; name: string; tagline: string; primary: string; secondary: string }[] = [
  { id: "template_1", name: "Brasa & Fuego", tagline: "Asaderos y parrillas", primary: "#E53E3E", secondary: "#0D0D0D" },
  { id: "template_2", name: "Fresco Market", tagline: "Saludable y fresco", primary: "#22C55E", secondary: "#FAFAF7" },
  { id: "template_3", name: "Noche Latina", tagline: "Elegante y nocturno", primary: "#F59E0B", secondary: "#0A0A0A" },
  { id: "template_4", name: "Minimal Bites", tagline: "Cafés y sandwicherías", primary: "#000000", secondary: "#FFFFFF" },
  { id: "template_5", name: "Street Food", tagline: "Energético y urbano", primary: "#FDE047", secondary: "#18181B" },
  { id: "template_6", name: "Mar y Tierra", tagline: "Mariscos y pescados", primary: "#06B6D4", secondary: "#1E3A5F" },
  { id: "template_7", name: "Pizzería Italiana", tagline: "Tradición italiana", primary: "#DC2626", secondary: "#FFFFFF" },
  { id: "template_8", name: "Café de Autor", tagline: "Cafeterías premium", primary: "#78350F", secondary: "#F5F0E8" },
  { id: "template_9", name: "Quick Bites Pro", tagline: "Comida rápida premium", primary: "#10B981", secondary: "#ECFDF5" },
  { id: "template_10", name: "Sabores de Casa", tagline: "Recetas caseras auténticas", primary: "#BE123C", secondary: "#FFE4E6" },
];

export const COLOR_PRESETS = [
  { primary: "#E85D24", secondary: "#FFF8F0" },
  { primary: "#22C55E", secondary: "#F0FDF4" },
  { primary: "#3B82F6", secondary: "#EFF6FF" },
  { primary: "#A855F7", secondary: "#FAF5FF" },
  { primary: "#EC4899", secondary: "#FDF2F8" },
  { primary: "#F59E0B", secondary: "#FFFBEB" },
  { primary: "#0EA5E9", secondary: "#F0F9FF" },
  { primary: "#DC2626", secondary: "#FEF2F2" },
];

export function formatPrice(n: number): string {
  return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(n);
}
