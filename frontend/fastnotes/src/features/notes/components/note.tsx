import { useState, useRef, useEffect } from 'react'
import { useSortable } from '@dnd-kit/react/sortable'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { EllipsisVerticalIcon, Trash2Icon } from 'lucide-react'

type NoteProps = {
  id: number
  title?: string
  content?: string
  index: number
  onOpen: () => void
  handleDeleteNote: (id: number) => Promise<void>
}

export default function Note({ id, title, content, index, onOpen, handleDeleteNote }: NoteProps) {
  const [rowSpan, setRowSpan] = useState(1)
  const [hovering, setHovering] = useState(false)
  const [keyboardFocus, setKeyboardFocus] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const focused = hovering || keyboardFocus || menuOpen

  const cardRef = useRef<HTMLDivElement | null>(null)
  const measureRef = useRef<HTMLDivElement | null>(null)

  const { ref: sortableRef, isDragging } = useSortable({ id: id, index })

  const calculateSpan = () => {
    if (!measureRef.current) return

    const rowHeight = 10
    const gap = 8

    const contentHeight = measureRef.current.getBoundingClientRect().height
    const span = Math.ceil((contentHeight + gap) / (rowHeight + gap))

    setRowSpan(span)
  }

  useEffect(() => {
    calculateSpan()
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
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocus={() => setKeyboardFocus(true)}
      onBlur={() => setKeyboardFocus(false)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault()
          handleOpen()
        }
      }}
      style={{ gridRowEnd: `span ${rowSpan}` }}
      className={`hover:border-primary relative cursor-grab transition-colors select-none ${
        isDragging ? 'opacity-0' : ''
      }`}
    >
      <div ref={measureRef}>
        <CardHeader>
          <CardTitle className="truncate">{title}</CardTitle>
        </CardHeader>
        <CardContent className="pb-8">
          <CardDescription className="line-clamp-20 wrap-break-word whitespace-pre-wrap">
            {content}
          </CardDescription>
        </CardContent>
      </div>

      <DropdownMenu onOpenChange={setMenuOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant={'ghost'}
            size={'icon'}
            className={`full absolute right-1 bottom-1 rounded-full opacity-0 shadow-none transition ${focused && 'opacity-100'}`}
          >
            <EllipsisVerticalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation()
              handleDeleteNote(id)
            }}
            variant="destructive"
          >
            <Trash2Icon />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Card>
  )
}
