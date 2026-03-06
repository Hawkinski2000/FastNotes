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
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { EllipsisVerticalIcon, Trash2Icon } from 'lucide-react'
import { type NoteType, type NoteCreateType } from '@/types/api'

type NoteDialogProps = {
  creatingNote: boolean
  setCreatingNote: React.Dispatch<React.SetStateAction<boolean>>
  openNoteId: number | null
  setOpenNoteId: React.Dispatch<React.SetStateAction<number | null>>
  openedNote: NoteType | undefined
  lastFocusedRef: React.RefObject<HTMLElement | null>
  handleCreateNote: (newNoteData: NoteCreateType) => Promise<void>
  handleUpdateNote: (id: number, newNoteData: NoteCreateType) => Promise<void>
  handleDeleteNote: (id: number) => Promise<void>
}

export default function NoteDialog({
  creatingNote,
  setCreatingNote,
  openNoteId,
  setOpenNoteId,
  openedNote,
  lastFocusedRef,
  handleCreateNote,
  handleUpdateNote,
  handleDeleteNote,
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
          if (creatingNote && (title || content)) {
            handleCreateNote({ title: title, content: content })
          } else if (openNoteId !== null) {
            handleUpdateNote(openNoteId, { title: title, content: content })
          }

          setOpenNoteId(null)
          setCreatingNote(false)
          setTitle('')
          setContent('')
          requestAnimationFrame(() => lastFocusedRef.current?.focus())
        }
      }}
    >
      {(creatingNote || openedNote) && (
        <DialogContent className="flex h-full max-h-full w-full max-w-full flex-col pr-1 pb-1 sm:h-auto sm:max-h-[90vh] sm:w-[30vw]">
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
          <DialogFooter className="flex-row justify-end">
            <DialogDescription className="flex items-center text-xs">
              {openedNote && openedNote.createdAt.toDateString()}
            </DialogDescription>

            {openNoteId && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={'ghost'} size={'icon'} className="rounded-full shadow-none">
                    <EllipsisVerticalIcon />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation()

                      handleDeleteNote(openNoteId)

                      setOpenNoteId(null)
                      setTitle('')
                      setContent('')
                    }}
                    variant="destructive"
                  >
                    <Trash2Icon />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  )
}
