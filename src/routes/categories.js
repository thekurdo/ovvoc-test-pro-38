const { Router } = require('express');
const store = require('../store');
const router = Router();
router.get('{/:id}', (req, res) => { if (req.params.id) { const c = store.categories.getById(req.params.id); return c ? res.json(c) : res.sendStatus(404); } res.json(store.categories.getAll()); });
router.post('/', (req, res) => { const { name } = req.body; if (!name) return res.status(400).json({ error: 'name required' }); res.status(201).json(store.categories.create({ name })); });
module.exports = router;
