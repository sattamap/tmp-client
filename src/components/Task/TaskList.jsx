// const TaskList = ({ tasks, title }) => {
//     return (
//       <div className="mr-4 w-80"> {/* Set a fixed width for each TaskList */}
        
//         {/* {tasks.length === 0 ? (
//           <p>No tasks in the {title.toLowerCase()} list.</p>
//         ) : (
          
//         )} */}
//             <div className="bg-emerald-600 rounded-xl p-4 mb-4">
//           <h2 className="text-white">{title} List</h2>
//         </div>
//         <div className="flex flex-col border border-solid">
    
//             {tasks.map((task) => (
//               <div key={task._id} className="mb-4">
//                 <div className="card bg-base-100 shadow-xl">
//                   <div className="card-body">
//                     <h2 className="card-title">{task.title}</h2>
//                     <p>{task.description}</p>
//                     <p>Deadline: {task.date}</p>
//                     <p>Priority: {task.priority}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//       </div>
//     );
//   };
  
//   export default TaskList;

import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { Link } from 'react-router-dom';

const TaskList = ({ tasks, title, droppableId, onDeleteTask, onEditTask }) => {
  const axiosPublic = useAxiosPublic();

  const handleDelete = async (taskId) => {
    try {
      await axiosPublic.delete(`/tasks/${taskId}`);
      onDeleteTask(taskId);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <Droppable droppableId={droppableId} key={droppableId}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef} className="mr-4 w-80">
          <div className="bg-emerald-600 rounded-xl p-4 mb-4">
            <h2 className="text-white">{title} List</h2>
          </div>
          <div className="flex flex-col border border-solid">
            {tasks.map((task, index) => (
              <Draggable key={task._id} draggableId={task._id} index={index}>
                {(provided) => (
                  <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className="mb-4"
                  >
                    <div className="card bg-base-100 shadow-xl rounded-md p-4">
                      <div className="card-body">
                        <h2 className="card-title text-xl font-semibold mb-2">{task.title}</h2>
                        <p className="text-gray-600">{task.description}</p>
                        <p className="text-gray-600">
                          <span className="bg-yellow-200 px-2 py-1 rounded-md mr-2">Deadline:</span>
                          {task.date}
                        </p>
                        <p className="text-gray-600">
                          <span className="bg-blue-200 px-2 py-1 rounded-md mr-2">Priority:</span>
                          {task.priority}
                        </p>
                        <div className="flex gap-4 mt-4">
                          <button
                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                            onClick={() => handleDelete(task._id)}
                          >
                            Delete
                          </button>
                          <button
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            onClick={() => onEditTask(task)}
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default TaskList;





  
  
  
  


// TaskList.jsx
// TaskList.jsx
// TaskList.jsx
// import { Droppable, Draggable } from 'react-beautiful-dnd';
// import TaskItem from './TaskItem';

// const TaskList = ({ tasks, status }) => {
//   return (
//     <Droppable droppableId={status} key={status}>
//       {(provided) => (
//         <div {...provided.droppableProps} ref={provided.innerRef}>
//           {tasks.map((task, index) => (
//             <Draggable key={task._id} draggableId={task._id} index={index}>
//               {(provided) => (
//                 <div
//                   {...provided.draggableProps}
//                   {...provided.dragHandleProps}
//                   ref={provided.innerRef}
//                 >
//                   <TaskItem task={task} />
//                 </div>
//               )}
//             </Draggable>
//           ))}
//           {provided.placeholder}
//         </div>
//       )}
//     </Droppable>
//   );
// };

// export default TaskList;


