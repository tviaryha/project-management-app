import DeleteIcon from '@mui/icons-material/Delete';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import { IBoard } from './types';
import { Link } from 'react-router-dom';
import { boardStyle } from './style';
import PeopleIcon from '@mui/icons-material/People';
import { Box, Typography } from '@mui/material';
import { JSXElementConstructor, SyntheticEvent } from 'react';

const BoardPreview: JSXElementConstructor<IBoard> = ({
  title,
  boardId,
  linkTo,
  onDeleteButtonClick,
  users
}: IBoard) => {
  return (
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
          onClick={(event: SyntheticEvent<HTMLElement>) =>
            onDeleteButtonClick(boardId, title, event)
          }>
          <DeleteIcon />
        </IconButton>
      ]}>
      <Box>
        <Typography
          sx={{
            color: '#000000',
            opacity: 0.8,
            fontSize: 14
          }}>
          {title}
        </Typography>
        <Box
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
            {users.length > 3
              ? `${[users[0], users[1], users[2]].join(', ')}...`
              : users.join(', ')}
          </Typography>
        </Box>
      </Box>
    </ListItem>
  );
};

export default BoardPreview;
