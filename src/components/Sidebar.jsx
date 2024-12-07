import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ChartNoAxesCombined, PackageSearch } from "lucide-react";


const navigationLinks = [
  { path: "/", label: "Analytics", icon: ChartNoAxesCombined },
  { path: "/products", label: "Products", icon: PackageSearch },
];

export default function Sidebar({ className = "" }) {
  const navigate = useNavigate();

  return (
    <aside className={`bg-white w-56 h-full fixed left-0 top-16 bottom-0 shadow-md overflow-y-auto ${className}`}>
      <nav className="flex flex-col h-full">
        <ul className="flex-1 py-4">
          {navigationLinks.map((link) => {
            const Icon = link.icon;
            return (
              <li key={link.path}>
                <NavLink to={link.path} className={({ isActive }) => `flex items-center p-4 text-lg  ${isActive ? "bg-gray-200 text-green-900" : ""}`}>
                  <Icon className="w-6 h-6 mr-2" />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
        
      </nav>
    </aside>
  );
}