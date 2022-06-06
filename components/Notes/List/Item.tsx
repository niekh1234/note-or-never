import { TrashIcon } from '@heroicons/react/outline';
import ConfirmButton from 'components/ConfirmDialog';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { Note } from 'interfaces/types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { deleteNote } from 'store/extra-reducers/notes';
import { classNames } from 'utils/classnames';

interface NotesListItemProps {
  note: Note;
  isActive?: boolean;
}

const day = 24 * 60 * 60;
const week = 7 * day;
const month = 30 * day;

const getTimeElapsed = (updatedAt: string): string => {
  const updatedAtDate = new Date(updatedAt);
  const now = new Date();

  const delta = Math.abs(updatedAtDate.getTime() - now.getTime()) / 1000;

  if (delta < day) {
    // if a night has passed in between but it is still less than 24h return yesterday
    if (updatedAtDate.getDay() !== now.getDay()) {
      return 'yesterday';
    }

    return updatedAtDate.toLocaleTimeString(undefined, {
      hour12: false,
      minute: 'numeric',
      hour: 'numeric',
    });
  }

  if (delta < day * 2) {
    return 'yesterday';
  }

  if (delta < week) {
    return `${Math.floor(delta / day)} day(s)`;
  }

  if (delta < month) {
    return `${Math.floor(delta / week)} week(s)`;
  }

  return '+1 months';
};

const NotesListItem = ({ note, isActive }: NotesListItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useAppDispatch();

  const timeSinceUpdate = useMemo(() => {
    return getTimeElapsed(note.updatedAt);
  }, [note]);

  const textPreview = useMemo(() => {
    return note.content.substring(0, 100);
  }, [note]);

  const onDelete = (id: string) => {
    dispatch(deleteNote(id));
  };

  return (
    <Link href={'/'}>
      <a
        onMouseEnter={() => setIsHovered(() => true)}
        onMouseLeave={() => setIsHovered(() => false)}
        className={classNames(
          'w-full h-24 p-4  rounded cursor-pointer',
          isActive ? 'bg-gray-300' : 'bg-gray-800 hover:bg-gray-700',
        )}
      >
        <div className='relative w-full h-full text-left'>
          <div className='flex justify-between space-x-1 text-sm'>
            <h3
              className={classNames(
                'font-bold truncate',
                isActive ? 'text-gray-700' : 'text-gray-200',
              )}
            >
              {note.title}
            </h3>

            <span>
              {isHovered ? (
                <ConfirmButton
                  onConfirm={() => onDelete(note.id)}
                  dialog={{
                    title: 'Are you sure you want to delete this note?',
                    body: 'This action cannot be undone.',
                  }}
                >
                  <button
                    type='submit'
                    className={classNames(
                      'absolute right-0 p-1 rounded ',
                      isActive ? 'hover:bg-gray-400' : 'hover:bg-gray-500',
                    )}
                  >
                    <TrashIcon
                      className={classNames(
                        'w-4 h-4',
                        isActive ? 'text-gray-800' : 'text-gray-200',
                      )}
                    ></TrashIcon>
                  </button>
                </ConfirmButton>
              ) : (
                <div
                  className={classNames(
                    'whitespace-nowrap',
                    isActive ? 'text-gray-500' : 'text-gray-400',
                  )}
                >
                  {timeSinceUpdate}
                </div>
              )}
            </span>
          </div>

          <p
            className={classNames(
              'h-10 mt-1 overflow-hidden text-sm truncate whitespace-normal',
              isActive ? 'text-gray-600' : 'text-gray-500',
            )}
          >
            {textPreview}
          </p>
        </div>
      </a>
    </Link>
  );
};

export default NotesListItem;
