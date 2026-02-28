export type RawNoteType = {
  id: number
  title?: string
  content?: string
  created_at: string
}

export type NoteType = {
  id: number
  title?: string
  content?: string
  createdAt: Date
}

export type NoteCreateType = {
  title?: string
  content?: string
}
