import { LogOut, Settings, User, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore.js";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  return (
    <div className="fixed w-full top-0 z-40 flex justify-center">
      <nav className="bg-base-100 border-b w-[99%] rounded border-base-300 backdrop-blur-lg flex justify-between lg:px-8 px-3 h-12">
        {/* left side */}
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className="flex items-center gap-2.5 hover:opacity-80 transition-all"
          >
            <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-lg font-bold">yapChat</h1>
          </Link>
        </div>
        {/* right side */}
        <div className="flex items-center gap-2">
          <Link
            to="/settings"
            className="btn btn-sm btn-primary gap-2 transition-colors"
          >
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Settings</span>
          </Link>
          {authUser && (
            <>
              <Link
                to={"/profile"}
                className={`btn btn-sm btn-secondary gap-2`}
              >
                <User className="size-5" />
                <span className="hidden sm:inline">Profile</span>
              </Link>

              <button
                className="flex gap-2 items-center cursor-pointer"
                onClick={logout}
              >
                <LogOut className="size-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
