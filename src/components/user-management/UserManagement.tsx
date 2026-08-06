import { useState } from "react";
import useApi from "../../hooks/useApi";


interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  city: string;
}
function UserManagement() {

    const {
                    data: users, loading, error, addItem, updateItem,deleteItem,
                } = useApi<User>("https://json-server-api-oxsu.onrender.com/users");

    const [showForm, setShowForm] = useState(false);

    const [editingUser, setEditingUser] = useState<User | null>(null);

    const [formData, setFormData] = useState({name: "",email: "",phone: "",city: "",});

    const [errors, setErrors] = useState({name: "",email: "",phone: "",city: "",});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const handleAdd = () => {
        setEditingUser(null);
        setFormData({
            name: "",
            email: "",
            phone: "",
            city: "",
        });
        setShowForm(true);
    };

    const handleEdit = (user: User) => {
        setEditingUser(user);
        setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        city: user.city,
        });
        setShowForm(true);
    };

    

    const validateForm = () => {
        const newErrors = {
            name: "",
            email: "",
            phone: "",
            city: "",
        };

        let isValid = true;

        
        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
            isValid = false;
        } else if (formData.name.trim().length < 3) {
            newErrors.name = "Name must be at least 3 characters";
            isValid = false;
        }

        
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
            isValid = false;
        } else if (
            !formData.email.includes("@") ||
            !formData.email.includes(".")
            ) {
            newErrors.email = "Enter a valid email";
            isValid = false;
        }

        
        if (!formData.phone.trim()) {
            newErrors.phone = "Phone is required";
            isValid = false;
        }

        if (!formData.city.trim()) {
          newErrors.city = "City is required";
          isValid = false;
        }


        setErrors(newErrors);

        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) return;

        if (editingUser) {
            await updateItem(editingUser.id, {
            id: editingUser.id,
            ...formData,
            });
        } else {
            await addItem(formData);
        }

        setShowForm(false);
        setEditingUser(null);

        setFormData({
            name: "",
            email: "",
            phone: "",
            city: "",
        });

        setErrors({
            name: "",
            email: "",
            phone: "",
            city: "",
        });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    
  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">

            
            <div className="mb-6 flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
                        User Management
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Manage your users and their information
                    </p>
                </div>

                <button
                    onClick={handleAdd}
                    className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white shadow-sm transition hover:bg-blue-700"
                >
                    + Add User
                </button>
            </div>

            
            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-xl bg-white p-5 shadow-sm">
                    <p className="text-sm text-slate-500">Total Users</p>
                    <p className="mt-1 text-2xl font-bold text-slate-800">
                        {users.length}
                    </p>
                </div>

                <div className="rounded-xl bg-white p-5 shadow-sm">
                    <p className="text-sm text-slate-500">Current Status</p>
                    <p className="mt-1 text-2xl font-bold text-green-600">
                        Active
                    </p>
                </div>

                <div className="rounded-xl bg-white p-5 shadow-sm">
                    <p className="text-sm text-slate-500">Management</p>
                    <p className="mt-1 text-2xl font-bold text-blue-600">
                        GPCET
                    </p>
                </div>
            </div>

            
            {showForm && (
                <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm">
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-slate-800">
                                {editingUser ? "Update User" : "Add User"}
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                {editingUser
                                    ? "Update the user's information below."
                                    : "Enter the user's information below."}
                            </p>
                        </div>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="grid gap-5 md:grid-cols-2"
                    >
                        
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter name"
                                required
                                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />

                            {errors.name && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter email"
                                required
                                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />

                            {errors.email && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Phone
                            </label>

                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Enter phone"
                                required
                                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />

                            {errors.phone && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.phone}
                                </p>
                            )}
                        </div>

                        
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                City
                            </label>

                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                placeholder="Enter city"
                                required
                                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />

                            {errors.city && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.city}
                                </p>
                            )}
                        </div>

                        
                        <div className="flex gap-3 md:col-span-2">
                            <button
                                type="submit"
                                className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
                            >
                                {editingUser ? "Update User" : "Save User"}
                            </button>

                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 font-medium text-slate-700 transition hover:bg-slate-50"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            
            <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
                <div className="border-b border-slate-200 px-6 py-5">
                    <h2 className="text-lg font-bold text-slate-800">
                        Users
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        List of all registered users
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[750px]">
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
                                    City
                                </th>

                                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                            {users.map((user) => (
                                <tr
                                    key={user.id}
                                    className="transition hover:bg-slate-50"
                                >
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-slate-800">
                                            {user.name}
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 text-sm text-slate-600">
                                        {user.email}
                                    </td>

                                    <td className="px-6 py-4 text-sm text-slate-600">
                                        {user.phone}
                                    </td>

                                    <td className="px-6 py-4 text-sm text-slate-600">
                                        {user.city}
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex justify-center gap-2">
                                            <button
                                                onClick={() => handleEdit(user)}
                                                className="rounded-lg bg-amber-100 px-3 py-1.5 text-sm font-medium text-amber-700 transition hover:bg-amber-200"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() => deleteItem(user.id)}
                                                className="rounded-lg bg-red-100 px-3 py-1.5 text-sm font-medium text-red-700 transition hover:bg-red-200"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {users.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="px-6 py-12 text-center text-slate-500"
                                    >
                                        No users found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

  )
}

export default UserManagement
