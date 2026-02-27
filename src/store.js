const data = { users: [], products: [], orders: [], reviews: [], categories: [], carts: [], addresses: [], coupons: [], notifications: [], wishlists: [] };
const counters = { users: 0, products: 0, orders: 0, reviews: 0, categories: 0, carts: 0, addresses: 0, coupons: 0, notifications: 0, wishlists: 0 };

function makeStore(key) {
  return {
    getAll: () => data[key].slice(),
    getById: (id) => data[key].find(i => i.id === parseInt(id)),
    create: (item) => { const i = { id: ++counters[key], ...item, createdAt: new Date().toISOString() }; data[key].push(i); return i; },
    update: (id, updates) => { const i = data[key].find(x => x.id === parseInt(id)); if (!i) return null; Object.assign(i, updates); return i; },
    remove: (id) => { const idx = data[key].findIndex(x => x.id === parseInt(id)); if (idx === -1) return false; data[key].splice(idx, 1); return true; },
    filter: (fn) => data[key].filter(fn),
    reset: () => { data[key].length = 0; counters[key] = 0; },
  };
}

module.exports = {
  users: makeStore('users'),
  products: makeStore('products'),
  orders: makeStore('orders'),
  reviews: makeStore('reviews'),
  categories: makeStore('categories'),
  carts: makeStore('carts'),
  addresses: makeStore('addresses'),
  coupons: makeStore('coupons'),
  notifications: makeStore('notifications'),
  wishlists: makeStore('wishlists'),
  resetAll: () => Object.keys(data).forEach(k => { data[k].length = 0; counters[k] = 0; }),
};
