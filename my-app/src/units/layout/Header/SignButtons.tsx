import { Button } from '@mui/material';
import { Paths } from '../../../enums';
import useNavItemHandler from '../../../hooks/useNavItemHandler';

const SignButtons = () => {
  const { signIn, signUp } = Paths;

  const signInClickHandler = useNavItemHandler(signIn);
  const signUpClickHandler = useNavItemHandler(signUp);
  return (
    <>
      <Button variant="contained" size="medium" onClick={signInClickHandler}>
        Sign in
      </Button>
      <Button variant="contained" size="medium" onClick={signUpClickHandler}>
        Sign up
      </Button>
    </>
  );
};

export default SignButtons;
