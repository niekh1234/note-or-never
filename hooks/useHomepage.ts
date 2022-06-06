import axios from 'axios';
import { Notes, Notebook } from 'interfaces/types';
import { useEffect, useReducer } from 'react';

interface HomepageState {
  notes?: Notes;
  notebooks?: Notebook;
  isLoading: boolean;
  error?: string;
}

enum HomepageActionKind {
  START_LOADING = 'START_LOADING',
  STOP_LOADING = 'STOP_LOADING',
  SET_NOTES = 'SET_NOTES',
  SET_NOTEBOOKS = 'SET_NOTEBOOKS',
  SET_ERROR = 'SET_ERROR',
}

interface HomepageAction {
  type: HomepageActionKind;
  payload?: any;
}

const initialState: HomepageState = {
  notes: undefined,
  notebooks: undefined,
  isLoading: true,
};

const getHomepage = async (): Promise<{ notes: Notes; notebooks: Notebook }> => {
  const [{ data: notes }, { data: notebooks }] = await Promise.all([
    axios.get('/api/notes'),
    axios.get('/api/notebooks'),
  ]);

  return { notes, notebooks };
};

const homepageReducer = (state: HomepageState, action: HomepageAction) => {
  const { type, payload } = action;

  switch (type) {
    case HomepageActionKind.START_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case HomepageActionKind.STOP_LOADING:
      return {
        ...state,
        isLoading: false,
      };

    case HomepageActionKind.SET_NOTES:
      return {
        ...state,
        notes: payload,
      };

    case HomepageActionKind.SET_NOTEBOOKS:
      return {
        ...state,
        notebooks: payload,
      };

    case HomepageActionKind.SET_ERROR:
      return {
        ...state,
        error: payload,
      };

    default:
      return state;
  }
};

const useHomepage = () => {
  const [{ notes, notebooks, isLoading, error }, dispatch] = useReducer(
    homepageReducer,
    initialState,
  );

  const fetchData = async () => {
    dispatch({ type: HomepageActionKind.SET_ERROR, payload: undefined });

    dispatch({ type: HomepageActionKind.START_LOADING });

    try {
      const { notes: notesData, notebooks: notebooksData } = await getHomepage();

      if (notesData) {
        dispatch({ type: HomepageActionKind.SET_NOTES, payload: notesData });
      }

      if (notebooksData) {
        dispatch({ type: HomepageActionKind.SET_NOTEBOOKS, payload: notebooksData });
      }
    } catch (err) {
      dispatch({ type: HomepageActionKind.SET_ERROR, payload: err });
    }

    dispatch({ type: HomepageActionKind.STOP_LOADING });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    notes,
    notebooks,
    isLoading,
    error,
  };
};

export default useHomepage;
