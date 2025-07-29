import React, { useState } from 'react';

const statuses = ['Working', 'Break', 'Meeting', 'Offline'];

export default function AddMemberForm({ onAdd }) {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('Working');
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setShowConfirm(true);
  };

  const confirmAdd = () => {
    onAdd({ name: name.trim(), status });
    setName('');
    setStatus('Working');
    setShowConfirm(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 flex flex-col gap-4 min-w-[250px]">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Add Member</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          className="p-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
          type="text"
          placeholder="Member Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <select
          className="p-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
          value={status}
          onChange={e => setStatus(e.target.value)}
        >
          {statuses.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <button
          type="submit"
          className="mt-2 px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >
          Add Member
        </button>
      </form>
      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col gap-4">
            <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Confirm Add Member?
            </span>
            <div className="flex gap-4 justify-end">
              <button
                className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700"
                onClick={confirmAdd}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}