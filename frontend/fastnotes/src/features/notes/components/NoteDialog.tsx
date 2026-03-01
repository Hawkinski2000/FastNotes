import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { type NoteType, type NoteCreateType } from '@/types/api'

type NoteDialogProps = {
  creatingNote: boolean
  openNoteId: number | null
  setOpenNoteId: React.Dispatch<React.SetStateAction<number | null>>
  openedNote: NoteType | undefined
  lastFocusedRef: React.RefObject<HTMLElement | null>
  handleCreateNote: (newNoteData: NoteCreateType) => Promise<void>
  handleUpdateNote: (id: number, newNoteData: NoteCreateType) => Promise<void>
}

export default function NoteDialog({
  creatingNote,
  openNoteId,
  setOpenNoteId,
  openedNote,
  lastFocusedRef,
  handleCreateNote,
  handleUpdateNote,
}: NoteDialogProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    if (!openedNote) return
    requestAnimationFrame(() => {
      setTitle(openedNote.title || '')
      setContent(openedNote.content || '')
    })
  }, [openedNote])

  return (
    <Dialog
      open={creatingNote || openNoteId !== null}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          if (creatingNote) {
            handleCreateNote({ title: title, content: content })
          } else if (openNoteId !== null) {
            handleUpdateNote(openNoteId, { title: title, content: content })
          }

          setOpenNoteId(null)
          setTitle('')
          setContent('')
          requestAnimationFrame(() => lastFocusedRef.current?.focus())
        }
      }}
    >
      {(creatingNote || openedNote) && (
        <DialogContent className="flex h-full max-h-full w-full max-w-full flex-col sm:h-auto sm:max-h-[90vh] sm:w-[30vw]">
          <DialogHeader>
            <DialogTitle>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="border-none p-0 text-xl tracking-tight shadow-none focus-visible:ring-0 md:text-xl"
              />
            </DialogTitle>
          </DialogHeader>

          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write something..."
            className="field-sizing-content min-h-0 flex-1 resize-none border-none p-0 shadow-none focus-visible:ring-0"
          />
          <DialogFooter>
            <DialogDescription className="text-right text-sm">
              {openedNote && openedNote.createdAt.toDateString()}
            </DialogDescription>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  )
}
