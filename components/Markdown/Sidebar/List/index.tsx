import { Note } from 'interfaces/types';
import { useRouter } from 'next/router';
import SidebarListItem from './Item';

interface SidebarListProps {
  notes: readonly Note[];
}

const SidebarList = ({ notes }: SidebarListProps) => {
  const router = useRouter();
  const {
    query: { n: currentNote },
  } = router;

  return (
    <div className='space-y-2'>
      {notes?.map((note: Note) => (
        <SidebarListItem
          key={note.id}
          note={note}
          isActive={note.id === currentNote}
        ></SidebarListItem>
      ))}
    </div>
  );
};

export default SidebarList;
