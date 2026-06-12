import api from "./axios"

export interface Note {
  _id: string
  title: string
  content: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

export interface NoteInput {
  title: string
  content?: string
  tags?: string[]
}

export const getNotes = async (): Promise<Note[]> => {
  const res = await api.get("./api/notes")
  return res.data
}

export const createNote = async (data: NoteInput): Promise<Note[]> => {
  const res = await api.post("./api/notes", data)
  return res.data
}

export const updateNote = async (
  id: string,
  data: NoteInput
): Promise<Note[]> => {
  const res = await api.patch(`./api/notes/${id}`, data)
  return res.data
}

export const deleteNote = async (id: string): Promise<Note[]> => {
  const res = await api.delete(`./api/notes/${id}`)
  return res.data
}
