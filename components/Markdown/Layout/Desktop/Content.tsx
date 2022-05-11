import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useState } from 'react';
import Split from 'react-split';
import { updateSelected } from 'store/slices/notes';
import MarkdownEditor from '../../Editor';
import MarkdownPreview from '../../Preview';

const MarkdownContentLayout = () => {
  const { selected } = useAppSelector((state) => state.notes);
  const dispatch = useAppDispatch();
  const [editorScrollY, setEditorScrollY] = useState(0);

  const onContentChange = (content: string) => {
    dispatch(updateSelected({ content }));
  };

  if (!selected) {
    return null;
  }

  if (selected.view === 'E') {
    return (
      <div className='flex h-full'>
        <MarkdownEditor
          value={selected}
          onChange={(content) => onContentChange(content)}
          onScroll={(scrollY) => setEditorScrollY(scrollY)}
        ></MarkdownEditor>
      </div>
    );
  }

  if (selected.view === 'P') {
    return (
      <div className='flex h-full pt-8'>
        <MarkdownPreview value={selected} scrollY={editorScrollY}></MarkdownPreview>
      </div>
    );
  }

  return (
    <Split
      className='flex h-full'
      sizes={[50, 50]}
      direction='horizontal'
      cursor='col-resize'
      gutterAlign='center'
      gutterStyle={() => ({ width: '4px', backgroundColor: '#4B5563' })}
    >
      <MarkdownEditor
        value={selected}
        onChange={(content) => onContentChange(content)}
        onScroll={(scrollY) => setEditorScrollY(scrollY)}
      ></MarkdownEditor>
      <MarkdownPreview value={selected} scrollY={editorScrollY}></MarkdownPreview>
    </Split>
  );
};

export default MarkdownContentLayout;
