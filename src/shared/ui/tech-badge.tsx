// 기술별 브랜드 컬러 (톤 다운하여 다크 테마에 녹아들도록 사용)
const TECH_COLORS: Record<string, string> = {
  // Languages
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  Go: "#00ADD8",
  Rust: "#DEA584",
  Python: "#3776AB",
  // Frontend
  React: "#61DAFB",
  "Vue.js": "#4FC08D",
  "Next.js": "#AAAAAA",
  // Backend
  "Node.js": "#339933",
  NestJS: "#E0234E",
  GraphQL: "#E10098",
  // Specialized
  WebGL: "#C43B3B",
  WebRTC: "#2FBAA0",
  WebAssembly: "#654FF0",
  Electron: "#47848F",
  Docker: "#2496ED",
  // AI
  "Claude Code": "#D97757",
  "Gemini CLI": "#8B6CF6",
  LangChain: "#2DA882",
  CrewAI: "#FF6B35",
  "OpenAI API": "#10A37F",
  // Projects에서 사용하는 추가 기술
  Turborepo: "#EF4444",
  Vite: "#646CFF",
  "Canvas API": "#E44D26",
  Twilio: "#F22F46",
  WebSocket: "#4A90D9",
};

interface TechBadgeProps {
  name: string;
}

export function TechBadge({ name }: TechBadgeProps) {
  const color = TECH_COLORS[name];

  if (!color) {
    return (
      <span className="rounded-full bg-ink-700 px-2.5 py-0.5 text-xs text-moon/80">
        {name}
      </span>
    );
  }

  return (
    <span
      className="rounded-full border px-2.5 py-0.5 text-xs transition-colors duration-200"
      style={{
        backgroundColor: `${color}10`,
        borderColor: `${color}25`,
        color: `${color}CC`,
      }}
    >
      {name}
    </span>
  );
}
