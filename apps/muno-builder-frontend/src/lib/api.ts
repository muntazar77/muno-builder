const STRAPI_URL = "http://localhost:1337";

export async function getRestaurant() {
  const res = await fetch(`${STRAPI_URL}/api/restaurants`);
  return res.json();
}