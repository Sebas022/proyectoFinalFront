// utils/localStorageUtils.js

// Guardar datos en localStorage
export const saveStorage = (key, data) => {
  try {
    const jsonData = JSON.stringify(data);
    localStorage.setItem(key, jsonData);
  } catch (error) {
    console.error("Error guardando en localStorage:", error);
  }
};

// Obtener datos desde localStorage
export const getStorage = (key) => {
  try {
    const jsonData = localStorage.getItem(key);
    return jsonData ? JSON.parse(jsonData) : null;
  } catch (error) {
    console.error("Error leyendo desde localStorage:", error);
    return null;
  }
};

// Eliminar datos de localStorage
export const removeStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error eliminando desde localStorage:", error);
  }
};
