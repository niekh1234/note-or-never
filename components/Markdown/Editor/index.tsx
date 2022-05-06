import CodeMirror, { ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { KeyboardEvent } from 'react';
import { markdown } from '@codemirror/lang-markdown';
import { oneDark } from './theme';
import { Note } from 'interfaces/types';
import { useEffect, useRef, useState } from 'react';
import { calculateScrollPercentage } from 'utils/scroll-percentage';
import useDebounce from 'hooks/useDebounce';
import { useAppDispatch } from 'hooks/redux';
import { updateNote } from 'store/extra-reducers/notes';
import hotKeys from 'hotkeys-js';

interface MarkdownEditorProps {
  value: Note;
  onChange: (content: string) => void;
  onScroll: (value: number) => void;
}

const MarkdownEditor = ({ value, onChange, onScroll }: MarkdownEditorProps) => {
  const scrollContainerRef = useRef<ReactCodeMirrorRef>(null);
  const [hasStartedEditing, setHasStartedEditing] = useState(false);
  const debouncedContent = useDebounce(value.content, 1000);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (hasStartedEditing) {
      dispatch(updateNote(value));
    }
  }, [debouncedContent]);

  useEffect(() => {
    setHasStartedEditing(() => false);
  }, [value.id]);

  const handleScroll = (e: UIEvent) => {
    const scrollPercentage = calculateScrollPercentage(e);

    onScroll(scrollPercentage);
  };

  return (
    <section className='flex flex-col flex-1 pt-4'>
      <div className='flex flex-1 overflow-auto'>
        <CodeMirror
          value={value.content}
          height='100%'
          minHeight='100%'
          className='flex-1 overflow-auto'
          style={{ fontSize: '1rem' }}
          extensions={[markdown()]}
          theme={oneDark}
          onChange={(val, update) => {
            onChange(val);
          }}
          onKeyDown={(e) => {
            if (e.ctrlKey) {
              e.preventDefault();
            }
            setHasStartedEditing(() => true);
          }}
          ref={scrollContainerRef}
          onScrollCapture={(e) => handleScroll(e as any)}
        />
      </div>
    </section>
  );
};

export default MarkdownEditor;
