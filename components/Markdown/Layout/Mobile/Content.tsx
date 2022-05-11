import MarkdownEditor from 'components/Markdown/Editor';
import MarkdownHeader from 'components/Markdown/Header';
import MarkdownPreview from 'components/Markdown/Preview';
import { useAppSelector, useAppDispatch } from 'hooks/redux';
import { useState } from 'react';
import Split from 'split.js';
import { updateSelected } from 'store/slices/notes';

const MobileMarkdownContent = () => {
  const { selected } = useAppSelector((state) => state.notes);
  const dispatch = useAppDispatch();
  const [editorScrollY, setEditorScrollY] = useState(0);

  const onTitleChange = (title: string) => {
    dispatch(updateSelected({ title }));
  };

  const onContentChange = (content: string) => {
    dispatch(updateSelected({ content }));
  };

  if (!selected) {
    return null;
  }

  if (selected.view === 'P') {
    return (
      <div className='flex h-[calc(100vh-4rem)]'>
        <MarkdownPreview value={selected} scrollY={editorScrollY}></MarkdownPreview>
      </div>
    );
  }

  return (
    <div className='h-[calc(100vh-4rem)] overflow-auto'>
      <div className='p-4'>
        <input
          value={selected.title}
          onChange={(e) => onTitleChange(e.target.value)}
          className='text-lg font-semibold text-gray-200 bg-gray-800'
        ></input>
      </div>

      <MarkdownEditor
        value={selected}
        onChange={(content) => onContentChange(content)}
        onScroll={(scrollY) => setEditorScrollY(scrollY)}
        isMobile
      ></MarkdownEditor>
    </div>
  );
};

export default MobileMarkdownContent;
