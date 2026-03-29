// 포트폴리오 데이터 및 설정

// GitHub Pages basePath 처리
export const BASE_PATH =
  process.env.NODE_ENV === "production" ? "/portfolio-26" : "";

export const SITE_CONFIG = {
  name: "서창오",
  title: "Frontend & AI Engineer",
  description:
    "프론트엔드 전문성에 AI 워크플로우를 결합하여 제품의 한계를 넓힙니다",
  email: "momo_12@naver.com",
  github: "https://github.com/coseo12",
  location: "서울 광진구",
} as const;

export const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const;

export const CAREER_TIMELINE = [
  {
    period: "2025.06 – 2025.08",
    company: "스페이스애드",
    role: "프론트엔드",
    description: "",
  },
  {
    period: "2023.09 – 2025.04",
    company: "피플리 (PDM)",
    role: "Frontend Developer",
    description:
      "Qpicker App, 하리보 50주년 전시, 큐피커 티켓, AI 도슨트 프로토타입",
  },
  {
    period: "2022.02 – 2023.02",
    company: "(주)로민",
    role: "개발팀 연구원",
    description: "AI 문서인식 Textscope — Vue.js, Canvas API, WebGL",
  },
  {
    period: "2021.06 – 2022.01",
    company: "(주)쓰리아이",
    role: "SWE",
    description: "Pivo 화상 스트리밍 — React, Electron, WebRTC",
  },
  {
    period: "2020.01 – 2021.03",
    company: "노스스타컨설팅",
    role: "솔루션사업부 주임",
    description: "선진 HMS 고도화 프론트엔드 리드",
  },
  {
    period: "2018.08 – 2019.09",
    company: "(주)시너젠",
    role: "전임연구원",
    description: "ESS 통합 모니터링 — 실시간 데이터 시각화",
  },
  {
    period: "2014.11 – 2016.11",
    company: "(주)에너젠",
    role: "전기제어 대리",
    description: "디젤비상발전기 시운전 및 QA/QC",
  },
  {
    period: "2010.07 – 2013.09",
    company: "LG디스플레이",
    role: "P8E 사원",
    description: "생산 이력 관리 및 패널 적재 장비 제어",
  },
] as const;

export const GITHUB_USERNAME = "coseo12";

export const SKILLS = {
  Languages: ["TypeScript", "JavaScript", "Go", "Rust", "Python"],
  Frontend: ["React", "Vue.js", "Next.js"],
  Backend: ["Node.js", "NestJS", "GraphQL"],
  Specialized: ["WebGL", "WebRTC", "WebAssembly", "Electron", "Docker"],
  AI: ["LangChain", "CrewAI"],
} as const;

export const PROJECTS = [
  {
    title: "Qpicker Ticket",
    description:
      "문화전시 티켓팅 플랫폼. Turborepo + Docker 기반 모노레포 환경 구축으로 빌드 시간 단축.",
    techs: ["Next.js", "TypeScript", "Turborepo", "Docker"],
    image: `${BASE_PATH}/projects/qpicker-ticket.webp`,
    demo: "https://ticket.qpicker.com/",
    github: null,
    featured: true,
  },
  {
    title: "Textscope",
    description:
      "AI 문서인식 서비스. Canvas API 기반 문서 뷰어로 이미지 회전, 확대, 크롭 기능 구현.",
    techs: ["Vue.js", "Vite", "WebGL", "Canvas API"],
    image: `${BASE_PATH}/projects/textscope.webp`,
    demo: "https://www.lomin.ai/textscope-studio",
    github: null,
    featured: false,
  },
  {
    title: "Pivo",
    description:
      "화상 스트리밍 앱. WebRTC(Twilio) 기반 실시간 통신 및 Electron 데스크톱 앱.",
    techs: ["React", "Electron", "WebRTC", "Twilio"],
    image: `${BASE_PATH}/projects/pivo.webp`,
    demo: "https://pivo.kr/",
    github: null,
    featured: false,
  },
  {
    title: "ESS 모니터링",
    description:
      "에너지저장장치 통합 모니터링 솔루션. 실시간 데이터 시각화 및 알림 시스템.",
    techs: ["React", "Node.js", "WebSocket"],
    image: `${BASE_PATH}/projects/ess.webp`,
    demo: "https://www.synerzen.co.kr/synerzen_main",
    github: null,
    featured: false,
  },
];

export const ABOUT_HIGHLIGHTS = [
  {
    title: "AI-Driven 생산성",
    description:
      "Claude Code, Gemini CLI 등 AI 에이전트를 개발 워크플로우에 깊이 통합합니다. 반복 작업을 자동화하고 아키텍처 설계에 집중하여 압도적인 개발 속도를 냅니다.",
  },
  {
    title: "견고한 설계",
    description:
      "풍부한 실무 경험은 AI가 생성한 코드를 비판적으로 검증하는 강력한 기반입니다. 빠른 구현 속에서도 성능, 접근성, 최적의 UX라는 본질을 놓치지 않습니다.",
  },
  {
    title: "에이전틱 아키텍처",
    description:
      "단순한 AI 도구 사용을 넘어, AI 에이전트 프레임워크를 직접 설계하고 활용합니다. LLM과 API를 결합해 복잡한 문제를 주도적으로 해결합니다.",
  },
] as const;
