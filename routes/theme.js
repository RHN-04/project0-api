const { Router } = require("express");

const router = new Router();

const theme = require('../controllers/theme'); 

router.get('/all', async (req, res) => {
    const result = await theme.findThemes();
    if (result.success) {
        res.status(200).json(result.themes);
    } else {
        res.status(result.status || 500).json({ message: result.message });
    }
});

router.get('/unit/:unitId', async (req, res) => {
    const { unitId } = req.params;
    const result = await theme.findThemesByUnit(unitId);
    if (result.success) {
        res.status(200).json(result.themes); 
    } else {
        res.status(result.status || 500).json({ message: result.message });
    }
});

router.post('/add', async (req, res) => {
    const result = await theme.createTheme(req.body);
    if (result.success) {
        res.status(201).json({ message: result.message });
    } else {
        res.status(result.status || 500).json({ message: result.message });
    }
});

router.put('/:id', async (req, res) => {
    const result = await theme.updateTheme(req.params.id, req.body);
    if (result.success) {
        res.status(200).json({ message: result.message });
    } else {
        res.status(result.status || 500).json({ message: result.message });
    }
});

router.get('/:id', async (req, res) => {
    const result = await theme.findOneTheme(req.params.id);
    if (result.success) {
        res.status(200).json(result.theme);
    } else {
        res.status(404).json({ message: 'Theme not found' });
    }
});

router.delete('/:id', async (req, res) => {
    const result = await theme.deleteTheme(req.params.id);
    if (result.success) {
        res.status(200).json({message: result.message});
    } else {
        res.status(404).json({ message: 'Theme not found' });
    }
});
module.exports = router;
