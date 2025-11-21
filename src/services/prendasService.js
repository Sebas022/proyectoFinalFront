import axios from "axios";
import { getStorage } from "../utils/localStorageUtils";

console.log("API Base URL:", import.meta.env.VITE_API_BASE_URL);


const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + "/api/v1/clothes",
});

const getAuthHeader = () => {
  const token = getStorage("token");
  return { headers: { Authorization: `Bearer ${token}` } };
};

const readClothes = async () => {
  const response = await API.get("/list", getAuthHeader());
  if (response.status !== 200) throw new Error("Error al obtener prendas");
  return response.data;
};

const createClothe = async (newClothe) => {
  try {
    const response = await API.post("/create", newClothe, getAuthHeader());
    console.log("STATUS:", response.status);
    console.log("DATA:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error en backend:", error.response?.data);
    throw new Error("Error al crear prenda");
  }
};

const getClotheById = async (id) => {
  const response = await API.get(`/${id}`, getAuthHeader());
  return response.data.data; 
};


const updateClothe = async (id, updatedClothe) => {
  const response = await API.put(`/${id}`, updatedClothe, getAuthHeader());
  if (response.status !== 200) throw new Error("Error al actualizar prenda");
  return response.data;
};

const deleteClothe = async (id) => {
  const response = await API.delete(`/${id}`, getAuthHeader());
  if (response.status !== 200) throw new Error("Error al eliminar prenda");
  return response.data.data;
};

export { readClothes, createClothe, updateClothe, deleteClothe, getClotheById };
