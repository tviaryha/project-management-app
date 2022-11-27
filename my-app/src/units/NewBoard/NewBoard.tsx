import TransitionsModalWithCloseBtn from '../../components/TransitionsModalWithCloseBtn';
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
    <TransitionsModalWithCloseBtn isOpen={isOpen} handleClose={handleClose} isLoading={isLoading}>
      <Form />
    </TransitionsModalWithCloseBtn>
  ) : null;
};

export default NewBoardModal;
