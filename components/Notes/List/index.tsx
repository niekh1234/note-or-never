import { useAppSelector } from 'hooks/redux';
import { Notes } from 'interfaces/types';
import NotesListItem from './Item';

interface NotesListProps {
  notes: Notes;
}

const NotesList = ({ notes }: NotesListProps) => {
  return (
    <ul className='flex flex-col space-y-2'>
      {notes.items.map((note) => (
        <NotesListItem note={note} key={note.id}></NotesListItem>
      ))}
    </ul>
  );
};

export default NotesList;
