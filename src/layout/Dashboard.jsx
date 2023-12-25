

// // Dashboard.jsx
// import { useState, useEffect } from 'react';
// import { NavLink, Outlet } from 'react-router-dom';
// import { FaEnvelope, FaHome, FaUser } from 'react-icons/fa';
// import useAuth from '../hooks/useAuth';
// import useAxiosPublic from '../hooks/useAxiosPublic';
// import TaskList from '../components/Task/TaskList';
// import AddTask from '../pages/Dashboard/AddTask';
// import { DragDropContext, Droppable } from 'react-beautiful-dnd';

// const Dashboard = () => {
//   const { user } = useAuth();
//   const axiosPublic = useAxiosPublic();
//   const [tasks, setTasks] = useState([]);
//   const [showAddForm, setShowAddForm] = useState(false);

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const response = await axiosPublic.get('/tasks');
//         setTasks(response.data);
//       } catch (error) {
//         console.error('Error fetching tasks:', error);
//       }
//     };

//     fetchTasks();
//   }, [axiosPublic, showAddForm]);


//   const handleTaskAdded = () => {
//     setShowAddForm(false);
//   };

//   const handleDragEnd = async (result) => {
//     if (!result.destination) {
//       return;
//     }

//     const sourceStatus = result.source.droppableId;
//     const destinationStatus = result.destination.droppableId;

//     if (sourceStatus === destinationStatus) {
//       // Reorder within the same list
//       const reorderedTasks = Array.from(tasks);
//       const [removed] = reorderedTasks.splice(result.source.index, 1);
//       reorderedTasks.splice(result.destination.index, 0, removed);

//       setTasks(reorderedTasks);
//     } else {
//       // Move between lists
//       const updatedTasks = [...tasks];
//       const movedTask = updatedTasks.find((task) => task._id === result.draggableId);

//       // Update the task status in the state
//       movedTask.status = destinationStatus;
//       setTasks(updatedTasks);

//       // Update the task status in the backend
//       try {
//         await axiosPublic.put(`/tasks/${result.draggableId}`, { status: destinationStatus });
//       } catch (error) {
//         console.error('Error updating task status:', error);
//       }
//     }
//   };

//   return (
//     <>
//     {tasks.length > 0 && (
//     <DragDropContext onDragEnd={handleDragEnd}>
//       <div className="flex">
//         <div className="w-64 min-h-screen bg-[#4dd0e1]">
//           <div className="flex flex-col items-center justify-center p-4">
//             <img src={user.photoURL} alt="Profile" className="w-20 h-20 rounded-full mr-2" />
//             <span className="text-white">{user.displayName}</span>
//           </div>
//           <ul className="menu p-4">
//             <li>
//               <button onClick={() => setShowAddForm(true)}>
//                 <FaUser></FaUser> Add Task
//               </button>
//             </li>
//             <div className="divider"></div>
//             <li>
//               <NavLink to="/">
//                 <FaHome></FaHome> Home
//               </NavLink>
//             </li>
//             <li>
//               <NavLink to="/contact">
//                 <FaEnvelope></FaEnvelope> Contact
//               </NavLink>
//             </li>
//           </ul>
//         </div>

//         <div className="flex flex-row p-10">
//           {showAddForm ? (
//             <AddTask onTaskAdded={handleTaskAdded} />
//           ) : (
//             <>
//               {['to-do', 'ongoing', 'completed'].map((droppableId, index) => (
//                 <Droppable key={droppableId} droppableId={droppableId}>
//                   {(provided) => (
//                     <div {...provided.droppableProps} ref={provided.innerRef} className="mr-4">
//                       <TaskList
//                         title={droppableId.charAt(0).toUpperCase() + droppableId.slice(1)}
//                         tasks={tasks.filter((task) => task.status === droppableId)}
//                         droppableId={droppableId}
//                       />
//                       {provided.placeholder}
//                     </div>
//                   )}
//                 </Droppable>
//               ))}
//             </>
//           )}
//           <Outlet />
//         </div>
//       </div>
//     </DragDropContext>
//       )}
//       </>
//   );
// };

// export default Dashboard;



// Dashboard.jsx
// import { useState, useEffect } from 'react';
// import { NavLink, Outlet } from 'react-router-dom';
// import { FaEnvelope, FaHome, FaTasks, FaUser } from 'react-icons/fa';
// import useAuth from '../hooks/useAuth';
// import useAxiosPublic from '../hooks/useAxiosPublic';
// import TaskList from '../components/Task/TaskList';
// import AddTask from '../pages/Dashboard/AddTask';
// import { DragDropContext, Droppable} from 'react-beautiful-dnd';

// const Dashboard = () => {
//   const { user } = useAuth();
//   const axiosPublic = useAxiosPublic();
//   const [tasks, setTasks] = useState([]);
//   const [showAddForm, setShowAddForm] = useState(false);


// useEffect(() => {
//     console.log('Dashboard component mounted or updated');
  
//     const fetchTasks = async () => {
//       console.log('Fetching tasks...');
//       try {
//         const response = await axiosPublic.get('/tasks');
//         setTasks(response.data);
//       } catch (error) {
//         console.error('Error fetching tasks:', error);
//       }
//     };
  
//     fetchTasks();
  
//     return () => {
//       console.log('Dashboard component will unmount');
//       // Cleanup or reset state when component unmounts
//       setTasks([]);
//     };
//   }, [axiosPublic]);
  

//   const updateTaskList = async () => {
//     try {
//       const response = await axiosPublic.get('/tasks');
//       setTasks(response.data);
//     } catch (error) {
//       console.error('Error updating task list:', error);
//     }
//   };

//   const handleTaskAdded = () => {
//     setShowAddForm(false);
//     updateTaskList();
//   };

//   const handleDragEnd = async (result) => {
//     if (!result.destination) {
//       return;
//     }

//     const sourceStatus = result.source.droppableId;
//     const destinationStatus = result.destination.droppableId;

//     if (sourceStatus === destinationStatus) {
//       // Reorder within the same list
//       const reorderedTasks = Array.from(tasks);
//       const [removed] = reorderedTasks.splice(result.source.index, 1);
//       reorderedTasks.splice(result.destination.index, 0, removed);

//       setTasks(reorderedTasks);
//     } else {
//       // Move between lists
//       const updatedTasks = [...tasks];
//       const movedTask = updatedTasks.find((task) => task._id === result.draggableId);

//       // Update the task status in the state
//       movedTask.status = destinationStatus;
//       setTasks(updatedTasks);

//       // Update the task status in the backend
//       try {
//         await axiosPublic.put(`/tasks/${result.draggableId}`, { status: destinationStatus });
//       } catch (error) {
//         console.error('Error updating task status:', error);
//       }
//     }
//   };

//   const handleDeleteTask = (taskId) => {
//     // Update the local state to remove the deleted task
//     setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
//   };

//   return (
//     <DragDropContext onDragEnd={handleDragEnd}>
//       <div className="flex">
//         <div className="w-64 min-h-screen bg-[#4dd0e1]">
//           <div className="flex flex-col items-center justify-center p-4">
//             <img src={user?.photoURL} alt="Profile" className="w-20 h-20 rounded-full mr-2" />
//             <span className="text-white">{user?.displayName}</span>
//           </div>
//           <ul className="menu p-4">
//             <li>
//               <button onClick={() => setShowAddForm(true)}>
//                 <FaUser></FaUser> Add Task
//               </button>
//             </li>
//             <li>
         
//             </li>
//             <div className="divider"></div>
//             <li>
//               <NavLink to="/">
//                 <FaHome></FaHome> Home
//               </NavLink>
//             </li>
//             <li>
//               <NavLink to="/contact">
//                 <FaEnvelope></FaEnvelope> Contact
//               </NavLink>
//             </li>
//           </ul>
//         </div>

//         <div className="flex flex-row p-10">
//           {showAddForm ? (
//             <AddTask onTaskAdded={handleTaskAdded} />
//           ) : (
//             <>
//               {['to-do', 'ongoing', 'completed'].map((droppableId, index) => (
//                 <Droppable key={index} droppableId={droppableId}>
//                   {(provided) => (
//                     <div {...provided.droppableProps} ref={provided.innerRef} className="mr-4">
//                       {/* Pass droppableId to TaskList component */}
                      
//                       <TaskList
//                         title={droppableId.charAt(0).toUpperCase() + droppableId.slice(1)}
//                         tasks={tasks.filter((task) => task.status === droppableId)}
//                         droppableId={droppableId}
//                         onDeleteTask={handleDeleteTask}
//                       />
//                       {provided.placeholder}
//                     </div>
//                   )}
//                 </Droppable>
//               ))}
//             </>
//           )}
//           <Outlet />
//         </div>
//       </div>
//     </DragDropContext>
//   );
// };

// export default Dashboard;





//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const response = await axiosPublic.get('/tasks');
//         setTasks(response.data);
//       } catch (error) {
//         console.error('Error fetching tasks:', error);
//       }
//     };

//     fetchTasks();
//   }, [axiosPublic, showAddForm]);


// Dashboard.jsx
import { useState, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FaEnvelope, FaHome,  FaTasks,  FaUser } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import useAxiosPublic from '../hooks/useAxiosPublic';
import TaskList from '../components/Task/TaskList';
import AddTask from '../pages/Dashboard/AddTask';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import EditTask from '../components/Task/EditTask';

const Dashboard = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [tasks, setTasks] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  

  useEffect(() => {
    console.log('Dashboard component mounted or updated');

    const fetchTasks = async () => {
      console.log('Fetching tasks...');
      try {
        const response = await axiosPublic.get('/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();

    return () => {
      console.log('Dashboard component will unmount');
      // Cleanup or reset state when component unmounts
      setTasks([]);
    };
  }, [axiosPublic]);

  const updateTaskList = async () => {
    try {
      const response = await axiosPublic.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error updating task list:', error);
    }
  };

  const handleTaskAdded = () => {
    setShowAddForm(false);
    updateTaskList();
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) {
      return;
    }

    const sourceStatus = result.source.droppableId;
    const destinationStatus = result.destination.droppableId;

    if (sourceStatus === destinationStatus) {
      // Reorder within the same list
      const reorderedTasks = Array.from(tasks);
      const [removed] = reorderedTasks.splice(result.source.index, 1);
      reorderedTasks.splice(result.destination.index, 0, removed);

      setTasks(reorderedTasks);
    } else {
      // Move between lists
      const updatedTasks = [...tasks];
      const movedTask = updatedTasks.find((task) => task._id === result.draggableId);

      // Update the task status in the state
      movedTask.status = destinationStatus;
      setTasks(updatedTasks);

      // Update the task status in the backend
      try {
        await axiosPublic.put(`/tasks/${result.draggableId}`, { status: destinationStatus });
      } catch (error) {
        console.error('Error updating task status:', error);
      }
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      // Delete the task in the backend
      await axiosPublic.delete(`/tasks/${taskId}`);
      // Update the local state to remove the deleted task
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleShowTaskList = async () => {
    try {
      const response = await axiosPublic.get('/tasks');
      setTasks(response.data);
      setShowAddForm(false); // Close the Add Task form if open
      setShowEditForm(false); // Close the Edit Task form if open
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setShowEditForm(true);
  };

  const handleSaveEdit = (updatedTask) => {
    setShowEditForm(false);
    // Update the local state to reflect the edited task
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task._id === updatedTask._id ? updatedTask : task))
    );
  };
 
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex">
        <div className="w-64 min-h-screen bg-[#38a9a1]">
          <div className="flex flex-col items-center justify-center p-4">
            <img src={user?.photoURL} alt="Profile" className="w-20 h-20 rounded-full mr-2" />
            <span className="text-white">{user?.displayName}</span>
          </div>
          <ul className="menu p-4">
            <li>
              <button onClick={() => setShowAddForm(true)}>
                <FaUser></FaUser> Add Task
              </button>
            </li>

            <li>
            <button onClick={handleShowTaskList}>
                <FaTasks></FaTasks> Show Task List
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

        <div className="w-4/6 flex flex-row p-10">
          {showAddForm ? (
            <AddTask onTaskAdded={handleTaskAdded} />
          ) : showEditForm ? (
            <EditTask task={selectedTask} onSave={handleSaveEdit} onCancel={() => setShowEditForm(false)} />
          ) : (
            <>
              {['to-do', 'ongoing', 'completed'].map((droppableId, index) => (
                <Droppable key={index} droppableId={droppableId}>
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="mr-4">
                      <TaskList
                        title={droppableId.charAt(0).toUpperCase() + droppableId.slice(1)}
                        tasks={tasks.filter((task) => task.status === droppableId)}
                        droppableId={droppableId}
                        onDeleteTask={handleDeleteTask}
                        onEditTask={handleEditTask} // Pass the edit function to TaskList
                      />
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ))}
            </>
          )}
          <Outlet />
        </div>
      </div>
    </DragDropContext>
  );
};

export default Dashboard;

