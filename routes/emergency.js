const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/emergency');

router.get('/api/emergency', ctrl.getEmergencies);
router.get('/api/emergency/:id', ctrl.getEmergency);
router.post('/api/emergency', ctrl.createEmergency);
router.put('/api/emergency/:id', ctrl.updateEmergency);
router.delete('/api/emergency/:id', ctrl.deleteEmergency);

module.exports = router;
