"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import LeaveDetailModal from "./leave-detail-modal"
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

export default function FacultyDashboard() {
  const [applications, setApplications] = useState<LeaveApplication[]>([])
  const [filteredApplications, setFilteredApplications] = useState<LeaveApplication[]>([])
  const [selectedApplication, setSelectedApplication] = useState<LeaveApplication | null>(null)
  const [yearFilter, setYearFilter] = useState("")
  const [branchFilter, setBranchFilter] = useState("")
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null)

  useEffect(() => {
    // Load applications from localStorage
    const stored = localStorage.getItem("leaveApplications")
    if (stored) {
      setApplications(JSON.parse(stored))
    }
  }, [])

  useEffect(() => {
    // Apply filters
    let filtered = applications

    if (yearFilter) {
      filtered = filtered.filter((app) => app.year === yearFilter)
    }

    if (branchFilter) {
      filtered = filtered.filter((app) => app.branch === branchFilter)
    }

    setFilteredApplications(filtered)
  }, [applications, yearFilter, branchFilter])

  const handleApprove = (id: string, comment: string) => {
    const updated = applications.map((app) =>
      app.id === id ? { ...app, status: "Approved" as const, facultyComment: comment } : app,
    )
    setApplications(updated)
    localStorage.setItem("leaveApplications", JSON.stringify(updated))
    setSelectedApplication(null)
    setToast({ message: "Leave approved successfully", type: "success" })
    setTimeout(() => setToast(null), 3000)
  }

  const handleReject = (id: string, comment: string) => {
    const updated = applications.map((app) =>
      app.id === id ? { ...app, status: "Rejected" as const, facultyComment: comment } : app,
    )
    setApplications(updated)
    localStorage.setItem("leaveApplications", JSON.stringify(updated))
    setSelectedApplication(null)
    setToast({ message: "Leave rejected", type: "success" })
    setTimeout(() => setToast(null), 3000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800"
      case "Rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-yellow-100 text-yellow-800"
    }
  }

  const uniqueYears = [...new Set(applications.map((app) => app.year))].sort()
  const uniqueBranches = [...new Set(applications.map((app) => app.branch))].sort()

  return (
    <div className="space-y-6">
      {toast && <Toast message={toast.message} type={toast.type} />}

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Year</label>
              <select
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">All Years</option>
                {uniqueYears.map((year) => (
                  <option key={year} value={year}>
                    Year {year}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Branch</label>
              <select
                value={branchFilter}
                onChange={(e) => setBranchFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">All Branches</option>
                {uniqueBranches.map((branch) => (
                  <option key={branch} value={branch}>
                    {branch}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Applications List */}
      <Card>
        <CardHeader>
          <CardTitle>Leave Applications</CardTitle>
          <CardDescription>
            Total: {filteredApplications.length} | Pending:{" "}
            {filteredApplications.filter((app) => app.status === "Pending").length}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredApplications.length === 0 ? (
            <p className="text-gray-500">No applications found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Student Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">USN</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Branch</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Dates</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApplications.map((app) => (
                    <tr key={app.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-800">{app.studentName}</td>
                      <td className="py-3 px-4 text-gray-800">{app.usn}</td>
                      <td className="py-3 px-4 text-gray-800">{app.branch}</td>
                      <td className="py-3 px-4 text-gray-800">
                        {app.fromDate} to {app.toDate}
                      </td>
                      <td className="py-3 px-4 text-gray-800">{app.type}</td>
                      <td className="py-3 px-4">
                        <Badge className={getStatusColor(app.status)}>{app.status}</Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Button
                          onClick={() => setSelectedApplication(app)}
                          size="sm"
                          className="bg-indigo-600 hover:bg-indigo-700 text-white"
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detail Modal */}
      {selectedApplication && (
        <LeaveDetailModal
          application={selectedApplication}
          onApprove={handleApprove}
          onReject={handleReject}
          onClose={() => setSelectedApplication(null)}
        />
      )}
    </div>
  )
}
