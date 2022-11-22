import { Person } from '@mui/icons-material';
import { Grid, Card, Avatar, CardHeader, CardContent, Typography } from '@mui/material';

export type СardProps = { bgcolor: string; title: string };

const DeveloperСard = ({ bgcolor, title }: СardProps) => {
  return (
    <Grid
      container
      component={Card}
      flexDirection="column"
      alignItems="center"
      gap="10px"
      sx={{ maxWidth: '320px', p: '16px' }}>
      <Avatar sx={{ width: '50px', height: '50px', m: 0, bgcolor: bgcolor }}>
        <Person />
      </Avatar>

      <CardHeader
        title={title}
        titleTypographyProps={{ variant: 'h6', component: 'span' }}
        sx={{ p: 0 }}
      />

      <CardContent sx={{ p: 0 }}>
        <Typography variant="body2">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur ratione possimus
          voluptate ullam esse omnis incidunt, reprehenderit, fugit ipsa culpa sint nisi sit dolorum
          exercitationem pariatur distinctio, qui veniam explicabo.
        </Typography>
      </CardContent>
    </Grid>
  );
};

export default DeveloperСard;
