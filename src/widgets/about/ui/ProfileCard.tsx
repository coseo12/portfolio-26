export function ProfileCard() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-border bg-card p-6 text-center">
      {/* 아바타 플레이스홀더 */}
      <div className="size-24 rounded-full bg-muted" aria-hidden="true" />

      <h3 className="text-lg font-medium text-foreground">서코딩</h3>
      <p className="text-sm text-muted-foreground">Frontend Developer</p>
      <p className="text-sm text-muted-foreground">Seoul, South Korea</p>

      {/* 상태 배지 — shadcn Badge 미설치로 span 대체 */}
      <span className="rounded-md bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
        구직 중
      </span>
    </div>
  );
}
