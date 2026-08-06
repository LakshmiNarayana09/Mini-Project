import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div>
      <nav className="bg-blue-600 text-white">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold">Student Management</div>
            <div className="space-x-4">
              <Link to="/dashboard" className="hover:text-blue-200">
                Home
              </Link>
              <Link to="/students" className="hover:text-blue-200">
                Students
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
