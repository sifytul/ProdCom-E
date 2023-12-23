"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Controller, FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/store";
import ContactInfoFormContext from "./ContactInfoFormContext";
import ShippingInfoFormContext from "./ShippingInfoFormContext";
import Link from "next/link";
import { setJid } from "@/store/slices/authSlice";
import { toast } from "react-toastify";
import { clearCart, setStepperState } from "@/store/slices/cartSlice";
import { fetchWithReauth } from "@/app/fetchWithReauth";
import { useRouter } from "next/navigation";
import OrderSummery from "./OrderSummery";

const orderSchema = z.object({
  products: z.array(
    z.object({
      product_id: z.number(),
      quantity: z.number(),
    })
  ),
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  shipping_info: z.object({
    address: z.string().min(1, { message: "Address is required" }),
    city: z.string().min(1, { message: "City is required" }),
    country: z.string().min(1, { message: "Country is required" }),
    postal_code: z.number().optional(),
    contact: z.object({
      phone_one: z.string().refine((val) => val.length >= 11, {
        message: "Invalid phone number",
      }),
      email: z.string().email({ message: "Invalid email address" }),
    }),
  }),
  additionalInfo: z.string().optional(),
});

export type TOrderSchema = z.infer<typeof orderSchema>;

type Props = {};

const Checkout = (props: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, jid, isAuth } = useAppSelector((state) => state.auth);
  const cart = useAppSelector((state) => state.cart);
  const methods = useForm<TOrderSchema>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      products: cart.cartItems.map((item) => ({
        product_id: item.id,
        quantity: item.qty,
      })),
      firstName: "",
      lastName: "",
      shipping_info: {
        address: "",
        city:
          cart.deliveryCharge.location === "Inside Chittagong"
            ? "Chittagong"
            : "",
        country: "Bangladesh",
        contact: {
          phone_one: "",
          email: user?.email || "",
        },
      },
      additionalInfo: "",
    },
  });

  const submitHandler = async (data: TOrderSchema) => {
    let res = await fetchWithReauth(
      "/orders/new",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${jid}`,
        },
        body: JSON.stringify(data),
        credentials: "include",
        mode: "cors",
      },
      dispatch,
      setJid
    );

    if (res.success) {
      toast.success("Order placed successfully");
      dispatch(clearCart());
      dispatch(setStepperState("checkout"));
      router.push(`/cart/payment?orderId=${res?.data?.order?.id}`);
    }
  };

  if (!isAuth) router.push("/auth/signin?redirect=/cart/checkout");

  return (
    <div>
      <div className="my-8 space-y-2">
        <p>
          Returning customer?{" "}
          <Link
            href={"/auth/signin"}
            className="text-accent font-semibold hover:border-b hover:border-accent hover:text-accent"
          >
            Click here to login
          </Link>
        </p>
        <div className="border-dashed border border-green-100 rounded-md p-4 lg:w-2/5">
          <form className="space-y-4">
            <h2 className="text-gray">
              If you have a coupon code, please apply it below.
            </h2>
            <Input
              type="text"
              name="couponCode"
              id="couponCode"
              placeholder="Coupon code"
            />
            <Button>Apply coupon</Button>
          </form>
        </div>
      </div>

      {/* checkout form */}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(submitHandler)}>
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 sepa mb-8">
            {/* Contact information - left section  */}
            <div className="space-y-8">
              {/* contact information */}
              <ContactInfoFormContext />

              {/* shipping address */}
              <ShippingInfoFormContext />
            </div>

            {/* Order summary - right section */}
            {/* your order summary */}
            <div className="space-y-6">
              <OrderSummery cart={cart} />

              {/* place order button */}
              <Button type="submit">Place order</Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default Checkout;
