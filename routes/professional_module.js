const { Router } = require("express");

const router = new Router();

const professionalModule = require('../controllers/professional_module'); 

router.get('/all', async (req, res) => {
    const result = await professionalModule.findProfessionalModules();
    if (result.success) {
        res.status(200).json(result.professionalModules);
    } else {
        res.status(result.status || 500).json({ message: result.message });
    }
});

router.post('/add', async (req, res) => {
    const result = await professionalModule.createProfessionalModule(req.body);
    if (result.success) {
        res.status(201).json({ message: result.message });
    } else {
        res.status(result.status || 500).json({ message: result.message });
    }
});

router.put('/:id', async (req, res) => {
    const result = await professionalModule.updateProfessionalModule(req.params.id, req.body);
    if (result.success) {
        res.status(200).json({ message: result.message });
    } else {
        res.status(result.status || 500).json({ message: result.message });
    }
});

router.get('/:id', async (req, res) => {
    const result = await professionalModule.findOneProfessionalModule(req.params.id);
    if (result.success) {
        res.status(200).json(result.professionalModule);
    } else {
        res.status(404).json({ message: 'Professional module not found' });
    }
});

router.delete('/:id', async (req, res) => {
    const result = await professionalModule.deleteProfessionalModule(req.params.id);
    if (result.success) {
        res.status(200).json({message: result.message});
    } else {
        res.status(404).json({ message: 'Professional module not found' });
    }
});
module.exports = router;
