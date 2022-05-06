import { Popover, Transition } from '@headlessui/react';
import { SortDescendingIcon } from '@heroicons/react/outline';
import Tooltip from 'components/Tooltip';

const SidebarActionsSort = () => {
  return (
    <Popover className='z-50'>
      <Tooltip position='top' msg='Sorting'>
        <Popover.Button className='p-1 rounded hover:bg-gray-700'>
          <SortDescendingIcon className='w-5 h-5 text-gray-300'></SortDescendingIcon>
        </Popover.Button>
      </Tooltip>

      <Transition
        enter='transition duration-100 ease-out'
        enterFrom='transform scale-95 opacity-0'
        enterTo='transform scale-100 opacity-100'
        leave='transition duration-75 ease-out'
        leaveFrom='transform scale-100 opacity-100'
        leaveTo='transform scale-95 opacity-0'
      >
        <Popover.Panel className='absolute p-4 bg-gray-700 rounded shadow-lg min-w-48'>
          <h3 className='text-sm font-bold text-gray-200'>Sort by</h3>

          <select className='px-2 py-1 mt-4 text-sm text-gray-100 bg-gray-600 rounded'>
            <option>Date added - ascending</option>
          </select>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default SidebarActionsSort;
