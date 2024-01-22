"use client";
import { BsEyeFill, BsEyeSlashFill } from "@/public/assets/icons/react-icons";
import React, { useState } from "react";
import { Input } from "../ui/input";

type Props = {
  passwordField?: boolean;
  name?: string;
  label?: string;
  placeholder?: string;
  type?: string;
  Icon?: React.FunctionComponent<{ className?: string }>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
};

/**
 * @param {string} name - name of the input field
 * @param {string} placeholder - placeholder of the input field
 * @param {React.FunctionComponent<{ className?: string }>} Icon - Icon of the input field
 * @param {string} value - value of the input field
 * @param {(e: ChangeEvent<HTMLInputElement>) => void} changeHandler - changeHandler of the input field
 * @param {boolean} passwordField - (optional) if the input field is a password field
 * @returns {React.FunctionComponent<Props>}
 * @example
 * <Input
 * name="username"
 * placeholder="Your username or email address"
 * Icon={BsPersonCircle}
 * value={username}
 * changeHandler={changeHandler}
 * />
 * <Input
 * name="password"
 * placeholder="password"
 * Icon={CgKey}
 * value={password}
 * changeHandler={changeHandler}
 * passwordField
 * />
 */
const InputField = React.forwardRef(
  (
    {
      name,
      label,
      placeholder,
      onChange,
      Icon,
      type,
      passwordField,
      ...props
    }: Props,
    ref
  ) => {
    const [passwordOpen, setPasswordOpen] = useState(false);
    return (
      <div className="space-y-1">
        {label && <label htmlFor={name}>{label}</label>}
        <div className="flex items-center space-x-2">
          {Icon && <Icon className="text-primary text-xl" />}
          <Input
            id={name}
            className="outline-none flex-grow bg-inherit"
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            type={
              type
                ? type
                : passwordField
                ? passwordOpen
                  ? "text"
                  : "password"
                : "text"
            }
            {...props}
          />
          {passwordField && (
            <div
              className="text-primary text-xl"
              onClick={() => setPasswordOpen(!passwordOpen)}
            >
              <div className="cursor-pointer">
                {passwordOpen ? <BsEyeSlashFill /> : <BsEyeFill />}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);
InputField.displayName = "InputField";
export default InputField;
