import { Link, NavLink } from "react-router-dom";
import { assets } from "../assets/assets.js";
import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext.jsx";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const {
    setShowSearch,
    getCartCount,
    token,
    setToken,
    navigate,
    setCartItems,
  } = useContext(ShopContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between py-5 font-medium">
      {/*-------------------Navbar Logo-------------------*/}
      <Link to={"/"}>
        <img src={assets.logo} alt="" className="w-36" />
      </Link>

      {/*-------------------Navbar Pages------------------*/}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to={"/"} className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4  border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink
          to={"/collections"}
          className="flex flex-col items-center gap-1"
        >
          <p>COLLECTIONS</p>
          <hr className="w-2/4  border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to={"/about"} className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4  border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to={"contact"} className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4  border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>

      {/*----------------Navbar Search & Profile Section---------------*/}
      <div className="flex items-center gap-6">
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          className="w-5 cursor-pointer"
        />

        <div className="group relative">
          <img
            onClick={() => (token ? null : navigate("/login"))}
            className="w-5 cursor-pointer"
            src={assets.profile_icon}
            alt="profile_icon"
          />
          {/*---------------------------Dropdown menu-----------------------*/}
          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                <p className="cursor-pointer hover:text-black">My profile</p>
                <p
                  onClick={() => navigate("/orders")}
                  className="cursor-pointer hover:text-black"
                >
                  Orders
                </p>
                <p onClick={logout} className="cursor-pointer hover:text-black">
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>
        <Link to={"/cart"} className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="cart_icon" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[12px]">
            {getCartCount()}
          </p>
        </Link>
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt="menu_icon"
        />
      </div>

      {/* Side bar menu for small screens */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img className="h-4 rotate-180" src={assets.dropdown_icon} />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            to={"/"}
            className="py-2 pl-6 border-none"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            to={"/collections"}
            className="py-2 pl-6 border-none"
          >
            COLLECTIONS
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            to={"/about"}
            className="py-2 pl-6 border-none"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            to={"/contact"}
            className="py-2 pl-6 border-none"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
