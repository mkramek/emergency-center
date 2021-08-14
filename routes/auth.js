const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/auth');

router.post('/api/auth', ctrl.login);

module.exports = router;