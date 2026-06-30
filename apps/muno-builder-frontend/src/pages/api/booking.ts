// src/pages/api/booking.ts
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, phone, guests, date, time, restaurantSlug } = body;

    // 1. التحقق من الحقول
    if (!name || !phone || !guests || !date || !time || !restaurantSlug) {
      return new Response(JSON.stringify({ error: 'Alle Felder sind erforderlich.' }), { status: 400 });
    }

    // 2. جلب الـ ID الخاص بالمطعم من Strapi v5
    const STRAPI_BASE_URL = import.meta.env.PUBLIC_STRAPI_URL || 'http://localhost:1337';
    const websiteRes = await fetch(`${STRAPI_BASE_URL}/api/websites?filters[slug][$eq]=${restaurantSlug}`);
    const websiteJson = await websiteRes.json();
    
    // في Strapi v5 تأتي البيانات مباشرة داخل مصفوفة مسطحة
    const restaurantId = websiteJson?.data?.[0]?.id || websiteJson?.data?.id;

    if (!restaurantId) {
      return new Response(JSON.stringify({ error: 'Restaurant in der Datenbank nicht gefunden.' }), { status: 404 });
    }

    // 3. بناء الـ Payload المتوافق 100% مع علاقة Many-to-Many لـ Strapi v5
    const strapiPayload = {
      data: {
        name,
        phone,
        guests: parseInt(guests, 10),
        date,
        time,
        // 💡 في علاقة Many-to-Many نمرر مصفوفة تحتوي على الـ ID أو الـ documentId
        websites: [restaurantId] 
      }
    };

    // 4. إرسال طلب الحفظ إلى الباكيند
    const response = await fetch(`${STRAPI_BASE_URL}/api/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(strapiPayload),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('🚨 Strapi Error Response:', errText);
      return new Response(JSON.stringify({ error: 'Fehler beim Speichern der Reservierung.' }), { status: response.status });
    }

    // إرجاع نجاح الطلب
    return new Response(JSON.stringify({ success: true }), { status: 200 });

  } catch (error) {
    console.error('🚨 Booking Endpoint Error:', error);
    return new Response(JSON.stringify({ error: 'Serverfehler. Bitte versuchen Sie es später erneut.' }), { status: 500 });
  }
};
