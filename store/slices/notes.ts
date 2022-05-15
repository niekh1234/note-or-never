import { createSlice } from '@reduxjs/toolkit';
import { Note, Notes } from 'interfaces/types';
import { getExtraReducers } from 'store/extra-reducers/notes';

export interface NotesState {
  value: Notes;
  status: string | null;
  selected: Note | null;
  selectedStatus: string | null;
}

const initialState: NotesState = {
  value: {
    items: [],
    total: 0,
  },
  selected: null,
  status: null,
  selectedStatus: null,
};

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setSelected: (state, action) => {
      state.selected = action.payload;
    },
    updateSelected: (state, action) => {
      if (state.selected) {
        state.selected = {
          ...state.selected,
          ...action.payload,
        };
      }
    },
    setSelectedStatus: (state, action) => {
      state.selectedStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    getExtraReducers(builder);
  },
});

export const { setSelected, updateSelected, setSelectedStatus } = notesSlice.actions;

export default notesSlice.reducer;
