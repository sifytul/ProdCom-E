"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
const NavBarLink = ({ text, url }: { text: string; url: string }) => {
  const location = usePathname();
  console.log(location);
  return (
    <Link
      className={cn(
        "text-sm font-semibold text-gray hover:border-b hover:border-black",
        {
          "font-bold text-black border-b border-black": location === url,
        }
      )}
      href={url}
    >
      {text}
    </Link>
  );
};

export default NavBarLink;
