import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type FloatingStatCardProps = {
  icon: ReactNode;
  title: string;
  description?: string;
  className?: string;
};

export function FloatingStatCard({
  icon,
  title,
  description,
  className,
}: FloatingStatCardProps) {
  return (
    <div
      className={cn(
        'landing-surface flex max-w-[220px] items-start gap-3 border border-border/80 bg-card/95 p-3 shadow-md backdrop-blur-sm',
        className,
      )}
    >
      <div className="mt-0.5 shrink-0">{icon}</div>
      <div className="min-w-0">
        <p className="text-sm leading-tight font-bold text-foreground">{title}</p>
        {description ? (
          <p className="mt-0.5 text-xs leading-snug text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
