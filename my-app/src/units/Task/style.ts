import { blue } from '@mui/material/colors';

export const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid grey',
  borderRadius: 2,
  boxShadow: 24,
  textAlign: 'center',
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 2
};

export const listItemStyle = {
  width: '200px',
  maxWidth: 330,
  minHeight: 80,
  paddingRight: 10,
  my: 1,
  borderRadius: 2,
  bgcolor: blue[50],
  cursor: 'pointer',
  wordWrap: 'break-word'
};
