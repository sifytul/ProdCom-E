"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const { control, handleSubmit } = useForm();

  const submitHandler = async (data) => {
    const res = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_API + "/auth/password/forgot",
      {
        method: "POST",
        body: JSON.stringify({
          email: data.email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        mode: "cors",
      }
    );

    const responseData = await res.json();

    if (!res.ok) {
      if (responseData.message) {
        responseData.message.forEach((message) => {
          toast.error(message);
        });
      } else if (responseData.errors) {
        responseData.errors.forEach((error) => {
          toast.error(error.message);
        });
      }
      return;
    }

    if (res.ok && responseData.success) {
      toast.success(responseData.message);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex justify-center items-center my-8 md:my-0"
    >
      <div className="space-y-2 flex-grow">
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <Input {...field} placeholder="Type Email here..." />
          )}
        />
        <Button type="submit">Send Email</Button>
      </div>
    </form>
  );
};

export default ForgotPassword;
