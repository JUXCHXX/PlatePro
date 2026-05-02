import type { MenuCategory, MenuItem, Offer, Restaurant } from "@/types";

export interface TemplateData {
  restaurant: Restaurant;
  categories: MenuCategory[];
  items: MenuItem[];
  offers: Offer[];
}

export function fmt(n: number) {
  return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n);
}

export const DAYS_ES: Record<string, string> = {
  monday: "Lunes", tuesday: "Martes", wednesday: "Miércoles",
  thursday: "Jueves", friday: "Viernes", saturday: "Sábado", sunday: "Domingo",
};

export function waLink(num?: string) {
  if (!num) return "";
  return `https://wa.me/${num.replace(/[^0-9]/g, "")}`;
}
