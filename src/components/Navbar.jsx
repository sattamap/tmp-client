import { Link } from "react-router-dom";


const Navbar = () => {
    return (
        <div className="max-w-full">
            <div className="navbar fixed z-10 bg-slate-400 px-20 py-6">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <Link to="/"><li><a>Home</a></li></Link>
        <Link to="/"><li><a>All Tasks</a></li></Link>
        <Link to="/"><li><a>Blog</a></li></Link>
       
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">daisyUI</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
    <Link to="/"><li><a>Home</a></li></Link>
        <Link to="/"><li><a>All Tasks</a></li></Link>
        <Link to="/"><li><a>Blog</a></li></Link>
    </ul>
  </div>
  <div className="navbar-end gap-4">
    <Link to="login"><a className="btn">Login</a></Link>
    <Link to="register"><a className="btn">Register</a></Link>
  </div>
</div>
        </div>
    );
};

export default Navbar;