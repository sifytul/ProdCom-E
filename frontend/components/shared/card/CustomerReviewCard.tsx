import Image from "next/image";
import React from "react";
import { FaStar } from "react-icons/fa";

type Props = {};

const CustomerReviewCard = (props: Props) => {
  return (
    <div>
      <figure className="relative flex flex-col-reverse bg-slate-50 rounded-lg p-6 dark:bg-slate-800 dark:highlight-white/5">
        <blockquote className="mt-6 text-slate-700 dark:text-slate-300">
          <p>
            Have been working with CSS for over ten years and Tailwind just
            makes my life easier. It is still CSS and you use flex, grid, etc.
            but just quicker to write and maintain.
          </p>
        </blockquote>
        <figcaption className="flex items-center space-x-4">
          <Image
            src="/assets/images/avatars/man-avatar.png"
            alt=""
            className="flex-none w-14 h-14 rounded-full object-cover"
            loading="lazy"
            decoding="async"
            width={56}
            height={56}
          />
          <div className="flex-auto">
            <div className="text-base text-slate-900 font-semibold dark:text-slate-300">
              <a
                href="https://twitter.com/debs_obrien/status/1243255468241420288"
                // tabIndex="0"
              >
                <span className="absolute inset-0"></span>Debbie O&apos;Brien
              </a>
            </div>
            <div className="mt-0.5">Senior Program Manager at Microsoft</div>
            <div className="flex ">
              {Array(5)
                .fill(1)
                .map((_, i) => (
                  <FaStar
                    key={i}
                    className="h-5 fill-current text-yellow-500 "
                  />
                ))}
            </div>
          </div>
        </figcaption>
      </figure>
    </div>
  );
};

export default CustomerReviewCard;
