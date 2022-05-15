import { ArrowLeftIcon, TrashIcon } from '@heroicons/react/outline';
import { DotsVerticalIcon } from '@heroicons/react/solid';
import ConfirmButton from 'components/ConfirmDialog';
import SaveButton from 'components/SaveButton';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { deleteNote, updateNote } from 'store/extra-reducers/notes';
import { updateSelected } from 'store/slices/notes';

const MobileMarkdownHeader = () => {
  const router = useRouter();
  const selectedNote = useAppSelector((state) => state.notes.selected);
  const dispatch = useAppDispatch();

  const onDelete = (id: string) => {
    dispatch(deleteNote(id));
    router.push('/');
  };

  const changeView = () => {
    if (!selectedNote) {
      return;
    }

    if (selectedNote.view === 'S') {
      dispatch(updateNote({ ...selectedNote, view: 'P' }));
      return;
    }

    const isEditing = selectedNote.view === 'E';

    dispatch(updateNote({ ...selectedNote, view: isEditing ? 'P' : 'E' }));
  };

  if (!selectedNote) {
    return null;
  }

  return (
    <header className='flex justify-between w-screen h-16 p-2 bg-gray-900 border-b-2 border-gray-600'>
      <Link href='/'>
        <a className='flex p-1 my-auto rounded-lg'>
          <ArrowLeftIcon className='w-6 h-6 my-auto text-gray-300'></ArrowLeftIcon>
        </a>
      </Link>

      <div className='flex items-center space-x-2'>
        <SaveButton></SaveButton>

        <ConfirmButton
          onConfirm={() => onDelete(selectedNote.id)}
          dialog={{
            title: 'Are you sure you want to delete this note?',
            body: 'This action cannot be undone.',
          }}
        >
          <button type='submit' className='p-1 rounded '>
            <TrashIcon className='w-5 h-5 text-gray-200'></TrashIcon>
          </button>
        </ConfirmButton>

        <button onClick={() => changeView()} className='btn-secondary !text-sm'>
          {selectedNote.view === 'P' ? 'Edit' : 'Preview'}
        </button>
      </div>
    </header>
  );
};

export default MobileMarkdownHeader;
