const express = require('express');
const router = express.Router();
const notesController = require('../controllers/note.controller.js');


router.get('/home', notesController.home);
router.get('/about', notesController.about);
router.get('/noteslist', notesController.noteslist);
router.get('/noteinfo/:_id', notesController.noteinfo);
router.get('/notenew', notesController.notenew);
router.post('/addnote', notesController.doAddReview);
module.exports = router;

