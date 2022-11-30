import TransitionsModalWithCloseBtn from '../../../../components/TransitionsModalWithCloseBtn';
import useAppDispatch from '../../../../hooks/useAppDispatch';
import useAppSelector from '../../../../hooks/useAppSelector';
import { closeModal } from '../../../../redux/columnsSlice';
import Form from './Form';

const CreateColumnModal = () => {
  const { isLoading, isOpen, columns } = useAppSelector((state) => state.columns);
  const dispatch = useAppDispatch();

  const handleClose = () => dispatch(closeModal());

  return isOpen ? (
    <TransitionsModalWithCloseBtn isOpen={isOpen} handleClose={handleClose} isLoading={isLoading}>
      <Form order={columns.length} />
    </TransitionsModalWithCloseBtn>
  ) : null;
};

export default CreateColumnModal;
