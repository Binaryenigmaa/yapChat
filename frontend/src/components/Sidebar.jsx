// src/components/Sidebar.jsx
import { Search, MoreVertical, User } from "lucide-react";
import { useChatStore } from "../store/useChatStore.js";
import { useEffect } from "react";
import { formatDate } from "../utils/timeFormatter.js";
import SidebarSkeleton from "./skeletons/SidebarSkeleton.jsx";

const Sidebar = () => {
  const {
    users,
    getUsers,
    selectedUser,
    isLoadingUsers,
    isSidebarOpen,
    toggleSidebar,
    setSelectedUser,
  } = useChatStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isLoadingUsers) {
    return <SidebarSkeleton />;
  }

  return (
    <aside
      className={`fixed w-full h-full border-r-2 lg:h-[calc(100vh-4rem)] md:h-[calc(100vh-4rem)] lg:w-80 md:w-60 bg-base-100 lg:rounded-r-lg border-base-300 transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 md:translate-x-0 transition-transform duration-300 ease-in-out z-20`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <User className="w-8 h-8 rounded-full bg-info-content p-1" />
          <span className="font-semibold text-primary">Contacts</span>
        </div>
        <MoreVertical
          className="w-5 h-5 cursor-pointer"
          onClick={toggleSidebar}
        />
      </div>
      {/* Search Bar */}
      <div className="p-3">
        <div className="flex items-center bg-base-200 rounded-lg p-2">
          <Search className="w-5 h-5" />
          <input
            type="text"
            placeholder="Search or start new chat"
            className="bg-transparent outline-none w-full pl-2 text-sm"
          />
        </div>
      </div>
      {/* Users list */}
      <div className="overflow-y-auto">
        {users.map((user) => (
          <div
            key={user._id}
            className="flex items-center p-3 hover:bg-base-300 cursor-pointer border-b-accent-content"
            onClick={() => {
              setSelectedUser(user);
              toggleSidebar();
            }}
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center">
              <img
                src={user.profilepic}
                alt={user.fullname}
                className="rounded-full"
              />
            </div>
            <div className="ml-3 flex-1">
              <div className="flex justify-between">
                <span className="font-semibold">{user.fullname}</span>
                <span className="text-xs text-gray-500">
                  {formatDate(user.updatedAt)}
                </span>
              </div>
              <p className="text-sm text-gray-600 truncate">
                {user.lastMessage}
              </p>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
