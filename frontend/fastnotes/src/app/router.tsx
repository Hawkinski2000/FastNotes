import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from '@/components/header'
import LandingPage from './routes/landing-page'
import LoginPage from './routes/auth/login-page'
import SignupPage from './routes/auth/signup-page'
import NotesPage from './routes/app/notes-page'
import { ProtectedRoute } from '@/lib/auth'

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 flex-col">
          <Routes>
            <Route index element={<LandingPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route
              path="notes"
              element={
                <ProtectedRoute>
                  <NotesPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
