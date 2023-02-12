import Link from "next/link";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { currentUser } = useAuth();
  return (
    <main className="p-2 sticky top-0 bg-inherit border-b border-[#a5a5a5] select-none">
      <div className="flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center space-x-3">
            <i className="fa-solid fa-dragon text-red-500 text-3xl"></i>
            <span className="font-bold text-xl">RTTDA</span>
          </div>
        </Link>
        <Link href={currentUser ? "/userDashboard" : "/login"}>
          <i className="fa-solid fa-user mr-2 pl-2 duration-200 cursor-pointer hover:opacity-40"></i>
        </Link>
      </div>
    </main>
  );
};

export default Header;
