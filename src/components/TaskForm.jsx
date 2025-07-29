import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// You will need to implement addTask in your membersSlice
// import { addTask } from '../redux/slices/membersSlice';

export default function TaskForm({ onTaskAssigned }) {
  const members = useSelector((state) => state.members.members);
  const [memberId, setMemberId] = useState('');
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  // const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!memberId || !title || !dueDate) return;
    // dispatch(addTask({ memberId, title, dueDate }));
    if (onTaskAssigned) onTaskAssigned({ memberId, title, dueDate });
    setMemberId('');
    setTitle('');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 flex flex-col gap-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Assign Task</h3>
      <select
        className="p-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
        value={memberId}
        onChange={e => setMemberId(e.target.value)}
        required
      >
        <option value="">Select Member</option>
        {members.map((m) => (
          <option key={m.id} value={m.id}>{m.name}</option>
        ))}
      </select>
      <input
        className="p-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <input
        className="p-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
        type="date"
        value={dueDate}
        onChange={e => setDueDate(e.target.value)}
        required
      />
      <button
        type="submit"
        className="mt-2 px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
      >
        Assign Task
      </button>
    </form>
  );
}