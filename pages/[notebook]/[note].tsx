import Head from 'next/head';
import MarkdownNote from 'components/Markdown';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useUser } from 'hooks/useUser';
import { getNotes } from 'store/extra-reducers/notes';
import { useEffect } from 'react';

const NotePage = () => {
  useUser({ redirectTo: '/login' });
  const selectedNote = useAppSelector((state) => state.notes.selected);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getNotes());
  }, []);

  return (
    <>
      <Head>
        <title>{selectedNote?.title || 'Note or never'}</title>
      </Head>
      <MarkdownNote></MarkdownNote>
    </>
  );
};

export default NotePage;
