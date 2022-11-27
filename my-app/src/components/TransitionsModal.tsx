import { Modal, Backdrop, Fade, Grid, CircularProgress } from '@mui/material';
import useCloseMenu from '../hooks/useCloseMenu';
import { ITransitionsModalProps } from './ModalInterfaces';

const TransitionsModal = ({ children, isOpen, handleClose, isLoading }: ITransitionsModalProps) => {
  useCloseMenu();

  const style = {
    position: 'relative',
    top: '50%',
    left: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
    transform: 'translate(-50%, -50%)',
    width: { xs: 270, sm: 400 },
    borderRadius: 3,
    bgcolor: isLoading ? 'transparent' : 'background.paper',
    elevating: isLoading ? 0 : 24,
    color: isLoading ? 'background.paper' : 'inherit',
    p: 4
  };

  const content = isLoading ? <CircularProgress color="inherit" /> : children;

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
      sx={{
        '& .MuiBackdrop-root': { cursor: 'pointer' }
      }}>
      <Fade in={isOpen}>
        <Grid container flexDirection="column" sx={style}>
          {content}
        </Grid>
      </Fade>
    </Modal>
  );
};

export default TransitionsModal;
