import { KOREAN_LABELS } from '@/constants/korean-labels';

export function Footer() {
  return (
    <footer className="border-t mt-12">
      <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
        <p>
          {KOREAN_LABELS.footer.copyright}
        </p>
      </div>
    </footer>
  );
}
