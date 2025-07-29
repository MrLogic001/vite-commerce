import { assets } from "../assets/assets"

const Navbar = ({ setToken }) => {
  return (
    <nav className="flex items-center justify-between py-2 px-[4%]">
        <img className="w-36" src={assets.logo} alt="logo" />
        <button onClick={() => setToken('')} className="bg-gray-600 transition:500 cursor-pointer hover:bg-sky-200 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm">Logout</button>
    </nav>
  )
}

export default Navbar

//className="w-[max(10%, 80px)]"