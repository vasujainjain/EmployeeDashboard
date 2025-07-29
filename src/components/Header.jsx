import { useSelector, useDispatch } from 'react-redux';
import { switchRole, toggleDarkMode } from '../redux/slices/roleSlice';
import { useEffect } from 'react';

const roleLabels = {
  lead: 'Team Lead',
  member: 'Team Member',
};

export default function Header() {
  const dispatch = useDispatch();
  const { currentRole, currentUser, darkMode } = useSelector((state) => state.role);

  const handleRoleSwitch = () => {
    dispatch(switchRole(currentRole === 'lead' ? 'member' : 'lead'));
  };

  const handleDarkModeToggle = () => {
    dispatch(toggleDarkMode());
  };

  // Sync <html> class with Redux state
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white dark:bg-gray-900 shadow-md">
      <div className="flex items-center gap-3">
        <span className="text-2xl font-bold text-blue-600">Team Pulse Dashboard</span>
        <span className="ml-4 px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs font-semibold">
          {roleLabels[currentRole]}
        </span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-gray-700 dark:text-gray-200 font-medium">{currentUser}</span>
        <button
          onClick={handleRoleSwitch}
          className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Switch to {currentRole === 'lead' ? 'Team Member' : 'Team Lead'}
        </button>
        <button
          onClick={handleDarkModeToggle}
          className={`ml-2 p-2 rounded-full transition ${
            darkMode
              ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          title="Toggle Dark Mode"
        >
          {darkMode ? (
            <span role="img" aria-label="sun">🌞</span>
          ) : (
            <span role="img" aria-label="moon">🌙</span>
          )}
        </button>
      </div>
    </header>
  );
}