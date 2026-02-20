import { useState, useRef } from 'react'
import { useSortable } from '@dnd-kit/react/sortable'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

type NoteProps = React.ComponentProps<typeof Card> & {
  note_id: number
  title?: string
  content?: string
  createdAt: Date
}

export default function Note({ note_id, title, content, createdAt }: NoteProps) {
  const { ref, isDragging } = useSortable({
    id: note_id,
    index: note_id,
  })

  const [open, setOpen] = useState(false)

  const cardRef = useRef<HTMLDivElement | null>(null)

  const handleOpen = () => {
    if (!isDragging) {
      setOpen(true)
    }
  }

  return (
    <>
      <Card
        ref={(node) => {
          ref(node)
          cardRef.current = node
        }}
        onClick={handleOpen}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
            handleOpen()
          }
        }}
        className={`hover:border-primary transition-border h-50 cursor-grab overflow-hidden select-none ${isDragging && 'opacity-0'}`}
      >
        <CardHeader>
          <CardTitle className="truncate">{title}</CardTitle>
        </CardHeader>
        <CardContent className="overflow-hidden">
          <CardDescription className="line-clamp-6">{content}</CardDescription>
        </CardContent>
      </Card>

      <Dialog
        open={open}
        onOpenChange={(isOpen) => {
          setOpen(isOpen)

          if (!isOpen) {
            requestAnimationFrame(() => {
              cardRef.current?.focus()
            })
          }
        }}
      >
        <DialogContent className="h-[50vh] w-[50vw]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <DialogDescription>{content}</DialogDescription>
          <DialogDescription>{createdAt.toDateString()}</DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  )
}
