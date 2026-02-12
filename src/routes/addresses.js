const { Router } = require('express');
const store = require('../store');
const router = Router();
router.get('/:id?', (req, res) => { if (req.params.id) { const a = store.addresses.getById(req.params.id); return a ? res.json(a) : res.send(404); } res.json(store.addresses.getAll()); });
router.post('/', (req, res) => { const { userId, street, city, zip } = req.body; res.status(201).json(store.addresses.create({ userId, street, city, zip })); });
module.exports = router;
