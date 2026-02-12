const { Router } = require('express');
const store = require('../store');
const router = Router();
router.get('/:id?', (req, res) => { if (req.params.id) { const c = store.coupons.getById(req.params.id); return c ? res.json(c) : res.send(404); } res.json(store.coupons.getAll()); });
router.post('/', (req, res) => { const { code, discount } = req.body; if (!code) return res.json(400, { error: 'code required' }); res.status(201).json(store.coupons.create({ code, discount: discount || 10 })); });
module.exports = router;
