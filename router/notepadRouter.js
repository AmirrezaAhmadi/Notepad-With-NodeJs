const express = require('express');
const router = express.Router();
const notepadController = require('../controllers/notepadController');

router.get('/notepad');

module.exports=router;