"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import React from "react";
import { GoSearch } from "react-icons/go";
import { Button } from "../ui/button";
import { DialogHeader, DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";

type Props = {};

const SearchInHeader = (props: Props) => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    const { searchTerm } = data;

    router.push(`/shop?searchTerm=${searchTerm}`);
  };
  return (
    <Dialog>
      <DialogTrigger>
        <GoSearch className="hover:scale-110 duration-200" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Search your favourite items...</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="searchTerm"
            control={control}
            render={({ field }) => <Input placeholder="airdots" {...field} />}
          />
          <DialogFooter>
            <DialogTrigger>
              <Button
                type="submit"
                className="w-full mt-2"
                disabled={!isDirty || !isValid}
              >
                Search
              </Button>
            </DialogTrigger>
          </DialogFooter>
        </form>{" "}
      </DialogContent>
    </Dialog>
  );
};

export default SearchInHeader;
