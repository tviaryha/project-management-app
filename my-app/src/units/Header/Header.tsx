import { AppBar, Container, Toolbar, Typography, useScrollTrigger } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Navigation from './Navigation';

const Header = () => {
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
            <Navigation />
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
