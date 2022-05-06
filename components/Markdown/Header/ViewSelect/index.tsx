import { RadioGroup } from '@headlessui/react';
import { DocumentTextIcon, ViewBoardsIcon, ViewListIcon } from '@heroicons/react/outline';
import Tooltip from 'components/Tooltip';
import { classNames } from 'utils/classnames';

interface HeaderViewSelectProps {
  view: string;
  onChange: (view: string) => void;
}

const HeaderViewSelect = ({ view, onChange }: HeaderViewSelectProps) => {
  return (
    <RadioGroup value={view} onChange={onChange}>
      <RadioGroup.Label className='sr-only'>View</RadioGroup.Label>
      <div className='flex items-center h-full px-6 space-x-1'>
        <RadioGroup.Option value='E'>
          {({ checked }) => (
            <Tooltip position='bottom' msg='Editor only'>
              <button
                className={classNames('p-2 rounded hover:bg-gray-700', checked && 'bg-gray-700')}
              >
                <ViewListIcon className='w-5 h-5 text-gray-400'></ViewListIcon>
              </button>
            </Tooltip>
          )}
        </RadioGroup.Option>

        <RadioGroup.Option value='S'>
          {({ checked }) => (
            <Tooltip position='bottom' msg='Editor and preview'>
              <button
                className={classNames('p-2 rounded hover:bg-gray-700', checked && 'bg-gray-700')}
              >
                <ViewBoardsIcon className='w-5 h-5 text-gray-400'></ViewBoardsIcon>
              </button>
            </Tooltip>
          )}
        </RadioGroup.Option>

        <RadioGroup.Option value='P'>
          {({ checked }) => (
            <Tooltip position='bottom' msg='Preview only'>
              <button
                className={classNames('p-2 rounded hover:bg-gray-700', checked && 'bg-gray-700')}
              >
                <DocumentTextIcon className='w-5 h-5 text-gray-400'></DocumentTextIcon>
              </button>
            </Tooltip>
          )}
        </RadioGroup.Option>
      </div>
    </RadioGroup>
  );
};

export default HeaderViewSelect;
