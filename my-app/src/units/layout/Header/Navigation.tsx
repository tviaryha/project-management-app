import { Grid } from '@mui/material';
import useCheckIsSignedIn from '../../../hooks/useCheckIsSignedIn';
import NavMenu from './NavMenu';
import SignButtons from './SignButtons';

type NavigationProps = {
  display: 'none' | 'flex';
};

const Navigation = ({ display }: NavigationProps) => {
  const Controls = useCheckIsSignedIn(<NavMenu />, <SignButtons />);

  return (
    <Grid
      component="nav"
      textAlign="center"
      item
      gap={{ xs: '20px', md: '10px' }}
      padding={{ xs: '40px', md: 0 }}
      sx={{ display: { xs: display, md: 'flex' }, flexDirection: { xs: 'column', md: 'row' } }}>
      <Controls />
    </Grid>
  );
};

export default Navigation;
