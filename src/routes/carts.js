const { Router } = require('express');
const store = require('../store');
const router = Router();
router.get('/:id?', (req, res) => { if (req.params.id) { const c = store.carts.getById(req.params.id); return c ? res.json(c) : res.send(404); } res.json(store.carts.getAll()); });
router.post('/', (req, res) => { res.status(201).json(store.carts.create({ userId: req.body.userId, items: [] })); });
router.put('/:id', (req, res) => { const c = store.carts.update(req.params.id, req.body); c ? res.json(c) : res.send(404); });
module.exports = router;
