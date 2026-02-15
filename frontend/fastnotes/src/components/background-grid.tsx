export default function BackgroundGrid() {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      aria-hidden
      style={{
        backgroundImage: `
            linear-gradient(to right, var(--border) 1px, transparent 1px),
            linear-gradient(to bottom, var(--border) 1px, transparent 1px)
          `,
        backgroundSize: '64px 64px',
        opacity: 0.4,
      }}
    />
  )
}
