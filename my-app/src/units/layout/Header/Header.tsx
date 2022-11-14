import { CloseRounded as Close, MenuRounded as MenuIcon } from '@mui/icons-material';
import { AppBar, Container, Drawer, Link, Toolbar, useScrollTrigger } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paths } from '../../../enums';
import BurgerMenuIconButton from './BurgerMenuIcon';
import Navigation from './Navigation';

const Header = () => {
  const navigate = useNavigate();
  const trigger = useScrollTrigger({
    threshold: 0,
    disableHysteresis: true
  });
  const [mobileOpen, setMobileOpen] = useState(false);

  const handlerBurgerMenuToggle = () => setMobileOpen(!mobileOpen);

  const color = trigger ? 'secondary' : 'inherit';
  const elevation = trigger ? 4 : 0;

  const titleClickHandler = () => navigate(Paths.base);

  return (
    <AppBar color={color} position="sticky" elevation={elevation} sx={{ transition: 'all 0.5s' }}>
      <Container>
        <Toolbar disableGutters>
          <Grid container justifyContent="space-between" alignItems="center" sx={{ width: '100%' }}>
            <Grid>
              <Link
                variant="h5"
                underline="none"
                onClick={titleClickHandler}
                sx={{ cursor: 'pointer' }}>
                TaskTrack
              </Link>
            </Grid>
            <BurgerMenuIconButton Icon={MenuIcon} handler={handlerBurgerMenuToggle} />
            <Navigation display="none" />
          </Grid>
        </Toolbar>
      </Container>
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handlerBurgerMenuToggle}
        ModalProps={{
          keepMounted: true
        }}
        transitionDuration={500}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiBackdrop-root': { cursor: 'pointer' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '320px' }
        }}>
        <BurgerMenuIconButton Icon={Close} handler={handlerBurgerMenuToggle} />
        <Navigation display="flex" />
      </Drawer>
    </AppBar>
  );
};

export default Header;
