
import Home from "./components/home/Home"
import { Route, Routes } from "react-router-dom"
import Dashboard from "./components/students-management/pages/Dashboard"
import StudentDetails from "./components/students-management/pages/StudentDetails"
import Students from "./components/students-management/pages/Students"
import UserManagement from "./components/user-management/UserManagement"
import TodoList from "./components/to-do-list/ToDoList"

function App() {
  
  return (
    <div>
       <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/students" element={<Students />} />
          <Route path="/students/:id" element={<StudentDetails />} />
          <Route
          path="/users"
          element={<UserManagement />}
        />

        <Route
          path="/todos"
          element={<TodoList />}
        />
        </Routes> 
    </div>
  )
}

export default App
