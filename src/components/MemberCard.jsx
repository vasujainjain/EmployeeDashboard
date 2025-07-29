import React from 'react';
import StatusSelector from './StatusSelector';
import TaskList from './TaskList';
import { useDispatch } from 'react-redux';
import { updateStatus, updateTaskProgress, completeTask } from '../redux/slices/membersSlice';

const statusColors = {
  Working: 'bg-green-100 text-green-700',
  Break: 'bg-yellow-100 text-yellow-700',
  Meeting: 'bg-blue-100 text-blue-700',
  Offline: 'bg-gray-200 text-gray-500',
};

export default function MemberCard({ member, isSelf, isDeletable, onDelete }) {
  const dispatch = useDispatch();

  if (!member) return null;

  // Handlers for status and task progress
  const handleStatusChange = (status) => {
    dispatch(updateStatus({ memberId: member.id, status }));
  };

  const handleProgressChange = (taskIdx, progress) => {
    dispatch(updateTaskProgress({ memberId: member.id, taskIdx, progress }));
  };

  const handleComplete = (taskIdx) => {
    dispatch(completeTask({ memberId: member.id, taskIdx }));
  };

  return (
    <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow p-5 flex flex-col gap-4">
      {isDeletable && (
        <button
          className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xl"
          onClick={onDelete}
          title="Delete Member"
        >
          &times;
        </button>
      )}
      <div className="flex items-center justify-between">
        <span className="font-semibold text-lg text-gray-800 dark:text-gray-100">
          {member.name} {isSelf && <span className="text-xs text-blue-400">(You)</span>}
        </span>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[member.status] || 'bg-gray-100 text-gray-500'}`}>
          {member.status}
        </span>
      </div>
      {isSelf && (
        <StatusSelector currentStatus={member.status} onChange={handleStatusChange} />
      )}
      <TaskList
      tasks={member.tasks}
        onProgressChange={handleProgressChange}
        onComplete={handleComplete}
      />
    </div>
  );
}