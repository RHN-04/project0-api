const { Router } = require("express");

const router = new Router();

const subject = require('../controllers/subject'); 

router.get('/all', async (req, res) => {
    const result = await subject.findSubjects();
    if (result.success) {
        res.status(200).json(result.subjects);
    } else {
        res.status(result.status || 500).json({ message: result.message });
    }
});

router.get('/:curriculumId/subjects', async (req, res) => {
    const result = await subject.getSubjectsByCurriculum(req.params.curriculumId);
    if (result.success) {
      res.status(200).json(result.subjects);
    } else {
      res.status(result.status || 500).json({ message: result.message });
    }
  });

router.post('/add', async (req, res) => {
    const { body, semesters } = req.body;
    const result = await subject.createSubjectWithSemesters(body, semesters);
    if (result.success) {
        res.status(201).json({ message: result.message, subjectId: result.subjectId });
    } else {
        res.status(result.status || 500).json({ message: result.message });
    }
});

router.put('/:id', async (req, res) => {
    const { body, semesters } = req.body;
    const result = await subject.updateSubjectWithSemesters(req.params.id, body, semesters);
    if (result.success) {
        res.status(200).json({ message: result.message });
    } else {
        res.status(result.status || 500).json({ message: result.message });
    }
});

router.get('/:id', async (req, res) => {
    const result = await subject.findOneSubject(req.params.id);
    if (result.success) {
        res.status(200).json(result.subject);
    } else {
        res.status(404).json({ message: 'Subject not found' });
    }
});

router.delete('/:id', async (req, res) => {
    const result = await subject.deleteSubject(req.params.id);
    if (result.success) {
        res.status(200).json({message: result.message});
    } else {
        res.status(404).json({ message: 'Subject not found' });
    }
});
module.exports = router;
