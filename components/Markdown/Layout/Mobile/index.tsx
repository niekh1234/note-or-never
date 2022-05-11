import Sidebar from 'components/Markdown/Sidebar';
import { useAppSelector, useAppDispatch } from 'hooks/redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { setSelected } from 'store/slices/notes';
import MobileMarkdownContent from './Content';
import MobileMarkdownHeader from './Header';

const MobileMarkdownLayout = () => {
  const router = useRouter();
  const { value: notes, status, selected } = useAppSelector((state) => state.notes);
  const dispatch = useAppDispatch();

  // set selected note to query id (if existing) otherwise set to first element
  useEffect(() => {
    if (status === 'success' && notes?.items && notes?.items?.length > 0) {
      if (!router.query.n) {
        return;
      }

      const activeNote = notes.items.find((note) => note.id === (router.query.n as string));

      if (activeNote) {
        dispatch(setSelected(activeNote));
      }
    }
  }, [router, router.query.n, notes?.items, status]);

  if (router.query.n) {
    return (
      <div className='flex flex-col h-screen'>
        <MobileMarkdownHeader></MobileMarkdownHeader>
        <MobileMarkdownContent></MobileMarkdownContent>
      </div>
    );
  }

  return (
    <div>
      <Sidebar></Sidebar>
    </div>
  );
};

export default MobileMarkdownLayout;
