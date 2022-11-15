import { Grid, Typography } from '@mui/material';

type SectionProps = { typographyComponent: React.ElementType };

const Section = ({ typographyComponent }: SectionProps) => {
  return (
    <Grid item component="section">
      <Typography component={typographyComponent} sx={{ typography: { xs: 'h5', sm: 'h4' } }}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis assumenda
        necessitatibus neque libero provident ea fugit? Omnis inventore, architecto dignissimos
        doloremque deleniti veniam, quas ex natus possimus mollitia unde eligendi?
      </Typography>
    </Grid>
  );
};

export default Section;
