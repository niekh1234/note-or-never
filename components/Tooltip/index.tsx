import { ReactNode, useMemo, useState } from 'react';
import { classNames } from 'utils/classnames';

interface TooltipProps {
  position: 'top' | 'bottom' | 'left' | 'right';
  msg: string;
  children: ReactNode;
}

const getPositionClassnames = (position: string) => {
  switch (position) {
    case 'top':
      return 'bottom-[100%] my-2 right-[50%] translate-x-[50%]';
    case 'bottom':
      return 'top-[100%] my-2 right-[50%] translate-x-[50%]';
    case 'left':
      return 'right-[100%] mx-2 bottom-[50%] translate-y-[50%]';
    case 'right':
      return 'left-[100%] mx-2 bottom-[50%] translate-y-[50%]';
    default:
      return 'top-[100%]';
  }
};

const Tooltip = ({ position, msg, children }: TooltipProps) => {
  const [show, setShow] = useState(false);
  const pClassname = useMemo(() => getPositionClassnames(position), [position]);

  return (
    <div
      onMouseEnter={() => setShow(() => true)}
      onMouseLeave={() => setShow(() => false)}
      className='relative'
    >
      {children}
      {show && (
        <div
          className={classNames(
            'absolute z-20 flex items-center border border-gray-800',
            pClassname,
          )}
        >
          <div className='w-auto px-6 py-2 text-gray-200 text-sm text-gray-[100%] bg-gray-900 rounded shadow-lg whitespace-nowrap'>
            {msg}
          </div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
