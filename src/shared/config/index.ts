// 포트폴리오 데이터 및 설정

export const SITE_CONFIG = {
  name: "서창오",
  title: "Frontend Developer",
  description:
    "11년의 경험으로 사용자 경험을 설계합니다",
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
      "Qpicker App 관리자, 하리보 50주년 전시, 큐피커 티켓, AI 도슨트 프로토타입",
  },
  {
    period: "2022.02 – 2023.02",
    company: "(주)로민",
    role: "개발팀 연구원",
    description: "AI 문서인식 서비스 Textscope — Vue.js, Canvas API, WebGL",
  },
  {
    period: "2021.06 – 2022.01",
    company: "(주)쓰리아이",
    role: "SWE",
    description: "Pivo 화상 스트리밍 앱 — React, Electron, WebRTC",
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
    description: "ESS 통합 모니터링 솔루션 — 실시간 데이터 시각화",
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

export const SKILLS = {
  Frontend: [
    "React",
    "Next.js",
    "TypeScript",
    "Vue.js",
    "HTML5",
    "CSS3",
    "Canvas API",
    "Electron",
    "WebRTC",
  ],
  "Backend & DB": [
    "Node.js",
    "Spring",
    "MySQL",
    "PostgreSQL",
    "MariaDB",
    "MongoDB",
  ],
  "DevOps & Tools": ["Turborepo", "Docker", "Git", "Vite", "RESTful API"],
  "AI & Specialized": [
    "LangChain",
    "OpenAI API",
    "OCR",
    "Web Audio API",
  ],
} as const;

export const PROJECTS = [
  {
    title: "Qpicker Ticket",
    description:
      "문화전시 티켓팅 플랫폼. Turborepo + Docker 기반 모노레포 환경 구축으로 빌드 시간 단축.",
    techs: ["Next.js", "TypeScript", "Turborepo", "Docker"],
    image: "/projects/qpicker-ticket.png",
    featured: true,
  },
  {
    title: "Textscope",
    description:
      "AI 문서인식 서비스. Canvas API 기반 문서 뷰어로 이미지 회전, 확대, 크롭 기능 구현.",
    techs: ["Vue.js", "Vite", "WebGL", "Canvas API"],
    image: "/projects/textscope.png",
    featured: false,
  },
  {
    title: "Pivo",
    description:
      "화상 스트리밍 앱. WebRTC(Twilio) 기반 실시간 통신 및 Electron 데스크톱 앱.",
    techs: ["React", "Electron", "WebRTC", "Twilio"],
    image: "/projects/pivo.png",
    featured: false,
  },
  {
    title: "ESS 모니터링",
    description:
      "에너지저장장치 통합 모니터링 솔루션. 실시간 데이터 시각화 및 알림 시스템.",
    techs: ["React", "Node.js", "WebSocket"],
    image: "/projects/ess.png",
    featured: false,
  },
] as const;

export const ABOUT_HIGHLIGHTS = [
  {
    title: "문제 해결",
    description:
      "해상도 렌더링 오류 발생 시 HTML/CSS 구조 재점검과 상태 관리 최적화를 통해 배포 일정을 준수하고 서비스 신뢰도를 높였습니다.",
  },
  {
    title: "기술적 도전",
    description:
      "레거시 환경을 극복하기 위해 Turborepo와 Docker 기반의 모노레포 환경을 직접 제안하고 구축하여 빌드 시간을 단축했습니다.",
  },
  {
    title: "커뮤니케이션",
    description:
      "팀원들과의 코드 리뷰 및 원활한 소통을 통해 복잡한 요구사항을 유연하게 반영하는 것을 중요하게 생각합니다.",
  },
] as const;
