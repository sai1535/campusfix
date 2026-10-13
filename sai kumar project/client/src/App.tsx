import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AppWrapper } from "./components/AppWrapper";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardHome from "./pages/user/DashboardHome";
import RaiseIssuePage from "./pages/user/RaiseIssuePage";
import MyIssuesPage from "./pages/user/MyIssuesPage";
import VoteProblemsPage from "./pages/user/VoteProblemsPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import { DashboardLayout } from "./layouts/DashboardLayout";

const router = createBrowserRouter([
  {
    element: <AppWrapper />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/user",
        element: (
          <DashboardLayout
            title="Student User"
            subtitle="student@university.edu"
            links={[
              { to: "/user", label: "Dashboard" },
              { to: "/user/raise", label: "Raise Problem" },
              { to: "/user/my-issues", label: "My Problems" },
              { to: "/user/vote", label: "Vote Problems" },
            ]}
          />
        ),
        children: [
          { index: true, element: <DashboardHome /> },
          { path: "raise", element: <RaiseIssuePage /> },
          { path: "my-issues", element: <MyIssuesPage /> },
          { path: "vote", element: <VoteProblemsPage /> },
        ],
      },
      {
        path: "/admin",
        element: (
          <DashboardLayout
            title="Admin User"
            subtitle="admin@campusfix.com"
            links={[{ to: "/admin", label: "Dashboard" }]}
          />
        ),
        children: [{ index: true, element: <AdminDashboardPage /> }],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
