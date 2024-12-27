const { Router } = require("express");

const router = new Router();

const educationLevel = require('../controllers/education_level'); 

router.get('/all', async (req, res) => {
    const result = await educationLevel.findEducationLevels();
    if (result.success) {
        res.status(200).json(result.educationLevels);
    } else {
        res.status(result.status || 500).json({ message: result.message });
    }
});

router.get('/:id', async (req, res) => {
    const result = await educationLevel.findOneEducationLevel(req.params.id);
    if (result.success) {
        res.status(200).json(result.educationLevel);
    } else {
        res.status(404).json({ message: 'Education level not found' });
    }
});
module.exports = router;
