const express = require('express');
const router = express.Router();
const notes = require('../controllers/note.controller.js');
const auth = require('../controllers/authentication.js');

// Create a new Note
router.route('/notes').post(notes.create);

// Retrieve all Notes
router.route('/notes').get(notes.findAll);

// Retrieve a single Note with noteId
router.route('/notes/:noteId').get(notes.findOne);

// Update a Note with noteId
router.route('/notes/:noteId').put(notes.update);

// Delete a Note with noteId
router.route('/notes/:noteId').delete(notes.delete);

router.route('/register').post(auth.register);

router.route('/login').post(auth.login);

module.exports = router;