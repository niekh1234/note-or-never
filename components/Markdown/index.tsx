import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useRouter } from 'next/router';
import { getNotes, updateNote } from 'store/extra-reducers/notes';
import { setSelected, updateSelected } from 'store/slices/notes';
import MarkdownLayout from './Layout/Desktop';
import MarkdownLoadingSkeleton from './Skeleton';
import useHotkeys from 'hooks/useHotkeys';

const MarkdownNote = () => {
  const router = useRouter();
  const { value: notes, status, selected } = useAppSelector((state) => state.notes);
  const dispatch = useAppDispatch();
  const keysPressed = useHotkeys();

  useEffect(() => {
    dispatch(getNotes());
  }, []);

  // set selected note to query id (if existing) otherwise set to first element
  useEffect(() => {
    if (status === 'success' && notes?.items && notes?.items?.length > 0) {
      if (!router.query.n) {
        setSelectedNoteToFirstInList();
      } else {
        const activeNote = notes.items.find((note) => note.id === (router.query.n as string));

        if (activeNote) {
          dispatch(setSelected(activeNote));
        } else {
          setSelectedNoteToFirstInList();
        }
      }
    }
  }, [router, router.query.n, notes?.items, status]);

  useEffect(() => {
    if (keysPressed && keysPressed['Control']) {
      if (selected) {
        if (keysPressed['s']) {
          dispatch(updateNote(selected));
        }

        if (keysPressed['1']) {
          dispatch(updateNote({ ...selected, view: 'E' }));
        }

        if (keysPressed['2']) {
          dispatch(updateNote({ ...selected, view: 'S' }));
        }

        if (keysPressed['3']) {
          dispatch(updateNote({ ...selected, view: 'P' }));
        }
      }
    }
  }, [keysPressed]);

  const setSelectedNoteToFirstInList = () => {
    router.replace('?n=' + notes.items[0].id, undefined, { shallow: true });
    dispatch(setSelected(notes.items[0]));
  };

  if (status === 'loading' && !notes?.items) {
    return <MarkdownLoadingSkeleton></MarkdownLoadingSkeleton>;
  }

  return (
    <div className='hidden bg-gray-800 md:flex'>
      <MarkdownLayout></MarkdownLayout>
    </div>
  );
};

export default MarkdownNote;
