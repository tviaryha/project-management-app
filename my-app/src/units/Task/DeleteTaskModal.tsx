import { useTranslation } from 'react-i18next';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';
import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';
import { getTasks } from '../../redux/columnsSlice';
import { deleteTask, closeDeleteTaskModal, toggleIsLoading } from '../../redux/taskSlice';
import { openToast, RespRes } from '../../redux/toastSlice';
import { TranslationKeys as ToastTranslations } from '../Toast/enum';
import { TranslationKeys } from './enum';

const DeleteTaskModal = () => {
  const { isLoading, isOpenDeleteTaskModal, boardId, columnId, taskId } = useAppSelector(
    (state) => state.task
  );
  const dispatch = useAppDispatch();

  const { t } = useTranslation([TranslationKeys.ns, ToastTranslations.ns]);
  const { deleteDescription } = TranslationKeys;
  const { fail, successDeleteTask } = ToastTranslations;

  const handleClose = () => dispatch(closeDeleteTaskModal());

  const yesBtnClickHandler = async () => {
    try {
      dispatch(toggleIsLoading());
      await dispatch(deleteTask({ boardId, columnId, taskId })).unwrap();
      await dispatch(getTasks({ boardId, columnId })).unwrap();
      dispatch(
        openToast({
          message: t(successDeleteTask, { ns: ToastTranslations.ns }),
          type: RespRes.success
        })
      );
    } catch {
      dispatch(openToast({ message: t(fail, { ns: ToastTranslations.ns }), type: RespRes.error }));
    } finally {
      dispatch(toggleIsLoading());
      handleClose();
    }
  };

  return isOpenDeleteTaskModal ? (
    <ConfirmationModal
      description={t(deleteDescription)}
      yesBtnClickHandler={yesBtnClickHandler}
      isOpen={isOpenDeleteTaskModal}
      handleClose={handleClose}
      isLoading={isLoading}
    />
  ) : null;
};

export default DeleteTaskModal;
