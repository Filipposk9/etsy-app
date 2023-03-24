import { useCallback } from "react";
import { useForm } from "react-hook-form";

import TextInputField from "./form/TextInputField";

import { User } from "../models/user";
import { LoginCredentials } from "../network/user_api";
import * as SignUpApi from "../network/user_api";

interface LoginModalProps {
  onHideLoginModal: () => void;
  onLoginSuccess: (user: User) => void;
}

const SignUpModal = ({ onHideLoginModal, onLoginSuccess }: LoginModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>();

  const onSubmit = useCallback(
    async (credentials: LoginCredentials) => {
      try {
        const newUser = await SignUpApi.login(credentials);
        onLoginSuccess(newUser);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    [onLoginSuccess]
  );

  return (
    <div
      id="loginModal"
      tabIndex={-1}
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full"
    >
      <div className="relative w-full h-full max-w-2xl m-auto md:h-auto">
        <div className="relative bg-white rounded-lg shadow">
          <div className="flex items-start justify-between p-4 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900">Register</h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              data-modal-hide="defaultModal"
              onClick={onHideLoginModal}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="w-full">
            <form
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
              id="loginForm"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="mb-4">
                <TextInputField
                  name="username"
                  label="Username"
                  type="text"
                  placeholder="Username"
                  register={register}
                  registerOptions={{ required: "Required" }}
                  error={errors.username}
                />
              </div>
              <div className="mb-4">
                <TextInputField
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="Password"
                  register={register}
                  registerOptions={{ required: "Required" }}
                  error={errors.password}
                />
              </div>

              <div className="flex items-center justify-between">
                <button
                  className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                  form="loginForm"
                  disabled={isSubmitting}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;
