import { Button, Typography, Grid, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { LocalStorageKeys, Paths } from '../../../enums';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from '../../../hooks/useAppSelector';
import { closeProfileModal, deleteUser } from '../../../redux/profileSlice';
import { signOut } from '../../../redux/signInSlice';
import { TranslationKeys } from './enum';
import { TranslationKeys as ToastTranslations } from '../../Toast/enum';
import { openToast, RespRes } from '../../../redux/toastSlice';
import TransitionsModal from '../../../components/TransitionsModal';

const ProfileModal = () => {
  const { modalIsOpen, isLoading } = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();
  const { t } = useTranslation([TranslationKeys.ns, ToastTranslations.ns]);
  const navigate = useNavigate();

  const { modalTitle, modalDescription, modalBtnYes, modalBtnNo } = TranslationKeys;
  const { successDeleteProfile, fail } = ToastTranslations;

  const deleteProfile = async () => {
    const userId = localStorage.getItem(LocalStorageKeys.userId);

    if (userId) {
      try {
        await dispatch(deleteUser(userId)).unwrap();
        dispatch(signOut());
        navigate(Paths.base);
        dispatch(
          openToast({
            message: t(successDeleteProfile, { ns: ToastTranslations.ns }),
            type: RespRes.success
          })
        );
      } catch (eCode) {
        dispatch(
          openToast({ message: t(fail, { ns: ToastTranslations.ns }), type: RespRes.error })
        );
      } finally {
        dispatch(closeProfileModal());
      }
    }
  };

  const handleClose = () => {
    dispatch(closeProfileModal());
  };

  const content = isLoading ? (
    <CircularProgress color="inherit" />
  ) : (
    <>
      <Grid item textAlign="center">
        <Typography component="h4" variant="h5">
          {t(modalTitle)}
        </Typography>
      </Grid>
      <Grid item textAlign="center">
        <Typography component="p" variant="body1">
          {t(modalDescription)}
        </Typography>
      </Grid>
      <Grid container gap={2} justifyContent="center">
        <Grid item component={Button} variant="outlined" onClick={deleteProfile}>
          {t(modalBtnYes)}
        </Grid>
        <Grid item component={Button} variant="contained" onClick={handleClose}>
          {t(modalBtnNo)}
        </Grid>
      </Grid>
    </>
  );

  return (
    <TransitionsModal isOpen={modalIsOpen} handleClose={handleClose} isLoading={isLoading}>
      {content}
    </TransitionsModal>
  );
};

export default ProfileModal;
