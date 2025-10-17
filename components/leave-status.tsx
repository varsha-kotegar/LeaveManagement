"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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

interface LeaveStatusProps {
  application: LeaveApplication
}

export default function LeaveStatus({ application }: LeaveStatusProps) {
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

  return (
    <Card className="p-4 border border-gray-200">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-gray-800">{application.studentName}</h3>
          <p className="text-sm text-gray-600">USN: {application.usn}</p>
        </div>
        <Badge className={getStatusColor(application.status)}>{application.status}</Badge>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-3">
        <div>
          <p className="text-gray-600">From</p>
          <p className="font-medium text-gray-800">{application.fromDate}</p>
        </div>
        <div>
          <p className="text-gray-600">To</p>
          <p className="font-medium text-gray-800">{application.toDate}</p>
        </div>
        <div>
          <p className="text-gray-600">Type</p>
          <p className="font-medium text-gray-800">{application.type}</p>
        </div>
        <div>
          <p className="text-gray-600">Requested</p>
          <p className="font-medium text-gray-800">{application.requestDate}</p>
        </div>
      </div>

      <div className="mb-3">
        <p className="text-sm text-gray-600">Reason</p>
        <p className="text-gray-800">{application.reason}</p>
      </div>

      {application.facultyComment && (
        <div className="bg-blue-50 p-3 rounded border border-blue-200">
          <p className="text-sm text-gray-600">Faculty Comment</p>
          <p className="text-gray-800">{application.facultyComment}</p>
        </div>
      )}
    </Card>
  )
}
