import { CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import TransitionsModal from '../../../components/TransitionsModal';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from '../../../hooks/useAppSelector';
import useCloseMenu from '../../../hooks/useCloseMenu';
import { closeModal, getUsers } from '../../../redux/newBoardSlice';
import Form from './Form';

const NewBoardModal = () => {
  useCloseMenu();

  const { isOpen, isLoading } = useAppSelector((state) => state.newBoard);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(closeModal());
  };

  const loadUsers = async () => {
    try {
      await dispatch(getUsers());
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const content = isLoading ? <CircularProgress color="inherit" /> : <Form />;

  return (
    <TransitionsModal isOpen={isOpen} handleClose={handleClose}>
      {content}
    </TransitionsModal>
  );
};

export default NewBoardModal;
