import SaveButton from 'components/SaveButton';
import Spinner from 'components/Spinner';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { ChangeEvent } from 'react';
import { updateNote } from 'store/extra-reducers/notes';
import { updateSelected } from 'store/slices/notes';
import HeaderMenu from './Menu';
import HeaderViewSelect from './ViewSelect';

const MarkdownHeader = () => {
  const { selected, selectedStatus } = useAppSelector((state) => state.notes);
  const dispatch = useAppDispatch();

  if (selected === null || !selected) {
    return null;
  }

  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateSelected({ title: e.target.value }));
  };

  const onViewChange = (view: string) => {
    dispatch(updateNote({ ...selected, view }));
  };

  return (
    <div className='p-4 bg-gray-900 h-[6rem] flex items-center justify-between border-b-2 border-gray-600'>
      <div className='flex'>
        <input
          value={selected.title}
          onChange={onTitleChange}
          className='p-2 px-4 text-lg font-bold text-gray-200 bg-gray-800 rounded focus:outline-none'
        ></input>

        <div className='w-4'></div>

        <HeaderViewSelect view={selected.view || 'S'} onChange={onViewChange}></HeaderViewSelect>

        <SaveButton></SaveButton>
      </div>

      <HeaderMenu></HeaderMenu>
    </div>
  );
};

export default MarkdownHeader;
