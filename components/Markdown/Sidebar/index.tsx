import { useAppSelector } from 'hooks/redux';
import { Note, Notes } from 'interfaces/types';
import { startTransition, useEffect, useState } from 'react';
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

    startTransition(() => {
      const found = items.filter((i) => i.title.toLowerCase().includes(q.toLowerCase()));

      setNotes(() => found);
    });
  };

  useEffect(() => {
    setNotes([...items]);
    setQuery('');
  }, [items]);

  return (
    <aside className='relative w-full bg-gray-900 md:w-80'>
      <div className='h-40 md:h-48'>
        <div className='flex items-center h-16 p-4 border-b-2 border-gray-600 md:h-24'>
          <h1 className='text-2xl font-bold text-gray-200 sm:text-3xl'>
            It&apos;s <span className='text-fuchsia-600'>note</span> or never
          </h1>
        </div>

        <div className='flex flex-col justify-between h-full px-2 pt-4 pb-2 md:px-4 max-h-24'>
          <SidebarSearch query={query} setQuery={onSearch}></SidebarSearch>
          <SidebarActions></SidebarActions>
        </div>
      </div>

      <div className='sticky top-0 overflow-auto h-[calc(100vh-10rem)] md:h-[calc(100vh-12rem)] px-2 md:pl-4 md:pr-2 pb-6'>
        <SidebarList notes={notes}></SidebarList>

        <div className='w-full py-4 text-center text-gray-400'>
          <div>{total} notes</div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
