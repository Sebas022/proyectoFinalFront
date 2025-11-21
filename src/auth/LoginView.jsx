import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const LoginView = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { loginUser } = useAuthStore();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await loginUser(data.email, data.password);
      navigate("/home");
    } catch (error) {
      alert("Error de login: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl shadow-2xl shadow-black p-8 text-white">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Login Admin
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 rounded-lg border border-white text-white"
            {...register("email", { required: "El email es obligatorio" })}
          />
          {errors.email && (
            <p className="text-red-400 text-sm">{errors.email.message}</p>
          )}

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 rounded-lg border border-white text-white"
            {...register("password", { required: "La contraseña es obligatoria" })}
          />
          {errors.password && (
            <p className="text-red-400 text-sm">{errors.password.message}</p>
          )}

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition cursor-pointer"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginView;
