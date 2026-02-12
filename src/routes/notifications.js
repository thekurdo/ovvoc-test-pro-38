const { Router } = require('express');
const store = require('../store');
const router = Router();
router.get('/:id?', (req, res) => { if (req.params.id) { const n = store.notifications.getById(req.params.id); return n ? res.json(n) : res.send(404); } res.json(store.notifications.getAll()); });
router.post('/', (req, res) => { res.status(201).json(store.notifications.create({ userId: req.body.userId, message: req.body.message, read: false })); });
module.exports = router;
