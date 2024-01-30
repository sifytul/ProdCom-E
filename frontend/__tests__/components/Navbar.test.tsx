import Navbar from "@/components/Header/Header";
import { cleanup, render, screen } from "@testing-library/react";

function renderNavbar() {
  render(<Navbar />);
}

describe("Navbar", () => {
  test("render navbar", () => {
    renderNavbar();
    const navbar = screen.getByRole("navigation");
    expect(navbar).toBeInTheDocument();
  });
  test("render logo", () => {
    renderNavbar();
    const logo = screen.getByRole("heading", { name: /logo/i });
    expect(logo).toBeInTheDocument();
  });

  test("render home, shop, products, and contact us links", () => {
    renderNavbar();
    const homeLink = screen.getByRole("link", { name: /home/i });
    expect(homeLink).toBeInTheDocument();

    const shopLink = screen.getByRole("link", { name: /shop/i });
    expect(shopLink).toBeInTheDocument();

    const productLink = screen.getByRole("link", { name: /product/i });
    expect(productLink).toBeInTheDocument();

    const contactLink = screen.getByRole("link", { name: /contact/i });
    expect(contactLink).toBeInTheDocument();
  });

  test("render search, cart and user icons", () => {
    renderNavbar();
    const searchIcon = screen.getByTestId("search-icon");
    expect(searchIcon).toBeInTheDocument();

    const cartIcon = screen.getByTestId("cart-icon");
    expect(cartIcon).toBeInTheDocument();

    const userIcon = screen.getByTestId("user-icon");
    expect(userIcon).toBeInTheDocument();
  });
});

afterEach(() => {
  cleanup();
});
