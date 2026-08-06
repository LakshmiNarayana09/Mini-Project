
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-4xl rounded-2xl bg-white p-8 shadow-lg">

          
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800">
            Welcome to Home Page
          </h1>

          <p className="mt-3 text-gray-500">
            Student Management, User Management, and Todo List Application
          </p>
        </div>

        
        <div className="grid gap-6 md:grid-cols-3">

          
          
          <Link
            to="/users"
            className="group rounded-xl border border-gray-200 bg-gray-50 p-6 text-center shadow-sm transition hover:-translate-y-1 hover:bg-green-600 hover:text-white hover:shadow-lg"
          >
            <div className="mb-4 text-4xl">👥</div>

            <h2 className="text-xl font-semibold">
              Users
            </h2>

            <p className="mt-2 text-sm text-gray-500 group-hover:text-green-100">
              Manage application users
            </p>
          </Link>

          
          <Link
            to="/todos"
            className="group rounded-xl border border-gray-200 bg-gray-50 p-6 text-center shadow-sm transition hover:-translate-y-1 hover:bg-purple-600 hover:text-white hover:shadow-lg"
          >
            <div className="mb-4 text-4xl">✅</div>

            <h2 className="text-xl font-semibold">
              Todo List
            </h2>

            <p className="mt-2 text-sm text-gray-500 group-hover:text-purple-100">
              Manage your tasks
            </p>
          </Link>

          
          <Link
            to="/dashboard"
            className="group rounded-xl border border-gray-200 bg-gray-50 p-6 text-center shadow-sm transition hover:-translate-y-1 hover:bg-blue-600 hover:text-white hover:shadow-lg"
          >
            <div className="mb-4 text-4xl">📊</div>

            <h2 className="text-xl font-semibold">
              Dashboard
            </h2>

            <p className="mt-2 text-sm text-gray-500 group-hover:text-blue-100">
              View system overview
            </p>
          </Link>


        </div>
      </div>
    </div>
  );
}

export default Home;


