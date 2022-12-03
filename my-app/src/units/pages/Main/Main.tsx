import { Grid, Typography } from '@mui/material';
import { useEffect, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import BoardPreview from '../../BoardPreview/BoardPreview';
import { LocalStorageKeys, Paths } from '../../../enums';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from '../../../hooks/useAppSelector';
import useCloseMenu from '../../../hooks/useCloseMenu';
import { showLoader, hideLoader } from '../../../redux/appSlice';
import { loadUserBoards } from '../../../redux/boardsListSlice';
import {
  setIsOpenModal,
  deleteCurrentBoard,
  setBoardId,
  setBoardTitle
} from '../../../redux/boardPreviewSlice';
import ConfirmationModal from '../../../components/ConfirmationModal/ConfirmationModal';
import { openToast, RespRes } from '../../../redux/toastSlice';
import { TranslationKeys } from '../../../units/Toast/enum';
import { getAllUsers } from '../../../redux/allUsersSlice';

export enum BoardsListTranslations {
  ns = 'boardsList',
  noBoards = 'noBoards',
  descriptionInConfirmationModal = 'descriptionInConfirmationModal'
}

const Main = () => {
  useCloseMenu();
  const { noBoards, descriptionInConfirmationModal } = BoardsListTranslations;
  const { successDeleteBoard, fail } = TranslationKeys;
  const { t } = useTranslation([BoardsListTranslations.ns, TranslationKeys.ns]);

  const { isLoading, boards } = useAppSelector((state) => state.boardsList);

  const { boardId, isOpenModal, isLoad, boardTitle } = useAppSelector(
    (state) => state.boardPreview
  );
  const { users } = useAppSelector((state) => state.usersList);

  const dispatch = useAppDispatch();

  const getUserBoards = async () => {
    const userId = localStorage.getItem(LocalStorageKeys.userId);
    dispatch(showLoader());
    if (userId) {
      try {
        await dispatch(getAllUsers());
        await dispatch(loadUserBoards(userId)).unwrap();
      } catch (error) {
        const errorMesage = t(fail, { ns: TranslationKeys.ns });
        dispatch(openToast({ message: errorMesage, type: RespRes.error }));
      } finally {
        dispatch(hideLoader());
      }
    }
  };

  useEffect(() => {
    getUserBoards();
  }, []);

  const deleteBoard = async () => {
    if (boardId && boardId.length > 0) {
      dispatch(setIsOpenModal(false));
      dispatch(showLoader());
      try {
        await dispatch(deleteCurrentBoard(boardId));
        dispatch(
          openToast({
            message: t(successDeleteBoard, { ns: TranslationKeys.ns }),
            type: RespRes.success
          })
        );
      } catch (error) {
        const eMessage = t(fail, { ns: TranslationKeys.ns });
        dispatch(openToast({ message: eMessage, type: RespRes.error }));
      } finally {
        getUserBoards();
      }
    }
  };

  const handleDeleteBoardClick = (
    boardId: string,
    boardTitle: string,
    event: MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    dispatch(setIsOpenModal(true));
    dispatch(setBoardId(boardId));
    dispatch(setBoardTitle(boardTitle));
  };

  return (
    <Grid container component="section" justifyContent="space-evenly" gap="20px" mt={10}>
      {!isLoading &&
        (boards.length > 0 ? (
          boards.map((board) => (
            <BoardPreview
              title={board.title}
              boardId={board._id}
              key={board._id}
              linkTo={`/${Paths.board}/${board._id}`}
              users={users.filter(({ _id }) => board.users.includes(_id)).map(({ name }) => name)}
              onDeleteButtonClick={handleDeleteBoardClick}
            />
          ))
        ) : (
          <Typography variant="h5" component="h4" mt={50}>
            {t(noBoards)}
          </Typography>
        ))}
      <ConfirmationModal
        description={`${t(descriptionInConfirmationModal)}  ${boardTitle}`}
        isOpen={isOpenModal}
        handleClose={() => dispatch(setIsOpenModal(false))}
        isLoading={isLoad}
        yesBtnClickHandler={() => deleteBoard()}
      />
    </Grid>
  );
};

export default Main;
