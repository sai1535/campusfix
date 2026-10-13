import { NavBar } from "../components/NavBar";
import { AuthPanel } from "../features/auth/AuthPanel";

const SignupPage = () => (
  <div className="min-h-screen bg-gray-50">
    <NavBar />
    <div className="px-6 py-16">
      <AuthPanel
        title="Create Your Account"
        isSignup
        footer={{ text: "Already have an account?", linkLabel: "Login", linkHref: "/login" }}
      />
    </div>
  </div>
);

export default SignupPage;


