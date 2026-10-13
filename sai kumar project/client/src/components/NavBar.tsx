import { Link, NavLink } from "react-router-dom";

const routes = [
  { label: "Login", to: "/login" },
  { label: "Sign Up", to: "/signup" },
];

export const NavBar = () => (
  <header className="border-b border-gray-200 bg-white">
    <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
      <Link to="/" className="flex items-center gap-2 text-xl font-semibold">
        <span className="rounded-full border border-black px-2 py-1 text-sm">
          CF
        </span>
        CampusFix
      </Link>
      <nav className="flex gap-8 text-sm font-medium text-gray-700">
        {routes.map((route) => (
          <NavLink
            key={route.to}
            to={route.to}
            className={({ isActive }) =>
              isActive ? "text-black" : "text-gray-500 hover:text-black"
            }
          >
            {route.label}
          </NavLink>
        ))}
      </nav>
    </div>
  </header>
);


