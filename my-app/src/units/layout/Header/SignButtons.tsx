import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Paths } from '../../../enums';
import { TranslationKeys } from './enums';

const SignButtons = () => {
  const navigate = useNavigate();
  const { signIn, signUp } = Paths;
  const { ns, signInBtn, signUpBtn } = TranslationKeys;
  const { t } = useTranslation([ns]);

  const signInClickHandler = () => navigate(signIn);
  const signUpClickHandler = () => navigate(signUp);
  return (
    <>
      <Button variant="contained" size="medium" onClick={signInClickHandler}>
        {t(signInBtn)}
      </Button>
      <Button variant="contained" size="medium" onClick={signUpClickHandler}>
        {t(signUpBtn)}
      </Button>
    </>
  );
};

export default SignButtons;
