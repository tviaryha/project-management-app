import { Modal, Backdrop, Fade, Grid } from '@mui/material';

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

interface IProps {
  children: React.ReactElement[];
  isOpen: boolean;
  handleClose: () => void;
}

const TransitionsModal = ({ children, isOpen, handleClose }: IProps) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpen}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
      sx={{
        '& .MuiBackdrop-root': { cursor: 'pointer' }
      }}>
      <Fade in={isOpen}>
        <Grid container justifyContent="center" alignItems="center" gap={2} sx={style}>
          {children}
        </Grid>
      </Fade>
    </Modal>
  );
};

export default TransitionsModal;
