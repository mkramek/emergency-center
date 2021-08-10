const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/emergencyType');

router.get('/api/emergency/type', ctrl.getEmergencyTypes);
router.get('/api/emergency/type/:id', ctrl.getEmergencyType);
router.post('/api/emergency/type', ctrl.createEmergencyType);
router.put('/api/emergency/type/:id', ctrl.updateEmergencyType);
router.delete('/api/emergency/type/:id', ctrl.deleteEmergencyType);

module.exports = router;
