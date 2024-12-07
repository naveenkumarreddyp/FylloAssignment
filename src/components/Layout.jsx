import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout() {

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-100">
      <Header className="fixed top-0 left-0 right-0 z-10"/>
      <div className="flex flex-1 overflow-hidden pt-16 md:pt-20">
        <Sidebar className="hidden md:block" />
        <main className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto px-4 md:ml-56">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}