import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const navigate = useNavigate();
  const { login, authLoading, authError, isAuthenticated } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const nextErrors = {};

    if (!form.email.trim()) {
      nextErrors.email = "Email is required.";
    }

    if (!form.password) {
      nextErrors.password = "Password is required.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    const result = await login(form);

    if (result.success) {
      navigate("/");
    }
  }

  return (
    <div className="flex min-h-[75vh] items-center justify-center">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-lg shadow-black/20 backdrop-blur-xl">
        <div className="mb-6">
          <div className="text-sm font-medium text-cyan-300">Welcome back</div>
          <h1 className="mt-1 text-3xl font-semibold text-white">Login</h1>
          <p className="mt-2 text-sm text-slate-400">
            Access your job tracker account.
          </p>
        </div>

        {authError ? (
          <div className="mb-4 rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
            {authError}
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-300">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/40 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-400/40"
              placeholder="you@example.com"
            />
            {errors.email ? (
              <p className="mt-1 text-xs text-rose-300">{errors.email}</p>
            ) : null}
          </div>

          <div>
            <label className="text-sm font-medium text-slate-300">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/40 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-400/40"
              placeholder="••••••••"
            />
            {errors.password ? (
              <p className="mt-1 text-xs text-rose-300">{errors.password}</p>
            ) : null}
          </div>

          <button
            type="submit"
            disabled={authLoading}
            className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-500/20 hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {authLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-sm text-slate-400">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-indigo-300 hover:text-indigo-200">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}