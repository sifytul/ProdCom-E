import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";

const NewsletterBanner = () => {
  return (
    <div className="grid sm:grid-cols-5 min-h-[200px] items-center">
      {/* left  */}
      <div className="hidden sm:block">
        <Image
          src="/assets/images/wardrob.png"
          width={500}
          height={500}
          alt="wardrob"
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* middle  */}
      <div className="sm:col-span-3 p-8">
        <div className="mb-4 text-center md:text-start">
          <h2 className="text-4xl">Join Our Newsletter</h2>
          <p className="text-gray">
            Subscribe for deals, new products and promotions
          </p>
        </div>

        <div>
          <form>
            <div className="flex">
              <Input
                type="email"
                placeholder="Email Address"
                className="flex-grow"
              />
              <Button type="submit" variant={"accent"}>
                Subscribe
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* right  */}
      <div className="hidden sm:block">
        <Image
          src="/assets/images/sofa-white.png"
          width={500}
          height={500}
          alt="wardrob"
        />
      </div>
    </div>
  );
};

export default NewsletterBanner;
