import React from 'react';

export default function TaskList({ tasks, onProgressChange, onComplete }) {
  if (!tasks || tasks.length === 0) {
    return <div className="text-gray-400 text-sm">No tasks assigned.</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {tasks.map((task, idx) => (
        <div key={idx} className="bg-gray-50 dark:bg-gray-900 rounded p-4 shadow flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-800 dark:text-gray-100">{task.title}</span>
            <span className="text-xs text-gray-500">{task.dueDate}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded h-2">
              <div
                className="bg-blue-500 h-2 rounded"
                style={{ width: `${task.progress || 0}%` }}
              />
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-300">{task.progress || 0}%</span>
          </div>
          <div className="flex gap-2">
            <button
              className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs font-semibold hover:bg-blue-200"
              onClick={() => onProgressChange(idx, Math.max((task.progress || 0) - 10, 0))}
              disabled={task.progress === 0}
            >
              -10%
            </button>
            <button
              className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs font-semibold hover:bg-blue-200"
              onClick={() => onProgressChange(idx, Math.min((task.progress || 0) + 10, 100))}
              disabled={task.progress === 100}
            >
              +10%
            </button>
            {task.progress === 100 && (
              <button
                className="ml-auto px-2 py-1 rounded bg-green-500 text-white text-xs font-semibold"
                onClick={() => onComplete(idx)}
              >
                Complete
              </button>
            )}
          </div>
        </div>
        ))}
    </div>
  );
}