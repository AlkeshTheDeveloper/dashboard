import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { login, register } from "../../features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const [isSignUp, setIsSignUp] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (isSignUp) {
        await dispatch(
          register({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
          }),
        ).unwrap();

        setIsSignUp(false);

        setFormData({
          firstName: "",
          lastName: "",
          email: formData.email,
          password: "",
        });
      } else {
        await dispatch(
          login({
            email: formData.email,
            password: formData.password,
          }),
        ).unwrap();

        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const switchMode = () => {
    setIsSignUp((prev) => !prev);

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* =========================
            LEFT BRANDING SECTION
        ========================== */}

        <div className="relative hidden overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-16">
          {/* Decorative circles */}

          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10" />

          <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-white/10" />

          <div className="relative z-10">
            <div className="mb-16 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-2xl backdrop-blur">
                ₹
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight">
                  Expense Tracker
                </h1>

                <p className="text-sm text-blue-100">
                  Simple money management
                </p>
              </div>
            </div>

            <div className="max-w-xl">
              <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-100">
                Take control of your finances
              </p>

              <h2 className="text-4xl font-bold leading-tight xl:text-5xl">
                Know where your money goes.
              </h2>

              <p className="mt-6 max-w-lg text-lg leading-8 text-blue-100">
                Track your expenses, manage your monthly budget and understand
                your spending habits from one simple dashboard.
              </p>
            </div>

            {/* Features */}

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <Feature
                icon="✓"
                title="Track Expenses"
                description="Record your daily transactions easily."
              />

              <Feature
                icon="₹"
                title="Manage Budget"
                description="Set monthly spending limits."
              />

              <Feature
                icon="↗"
                title="View Insights"
                description="Understand your spending patterns."
              />

              <Feature
                icon="▣"
                title="Stay Organized"
                description="Keep all your transactions together."
              />
            </div>
          </div>

          <p className="relative z-10 text-sm text-blue-100">
            Your finances. Your visibility. Your decisions.
          </p>
        </div>

        {/* =========================
            RIGHT AUTH SECTION
        ========================== */}

        <div className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 lg:px-12">
          <div className="w-full max-w-md">
            {/* Mobile logo */}

            <div className="mb-8 text-center lg:hidden">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-bold text-white shadow-lg">
                ₹
              </div>

              <h1 className="text-2xl font-bold text-slate-900">
                Expense Tracker
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Manage your money with confidence
              </p>
            </div>

            {/* Auth Card */}

            <div className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/70 sm:p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900">
                  {isSignUp ? "Create your account" : "Welcome back"}
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  {isSignUp
                    ? "Start tracking your expenses today."
                    : "Sign in to continue to your dashboard."}
                </p>
              </div>

              {/* Sign In / Sign Up Tabs */}

              <div className="mb-7 flex rounded-xl bg-slate-100 p-1">
                <button
                  type="button"
                  onClick={() => setIsSignUp(false)}
                  className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                    !isSignUp
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  Sign In
                </button>

                <button
                  type="button"
                  onClick={() => setIsSignUp(true)}
                  className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                    isSignUp
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  Sign Up
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Sign Up Fields */}

                {isSignUp && (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Input
                      label="First name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Alkesh"
                      required
                    />

                    <Input
                      label="Last name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Developer"
                      required
                    />
                  </div>
                )}

                <Input
                  label="Email address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />

                <Input
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                />

                {/* Error */}

                {error && (
                  <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                    {typeof error === "string"
                      ? error
                      : error?.message || "Something went wrong."}
                  </div>
                )}

                {/* Submit */}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading
                    ? "Please wait..."
                    : isSignUp
                      ? "Create Account"
                      : "Sign In"}
                </button>
              </form>

              {/* Bottom text */}

              <p className="mt-7 text-center text-sm text-slate-500">
                {isSignUp
                  ? "Already have an account?"
                  : "Don't have an account?"}{" "}
                <button
                  type="button"
                  onClick={switchMode}
                  className="font-semibold text-blue-600 hover:text-blue-700"
                >
                  {isSignUp ? "Sign in" : "Create one"}
                </button>
              </p>
            </div>

            <p className="mt-6 text-center text-xs text-slate-400">
              Expense Tracker · Track smarter. Spend better.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================
   INPUT COMPONENT
========================== */

const Input = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-medium text-slate-700"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
      />
    </div>
  );
};

/* =========================
   FEATURE COMPONENT
========================== */

const Feature = ({ icon, title, description }) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 font-bold">
        {icon}
      </div>

      <h3 className="font-semibold">{title}</h3>

      <p className="mt-1 text-sm leading-5 text-blue-100">
        {description}
      </p>
    </div>
  );
};

export default Login;