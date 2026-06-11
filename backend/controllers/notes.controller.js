import Note from '../models/Note.model.js'


// GET /api/notes
export const getNotes = async (req, res, next) => {
    try {
        const notes = await Note
            .find({ user: req.user._id })
            .sort({ createdAt: -1 })
        res.json(notes)
    } catch (error) { next(error) }
}

// POST /api/notes
export const createNote = async (req, res, next) => {
    try {
        const { title, content, tags } = req.body
        const note = await Note.create({
            title,
            content,
            tags,
            user: req.user._id
        })
        res.status(201).json(note)
    } catch (error) {
        next(error)
    }
}



// GET /api/notes/:id 
export const getNote = async (req, res, next)=>{
    try {
        const note = await Note.findOne({
            _id: req.params.id,
            user: req.user._id
        })

        if (!note) return res.status(404).json({ message: "Note not found" })
        res.json(note)
    } catch (error) {
        next(error)
    }
}

// PATCH /api/notes/:id
export const updateNote = async (req, res, next) => {
    try {
        const { title, content, tags } = req.body

        const note = await Note.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            { title, content, tags },
            {
                new: true,
                runValidators: true
            }
        )
        if (!note) return res.status(404).json({ message: "Note Not Found!" })
        res.json(note)
    } catch (error) { next(error) }
}

// DELETE /api/notes/:id
export const deleteNote = async (req, res, next) => {
    try {
        const note = await Note.findByIdAndDelete({
            _id: req.params.id,
            user: req.user._id

        })
        if (!note) return res.status(404).json({ message: "Note not found" })
        res.status(204).send()
    } catch (error) { next(error) }
}
