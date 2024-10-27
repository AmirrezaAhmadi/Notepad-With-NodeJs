const express = require('express');
const router = express.Router();
const notepadControllers = require('../controllers/notepadController');

router.get('/notepad' , notepadControllers.notepadMainController);

router.post('/makenote' , notepadControllers.makeNewNote);

router.post('/delete-note/:id' , notepadControllers.deleteNote);

module.exports=router;