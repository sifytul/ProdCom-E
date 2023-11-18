import Topbar from "@/components/Topbar";
import "@testing-library/jest-dom";
import { cleanup, render, screen } from "@testing-library/react";

describe("Topbar components", () => {
  test("render shop now link", () => {
    render(<Topbar />);
    const shopNow = screen.getByRole("link", { name: /shop now/i });
    expect(shopNow).toBeInTheDocument();
  });
});

afterEach(() => {
  cleanup();
});
