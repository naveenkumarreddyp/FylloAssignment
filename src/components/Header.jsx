import React from "react";
import { User } from "lucide-react";
import fyllologo from "../assets/fyllo-logo.png";

export default function Header({}) {

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 h-14 md:h-16 flex items-center justify-between px-4 z-30">
      <div className="flex items-center">
        <img src={fyllologo} alt="Logo" className="h-5 md:h-16 py-2 pl-10" />
      </div>
      <div className="flex items-center space-x-4 pr-10">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <User className="w-5 h-5 text-gray-600" />
          </div>
      </div>
    </header>
  );
}