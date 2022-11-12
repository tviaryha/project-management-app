import { AppBar, Button, Container, Toolbar, Typography, useScrollTrigger } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paths } from '../enums';

const Header: FC = () => {
  const navigate = useNavigate();
  const trigger = useScrollTrigger({
    threshold: 0,
    disableHysteresis: true
  });

  const { signIn, signUp } = Paths;

  const color = trigger ? 'secondary' : 'inherit';
  const elevation = trigger ? 4 : 0;

  const signInClickHandler = () => navigate(signIn);
  const signUpClickHandler = () => navigate(signUp);

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
            <Grid container gap="10px">
              <Button variant="contained" size="small" onClick={signInClickHandler}>
                Sign in
              </Button>
              <Button variant="contained" size="small" onClick={signUpClickHandler}>
                Sign up
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
