import InputField from "@/components/shared/InputField";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TOrderSchema } from "./page";

const ContactInfoFormContext = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<TOrderSchema>();
  return (
    <div className="border border-gray-200 rounded-md py-10 px-6">
      <div className="space-y-6">
        <h2 className="font-medium text-xl">Contact information</h2>
        <div className="flex gap-1 md:gap-4">
          <div className="w-full">
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <InputField label="First Name" placeholder="James" {...field} />
              )}
            />
            {errors?.firstName?.message && (
              <p className="text-red-500 p-2">{errors?.firstName?.message}</p>
            )}
          </div>
          <div className="w-full">
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <InputField label="Last Name" placeholder="Bond" {...field} />
              )}
            />
            {errors?.lastName?.message && (
              <p className="text-red-500 p-2">{errors?.lastName?.message}</p>
            )}
          </div>
        </div>

        <div>
          <Controller
            name="shipping_info.contact.phone_one"
            control={control}
            render={({ field }) => (
              <InputField
                label="Phone Number"
                placeholder="+8801*********"
                {...field}
              />
            )}
          />
          {errors?.shipping_info?.contact?.phone_one?.message && (
            <p className="text-red-500 p-2">
              {errors?.shipping_info?.contact?.phone_one?.message}
            </p>
          )}
        </div>

        <div>
          <Controller
            name="shipping_info.contact.email"
            control={control}
            render={({ field }) => (
              <InputField
                label="Email"
                placeholder="jamesbond@example.com"
                {...field}
              />
            )}
          />
          {errors?.shipping_info?.contact?.email?.message && (
            <p className="text-red-500 p-2">
              {errors?.shipping_info?.contact?.email?.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactInfoFormContext;
