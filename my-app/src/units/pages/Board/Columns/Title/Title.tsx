import { Grid, IconButton, Typography } from '@mui/material';
import { useState } from 'react';
import Form from './Form';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { red } from '@mui/material/colors';
import useAppDispatch from '../../../../../hooks/useAppDispatch';
import { useParams } from 'react-router-dom';
import {
  closeConfirmationModal,
  deleteColumn,
  getColumns,
  openConfirmationModal
} from '../../../../../redux/columnsSlice';
import ConfirmationModal from '../../../../../components/ConfirmationModal/ConfirmationModal';
import useAppSelector from '../../../../../hooks/useAppSelector';
import { TranslationKeys as ToastTranslations } from '../../../../Toast/enum';
import { useTranslation } from 'react-i18next';
import { openToast, RespRes } from '../../../../../redux/toastSlice';
import { TranslationKeys } from '../../enums';

type Props = { title: string; columnId: string };

const Title = ({ title, columnId }: Props) => {
  const { id: boardId } = useParams();

  const { isLoading } = useAppSelector((state) => state.columns);
  const dispatch = useAppDispatch();

  const [shouldShowTitle, setShouldShowTitle] = useState<boolean>(true);
  const [columnTitle, setColumnTitle] = useState<string>(title);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { successDeleteColumn, fail } = ToastTranslations;
  const { t } = useTranslation([TranslationKeys.ns, ToastTranslations.ns]);

  const toggleShouldShowTitle = () => {
    setShouldShowTitle(!shouldShowTitle);
  };

  const setNewTitle = (title: string) => setColumnTitle(title);

  const deleteBtnHandler = () => {
    if (!isOpen) {
      setIsOpen(!isOpen);
      dispatch(openConfirmationModal());
    }
  };

  const handleClose = () => {
    if (isOpen) {
      setIsOpen(!isOpen);
      dispatch(closeConfirmationModal());
    }
  };

  const handleConfirmationModalYes = async () => {
    if (boardId) {
      try {
        await dispatch(deleteColumn({ _id: columnId, boardId })).unwrap();
        await dispatch(getColumns(boardId)).unwrap();
        dispatch(
          openToast({
            message: t(successDeleteColumn, { ns: ToastTranslations.ns }),
            type: RespRes.success
          })
        );
      } catch {
        dispatch(
          openToast({ message: t(fail, { ns: ToastTranslations.ns }), type: RespRes.error })
        );
      }
    }
  };

  const displayTitle = shouldShowTitle ? (
    <>
      <Grid container justifyContent="space-between" gap={1} flexWrap="nowrap">
        <Grid
          item
          component={Typography}
          variant="h6"
          lineHeight="normal"
          onClick={toggleShouldShowTitle}
          sx={{ cursor: 'pointer', wordBreak: 'break-word' }}>
          {columnTitle}
        </Grid>
        <Grid
          item
          alignSelf="flex-start"
          component={IconButton}
          onClick={deleteBtnHandler}
          sx={{ p: 0, color: red[500] }}>
          <DeleteOutlineIcon />
        </Grid>
      </Grid>
      <ConfirmationModal
        description={t(TranslationKeys.modalDescription)}
        isOpen={isOpen}
        isLoading={isLoading}
        handleClose={handleClose}
        yesBtnClickHandler={handleConfirmationModalYes}
      />
    </>
  ) : (
    <Form
      title={columnTitle}
      columnId={columnId}
      toggleShouldShowTitle={toggleShouldShowTitle}
      setNewTitle={setNewTitle}
    />
  );

  return displayTitle;
};

export default Title;
