import { IconButton } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { blue } from '@mui/material/colors';

type Props = {
  onClick: () => void;
};

const CloseRoundedButton = ({ onClick }: Props) => (
  <IconButton
    size="small"
    onClick={onClick}
    sx={{
      position: 'absolute',
      top: -15,
      right: -15,
      bgcolor: 'white',
      '&:hover': {
        color: 'black',
        bgcolor: blue[500]
      }
    }}>
    <CloseRoundedIcon />
  </IconButton>
);

export default CloseRoundedButton;
