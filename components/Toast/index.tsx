import { Transition } from '@headlessui/react';
import { XCircleIcon } from '@heroicons/react/outline';
import { CheckCircleIcon, XIcon } from '@heroicons/react/solid';
import { useEffect } from 'react';
import { classNames } from 'utils/classnames';

interface ToastProps {
  show: boolean;
  msg?: string;
  isError?: boolean;
  onClose: () => void;
}

const Toast = ({ show, msg, isError, onClose }: ToastProps) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timeout);
  }, [onClose]);

  return (
    <Transition
      show={show}
      enter='transition-opacity duration-500'
      enterFrom='opacity-0'
      enterTo='opacity-100'
      leave='transition-opacity duration-150'
      leaveFrom='opacity-100'
      leaveTo='opacity-0'
    >
      <div
        onClick={onClose}
        className={classNames(
          'fixed z-50 min-h-[2rem] py-4 px-4 transform -translate-x-1/2 rounded-md md:translate-x-0 bottom-8 left-1/2 w-80 border',
          isError ? 'bg-red-100' : 'bg-green-100',
        )}
      >
        <div className='flex flex-row items-center h-full'>
          <div className='flex-shrink-0'>
            {isError ? (
              <XCircleIcon
                className={classNames('w-5 h-5', isError ? 'text-red-500' : 'text-green-500')}
                aria-hidden='true'
              />
            ) : (
              <CheckCircleIcon
                className={classNames('w-5 h-5', isError ? 'text-red-500' : 'text-green-500')}
                aria-hidden='true'
              />
            )}
          </div>
          <div className='ml-3'>
            <p
              className={classNames(
                'text-sm font-medium ',
                isError ? 'text-red-700' : 'text-green-700',
              )}
            >
              {msg || (isError ? 'Error, try again' : 'Success')}
            </p>
          </div>
          <div className='pl-3 ml-auto'>
            <div className='-mx-1.5 -my-1.5'>
              <button
                onClick={onClose}
                type='button'
                className={classNames(
                  'inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 ',
                  isError
                    ? 'bg-red-100 text-red-700 hover:bg-red-200 focus:ring-offset-red-100 focus:ring-red-700'
                    : 'bg-green-100 text-green-700 hover:bg-green-200 focus:ring-offset-green-100 focus:ring-green-700',
                )}
              >
                <span className='sr-only'>Dismiss</span>
                <XIcon className='w-5 h-5' aria-hidden='true' />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default Toast;
