import { useForm } from "react-hook-form";
import { createClothe } from "../services/prendasService.js";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CreateClotheView = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      clotheName: "",
      clotheType: "",
      brand: "",
      clotheCountry: "",
      price: "",
      imageUrl: "",
      categoryId: "",
      storeId: "",
    },
  });

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

  const inputsInfo = [
    { name: "clotheName", label: "Nombre de la prenda", type: "text" },
    { name: "clotheType", label: "Tipo de prenda", type: "text" },
    { name: "brand", label: "Marca", type: "text" },
    { name: "clotheCountry", label: "País de origen", type: "text" },
    { name: "price", label: "Precio", type: "number" },
    { name: "imageUrl", label: "URL de la imagen", type: "text" },
  ];

  const onSubmit = async (data) => {
    try {

      data.price = Number(data.price);
      data.categoryId = Number(data.categoryId);
      data.storeId = Number(data.storeId);

      await createClothe(data);

      Swal.fire({
        icon: "success",
        title: "Prenda creada",
        text: `La prenda ${data.clotheName} fue registrada correctamente`,
        theme: "dark",
      });

      reset();
      navigate("/home");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Hubo un problema al crear la prenda. ${error}`,
        theme: "dark",
      });
    }
  };

  return (
  <div className="max-w-xl mx-auto p-6 bg-white/90 backdrop-blur-md shadow-xl shadow-black rounded-xl border border-white/20 mt-10 mb-10">
    <h1 className="text-2xl font-bold mb-5 text-gray-900">Crear Prenda</h1>

    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {inputsInfo.map((item) => (
        <div key={item.name} className="flex flex-col">
          <label className="mb-1 font-medium text-gray-800">{item.label}</label>

          <input
            type={item.type}
            {...register(item.name, {
              required: `El campo ${item.label} es obligatorio`,
            })}
            className="border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-black-400 outline-none transition"
          />

          {errors[item.name] && (
            <p className="text-red-500 text-sm">
              {errors[item.name]?.message}
            </p>
          )}
        </div>
      ))}

      {/* CATEGORÍA */}
<div className="flex flex-col">
  <label className="mb-1 font-medium text-gray-800">Categoría</label>

  <select
  defaultValue="Seleccione una categoría"
  {...register("categoryId", {
    required: "Seleccione una categoría",
  })}
  className="border border-gray-300 rounded-lg px-3 py-2 bg-white"
>
  <option value="" disabled hidden>
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
  defaultValue="Seleccione una tienda"
  {...register("storeId", {
    required: "Seleccione una tienda",
  })}
  className="border border-gray-300 rounded-lg px-3 py-2 bg-white"
>
  <option value="" disabled hidden>
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
        className="w-full bg-blue-600 text-white py-2 mt-2 rounded-lg hover:bg-blue-700 transition shadow-sm cursor-pointer"
      >
        Crear Prenda
      </button>
    </form>
  </div>
);

};

export default CreateClotheView;
