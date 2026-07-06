import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SideProjectSection } from "./SideProjectSection";
import { SIDE_PROJECT } from "@/shared/config";

describe("SideProjectSection", () => {
  it("섹션 제목과 프로젝트명을 렌더링한다", () => {
    render(<SideProjectSection />);

    expect(
      screen.getByRole("heading", { level: 2, name: SIDE_PROJECT.label })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: SIDE_PROJECT.title })
    ).toBeInTheDocument();
  });

  it("라이브 데모/GitHub 링크가 새 탭 + noopener로 열린다", () => {
    render(<SideProjectSection />);

    const demoLink = screen.getByRole("link", { name: "라이브 데모" });
    expect(demoLink).toHaveAttribute("href", SIDE_PROJECT.demo);
    expect(demoLink).toHaveAttribute("target", "_blank");
    expect(demoLink.getAttribute("rel")).toContain("noopener");

    const githubLink = screen.getByRole("link", { name: "GitHub" });
    expect(githubLink).toHaveAttribute("href", SIDE_PROJECT.github);
    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(githubLink.getAttribute("rel")).toContain("noopener");
  });

  it("스크린샷 이미지가 데모 링크로 감싸져 있다", () => {
    render(<SideProjectSection />);

    const imageLink = screen.getByRole("link", {
      name: `${SIDE_PROJECT.title} 라이브 데모 (새 탭에서 열기)`,
    });
    expect(imageLink).toHaveAttribute("href", SIDE_PROJECT.demo);

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", SIDE_PROJECT.image);
    expect(image.getAttribute("alt")).toContain(SIDE_PROJECT.title);
  });

  it("모든 기술 배지를 렌더링한다", () => {
    render(<SideProjectSection />);

    // "WebGPU"처럼 지표 값과 겹치는 텍스트가 있어 중복을 허용한다
    for (const tech of SIDE_PROJECT.techs) {
      expect(screen.getAllByText(tech).length).toBeGreaterThan(0);
    }
  });

  it("핵심 지표와 기능 하이라이트를 모두 렌더링한다", () => {
    render(<SideProjectSection />);

    for (const metric of SIDE_PROJECT.metrics) {
      expect(screen.getByText(metric.label)).toBeInTheDocument();
    }
    for (const feature of SIDE_PROJECT.features) {
      expect(
        screen.getByRole("heading", { level: 4, name: feature.title })
      ).toBeInTheDocument();
    }
  });
});
