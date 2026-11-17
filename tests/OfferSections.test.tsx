import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { OfferSections } from "@/components/home/OfferSections";
import { getBrandsByCategory, HOME_SECTIONS } from "@/lib/brands";

const mockSearchParams = vi.fn(() => new URLSearchParams());

vi.mock("next/navigation", () => ({
  useSearchParams: () => mockSearchParams(),
}));

const sections = HOME_SECTIONS.map((section) => ({
  section,
  brands: getBrandsByCategory(section.id),
}));

const headings = () =>
  screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent);

describe("OfferSections", () => {
  it("shows every section when no category is set", () => {
    render(<OfferSections sections={sections} />);
    expect(headings()).toEqual(HOME_SECTIONS.map((s) => s.title));
  });

  it("shows only the section matching ?category=", () => {
    mockSearchParams.mockReturnValueOnce(new URLSearchParams("category=health"));
    render(<OfferSections sections={sections} />);
    expect(headings()).toEqual(["Health & fitness"]);
  });

  it("falls back to every section for an unknown category", () => {
    mockSearchParams.mockReturnValueOnce(new URLSearchParams("category=nope"));
    render(<OfferSections sections={sections} />);
    expect(headings()).toHaveLength(HOME_SECTIONS.length);
  });
});
