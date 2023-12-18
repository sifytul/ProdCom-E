"use client";
import { Button } from "@/components/ui/button";
import InputField from "@/components/shared/InputField";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/store";
import { setAuth, setJid, setUser } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";

type Props = {};

const SignIn = (props: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const initialValue = {
    email: "",
    password: "",
    rememberMe: false,
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValue,
  });

  const submitHandler = async (data) => {
    //TODO: Need to implement submission

    const success = () => toast.success("Welcome Back Chief!");
    const failed = (message) => toast.error(message);

    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API + "/auth/signin",
        {
          method: "POST",
          body: JSON.stringify({
            email: data.email,
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
            failed(error.message);
          });
        }
        return;
      }

      console.log(responseData);
      dispatch(setAuth(true));
      dispatch(setUser(responseData.data));
      dispatch(setJid(responseData.jid));

      router.push("/");
      success();
    } catch (error) {
      failed("Something went wrong");
      console.error(error);
    }
  };

  return (
    <>
      {/* right section  */}
      <h1 className="text-2xl font-semibold mb-6">Sign In</h1>
      <p className="text-neutral-gray font-inter mb-8">
        Don&apos;t have an account yet?{" "}
        <span className="text-accent font-semibold">
          <Link href={"/auth/signup"}>Sign Up</Link>
        </span>
      </p>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex flex-col w-full space-y-8 font-inter"
      >
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <InputField placeholder="Your email address" {...field} />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <InputField placeholder="password" passwordField {...field} />
          )}
        />
        <div className="flex justify-between items-center">
          <div>
            <Controller
              control={control}
              name="rememberMe"
              render={({ field: { value, ...fieldProps } }) => (
                <Checkbox
                  placeholder="remember me"
                  checked={value}
                  onCheckedChange={(value) => {
                    fieldProps.onChange(value);
                  }}
                  {...fieldProps}
                />
              )}
            />
            <span className="text-neutral-gray pl-2">Remember me</span>
          </div>
          <p className="font-semibold">Forgot password?</p>
        </div>
        <Button
          type="submit"

          // disabled={isSignInButtonDisabled}
        >
          Sign In
        </Button>
      </form>
    </>
  );
};

export default SignIn;
