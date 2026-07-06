import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TechBadge } from "./tech-badge";

describe("TechBadge", () => {
  it("브랜드 컬러가 등록된 기술은 인라인 스타일 배지로 렌더링한다", () => {
    render(<TechBadge name="TypeScript" />);
    const badge = screen.getByText("TypeScript");

    // 브랜드 컬러 배지는 인라인 스타일을 사용하고 폴백 클래스가 없다
    expect(badge).not.toHaveClass("bg-ink-700");
    expect(badge.getAttribute("style")).toBeTruthy();
  });

  it("Side Project에서 쓰는 기술들도 브랜드 컬러가 등록되어 있다", () => {
    for (const name of ["Babylon.js", "WebGPU", "Zustand"]) {
      const { unmount } = render(<TechBadge name={name} />);
      expect(screen.getByText(name)).not.toHaveClass("bg-ink-700");
      unmount();
    }
  });

  it("미등록 기술은 폴백 배지로 렌더링한다", () => {
    render(<TechBadge name="UnknownTech" />);
    const badge = screen.getByText("UnknownTech");

    expect(badge).toHaveClass("bg-ink-700");
    expect(badge.getAttribute("style")).toBeNull();
  });
});
