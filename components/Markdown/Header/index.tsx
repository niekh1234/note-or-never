import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { ChangeEvent } from 'react';
import { updateNote } from 'store/extra-reducers/notes';
import { updateSelected } from 'store/slices/notes';
import HeaderMenu from './Menu';
import HeaderViewSelect from './ViewSelect';

const EditorHeader = () => {
  const { selected } = useAppSelector((state) => state.notes);
  const dispatch = useAppDispatch();

  if (selected === null || !selected) {
    return null;
  }

  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateSelected({ title: e.target.value }));
  };

  const onViewChange = (view: string) => {
    dispatch(updateSelected({ view }));
    dispatch(updateNote({ ...selected, view }));
  };

  const onSave = () => {
    dispatch(updateNote(selected));
  };

  return (
    <div className='p-4 bg-gray-900 h-[6rem] flex items-center justify-between border-b-2 border-gray-600'>
      <div className='flex'>
        <input
          value={selected.title}
          onChange={onTitleChange}
          className='p-2 px-4 text-lg font-bold text-gray-200 bg-gray-800 rounded focus:outline-none'
        ></input>

        <button onClick={() => onSave()} className='ml-4 btn-primary'>
          Save
        </button>

        <HeaderViewSelect view={selected.view || 'S'} onChange={onViewChange}></HeaderViewSelect>
      </div>

      <HeaderMenu></HeaderMenu>
    </div>
  );
};

export default EditorHeader;
