import { Fragment, ReactNode, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationIcon } from '@heroicons/react/outline';

interface ConfirmButtonProps {
  children: ReactNode;
  onConfirm: () => any;
  dialog?: {
    title: string;
    body: string;
  };
}

const ConfirmButton = ({ children, onConfirm, dialog }: ConfirmButtonProps) => {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  const confirm = () => {
    setOpen(false);
    onConfirm();
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setOpen(() => true);
        }}
      >
        {children}
      </form>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as='div'
          className='fixed inset-0 z-10 overflow-y-auto'
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <div className='flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-200'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Overlay className='fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75' />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <div className='inline-block overflow-hidden text-left align-bottom transition-all transform bg-gray-700 rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
                <div className='px-4 pt-5 pb-4 bg-gray-700 sm:p-6 sm:pb-4'>
                  <div className='sm:flex sm:items-start'>
                    <div className='flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10'>
                      <ExclamationIcon className='w-6 h-6 text-red-600' aria-hidden='true' />
                    </div>
                    <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                      <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-200'>
                        {dialog?.title || 'Delete'}
                      </Dialog.Title>
                      <div className='mt-2'>
                        <p className='text-sm text-gray-200'>
                          {dialog?.body ||
                            'Are you sure you want to delete this, lost data cannot be recovered.'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='px-4 py-3 bg-gray-800 sm:px-6 sm:flex sm:flex-row-reverse'>
                  <button
                    type='button'
                    className='w-full px-4 py-2 text-sm font-bold text-white bg-red-700 rounded hover:bg-red-600 sm:ml-3 sm:w-auto'
                    onClick={() => confirm()}
                  >
                    Delete
                  </button>
                  <button
                    type='button'
                    className='w-full px-4 py-2 mt-4 text-sm font-bold text-gray-200 rounded sm:mt-0 sm:ml-4 sm:w-auto hover:bg-gray-600'
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default ConfirmButton;
