import { Person } from '@mui/icons-material';
import { Grid, Avatar, List, ListItem, Typography } from '@mui/material';
import { amber } from '@mui/material/colors';
import { Iprofile } from '../../../redux/profileSlice';

const ProfileInfo = ({ name, login }: Iprofile) => {
  return (
    <Grid
      container
      component="section"
      flexDirection="column"
      alignItems="flex-start"
      flexBasis={0}>
      <Grid
        container
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        flexBasis="fit-content">
        <Avatar sx={{ width: '80px', height: '80px', m: 0, bgcolor: amber[300] }}>
          <Person fontSize="large" />
        </Avatar>
        <List>
          <Typography
            component={ListItem}
            variant={'h6'}
            disablePadding
            sx={{ justifyContent: 'center' }}>
            {name}
          </Typography>
          <Typography
            component={ListItem}
            variant={'subtitle1'}
            disablePadding
            sx={{ justifyContent: 'center' }}>
            {login}
          </Typography>
        </List>
      </Grid>
    </Grid>
  );
};

export default ProfileInfo;
