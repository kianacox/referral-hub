import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EditorialListHeader } from "@/components/list/EditorialListHeader";

describe("EditorialListHeader", () => {
  it("renders eyebrow, display headline, and supporting text", () => {
    render(
      <EditorialListHeader
        eyebrow="Test eyebrow"
        headline="Main title"
        supporting="Supporting paragraph."
      />
    );
    expect(screen.getByText("Test eyebrow")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: "Main title" })
    ).toBeInTheDocument();
    expect(screen.getByText("Supporting paragraph.")).toBeInTheDocument();
  });
});
