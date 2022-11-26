import React, { useCallback, useRef } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import { IBoard } from './types';
import { Link } from 'react-router-dom';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import { boardStyle } from './style';
import { setIsOpenModal, toggleLoader, deleteCurrentBoard } from '../../redux/boardPreviewSlice';
import useAppSelector from '../../hooks/useAppSelector';
import useAppDispatch from '../../hooks/useAppDispatch';
import { TranslationKeys as ToastTranslations } from '../../units/Toast/enum';
import { useTranslation } from 'react-i18next';
import { openToast, RespRes } from '../../redux/toastSlice';

const BoardPreview = ({ title, boardId, linkTo }: IBoard): JSX.Element => {
  const { isOpenModal, isLoading } = useAppSelector((state) => state.boardPreview);
  const { successDeleteBoard, fail } = ToastTranslations;
  const { t } = useTranslation([ToastTranslations.ns]);
  const dispatch = useAppDispatch();

  const openModal = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(setIsOpenModal(true));
    console.log(boardId);
  }, []);

  const deleteBoard = async (boardId: string) => {
    try {
      dispatch(toggleLoader());
      console.log(boardId);
      await dispatch(deleteCurrentBoard(boardId));
      dispatch(
        openToast({
          message: t(successDeleteBoard, { ns: ToastTranslations.ns }),
          type: RespRes.success
        })
      );
    } catch (error) {
      const eMessage = t(fail, { ns: ToastTranslations.ns });
      dispatch(openToast({ message: eMessage, type: RespRes.error }));
    } finally {
      dispatch(setIsOpenModal(false));
      dispatch(toggleLoader());
    }
    console.log(boardId);
    dispatch(setIsOpenModal(false));
  };

  return (
    <>
      <ListItem
        button
        component={Link}
        to={linkTo}
        className="listItemTask"
        sx={boardStyle}
        secondaryAction={[
          <IconButton
            key="delete"
            aria-label="delete"
            edge="end"
            onClick={(event) => openModal(event)}>
            <DeleteIcon />
          </IconButton>
        ]}>
        <ListItemText primary={title} secondary={boardId} />
      </ListItem>
      {/* <ConfirmationModal
        description={boardId}
        isOpen={isOpenModal}
        handleClose={() => dispatch(setIsOpenModal(false))}
        isLoading={isLoading}
        yesBtnClickHandler={() => deleteBoard.bind(boardId)}
      /> */}
    </>
  );
};

export default BoardPreview;
