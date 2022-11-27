import DeleteIcon from '@mui/icons-material/Delete';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import { IBoard } from './types';
import { Link } from 'react-router-dom';
import { boardStyle } from './style';

const BoardPreview = ({ title, boardId, linkTo, onDeleteButtonClick }: IBoard): JSX.Element => {
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
        <ListItemText primary={title} />
      </ListItem>
    </>
  );
};

export default BoardPreview;
