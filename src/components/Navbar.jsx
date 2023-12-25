import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { FaUserAlt } from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  return (
    <div className="max-w-full">
      <div className="navbar fixed z-10 bg-gray-800 px-20 py-6">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-gray-700 rounded-box w-52"
            >
              <Link to="/">
                <li>
                  <a className="text-white">Home</a>
                </li>
              </Link>
              <Link to="/about">
                <li>
                  <a className="text-white">About Us</a>
                </li>
              </Link>
              <Link to="/dashboard">
                <li>
                  <a className="text-white">Task Board</a>
                </li>
              </Link>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl text-white">daisyUI</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <Link to="/">
              <li>
                <a className="text-white">Home</a>
              </li>
            </Link>
            <Link to="/about">
              <li>
                <a className="text-white">About Us</a>
              </li>
            </Link>
            <Link to="/dashboard">
              <li>
                <a className="text-white">Task Board</a>
              </li>
            </Link>
          </ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="nav-item flex items-center">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={`${user.displayName}'s Profile`}
                  className="btn btn-ghost btn-circle avatar"
                />
              ) : (
                <FaUserAlt className="btn btn-ghost btn-circle avatar" />
              )}
              <span className="nav-link mx-2 text-white">
                Welcome, {user.displayName?.split(" ")[0]}!
              </span>
              <button
                className="btn bg-emerald-800 mx-2"
                onClick={handleLogOut}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="nav-item flex items-center">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar text-white"
              >
                <div>
                  <FaUserAlt />
                </div>
              </label>
              <Link
                to="/login"
                className="btn btn-accent bg-emerald-800 ml-2"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
