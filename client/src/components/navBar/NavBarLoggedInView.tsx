import { useCallback } from "react";

import * as UsersApi from "../../network/user_api";

import { User } from "../../models/user";

interface NavBarLoggedInViewProps {
  user: User;
  onLogoutSuccess: () => void;
}
const NavBarLoggedInView = ({
  user,
  onLogoutSuccess,
}: NavBarLoggedInViewProps): JSX.Element => {
  const handleLogoutClick = useCallback(async () => {
    try {
      await UsersApi.logout();
      onLogoutSuccess();
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }, [onLogoutSuccess]);

  return (
    <>
      <p className="text-white text-sm font-medium">
        Signed in as: {user.username}
      </p>
      <button
        className="w-20 bg-gray-900 text-white rounded-md px-3 py-2 ml-2 text-sm font-medium"
        onClick={handleLogoutClick}
      >
        Log Out
      </button>
    </>
  );
};

export default NavBarLoggedInView;
