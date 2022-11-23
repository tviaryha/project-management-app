import { CircularProgress } from '@mui/material';
import TransitionsModal from '../../components/TransitionsModal';
import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';
import useCloseMenu from '../../hooks/useCloseMenu';
import { closeModal } from '../../redux/newBoardSlice';
import Form from './Form';

const NewBoardModal = () => {
  useCloseMenu();

  const { isOpen, isLoading } = useAppSelector((state) => state.newBoard);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(closeModal());
  };

  const content = isLoading ? <CircularProgress color="inherit" /> : <Form />;

  return isOpen ? (
    <TransitionsModal isOpen={isOpen} handleClose={handleClose} isLoading={isLoading}>
      {content}
    </TransitionsModal>
  ) : null;
};

export default NewBoardModal;
