import TransitionsModal from '../../components/TransitionsModal';
import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';
import { closeModal } from '../../redux/newBoardSlice';
import Form from './Form';

const NewBoardModal = () => {
  const { isOpen, isLoading } = useAppSelector((state) => state.newBoard);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(closeModal());
  };

  return isOpen ? (
    <TransitionsModal isOpen={isOpen} handleClose={handleClose} isLoading={isLoading}>
      <Form />
    </TransitionsModal>
  ) : null;
};

export default NewBoardModal;
