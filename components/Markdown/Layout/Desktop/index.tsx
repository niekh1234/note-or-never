import { useAppSelector } from 'hooks/redux';
import EditorHeader from '../../Header';
import Sidebar from '../../Sidebar';
import MarkdownContentLayout from './Content';

const DesktopMarkdownLayout = () => {
  const { selected } = useAppSelector((state) => state.notes);

  return (
    <div className='flex'>
      <Sidebar></Sidebar>

      {selected && (
        <main className='h-[calc(100vh-6rem)] bg-gray-800 w-[calc(100vw-20rem)]'>
          <EditorHeader></EditorHeader>

          <MarkdownContentLayout></MarkdownContentLayout>
        </main>
      )}
    </div>
  );
};

export default DesktopMarkdownLayout;
