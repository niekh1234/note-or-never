import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { useUser } from 'hooks/useUser';
import Link from 'next/link';
import { LogoutIcon } from '@heroicons/react/outline';
import { classNames } from 'utils/classnames';

const HeaderMenu = () => {
  const user = useUser();

  return (
    <div className=''>
      <Menu as='div' className='relative inline-block text-left'>
        <div>
          <Menu.Button className='inline-flex justify-center w-full px-4 py-3 text-sm font-medium text-gray-200 bg-gray-700 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>
            {user?.username}
            <ChevronDownIcon className='w-5 h-5 ml-2 -mr-1 text-gray-200' aria-hidden='true' />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items className='absolute right-0 z-20 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg focus:outline-none ring-1 ring-black ring-opacity-5'>
            <div className='p-1'>
              <Menu.Item>
                {({ active }) => (
                  <div>
                    <Link href='/api/auth/logout'>
                      <a
                        className={classNames(
                          'flex items-center rounded-md px-3 py-2 space-x-4',
                          active ? 'bg-red-500 text-white' : 'text-red-500',
                        )}
                      >
                        <LogoutIcon className='w-5 h-5 '></LogoutIcon>
                        <span className='text-sm font-bold text-center '>Logout</span>
                      </a>
                    </Link>
                  </div>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default HeaderMenu;
