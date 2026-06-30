// src/types/tenant.ts

export interface ThemeTokens {
  primary_color: string;
  hover_color: string;
  text_color: string;
  bg_color: string;
  font_family: string;
}

export interface StrapiComponent {
  __component: string;
  id: number;
  [key: string]: any; // للحقول الديناميكية داخل كل مكون
}

export interface DynamicPageData {
  id: number;
  title: string;
  pageSlug: string;
  meta_description?: string;
  sections: StrapiComponent[];
}

export interface TenantPayload {
  id: number;
  restaurant_name: string;
  slug: string;
  template_name: 'luxury' | 'light';
  theme_tokens: ThemeTokens;
  requested_page: DynamicPageData;
}
