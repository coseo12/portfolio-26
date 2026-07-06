import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// globals 미사용 환경에서는 testing-library 자동 cleanup이 동작하지 않는다
afterEach(() => {
  cleanup();
});

// jsdom에는 IntersectionObserver가 없어 스텁 제공
// (useScrollReveal, 장식 SVG 컴포넌트들이 사용)
class IntersectionObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

globalThis.IntersectionObserver =
  IntersectionObserverStub as unknown as typeof IntersectionObserver;
