import CodeMirror, { ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { markdown } from '@codemirror/lang-markdown';
import { oneDark } from './theme';
import { Note } from 'interfaces/types';
import { useEffect, useRef, useState } from 'react';
import { calculateScrollPercentage } from 'utils/scroll-percentage';
import useDebounce from 'hooks/useDebounce';
import { useAppDispatch } from 'hooks/redux';
import { updateNote } from 'store/extra-reducers/notes';

interface MarkdownEditorProps {
  value: Note;
  onChange: (content: string) => void;
  onScroll: (value: number) => void;
  isMobile?: boolean;
}

const KEY_BLACKLIST: { [key: string]: boolean } = {
  s: true,
};

const MarkdownEditor = ({ value, onChange, onScroll, isMobile = false }: MarkdownEditorProps) => {
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
    <section className='flex flex-1 w-full md:flex-none md:h-full md:pt-4'>
      <CodeMirror
        value={value.content}
        height='100%'
        minHeight='100%'
        className='w-full h-full md:overflow-auto'
        style={{ fontSize: isMobile ? '0.9rem' : '1rem' }}
        extensions={[markdown()]}
        theme={oneDark}
        onChange={(val, update) => {
          onChange(val);
        }}
        onKeyDown={(e) => {
          if (e.ctrlKey && KEY_BLACKLIST[e.key]) {
            e.preventDefault();
          }
          setHasStartedEditing(() => true);
        }}
        ref={scrollContainerRef}
        onScrollCapture={(e) => handleScroll(e as any)}
      />
    </section>
  );
};

export default MarkdownEditor;
