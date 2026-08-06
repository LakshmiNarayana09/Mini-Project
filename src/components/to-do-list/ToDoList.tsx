import useApi from "../../hooks/useApi";
import { useState } from "react";

interface Todo {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
}

function ToDoList() {
  const {
    data: todos,loading,error,addItem,updateItem,deleteItem,
  } = useApi<Todo>("https://json-server-api-oxsu.onrender.com/todos");

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
    priority: "medium",
    dueDate: "",
  });

  const [editId, setEditId] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [search, setSearch] = useState("");

  


  const handleAddTodo = () => {
    setEditId(null);

    setFormData({
        title: "",
        description: "",
        status: "pending",
        priority: "medium",
        dueDate: "",
    });

    setShowForm(true);
 };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editId !== null) {
        await updateItem(editId, {
        id: editId,
        ...formData,
        });

        setEditId(null);
    } else {
        await addItem(formData);
    }

    setFormData({
        title: "",
        description: "",
        status: "pending",
        priority: "medium",
        dueDate: "",
    });

    setShowForm(false);
  };

  const handleEdit = (todo: Todo) => {
    setEditId(todo.id);
    setFormData({
        title: todo.title,
        description: todo.description,
        status: todo.status,
        priority: todo.priority,
        dueDate: todo.dueDate,
  });

  setShowForm(true);
};

  const handleDelete = async (todo: Todo) => {
    await deleteItem(todo.id);
  }

  const filteredTodos = todos.filter((todo) => {
    const matchesStatus =
        statusFilter === "all" ||
        todo.status === statusFilter;

    const matchesPriority =
        priorityFilter === "all" ||
        todo.priority === priorityFilter;

    const matchesSearch =
        todo.title.toLowerCase().includes(search.toLowerCase());

    return matchesStatus && matchesPriority && matchesSearch;
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
        <div className="mx-auto max-w-7xl">

            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                    Todo List
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                    Manage and track your tasks easily
                    </p>
                </div>

                <button
                    type="button"
                    onClick={handleAddTodo}
                    className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    + Add Todo
                </button>
            </div>

            
            <div className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4">
                    <h2 className="text-lg font-semibold text-slate-800">
                    Search & Filter
                    </h2>
                    <p className="text-sm text-slate-500">
                    Find todos based on status, priority, or title
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">

                    
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Status
                        </label>

                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        >
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>

                    
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Priority
                        </label>

                        <select
                            value={priorityFilter}
                            onChange={(e) => setPriorityFilter(e.target.value)}
                            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        >
                            <option value="all">All Priorities</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Search
                        </label>

                        <div className="relative">
                            <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search todos..."
                            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>
                    </div>

                </div>
            </div>

            
            {showForm && (
                <div className="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">
                            {editId !== null ? "Edit Todo" : "Add Todo"}
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                            {editId !== null
                                ? "Update the todo details below"
                                : "Create a new todo"}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => setShowForm(false)}
                            className="rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                        >
                            ✕
                        </button>
                    </div>

                    <form
                        className="grid gap-5 md:grid-cols-2"
                        onSubmit={handleSubmit}
                    >

                    
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleFormChange}
                            placeholder="Enter todo title"
                            required
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Description
                        </label>

                        <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleFormChange}
                            placeholder="Enter description"
                            required
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Status
                        </label>

                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleFormChange}
                            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        >
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>

                    
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Priority
                        </label>

                        <select
                            name="priority"
                            value={formData.priority}
                            onChange={handleFormChange}
                            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Due Date
                        </label>

                        <input
                            type="date"
                            name="dueDate"
                            value={formData.dueDate}
                            onChange={handleFormChange}
                            required
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    
                    <div className="flex items-end gap-3">
                        <button
                            type="submit"
                            className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
                        >
                        {editId !== null ? "Update Todo" : "Add Todo"}
                        </button>

                        <button
                            type="button"
                            onClick={() => setShowForm(false)}
                            className="rounded-lg border border-slate-300 px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
                        >
                        Cancel
                        </button>
                    </div>

                    </form>
                </div>
            )}

            
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                    <div>
                    <h2 className="font-semibold text-slate-800">
                        Todo Tasks
                    </h2>
                    <p className="text-sm text-slate-500">
                        {filteredTodos.length} task
                        {filteredTodos.length !== 1 ? "s" : ""}
                    </p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[800px] border-collapse">
                        <thead>
                            <tr className="bg-slate-50">
                                <th className="border-b border-slate-200 px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Title
                                </th>

                                <th className="border-b border-slate-200 px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Description
                                </th>

                                <th className="border-b border-slate-200 px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Status
                                </th>

                                <th className="border-b border-slate-200 px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Priority
                                </th>

                                <th className="border-b border-slate-200 px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Due Date
                                </th>

                                <th className="border-b border-slate-200 px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredTodos.length > 0 ? (
                            filteredTodos.map((todo) => (
                                <tr
                                key={todo.id}
                                className="transition hover:bg-slate-50"
                                >
                                    <td className="border-b border-slate-100 px-5 py-4 font-medium text-slate-800">
                                        {todo.title}
                                    </td>

                                    <td className="max-w-xs border-b border-slate-100 px-5 py-4 text-sm text-slate-600">
                                        {todo.description}
                                    </td>

                                    <td className="border-b border-slate-100 px-5 py-4">
                                        <span
                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                            todo.status === "completed"
                                            ? "bg-green-100 text-green-700"
                                            : todo.status === "in-progress"
                                            ? "bg-blue-100 text-blue-700"
                                            : "bg-yellow-100 text-yellow-700"
                                        }`}
                                        >
                                        {todo.status}
                                        </span>
                                    </td>

                                    <td className="border-b border-slate-100 px-5 py-4">
                                        <span
                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                            todo.priority === "high"
                                            ? "bg-red-100 text-red-700"
                                            : todo.priority === "medium"
                                            ? "bg-orange-100 text-orange-700"
                                            : "bg-slate-100 text-slate-600"
                                        }`}
                                        >
                                        {todo.priority}
                                        </span>
                                    </td>

                                    <td className="border-b border-slate-100 px-5 py-4 text-sm text-slate-600">
                                        {todo.dueDate}
                                    </td>

                                    <td className="border-b border-slate-100 px-5 py-4">
                                        <div className="flex gap-2">
                                        <button
                                            type="button"
                                            onClick={() => handleEdit(todo)}
                                            className="rounded-lg bg-emerald-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-emerald-600"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => handleDelete(todo)}
                                            className="rounded-lg bg-red-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                            ) : (
                            <tr>
                                <td
                                colSpan={6}
                                className="px-5 py-12 text-center"
                                >
                                <p className="text-lg font-medium text-slate-600">
                                    No todos found
                                </p>

                                <p className="mt-1 text-sm text-slate-400">
                                    Try changing your search or filters.
                                </p>
                                </td>
                            </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    </div>


  );
}

export default ToDoList;