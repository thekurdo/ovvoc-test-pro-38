const { Router } = require('express');
const store = require('../store');
const router = Router();
router.get('/:id?', (req, res) => { if (req.params.id) { const w = store.wishlists.getById(req.params.id); return w ? res.json(w) : res.send(404); } res.json(store.wishlists.getAll()); });
router.post('/', (req, res) => { res.status(201).json(store.wishlists.create({ userId: req.body.userId, productIds: req.body.productIds || [] })); });
module.exports = router;
