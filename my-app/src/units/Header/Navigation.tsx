import Grid from '@mui/material/Unstable_Grid2';
import useCheckToken from '../../hooks/useCheckToken';
import ControlsForAuthUser from './ControlsForAuthUser';
import SignButtons from './SignButtons';

const Navigation = () => {
  const Controls = useCheckToken(<ControlsForAuthUser />, <SignButtons />);

  return (
    <Grid container gap="10px">
      <Controls />
    </Grid>
  );
};

export default Navigation;
