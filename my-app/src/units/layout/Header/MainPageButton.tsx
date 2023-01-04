import { Button, Link } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Paths } from '../../../enums';
import { TranslationKeys } from './enums';

const MainPageButton = () => {
  const navigate = useNavigate();
  const { mainPage } = Paths;
  const { ns, toMain } = TranslationKeys;
  const mainPageClickHandler = () => navigate(mainPage);
  const { t } = useTranslation([ns]);

  return (
    <Button component={Link} onClick={mainPageClickHandler}>
      {t(toMain)}
    </Button>
  );
};

export default MainPageButton;
