import { Header } from "@/widgets/header";

/** 섹션 데이터 — 각 섹션의 ID, 배경색, 표시 텍스트 정의 */
const SECTIONS = [
  {
    id: "hero",
    label: "Hero Section",
    bg: "bg-rose-200 dark:bg-rose-900",
  },
  {
    id: "about",
    label: "About Me Section",
    bg: "bg-sky-200 dark:bg-sky-900",
  },
  {
    id: "projects",
    label: "Projects Section",
    bg: "bg-amber-200 dark:bg-amber-900",
  },
] as const;

export function HomePage() {
  return (
    <>
      <Header />
      <main>
        {SECTIONS.map(({ id, label, bg }) => (
          <section
            key={id}
            id={id}
            className={`flex min-h-screen items-center justify-center pt-16 ${bg}`}
          >
            <h2 className="text-4xl font-medium text-foreground">{label}</h2>
          </section>
        ))}
      </main>
    </>
  );
}
