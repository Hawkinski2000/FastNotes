import { useState, useRef, useEffect } from 'react'
import { DragDropProvider, DragOverlay } from '@dnd-kit/react'
import { PointerSensor } from '@dnd-kit/dom'
import { RestrictToElement } from '@dnd-kit/dom/modifiers'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Note from '@/features/notes/components/note'

export default function NotesPage() {
  const [activeId, setActiveId] = useState<number | null>(null)
  const [modifiers, setModifiers] = useState<Array<ReturnType<typeof RestrictToElement.configure>>>(
    [],
  )

  const dragContainerRef = useRef<HTMLDivElement>(null)

  const notes = [
    { note_id: 0, title: 'note title 0', content: 'note content 0', createdAt: new Date() },
    { note_id: 1, title: 'note title 1', content: 'note content 1', createdAt: new Date() },
    { note_id: 2, title: 'note title 2', content: 'note content 2', createdAt: new Date() },
    { note_id: 3, title: 'note title 3', content: 'note content 3', createdAt: new Date() },
    { note_id: 4, title: 'note title 4', content: 'note content 4', createdAt: new Date() },
    { note_id: 5, title: 'note title 5', content: 'note content 5', createdAt: new Date() },
    { note_id: 6, title: 'note title 6', content: 'note content 6', createdAt: new Date() },
    { note_id: 7, title: 'note title 7', content: 'note content 7', createdAt: new Date() },
    { note_id: 8, title: 'note title 8', content: 'note content 8', createdAt: new Date() },
  ]

  const sensors = [PointerSensor]

  useEffect(() => {
    if (dragContainerRef.current) {
      setModifiers([
        RestrictToElement.configure({
          element: () => dragContainerRef.current,
        }),
      ])
    }
  }, [])

  return (
    <>
      <DragDropProvider
        sensors={sensors}
        onDragStart={(event) => {
          if (event.operation.source) {
            setActiveId(event.operation.source.id as number)
          }
        }}
        onDragEnd={() => setActiveId(null)}
        modifiers={modifiers}
      >
        <div
          ref={dragContainerRef}
          className="grid flex-1 auto-rows-min grid-cols-2 gap-2 p-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7"
        >
          {notes.map((note) => (
            <Note key={note.note_id} {...note} />
          ))}
        </div>

        <DragOverlay>
          {activeId !== null ? (
            <Card className="border-primary h-50 origin-top-left scale-110 overflow-hidden opacity-90 shadow-md backdrop-blur-md">
              <CardHeader>
                <CardTitle>
                  {activeId !== null && notes.find((n) => n.note_id === activeId)!.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
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
