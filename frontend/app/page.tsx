import HeroSection from "@/components/HeroSection";
import NewsletterBanner from "@/components/shared/banner/NewsletterBanner";
import PromotionBanner from "@/components/shared/banner/PromotionBanner";
import CategoryDisplayCard from "@/components/shared/card/CategoryDisplayCard";
import ProductCard from "@/components/shared/card/ProductCard";
import ValuesCard from "@/components/shared/card/ValuesCard";
import { ValuesInfo } from "@/public/demo/db";
import Link from "next/link";

async function getProducts() {
  const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + "/products", {
    cache: "no-cache",
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }
  const data = await res.json();

  return data;
}
export default async function Home() {
  let { products } = await getProducts();

  let featuredProductList =
    products.length > 0 ? (
      products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))
    ) : (
      <div className="text-center bg-white-200 w-full p-4">
        No featured products found
      </div>
    );

  return (
    <>
      <main>
        <HeroSection />
        <div className="container my-6">
          <h1 className="text-4xl font-medium mb-4">Featured</h1>
          <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-2 items-center gap-1">
            {featuredProductList}
          </div>
        </div>

        {/* category card section  */}
        <div className="container my-8">
          <h1 className="text-3xl md:text-4xl mb-4 md:mb-12">
            Shop Collections
          </h1>
          <div className="grid md:grid-cols-2 md:grid-rows-2 gap-4">
            <div className="row-span-2">
              <CategoryDisplayCard />
            </div>
            <CategoryDisplayCard />
            <CategoryDisplayCard />
          </div>
        </div>

        {/* Best selling product section  */}
        <section className="container my-8">
          <h1 className="text-3xl md:text-4xl mb-4 md:mb-12">Best Sellers</h1>
          <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-2 items-center gap-1">
            {products.map((product) => (
              <Link href={`/products/${product.id}`} key={product.id}>
                <ProductCard key={product.id} product={product} />
              </Link>
            ))}
          </div>
        </section>

        {/* promotional offer banner section  */}
        <section className="">
          <PromotionBanner />
        </section>

        {/* Values Section  */}
        <div className="grid grid-flow-row grid-cols-2 md:grid-cols-4 gap-2 container my-4 md:my-8">
          {ValuesInfo?.map(({ title, desc, Icon }) => (
            <ValuesCard
              key={title}
              title={title}
              description={desc}
              IconComponent={Icon}
            />
          ))}
        </div>

        {/* Newsletter Section */}
        <section className="container">
          <NewsletterBanner />
        </section>
      </main>
    </>
  );
}
