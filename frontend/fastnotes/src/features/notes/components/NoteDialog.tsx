import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
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
  return (
    <Dialog
      open={openNoteId !== null}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          setOpenNoteId(null)

          requestAnimationFrame(() => {
            lastFocusedRef.current?.focus()
          })
        }
      }}
    >
      {openedNote && (
        <DialogContent className="h-[50vh] w-[50vw]">
          <DialogHeader>
            <DialogTitle>{openedNote.title}</DialogTitle>
          </DialogHeader>
          <DialogDescription>{openedNote.content}</DialogDescription>
          <DialogDescription>{openedNote.createdAt.toDateString()}</DialogDescription>
        </DialogContent>
      )}
    </Dialog>
  )
}
