import { useState, useRef, useEffect } from 'react'
import { useSortable } from '@dnd-kit/react/sortable'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

type NoteProps = {
  note_id: number
  title?: string
  content?: string
  createdAt: Date
  index: number
}

export default function Note({ note_id, title, content, createdAt, index }: NoteProps) {
  const { ref: sortableRef, isDragging } = useSortable({ id: note_id, index })
  const [open, setOpen] = useState(false)
  const [rowSpan, setRowSpan] = useState(1)

  const cardRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const calculateSpan = () => {
      if (!cardRef.current) return

      const rowHeight = 10
      const gap = 8

      const contentHeight = cardRef.current.scrollHeight
      const totalHeight = contentHeight + gap

      const span = Math.ceil(totalHeight / (rowHeight + gap))
      setRowSpan(span)
    }

    const id = requestAnimationFrame(calculateSpan)

    const resizeObserver = new ResizeObserver(() => {
      calculateSpan()
    })
    if (cardRef.current) resizeObserver.observe(cardRef.current)

    return () => {
      cancelAnimationFrame(id)
      resizeObserver.disconnect()
    }
  }, [title, content])

  const handleOpen = () => {
    if (!isDragging) setOpen(true)
  }

  return (
    <>
      <Card
        ref={(node) => {
          sortableRef(node)
          cardRef.current = node
        }}
        style={{ gridRowEnd: `span ${rowSpan}` }}
        onClick={handleOpen}
        className={`hover:border-primary transition-border cursor-grab select-none ${
          isDragging ? 'opacity-0' : ''
        }`}
      >
        <CardHeader>
          <CardTitle className="truncate">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="line-clamp-20">{content}</CardDescription>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
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
