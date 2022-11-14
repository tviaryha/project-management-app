import Grid from '@mui/material/Unstable_Grid2';
import useCheckToken from '../../../hooks/useCheckToken';
import NavMenu from './NavMenu';
import SignButtons from './SignButtons';

type NavigationProps = {
  display: 'none' | 'flex';
};

const Navigation = ({ display }: NavigationProps) => {
  const Controls = useCheckToken(<NavMenu />, <SignButtons />);

  return (
    <Grid
      component="nav"
      container
      gap={{ xs: '20px', md: '10px' }}
      padding={{ xs: '40px', md: 0 }}
      sx={{ display: { xs: display, md: 'flex' }, flexDirection: { xs: 'column', md: 'row' } }}>
      <Controls />
    </Grid>
  );
};

export default Navigation;
