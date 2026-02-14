import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/components/header";
import LandingPage from "./routes/landing-page";
import LoginPage from "./routes/auth/login-page";
import SignupPage from "./routes/auth/signup-page";
import NotesPage from "./routes/app/notes-page";
import { ProtectedRoute } from "../lib/auth";


export const AppRouter = () => {
  return (
    <BrowserRouter>
      <>
        <div
          className="fixed inset-0 z-0 pointer-events-none"
          aria-hidden
          style={{
            backgroundImage: `
              linear-gradient(to right, var(--border) 1px, transparent 1px),
              linear-gradient(to bottom, var(--border) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
            opacity: 0.4,
          }}
        />
        <div
          className="fixed inset-0 z-0 pointer-events-none"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse 100% 80% at 50% 0%, color-mix(in oklch, var(--primary) 12%, transparent), transparent 60%)",
          }}
        />
        <Header />
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
      </>
    </BrowserRouter>
  );
}
