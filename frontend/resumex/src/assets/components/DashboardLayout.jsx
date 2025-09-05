import { Outlet, NavLink, useNavigate } from "react-router-dom";
export default function DashboardLayout() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow flex flex-col">
        <div className="p-6 font-bold text-xl border-b">Company Dashboard</div>
        <nav className="flex-1 p-4 flex flex-col gap-2">
          <NavLink to="/dashboard" className="rounded p-2 hover:bg-gray-100" end>Overview</NavLink>
          <NavLink to="/dashboard/jobs" className="rounded p-2 hover:bg-gray-100">Job Posts</NavLink>
        </nav>
        <button
          onClick={() => { localStorage.clear();  navigate("/login/company"); }}
          className="m-4 bg-red-100 hover:bg-red-200 font-medium rounded p-2"
        >
          Logout
        </button>
      </aside>
      <main className="flex-1 p-8"><Outlet /></main>
    </div>
  );
}
