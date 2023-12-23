import InputField from "@/components/shared/InputField";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TOrderSchema } from "./page";
import { Checkbox } from "@/components/ui/checkbox";

type Props = {};

const ShippingInfoFormContext = (props: Props) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<TOrderSchema>();
  return (
    <div className="border border-gray-200 rounded-md py-10 px-6 space-y-6">
      <h2 className="text-xl font-medium">Shipping address</h2>
      <div>
        <Controller
          name="shipping_info.address"
          control={control}
          render={({ field }) => (
            <InputField
              label="Street address"
              placeholder="123, ABC Street"
              {...field}
            />
          )}
        />
        {errors.shipping_info?.address?.message && (
          <p className="text-red-500 p-2">
            {errors.shipping_info?.address?.message}
          </p>
        )}
      </div>
      <div>
        <Controller
          name="shipping_info.city"
          control={control}
          render={({ field }) => (
            <InputField placeholder="DEF Town" label="City" {...field} />
          )}
        />
        {errors.shipping_info?.city?.message && (
          <p className="text-red-500 p-2">
            {errors.shipping_info?.city?.message}
          </p>
        )}
      </div>

      <div>
        <Controller
          name="shipping_info.country"
          control={control}
          render={({ field }) => (
            <InputField placeholder="Bangladesh" label="Country" {...field} />
          )}
        />

        {errors.shipping_info?.country?.message && (
          <p className="text-red-500 p-2">
            {errors.shipping_info?.country?.message}
          </p>
        )}
      </div>
      <div>
        <Controller
          name="shipping_info.postal_code"
          control={control}
          render={({ field: { onChange, ...args } }) => (
            <InputField
              placeholder="4444"
              label="Zip code"
              type="number"
              onChange={(event) => onChange(+event.target.value)}
              {...args}
            />
          )}
        />
        {errors.shipping_info?.postal_code?.message && (
          <p className="text-red-500 p-2">
            {errors.shipping_info?.postal_code?.message}
          </p>
        )}
      </div>

      <div>
        <h3 className="text-lg font-medium">Additional information</h3>
        <Controller
          name="additionalInfo"
          control={control}
          render={({ field }) => (
            <div>
              <label htmlFor="orderNotes">Order notes (optional)</label>
              <Textarea
                id="orderNotes"
                placeholder="Type your message here."
                {...field}
              />
            </div>
          )}
        />
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Save this information for next time
        </label>
      </div>
    </div>
  );
};

export default ShippingInfoFormContext;
