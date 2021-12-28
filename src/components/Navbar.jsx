import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdAdd, IoMdSearch } from "react-icons/io";
import { AiOutlineLogout } from "react-icons/ai";

const Navbar = ({ searchTerm, setSearchTerm, user }) => {
  const navigate = useNavigate();

  if (!user) return null;

  const User =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();

  const logout = () => {
    localStorage.clear();

    navigate("/login");
  };

  return (
    <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7">
      <div
        className="flex justify-start items-center w-full px-2 rounded-md bg-white border-none
    outline-none focus-within:shadow-sm"
      >
        <IoMdSearch fontSize={21} className="ml-1" />
        <input
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search"
          value={searchTerm}
          onFocus={() => navigate("/search")}
          className="p-2 w-full bg-white outline-none"
        />
      </div>
      <div className="flex gap-3">
        <Link
          to={`user-profile/${user?._id}`}
          className="hidden md:block hover:scale-105"
        >
          <img
            src={user.image}
            alt="user"
            className="w-12 h-12 md:w-14 md:h-12 rounded-lg"
          />
        </Link>
        <Link
          to="create-post"
          className="bg-emerald-500 text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex
         justify-center items-center hover:scale-105"
        >
          <IoMdAdd />
        </Link>
        {User?._id && (
          <button
            type="button"
            className=" bg-white p-2 rounded-lg cursor-pointer outline-none shadow-md
            hover:scale-105"
            onClick={logout}
          >
            <AiOutlineLogout className="text-emerald-500" fontSize={25} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
