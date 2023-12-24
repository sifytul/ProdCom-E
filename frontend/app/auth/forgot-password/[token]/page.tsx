"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { failed, success } from "@/lib/helper/toastFunctions";
import { useAppDispatch } from "@/store";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { setAuth, setJid, setUser } from "@/store/slices/authSlice";

const ForgotPassswordToken = () => {
  const dispatch = useAppDispatch();

  const router = useRouter();
  const params = useParams();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async (data) => {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API +
          "/auth/password/reset/" +
          params.token,
        {
          method: "POST",
          body: JSON.stringify({
            password: data.password,
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
            failed(message);
          });
        } else if (responseData.errors) {
          responseData.errors.forEach((error) => {
            failed(error);
          });
        }
        return;
      }

      dispatch(setAuth(true));
      dispatch(setUser(responseData.data));
      dispatch(setJid(responseData.accessToken));
      success("Password changed successfully");
      router.push("/");
    } catch (error) {
      console.log(error);
      failed();
    }
  };
  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex justify-center items-center my-8"
    >
      <div className="flex-grow space-y-4">
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <Input
              {...field}
              type="password"
              placeholder="Type New Password..."
              className="input input-bordered w-full max-w-sm"
            />
          )}
        />
        <Button type="submit">Change Password</Button>
        <Link
          className="hover:underline italic ml-4"
          href="/auth/forgot-password"
        >
          Get a new token
        </Link>
      </div>
    </form>
  );
};

export default ForgotPassswordToken;
