import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLParagraphElement> & {
  errorText: String;
};

const ErrorText = ({ errorText }: Props): JSX.Element => {
  return (
    <p className="bg-red-300 text-white p-2 pl-4 mx-8 mt-4 rounded">
      {errorText}
    </p>
  );
};

export default ErrorText;
