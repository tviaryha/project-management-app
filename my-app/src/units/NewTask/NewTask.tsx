import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TransitionsModal from '../../components/TransitionsModal';
import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';
import { closeModal, getUsers } from '../../redux/newBoardSlice';
import { getBoard } from '../../redux/newTaskSlice';
import Form from './Form';

const NewTaskModal = () => {
  const { isOpen, isLoading, columnId } = useAppSelector((state) => state.newTask);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(getBoard(id));
    }
  }, [id, dispatch]);

  const handleClose = () => {
    dispatch(closeModal());
  };

  return isOpen ? (
    <TransitionsModal isOpen={isOpen} handleClose={handleClose} isLoading={isLoading}>
      <Form columnId={columnId} boardId={id || ''} />
    </TransitionsModal>
  ) : null;
};

export default NewTaskModal;
