import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

type Mode = "user" | "admin";

type Props = {
  title: string;
  footer: { text: string; linkLabel: string; linkHref: string };
  isSignup?: boolean;
};

export const AuthPanel = ({ title, footer, isSignup = false }: Props) => {
  const [mode, setMode] = useState<Mode>("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (isSignup) {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      if (password.length < 6) {
        setError("Password must be at least 6 characters");
        return;
      }
    }

    setIsLoading(true);
    try {
      if (isSignup) {
        await register(
          {
            name,
            email,
            password,
            role: mode,
          },
          (user) => {
            // Navigate based on role
            if (user.role === "admin") {
              navigate("/admin");
            } else {
              navigate("/user");
            }
          }
        );
      } else {
        await login(
          {
            email,
            password,
            role: mode,
          },
          (user) => {
            // Navigate based on role
            if (user.role === "admin") {
              navigate("/admin");
            } else {
              navigate("/user");
            }
          }
        );
      }
    } catch (err: any) {
      // Extract error message from API response
      const errorMessage = err.response?.data?.message || err.message || "An error occurred";
      setError(errorMessage);
      console.error("Auth error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-md">
      <h2 className="text-center text-xl font-semibold text-gray-900">
        {title}
      </h2>
      <div className="mt-6 flex rounded-full bg-gray-100 p-1 text-sm font-medium">
        {(["user", "admin"] as Mode[]).map((item) => (
          <button
            key={item}
            type="button"
            className={`flex-1 rounded-full px-4 py-2 capitalize ${
              mode === item ? "bg-white shadow text-gray-900" : "text-gray-500"
            }`}
            onClick={() => setMode(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        {isSignup && (
          <div>
            <label className="text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              placeholder="John Doe"
            />
          </div>
        )}
        <div>
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
            placeholder={`${mode === "admin" ? "admin" : "student"}@campus.edu`}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
            placeholder="••••••••"
          />
        </div>
        {isSignup && (
          <div>
            <label className="text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              placeholder="••••••••"
            />
          </div>
        )}
        {error && (
          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-full bg-black px-4 py-3 text-sm font-semibold text-white disabled:opacity-50"
        >
          {isLoading ? "Loading..." : title}
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-500">
        {footer.text}{" "}
        <Link to={footer.linkHref} className="font-medium text-gray-900">
          {footer.linkLabel}
        </Link>
      </p>
    </div>
  );
};


