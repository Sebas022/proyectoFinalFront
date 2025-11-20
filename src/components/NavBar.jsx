import {Link, useNavigate} from 'react-router-dom';
import { ArrowRightStartOnRectangleIcon   } from '@heroicons/react/24/solid';
import Swal from 'sweetalert2';


const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "¿Quieres cerrar sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      Swal.fire("Sesión cerrada", "Has cerrado sesión correctamente", "success");

      navigate("/login");
    }
  };



  return (
    <div
  id="navbar"
  className="w-full h-20 flex items-center px-6 gap-6 bg-[#111111] text-white shadow-md"
>
  {/* HOME */}
  <Link to="/" className="text-3xl p-5">
    Home
  </Link>

  <div className="ml-auto">
    <button
      onClick={handleLogout}
      className="p-2 border  border-white rounded-full hover:bg-white/10 transition cursor-pointer mt-2"
    >
      <ArrowRightStartOnRectangleIcon className="w-5 h-5" />
    </button>
  </div>
</div>

  )
}

export default NavBar