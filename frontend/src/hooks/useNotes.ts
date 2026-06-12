import { useState, useEffect, useCallback } from "react"
import {
  type Note,
  type NoteInput,
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} from "@/api/notes"
import { toast } from "sonner"

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchNotes = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getNotes()
      setNotes(data)
    } catch {
      setError("Failed to Load Notes")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchNotes()
  }, [fetchNotes])

  const addNote = async (input: NoteInput) => {
    try {
      const note = await createNote(input)
      setNotes((prev) => [note, ...prev])
      toast.success("Note Created")
    } catch {
      toast.error("Failed to create note")
    }
  }
  const editNote = async (id: string, input: NoteInput) => {
    try {
      const updated = await updateNote(id, input)
      setNotes((prev) => prev.map((n) => (n._id === id ? updated : n)))

      toast.success("Note Updated")
    } catch {
      toast.error("Failed to update notes")
    }
  }

  const removeNote = async (id: string) => {
    try {
      await deleteNote(id)
      setNotes((prev) => prev.filter((n) => n._id !== id))
      toast.success("Note Deleted")
    } catch {
      toast.error("Failed to delete note")
    }
  }

  return { notes, loading, error, addNote, editNote, removeNote }
}
