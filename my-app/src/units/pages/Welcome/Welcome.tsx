import { Box, Grid } from '@mui/material';
import { deepOrange, deepPurple, yellow } from '@mui/material/colors';
import { Developers } from '../../../enums';
import DeveloperСard from './DeveloperСard';
import Section from './Section';
import { useTranslation } from 'react-i18next';

export enum WelcomePageTranslations {
  ns = 'welcomePage',
  title = 'title',
  appDescription = 'appDescription',
  courseDescription = 'courseDescription',
  devDesc1 = 'devDesc1',
  devDesc2 = 'devDesc2',
  devDesc3 = 'devDesc3'
}

const Welcome = () => {
  const { devDesc1, devDesc2, devDesc3, appDescription, title, courseDescription } =
    WelcomePageTranslations;
  const { t } = useTranslation([WelcomePageTranslations.ns]);
  return (
    <Box sx={{ textAlign: 'center', my: 2 }}>
      <Grid container flexDirection="column" justifyContent="center" gap="50px">
        <Section typographyComponent={'h2'} text={t(title)} />
        <Section typographyComponent={'p'} text={t(appDescription)} />
        <Section typographyComponent={'p'} text={t(courseDescription)} />

        <Grid container component="section" justifyContent="space-evenly" gap="20px">
          <DeveloperСard
            bgcolor={deepPurple[500]}
            title={Developers.Nozeil}
            description={t(devDesc1)}
          />
          <DeveloperСard
            bgcolor={deepOrange[500]}
            title={Developers.Verigota}
            description={t(devDesc2)}
          />
          <DeveloperСard
            bgcolor={yellow[500]}
            title={Developers.OlyaPolya}
            description={t(devDesc3)}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Welcome;
