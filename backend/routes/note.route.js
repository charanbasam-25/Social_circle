import express from 'express';
import { getNotes, deleteNote, updateNote, addNote } from '../controllers/note.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';


const router = express.Router();


router.get('/getNote', protectRoute,getNotes);
router.post('/',protectRoute, addNote);
router.patch('/:id',protectRoute, updateNote);
router.delete('/:id',protectRoute, deleteNote);

export default router;
