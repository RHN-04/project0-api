const { Router } = require("express");

const router = new Router();

const lesson = require('../controllers/lesson'); 

router.get('/all', async (req, res) => {
    const result = await lesson.findLessons();
    if (result.success) {
        res.status(200).json(result.lessons);
    } else {
        res.status(result.status || 500).json({ message: result.message });
    }
});

router.get('/theme/:themeId', async (req, res) => {
    const { themeId } = req.params;
    const result = await lesson.findLessonsByTheme(themeId);
    if (result.success) {
      res.status(200).json(result.lessons); 
    } else {
      res.status(result.status || 500).json({ message: result.message });
    }
 });  

router.post('/add', async (req, res) => {
    const result = await lesson.createLesson(req.body);
    if (result.success) {
        res.status(201).json({ message: result.message });
    } else {
        res.status(result.status || 500).json({ message: result.message });
    }
});

router.put('/:id', async (req, res) => {
    const result = await lesson.updateLesson(req.params.id, req.body);
    if (result.success) {
        res.status(200).json({ message: result.message });
    } else {
        res.status(result.status || 500).json({ message: result.message });
    }
});

router.get('/:id', async (req, res) => {
    const result = await lesson.findOneLesson(req.params.id);
    if (result.success) {
        res.status(200).json(result.lesson);
    } else {
        res.status(404).json({ message: 'Lesson not found' });
    }
});

router.delete('/:id', async (req, res) => {
    const result = await lesson.deleteLesson(req.params.id);
    if (result.success) {
        res.status(200).json({message: result.message});
    } else {
        res.status(404).json({ message: 'Lesson not found' });
    }
});
module.exports = router;
