import Image from "next/image";
import Rating from "../Rating";

const CustomerReviewCard = () => {
  return (
    <div>
      <figure className="relative flex flex-col-reverse bg-slate-50 rounded-lg p-6 dark:bg-slate-800 dark:highlight-white/5">
        <blockquote className="mt-6 text-slate-700 dark:text-slate-300">
          <p>Awesome and authentic product. Recommended!!!</p>
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
            <div className="flex flex-col md:flex-row gap-1">
              <Rating rating={5} />
              <div className="text-sm md:ml-2">a month ago</div>
            </div>
          </div>
        </figcaption>
      </figure>
    </div>
  );
};

export default CustomerReviewCard;
