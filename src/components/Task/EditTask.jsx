import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const EditTask = ({ task, onSave, onCancel }) => {
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      title: task.title,
      description: task.description,
      deadline: task.deadline,
      priority: task.priority,
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await axiosPublic.put(`/tasks/${task._id}`, data);
      if (response.data && response.data.updatedTask) {
        onSave(response.data.updatedTask);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `${data.title} is updated.`,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        console.error('Invalid response structure:', response);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to update task. Please try again.',
        });
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update task. Please try again.',
      });
    }
  };

  useEffect(() => {
    // Set form values when task changes
    setValue('title', task.title);
    setValue('description', task.description);
    setValue('deadline', task.deadline);
    setValue('priority', task.priority);
  }, [task, setValue]);

  return (
    <div className="w-3/5 mx-auto bg-white p-8 my-10 rounded-md shadow-xl">
      <h2 className="text-2xl font-semibold mb-4">Edit Task</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-600 text-sm font-medium mb-2">Title:</label>
          <input {...register('title', { required: 'Title is required' })} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
          {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-600 text-sm font-medium mb-2">Description:</label>
          <textarea {...register('description')} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="deadline" className="block text-gray-600 text-sm font-medium mb-2">Deadline:</label>
          <input type="date" {...register('deadline')} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="priority" className="block text-gray-600 text-sm font-medium mb-2">Priority:</label>
          <select {...register('priority')} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="flex justify-end">
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Save</button>
          <button type="button" onClick={onCancel} className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditTask;
