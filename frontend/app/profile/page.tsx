"use client";
import InputField from "@/components/shared/InputField";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { setJid } from "@/store/slices/authSlice";
import { useGetProfileQuery } from "@/store/slices/profileApiSlice";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";

const Profile = () => {
  const { data: meData, isFetching, isLoading } = useGetProfileQuery(null);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="lg:w-3/5 my-10 text-gray-300">
      <h2 className="text-2xl font-semibold mb-4">Account Details</h2>
      <form className="space-y-4">
        <InputField label="First Name" />
        <InputField label="Last Name" />
        <>
          <InputField label="Display Name" />
          <p className="italic text-xs mt-1">
            * This will be how your name will be displayed in the account
            section and in reviews
          </p>
        </>
        <InputField label="Email" disabled />
        <Button>Save Changes</Button>
      </form>

      <div className="my-10">
        <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
        <form className="space-y-4">
          <InputField label="Old Password" />
          <InputField label="New Password" />
          <InputField label="Retype New Password" />
          <Button>Submit</Button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
