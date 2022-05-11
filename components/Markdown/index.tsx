import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useRouter } from 'next/router';
import { getNotes, updateNote } from 'store/extra-reducers/notes';
import MarkdownLayout from './Layout';
import MarkdownLoadingSkeleton from './Skeleton';
import useHotkeys from 'hooks/useHotkeys';

const MarkdownNote = () => {
  const { value: notes, status, selected } = useAppSelector((state) => state.notes);
  const dispatch = useAppDispatch();
  const keysPressed = useHotkeys();

  useEffect(() => {
    dispatch(getNotes());
  }, []);

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

  if (status === 'loading' && !notes?.items) {
    return <MarkdownLoadingSkeleton></MarkdownLoadingSkeleton>;
  }

  return (
    <div className='bg-gray-800'>
      <MarkdownLayout></MarkdownLayout>
    </div>
  );
};

export default MarkdownNote;
