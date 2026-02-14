import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import { useState } from "react";
import githubBlack from "@/assets/GitHub_Invertocat_Black_Clearspace.svg";
import githubWhite from "@/assets/GitHub_Invertocat_White_Clearspace.svg";

const THEME_KEY = "fastnotes-theme";
const GITHUB_URL = "https://github.com/Hawkinski2000/FastNotes";

export function Header() {
  const [isDark, setIsDark] = useState(() => {
    return document.documentElement.classList.contains("dark");
  });

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem(THEME_KEY, "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem(THEME_KEY, "light");
    }
  };

  const iconButtonClass =
    "h-9 w-9 rounded-full border-0 shadow-sm hover:scale-110 transition-transform duration-200 focus-visible:ring-0 focus-visible:ring-offset-0 !bg-gradient-to-br !from-card/95 !to-card/80 backdrop-blur-sm text-foreground dark:!text-white hover:text-foreground hover:dark:!text-white hover:!bg-gradient-to-br hover:!from-card/95 hover:!to-card/80";

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-2">
        <Link
          to="/"
          className="flex items-center gap-2 text-foreground no-underline hover:opacity-80 transition-opacity"
          aria-label="FastNotes home"
        >
          <img src="/mug-icon.svg" alt="" className="h-8 w-8" />
          <span className="font-semibold text-lg tracking-tight">FastNotes</span>
        </Link>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            size="icon"
            onClick={() => window.open(GITHUB_URL, "_blank", "noopener,noreferrer")}
            aria-label="FastNotes on GitHub"
            className={iconButtonClass}
          >
            <img
              src={isDark ? githubWhite : githubBlack}
              alt=""
              className="h-5 w-5"
            />
          </Button>
          <Button
            type="button"
            size="icon"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className={iconButtonClass}
          >
            {isDark ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
