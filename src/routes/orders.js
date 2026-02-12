const { Router } = require('express');
const store = require('../store');
const router = Router();
router.get('/:id?', (req, res) => { if (req.params.id) { const o = store.orders.getById(req.params.id); return o ? res.json(o) : res.send(404); } res.json(store.orders.getAll()); });
router.post('/', (req, res) => { const { userId, items, total } = req.body; res.status(201).json(store.orders.create({ userId, items: items || [], total: total || 0, status: 'pending' })); });
router.put('/:id', (req, res) => { const o = store.orders.update(req.params.id, req.body); o ? res.json(o) : res.send(404); });
module.exports = router;
