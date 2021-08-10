const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/dispatcher');

router.get('/api/dispatcher', ctrl.getDispatchers);
router.get('/api/dispatcher/:id', ctrl.getDispatcher);
router.post('/api/dispatcher', ctrl.createDispatcher);
router.put('/api/dispatcher/:id', ctrl.updateDispatcher);
router.delete('/api/dispatcher/:id', ctrl.deleteDispatcher);

module.exports = router;
