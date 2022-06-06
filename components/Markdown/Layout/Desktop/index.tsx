import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { setSelected } from 'store/slices/notes';
import EditorHeader from '../../Header';
import Sidebar from '../../Sidebar';
import MarkdownContentLayout from './Content';

const DesktopMarkdownLayout = () => {
  const router = useRouter();
  const { value: notes, status, selected } = useAppSelector((state) => state.notes);
  const dispatch = useAppDispatch();

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

  const setSelectedNoteToFirstInList = () => {
    router.replace('?n=' + notes.items[0].id, undefined, { shallow: true });
    dispatch(setSelected(notes.items[0]));
  };

  return (
    <div className='flex'>
      <Sidebar></Sidebar>

      {selected && (
        <main className='h-[calc(100vh-6rem)] bg-gray-800 w-[calc(100vw-30rem)]'>
          <EditorHeader></EditorHeader>

          <MarkdownContentLayout></MarkdownContentLayout>
        </main>
      )}
    </div>
  );
};

export default DesktopMarkdownLayout;
