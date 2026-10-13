import { Link, NavLink, Outlet } from "react-router-dom";

type DashboardLayoutProps = {
  links: { to: string; label: string }[];
  title: string;
  subtitle: string;
};

export const DashboardLayout = ({
  links,
  title,
  subtitle,
}: DashboardLayoutProps) => (
  <div className="min-h-screen bg-gray-50">
    <div className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-xl font-semibold text-gray-900">
          CampusFix
        </Link>
        <div className="text-right text-sm text-gray-500">
          <p className="font-medium text-gray-900">{title}</p>
          <p>{subtitle}</p>
        </div>
      </div>
    </div>
    <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 lg:grid-cols-[220px_1fr]">
      <aside className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <nav className="space-y-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `block rounded-xl px-4 py-3 text-sm font-medium ${
                  isActive
                    ? "bg-gray-900 text-white"
                    : "text-gray-700 hover:bg-gray-50"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main>
        <Outlet />
      </main>
    </div>
  </div>
);


