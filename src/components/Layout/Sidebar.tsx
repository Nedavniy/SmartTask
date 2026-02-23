import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon, HomeIcon, ClipboardDocumentListIcon, UsersIcon, ArchiveBoxIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { icon: HomeIcon, label: "Dashboard", href: "#" },
    { icon: ClipboardDocumentListIcon, label: "Tasks", href: "#" },
    { icon: ArchiveBoxIcon, label: "Projects", href: "#" },
    { icon: UsersIcon, label: "Teams", href: "#" },
  ];

  return (
    <aside className={`bg-gray-800 border-r border-gray-700 transition-all duration-300 ${collapsed ? "w-20" : "w-64"} hidden md:flex flex-col`}>
      <div className="flex items-center justify-between p-6 border-b border-gray-700">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">ST</span>
            </div>
            <span className="text-white font-bold">SmartTask</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          {collapsed ? (
            <ChevronRightIcon className="w-5 h-5" />
          ) : (
            <ChevronLeftIcon className="w-5 h-5" />
          )}
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors group"
          >
            <item.icon className="w-5 h-5 shrink-0" />
            {!collapsed && <span className="font-medium">{item.label}</span>}
          </a>
        ))}
      </nav>

      <div className="border-t border-gray-700 p-4">
        <a
          href="#"
          className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
        >
          <Cog6ToothIcon className="w-5 h-5 shrink-0" />
          {!collapsed && <span className="font-medium">Settings</span>}
        </a>
      </div>
    </aside>
  );
}

export default Sidebar;