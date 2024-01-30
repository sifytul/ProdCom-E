"use client";
import InputField from "@/components/shared/InputField";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa";
import * as z from "zod";
import bannerImage from "@/public/assets/images/home-cover.png";
import mapImage from "@/public/assets/images/map.jpeg";
import ContactUsCard from "@/components/shared/card/ContactUsCard";
import { MdAlternateEmail, MdPhone } from "react-icons/md";
import { IoMdLocate } from "react-icons/io";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email(),
  message: z.string().min(1, { message: "Message is required" }),
});

const ContactUs = () => {
  const {
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });
  return (
    <div className="">
      <div className="container my-10">
        <h1 className="text-4xl font-semibold max-w-[80%] lg:max-w-[60%]">
          We believe in sustainable decor. We&apos;re passionate about life at
          home.
        </h1>
        <p className="max-w-[80%] lg:max-w-[60%] mt-6">
          Our features timeless furniture, with natural fabrics, curved lines,
          plenty of mirrors and classic design, which can be incorporated into
          any decor project. The pieces enchant for their sobriety, to last for
          generations, faithful to the shapes of each period, with a touch of
          the present
        </p>
      </div>
      <div className="md:container my-8">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className="bg-white-100">
            <Image src={bannerImage} alt="banner image" />
          </div>
          <div className="flex flex-col justify-center py-6 px-8 md:px-16 bg-white-100 ">
            <h2 className="text-2xl">About Us</h2>
            <p>
              3legant is a gift & decorations store based in HCMC, Vietnam. Est
              since 2019.{" "}
            </p>
            <p>Our customer service is always prepared to support you 24/7</p>
            <Link
              href={"/"}
              className="text-accent group flex hover:underline gap-1 items-center mt-2 md:mt-4 w-fit"
            >
              <p>Shop Now </p>
              <FaArrowRight className="text-accent group-hover:translate-x-1 duration-150" />
            </Link>
          </div>
        </div>
      </div>

      <div className="container">
        <h1 className="text-4xl text-center">Contact Us</h1>
        <div className="md:flex justify-center space-y-4 md:space-y-0 md:space-x-4">
          {/* card */}
          <ContactUsCard
            Icon={IoMdLocate}
            title="Address"
            desc="123 Street, City, Chittagong, Bangladesh"
          />
          <ContactUsCard
            Icon={MdPhone}
            title="Contact Us"
            desc="+88 01800 000000"
          />

          <ContactUsCard
            Icon={MdAlternateEmail}
            title="Email"
            desc="hello@prodcom-e.com"
          />
        </div>
        {/* contact form  */}
        <div className="grid md:grid-cols-2 my-8 gap-4 lg:gap-8">
          <form className="space-y-4">
            <div>
              <Controller
                name="name"
                control={control}
                render={({ fieldState, formState, ...field }) => (
                  <InputField
                    label="Full Name"
                    placeholder="Your Name"
                    {...field}
                  />
                )}
              />
              {errors.name?.message && (
                <p className="text-red-500 p-2">{errors.name?.message}</p>
              )}
            </div>
            <div>
              <Controller
                name="email"
                control={control}
                render={({ fieldState, formState, ...field }) => (
                  <InputField
                    label="Email"
                    placeholder="Your Email"
                    {...field}
                  />
                )}
              />
              {errors.email?.message && (
                <p className="text-red-500 p-2">{errors.email?.message}</p>
              )}
            </div>
            <div>
              <Controller
                name="message"
                control={control}
                render={({ fieldState, formState, ...field }) => (
                  <div className="space-y-1">
                    <Label htmlFor="message" className="text-base">
                      Message
                    </Label>
                    <Textarea placeholder="Your Message" {...field} />
                  </div>
                )}
              />
              {errors.message?.message && (
                <p className="text-red-500 p-2">{errors.message?.message}</p>
              )}
            </div>
            <Button type="submit">Send Message</Button>
          </form>

          <div className="h-[400px] bg-green-200 order-first md:order-none">
            <Image src={mapImage} alt="map-image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
