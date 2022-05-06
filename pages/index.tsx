import { useUser } from 'hooks/useUser';
import { NextPage } from 'next';
import MarkdownNote from '../components/Markdown';

const Home: NextPage = () => {
  useUser({ redirectTo: '/login' });

  return <MarkdownNote></MarkdownNote>;
};

export default Home;
