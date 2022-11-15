import { Button, Link } from '@mui/material';
import { useState } from 'react';
import { Languages, Paths } from '../../../enums';
import useNavItemHandler from '../../../hooks/useNavItemHandler';
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
  const { newBoard, editProfile } = Paths;

  const createNewBoardClickHandler = useNavItemHandler(newBoard);
  const editProfileClickHandler = useNavItemHandler(editProfile);
  const signOutClickHandler = useNavItemHandler();

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
      <Button component={Link} variant="contained" onClick={signOutClickHandler}>
        SignOut
      </Button>
    </>
  );
};

export default NavMenu;
