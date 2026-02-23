import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { type NoteType } from '@/types/api'

type NoteDialogProps = {
  openNoteId: number | null
  setOpenNoteId: React.Dispatch<React.SetStateAction<number | null>>
  openedNote: NoteType | undefined
  lastFocusedRef: React.RefObject<HTMLElement | null>
}

export default function NoteDialog({
  openNoteId,
  setOpenNoteId,
  openedNote,
  lastFocusedRef,
}: NoteDialogProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    if (!openedNote) return
    requestAnimationFrame(() => {
      setTitle(openedNote.title)
      setContent(openedNote.content)
    })
  }, [openedNote])

  return (
    <Dialog
      open={openNoteId !== null}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          setOpenNoteId(null)
          setTitle('')
          setContent('')
          requestAnimationFrame(() => lastFocusedRef.current?.focus())
        }
      }}
    >
      {openedNote && (
        <DialogContent className="flex h-full max-h-full w-full max-w-full flex-col sm:h-auto sm:max-h-[90vh] sm:w-[30vw]">
          <DialogHeader>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="border-none p-0 text-xl font-semibold tracking-tight shadow-none focus-visible:ring-0 md:text-xl"
            />
          </DialogHeader>

          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="field-sizing-content min-h-0 flex-1 resize-none border-none p-0 shadow-none focus-visible:ring-0"
          />

          <DialogDescription className="text-right text-sm">
            {openedNote.createdAt.toDateString()}
          </DialogDescription>
        </DialogContent>
      )}
    </Dialog>
  )
}
