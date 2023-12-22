// TaskList.jsx


const TaskList = ({ tasks }) => {
  return (
    <div>
      <h2>To-Do List</h2>
      {tasks.length === 0 ? (
        <p>No tasks in the to-do list.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            
            <div key={task._id} className="card">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Deadline: {task.date}</p>
      <p>Priority: {task.priority}</p>
    </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
