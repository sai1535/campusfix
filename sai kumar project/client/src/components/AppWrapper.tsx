import { Outlet } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";

export const AppWrapper = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};

