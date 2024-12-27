const { Router } = require('express');
const specialty = require('../controllers/specialty');

const router = new Router();

router.get('/all', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const result = await specialty.findSpecialties(page, limit);
    if (result.success) {
        res.status(200).json({ specialties: result.specialties, totalPages: result.totalPages });
    } else {
        res.status(result.status || 500).json({ message: result.message });
    }
});

router.get('/search', async (req, res) => {
    const query = req.query.query || '';
    const result = await specialty.searchSpecialties(query);
    if (result.success) {
        res.status(200).json({ specialties: result.specialties });
    } else {
        res.status(result.status || 500).json({ message: result.message });
    }
});

router.post('/add', async (req, res) => {
    const result = await specialty.createSpecialty(req.body);
    if (result.success) {
        res.status(201).json({ message: result.message });
    } else {
        res.status(result.status || 500).json({ message: result.message });
    }
});

router.put('/:id', async (req, res) => {
    const result = await specialty.updateSpecialty(req.params.id, req.body);
    if (result.success) {
        res.status(200).json({ message: result.message });
    } else {
        res.status(result.status || 500).json({ message: result.message });
    }
});

router.get('/:id', async (req, res) => {
    const result = await specialty.findOneSpecialty(req.params.id);
    if (result.success) {
        res.status(200).json(result.specialty);
    } else {
        res.status(404).json({ message: result.message });
    }
});

router.delete('/:id', async (req, res) => {
    const result = await specialty.deleteSpecialty(req.params.id);
    if (result.success) {
        res.status(200).json({ message: result.message });
    } else {
        res.status(404).json({ message: result.message });
    }
});

module.exports = router;
