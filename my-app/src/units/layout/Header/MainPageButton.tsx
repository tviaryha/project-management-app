import { Button, Link } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Paths } from '../../../enums';
import useNavItemHandler from '../../../hooks/useNavItemHandler';
import { TranslationKeys } from './enums';

const MainPageButton = () => {
  const { mainPage } = Paths;
  const { ns, toMain } = TranslationKeys;
  const mainPageClickHandler = useNavItemHandler(mainPage);
  const { t } = useTranslation([ns]);

  return (
    <Button component={Link} onClick={mainPageClickHandler}>
      {t(toMain)}
    </Button>
  );
};

export default MainPageButton;
