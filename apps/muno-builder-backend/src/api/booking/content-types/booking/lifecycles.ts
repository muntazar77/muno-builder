module.exports = {
  async afterCreate(event) {
    const { result } = event;

    try {
      // استدعاء نظام الإيميل المركزي في Strapi
      await strapi.plugins['email'].services.email.send({
        to: strapi.config.get('plugins.email.settings.defaultFrom'), // سيرسل الحجز لك كأدمن للتجربة حالياً
        subject: `Neue Reservierungsanfrage: ${result.name}`,
        html: `
          <div style="font-family: sans-serif; direction: ltr; text-align: left; padding: 20px; background-color: #f9fafb;">
            <div style="max-width: 600px; margin: 0 auto; bg-color: #ffffff; padding: 30px; border-radius: 16px; border: 1px solid #e5e7eb;">
              <h2 style="color: #f97316; margin-bottom: 20px;">Neue Reservierung erhalten!</h2>
              <p>Hallo Admin, eine neue Tischreservierung wurde über Mono Builder getätigt:</p>
              <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <tr><td style="padding: 8px 0; color: #6b7280;"><b>Name:</b></td><td style="padding: 8px 0; color: #111827;">${result.name}</td></tr>
                <tr><td style="padding: 8px 0; color: #6b7280;"><b>Telefon:</b></td><td style="padding: 8px 0; color: #111827;">${result.phone}</td></tr>
                <tr><td style="padding: 8px 0; color: #6b7280;"><b>Gäste:</b></td><td style="padding: 8px 0; color: #111827;">${result.guests} Personen</td></tr>
                <tr><td style="padding: 8px 0; color: #6b7280;"><b>Datum:</b></td><td style="padding: 8px 0; color: #111827;">${result.date}</td></tr>
                <tr><td style="padding: 8px 0; color: #6b7280;"><b>Uhrzeit:</b></td><td style="padding: 8px 0; color: #111827;">${result.time} Uhr</td></tr>
              </table>
              <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 30px 0;" />
              <p style="font-size: 12px; color: #9ca3af;">Gesendet von Mono Builder System.</p>
            </div>
          </div>
        `,
      });
      console.log('📬 [Mono Builder Log] Success: Notification Email sent to Admin Gmail!');
    } catch (err) {
      console.error('🚨 [Mono Builder Log] Error sending lifecycle email:', err);
    }
  },
};
