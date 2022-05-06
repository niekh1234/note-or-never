import { useAppSelector } from 'hooks/redux';
import { Note, Notes } from 'interfaces/types';
import { useEffect, useState } from 'react';
import SidebarActions from './Actions';
import SidebarList from './List';
import SidebarSearch from './Search';

const Sidebar = () => {
  const {
    value: { items, total },
  } = useAppSelector((state) => state.notes);
  const [query, setQuery] = useState('');
  const [notes, setNotes] = useState<Note[]>([]);

  // really simple searching (only title at the moment)
  const onSearch = (q: string) => {
    setQuery(() => q);
    const found = items.filter((i) => i.title.toLowerCase().includes(q.toLowerCase()));

    setNotes(() => found);
  };

  useEffect(() => {
    setNotes([...items]);
    setQuery('');
  }, [items]);

  return (
    <aside className='relative bg-gray-900 w-80'>
      <div className='h-48'>
        <div className='flex items-center h-24 p-4 border-b-2 border-gray-600'>
          <h1 className='text-3xl font-bold text-gray-200'>
            It&apos;s <span className='text-fuchsia-600'>note</span> or never
          </h1>
        </div>

        <div className='flex flex-col justify-between h-full px-4 pt-4 pb-2 max-h-24'>
          <SidebarSearch query={query} setQuery={onSearch}></SidebarSearch>
          <SidebarActions></SidebarActions>
        </div>
      </div>

      <div className='sticky top-0 overflow-auto h-[calc(100vh-12rem)] pl-4 pr-2 pb-6'>
        <SidebarList notes={notes}></SidebarList>

        <div className='w-full py-4 text-center text-gray-400'>
          <div>{total} notes</div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
