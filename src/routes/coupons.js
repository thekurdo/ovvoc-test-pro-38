const { Router } = require('express');
const store = require('../store');
const router = Router();
router.get('{/:id}', (req, res) => { if (req.params.id) { const c = store.coupons.getById(req.params.id); return c ? res.json(c) : res.sendStatus(404); } res.json(store.coupons.getAll()); });
router.post('/', (req, res) => { const { code, discount } = req.body; if (!code) return res.status(400).json({ error: 'code required' }); res.status(201).json(store.coupons.create({ code, discount: discount || 10 })); });
module.exports = router;
