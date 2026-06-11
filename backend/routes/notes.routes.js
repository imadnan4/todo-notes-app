import { Router} from "express";
import { protect } from "../middleware/auth.middleware.js"
import { getNotes, createNote, getNote, updateNote, deleteNote } from "../controllers/notes.controller.js";


const router = Router()

router.use(protect)

router.route('/')
    .get(getNotes)
    .post(createNote)


router.route('/:id')
    .get(getNote)
    .patch(updateNote)
    .delete(deleteNote)

export default router