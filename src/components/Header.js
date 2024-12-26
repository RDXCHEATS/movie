import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import userIcon from "../assets/user.png";
import { IoSearchOutline } from "react-icons/io5";
import { navigation } from "../pages/Home";

const Header = () => {
  const location = useLocation(); // To track the current route
  const navigate = useNavigate(); // For dynamic navigation
  const queryParam = new URLSearchParams(location.search).get("q"); // Extract `q` parameter
  const [searchInput, setSearchInput] = useState(queryParam || ""); // Manage search input state

  // Navigate to search results whenever searchInput changes
  useEffect(() => {
    if (searchInput.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchInput)}`);
    }
  }, [searchInput, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchInput)}`);
    }
  };

  return (
    <header className="fixed top-0 w-full h-16 bg-black bg-opacity-50 z-40">
      <div className="container mx-auto px-3 flex items-center h-full">
        {/* Logo */}
        <Link to={"/"}>
          <img src={logo} alt="logo" width={120} />
        </Link>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-4 ml-5">
          {navigation.map((nav, index) => (
            <NavLink
              key={`${nav.label}-header-${index}`}
              to={nav.href}
              className={({ isActive }) =>
                `px-3 py-1 text-sm hover:text-neutral-100 ${
                  isActive ? "text-neutral-100 border-b-2 border-white" : ""
                }`
              }
            >
              {nav.label}
            </NavLink>
          ))}
        </nav>

        {/* Search & User Options */}
        <div className="ml-auto flex items-center gap-5">
          {/* Search Form */}
          <form className="flex items-center gap-2" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent px-4 py-1 outline-none border-b border-gray-500 hidden lg:block"
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
            />
            <button type="submit" className="text-2xl text-white">
              <IoSearchOutline />
            </button>
          </form>

          {/* User Icon (Optional) */}
          <div>
            <img
              src={userIcon}
              alt="User"
              className="w-8 h-8 rounded-full hidden lg:block"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
