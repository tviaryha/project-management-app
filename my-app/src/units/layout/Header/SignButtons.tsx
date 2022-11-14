import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Paths } from '../../../enums';

const SignButtons = () => {
  const navigate = useNavigate();
  const { signIn, signUp } = Paths;

  const signInClickHandler = () => navigate(signIn);
  const signUpClickHandler = () => navigate(signUp);
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
