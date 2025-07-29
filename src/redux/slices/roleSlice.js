import { createSlice } from '@reduxjs/toolkit';

const getInitialDarkMode = () => {
  const stored = localStorage.getItem('darkMode');
  return stored ? JSON.parse(stored) : false;
};

const roleSlice = createSlice({
  name: 'role',
  initialState: {
    currentRole: 'member', // or 'lead'
    currentUser: 'Nishant Dwivedi',
    darkMode: getInitialDarkMode(), // <-- initialize from localStorage
  },
  reducers: {
    switchRole: (state, action) => {
      state.currentRole = action.payload;
    },
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
    toggleDarkMode: (state) => { 
      state.darkMode = !state.darkMode;
      localStorage.setItem('darkMode', JSON.stringify(state.darkMode)); // <-- persist to localStorage
    },
  },
});

export const { switchRole, setUser, toggleDarkMode } = roleSlice.actions;
export default roleSlice.reducer;