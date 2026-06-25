// src/pages/api/booking.ts
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, phone, guests, date, time, restaurantSlug } = body;

    // 💡 طباعة كونسول لوج احترافي في الـ Terminal عند استقبال أي طلب حجز جديد
    console.log("==================================================");
    console.log(`📥 NEW BOOKING REQUEST RECEIVED AT: ${new Date().toISOString()}`);
    console.log(`👤 Client Name: ${name}`);
    console.log(`📞 Phone: ${phone}`);
    console.log(`👥 Guests: ${guests}`);
    console.log(`📅 Date & Time: ${date} @ ${time}`);
    console.log(`🔗 Restaurant Route (Slug): ${restaurantSlug}`);
    console.log("==================================================");

    if (!name || !phone || !guests || !date || !time || !restaurantSlug) {
      console.log("❌ Booking Rejected: Missing required fields.");
      return new Response(JSON.stringify({ error: 'Alle Felder sind erforderlich.' }), { status: 400 });
    }

    const websiteRes = await fetch(`http://localhost:1337/api/websites?filters[slug][$eq]=${restaurantSlug}`);
    const websiteJson = await websiteRes.json();
    const restaurantId = websiteJson?.data?.[0]?.id;

    if (!restaurantId) {
      console.log(`❌ Booking Rejected: Restaurant with slug "${restaurantSlug}" not found in database.`);
      return new Response(JSON.stringify({ error: 'Restaurant nicht gefunden.' }), { status: 404 });
    }

    console.log(`🎯 Successfully mapped restaurant slug to Database ID: ${restaurantId}`);

    const strapiPayload = {
      data: {
        name,
        phone,
        guests: parseInt(guests, 10),
        date,
        time,
        websites: [restaurantId]
      }
    };

    const response = await fetch('http://localhost:1337/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(strapiPayload),
    });

    if (!response.ok) {
      throw new Error('Strapi DB Insertion Failed');
    }

    console.log(`✅ SUCCESS: Booking for "${name}" successfully saved in Strapi v5 database.`);
    return new Response(JSON.stringify({ success: true }), { status: 200 });

  } catch (error) {
    console.error('🚨 SERVER ERROR IN BOOKING ENDPOINT:', error);
    return new Response(JSON.stringify({ error: 'Serverfehler. Bitte später versuchen.' }), { status: 500 });
  }
};
