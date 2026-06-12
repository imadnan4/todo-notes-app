import { useState } from "react"
import type { Note, NoteInput } from "@/api/notes"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Badge } from "./ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { IconPencil, IconTrash, IconX, IconCheck } from "@tabler/icons-react"

interface Props {
  note: Note
  onEdit: (id: string, data: NoteInput) => void
  onDelete: (id: string) => void
}

export function NoteCard({ note, onEdit, onDelete }: Props) {
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)

  const handleSave = () => {
    if (!title.trim()) return
    onEdit(note._id, { title, content })
    setEditing(false)
  }

  const handleCancel = () => {
    setTitle(note.title)
    setContent(note.content)
    setEditing(false)
  }

  if (editing) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="font-medium"
          />
        </CardHeader>

        <CardContent>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            rows={4}
          />
        </CardContent>

        <CardFooter className="gap-2">
          <Button size="sm" onClick={handleSave}>
            <IconCheck className="mr-1 h-4 w-4" />
            Save
          </Button>

          <Button size="sm" variant="ghost" onClick={handleCancel}>
            <IconX className="mr-1 h-4 w-4" />
            Cancel
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base">{note.title}</CardTitle>
          <div className="flex shrink-0 gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => setEditing(true)}
            >
              <IconPencil className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-destructive hover:text-destructive"
              onClick={() => onDelete(note._id)}
            >
              <IconTrash className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </CardHeader>
      {note.content && (
        <CardContent className="pb-2">
          <p className="text-sm whitespace-pre-wrap text-muted-foreground">
            {note.content}
          </p>
        </CardContent>
      )}
      {note.tags?.length > 0 && (
        <CardFooter className="flex flex-wrap gap-1 pt-0">
          {note.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </CardFooter>
      )}
    </Card>
  )
}
