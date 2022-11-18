import { Person } from '@mui/icons-material';
import { Grid, Avatar, List, Typography, ListItem } from '@mui/material';
import { amber } from '@mui/material/colors';

interface IProfileInfoProps {
  name: string;
  login: string;
}

const ProfileInfo = ({ name, login }: IProfileInfoProps) => {
  return (
    <Grid container component="section" alignItems="center" justifyContent="center" flexBasis="30%">
      <Avatar sx={{ width: '80px', height: '80px', m: 0, bgcolor: amber[300] }}>
        <Person fontSize="large" />
      </Avatar>
      <List>
        <Typography component={ListItem} variant={'h5'}>
          Name: {name}
        </Typography>
        <Typography component={ListItem} variant={'h5'}>
          Login: {login}
        </Typography>
      </List>
    </Grid>
  );
};

export default ProfileInfo;
