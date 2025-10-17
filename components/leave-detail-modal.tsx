"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

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

interface LeaveDetailModalProps {
  application: LeaveApplication
  onApprove: (id: string, comment: string) => void
  onReject: (id: string, comment: string) => void
  onClose: () => void
}

export default function LeaveDetailModal({ application, onApprove, onReject, onClose }: LeaveDetailModalProps) {
  const [comment, setComment] = useState("")

  const handleApprove = () => {
    onApprove(application.id, comment)
  }

  const handleReject = () => {
    onReject(application.id, comment)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Leave Application Details</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
              ×
            </button>
          </div>

          {/* Application Details */}
          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Student Name</p>
                <p className="font-semibold text-gray-800">{application.studentName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">USN</p>
                <p className="font-semibold text-gray-800">{application.usn}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Course</p>
                <p className="font-semibold text-gray-800">{application.course}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Branch</p>
                <p className="font-semibold text-gray-800">{application.branch}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Year</p>
                <p className="font-semibold text-gray-800">{application.year}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Semester</p>
                <p className="font-semibold text-gray-800">{application.semester}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">From Date</p>
                <p className="font-semibold text-gray-800">{application.fromDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">To Date</p>
                <p className="font-semibold text-gray-800">{application.toDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Leave Type</p>
                <p className="font-semibold text-gray-800">{application.type}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Contact Details</p>
                <p className="font-semibold text-gray-800">{application.contactDetails}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Request Date</p>
                <p className="font-semibold text-gray-800">{application.requestDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <p className="font-semibold text-gray-800">{application.status}</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600">Reason</p>
              <p className="font-semibold text-gray-800 bg-gray-50 p-3 rounded">{application.reason}</p>
            </div>
          </div>

          {/* Comment Field */}
          {application.status === "Pending" && (
            <>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Add Comment (Optional)</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add any comments or feedback"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button onClick={handleApprove} className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                  Approve
                </Button>
                <Button onClick={handleReject} className="flex-1 bg-red-600 hover:bg-red-700 text-white">
                  Reject
                </Button>
                <Button
                  onClick={onClose}
                  variant="outline"
                  className="flex-1 text-gray-700 border-gray-300 bg-transparent"
                >
                  Close
                </Button>
              </div>
            </>
          )}

          {application.status !== "Pending" && (
            <div className="flex gap-4">
              <Button onClick={onClose} className="w-full bg-gray-600 hover:bg-gray-700 text-white">
                Close
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
