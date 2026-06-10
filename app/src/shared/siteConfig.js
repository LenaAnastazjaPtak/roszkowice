const siteUrl = import.meta.env.VITE_API_URL;
if (!siteUrl) {
  throw new Error("Missing required env variable: VITE_API_URL");
}

const mapAddress = import.meta.env.VITE_MAP_ADDRESS;
if (!mapAddress) {
  throw new Error("Missing required env variable: VITE_MAP_ADDRESS");
}

const mapLat = parseFloat(import.meta.env.VITE_MAP_LAT, 10);
const mapLng = parseFloat(import.meta.env.VITE_MAP_LNG, 10);
if (Number.isNaN(mapLat) || Number.isNaN(mapLng)) {
  throw new Error("Missing or invalid VITE_MAP_LAT / VITE_MAP_LNG");
}

const addressMatch = mapAddress.match(/^(.+?),\s*(\d{2}-\d{3})\s+(.+)$/);
if (!addressMatch) {
  throw new Error(`Invalid VITE_MAP_ADDRESS format: ${mapAddress}`);
}

export const SITE_URL = siteUrl.replace(/\/$/, "");
export const SITE_LOGO_PATH = "/images/roszkowice/logo_with_transparent_background.png";
export const SITE_EMAIL = "palac.roszkowice@gmail.com";
export const SITE_PHONE = "+48795000596";

export const SITE_SOCIAL_URLS = [
  "https://www.facebook.com/p/Pa%C5%82ac-Roszkowice-100084550065108/?locale=pl_PL",
  "https://www.instagram.com/palac_roszkowice/",
  "https://www.youtube.com/@PałacRoszkowice",
];

export const SITE_POSTAL_ADDRESS = {
  streetAddress: addressMatch[1].trim(),
  postalCode: addressMatch[2],
  addressLocality: addressMatch[3].trim(),
  addressCountry: "PL",
};

export const SITE_GEO = {
  latitude: mapLat,
  longitude: mapLng,
};

export function toAbsoluteSiteUrl(path) {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }
  return new URL(path, `${SITE_URL}/`).href;
}
