import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { getClotheById, updateClothe } from "../services/prendasService";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateClotheView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const categories = [
    { id: 1, name: "Polos" },
    { id: 2, name: "Pantalones" },
    { id: 3, name: "Zapatillas" },
    { id: 4, name: "Casacas" },
  ];

  const stores = [
    { id: 1, name: "Nike Store" },
    { id: 2, name: "Zara" },
    { id: 3, name: "H&M" },
  ];

  // Cargar datos existentes
  useEffect(() => {
    const loadData = async () => {
      const data = await getClotheById(id);

      setValue("clotheName", data.clotheName);
      setValue("clotheType", data.clotheType);
      setValue("brand", data.brand);
      setValue("clotheCountry", data.clotheCountry);
      setValue("price", data.price);
      setValue("imageUrl", data.imageUrl);
      setValue("categoryId", data.categoryId?.categoryId);
      setValue("storeId", data.storeId?.storeId);
    };

    loadData();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    data.price = Number(data.price);
    data.categoryId = Number(data.categoryId);
    data.storeId = Number(data.storeId);

    try {
      await updateClothe(id, data);

      Swal.fire({
        icon: "success",
        title: "Prenda actualizada",
        text: "Los cambios se guardaron correctamente",
        theme: "dark",
      });

      navigate("/home");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Hubo un problema al actualizar la prenda. ${error}`,
      });
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white/80 backdrop-blur-md shadow-xl rounded-xl border border-white/20 mt-10 mb-10">
      <h1 className="text-2xl font-bold mb-5 text-gray-900">Actualizar Prenda</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

        {/* INPUTS */}
        {[
          { name: "clotheName", label: "Nombre" },
          { name: "clotheType", label: "Tipo" },
          { name: "brand", label: "Marca" },
          { name: "clotheCountry", label: "País de origen" },
          { name: "imageUrl", label: "URL de la imagen" },
        ].map((item) => (
          <div key={item.name} className="flex flex-col">
            <label className="mb-1 font-medium text-gray-800">{item.label}</label>

            <input
              {...register(item.name, {
                required: `El campo ${item.label} es obligatorio`,
              })}
              className="border border-gray-300 rounded-lg px-3 py-2 bg-white"
            />

            {errors[item.name] && (
              <p className="text-red-500 text-sm">{errors[item.name].message}</p>
            )}
          </div>
        ))}

        {/* PRECIO */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-800">Precio</label>
          <input
            type="number"
            {...register("price", {
              required: "El precio es obligatorio",
              min: { value: 1, message: "El precio debe ser mayor a 0" },
            })}
            className="border border-gray-300 rounded-lg px-3 py-2 bg-white"
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price.message}</p>
          )}
        </div>

        {/* CATEGORÍA */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-800">Categoría</label>

          <select
            {...register("categoryId", { required: "Seleccione una categoría" })}
            className="border border-gray-300 rounded-lg px-3 py-2 bg-white"
          >
            <option value="" disabled>
              Seleccione una categoría
            </option>

            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          {errors.categoryId && (
            <p className="text-red-500 text-sm">{errors.categoryId.message}</p>
          )}
        </div>

        {/* TIENDA */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-800">Tienda</label>

          <select
            {...register("storeId", { required: "Seleccione una tienda" })}
            className="border border-gray-300 rounded-lg px-3 py-2 bg-white"
          >
            <option value="" disabled>
              Seleccione una tienda
            </option>

            {stores.map((str) => (
              <option key={str.id} value={str.id}>
                {str.name}
              </option>
            ))}
          </select>

          {errors.storeId && (
            <p className="text-red-500 text-sm">{errors.storeId.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 mt-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
        >
          Actualizar Prenda
        </button>
      </form>
    </div>
  );
};

export default UpdateClotheView;
