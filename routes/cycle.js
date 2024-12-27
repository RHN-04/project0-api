const { Router } = require("express");

const router = new Router();

const cycle = require('../controllers/cycle'); 

router.get('/all', async (req, res) => {
    const result = await cycle.findCycles();
    if (result.success) {
        res.status(200).json(result.cycles);
    } else {
        res.status(result.status || 500).json({ message: result.message });
    }
});

router.post('/add', async (req, res) => {
    const result = await cycle.createCycle(req.body);
    if (result.success) {
        res.status(201).json({ message: result.message });
    } else {
        res.status(result.status || 500).json({ message: result.message });
    }
});

router.put('/:id', async (req, res) => {
    const result = await cycle.updateCycle(req.params.id, req.body);
    if (result.success) {
        res.status(200).json({ message: result.message });
    } else {
        res.status(result.status || 500).json({ message: result.message });
    }
});

router.get('/:id', async (req, res) => {
    const result = await cycle.findOneCycle(req.params.id);
    if (result.success) {
        res.status(200).json(result.cycle);
    } else {
        res.status(404).json({ message: 'Cycle not found' });
    }
});

router.delete('/:id', async (req, res) => {
    const result = await cycle.deleteCycle(req.params.id);
    if (result.success) {
        res.status(200).json({message: result.message});
    } else {
        res.status(404).json({ message: 'Cycle not found' });
    }
});
module.exports = router;
