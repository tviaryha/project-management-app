import { Grid, Typography, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { TranslationKeys as ToastTranslations } from '../../units/Toast/enum';
import { IConfirmationModalProps } from '../ModalInterfaces';
import TransitionsModal from '../TransitionsModal';
import { TranslationKeys } from './enum';

const ConfirmationModal = ({
  description,
  isOpen,
  handleClose,
  isLoading,
  yesBtnClickHandler
}: IConfirmationModalProps) => {
  const { t } = useTranslation([TranslationKeys.ns, ToastTranslations.ns]);

  const { title, yesBtn, noBtn } = TranslationKeys;

  return (
    <TransitionsModal isOpen={isOpen} handleClose={handleClose} isLoading={isLoading}>
      <Grid item textAlign="center">
        <Typography component="h4" variant="h5">
          {t(title)}
        </Typography>
      </Grid>
      <Grid item textAlign="center">
        <Typography component="p" variant="body1" sx={{ wordWrap: 'break-word' }}>
          {description}
        </Typography>
      </Grid>
      <Grid container gap={2} justifyContent="center">
        <Grid item component={Button} variant="outlined" onClick={yesBtnClickHandler}>
          {t(yesBtn)}
        </Grid>
        <Grid item component={Button} variant="contained" onClick={handleClose}>
          {t(noBtn)}
        </Grid>
      </Grid>
    </TransitionsModal>
  );
};

export default ConfirmationModal;
