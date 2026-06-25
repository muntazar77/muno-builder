
/**
 * 🛠️ الدالة المركزية والمحمية لإجراء كل طلبات الفيتش من Strapi
 */
const STRAPI_BASE_URL = import.meta.env.PUBLIC_STRAPI_URL || 'http://localhost:1337';

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
export async function getRestaurantMenu(slug: string) {
  // بناء الرابط المتوافق 100% مع علاقات واستعلامات Strapi v5 العميقة
  const endpoint = `dishes?filters[websites][slug][$eq]=${slug}&populate=*`;
  
  // 💡 هنا استخدمنا الفاكشن المركزية بناءً على طلبك
  const result = await fetchFromStrapi(endpoint);
  
  // إرجاع مصفوفة البيانات مباشرة (وفي حال حدوث خطأ أو كانت فارغة ترجع مصفوفة فارغة آمنة)
  return result?.data || [];
}



export async function getCustomPageData(restaurantSlug: string, pageSlug: string) {
  // بناء رابط الاستعلام العميق المتوافق مع علاقات Strapi v5 لربط الصفحات بالويب سايت
  const endpoint = `pages?filters[page_slug][$eq]=${pageSlug}&filters[website][slug][$eq]=${restaurantSlug}&populate[sections][populate]=*`;
  
  // 💡 استخدام الفاكشن المركزية الموحدة الخاصة بك
  const result = await fetchFromStrapi(endpoint);
  
  // التحقق الآمن من وجود المصفوفة وعدم كونها فارغة
  if (!result || !result.data || result.data.length === 0) {
    console.log(`⚠️ No custom page found for slug: /${restaurantSlug}/${pageSlug}`);
    return null;
  }
  
  // 💡 حل المشكلة الفوري: في Strapi v5 البيانات تأتي داخل أول عنصر في المصفوفة result.data[0]
  // نقوم باستخراج العنصر الأول وإرجاعه مسطحاً ومباشراً لكي يقرأ Astro مصفوفة الـ sections بنجاح
  const rawPageData = result.data[0];
  
  return {
    id: rawPageData.id,
    documentId: rawPageData.documentId,
    ...(rawPageData.attributes || rawPageData) // التوافق الشامل والمسطح لـ v5
  };
}
