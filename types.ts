
export interface Member {
  id: string;
  full_name: string;
  name_with_initials?: string;
  dob: string;
  nic: string;
  address: string;
  phone: string;
  whatsapp?: string;
  email?: string;
  bio?: string;
  status: 'active' | 'pending' | 'inactive';
}

export interface Officer {
  id: string;
  name: string;
  position: string;
  image_url: string;
  display_order: number;
  email?: string;
  phone?: string;
  show_email: boolean;
  show_phone: boolean;
}

export interface SportsTeam {
  id: string;
  sport_name: string;
  captain_name?: string;
  description?: string;
  team_photo_url?: string;
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  event_date: string;
  cover_image_url?: string;
}

export interface Download {
  id: string;
  file_name: string;
  file_url: string;
  category?: string;
}

export interface SiteSettings {
  address?: string;
  contact_number?: string;
  email?: string;
  facebook_url?: string;
  youtube_url?: string;
  instagram_url?: string;
  whatsapp_url?: string;
  telegram_url?: string;
}

export interface QuickLink {
  id: string;
  title: string;
  description?: string;
  link_url: string;
  is_active: boolean;
  display_order: number;
}

export interface Album {
  id: number;
  title: string;
  event_date: string;
  cover_image_url: string;
  is_hidden: boolean;
}

export interface GalleryImage {
  id: number;
  album_id: number;
  image_url: string;
  caption?: string;
  is_hidden: boolean;
}

export interface SlideshowImage {
  id: number;
  image_url: string;
  display_order: number;
}
