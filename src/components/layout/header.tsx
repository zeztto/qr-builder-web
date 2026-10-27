import { KOREAN_LABELS } from '@/constants/korean-labels';

export function Header() {
  return (
    <header className="border-b bg-background sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary">
            큐알잉
          </h1>
          <p className="text-sm text-muted-foreground font-medium">
            {KOREAN_LABELS.header.subtitle}
          </p>
        </div>
      </div>
    </header>
  );
}
