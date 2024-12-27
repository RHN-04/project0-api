const { Router } = require("express");

const router = new Router();

const source = require('../controllers/source'); 

router.get('/all', async (req, res) => {
    const result = await source.findSources();
    if (result.success) {
        res.status(200).json(result.sources);
    } else {
        res.status(result.status || 500).json({ message: result.message });
    }
});

router.post('/add', async (req, res) => {
    const result = await source.createSource(req.body);
    if (result.success) {
        res.status(201).json({ message: result.message });
    } else {
        res.status(result.status || 500).json({ message: result.message });
    }
});

router.put('/:id', async (req, res) => {
    const result = await source.updateSource(req.params.id, req.body);
    if (result.success) {
        res.status(200).json({ message: result.message });
    } else {
        res.status(result.status || 500).json({ message: result.message });
    }
});

router.get('/:id', async (req, res) => {
    const result = await source.findOneSource(req.params.id);
    if (result.success) {
        res.status(200).json(result.source);
    } else {
        res.status(404).json({ message: 'Source not found' });
    }
});

router.delete('/:id', async (req, res) => {
    const result = await source.deleteSource(req.params.id);
    if (result.success) {
        res.status(200).json({message: result.message});
    } else {
        res.status(404).json({ message: 'Source not found' });
    }
});
module.exports = router;
