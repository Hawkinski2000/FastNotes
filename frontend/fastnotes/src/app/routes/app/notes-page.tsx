import { useState, useRef, useEffect } from 'react'
import { DragDropProvider, DragOverlay } from '@dnd-kit/react'
import { type DragOperation, type Draggable, type Droppable } from '@dnd-kit/abstract'
import { PointerSensor } from '@dnd-kit/dom'
import { RestrictToElement } from '@dnd-kit/dom/modifiers'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Note from '@/features/notes/components/note'

type NoteType = {
  note_id: number
  title: string
  content: string
  createdAt: Date
}

export default function NotesPage() {
  const [activeId, setActiveId] = useState<number | null>(null)
  const [modifiers, setModifiers] = useState<Array<ReturnType<typeof RestrictToElement.configure>>>(
    [],
  )
  const [isDragging, setIsDragging] = useState(false)

  const [notes, setNotes] = useState<NoteType[]>([
    { note_id: 0, title: 'note title 0', content: 'note content 0', createdAt: new Date() },
    { note_id: 1, title: 'note title 1', content: 'note content 1', createdAt: new Date() },
    {
      note_id: 2,
      title: 'note title 2',
      content:
        'note content 2 note content 2 note content 2 note content 2 note content 2 note content 2 note content 2 note content 2 note content 2 note content 2 note content 2 note content 2 note content 2 note content 2 note content 2 note content 2 note content 2 note content 2 note content 2 note content 2 note content 2 note content 2 note content 2 note content 2 note content 2 note content 2 note content 2 note content 2 note content 2 note content 2 note content 2 note content 2 note content 2 note content 2 note content 2 note content 2 note content 2 note content 2 note content 2 note content 2 note content 2 note content 2 note content 2 note content 2 note content 2 note content 2 note content 2 note content 2 note content 2 note content 2 note content 2 note content 2 note content 2 note content 2 note content 2 ',
      createdAt: new Date(),
    },
    {
      note_id: 3,
      title: 'note title 3',
      content:
        'note content 3 note content 3 note content 3 note content 3 note content 3 note content 3 note content 3 ',
      createdAt: new Date(),
    },
    { note_id: 4, title: 'note title 4', content: 'note content 4', createdAt: new Date() },
    { note_id: 5, title: 'note title 5', content: 'note content 5', createdAt: new Date() },
    { note_id: 6, title: 'note title 6', content: 'note content 6', createdAt: new Date() },
    { note_id: 7, title: 'note title 7', content: 'note content 7', createdAt: new Date() },
    { note_id: 8, title: 'note title 8', content: 'note content 8', createdAt: new Date() },
  ])

  const dragContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (dragContainerRef.current) {
      setModifiers([
        RestrictToElement.configure({
          element: () => dragContainerRef.current,
        }),
      ])
    }
  }, [])

  type NoteDraggable = Draggable<NoteType>
  type NoteDroppable = Droppable<NoteType>

  const handleDragEnd = (operation: DragOperation<NoteDraggable, NoteDroppable>) => {
    const { source, target } = operation

    if (!source || !target) return

    const fromId = source.id
    const toId = target.id

    if (fromId !== toId) {
      setNotes((prevNotes) => {
        const newNotes = [...prevNotes]
        const fromIndex = newNotes.findIndex((n) => n.note_id === fromId)
        const toIndex = newNotes.findIndex((n) => n.note_id === toId)

        const [movedNote] = newNotes.splice(fromIndex, 1)
        newNotes.splice(toIndex, 0, movedNote)

        return newNotes
      })
    }

    setActiveId(null)
  }

  const sensors = [PointerSensor]

  return (
    <>
      <DragDropProvider
        sensors={sensors}
        onDragStart={(event) => {
          if (event.operation.source) {
            setActiveId(event.operation.source.id as number)
            setIsDragging(true)
          }
        }}
        onDragEnd={(event) => {
          handleDragEnd(event.operation)
          setIsDragging(false)
        }}
        modifiers={modifiers}
      >
        <div
          ref={dragContainerRef}
          className="grid flex-1 grid-flow-row-dense auto-rows-[10px] gap-2 overflow-auto p-2"
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(239px, 1fr))',
          }}
        >
          {notes.map((note, index) => (
            <Note key={note.note_id} index={index} {...note} />
          ))}
        </div>

        <DragOverlay>
          {isDragging ? (
            <Card className="border-primary flex origin-top-left scale-110 flex-col overflow-hidden opacity-90 shadow-md backdrop-blur-md">
              <CardHeader className="shrink-0">
                <CardTitle className="truncate">
                  {activeId !== null && notes.find((n) => n.note_id === activeId)!.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="line-clamp-20 overflow-hidden">
                  {activeId !== null && notes.find((n) => n.note_id === activeId)!.content}
                </CardDescription>
              </CardContent>
            </Card>
          ) : null}
        </DragOverlay>
      </DragDropProvider>
    </>
  )
}
