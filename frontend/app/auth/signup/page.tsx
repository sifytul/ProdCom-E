"use client";
import InputField from "@/components/shared/InputField";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useForm, SubmitHandler, Controller, set } from "react-hook-form";
import { useAppDispatch } from "@/store";
import { setAuth, setJid, setUser } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type Props = {};

type TFormData = {
  name: string;
  email: string;
  password: string;
  termsAccepted: boolean;
};

const SignUp = (props: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<TFormData>();

  const submitHandler: SubmitHandler<TFormData> = async (data) => {
    const success = () => toast.success("Account created successfully");
    const failed = () => toast.error("Account creation failed");
    //TODO: Need to implement submission
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API + "/auth/register",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          mode: "cors",
        }
      );

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      const resData = await res.json();
      if (!resData.success) {
        throw new Error(resData.message);
      }
      dispatch(setAuth(true));
      dispatch(setJid(resData.accessToken));
      dispatch(setUser(resData.data));
      router.push("/");
      success();
    } catch (error) {
      failed();
      console.error(error);
    }
  };

  return (
    <>
      {/* right section  */}
      <h1 className="text-2xl font-semibold mb-6">Sign Up</h1>
      <p className="text-neutral-gray font-inter mb-8">
        Already have an account?{" "}
        <span className="text-primary font-semibold">
          <Link href={"/auth/signin"}>Sign in</Link>
        </span>
      </p>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex flex-col w-full space-y-8 font-inter"
      >
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <InputField label="Name" placeholder="Your name" {...field} />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <InputField
              label="Email"
              placeholder="Your email address"
              {...field}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <InputField
              label="Password"
              placeholder="password"
              passwordField
              {...field}
            />
          )}
        />
        <div className="flex items-center">
          <Controller
            name="termsAccepted"
            control={control}
            rules={{ required: true }}
            defaultValue={false}
            render={({ field }) => (
              <Checkbox
                placeholder="terms & conditions"
                checked={field.value}
                onCheckedChange={(value) => field.onChange(value)}
              />
            )}
          />
          <span className="text-neutral-gray pl-2">
            I agree with{" "}
            <span className="font-semibold text-neutral-black">
              Privacy Policy
            </span>{" "}
            and{" "}
            <span className="font-semibold text-neutral-black">
              Terms of Use
            </span>
          </span>
        </div>
        <Button type="submit">Sign Up</Button>
      </form>
    </>
  );
};

export default SignUp;
