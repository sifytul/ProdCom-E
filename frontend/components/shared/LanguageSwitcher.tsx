import * as React from "react";
import Image from "next/image";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function LanguageSelect() {
  return (
    <Select>
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder="Select language" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Languages</SelectLabel>
          <SelectItem value="english" className="flex">
            {/* <Image src="/flags/us.svg" alt="flag" height={40} width={40} /> */}
            <span>English</span>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
