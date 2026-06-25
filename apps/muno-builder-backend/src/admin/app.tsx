// apps/backend/src/admin/app.tsx
import type { StrapiApp } from '@strapi/strapi/admin';

export default {
  config: {
    // 💡 تفعيل اللغتين الألمانية والإنجليزية للوحة التحكم ليتصفح بينهما العميل
    locales: ['de', 'en'],
    
    // تخصيص الألوان البراند الخاصة بـ مونو بلدر (White-Label)
    theme: {
      light: {
        colors: {
          primary100: '#fff7ed', // برتقالي فاتح جداً خلفية
          primary500: '#f97316', // لون الأزرار الأساسي
          primary600: '#ea580c', // لون الأزرار عند تمرير الماوس
          primary700: '#c2410c',
        },
      },
    },
    // النصوص الترحيبية المخصصة للألمان
    translations: {
      de: {
        "Auth.form.welcome.title": "Willkommen bei Mono Builder!",
        "Auth.form.welcome.subtitle": "Loggen Sie sich in Ihr Dashboard ein",
      },
      en: {
        "Auth.form.welcome.title": "Welcome to Mono Builder!",
        "Auth.form.welcome.subtitle": "Log in to your Dashboard",
      }
    },
  },
  bootstrap(app: StrapiApp) {
    console.log("Mono Builder Dashboard initialized:", app);
  },
};
