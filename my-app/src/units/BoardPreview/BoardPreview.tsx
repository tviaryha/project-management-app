import DeleteIcon from '@mui/icons-material/Delete';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import { IBoard } from './types';
import { Link } from 'react-router-dom';
import { boardStyle } from './style';
import PeopleIcon from '@mui/icons-material/People';
import { Typography } from '@mui/material';

const BoardPreview = ({
  title,
  boardId,
  linkTo,
  onDeleteButtonClick,
  users
}: IBoard): JSX.Element => {
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
            onClick={(event) => onDeleteButtonClick(boardId, title, event)}>
            <DeleteIcon />
          </IconButton>
        ]}>
        <ListItemText
          primary={title}
          secondary={
            <Typography
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                wordBreak: 'break-word'
              }}>
              <PeopleIcon color="primary" />
              <Typography
                sx={{
                  color: '#000000',
                  opacity: 0.6,
                  fontSize: 14
                }}>
                {users.length > 3 ? `${users.join(', ')} ...` : users.join(', ')}
              </Typography>
            </Typography>
          }
        />
      </ListItem>
    </>
  );
};

export default BoardPreview;
