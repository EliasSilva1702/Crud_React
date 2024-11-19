import axios from "axios";

const API_URL = "https://users-crud-api-81io.onrender.com/api/v1/users";

const useApi = () => {
  const getUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      // console.log(" getUsers:", response);
      // Devuelve los datos (usuarios)
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      // en caso de no encontrar datos (usuarios), debuelve un array vacio
      if (error.status === 404) {
        return []; // Devuelve un arreglo vacío en caso de error
      }
    }
  };

  const createUser = async (userData) => {
    try {
      const response = await axios.post(API_URL, userData);
      return response.data; // Asegúrate de retornar la propiedad 'data' de la respuesta
    } catch (error) {
      throw new Error("Hubo un error al crear el usuario."); // Lanza un error personalizado
    }
  };

  const updateUser = async (userData) => {
    try {

      const response = await axios.put(`${API_URL}/${userData.id}`, userData);

      // Devuelve directamente los datos del usuario actualizado
      if (response.data && response.data.data) {
        return response.data.data;
      } else {
        throw new Error(
          "La API no devolvió los datos del usuario actualizado."
        );
      }
    } catch (error) {
      throw new Error("Hubo un error al actualizar el usuario.");
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
    }
  };

  return { getUsers, createUser, updateUser, deleteUser };
};

export default useApi;
