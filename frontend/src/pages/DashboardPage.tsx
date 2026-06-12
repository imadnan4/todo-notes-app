import React, { useState } from "react"
import { useNotes } from "@/hooks/useNotes"
import { NoteCard } from "@/components/NoteCard"
import { Navbar } from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { IconPlus, IconLoader2 } from "@tabler/icons-react"

export function DashboardPage() {
  const { notes, loading, error, addNote, editNote, removeNote } = useNotes()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [tags, setTags] = useState("")
  const [creating, setCreating] = useState(false)

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    setCreating(true)
    await addNote({
      title,
      content,
      tags: tags
        ? tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [],
    })
    setContent("")
    setTags("")
    setTitle("")
    setCreating(false)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-4xl flex-1 space-y-8 p-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">New Note</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreate} className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Write Something..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  placeholder="work, ideas (comma separated)"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="tags">tags</Label>
                <Input
                  id="tags"
                  placeholder="Write Something..."
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
              </div>

              <Button type="submit" disabled={creating} size="sm">
                {creating ? (
                  <IconLoader2 className="mr-1 h-4 w-4 animate-spin" />
                ) : (
                  <IconPlus className="mr-1 h-4 w-4" />
                )}
                Add Note
              </Button>
            </form>
          </CardContent>
        </Card>
        {loading && (
          <div className="justifyjustify-center flex py-12">
            <IconLoader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        )}
        {error && (
          <p className="text-center text-sm text-destructive">{error}</p>
        )}
        {!loading && notes.length === 0 && (
          <p className="py-12 text-center text-sm text-muted-foreground">
            No notes yet. Create your first one above
          </p>
        )}
        <div className="lg: grid grid-cols-3 gap-4 sm:grid-cols-2">
          {notes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              onEdit={editNote}
              onDelete={removeNote}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
