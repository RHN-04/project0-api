const { Router } = require('express');
const curriculum = require('../controllers/curriculum');

const router = new Router();

router.get('/all', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const result = await curriculum.findCurriculums(page, limit);
    if (result.success) {
        res.status(200).json({ curriculums: result.curriculums, totalPages: result.totalPages });
    } else {
        res.status(result.status || 500).json({ message: result.message });
    }
});

router.post('/add', async (req, res) => {
    const result = await curriculum.createCurriculum(req.body);
    if (result.success) {
        res.status(201).json({ message: result.message });
    } else {
        res.status(result.status || 500).json({ message: result.message });
    }
});

router.put('/:id', async (req, res) => {
    const result = await curriculum.updateCurriculum(req.params.id, req.body);
    if (result.success) {
        res.status(200).json({ message: result.message });
    } else {
        res.status(result.status || 500).json({ message: result.message });
    }
});

router.get('/:id', async (req, res) => {
    const result = await curriculum.findOneCurriculum(req.params.id);
    if (result.success) {
        res.status(200).json(result.curriculum);
    } else {
        res.status(404).json({ message: result.message });
    }
});

router.get('/by-specialty/:specialtyId', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const result = await curriculum.findCurriculumsBySpecialty(req.params.specialtyId, page, limit);
    if (result.success) {
        res.status(200).json({ curriculums: result.curriculums, totalPages: result.totalPages });
    } else {
        res.status(result.status || 500).json({ message: result.message });
    }
});

router.delete('/:id', async (req, res) => {
    const result = await curriculum.deleteCurriculum(req.params.id);
    if (result.success) {
        res.status(200).json({ message: result.message });
    } else {
        res.status(404).json({ message: result.message });
    }
});

module.exports = router;
