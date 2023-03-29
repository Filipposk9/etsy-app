import { Navigate } from "react-router-dom";

import { User } from "../models/user";

type Props = {
  user: User | null;
  children: JSX.Element;
};
const ProtectedRoute = ({ user, children }: Props): JSX.Element => {
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
