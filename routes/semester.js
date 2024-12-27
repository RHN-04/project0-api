const { Router } = require("express");

const router = new Router();

const semester = require('../controllers/semester'); 

router.get('/all', async (req, res) => {
    const result = await semester.findSemesters();
    if (result.success) {
        res.status(200).json(result.semesters);
    } else {
        res.status(result.status || 500).json({ message: result.message });
    }
});

router.post('/add', async (req, res) => {
    const result = await semester.createSemester(req.body);
    if (result.success) {
        res.status(201).json({ message: result.message });
    } else {
        res.status(result.status || 500).json({ message: result.message });
    }
});

router.put('/:id', async (req, res) => {
    const result = await semester.updateSemester(req.params.id, req.body);
    if (result.success) {
        res.status(200).json({ message: result.message });
    } else {
        res.status(result.status || 500).json({ message: result.message });
    }
});

router.get('/subject/:subjectId', async (req, res) => {
    const result = await semester.findSemestersBySubject(req.params.subjectId);
    if (result.success) {
        res.status(200).json(result.semesters);
    } else {
        res.status(result.status || 500).json({ message: result.message });
    }
});

router.get('/:id', async (req, res) => {
    const result = await semester.findOneSemester(req.params.id);
    if (result.success) {
        res.status(200).json(result.semester);
    } else {
        res.status(404).json({ message: 'Semester not found' });
    }
});

router.delete('/:id', async (req, res) => {
    const result = await semester.deleteSemester(req.params.id);
    if (result.success) {
        res.status(200).json({message: result.message});
    } else {
        res.status(404).json({ message: 'Semester not found' });
    }
});
module.exports = router;
