"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import StudentDashboard from "@/components/student-dashboard"
import FacultyDashboard from "@/components/faculty-dashboard"

export default function Home() {
  const [role, setRole] = useState<"student" | "faculty" | null>(null)

  useEffect(() => {
    // Check if role is stored in localStorage
    const storedRole = localStorage.getItem("userRole") as "student" | "faculty" | null
    if (storedRole) {
      setRole(storedRole)
    }
  }, [])

  const handleRoleSelect = (selectedRole: "student" | "faculty") => {
    setRole(selectedRole)
    localStorage.setItem("userRole", selectedRole)
  }

  const handleLogout = () => {
    setRole(null)
    localStorage.removeItem("userRole")
  }

  if (!role) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Leave Management</h1>
          <p className="text-center text-gray-600 mb-8">Select your role to continue</p>
          <div className="space-y-4">
            <Button
              onClick={() => handleRoleSelect("student")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg"
            >
              Student Dashboard
            </Button>
            <Button
              onClick={() => handleRoleSelect("faculty")}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-6 text-lg"
            >
              Faculty Dashboard
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            {role === "student" ? "Student Leave Dashboard" : "Faculty Leave Management"}
          </h1>
          <Button onClick={handleLogout} variant="outline" className="text-gray-700 border-gray-300 bg-transparent">
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {role === "student" ? <StudentDashboard /> : <FacultyDashboard />}
      </main>
    </div>
  )
}
