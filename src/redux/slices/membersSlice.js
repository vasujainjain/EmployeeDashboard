import { createSlice } from '@reduxjs/toolkit';

const initialMembers = [
  {
    id: 1,
    name: 'Vasu Jain',
    status: 'Working',
    tasks: [],
  },
  {
    id: 2,
    name: 'Vincent Smith',
    status: 'Break',
    tasks: [],
  },
  {
    id: 3,
    name: 'Scarlett Johnson',
    status: 'Meeting',
    tasks: [],
  },
  {
    id: 4,
    name: 'Michael Brown',
    status: 'Offline',
    tasks: [],
  },
  {
    id: 5,
    name: 'Osaki Yumi',
    status: 'Meeting',
    tasks: [],
  },
];

const membersSlice = createSlice({
  name: 'members',
  initialState: {
    members: initialMembers,
  },
  reducers: {
    setMembers: (state, action) => {
      state.members = action.payload;
    },
    updateStatus: (state, action) => {
      const { memberId, status } = action.payload;
      const member = state.members.find((m) => m.id === memberId);
      if (member) member.status = status;
    },
    addTask: (state, action) => {
      const { memberId, title, dueDate } = action.payload;
      const member = state.members.find((m) => m.id === Number(memberId));
      if (member) {
        member.tasks.push({ title, dueDate, progress: 0 });
      }
    },
    updateTaskProgress: (state, action) => {
      const { memberId, taskIdx, progress } = action.payload;
      const member = state.members.find((m) => m.id === memberId);
      if (member && member.tasks[taskIdx]) {
        member.tasks[taskIdx].progress = progress;
      }
    },
    completeTask: (state, action) => {
      const { memberId, taskIdx } = action.payload;
      const member = state.members.find((m) => m.id === memberId);
      if (member && member.tasks[taskIdx]) {
        member.tasks[taskIdx].progress = 100;
      }
    },
    addMember: (state, action) => {
      const { name, status } = action.payload;
      const newId = Math.max(...state.members.map(m => m.id)) + 1;
      state.members.push({ id: newId, name, status, tasks: [] });
    },
    deleteMember: (state, action) => {
  const memberToDelete = state.members.find(m => m.id === action.payload);
  if (memberToDelete && memberToDelete.name !== 'Vasu Jain') {
    state.members = state.members.filter(m => m.id !== action.payload);
  }
},
  },
});

export const { setMembers, updateStatus, addTask, updateTaskProgress, completeTask, addMember, deleteMember } = membersSlice.actions;
export default membersSlice.reducer;