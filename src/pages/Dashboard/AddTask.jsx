import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAuth from '../../hooks/useAuth';
import PropTypes from 'prop-types';

const AddTask = ({ onTaskAdded }) => {
    const { user } = useAuth();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const axiosPublic = useAxiosPublic();

  const onSubmit = async (data) => {
    try {
        const userEmail = user ? user.email : null;
      const testItem = {
        title: data.title,
        description: data.description,
        date: data.deadline,
        priority: data.priority,
        status: 'to-do',
        email: userEmail,
      };

      const response = await axiosPublic.post('/tasks', testItem);

      if (response.data && response.data.insertedId) {
        reset();
        // Call the updateTaskList function to fetch and update the task list
        onTaskAdded();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `${data.title} is added to the tasks.`,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        console.error('Invalid response structure:', response);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to add task. Please try again.',
        });
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to add task. Please try again.',
      });
    }
  };

  return (
    <div className="w-3/5 mx-auto bg-white p-8 my-10 rounded-md shadow-xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
            Task Title
          </label>
          <input
            type="text"
            id="title"
            {...register('title', { required: 'Task title is required' })}
            className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.title ? 'border-red-500' : ''}`}
          />
          {errors.title && (
            <p className="text-red-500 text-xs italic mt-1">{errors.title.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
            Task Description
          </label>
          <textarea
            id="description"
            {...register('description')}
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="deadline" className="block text-gray-700 text-sm font-bold mb-2">
            Deadline
          </label>
          <input
            type="date"
            id="deadline"
            {...register('deadline')}
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="priority" className="block text-gray-700 text-sm font-bold mb-2">
            Priority
          </label>
          <select
            id="priority"
            {...register('priority')}
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="low">Low</option>
            <option value="moderate">Moderate</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};


AddTask.propTypes = {
    onTaskAdded: PropTypes.func ,
}

export default AddTask;




