import { Button, Link } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Languages, TranslationKeys } from './enums';
import MainPageButton from './MainPageButton';
import { Paths } from '../../../enums';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { signOut } from '../../../redux/signInSlice';
import { useNavigate } from 'react-router-dom';

const LanguageToggler = () => {
  const { en, ru } = Languages;
  const { ns, selectedLang } = TranslationKeys;
  const { t, i18n } = useTranslation([ns]);

  const onClick = () => {
    const lng = i18n.language === ru ? en : ru;
    i18n.changeLanguage(lng);
  };

  return (
    <Button variant="outlined" onClick={onClick} sx={{ minWidth: 'fit-content' }}>
      {t(selectedLang, { ns })}
    </Button>
  );
};

const NavMenu = () => {
  const { newBoard, editProfile, base } = Paths;
  const { ns, createNewBoard, profile, signOutBtn } = TranslationKeys;
  const { t } = useTranslation([ns]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const createNewBoardClickHandler = () => navigate(newBoard);
  const editProfileClickHandler = () => navigate(editProfile);
  const signOutClickHandler = () => navigate(base);

  const logOutClickHandler = () => {
    dispatch(signOut());
    signOutClickHandler();
  };

  return (
    <>
      <Button component={Link} onClick={createNewBoardClickHandler}>
        {t(createNewBoard)}
      </Button>
      <Button component={Link} onClick={editProfileClickHandler}>
        {t(profile)}
      </Button>
      <MainPageButton />
      <LanguageToggler />
      <Button component={Link} variant="contained" onClick={logOutClickHandler}>
        {t(signOutBtn)}
      </Button>
    </>
  );
};

export default NavMenu;
