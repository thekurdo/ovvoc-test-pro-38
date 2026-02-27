const express = require('express');
const app = express();
app.use(express.json());

app.get('/health', (req, res) => { res.json({ status: 'ok', host: req.hostname }); });

// Mount 10 route modules
app.use('/api/users', require('./routes/users'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/carts', require('./routes/carts'));
app.use('/api/addresses', require('./routes/addresses'));
app.use('/api/coupons', require('./routes/coupons'));
app.use('/api/notifications', require('./routes/notifications'));
app.use('/api/wishlists', require('./routes/wishlists'));

// Search — /api/search/* wildcard (breaks in Express 5)
app.get('/api/search/{*path}', (req, res) => {
  const query = req.url.replace('/api/search/', '').toLowerCase();
  const store = require('./store');
  const products = store.products.filter(p => p.name && p.name.toLowerCase().includes(query));
  res.json(products);
});

// Docs — /docs/* wildcard (breaks in Express 5)
app.get('/docs/{*path}', (req, res) => { res.json({ topic: req.url }); });

// 404 catch-all
app.all('{*path}', (req, res) => { res.status(404).json({ error: 'Not found' }); });

if (require.main === module) { app.listen(3000, () => console.log('Server on :3000')); }
module.exports = app;
