const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;
const vercelUrl = process.env.VERCEL_URL;

export const siteUrl = configuredUrl
  ? configuredUrl.replace(/\/$/, "")
  : vercelUrl
    ? `https://${vercelUrl}`
    : "http://localhost:3000";
