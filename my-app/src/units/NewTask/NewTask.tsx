import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import TransitionsModalWithCloseBtn from '../../components/TransitionsModalWithCloseBtn';
import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';
import { getUsers } from '../../redux/newBoardSlice';
import { closeModal, getBoard } from '../../redux/newTaskSlice';
import Form from './Form';
import { TranslationKeys as ToastTranslations } from '../Toast/enum';
import { openToast, RespRes } from '../../redux/toastSlice';

const NewTaskModal = () => {
  const { isOpen, boardId, isLoading } = useAppSelector((state) => state.newTask);
  const dispatch = useAppDispatch();

  const { t } = useTranslation([ToastTranslations.ns]);
  const { fail } = ToastTranslations;

  const load = async () => {
    if (isOpen) {
      try {
        await dispatch(getUsers()).unwrap();
        await dispatch(getBoard(boardId)).unwrap();
      } catch {
        dispatch(closeModal());
        dispatch(
          openToast({ message: t(fail, { ns: ToastTranslations.ns }), type: RespRes.error })
        );
      }
    }
  };

  useEffect(() => {
    load();
  }, [isOpen]);

  const handleClose = () => dispatch(closeModal());
  return isOpen ? (
    <TransitionsModalWithCloseBtn isOpen={isOpen} handleClose={handleClose} isLoading={isLoading}>
      <Form />
    </TransitionsModalWithCloseBtn>
  ) : null;
};

export default NewTaskModal;
