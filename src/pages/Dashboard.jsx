import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import MemberCard from '../components/MemberCard';
import TaskForm from '../components/TaskForm';
import { addTask, addMember, deleteMember } from '../redux/slices/membersSlice';
import StatusPieChart from '../components/StatusPieChart';
import AddMemberForm from '../components/AddMemberForm';

const statusOptions = ['All', 'Working', 'Break', 'Meeting', 'Offline'];

export default function Dashboard() {
  const dispatch = useDispatch();
  const { currentRole, currentUser } = useSelector((state) => state.role);
  const members = useSelector((state) => state.members.members);

  // Filtering and sorting state
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortByTasks, setSortByTasks] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Calculate status summary for Team Lead
  const statusSummary = members.reduce((acc, member) => {
    acc[member.status] = (acc[member.status] || 0) + 1;
    return acc;
  }, {});

  const handleTaskAssigned = ({ memberId, title, dueDate }) => {
    dispatch(addTask({ memberId, title, dueDate }));
  };

  const handleAddMember = ({ name, status }) => {
    dispatch(addMember({ name, status }));
  };

  // Filtering
  let filteredMembers = members;
  if (statusFilter !== 'All') {
    filteredMembers = filteredMembers.filter((m) => m.status === statusFilter);
  }

  // Sorting
  if (sortByTasks) {
    filteredMembers = [...filteredMembers].sort((a, b) => {
      const activeA = (a.tasks || []).filter((t) => t.progress < 100).length;
      const activeB = (b.tasks || []).filter((t) => t.progress < 100).length;
      return activeB - activeA;
    });
  }
  const chartData = Object.entries(statusSummary).map(([name, value]) => ({ name, value }));

  return (
    <div className="space-y-6">
      {currentRole === 'lead' && (
        <section>
          <h2 className="text-2xl font-bold mb-4 text-blue-400 tracking-tight">Team Status Overview</h2>
          {/* Controls and Chart Card */}
          <div className="flex flex-col md:flex-row gap-6 mb-4 bg-[#232936] border border-[#232936] rounded-xl shadow-lg p-6">
            {/* Filter and Sort Controls */}
            <div className="flex flex-col gap-4 md:w-2/3">
              <div className="flex flex-wrap gap-4 items-center">
                <div>
                  <label className="mr-2 text-gray-200 font-medium">Filter by Status:</label>
                  <select
                    className="p-2 rounded border border-gray-700 bg-[#181c23] text-gray-100"
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mr-2 text-gray-200 font-medium">Sort by Active Tasks:</label>
                  <input
                    type="checkbox"
                    checked={sortByTasks}
                    onChange={e => setSortByTasks(e.target.checked)}
                    className="accent-blue-500"
                  />
                </div>
              </div>
              <div className="flex gap-2 flex-wrap mt-2">
                {Object.entries(statusSummary).map(([status, count]) => (
                  <span
                    key={status}
                    className="px-3 py-1 rounded-full bg-blue-900/60 text-blue-200 text-xs font-semibold"
                  >
                    {count} {status}
                  </span>
                ))}
              </div>
            </div>
            {/* Pie Chart */}
            <div className="md:w-1/3 min-w-[250px]">
              <StatusPieChart data={chartData} />
            </div>
          </div>
          {/* AddMemberForm and TaskForm side by side */}
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="flex-1 max-w-lg">
              <TaskForm onTaskAssigned={handleTaskAssigned} />
            </div>
            <div className="flex-1 max-w-xs">
              <AddMemberForm onAdd={handleAddMember} />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredMembers.map((member) => (
              <MemberCard
                key={member.id}
                member={member}
                onDelete={member.name !== 'John Doe' ? () => setDeleteTarget(member.id) : undefined}
                isDeletable={member.name !== 'John Doe'}
              />
            ))}
            </div>
          {/* Delete confirmation modal */}
          {deleteTarget && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col gap-4">
                <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  Are you sure you want to delete this member?
                </span>
                <div className="flex gap-4 justify-end">
                  <button
                    className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                    onClick={() => setDeleteTarget(null)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 rounded bg-red-600 text-white font-semibold hover:bg-red-700"
                    onClick={() => {
                      dispatch(deleteMember(deleteTarget));
                      setDeleteTarget(null);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      )}
      {currentRole === 'member' && (
        <section>
          <h2 className="text-2xl font-bold mb-4 text-blue-400 tracking-tight">Your Status & Tasks</h2>
          <div className="max-w-md mx-auto">
            <MemberCard member={members.find((m) => m.name === currentUser)} isSelf />
          </div>
        </section>
      )}
    </div>
  );
}