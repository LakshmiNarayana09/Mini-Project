import { useParams, useNavigate } from "react-router-dom";
import useApi from "../../../hooks/useApi";

interface Student {
  id: number;
  name: string;
  email: string;
  phone: string;
  gender: string;
  course: string;
  year: number;
  marks: number;
  attendance: number;
}

function StudentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: students,
    loading,
    error,
  } = useApi<Student>("http://localhost:3000/students");

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-500">
        Error: {error}
      </div>
    );
  }
  
  const student = students.find(
    (student) => student.id == Number(id)
  );


  if (!student) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Student Not Found
          </h1>

          <button
            onClick={() => navigate("/students")}
            className="mt-4 rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
          >
            Back to Students
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="mx-auto max-w-4xl">

        
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Student Details
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              View complete student information
            </p>
          </div>

          <button
            onClick={() => navigate("/students")}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            ← Back
          </button>
        </div>

        
        <div className="overflow-hidden rounded-2xl bg-white shadow-lg">

          
          <div className="bg-blue-600 px-6 py-8 text-white">
            <div className="flex items-center gap-5">

              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-3xl font-bold text-blue-600">
                {student.name.charAt(0).toUpperCase()}
              </div>

              <div>
                <h2 className="text-2xl font-bold">
                  {student.name}
                </h2>

                <p className="mt-1 text-blue-100">
                  Student ID: {student.id}
                </p>

                <p className="text-blue-100">
                  {student.course}
                </p>
              </div>

            </div>
          </div>

          
          <div className="grid gap-6 p-6 sm:grid-cols-2">

            <div>
              <p className="text-sm font-medium text-gray-500">
                Email
              </p>

              <p className="mt-1 font-semibold text-gray-800">
                {student.email}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">
                Phone
              </p>

              <p className="mt-1 font-semibold text-gray-800">
                {student.phone}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">
                Gender
              </p>

              <p className="mt-1 font-semibold text-gray-800">
                {student.gender}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">
                Course
              </p>

              <p className="mt-1 font-semibold text-gray-800">
                {student.course}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">
                Academic Year
              </p>

              <p className="mt-1 font-semibold text-gray-800">
                Year {student.year}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">
                Marks
              </p>

              <p className="mt-1 text-xl font-bold text-blue-600">
                {student.marks}/100
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">
                Attendance
              </p>

              <p className="mt-1 text-xl font-bold text-green-600">
                {student.attendance}%
              </p>
            </div>

          </div>

          
          <div className="border-t bg-gray-50 p-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">
              Academic Performance
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">

              <div className="rounded-lg bg-white p-4 shadow-sm">
                <p className="text-sm text-gray-500">
                  Marks
                </p>

                <div className="mt-2 h-3 overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full rounded-full bg-blue-600"
                    style={{
                      width: `${student.marks}%`,
                    }}
                  />
                </div>

                <p className="mt-2 text-right text-sm font-semibold">
                  {student.marks}%
                </p>
              </div>

              <div className="rounded-lg bg-white p-4 shadow-sm">
                <p className="text-sm text-gray-500">
                  Attendance
                </p>

                <div className="mt-2 h-3 overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full rounded-full bg-green-500"
                    style={{
                      width: `${student.attendance}%`,
                    }}
                  />
                </div>

                <p className="mt-2 text-right text-sm font-semibold">
                  {student.attendance}%
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default StudentDetails;
