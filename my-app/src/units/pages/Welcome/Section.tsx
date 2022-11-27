import { Grid, Typography } from '@mui/material';

type SectionProps = { typographyComponent: React.ElementType; text: string };

const Section = ({ typographyComponent, text }: SectionProps) => {
  return (
    <Grid item component="section">
      <Typography component={typographyComponent} sx={{ typography: { xs: 'h5', sm: 'h4' } }}>
        {text}
      </Typography>
    </Grid>
  );
};

export default Section;
