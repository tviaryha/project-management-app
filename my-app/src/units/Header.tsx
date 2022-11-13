import { AppBar, Button, Container, Toolbar, Typography, useScrollTrigger } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useNavigate } from 'react-router-dom';
import { Paths } from '../enums';
import useCheckToken from '../hooks/useCheckToken';

const AuthButtons = () => {
  const navigate = useNavigate();

  const { signIn, signUp } = Paths;

  const signInClickHandler = () => navigate(signIn);
  const signUpClickHandler = () => navigate(signUp);

  return (
    <Grid container gap="10px">
      <Button variant="contained" size="small" onClick={signInClickHandler}>
        Sign in
      </Button>
      <Button variant="contained" size="small" onClick={signUpClickHandler}>
        Sign up
      </Button>
    </Grid>
  );
};

const NavMenu = () => {
  return <div>Auth</div>;
};

const Header = () => {
  const Controls = useCheckToken(<NavMenu />, <AuthButtons />);
  const trigger = useScrollTrigger({
    threshold: 0,
    disableHysteresis: true
  });

  const color = trigger ? 'secondary' : 'inherit';
  const elevation = trigger ? 4 : 0;

  return (
    <AppBar color={color} position="sticky" elevation={elevation} sx={{ transition: 'all 0.5s' }}>
      <Container>
        <Toolbar disableGutters>
          <Grid container justifyContent="space-between" sx={{ width: '100%' }}>
            <Grid>
              <Typography component="h1" variant="h5">
                TaskTrack
              </Typography>
            </Grid>
            <Controls />
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
