import { create } from "zustand";
import axios from "axios";
import { saveStorage, getStorage, removeStorage } from "../utils/localStorageUtils";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + "/api/v1",
});

const useAuthStore = create((set) => ({
  token: getStorage("token") || null,
  isLogged: !!getStorage("token"),

  loginUser: async (email, password) => {
  const response = await API.post("/users/login", { email, password });
  const token = response.data.data;
  saveStorage("token", token);
  set({ token, isLogged: true });
},


  logoutUser: () => {
    removeStorage("token");
    set({ token: null, isLogged: false });
  },
}));

export default useAuthStore;
