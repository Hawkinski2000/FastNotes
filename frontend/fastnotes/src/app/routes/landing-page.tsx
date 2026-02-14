import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Shield, Clock } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative">
      <div
        className="absolute inset-0 pointer-events-none"
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
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 100% 80% at 50% 0%, color-mix(in oklch, var(--primary) 12%, transparent), transparent 60%)",
        }}
      />

      <section className="flex-1 flex items-center justify-center px-4 pt-32 pb-28 relative">
        <div className="text-center max-w-3xl mx-auto flex flex-col items-center gap-6">
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight text-foreground [font-size:clamp(2.5rem,12vw,96px)] m-0 leading-none">
            FastNotes
          </h1>
          <p className="text-[1.5rem] sm:text-[1.75rem] text-muted-foreground font-medium tracking-tight m-0">
            Notes that keep up.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <Button
              asChild
              size="lg"
              className="font-medium no-underline hover:no-underline focus:no-underline visited:!text-primary-foreground shadow-sm w-auto shrink-0"
            >
              <Link
                to="/signup"
                className="no-underline visited:text-primary-foreground"
              >
                Get started
              </Link>
            </Button>
            <Button
              variant="outline"
              asChild
              size="lg"
              className="font-medium no-underline hover:no-underline focus:no-underline visited:!text-foreground w-auto shrink-0"
            >
              <Link
                to="/login"
                className="no-underline visited:text-foreground"
              >
                Sign in
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="px-4 relative py-24">
        <div
          className="absolute inset-0 top-0 pointer-events-none"
          aria-hidden
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, color-mix(in oklch, var(--muted) 8%, transparent) 40%, transparent 100%)",
          }}
        />
        <div className="w-[80%] max-w-4xl mx-auto relative grid sm:grid-cols-3 gap-6">
          <Card className="group border border-border bg-gradient-to-br from-card/95 to-card/80 shadow-md hover:shadow-xl hover:-translate-y-1.5 hover:from-primary/15 hover:to-primary/5 transition-all duration-300 ease-out overflow-hidden backdrop-blur-sm">
            <div className="h-0.5 w-full bg-gradient-to-r from-primary/30 to-primary/10" />
            <CardHeader className="pb-2">
              <div className="mb-3 p-2.5 rounded-lg bg-primary/10 group-hover:bg-primary transition-colors duration-300 w-fit flex items-center justify-center">
                <Zap className="h-5 w-5 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
              </div>
              <CardTitle className="text-lg font-semibold">Fast</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Redis-cached. Opens in a blink.
            </CardContent>
          </Card>
          <Card className="group border border-border bg-gradient-to-br from-card/95 to-card/80 shadow-md hover:shadow-xl hover:-translate-y-1.5 hover:from-primary/15 hover:to-primary/5 transition-all duration-300 ease-out overflow-hidden backdrop-blur-sm">
            <div className="h-0.5 w-full bg-gradient-to-r from-primary/30 to-primary/10" />
            <CardHeader className="pb-2">
              <div className="mb-3 p-2.5 rounded-lg bg-primary/10 group-hover:bg-primary transition-colors duration-300 w-fit flex items-center justify-center">
                <Shield className="h-5 w-5 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
              </div>
              <CardTitle className="text-lg font-semibold">Clean</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              No clutter. Just write.
            </CardContent>
          </Card>
          <Card className="group border border-border bg-gradient-to-br from-card/95 to-card/80 shadow-md hover:shadow-xl hover:-translate-y-1.5 hover:from-primary/15 hover:to-primary/5 transition-all duration-300 ease-out overflow-hidden backdrop-blur-sm">
            <div className="h-0.5 w-full bg-gradient-to-r from-primary/30 to-primary/10" />
            <CardHeader className="pb-2">
              <div className="mb-3 p-2.5 rounded-lg bg-primary/10 group-hover:bg-primary transition-colors duration-300 w-fit flex items-center justify-center">
                <Clock className="h-5 w-5 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
              </div>
              <CardTitle className="text-lg font-semibold">Smart</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Autosave. Shortcuts. Done.
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
