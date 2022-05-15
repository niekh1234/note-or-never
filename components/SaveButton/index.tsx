import Spinner from 'components/Spinner';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { updateNote } from 'store/extra-reducers/notes';

const SaveButton = () => {
  const { selected, selectedStatus } = useAppSelector((state) => state.notes);
  const dispatch = useAppDispatch();

  const onSave = () => {
    if (selected) {
      dispatch(updateNote(selected));
    }
  };

  return (
    <div className='flex space-x-2'>
      <button onClick={() => onSave()} className='w-28 btn-primary !text-sm md:!text-base'>
        {selectedStatus === 'saving' ? <Spinner radius={20}></Spinner> : 'Save'}
      </button>
    </div>
  );
};

export default SaveButton;
