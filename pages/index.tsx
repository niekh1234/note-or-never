import { useAppSelector } from 'hooks/redux';
import { useUser } from 'hooks/useUser';
import { NextPage } from 'next';
import Head from 'next/head';
import MarkdownNote from '../components/Markdown';

const Home: NextPage = () => {
  useUser({ redirectTo: '/login' });
  const selectedNote = useAppSelector((state) => state.notes.selected);

  return (
    <div>
      <Head>
        <title>{selectedNote?.title || 'Note or never'}</title>
      </Head>
      <MarkdownNote></MarkdownNote>
    </div>
  );
};

export default Home;
