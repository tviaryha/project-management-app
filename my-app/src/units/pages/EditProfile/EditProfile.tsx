import { Grid } from '@mui/material';
import { useEffect } from 'react';
import LinearLoadingIndicator from '../../../components/LinearLoadingIndicator';
import { LocalStorageKeys } from '../../../enums';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from '../../../hooks/useAppSelector';
import { clearProfile, getUser } from '../../../redux/profileSlice';
import ProfileForm from './ProfileForm';
import ProfileInfo from './ProfileInfo';

const EditProfile = () => {
  const { name, login, isLoading, errorCode } = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const userId = localStorage.getItem(LocalStorageKeys.userId);

    if (userId) {
      dispatch(getUser(userId));
    }

    return () => {
      dispatch(clearProfile());
    };
  }, []);

  if (isLoading) {
    return <LinearLoadingIndicator />;
  }

  return (
    <Grid container alignItems="center" gap={5} sx={{ mt: 8 }} flexDirection="column">
      <ProfileInfo name={name} login={login} />
      <ProfileForm />
    </Grid>
  );
};

export default EditProfile;
