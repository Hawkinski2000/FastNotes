import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Zap, Shield, Clock } from 'lucide-react'

import BackgroundGrid from '@/components/background-grid'

export default function LandingPage() {
  return (
    <div className="bg-background text-foreground relative flex flex-1 flex-col overflow-hidden">
      <BackgroundGrid />

      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 100% 80% at 50% 0%, color-mix(in oklch, var(--primary) 12%, transparent), transparent 60%)',
        }}
      />

      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-4 py-16 sm:py-20 lg:py-28">
        <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center gap-6 text-center">
          <h1 className="text-foreground m-0 text-6xl text-[clamp(2rem,10vw,6rem)] leading-none font-bold tracking-tight sm:text-7xl md:text-8xl">
            FastNotes
          </h1>
          <p className="text-muted-foreground text-lg sm:text-xl md:text-2xl">
            Notes that keep up.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link to="/signup">Get started</Link>
            </Button>

            <Button variant="outline" asChild size="lg">
              <Link to="/login">Sign in</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="flex flex-1 flex-col items-center justify-center px-4 sm:py-20 lg:py-28">
        <div
          className="pointer-events-none absolute inset-0 top-0"
          aria-hidden
          style={{
            background:
              'linear-gradient(to bottom, transparent 0%, color-mix(in oklch, var(--muted) 8%, transparent) 40%, transparent 100%)',
          }}
        />
        <div className="relative mx-auto grid w-[80%] max-w-4xl gap-6 sm:grid-cols-3">
          <Card className="group border-border from-card/95 to-card/80 hover:from-primary/15 hover:to-primary/5 overflow-hidden border bg-linear-to-br shadow-md backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-xl">
            <div className="from-primary/30 to-primary/10 h-0.5 w-full bg-linear-to-r" />
            <CardHeader className="pb-2">
              <div className="bg-primary/10 group-hover:bg-primary mb-3 flex w-fit items-center justify-center rounded-lg p-2.5 transition-colors duration-300">
                <Zap className="text-primary group-hover:text-primary-foreground h-5 w-5 transition-colors duration-300" />
              </div>
              <CardTitle className="text-lg font-semibold">Fast</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm">
              Redis-cached. Opens in a blink.
            </CardContent>
          </Card>

          <Card className="group border-border from-card/95 to-card/80 hover:from-primary/15 hover:to-primary/5 overflow-hidden border bg-linear-to-br shadow-md backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-xl">
            <div className="from-primary/30 to-primary/10 h-0.5 w-full bg-linear-to-r" />
            <CardHeader className="pb-2">
              <div className="bg-primary/10 group-hover:bg-primary mb-3 flex w-fit items-center justify-center rounded-lg p-2.5 transition-colors duration-300">
                <Shield className="text-primary group-hover:text-primary-foreground h-5 w-5 transition-colors duration-300" />
              </div>
              <CardTitle className="text-lg font-semibold">Clean</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm">
              No clutter. Just write.
            </CardContent>
          </Card>

          <Card className="group border-border from-card/95 to-card/80 hover:from-primary/15 hover:to-primary/5 overflow-hidden border bg-linear-to-br shadow-md backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-xl">
            <div className="from-primary/30 to-primary/10 h-0.5 w-full bg-linear-to-r" />
            <CardHeader className="pb-2">
              <div className="bg-primary/10 group-hover:bg-primary mb-3 flex w-fit items-center justify-center rounded-lg p-2.5 transition-colors duration-300">
                <Clock className="text-primary group-hover:text-primary-foreground h-5 w-5 transition-colors duration-300" />
              </div>
              <CardTitle className="text-lg font-semibold">Smart</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm">
              Autosave. Shortcuts. Done.
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
