import { Grid } from '@mui/material';
import useAppSelector from '../../../hooks/useAppSelector';
import NavMenu from './NavMenu';
import SignButtons from './SignButtons';

type NavigationProps = {
  display: 'none' | 'flex';
};

const Navigation = ({ display }: NavigationProps) => {
  const isSignedIn = useAppSelector((state) => state.signIn.isSignedIn);
  const controls = isSignedIn ? <NavMenu /> : <SignButtons />;
  return (
    <Grid
      component="nav"
      textAlign="center"
      item
      gap={{ xs: '20px', md: '10px' }}
      padding={{ xs: '40px', md: 0 }}
      sx={{ display: { xs: display, md: 'flex' }, flexDirection: { xs: 'column', md: 'row' } }}>
      {controls}
    </Grid>
  );
};

export default Navigation;
