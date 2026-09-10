export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Ambient Grid */}
      <div className="absolute inset-0 grid-bg-subtle opacity-50" />

      {/* Ambient Glow 1 — Soft native radial gradients without expensive blur filters */}
      <div
        className="absolute top-[8%] left-[10%] w-[50vw] max-w-[650px] h-[50vw] max-h-[650px] rounded-full pointer-events-none opacity-80"
        style={{
          background: 'radial-gradient(circle, rgba(227,30,36,0.06) 0%, rgba(227,30,36,0.02) 40%, transparent 70%)',
        }}
      />

      {/* Ambient Glow 2 */}
      <div
        className="absolute bottom-[15%] right-[5%] w-[45vw] max-w-[600px] h-[45vw] max-h-[600px] rounded-full pointer-events-none opacity-80"
        style={{
          background: 'radial-gradient(circle, rgba(176,21,32,0.05) 0%, rgba(176,21,32,0.015) 45%, transparent 65%)',
        }}
      />

      {/* Subtle Scanlines Overlay */}
      <div className="absolute inset-0 noise-overlay opacity-20 pointer-events-none" />
    </div>
  );
}
