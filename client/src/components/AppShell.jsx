import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      end={to === "/"}
      className={({ isActive }) =>
        [
          "rounded-xl px-4 py-2 text-sm font-medium transition",
          isActive
            ? "bg-indigo-500/20 text-indigo-200 ring-1 ring-inset ring-indigo-400/40 shadow-sm"
            : "text-slate-300 hover:bg-white/5 hover:text-white",
        ].join(" ")
      }
    >
      {children}
    </NavLink>
  );
}

export default function AppShell({ children }) {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400 text-sm font-bold text-white shadow-lg shadow-indigo-500/20">
              JT
            </div>
            <div className="leading-tight">
              <div className="font-semibold text-white">Job Tracker</div>
            </div>
          </div>

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <nav className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-1">
                <NavItem to="/">Dashboard</NavItem>
                <NavItem to="/applications">Applications</NavItem>
              </nav>

              <div className="hidden text-sm text-slate-400 md:block">
                {user?.name}
              </div>

              <button
                type="button"
                onClick={logout}
                className="rounded-xl border border-white/10 px-4 py-2 text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white"
              >
                Logout
              </button>
            </div>
          ) : (
            <nav className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-1">
              <NavItem to="/login">Login</NavItem>
              <NavItem to="/register">Register</NavItem>
            </nav>
          )}
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        {children}
      </main>

      <footer className="border-t border-white/10 bg-slate-950/40">
        <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-slate-500">
          Built with React, Tailwind, Express and SQLite
        </div>
      </footer>
    </div>
  );
}