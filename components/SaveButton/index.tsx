import { Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import Spinner from 'components/Spinner';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { Fragment, useEffect, useState } from 'react';
import { updateNote } from 'store/extra-reducers/notes';

const SaveButton = () => {
  const { selected, selectedStatus } = useAppSelector((state) => state.notes);
  const dispatch = useAppDispatch();
  const [showSavedMsg, setShowSavedMsg] = useState(false);

  useEffect(() => {
    console.log(selectedStatus);
    if (selectedStatus == 'saved' && !showSavedMsg) {
      setShowSavedMsg(() => true);

      const savedMsgTimout = setTimeout(() => {
        setShowSavedMsg(() => false);
      }, 3000);

      return () => {
        clearTimeout(savedMsgTimout);
      };
    }
  }, [selectedStatus]);

  const onSave = () => {
    if (selected) {
      dispatch(updateNote(selected));
    }
  };

  return (
    <div className='flex space-x-2'>
      <button onClick={() => onSave()} className='w-28 btn-primary'>
        {selectedStatus === 'saving' ? <Spinner radius={20}></Spinner> : 'Save'}
      </button>
      <Transition
        show={showSavedMsg}
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <div className='flex items-center h-full '>
          <div className='text-sm font-semibold text-gray-200'>Saved!</div>
          <button onClick={() => setShowSavedMsg(() => false)} className='p-1'>
            <XIcon className='w-5 h-5 text-gray-300'></XIcon>
          </button>
        </div>
      </Transition>
    </div>
  );
};

export default SaveButton;
