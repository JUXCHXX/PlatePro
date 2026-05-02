export type TemplateId =
  | "template_1" | "template_2" | "template_3" | "template_4" | "template_5"
  | "template_6" | "template_7" | "template_8" | "template_9" | "template_10";

export interface DayHours {
  enabled: boolean;
  open: string;
  close: string;
}

export interface OpenHours {
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
  saturday: DayHours;
  sunday: DayHours;
  special?: string;
}

export interface Restaurant {
  id: string;
  user_id: string;
  slug: string;
  name: string;
  description?: string;
  logo_url?: string;
  cover_url?: string;
  template_id: TemplateId;
  primary_color: string;
  secondary_color: string;
  font_style: string;
  address?: string;
  city?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  website?: string;
  facebook_url?: string;
  instagram_url?: string;
  tiktok_url?: string;
  youtube_url?: string;
  google_maps_url?: string;
  open_hours?: OpenHours;
  is_published: boolean;
  published_at?: string;
  visible_sections: {
    hero: boolean;
    menu: boolean;
    offers: boolean;
    hours: boolean;
    socials: boolean;
    map: boolean;
  };
}

export interface MenuCategory {
  id: string;
  restaurant_id: string;
  name: string;
  description?: string;
  emoji?: string;
  position: number;
  is_active: boolean;
}

export interface MenuItem {
  id: string;
  restaurant_id: string;
  category_id: string;
  name: string;
  description?: string;
  price: number;
  original_price?: number;
  image_url?: string;
  is_available: boolean;
  is_featured: boolean;
  is_new: boolean;
  tags: string[];
  position: number;
}

export type DiscountType = "percentage" | "fixed" | "2x1" | "free_item";

export interface Offer {
  id: string;
  restaurant_id: string;
  title: string;
  description?: string;
  discount_type: DiscountType;
  discount_value?: number;
  banner_color: string;
  image_url?: string;
  is_active: boolean;
  starts_at?: string;
  ends_at?: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
}
