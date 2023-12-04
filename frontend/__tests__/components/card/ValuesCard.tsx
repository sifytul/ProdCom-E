import { cleanup, render, screen } from "@testing-library/react";

import ValuesCard from "@/components/shared/card/ValuesCard";

describe("ValuesCard", () => {
  it("should render the values card with title and description", () => {
    const title = "Free Shipping";
    const description = "Order above $200";
    render(<ValuesCard title={title} description={description} svgUrl={"/"} />);

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
  });
});

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});
