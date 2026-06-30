import type { Schema, Struct } from '@strapi/strapi';

export interface SectionsAbout extends Struct.ComponentSchema {
  collectionName: 'components_sections_abouts';
  info: {
    displayName: 'About';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsBooking extends Struct.ComponentSchema {
  collectionName: 'components_sections_bookings';
  info: {
    displayName: 'Booking';
  };
  attributes: {};
}

export interface SectionsFeatures extends Struct.ComponentSchema {
  collectionName: 'components_sections_features';
  info: {
    displayName: 'Features';
  };
  attributes: {
    items: Schema.Attribute.Component<'shared.items', true>;
    section_title: Schema.Attribute.String;
  };
}

export interface SectionsFoodMenu extends Struct.ComponentSchema {
  collectionName: 'components_sections_food_menus';
  info: {
    displayName: 'food-menu';
  };
  attributes: {};
}

export interface SectionsHero extends Struct.ComponentSchema {
  collectionName: 'components_sections_heroes';
  info: {
    displayName: 'Hero';
    icon: 'bulletList';
  };
  attributes: {
    background_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    cta_button: Schema.Attribute.Component<'shared.cta-button', false>;
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SectionsLocation extends Struct.ComponentSchema {
  collectionName: 'components_sections_locations';
  info: {
    displayName: 'Location';
  };
  attributes: {
    address: Schema.Attribute.Text;
    email: Schema.Attribute.String;
    google_maps_url: Schema.Attribute.Text;
    phone: Schema.Attribute.Integer;
    title: Schema.Attribute.String;
  };
}

export interface SectionsQrCode extends Struct.ComponentSchema {
  collectionName: 'components_sections_qr_codes';
  info: {
    displayName: 'qr-code';
  };
  attributes: {};
}

export interface SectionsTestimonials extends Struct.ComponentSchema {
  collectionName: 'components_sections_testimonials';
  info: {
    displayName: 'Testimonials';
  };
  attributes: {
    reviews: Schema.Attribute.Component<'shared.reviews', true>;
    section_title: Schema.Attribute.String;
  };
}

export interface SharedCtaButton extends Struct.ComponentSchema {
  collectionName: 'components_shared_cta_buttons';
  info: {
    displayName: 'cta_button';
  };
  attributes: {
    button_text: Schema.Attribute.String;
    button_url: Schema.Attribute.String;
  };
}

export interface SharedItems extends Struct.ComponentSchema {
  collectionName: 'components_shared_items';
  info: {
    displayName: 'items';
    icon: 'bulletList';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedLinkGroup extends Struct.ComponentSchema {
  collectionName: 'components_shared_link_groups';
  info: {
    displayName: 'link-group';
  };
  attributes: {
    group_title: Schema.Attribute.String;
    links: Schema.Attribute.Component<'shared.link-item', true>;
  };
}

export interface SharedLinkItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_link_items';
  info: {
    displayName: 'link-item';
  };
  attributes: {
    label: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedReviews extends Struct.ComponentSchema {
  collectionName: 'components_shared_reviews';
  info: {
    displayName: 'reviews';
  };
  attributes: {
    name: Schema.Attribute.String;
    stars: Schema.Attribute.Integer;
    text: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedThemeTokens extends Struct.ComponentSchema {
  collectionName: 'components_shared_theme_tokens';
  info: {
    displayName: 'theme_tokens';
  };
  attributes: {
    bg_color: Schema.Attribute.String;
    hover_color: Schema.Attribute.String;
    primary_color: Schema.Attribute.String;
    text_color: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'sections.about': SectionsAbout;
      'sections.booking': SectionsBooking;
      'sections.features': SectionsFeatures;
      'sections.food-menu': SectionsFoodMenu;
      'sections.hero': SectionsHero;
      'sections.location': SectionsLocation;
      'sections.qr-code': SectionsQrCode;
      'sections.testimonials': SectionsTestimonials;
      'shared.cta-button': SharedCtaButton;
      'shared.items': SharedItems;
      'shared.link-group': SharedLinkGroup;
      'shared.link-item': SharedLinkItem;
      'shared.media': SharedMedia;
      'shared.reviews': SharedReviews;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.theme-tokens': SharedThemeTokens;
    }
  }
}
