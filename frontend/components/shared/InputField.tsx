import { BsEyeFill, BsEyeSlashFill } from "@/public/assets/icons/react-icons";
import React, { ChangeEvent, useState } from "react";

type Props = {
  passwordField?: boolean;
  name: string;
  label?: string;
  placeholder: string;
  Icon?: React.FunctionComponent<{ className?: string }>;
  value: string;
  changeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
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
const InputField = ({
  name,
  label,
  placeholder,
  Icon,
  value,
  changeHandler,
  passwordField,
}: Props) => {
  const [passwordOpen, setPasswordOpen] = useState(false);
  return (
    <>
      {label && <label htmlFor={name}>{label}</label>}
      <div className="flex items-center space-x-2 border-b border-gray p-2 ">
        {Icon && <Icon className="text-primary text-xl" />}
        <input
          id={name}
          className="outline-none flex-grow bg-inherit"
          name={name}
          placeholder={placeholder}
          type={passwordField ? (passwordOpen ? "text" : "password") : "text"}
          value={value}
          onChange={changeHandler}
        />
        {passwordField && (
          <div
            className="text-primary text-xl"
            onClick={() => setPasswordOpen(!passwordOpen)}
          >
            {passwordOpen ? <BsEyeSlashFill /> : <BsEyeFill />}
          </div>
        )}
      </div>
    </>
  );
};

export default InputField;
