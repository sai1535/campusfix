import { AlertTriangle, Lightbulb, Vote } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => (
  <section className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-6 py-24 text-center">
    <p className="rounded-full border border-gray-200 px-4 py-1 text-sm uppercase tracking-wide text-gray-500">
      CampusFix
    </p>
    <div className="space-y-6">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        Report. Vote. Resolve.
      </h1>
      <p className="mx-auto max-w-3xl text-lg text-gray-600">
        A smart platform for students and faculty to raise problems, vote on
        issues, and track resolutions in real time.
      </p>
    </div>
    <div className="flex gap-4">
      <Link
        to="/login"
        className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white"
      >
        Login
      </Link>
      <Link
        to="/signup"
        className="rounded-full border border-black px-6 py-3 text-sm font-semibold text-black"
      >
        Sign Up
      </Link>
    </div>
    <div className="grid w-full gap-4 md:grid-cols-3">
      {[
        {
          icon: AlertTriangle,
          label: "Raise",
          text: "Report campus issues with precise details.",
        },
        {
          icon: Vote,
          label: "Vote",
          text: "Support the problems that matter most.",
        },
        {
          icon: Lightbulb,
          label: "Resolve",
          text: "Track progress and celebrate fixes together.",
        },
      ].map(({ icon: Icon, label, text }) => (
        <div
          key={label}
          className="flex flex-col items-center gap-2 rounded-2xl border border-gray-200 bg-white px-6 py-8 text-center shadow-sm"
        >
          <Icon className="h-6 w-6 text-gray-900" />
          <p className="font-semibold text-gray-900">{label}</p>
          <p className="text-sm text-gray-500">{text}</p>
        </div>
      ))}
    </div>
  </section>
);


