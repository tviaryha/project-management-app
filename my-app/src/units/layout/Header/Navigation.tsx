import Grid from '@mui/material/Unstable_Grid2';
import useCheckToken from '../../../hooks/useCheckToken';
import NavMenu from './NavMenu';
import SignButtons from './SignButtons';

const Navigation = () => {
  const Controls = useCheckToken(<NavMenu />, <SignButtons />);

  return (
    <Grid component="nav" container gap="10px">
      <Controls />
    </Grid>
  );
};

export default Navigation;
