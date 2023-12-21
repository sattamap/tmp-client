import { NavLink, Outlet } from "react-router-dom";
import {  FaEnvelope, FaHome, FaRegCalendarCheck, FaSearch, FaUser } from "react-icons/fa";
import {  MdOutput } from "react-icons/md";
import useAuth from "../hooks/useAuth";




const Dashboard = () => {
    const { user } = useAuth();
    console.log("User",user);

    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-[#4dd0e1]">
            <div className="flex flex-col items-center justify-center p-4">
          <img
            src={user.photoURL} // Replace with the actual URL of the user's profile picture
            alt="Profile"
            className="w-20 h-20 rounded-full mr-2"
          />
          <span className="text-white">{user.displayName}</span>
        </div>
                <ul className="menu p-4">
                

                                <li><NavLink to="/dashboard/profile">
                                    <FaUser></FaUser> User Profile
                                </NavLink>
                                </li>
                                <li><NavLink to="/dashboard/appointments">
                                    <FaRegCalendarCheck></FaRegCalendarCheck> Upcoming Appointments
                                </NavLink>
                                </li>
                                <li><NavLink to="/dashboard/testResult">
                                    <MdOutput></MdOutput> My Test Result
                                </NavLink>
                                </li>
               

                    <div className="divider"></div>


                    {/* shared Navlinks */}
                    <li><NavLink to="/">
                        <FaHome></FaHome> Home
                    </NavLink>
                    </li>
                    <li><NavLink to="/allTests">
                        <FaSearch></FaSearch> All Test
                    </NavLink>
                    </li>
                    <li><NavLink to="/contact">
                        <FaEnvelope></FaEnvelope> Contact
                    </NavLink>
                    </li>
                </ul>
            </div>
            <div className="flex-1 p-10">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;