const express = require('express');
const router = express.Router();
const notepadControllers = require('../controllers/notepadController');

router.get('/notepad' , notepadControllers.notepadMainController);

module.exports=router;