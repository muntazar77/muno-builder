interface Fonts {
  publicSans: string;
  inter: string;
}

interface SiteConfig {
  // Site Metadata
  creatorName: string;
  demoName: string;
  creatorUrl: string;
  templateName: string;
  templateSuffix: string;
  templateKeyword: string;

  // URLs
  licenseUrl: string;
  productPage: string;
  productBuyNow: string;
  documentation: string;
  support: string;
  moreTemplates: string;
  changelog: string;
  twitterUrl: string;
  githubUrl: string;
  discordUrl: string;

  // Open Graph
  ogTitle: string;
  ogImage: string;
  ogType: string;

  // Layout & Styling
  container: string;

  // Assets
  faviconUrl: string;

  // Fonts
  fonts: Fonts;

  
}

export const siteConfig: SiteConfig = {
  // Site Metadata
  creatorName: 'FlyonUI',
  demoName: 'Restaurant',
  creatorUrl: 'https://flyonui.com',
  templateName: 'Restaurant Landing',
  templateSuffix: 'Powered by FlyonUI',
  templateKeyword:
    'astro, landing page, free, open-source, responsive, template, flyonui, html, responsive FlyonUI theme',

  // URLs
  licenseUrl: 'https://flyonui.com/license/',
  productPage: 'https://flyonui.com/templates',
  productBuyNow: 'https://flyonui.com/pro#pricing',
  documentation: 'documentation',
  support: 'https://flyonui.com/support',
  moreTemplates: 'https://flyonui.com/templates',
  changelog: 'https://flyonui.com/docs/changelog-pro/',
  twitterUrl: 'https://x.com/flyonui',
  githubUrl: 'https://github.com/themeselection/flyonui',
  discordUrl: 'https://discord.com/invite/kBHkY7DekX',

  // Open Graph
  ogTitle: 'Restaurant Landing Page by FlyonUI',
  ogImage:
    'https://cdn.flyonui.com/fy-assets/landing-page/template-page/dashboard/dashboard-default-1.png',
  ogType: 'website',

  // Layout & Styling
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',

  // Assets
  faviconUrl: './assets/img/favicon/favicon.ico',

  // Fonts
  fonts: {
    publicSans: 'Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700',
    inter: 'Inter:wght@300;400;500;600;700;800;900'
  }

  };
