"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

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
}

interface LeaveFormProps {
  onSubmit: (application: LeaveApplication) => void
  onCancel: () => void
}

export default function LeaveForm({ onSubmit, onCancel }: LeaveFormProps) {
  const today = new Date().toISOString().split("T")[0]

  const [formData, setFormData] = useState({
    studentName: "",
    usn: "",
    course: "",
    branch: "",
    year: "",
    semester: "",
    fromDate: "",
    toDate: "",
    reason: "",
    type: "Medical" as "Medical" | "Personal" | "Event",
    contactDetails: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (
      !formData.studentName ||
      !formData.usn ||
      !formData.course ||
      !formData.branch ||
      !formData.year ||
      !formData.semester ||
      !formData.fromDate ||
      !formData.toDate ||
      !formData.reason ||
      !formData.contactDetails
    ) {
      alert("Please fill all fields")
      return
    }

    const newApplication: LeaveApplication = {
      id: Date.now().toString(),
      ...formData,
      requestDate: today,
      status: "Pending",
    }

    onSubmit(newApplication)
    setFormData({
      studentName: "",
      usn: "",
      course: "",
      branch: "",
      year: "",
      semester: "",
      fromDate: "",
      toDate: "",
      reason: "",
      type: "Medical",
      contactDetails: "",
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name of the Student</label>
          <Input
            type="text"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">USN</label>
          <Input
            type="text"
            name="usn"
            value={formData.usn}
            onChange={handleChange}
            placeholder="Enter your USN"
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
          <Input
            type="text"
            name="course"
            value={formData.course}
            onChange={handleChange}
            placeholder="e.g., B.Tech"
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
          <Input
            type="text"
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            placeholder="e.g., CSE"
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
          <select
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Year</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
          <select
            name="semester"
            value={formData.semester}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Semester</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
          <Input type="date" name="fromDate" value={formData.fromDate} onChange={handleChange} className="w-full" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
          <Input type="date" name="toDate" value={formData.toDate} onChange={handleChange} className="w-full" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Medical">Medical</option>
            <option value="Personal">Personal</option>
            <option value="Event">Event</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contact Details</label>
          <Input
            type="text"
            name="contactDetails"
            value={formData.contactDetails}
            onChange={handleChange}
            placeholder="Phone or Email"
            className="w-full"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
        <textarea
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          placeholder="Explain your reason for leave"
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex gap-4">
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
          Submit Application
        </Button>
        <Button
          type="button"
          onClick={onCancel}
          variant="outline"
          className="text-gray-700 border-gray-300 bg-transparent"
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
