const { Router } = require('express');
const store = require('../store');
const router = Router();
router.get('{/:id}', (req, res) => { if (req.params.id) { const r = store.reviews.getById(req.params.id); return r ? res.json(r) : res.sendStatus(404); } res.json(store.reviews.getAll()); });
router.post('/', (req, res) => { const { productId, rating, text } = req.body; if (!rating) return res.status(400).json({ error: 'rating required' }); res.status(201).json(store.reviews.create({ productId, rating, text })); });
module.exports = router;
