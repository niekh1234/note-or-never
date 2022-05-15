import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { getNotes, updateNote } from 'store/extra-reducers/notes';
import MarkdownLayout from './Layout';
import MarkdownLoadingSkeleton from './Skeleton';
import useHotkeys from 'hooks/useHotkeys';
import Toast from 'components/Toast';

const toastDefault = { show: false, msg: '', isError: false };

const MarkdownNote = () => {
  const [toast, setToast] = useState(toastDefault);
  const { value: notes, status, selected, selectedStatus } = useAppSelector((state) => state.notes);
  const dispatch = useAppDispatch();
  const keysPressed = useHotkeys();

  useEffect(() => {
    dispatch(getNotes());
  }, []);

  useEffect(() => {
    if (selectedStatus === 'saved') {
      setToast(() => ({ msg: 'Saved', show: true, isError: false }));

      const timeout = setTimeout(() => {
        hideToast();
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [selectedStatus]);

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

  const hideToast = () => {
    setToast(() => toastDefault);
  };

  if (status === 'loading' && !notes?.items) {
    return <MarkdownLoadingSkeleton></MarkdownLoadingSkeleton>;
  }

  return (
    <div className='bg-gray-800'>
      <Toast show={toast.show} msg={toast.msg} isError={toast.isError} onClose={hideToast}></Toast>
      <MarkdownLayout></MarkdownLayout>
    </div>
  );
};

export default MarkdownNote;
