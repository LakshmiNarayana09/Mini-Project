import Navbar from "../navbar/Navbar"
import useApi from "../../../hooks/useApi"

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

function Home() {
  const { data: students, loading, error } = useApi<Student>("http://localhost:3000/students")

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="min-h-screen bg-slate-100">
        <Navbar />

        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

            
            <div className="mb-8 rounded-2xl bg-blue-600 p-6 text-white shadow-lg sm:p-8">
            <h1 className="text-2xl font-bold sm:text-3xl">
                Student Management Dashboard
            </h1>

            <p className="mt-2 text-sm text-blue-100 sm:text-base">
                Welcome to the Student Management System. Manage and monitor
                student information easily.
            </p>

            <a
                href="/students"
                className="mt-5 inline-block rounded-lg bg-white px-5 py-2.5 font-semibold text-blue-600 transition hover:bg-blue-50"
            >
                View All Students
            </a>
            </div>

            
            <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            
            <div className="rounded-xl bg-white p-5 shadow-sm">
                <p className="text-sm font-medium text-slate-500">
                Total Students
                </p>

                <h2 className="mt-2 text-3xl font-bold text-slate-800">
                {students.length}
                </h2>

                <p className="mt-1 text-sm text-green-600">
                Registered students
                </p>
            </div>

            
            <div className="rounded-xl bg-white p-5 shadow-sm">
                <p className="text-sm font-medium text-slate-500">
                Average Marks
                </p>

                <h2 className="mt-2 text-3xl font-bold text-slate-800">
                {students.length > 0
                    ? (
                        students.reduce(
                        (total, student) => total + student.marks,
                        0
                        ) / students.length
                    ).toFixed(1)
                    : 0}
                %
                </h2>

                <p className="mt-1 text-sm text-blue-600">
                Overall performance
                </p>
            </div>

            
            <div className="rounded-xl bg-white p-5 shadow-sm">
                <p className="text-sm font-medium text-slate-500">
                Average Attendance
                </p>

                <h2 className="mt-2 text-3xl font-bold text-slate-800">
                {students.length > 0
                    ? (
                        students.reduce(
                        (total, student) => total + student.attendance,
                        0
                        ) / students.length
                    ).toFixed(1)
                    : 0}
                %
                </h2>

                <p className="mt-1 text-sm text-purple-600">
                Overall attendance
                </p>
            </div>

            
            <div className="rounded-xl bg-white p-5 shadow-sm">
                <p className="text-sm font-medium text-slate-500">
                Courses
                </p>

                <h2 className="mt-2 text-3xl font-bold text-slate-800">
                {new Set(students.map((student) => student.course)).size}
                </h2>

                <p className="mt-1 text-sm text-orange-600">
                Available courses
                </p>
            </div>
            </div>

            
            <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

            <div className="flex flex-col gap-3 border-b border-slate-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                <h2 className="text-xl font-bold text-slate-800">
                    Recent Students
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Recently registered students
                </p>
                </div>

                <a
                href="/students"
                className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                View All →
                </a>
            </div>

            
            <div className="overflow-x-auto">
                <table className="w-full min-w-[800px]">

                <thead className="bg-slate-50">
                    <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Name
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Email
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Phone
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Gender
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Course
                    </th>

                    <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Year
                    </th>

                    <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Marks
                    </th>

                    <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Attendance
                    </th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">

                    {students.slice(0, 3).map((student) => (
                    <tr
                        key={student.id}
                        className="transition hover:bg-slate-50"
                    >
                        <td className="px-6 py-4 font-medium text-slate-800">
                        {student.name}
                        </td>

                        <td className="px-6 py-4 text-sm text-slate-600">
                        {student.email}
                        </td>

                        <td className="px-6 py-4 text-sm text-slate-600">
                        {student.phone}
                        </td>

                        <td className="px-6 py-4 text-sm text-slate-600">
                        {student.gender}
                        </td>

                        <td className="px-6 py-4 text-sm text-slate-600">
                        {student.course}
                        </td>

                        <td className="px-6 py-4 text-center text-sm text-slate-600">
                        {student.year}
                        </td>

                        <td className="px-6 py-4 text-center">
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                            {student.marks}
                        </span>
                        </td>

                        <td className="px-6 py-4 text-center">
                        <span
                            className={`rounded-full px-3 py-1 text-sm font-medium ${
                            student.attendance >= 75
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                        >
                            {student.attendance}%
                        </span>
                        </td>
                    </tr>
                    ))}

                    {students.length === 0 && (
                    <tr>
                        <td
                        colSpan={8}
                        className="px-6 py-12 text-center text-slate-500"
                        >
                        No students found.
                        </td>
                    </tr>
                    )}

                </tbody>
                </table>
            </div>
            </div>
        </main>
    </div>
  )
}

export default Home
