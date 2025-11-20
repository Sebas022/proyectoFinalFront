import { useEffect, useState } from "react";
import TableData from "../components/TableData";
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

import { readClothes, deleteClothe } from "../services/prendasService";

const HomeView = () => {
  const [clothes, setClothes] = useState([]);

  // Configuración de columnas para la tabla
  const headersData = [
    { name: "clotheName", label: "Nombre" },
    { name: "clotheType", label: "Tipo" },
    { name: "brand", label: "Marca" },
    { name: "clotheCountry", label: "País" },
    { name: "price", label: "Precio", pipe: (valor) => `$ ${valor}` },
    { name: "imageUrl", label: "Imagen" },
    { name: "categoryId", label: "Categoría", pipe: x => x?.categoryName },
    { name: "storeId", label: "Tienda", pipe: x => x?.storeName },
  ];

  // Acción de eliminar
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await deleteClothe(id);
        Swal.fire("Eliminado!", "La prenda ha sido eliminada.", "success");
        setClothes(prev => prev.filter(item => item.clotheId !== id));
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "No se pudo eliminar la prenda", "error");
      }
    }
  };

  // Botones de acción
  const actions = [
    {
      content: (item) => (
        <Link to={`/actualizarprenda/${item.clotheId}`} className="btn btn-sm btn-warning flex items-center gap-1">
          <PencilIcon className="w-4 h-4 text-yellow-500 cursor-pointer"/>
        </Link>
      ),
    },
    {
      content: (item) => (
        <button
          onClick={() => handleDelete(item.clotheId)}
          className="btn btn-sm btn-error flex items-center gap-1"
        >
          <TrashIcon className="w-4 h-4 text-red-500 cursor-pointer"/>
        </button>
      ),
    },
  ];

  // Llamada a la API
  useEffect(() => {
    const getClothes = async () => {
      try {
        const data = await readClothes();
        setClothes(data?.data || []);
      } catch (error) {
        console.error("Error al obtener prendas:", error);
      }
    };
    getClothes();
  }, []);

  return (
    <div className="max-w-8xl mx-auto p-5 bg-[#0a1a2f]">
      <div className="flex items-center justify-between mb-6">
  <h1 className="text-4xl pt-10 pb-10 text-white">
    Mantenimiento de Prendas
  </h1>

  <Link
    to="/crearprenda"
    className="px-6 py-3 rounded-2xl text-white font-semibold 
               bg-green-600 hover:bg-green-700 shadow-md hover:shadow-lg 
               transition-all duration-200"
  >
    Registrar Prenda
  </Link>
</div>

      
      <TableData data={clothes} headers={headersData} actions={actions} />
    </div>
  );
};

export default HomeView;
