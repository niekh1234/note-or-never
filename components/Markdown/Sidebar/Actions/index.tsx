import { FilterIcon, SortDescendingIcon } from '@heroicons/react/outline';
import AddNoteButton from './AddNoteButton';
import SidebarActionsSort from './Sort';

const SidebarFilter = () => {
  return (
    <div className='flex justify-between'>
      <AddNoteButton></AddNoteButton>
      <SidebarActionsSort></SidebarActionsSort>
    </div>
  );
};

export default SidebarFilter;
