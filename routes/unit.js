const { Router } = require("express");

const router = new Router();

const unit = require('../controllers/unit'); 

router.get('/all', async (req, res) => {
    const result = await unit.findUnits();
    if (result.success) {
        res.status(200).json(result.units);
    } else {
        res.status(result.status || 500).json({ message: result.message });
    }
});

router.get('/subject/:subjectId', async (req, res) => {
    const { subjectId } = req.params;
    const result = await unit.findUnitsBySubject(subjectId);
    if (result.success) {
        res.status(200).json(result.units); 
    } else {
        res.status(result.status || 500).json({ message: result.message });
    }
});

router.post('/add', async (req, res) => {
    const result = await unit.createUnit(req.body);
    if (result.success) {
        res.status(201).json({ message: result.message });
    } else {
        res.status(result.status || 500).json({ message: result.message });
    }
});

router.put('/:id', async (req, res) => {
    const result = await unit.updateUnit(req.params.id, req.body);
    if (result.success) {
        res.status(200).json({ message: result.message });
    } else {
        res.status(result.status || 500).json({ message: result.message });
    }
});

router.get('/:id', async (req, res) => {
    const result = await unit.findOneUnit(req.params.id);
    if (result.success) {
        res.status(200).json(result.unit);
    } else {
        res.status(404).json({ message: 'Unit not found' });
    }
});

router.delete('/:id', async (req, res) => {
    const result = await unit.deleteUnit(req.params.id);
    if (result.success) {
        res.status(200).json({message: result.message});
    } else {
        res.status(404).json({ message: 'Unit not found' });
    }
});
module.exports = router;
