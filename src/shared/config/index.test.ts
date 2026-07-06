import { describe, it, expect } from "vitest";
import { NAV_ITEMS, PROJECTS, SIDE_PROJECT } from "./index";

describe("SIDE_PROJECT 데이터 정합성", () => {
  it("데모/GitHub 링크는 https URL이다", () => {
    expect(SIDE_PROJECT.demo).toMatch(/^https:\/\//);
    expect(SIDE_PROJECT.github).toMatch(/^https:\/\//);
  });

  it("지표 3개, 기능 하이라이트 4개를 갖는다", () => {
    expect(SIDE_PROJECT.metrics).toHaveLength(3);
    expect(SIDE_PROJECT.features).toHaveLength(4);
  });

  it("지표와 기능은 빈 텍스트가 없다", () => {
    for (const metric of SIDE_PROJECT.metrics) {
      expect(metric.value).not.toBe("");
      expect(metric.label).not.toBe("");
      expect(metric.detail).not.toBe("");
    }
    for (const feature of SIDE_PROJECT.features) {
      expect(feature.title).not.toBe("");
      expect(feature.description).not.toBe("");
    }
  });

  it("기술 스택이 1개 이상이며 중복이 없다", () => {
    expect(SIDE_PROJECT.techs.length).toBeGreaterThan(0);
    expect(new Set(SIDE_PROJECT.techs).size).toBe(SIDE_PROJECT.techs.length);
  });
});

describe("NAV_ITEMS", () => {
  it("Side Project 섹션 앵커를 포함한다", () => {
    const hrefs = NAV_ITEMS.map((item) => item.href);
    expect(hrefs).toContain("#side-project");
  });

  it("모든 항목이 해시 앵커 형식이다", () => {
    for (const item of NAV_ITEMS) {
      expect(item.href).toMatch(/^#[a-z-]+$/);
      expect(item.label).not.toBe("");
    }
  });
});

describe("PROJECTS 데이터 정합성", () => {
  it("모든 프로젝트가 필수 필드를 갖는다", () => {
    for (const project of PROJECTS) {
      expect(project.title).not.toBe("");
      expect(project.description).not.toBe("");
      expect(project.techs.length).toBeGreaterThan(0);
      expect(project.image).toMatch(/\.webp$/);
    }
  });
});
