import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import NavBar from "./navBar/NavBar";
import Notes from "../pages/Notes";
import LoginModal from "./modals/LoginModal";
import SignUpModal from "./modals/SignUpModal";
import Etsy from "../pages/Etsy";
import EtsyCallback from "../pages/EtsyCallback";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "../pages/NotFound";

import { User } from "../models/user";
import * as UsersApi from "../network/user_api";

const Dashboard = () => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLogInModal, setShowLogInModal] = useState(false);

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await UsersApi.getLoggedInUser();
        setLoggedInUser(user);
      } catch (error) {
        console.log(error);
      }
    }
    fetchLoggedInUser();
  }, []);

  return (
    <div className="flex flex-col">
      <NavBar
        loggedInUser={loggedInUser}
        onSignUpClick={() => {
          setShowSignUpModal(true);
        }}
        onLoginClick={() => {
          setShowLogInModal(true);
        }}
        onLogoutSuccess={() => {
          setLoggedInUser(null);
        }}
      />
      <Routes>
        <Route path="/" element={<Notes loggedInUser={loggedInUser} />}></Route>
        <Route
          path="/etsy"
          element={
            <ProtectedRoute user={loggedInUser}>
              <Etsy />
            </ProtectedRoute>
          }
        />
        <Route
          path="/etsy/callback"
          element={
            <ProtectedRoute user={loggedInUser}>
              <EtsyCallback />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {showLogInModal && (
        <LoginModal
          onHideLoginModal={() => setShowLogInModal(false)}
          onLoginSuccess={(user) => {
            setLoggedInUser(user);
            setShowLogInModal(false);
          }}
        />
      )}
      {showSignUpModal && (
        <SignUpModal
          onHideSignUpModal={() => {
            setShowSignUpModal(false);
          }}
          onSignUpSuccess={(user) => {
            setLoggedInUser(user);
            setShowSignUpModal(false);
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;
