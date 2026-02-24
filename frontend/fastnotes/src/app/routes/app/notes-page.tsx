import { useState, useRef, useEffect } from 'react'
import { DragDropProvider } from '@dnd-kit/react'
import { type DragOperation, type Draggable, type Droppable } from '@dnd-kit/abstract'
import { PointerSensor } from '@dnd-kit/dom'
import { RestrictToElement } from '@dnd-kit/dom/modifiers'
import Note from '@/features/notes/components/note'
import NoteDragOverlay from '@/features/notes/components/NoteDragOverlay'
import NoteDialog from '@/features/notes/components/NoteDialog'
import { type NoteType } from '@/types/api'
import { useAuth } from '@/lib/use-auth'
import { getNotes } from '@/lib/api'

export default function NotesPage() {
  const [activeId, setActiveId] = useState<number | null>(null)
  const [openNoteId, setOpenNoteId] = useState<number | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [modifiers, setModifiers] = useState<Array<ReturnType<typeof RestrictToElement.configure>>>(
    [],
  )
  const [notes, setNotes] = useState<NoteType[]>([])

  const lastFocusedRef = useRef<HTMLElement | null>(null)
  const dragContainerRef = useRef<HTMLDivElement>(null)

  const { accessToken } = useAuth()

  useEffect(() => {
    const fetchNotes = async () => {
      if (!accessToken) return

      const data = await getNotes(accessToken)
      setNotes(data)
    }

    fetchNotes()
  }, [accessToken])

  useEffect(() => {
    if (dragContainerRef.current) {
      setModifiers([
        RestrictToElement.configure({
          element: () => dragContainerRef.current,
        }),
      ])
    }
  }, [])

  const sensors = [PointerSensor]

  const openedNote = notes.find((n) => n.id === openNoteId)

  const handleDragEnd = (operation: DragOperation<Draggable<NoteType>, Droppable<NoteType>>) => {
    const { source, target } = operation

    if (!source || !target) return

    const fromId = source.id
    const toId = target.id

    if (fromId !== toId) {
      setNotes((prevNotes) => {
        const newNotes = [...prevNotes]
        const fromIndex = newNotes.findIndex((n) => n.id === fromId)
        const toIndex = newNotes.findIndex((n) => n.id === toId)

        const [movedNote] = newNotes.splice(fromIndex, 1)
        newNotes.splice(toIndex, 0, movedNote)

        return newNotes
      })
    }

    setActiveId(null)
  }

  const handleOpenNote = (id: number) => {
    lastFocusedRef.current = document.activeElement as HTMLElement
    setOpenNoteId(id)
  }

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
            <Note key={note.id} index={index} {...note} onOpen={() => handleOpenNote(note.id)} />
          ))}
        </div>

        <NoteDragOverlay isDragging={isDragging} activeId={activeId} notes={notes} />
      </DragDropProvider>

      <NoteDialog
        openNoteId={openNoteId}
        setOpenNoteId={setOpenNoteId}
        openedNote={openedNote}
        lastFocusedRef={lastFocusedRef}
      />
    </>
  )
}
