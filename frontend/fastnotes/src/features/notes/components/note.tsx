import { useState, useRef, useEffect } from 'react'
import { useSortable } from '@dnd-kit/react/sortable'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

type NoteProps = {
  id: number
  title?: string
  content?: string
  index: number
  onOpen: () => void
}

export default function Note({ id, title, content, index, onOpen }: NoteProps) {
  const [rowSpan, setRowSpan] = useState(1)

  const cardRef = useRef<HTMLDivElement | null>(null)

  const { ref: sortableRef, isDragging } = useSortable({ id: id, index })

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
    if (!isDragging) onOpen()
  }

  return (
    <Card
      ref={(node) => {
        sortableRef(node)
        cardRef.current = node
      }}
      onClick={handleOpen}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault()
          handleOpen()
        }
      }}
      style={{ gridRowEnd: `span ${rowSpan}` }}
      className={`hover:border-primary transition-border cursor-grab select-none ${
        isDragging ? 'opacity-0' : ''
      }`}
    >
      <CardHeader>
        <CardTitle className="truncate">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="line-clamp-20 wrap-break-word">{content}</CardDescription>
      </CardContent>
    </Card>
  )
}
