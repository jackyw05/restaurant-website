const BASE = import.meta.env.PROD
  ? `${import.meta.env.VITE_API_URL}/api`
  :  '/api';

// Fetch all menu items grouped by category
export async function fetchMenu() {
  const res = await fetch(`${BASE}/menu`);
  if (!res.ok) throw new Error('Failed to fetch menu');
  return res.json();
}

// Place an order
export async function placeOrder(cart) {
  const items = Object.entries(cart).map(([name, { price, qty, emoji }]) => ({
    name, price, qty, emoji
  }));
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  const res = await fetch(`${BASE}/orders`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ items, total }),
  });
  if (!res.ok) throw new Error('Failed to place order');
  return res.json();
}