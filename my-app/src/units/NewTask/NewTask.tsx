import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import TransitionsModalWithCloseBtn from '../../components/TransitionsModalWithCloseBtn';
import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';
import { getUsers } from '../../redux/newBoardSlice';
import { getBoard } from '../../redux/newTaskSlice';
import Form from './Form';
import { TranslationKeys as ToastTranslations } from '../Toast/enum';
import { openToast, RespRes } from '../../redux/toastSlice';

type Props = {
  isOpen: boolean;
  columnId: string;
  boardId: string;
  setShouldRerenderTasksToTrue: () => void;
  setIsModalOpen: (isOpen: boolean) => void;
};

const NewTaskModal = ({
  isOpen,
  columnId,
  boardId,
  setShouldRerenderTasksToTrue,
  setIsModalOpen
}: Props) => {
  const { isLoading } = useAppSelector((state) => state.newTask);
  const dispatch = useAppDispatch();

  const { t } = useTranslation([ToastTranslations.ns]);
  const { fail } = ToastTranslations;

  const load = async () => {
    if (isOpen) {
      try {
        await dispatch(getUsers()).unwrap();
        await dispatch(getBoard(boardId)).unwrap();
      } catch {
        setIsModalOpen(false);
        dispatch(
          openToast({ message: t(fail, { ns: ToastTranslations.ns }), type: RespRes.error })
        );
      }
    }
  };

  useEffect(() => {
    load();
  }, [isOpen]);

  const handleClose = () => setIsModalOpen(false);

  return (
    <TransitionsModalWithCloseBtn isOpen={isOpen} handleClose={handleClose} isLoading={isLoading}>
      <Form
        columnId={columnId}
        boardId={boardId}
        setShouldRerenderTasksToTrue={setShouldRerenderTasksToTrue}
      />
    </TransitionsModalWithCloseBtn>
  );
};

export default NewTaskModal;
