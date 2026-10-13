import { NavBar } from "../components/NavBar";
import { AuthPanel } from "../features/auth/AuthPanel";

const LoginPage = () => (
  <div className="min-h-screen bg-gray-50">
    <NavBar />
    <div className="px-6 py-16">
      <AuthPanel
        title="Login to CampusFix"
        footer={{ text: "Don't have an account?", linkLabel: "Sign Up", linkHref: "/signup" }}
      />
    </div>
  </div>
);

export default LoginPage;


