import React, { useState, useEffect } from "react";
import useApi from "../hooks/useApi";
import UserCard from "./UserCard";
import UserForm from "./UserForm";
import ModalNotification from "./ModalNotification";
import ConfirmDeleteModal from "./ConfirmDeleteModal"; // Importamos el nuevo componente
import { HeartCrack, PlusIcon } from "lucide-react";
import { motion } from "framer-motion";
const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [notification, setNotification] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadind, setLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Estado para el modal de confirmación
  const [userToDelete, setUserToDelete] = useState(null); // Usuario a eliminar
  const { getUsers, createUser, updateUser, deleteUser } = useApi();

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await getUsers();
      if (usersData) {
        setUsers(usersData.data);
      }
    };
    fetchUsers();
  }, []);

  // Eliminar un usuario
  const handleDelete = async (id) => {
    try {
      await deleteUser(id); //! Realiza la eliminación
      setNotification("User successfully deleted.");
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (error) {
      setNotification("Error deleting user.");
    }
    setIsDeleteModalOpen(false); // Cierra el modal
  };

  // Muestra el modal de confirmación de eliminación
  const openDeleteModal = (user) => {
    setUserToDelete(user); // Establece el usuario a eliminar
    setIsDeleteModalOpen(true); // Abre el modal
  };

  // Cancela la eliminación
  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setUserToDelete(null); //* Resetea el usuario a eliminar
  };

  // Editar un usuario
  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // Guardar cambios en la creación o actualización de usuario
  const handleSave = async (data) => {
    if (selectedUser && selectedUser.id) {
      try {
        const updatedUser = await updateUser(data);
        setNotification("User updated successfully.");
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === selectedUser.id ? { ...user, ...updatedUser } : user
          )
        );
      } catch (error) {
        setNotification("An error occurred while updating the user.");
      }
    } else {
      try {
        const response = await createUser(data);
        if (response && response.data) {
          setUsers((prevUsers) => [...prevUsers, response.data]);
          setNotification("User created successfully.");
        } else {
          setNotification("An error occurred while creating the user.");
        }
      } catch (error) {
        setNotification("An error occurred while creating the user.");
      }
    }
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      {}
      {notification && (
        <ModalNotification
          message={notification}
          onClose={() => setNotification("")}
        />
      )}
      <motion.button
        whileHover={{ scale: 0.92 }}
        whileTap={{ scale: 0.9 }}
        className="text-2xl bg-slate-900 text-white px-6 py-3 rounded-lg m-4 hover:bg-slate-800 flex items-center gap-2 justify-center"
        onClick={() => setIsModalOpen(true)}
      >
        Create User
        <PlusIcon className="w-7 h-7" />
      </motion.button>
      {isModalOpen && (
        <UserForm
          onSubmit={handleSave}
          defaultValues={selectedUser}
          setIsOpen={handleCancel}
        />
      )}
      {isDeleteModalOpen && (
        <ConfirmDeleteModal
          onConfirm={() => handleDelete(userToDelete.id)} // Ejecuta la eliminación
          onCancel={handleCancelDelete} // Cancela la eliminación
          userName={userToDelete?.first_name}
        />
      )}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 w-full md:w-fit mx-auto">
        {users.length > 0 ? (
          users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onDelete={() => openDeleteModal(user)} // Muestra el modal al hacer clic
              handleEdit={handleEdit}
            />
          ))
        ) : (
          <div className="text-center flex items-center justify-center">
            <h1 className="text-2xl font-bold m-4">No users found...</h1>
            <HeartCrack />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;
