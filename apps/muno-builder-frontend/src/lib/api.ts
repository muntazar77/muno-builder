
/**
 * 🛠️ الدالة المركزية والمحمية لإجراء كل طلبات الفيتش من Strapi
 */
const STRAPI_BASE_URL = import.meta.env.PUBLIC_STRAPI_URL || 'http://localhost:1337';
// const STRAPI_URL = import.meta.env.STRAPI_URL || 'http://127.0.0.1:1337';
const STRAPI_TOKEN = import.meta.env.STRAPI_TOKEN;
async function fetchFromStrapi(endpoint: string) {
  try {
    const response = await fetch(`${STRAPI_BASE_URL}/api/${endpoint}`);
    if (!response.ok) {
      throw new Error(`Strapi API Error: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("🚨 Error fetching from Strapi:", error);
    return { data: [] };
  }
}

export async function getWebsiteData(slug: string) {
  // بناء رابط التعبئة العميقة المتوافق 100% مع معايير Strapi v5
  const endpoint = `websites?filters[slug][$eq]=${slug}&populate[page_sections][populate]=*&populate[header_links]=*&populate[footer_link_groups][populate]=*`;

  // 💡 هنا استخدمنا الفاكشن المركزية الموحدة بناءً على طلبك المعماري الذكي
  const result = await fetchFromStrapi(endpoint);
  
  // التحقق الآمن من جودة البيانات المرتجعة وعدم فراغها
  if (!result || !result.data || result.data.length === 0) {
    console.log(`⚠️ No website found in database for slug: /${slug}`);
    return null;
  }
  
  // في Strapi v5 البيانات تأتي مصفوفة، ونحن نريد أول موقع يطابق السبيسيفيكشن
  const rawWebsiteData = result.data[0]; 
  
  // إرجاع البيانات مسطحة وجاهزة فوراً لـ Astro
  return {
    id: rawWebsiteData.id,
    documentId: rawWebsiteData.documentId,
    ...(rawWebsiteData.attributes || rawWebsiteData) // التوافق الكامل والآمن
  };
}

/**
 * 2. 🍽️ جلب أطباق المنيو باستخدام الدالة المركزية fetchFromStrapi
 */
/**
 * 🍽️ جلب أطباق المنيو المتوافقة 100% مع معايير الفلترة العميقة لـ Strapi v5
 */
export async function getRestaurantMenu(slug: string) {
  // 💡 حل سحري لـ Strapi v5: جلب الأطباق وعلاقة الـ websites بالكامل
  const endpoint = `dishes?populate=*`;
  
  const result = await fetchFromStrapi(endpoint);
  const allDishes = result?.data || [];
  
  // 💡 فلترة الأطباق داخل الفرونتيند للتأكد من ربطها بالمطعم الحالي Many-to-Many
  const filteredDishes = allDishes.filter((dish: any) => {
    // التحقق من وجود مصفوفة الـ websites بداخل الطبق وهل تحتوي على الـ slug المطلوب
    const websitesArray = dish.websites || [];
    return websitesArray.some((web: any) => web.slug === slug);
  });

  console.log(`🍏 [Mono Builder] Total filtered dishes for /${slug}:`, filteredDishes.length);
  return filteredDishes;
}



// export async function getCustomPageData(restaurantSlug: string, pageSlug: string) {
//   // بناء رابط الاستعلام العميق المتوافق مع علاقات Strapi v5 لربط الصفحات بالويب سايت
//   const endpoint = `pages?filters[page_slug][$eq]=${pageSlug}&filters[website][slug][$eq]=${restaurantSlug}&populate[sections][populate]=*`;
  
//   // 💡 استخدام الفاكشن المركزية الموحدة الخاصة بك
//   const result = await fetchFromStrapi(endpoint);
  
//   // التحقق الآمن من وجود المصفوفة وعدم كونها فارغة
//   if (!result || !result.data || result.data.length === 0) {
//     console.log(`⚠️ No custom page found for slug: /${restaurantSlug}/${pageSlug}`);
//     return null;
//   }
  
//   // 💡 حل المشكلة الفوري: في Strapi v5 البيانات تأتي داخل أول عنصر في المصفوفة result.data[0]
//   // نقوم باستخراج العنصر الأول وإرجاعه مسطحاً ومباشراً لكي يقرأ Astro مصفوفة الـ sections بنجاح
//   const rawPageData = result.data[0];
  
//   return {
//     id: rawPageData.id,
//     documentId: rawPageData.documentId,
//     ...(rawPageData.attributes || rawPageData) // التوافق الشامل والمسطح لـ v5
//   };
// }
// src/lib/api.ts

// src/lib/api.ts

export async function getCustomPageData(restaurantSlug: string, pageSlug: string) {
  // 💡 الحل المعماري لـ Strapi v5: تفكيك وتعبئة الحقول العميقة المتداخلة المعروضة في صورتك بالتفصيل
  const endpoint = `pages?filters[page_slug][$eq]=${pageSlug}&filters[website][slug][$eq]=${restaurantSlug}` +
    `&populate[sections][populate]=*` +
    `&populate[website][populate][header_links]=*` +
    `&populate[website][populate][footer_link_groups][populate]=links`; // 👈 التعبئة العميقة لمصفوفة links داخل الجروب
  
  const result = await fetchFromStrapi(endpoint);
  
  if (!result || !result.data || result.data.length === 0) {
    console.log(`⚠️ [Mono Builder API] Page not found: /${restaurantSlug}/${pageSlug}`);
    return null;
  }
  
  const rawPageData = result.data[0];
  const websiteRelation = rawPageData.website || rawPageData.attributes?.website;
  
  if (!websiteRelation) return null;

  return {
    id: rawPageData.id,
    title: rawPageData.title || 'Custom Page',
    page_slug: rawPageData.page_slug,
    sections: rawPageData.sections || rawPageData.page_sections || [],
    tenant: {
      client_name: websiteRelation.client_name || websiteRelation.restaurant_name || 'Mono Client',
      template_name: websiteRelation.template_name || 'luxury',
      header_links: websiteRelation.header_links || [],
      footer_link_groups: websiteRelation.footer_link_groups || [], // أصبحت تحتوي على الـ links كاملة الآن!
      address_text: websiteRelation.address_text || ''
    }
  };
}
