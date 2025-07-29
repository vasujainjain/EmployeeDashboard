import React from 'react';

const statuses = [
  { label: 'Working', color: 'bg-green-100 text-green-700' },
  { label: 'Break', color: 'bg-yellow-100 text-yellow-700' },
  { label: 'Meeting', color: 'bg-blue-100 text-blue-700' },
  { label: 'Offline', color: 'bg-gray-200 text-gray-500' },
];

export default function StatusSelector({ currentStatus, onChange }) {
  return (
    <div className="flex gap-3">
      {statuses.map((status) => (
        <button
          key={status.label}
          type="button"
          className={`px-4 py-2 rounded-full font-medium border transition
            ${currentStatus === status.label
              ? `${status.color} border-blue-500 shadow`
              : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500 hover:border-blue-400'
            }`}
          onClick={() => onChange(status.label)}
        >
          {status.label}
        </button>
      ))}
    </div>
  );
}