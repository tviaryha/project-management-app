import { Button, Modal, Backdrop, Fade, Typography, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { LocalStorageKeys, Paths } from '../../../enums';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from '../../../hooks/useAppSelector';
import { closeProfileModal, deleteUser } from '../../../redux/profileSlice';
import { signOut } from '../../../redux/signInSlice';
import { TranslationKeys } from './enum';

const style = {
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4
};

const ProfileModal = () => {
  const modalIsOpen = useAppSelector((state) => state.profile.modalIsOpen);
  const dispatch = useAppDispatch();
  const { t } = useTranslation([TranslationKeys.ns]);
  const navigate = useNavigate();

  const { modalTitle, modalDescription, modalBtnYes, modalBtnNo } = TranslationKeys;

  const deleteProfile = async () => {
    const userId = localStorage.getItem(LocalStorageKeys.userId);

    if (userId) {
      dispatch(closeProfileModal());
      await dispatch(deleteUser(userId));
      dispatch(signOut());
      navigate(Paths.base);
    }
  };

  const handleClose = () => {
    dispatch(closeProfileModal());
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={modalIsOpen}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
      sx={{
        '& .MuiBackdrop-root': { cursor: 'pointer' }
      }}>
      <Fade in={modalIsOpen}>
        <Grid container justifyContent="center" alignItems="center" gap={2} sx={style}>
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
        </Grid>
      </Fade>
    </Modal>
  );
};

export default ProfileModal;
