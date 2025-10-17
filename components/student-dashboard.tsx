"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import LeaveForm from "./leave-form"
import LeaveStatus from "./leave-status"
import Toast from "./toast"

interface LeaveApplication {
  id: string
  studentName: string
  usn: string
  course: string
  branch: string
  year: string
  semester: string
  fromDate: string
  toDate: string
  reason: string
  type: "Medical" | "Personal" | "Event"
  requestDate: string
  contactDetails: string
  status: "Pending" | "Approved" | "Rejected"
  facultyComment?: string
}

export default function StudentDashboard() {
  const [applications, setApplications] = useState<LeaveApplication[]>([])
  const [showForm, setShowForm] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null)

  useEffect(() => {
    // Load applications from localStorage
    const stored = localStorage.getItem("leaveApplications")
    if (stored) {
      setApplications(JSON.parse(stored))
    }
  }, [])

  const handleSubmitApplication = (newApplication: LeaveApplication) => {
    const updated = [...applications, newApplication]
    setApplications(updated)
    localStorage.setItem("leaveApplications", JSON.stringify(updated))
    setShowForm(false)
    setToast({ message: "Application sent to faculty", type: "success" })
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <div className="space-y-6">
      {toast && <Toast message={toast.message} type={toast.type} />}

      {/* Submit New Application */}
      <Card>
        <CardHeader>
          <CardTitle>Submit Leave Application</CardTitle>
          <CardDescription>Fill out the form below to request leave</CardDescription>
        </CardHeader>
        <CardContent>
          {!showForm ? (
            <Button onClick={() => setShowForm(true)} className="bg-blue-600 hover:bg-blue-700">
              New Application
            </Button>
          ) : (
            <LeaveForm onSubmit={handleSubmitApplication} onCancel={() => setShowForm(false)} />
          )}
        </CardContent>
      </Card>

      {/* Leave Status */}
      <Card>
        <CardHeader>
          <CardTitle>Leave Status</CardTitle>
          <CardDescription>Track the status of your leave applications</CardDescription>
        </CardHeader>
        <CardContent>
          {applications.length === 0 ? (
            <p className="text-gray-500">No applications submitted yet</p>
          ) : (
            <div className="space-y-4">
              {applications.map((app) => (
                <LeaveStatus key={app.id} application={app} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
