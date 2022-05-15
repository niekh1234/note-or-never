import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Note } from 'interfaces/types';
import { NotesState } from 'store/slices/notes';

export const getNotes = createAsyncThunk('notes/getNotes', async () => {
  const { data } = await axios.get('/api/notes');

  return data;
});

export const addNote = createAsyncThunk('notes/addNote', async () => {
  const { data } = await axios.post('/api/notes/add');

  return data;
});

export const deleteNote = createAsyncThunk('notes/deleteNote', async (id: string) => {
  const { data } = await axios.delete(`/api/notes/${id}`);

  return id;
});

export const updateNote = createAsyncThunk('notes/updateNote', async (note: Note) => {
  const { data } = await axios.put(`/api/notes/${note.id}`, { note });

  return data;
});

export const getExtraReducers = (builder: ActionReducerMapBuilder<NotesState>) => {
  ///////////////////
  // RETRIEVING NOTES
  ///////////////////
  builder.addCase(getNotes.pending, (state, action) => {
    state.status = 'loading';
  });

  builder.addCase(getNotes.fulfilled, (state, { payload }) => {
    state.value = payload;
    state.status = 'success';
  });

  builder.addCase(getNotes.rejected, (state, action) => {
    state.status = 'failed';
  });

  ////////////////
  // ADDING A NOTE
  ////////////////
  builder.addCase(addNote.pending, (state, action) => {
    // updating ui before having completed network request, if it fails we can just remove.
    const newNote: Note = {
      id: action.meta.requestId,
      title: 'Untitled',
      content: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    state.value.items = [newNote, ...state.value.items];
  });

  builder.addCase(addNote.fulfilled, (state, action) => {
    // replace the client side placeholder with the server side generated note utilizing redux requestId to look up the correct note
    state.value.items = state.value.items.map((note) => {
      if (note.id === action.meta.requestId) {
        return action.payload;
      }
      return note;
    });
  });

  builder.addCase(addNote.rejected, (state, action) => {
    // if the request failed we have to remove the client side generated note to keep everything in sync.
    state.value.items = state.value.items.filter((note) => note.id !== action.meta.requestId);
  });

  ////////////////
  // DELETING A NOTE
  ////////////////
  builder.addCase(deleteNote.pending, (state, action) => {
    state.value.items = state.value.items.filter((note) => note.id !== action.meta.arg);
  });

  builder.addCase(deleteNote.fulfilled, (state, action) => {
    state.value.items = state.value.items.filter((note) => note.id !== action.payload);
  });

  //////////////////
  // UPDATING A NOTE
  //////////////////
  builder.addCase(updateNote.pending, (state, action) => {
    // updating the ui with the `updated` note
    const items = state.value.items.map((note) => {
      if (note.id === action.meta.arg.id) {
        return {
          ...action.meta.arg,
          updatedAt: new Date().toISOString(),
        };
      }

      return note;
    });

    state.value.items = items.sort((a, b) => {
      const timeA = new Date(a.updatedAt).getTime();
      const timeB = new Date(b.updatedAt).getTime();

      return timeB - timeA;
    });

    state.selectedStatus = 'saving';
  });

  builder.addCase(updateNote.fulfilled, (state, action) => {
    state.selectedStatus = null;
  });
};
