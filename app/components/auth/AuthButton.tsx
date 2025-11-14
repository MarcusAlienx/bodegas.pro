"use client";
import { useAuth } from "../../hooks/useAuth";
import Link from "next/link";
import { useState } from "react";

export const AuthButton = () => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  if (!user) {
    return (
      <Link href="/login">
        <button className="px-4 py-2 font-bold text-white bg-amber-600 rounded-md hover:bg-amber-700">
          Login
        </button>
      </Link>
    );
  }

  return (
    <div className="relative">
      <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center space-x-2">
        <img
          src={user.photoURL || "/default-avatar.png"}
          alt="User Avatar"
          className="w-8 h-8 rounded-full"
        />
        <span>{user.displayName || user.email}</span>
      </button>
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg">
          <Link href="/profile">
            <a className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Profile</a>
          </Link>
          <button
            onClick={logout}
            className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};
