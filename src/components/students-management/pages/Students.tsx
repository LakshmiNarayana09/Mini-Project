import { useNavigate } from "react-router-dom";
import useApi from "../../../hooks/useApi"
import { useState } from "react"

interface Student {
  "id": number,
  "name": string,
  "email": string,
  "phone": string,
  "gender": string,
  "course": string,
  "year": number,
  "marks": number,
  "attendance": number
}



function Students() {
  const initialFormData = {
    name: "",
    email: "",
    phone: "",
    gender: "",
    course: "",
    year: 0,
    marks: 0,
    attendance: 0,
  };
  const { data: students, loading, error, addItem, updateItem, deleteItem } = useApi<Student>("http://localhost:3000/students")
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [formData, setFormData] = useState(initialFormData);

  const handleAddStudent = () => {
    setEditingStudent(null);
    setFormData(initialFormData);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingStudent) {
      const updatedStudent: Student = {
        id: editingStudent.id,
        ...formData,
      };

      await updateItem(editingStudent.id, updatedStudent);
    } else {
      await addItem(formData);
    }

    setFormData(initialFormData);
    setEditingStudent(null);
    setShowForm(false);
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    setFormData(student);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    await deleteItem(id);
  }
  
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
      <div className="min-h-screen bg-gray-100">
        
        <div className="border-b bg-white shadow-sm">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
                Students
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage and view all student information
              </p>
            </div>

            <button
              onClick={handleAddStudent}
              className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              + Add Student
            </button>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

          
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-xl bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-gray-500">
                Total Students
              </p>
              <h2 className="mt-2 text-3xl font-bold text-gray-800">
                {students.length}
              </h2>
            </div>

            <div className="rounded-xl bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-gray-500">
                Average Marks
              </p>
              <h2 className="mt-2 text-3xl font-bold text-blue-600">
                {students.length
                  ? (
                      students.reduce(
                        (total, student) => total + student.marks,
                        0
                      ) / students.length
                    ).toFixed(1)
                  : 0}
              </h2>
            </div>

            <div className="rounded-xl bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-gray-500">
                Average Attendance
              </p>
              <h2 className="mt-2 text-3xl font-bold text-green-600">
                {students.length
                  ? (
                      students.reduce(
                        (total, student) => total + student.attendance,
                        0
                      ) / students.length
                    ).toFixed(1)
                  : 0}
                %
              </h2>
            </div>

            <div className="rounded-xl bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-gray-500">
                Courses
              </p>
              <h2 className="mt-2 text-3xl font-bold text-purple-600">
                {new Set(students.map((student) => student.course)).size}
              </h2>
            </div>

          </div>

          
          {showForm && (
            <div className="mb-8">
              <form
                onSubmit={handleSubmit}
                className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-lg sm:p-8"
              >
                {/* Form Header */}
                <div className="mb-6 border-b border-gray-200 pb-4">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {editingStudent ? "Update Student" : "Add Student"}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    {editingStudent
                      ? "Update the student's information below."
                      : "Enter the student information below."}
                  </p>
                </div>

                
                <div className="grid gap-5 md:grid-cols-2">

                  
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Name
                    </label>

                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          name: e.target.value,
                        })
                      }
                      placeholder="Enter student name"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      required
                    />
                  </div>

                  
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Email
                    </label>

                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          email: e.target.value,
                        })
                      }
                      placeholder="Enter email address"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      required
                    />
                  </div>

                  
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Phone
                    </label>

                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phone: e.target.value,
                        })
                      }
                      placeholder="Enter phone number"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      required
                    />
                  </div>

                  
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Gender
                    </label>

                    <select
                      value={formData.gender}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          gender: e.target.value,
                        })
                      }
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      required
                    >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Course
                    </label>

                    <select
                      value={formData.course}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          course: e.target.value,
                        })
                      }
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      required
                    >
                      <option value="">Select course</option>
                      <option value="Computer Science">
                        Computer Science
                      </option>
                      <option value="Information Technology">
                        Information Technology
                      </option>
                      <option value="Electronics and Communication">
                        Electronics and Communication
                      </option>
                      <option value="Mechanical Engineering">
                        Mechanical Engineering
                      </option>
                      <option value="Civil Engineering">
                        Civil Engineering
                      </option>
                      <option value="Electrical Engineering">
                        Electrical Engineering
                      </option>
                    </select>
                  </div>

                  
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Year
                    </label>

                    <select
                      value={formData.year}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          year: Number(e.target.value),
                        })
                      }
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      required
                    >
                      <option value={0}>Select year</option>
                      <option value={1}>1st Year</option>
                      <option value={2}>2nd Year</option>
                      <option value={3}>3rd Year</option>
                      <option value={4}>4th Year</option>
                    </select>
                  </div>

                  
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Marks
                    </label>

                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.marks}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          marks: Number(e.target.value),
                        })
                      }
                      placeholder="Enter marks"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      required
                    />
                  </div>

                  
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Attendance (%)
                    </label>

                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.attendance}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          attendance: Number(e.target.value),
                        })
                      }
                      placeholder="Enter attendance"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      required
                    />
                  </div>
                </div>

                
                <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingStudent(null);
                      setFormData(initialFormData);
                    }}
                    className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                  >
                    {editingStudent ? "Update Student" : "Add Student"}
                  </button>
                </div>
              </form>


            </div>
          )}

          
          <div className="overflow-hidden rounded-xl bg-white shadow-sm">

            
            <div className="border-b px-6 py-5">
              <h2 className="text-lg font-semibold text-gray-800">
                Student List
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Click on a student to view complete details
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-[900px] w-full">

                <thead className="bg-gray-50">
                  <tr className="border-b">
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Name
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Email
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Phone
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Gender
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Course
                    </th>

                    <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Year
                    </th>

                    <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Marks
                    </th>

                    <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Attendance
                    </th>

                    <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">

                  {students.map((student) => (
                    <tr
                      key={student.id}
                      onClick={() =>
                        navigate(`/students/${student.id}`)
                      }
                      className="cursor-pointer transition hover:bg-blue-50"
                    >

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">

                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                            {student.name.charAt(0).toUpperCase()}
                          </div>

                          <div>
                            <p className="font-semibold text-gray-800">
                              {student.name}
                            </p>

                            <p className="text-xs text-gray-400">
                              ID: {student.id}
                            </p>
                          </div>

                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {student.email}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {student.phone}
                      </td>

                      <td className="px-6 py-4">
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                          {student.gender}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {student.course}
                      </td>

                      <td className="px-6 py-4 text-center text-sm font-medium text-gray-700">
                        Year {student.year}
                      </td>

                      <td className="px-6 py-4 text-center">
                        <span className="font-semibold text-gray-800">
                          {student.marks}
                        </span>
                        <span className="text-gray-400">
                          /100
                        </span>
                      </td>

                      <td className="px-6 py-4 text-center">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            student.attendance >= 90
                              ? "bg-green-100 text-green-700"
                              : student.attendance >= 75
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {student.attendance}%
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(student);
                            }}
                            className="rounded-md bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-600 transition hover:bg-blue-100"
                          >
                            Edit
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(student.id);
                            }}
                            className="rounded-md bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-100"
                          >
                            Delete
                          </button>

                        </div>
                      </td>

                    </tr>
                  ))}

                </tbody>
              </table>
            </div>

            
            {students.length === 0 && (
              <div className="px-6 py-12 text-center">
                <p className="text-gray-500">
                  No students found.
                </p>

                <button
                  onClick={handleAddStudent}
                  className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Add First Student
                </button>
              </div>
            )}

          </div>
        </div>
      </div>

  )
}

export default Students
