import { Button, Link } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Languages, Paths } from '../../enums';
import MainPageButton from './MainPageButton';

const LanguageToggler = () => {
  const [selected, setSelected] = useState(false);
  const { en, ru } = Languages;
  const content = selected ? ru : en;

  const onClick = () => {
    setSelected(!selected);
  };

  return (
    <Button variant="outlined" onClick={onClick} sx={{ minWidth: 'fit-content' }}>
      {content}
    </Button>
  );
};

const NavMenu = () => {
  const navigate = useNavigate();
  const { newBoard, editProfile } = Paths;

  const createNewBoardClickHandler = () => navigate(newBoard);
  const editProfileClickHandler = () => navigate(editProfile);

  return (
    <>
      <Button component={Link} onClick={createNewBoardClickHandler}>
        Create new board
      </Button>
      <Button component={Link} onClick={editProfileClickHandler}>
        Edit profile
      </Button>
      <MainPageButton />
      <LanguageToggler />
      <Button component={Link} variant="contained">
        SignOut
      </Button>
    </>
  );
};

export default NavMenu;
