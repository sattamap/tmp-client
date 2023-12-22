import { useState, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FaEnvelope, FaHome, FaUser } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import useAxiosPublic from '../hooks/useAxiosPublic';
import TaskList from '../components/Task/TaskList';
import AddTask from '../pages/Dashboard/AddTask';


const Dashboard = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [tasks, setTasks] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axiosPublic.get('/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [axiosPublic, showAddForm]);

  // Callback function to handle "Add Task" form visibility
  const handleTaskAdded = () => {
    setShowAddForm(false);
  };


  

  return (
    <div className="flex">
      <div className="w-64 min-h-screen bg-[#4dd0e1]">
        <div className="flex flex-col items-center justify-center p-4">
          <img
            src={user.photoURL}
            alt="Profile"
            className="w-20 h-20 rounded-full mr-2"
          />
          <span className="text-white">{user.displayName}</span>
        </div>
        <ul className="menu p-4">
          <li>
            <button onClick={() => setShowAddForm(true)}>
              <FaUser></FaUser> Add Task
            </button>
          </li>
          <div className="divider"></div>
          <li>
            <NavLink to="/">
              <FaHome></FaHome> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact">
              <FaEnvelope></FaEnvelope> Contact
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="flex-1 p-10">
        {showAddForm ? (
          <AddTask onTaskAdded={handleTaskAdded} />
        ) : (
          <TaskList tasks={tasks.filter((task) => task.status === 'to-do')} />
        )}
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
