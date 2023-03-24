interface NavBarLoggedOutProps {
  onSignUpClick: () => void;
  onLoginClick: () => void;
}
const NavBarLoggedOutView = ({
  onSignUpClick,
  onLoginClick,
}: NavBarLoggedOutProps): JSX.Element => {
  return (
    <>
      <button
        className="w-20 bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
        onClick={onSignUpClick}
      >
        Sign Up
      </button>
      <button
        className="w-20 bg-gray-900 text-white rounded-md px-3 py-2 ml-2 text-sm font-medium"
        onClick={onLoginClick}
      >
        Log In
      </button>
    </>
  );
};

export default NavBarLoggedOutView;
