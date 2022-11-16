import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Paths } from '../../../enums';
import useNavItemHandler from '../../../hooks/useNavItemHandler';
import { TranslationKeys } from './enums';

const SignButtons = () => {
  const { signIn, signUp } = Paths;
  const { ns, signInBtn, signUpBtn } = TranslationKeys;
  const { t } = useTranslation([ns]);

  const signInClickHandler = useNavItemHandler(signIn);
  const signUpClickHandler = useNavItemHandler(signUp);
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
