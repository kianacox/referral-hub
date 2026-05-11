import { render, screen, fireEvent } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { DiscountsPageContent } from "@/app/discounts/DiscountsPageContent";

const mockPush = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

describe("DiscountsPageContent", () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it("wraps category filters in a labeled group", () => {
    render(
      <DiscountsPageContent initialFilters={[]} categoryFromPath={null} />
    );
    const group = screen.getByRole("group", { name: /filter by category/i });
    expect(group).toBeInTheDocument();
  });

  it("sets aria-pressed on category toggles from active filters", () => {
    render(
      <DiscountsPageContent
        initialFilters={["health", "finance"]}
        categoryFromPath={null}
      />
    );
    expect(screen.getByRole("button", { name: "Health" })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
    expect(screen.getByRole("button", { name: "Finance" })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
    expect(screen.getByRole("button", { name: "Bills" })).toHaveAttribute(
      "aria-pressed",
      "false"
    );
  });

  it("derives pressed state from categoryFromPath when set", () => {
    render(
      <DiscountsPageContent
        initialFilters={[]}
        categoryFromPath="bills"
      />
    );
    expect(screen.getByRole("button", { name: "Bills" })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
    expect(screen.getByRole("button", { name: "Health" })).toHaveAttribute(
      "aria-pressed",
      "false"
    );
  });

  it("Clear all is outside the category filter group", () => {
    render(
      <DiscountsPageContent
        initialFilters={["health", "finance"]}
        categoryFromPath={null}
      />
    );
    const group = screen.getByRole("group", { name: /filter by category/i });
    const clear = screen.getByRole("button", { name: "Clear all" });
    expect(group).not.toContainElement(clear);
  });

  it("navigates to /discounts when Clear all is activated", () => {
    render(
      <DiscountsPageContent
        initialFilters={["health", "finance"]}
        categoryFromPath={null}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: "Clear all" }));
    expect(mockPush).toHaveBeenCalledWith("/discounts");
  });

  it("routes to /discounts/[category] when selecting a single category from none", () => {
    render(
      <DiscountsPageContent initialFilters={[]} categoryFromPath={null} />
    );
    expect(screen.getByRole("button", { name: "Health" })).toHaveAttribute(
      "aria-pressed",
      "false"
    );
    fireEvent.click(screen.getByRole("button", { name: "Health" }));
    expect(mockPush).toHaveBeenCalledWith("/discounts/health");
  });

  it("routes to /discounts?filters=... when adding a second category", () => {
    render(
      <DiscountsPageContent
        initialFilters={["health"]}
        categoryFromPath={null}
      />
    );
    expect(screen.getByRole("button", { name: "Health" })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
    fireEvent.click(screen.getByRole("button", { name: "Finance" }));
    expect(mockPush).toHaveBeenCalledWith("/discounts?filters=health,finance");
  });

  it("routes to /discounts when toggling off the only active filter", () => {
    render(
      <DiscountsPageContent
        initialFilters={["health"]}
        categoryFromPath={null}
      />
    );
    expect(screen.getByRole("button", { name: "Health" })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
    expect(screen.getByRole("button", { name: "Bills" })).toHaveAttribute(
      "aria-pressed",
      "false"
    );
    fireEvent.click(screen.getByRole("button", { name: "Health" }));
    expect(mockPush).toHaveBeenCalledWith("/discounts");
  });

  it("routes to /discounts when toggling off the only category from path", () => {
    render(
      <DiscountsPageContent initialFilters={[]} categoryFromPath="bills" />
    );
    expect(screen.getByRole("button", { name: "Bills" })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
    fireEvent.click(screen.getByRole("button", { name: "Bills" }));
    expect(mockPush).toHaveBeenCalledWith("/discounts");
  });
});
