import { DragOverlay } from '@dnd-kit/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { type NoteType } from '@/types/api'

type NoteDragOverlayProps = {
  isDragging: boolean
  activeId: number | null
  notes: NoteType[]
}

export default function NoteDragOverlay({ isDragging, activeId, notes }: NoteDragOverlayProps) {
  return (
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
  )
}
