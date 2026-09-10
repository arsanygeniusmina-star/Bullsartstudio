interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const wordmarkHeights = { sm: 40, md: 56, lg: 80 };

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  return (
    <span className={`inline-flex items-center select-none ${className}`}>
      <img
        src="/logo-full.png"
        alt="BULLS ART STUDIO"
        height={wordmarkHeights[size]}
        style={{ height: wordmarkHeights[size], width: 'auto' }}
        className="shrink-0 drop-shadow-[0_0_10px_rgba(227,30,36,0.15)]"
      />
    </span>
  );
}
