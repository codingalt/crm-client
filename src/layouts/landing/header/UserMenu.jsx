import React from "react";
import { HashLink as Link } from "react-router-hash-link";
import {
  User,
  Calendar,
  Heart,
  Settings,
  LogOut,
  ChevronDown,
  LayoutDashboard,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const UserMenu = ({
  user,
  onLogout,
  placement = "bottom-end",
  isMobile = false,
}) => {
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "flex items-center gap-1 border rounded-full p-1 hover:bg-gray-100 transition-colors",
            isMobile && "p-0"
          )}
          aria-label="Open user menu"
        >
          <div className="flex items-center">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name || "User"}
                className={cn(
                  "rounded-full object-cover border border-gray-200",
                  isMobile ? "h-10 w-10" : "md:h-11 md:w-11 h-8 w-8"
                )}
              />
            ) : (
              <div
                className={cn(
                  "rounded-full bg-hintPrimary/10 flex items-center justify-center text-hintPrimary",
                  isMobile ? "h-10 w-10" : "md:h-11 md:w-11 h-8 w-8"
                )}
              >
                {(user.name || "User").charAt(0).toUpperCase()}
              </div>
            )}
            {!isMobile && (
              <>
                <span className="text-gray-800 font-medium ml-2 hidden lg:block">
                  {user.name || "User"}
                </span>
                <ChevronDown size={16} className="ml-1.5 mr-1 text-gray-500" />
              </>
            )}
          </div>
        </button>
      </PopoverTrigger>

      <PopoverContent
        className="w-64 p-0 border-gray-200 max-w-[calc(100vw-24px)]"
        align={
          isMobile ? "start" : placement.includes("end") ? "end" : "center"
        }
        side={placement.includes("bottom") ? "bottom" : "top"}
        sideOffset={isMobile ? 8 : 4}
        forceBottom={false}
        avoidCollisions={true}
      >
        <div className="p-4 border-b border-gray-100">
          <p className="font-medium text-gray-900">{user.name}</p>
        </div>

        <div className="py-2">
          <Link
            to="/dashboard"
            className="flex items-center gap-2.5 px-4 py-3 text-gray-800 hover:bg-gray-50 transition-colors"
          >
            <LayoutDashboard
              size={20}
              className="mr-3 text-gray-500 flex-shrink-0"
            />
            <span>Dashboard</span>
          </Link>
          <Link
            to="/profile"
            className="flex items-center gap-2.5 px-4 py-3 text-gray-800 hover:bg-gray-50 transition-colors"
          >
            <User size={20} className="mr-3 text-gray-500 flex-shrink-0" />
            <span>Profile</span>
          </Link>
          <Link
            to="/appointments"
            className="flex items-center gap-2.5 px-4 py-3 text-gray-800 hover:bg-gray-50 transition-colors"
          >
            <Calendar size={20} className="mr-3 text-gray-500 flex-shrink-0" />
            <span>Appointments</span>
          </Link>
          <Link
            to="/favorites"
            className="flex items-center gap-2.5 px-4 py-3 text-gray-800 hover:bg-gray-50 transition-colors"
          >
            <Heart size={20} className="mr-3 text-gray-500 flex-shrink-0" />
            <span>Favorites</span>
          </Link>
          <Link
            to="/settings"
            className="flex items-center gap-2.5 px-4 py-3 text-gray-800 hover:bg-gray-50 transition-colors"
          >
            <Settings size={20} className="mr-3 text-gray-500 flex-shrink-0" />
            <span>Settings</span>
          </Link>
        </div>

        <div className="py-2 border-t border-gray-100">
          <Link
            to="/app-download"
            className="flex items-center gap-2.5 px-4 py-3 text-gray-800 hover:bg-gray-50 transition-colors"
          >
            <span>Download the app</span>
          </Link>
          <Link
            to="/support"
            className="flex items-center gap-2.5 px-4 py-3 text-gray-800 hover:bg-gray-50 transition-colors"
          >
            <span>Help and support</span>
          </Link>
        </div>

        <div className="py-2 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-2.5 px-4 py-3 text-gray-800 hover:text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut size={20} className="mr-3 flex-shrink-0" />
            <span>Log out</span>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserMenu;
