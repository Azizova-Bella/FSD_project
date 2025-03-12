import { useEffect, useState } from 'react'
import { users } from '../../entities/table-user/model/data'
import { IUser } from '../../entities/table-user/model/types'
import Button from '../../shared/ui/button'
import deleteService from '../../entities/service/delete'
import editService from '../../entities/service/edit'
import addService from '../../entities/service/add'
import { applyDarkMode, getInitialDarkMode, toggleDarkMode } from '../../entities/service/darkmode'


export default function TableUser() {
  const [data, setData] = useState<IUser[]>(users)
  const [editUser, setEditUser] = useState<IUser | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(getInitialDarkMode())

  const [newUser, setNewUser] = useState<IUser>({
    id: Date.now(),
    name: '',
    surname: '',
    numberPhone: '',
    email: '',
    city: '',
    status: true,
  })

  useEffect(() => {
    applyDarkMode(darkMode)
  }, [darkMode])

  const handleToggleDark = () => {
    const newMode = toggleDarkMode(darkMode)
    setDarkMode(newMode)
  }

  const handleDelete = (id: number | string) => {
    setData(deleteService(data, id))
  }

  const handleEdit = (user: IUser) => {
    setEditUser(user)
  }

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editUser) return
    setEditUser({ ...editUser, [e.target.name]: e.target.value })
  }

  const handleSaveEdit = () => {
    if (!editUser) return
    const updated = editService(data, editUser)
    setData(updated)
    setEditUser(null)
  }

  const handleAddChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value })
  }

  const handleAddUser = () => {
    const updated = addService(data, newUser)
    setData(updated)
    setIsAddModalOpen(false)
    setNewUser({
      id: Date.now(),
      name: '',
      surname: '',
      numberPhone: '',
      email: '',
      city: '',
      status: true,
    })
  }

  return (
    <div className={`p-20 min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <div className="mb-4 flex justify-between items-center">
        <Button onClick={() => setIsAddModalOpen(true)}>Add User</Button>
        <Button onClick={handleToggleDark}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border border-gray-300 text-sm">
          <thead className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100'}`}>
            <tr>
              <th className="border px-4 py-2 text-left">ID</th>
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-left">Surname</th>
              <th className="border px-4 py-2 text-left">Phone</th>
              <th className="border px-4 py-2 text-left">Email</th>
              <th className="border px-4 py-2 text-left">City</th>
              <th className="border px-4 py-2 text-left">Status</th>
              <th className="border px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user: IUser, index) => (
              <tr key={user.id} className={index % 2 === 0 ? (darkMode ? 'bg-gray-800' : 'bg-white') : (darkMode ? 'bg-gray-700' : 'bg-gray-50')}>
                <td className="border px-4 py-2">{user.id}</td>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.surname}</td>
                <td className="border px-4 py-2">{user.numberPhone}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.city}</td>
                <td className="border px-4 py-2">{user.status ? 'Active' : 'Inactive'}</td>
                <td className="border px-4 py-2">
                  <div className="flex flex-wrap gap-2">
                    <Button onClick={() => handleEdit(user)}>Edit</Button>
                    <Button onClick={() => handleDelete(user.id)}>Delete</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editUser && (
        <div className={`p-4 border mt-4 rounded-xl max-w-3xl mx-auto ${darkMode ? 'bg-gray-800 border-gray-600' : 'bg-gray-100'}`}>
          <h3 className="font-bold mb-2 text-lg">Edit User</h3>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <input name="name" value={editUser.name} onChange={handleEditChange} placeholder="Name" className="border p-2 rounded bg-white text-black" />
            <input name="surname" value={editUser.surname} onChange={handleEditChange} placeholder="Surname" className="border p-2 rounded bg-white text-black" />
            <input name="numberPhone" value={editUser.numberPhone} onChange={handleEditChange} placeholder="Phone" className="border p-2 rounded bg-white text-black" />
            <input name="email" value={editUser.email} onChange={handleEditChange} placeholder="Email" className="border p-2 rounded bg-white text-black" />
            <input name="city" value={editUser.city} onChange={handleEditChange} placeholder="City" className="border p-2 rounded bg-white text-black" />
          </div>
          <div className="flex gap-4">
            <Button onClick={handleSaveEdit}>Save</Button>
            <Button onClick={() => setEditUser(null)}>Cancel</Button>
          </div>
        </div>
      )}

      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50">
          <div className={`p-6 rounded-xl w-full max-w-xl shadow-lg ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
            <h3 className="text-xl font-bold mb-4">Add New User</h3>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <input name="name" value={newUser.name} onChange={handleAddChange} placeholder="Name" className="border p-2 rounded bg-white text-black" />
              <input name="surname" value={newUser.surname} onChange={handleAddChange} placeholder="Surname" className="border p-2 rounded bg-white text-black" />
              <input name="numberPhone" value={newUser.numberPhone} onChange={handleAddChange} placeholder="Phone" className="border p-2 rounded bg-white text-black" />
              <input name="email" value={newUser.email} onChange={handleAddChange} placeholder="Email" className="border p-2 rounded bg-white text-black" />
              <input name="city" value={newUser.city} onChange={handleAddChange} placeholder="City" className="border p-2 rounded bg-white text-black" />
            </div>
            <div className="flex gap-4 justify-end">
              <Button onClick={handleAddUser}>Add</Button>
              <Button onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
