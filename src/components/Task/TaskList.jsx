
import { Droppable, Draggable } from 'react-beautiful-dnd';
import useAxiosPublic from '../../hooks/useAxiosPublic';

import PropTypes from 'prop-types';

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
          <div className="bg-emerald-600 rounded-xl p-4 mb-4 text-center">
            <h2 className="text-white">{title} List</h2>
          </div>
          <div className="flex flex-col ">
            {tasks.map((task, index) => (
              <Draggable key={task._id} draggableId={task._id} index={index}>
                {(provided) => (
                  <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className="mb-4"
                  >
                    <div className="card bg-base-100 shadow-2xl rounded-md p-4">
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

TaskList.propTypes = {
    tasks: PropTypes.object ,
    title: PropTypes.string,
    droppableId: PropTypes.number ,
    onDeleteTask: PropTypes.func ,
    onEditTask: PropTypes.func ,
}


export default TaskList;





  
  
  
  