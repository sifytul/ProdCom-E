import NavBarLink from "@/components/shared/NavBarLink";
import ProductImageSlider from "@/components/shared/carousel/ProductImageSlider";
import { Table } from "@/components/ui/table";
import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import ProductVariantSelection from "./ProductVariantSelection/ProductVariantSelection";
import AddToCartAndWishlist from "./AddToCartAndWishlist";
import Rating from "@/components/shared/Rating";

type Props = {
  children: React.ReactNode;
  params: {
    productId: number;
  };
};

const fetchProductDetails = async (productId: number) => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_API + "/products/" + productId
  );
  const data = await res.json();
  if (data.success) {
    return data.product;
  }
};

const SingleProduct = async ({ children, params: { productId } }: Props) => {
  const productData = await fetchProductDetails(productId);
  return (
    <section className="text-gray-600  ">
      <div className="container px-5 py-24 mx-auto">
        {/* product info section  */}
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          {/* left side - image slider  */}
          <div className="lg:w-1/2 w-full max-w-[480px] mx-auto lg:h-auto h-96 object-cover object-center rounded border border-gray-100">
            <ProductImageSlider images={productData.image_urls} />
          </div>

          {/* right side - product info  */}
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              BRAND NAME
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {productData.name}
            </h1>
            <div className="flex mb-4">
              <span className="flex items-center">
                <Rating rating={productData.ratings as number} />
                <span className="text-gray-600 ml-3">4 Reviews</span>
              </span>
              <div className="flex items-center gap-1 ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                <FaFacebookF />
                <FaTwitter />
                <FaInstagram />
              </div>
            </div>
            <p className="leading-relaxed line-clamp-3">
              {productData.description}
            </p>
            {productData.discount ? (
              <div>
                <span className="font-medium text-2xl">
                  ${productData.price * productData.discount}
                </span>
                <span className="text-gray mx-3 line-through">
                  ${productData.price}
                </span>
              </div>
            ) : (
              <div>
                <span className="font-medium text-2xl">
                  ${productData.price}
                </span>
              </div>
            )}
            {/* variant selection */}
            <ProductVariantSelection />

            {/* Add to cart and wishlist section  */}
            <AddToCartAndWishlist product={productData} />

            <div>
              {/* tags section */}
              <div className="flex flex-wrap gap-6">
                <p className="bg-white-200 text-gray rounded-full py-1 px-6">
                  office
                </p>
                <p className="bg-white-200 text-gray rounded-full py-1 px-6">
                  furniture
                </p>
              </div>

              <Table className="w-4/5 md:w-1/2 text-gray">
                <tbody>
                  <tr>
                    <td>SKU</td>
                    <td className="text-left">{productData.sku}</td>
                  </tr>
                  <tr>
                    <td>Category</td>
                    <td className="text-left">
                      {productData.category.category_name}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
          {/* right side END - product info  */}
        </div>

        <div>
          <nav className="flex items-center h-10 my-6 space-x-4 md:space-x-8">
            <NavBarLink text="Additional Info" url={`/products/${productId}`} />
            <NavBarLink
              text="Questions"
              url={`/products/${productId}/questions`}
            />
            <NavBarLink text="Reviews" url={`/products/${productId}/reviews`} />
          </nav>

          <div>{children}</div>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
