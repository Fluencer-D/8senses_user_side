"use client"

import type React from "react"
import { useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import { User, LogOut } from "lucide-react"

const UserProfile: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth()
  const [showDropdown, setShowDropdown] = useState(false)

  if (!isAuthenticated || !user) {
    return null
  }

  const handleLogout = async () => {
    await logout()
    setShowDropdown(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center space-x-2 text-[#1E437A] hover:text-[#245CA7] transition-colors"
      >
        <div className="w-8 h-8 bg-[#245CA7] rounded-full flex items-center justify-center text-white text-sm font-medium">
          {user.firstName.charAt(0)}
          {user.lastName.charAt(0)}
        </div>
        <span className="hidden md:block font-medium">
          {user.firstName} {user.lastName}
        </span>
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-sm text-gray-500">{user.email}</p>
            {user.membership && (
              <p className="text-xs text-[#C83C92] font-medium mt-1">{user.membership.toUpperCase()} Member</p>
            )}
          </div>

          <button
            onClick={() => setShowDropdown(false)}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
          >
            <User className="w-4 h-4 mr-2" />
            Profile Settings
          </button>

          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  )
}

export default UserProfile
