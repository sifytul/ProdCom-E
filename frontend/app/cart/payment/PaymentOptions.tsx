"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Controller } from "react-hook-form";
import {
  useConfirmOrderMutation,
  useCancelOrderMutation,
} from "@/store/slices/cartApiSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store";
import { setStepperState } from "@/store/slices/cartSlice";

type Props = {
  orderId: number;
};

const paymentOptionsSchema = z.object({
  paymentMethod: z.enum(["cod", "nagad", "bkash"], {
    required_error: "You need to select a payment options.",
  }),
  // nagadNumber: z.string().min(11).max(11).optional(),
  // nagadTrxId: z.string().min(6).max(6).optional(),
});

type TPaymentOptions = z.infer<typeof paymentOptionsSchema>;

const PaymentOptions = ({ orderId }: Props) => {
  const dispatch = useAppDispatch();

  const router = useRouter();
  const form = useForm<TPaymentOptions>({
    resolver: zodResolver(paymentOptionsSchema),
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = form;

  let [confirmOrder, { isLoading, isError, error, isSuccess }] =
    useConfirmOrderMutation();

  let [cancelOrder] = useCancelOrderMutation();

  const handleCancelOrder = async () => {
    let res = (await cancelOrder(orderId)) as {
      data: { success: boolean; message: string };
    };
    if (res?.data?.success) {
      router.replace("/");
      toast.success(res.data.message);
    } else {
      toast.error(res.data.message);
    }
  };

  const submitHandler = async (data: TPaymentOptions) => {
    const { paymentMethod } = data;

    const payload = {
      paymentInfo: paymentMethod,
      status: "confirmed",
      paymentStatus: "unpaid",
    };

    let res = (await confirmOrder({ orderId, paymentDetails: payload })) as {
      data: { success: boolean; message: string };
    };
    if (res?.data?.success) {
      router.replace("/cart/order-complete?orderId=" + orderId);
      dispatch(setStepperState("payment"));
      toast.success(res.data.message);
    } else {
      toast.error(res.data.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="border border-gray-200 rounded-md p-6"
    >
      <h2 className="text-xl font-medium mb-4">Payment method</h2>

      <div>
        <Controller
          control={control}
          name="paymentMethod"
          render={({ field }) => (
            <RadioGroup
              defaultValue={field.value}
              onValueChange={field.onChange}
            >
              <>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cod" id="cod" />
                  <Label htmlFor="cod">Cash on delivery</Label>
                </div>
                <div className="p-4 bg-green-50">
                  Have to pay after receiving the product
                </div>
              </>

              <div className="text-gray-400">
                <div className="flex items-center space-x-2 ">
                  <RadioGroupItem value="nagad" id="nagad" disabled />
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="nagad">Nagad</Label>
                    <Image
                      src="/assets/icons/nagad.png"
                      alt="nagad"
                      width={50}
                      height={50}
                    />
                  </div>
                </div>
                <div className="p-4 bg-green-50">
                  <div>
                    <p>
                      নগদে টাকা প্রদান করার জন্য নগদ App এর মাধ্যমে অথবা সরাসরি
                      *167# ডায়াল করে &quot;Send Money (সেন্ড মানি)&quot; অপশনটি
                      সিলেক্ট করুন।
                    </p>
                    <p>
                      আমাদের নগদ নাম্বার &quot;01859667631&quot; এ আপনার মোট বিল
                      প্রদান করুন।
                    </p>
                    <p>
                      বিঃদ্রঃ শুধুমাত্র &quot;সেন্ড মানি&quot; অপশন এর মাধ্যমে
                      বিল পরিশোধ করতে হবে Nagad Personal Number : 01859667631
                    </p>
                  </div>
                  <div>
                    <div>
                      <Label htmlFor="nagadnumber">Nagad Number</Label>
                      <Input
                        type="text"
                        name="nagadNumber"
                        id="nagadNumber"
                        disabled
                      />
                    </div>
                    <div>
                      <Label htmlFor="nagadTrxId">Transaction ID</Label>
                      <Input
                        type="text"
                        name="nagadTrxId"
                        id="nagadTrxId"
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <RadioGroupItem value="bkash" id="bkash" disabled />
                <div className="flex items-center space-x-2">
                  <Label htmlFor="bkash">Bkash</Label>
                  <Image
                    src="/assets/icons/bkash.png"
                    alt="bkash"
                    width={50}
                    height={50}
                  />
                </div>
              </div>
            </RadioGroup>
          )}
        />
        {errors?.paymentMethod?.message && (
          <p className="text-red-500 mt-4">{errors.paymentMethod.message}</p>
        )}
      </div>
      <div className="space-x-4 mt-8">
        <Button
          className="font-semibold"
          variant={"destructive"}
          onClick={handleCancelOrder}
        >
          Cancel order
        </Button>
        <Button
          disabled={!isValid && !isDirty}
          type="submit"
          className="bg-accent font-semibold hover:bg-green-400"
        >
          Confirm order
        </Button>
      </div>
    </form>
  );
};

export default PaymentOptions;
