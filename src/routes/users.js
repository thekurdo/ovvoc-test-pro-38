const { Router } = require('express');
const store = require('../store');
const router = Router();
router.get('{/:id}', (req, res) => { if (req.params.id) { const u = store.users.getById(req.params.id); return u ? res.json(u) : res.sendStatus(404); } res.json(store.users.getAll()); });
router.post('/', (req, res) => { const { name, email } = req.body; if (!name) return res.status(400).json({ error: 'name required' }); res.status(201).json(store.users.create({ name, email })); });
router.put('/:id', (req, res) => { const u = store.users.update(req.params.id, req.body); u ? res.json(u) : res.sendStatus(404); });
router.delete('/:id', (req, res) => { store.users.remove(req.params.id) ? res.json({ ok: true }) : res.sendStatus(404); });
module.exports = router;
