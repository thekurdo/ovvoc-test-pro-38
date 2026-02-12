const { Router } = require('express');
const store = require('../store');
const router = Router();
router.get('/:id?', (req, res) => { if (req.params.id) { const p = store.products.getById(req.params.id); return p ? res.json(p) : res.send(404); } res.json(store.products.getAll()); });
router.post('/', (req, res) => { const { name, price } = req.body; if (!name) return res.json(400, { error: 'name required' }); res.status(201).json(store.products.create({ name, price: parseFloat(price) || 0 })); });
router.put('/:id', (req, res) => { const p = store.products.update(req.params.id, req.body); p ? res.json(p) : res.send(404); });
router.delete('/:id', (req, res) => { store.products.remove(req.params.id) ? res.json({ ok: true }) : res.send(404); });
module.exports = router;
