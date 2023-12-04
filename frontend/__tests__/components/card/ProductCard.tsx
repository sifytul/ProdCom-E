import ProductCard from "@/components/shared/card/ProductCard";
import { cleanup, render, screen } from "@testing-library/react";

let productData = {
  id: 1,
  title: "Sony - WH-CH720N Wireless Noise Cancelling",
  price: 24.99,
  discount: 49.99,
  rating: 5,
  image: "/assets/images/sofa.png",
  trendingTitle: "hot",
};

const renderAndGrabElements = () => {
	  render(<ProductCard product={productData} />);
  const title = 
  const price = screen.getByText(productData.price);
  const discount = screen.getByText(productData.discount);
  const rating = screen.getByText(productData.rating);
  const image = screen.getByAltText(productData.image);
  const trendingTitle = screen.getByText(productData.trendingTitle);
  return { title, price, discount, rating, image, trendingTitle };
};


describe("ProductCard", () => {
  it("should render ProductCard component", () => {
	 const { title, price, discount, rating, image, trendingTitle } = renderAndGrabElements();


  });
});

afterEach(() => {
  cleanup();
});
