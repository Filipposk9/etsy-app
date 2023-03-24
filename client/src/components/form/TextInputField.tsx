import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";

interface TextInputFieldProps {
  name: string;
  label: string;
  register: UseFormRegister<any>;
  registerOptions?: RegisterOptions;
  error?: FieldError;
  [x: string]: any;
}

const TextInputField = ({
  name,
  label,
  register,
  registerOptions,
  error,
  ...props
}: TextInputFieldProps): JSX.Element => {
  return (
    <>
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={label}
      >
        {label}
      </label>
      <input
        {...props}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={name}
        {...register(name, registerOptions)}
      />
      {error ? <p className="text-red-600">{error.message}</p> : null}
    </>
  );
};

export default TextInputField;
