import { Box } from '@mui/material';
import { deepOrange, deepPurple } from '@mui/material/colors';
import Grid from '@mui/system/Unstable_Grid';
import { Developers } from '../../../enums';
import DeveloperСard from './DeveloperСard';
import Section from './Section';

const Welcome = () => {
  return (
    <Box sx={{ textAlign: 'center', m: '20px 0' }}>
      <Grid container flexDirection="column" justifyContent="center" gap="50px">
        <Section typographyComponent={'h2'} />
        <Section typographyComponent={'p'} />

        <Grid container component="section" justifyContent="space-evenly" gap="20px">
          <DeveloperСard bgcolor={deepPurple[500]} title={Developers.Nozeil} />
          <DeveloperСard bgcolor={deepOrange[500]} title={Developers.Verigota} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Welcome;
