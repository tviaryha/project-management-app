import { Person } from '@mui/icons-material';
import { Avatar, Grid, List, ListItem, Typography } from '@mui/material';
import { amber } from '@mui/material/colors';
import { useEffect } from 'react';
import LinearLoadingIndicator from '../../components/LinearLoadingIndicator';
import { LocalStorageKeys } from '../../enums';
import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';
import { clearErrorCode, getUserProfile } from '../../redux/profileSlice';

const EditProfile = () => {
  const { name, login, isLoading, errorCode } = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const userId = localStorage.getItem(LocalStorageKeys.userId);

    if (userId) {
      dispatch(getUserProfile(userId));
    }

    return () => {
      dispatch(clearErrorCode());
    };
  }, []);

  if (isLoading) {
    return <LinearLoadingIndicator />;
  }

  return (
    <Grid container justifyContent="center" gap="10px">
      <Grid
        container
        component="section"
        alignItems="center"
        justifyContent="center"
        flexBasis="30%">
        <Avatar sx={{ width: '80px', height: '80px', m: 0, bgcolor: amber[300] }}>
          <Person fontSize="large" />
        </Avatar>
        <List>
          <Typography component={ListItem} variant={'h5'}>
            Login: {login}
          </Typography>
          <Typography component={ListItem} variant={'h5'}>
            Name: {name}
          </Typography>
        </List>
      </Grid>
      <Grid item component="section" flexBasis="50%">
        Form
      </Grid>
    </Grid>
  );
};

export default EditProfile;
