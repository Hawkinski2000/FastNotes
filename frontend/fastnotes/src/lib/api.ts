import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { API_BASE_URL } from '@/config/api'
import { type RawNoteType, type NoteCreateType } from '@/types/api'

export const refreshAccessToken = async () => {
  try {
    const refreshResponse = await axios.post(
      `${API_BASE_URL}/tokens/refresh`,
      {},
      { withCredentials: true },
    )
    const newToken = refreshResponse.data.access_token
    if (newToken) {
      return newToken
    }
  } catch (err) {
    console.error('Failed to refresh access token', err)
    throw err
  }
}

interface JwtPayload {
  user_id: number
  exp: number
}

export const isTokenExpired = (token: string) => {
  try {
    const decoded = jwtDecode<JwtPayload>(token)

    const now = Date.now() / 1000
    return decoded.exp < now
  } catch (err) {
    console.error('Failed to decode token', err)
    return true
  }
}

export const logInUser = async (emailString: string, passwordString: string) => {
  try {
    const formData = new FormData()
    formData.append('username', emailString)
    formData.append('password', passwordString)

    const response = await axios.post(`${API_BASE_URL}/tokens`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    })

    return response
  } catch (err) {
    console.error('logInUser failed:', err)
    throw err
  }
}

export const getNotes = async (token: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/notes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data.map((note: RawNoteType) => ({
      id: note.id,
      title: note.title,
      content: note.content,
      createdAt: new Date(note.created_at),
    }))
  } catch (err) {
    console.error('Failed to fetch notes', err)
    return []
  }
}

export const createNote = async (newNoteData: NoteCreateType, token: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/notes`, newNoteData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const note: RawNoteType = response.data

    return {
      id: note.id,
      title: note.title,
      content: note.content,
      createdAt: new Date(note.created_at),
    }
  } catch (err) {
    console.error('Failed to create note', err)
    throw err
  }
}

export const updateNote = async (id: number, newNoteData: NoteCreateType, token: string) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/notes/${id}`, newNoteData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const note: RawNoteType = response.data

    return {
      id: note.id,
      title: note.title,
      content: note.content,
      createdAt: new Date(note.created_at),
    }
  } catch (err) {
    console.error('Failed to update note', err)
    throw err
  }
}
