interface TimelineItem {
  title: string;
  organization: string;
  period: string;
  description?: string;
}

interface TimelineCardProps {
  heading: string;
  items: TimelineItem[];
}

export function TimelineCard({ heading, items }: TimelineCardProps) {
  return (
    <div className="rounded-lg border border-[--glass-border] p-6" style={{ backgroundColor: "var(--glass-bg)" }}>
      <h3 className="mb-4 text-lg font-medium text-foreground">{heading}</h3>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={`${item.organization}-${item.period}`}
            className="border-l-2 border-border pl-4"
          >
            <p className="text-[15px] font-medium text-foreground">
              {item.title}
            </p>
            <p className="text-sm text-muted-foreground">
              {item.organization} &middot; {item.period}
            </p>
            {item.description && (
              <p className="mt-1 text-sm text-muted-foreground">
                {item.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
