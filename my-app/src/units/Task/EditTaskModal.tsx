import TransitionsModalWithCloseBtn from '../../components/TransitionsModalWithCloseBtn';
import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';
import { closeEditTaskModal } from '../../redux/taskSlice';
import Form from './Form';
import { TranslationKeys as ToastTranslations } from '../Toast/enum';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getUsers } from '../../redux/newBoardSlice';
import { openToast, RespRes } from '../../redux/toastSlice';

const EditTaskModal = () => {
  const { isLoading, isOpenEditTaskModal } = useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();

  const { t } = useTranslation([ToastTranslations.ns]);
  const { fail } = ToastTranslations;

  const load = async () => {
    if (isOpenEditTaskModal) {
      try {
        await dispatch(getUsers()).unwrap();
      } catch {
        dispatch(closeEditTaskModal());
        dispatch(
          openToast({ message: t(fail, { ns: ToastTranslations.ns }), type: RespRes.error })
        );
      }
    }
  };

  useEffect(() => {
    load();
  }, [isOpenEditTaskModal]);

  const handleClose = () => dispatch(closeEditTaskModal());

  return isOpenEditTaskModal ? (
    <TransitionsModalWithCloseBtn
      isOpen={isOpenEditTaskModal}
      handleClose={handleClose}
      isLoading={isLoading}>
      <Form />
    </TransitionsModalWithCloseBtn>
  ) : null;
};

export default EditTaskModal;
