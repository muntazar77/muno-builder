import type { Core } from "@strapi/strapi";

const config = ({
  env,
}: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: env("SMTP_HOST", "://gmail.com"), // أو سيرفر الإيميل الخاص بدومينك
        port: env.int("SMTP_PORT", 587),
        auth: {
          user: env("SMTP_USERNAME"),
          pass: env("SMTP_PASSWORD"), // كلمة مرور التطبيقات من جوجل
        },
      },
      settings: {
        defaultFrom: "noreply@monobuilder.de",
        defaultReplyTo: "support@monobuilder.de",
      },
    },
  },
});

export default config;
