const assert = require('assert');
const app = require('../src/index');
const store = require('../src/store');

async function runTests() {
  const server = await new Promise(resolve => { const s = app.listen(0, () => resolve(s)); });
  const port = server.address().port;
  const base = `http://localhost:${port}`;
  let passed = 0, failed = 0;
  async function test(name, fn) { try { await fn(); passed++; } catch (err) { failed++; console.error(`FAIL: ${name} — ${err.message}`); } }

  store.resetAll();

  await test('GET /health', async () => { const r = await fetch(`${base}/health`); assert.strictEqual(r.status, 200); });

  // Test each resource: create + get
  const resources = ['users', 'products', 'orders', 'reviews', 'categories', 'carts', 'addresses', 'coupons', 'notifications', 'wishlists'];
  const bodies = {
    users: { name: 'Alice', email: 'a@b.com' },
    products: { name: 'Widget', price: 9.99 },
    orders: { userId: 1, total: 29.99 },
    reviews: { productId: 1, rating: 5, text: 'Great!' },
    categories: { name: 'Electronics' },
    carts: { userId: 1 },
    addresses: { userId: 1, street: '123 Main', city: 'NYC', zip: '10001' },
    coupons: { code: 'SAVE10', discount: 10 },
    notifications: { userId: 1, message: 'Hello' },
    wishlists: { userId: 1, productIds: [1] },
  };

  for (const res of resources) {
    await test(`POST /api/${res}`, async () => {
      const r = await fetch(`${base}/api/${res}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(bodies[res]) });
      assert.strictEqual(r.status, 201);
    });
    await test(`GET /api/${res}`, async () => {
      const r = await fetch(`${base}/api/${res}`);
      assert.strictEqual(r.status, 200);
      const d = await r.json();
      assert.ok(Array.isArray(d));
      assert.ok(d.length >= 1);
    });
    await test(`GET /api/${res}/1`, async () => {
      const r = await fetch(`${base}/api/${res}/1`);
      assert.strictEqual(r.status, 200);
    });
  }

  await test('GET /api/search/* finds product', async () => {
    const r = await fetch(`${base}/api/search/Widget`);
    assert.strictEqual(r.status, 200);
    const d = await r.json();
    assert.ok(d.length >= 1);
  });

  await test('GET /docs/* returns topic', async () => {
    const r = await fetch(`${base}/docs/api/users`);
    assert.strictEqual(r.status, 200);
  });

  await test('GET /unknown returns 404', async () => {
    const r = await fetch(`${base}/unknown`);
    assert.strictEqual(r.status, 404);
  });

  server.close();
  console.log(`${passed} passed, ${failed} failed`);
  if (failed > 0) process.exit(1);
}

runTests().catch(err => { console.error(err); process.exit(1); });
