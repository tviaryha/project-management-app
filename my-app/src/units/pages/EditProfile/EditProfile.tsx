import { Grid } from '@mui/material';
import { useEffect } from 'react';
import LinearLoadingIndicator from '../../../components/LinearLoadingIndicator';
import { LocalStorageKeys } from '../../../enums';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from '../../../hooks/useAppSelector';
import { clearErrorCode, getUserProfile } from '../../../redux/profileSlice';
import ProfileForm from './ProfileForm';
import ProfileInfo from './ProfileInfo';

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
    <Grid container justifyContent="space-around" gap="10px">
      <ProfileInfo name={name} login={login} />
      <ProfileForm />
    </Grid>
  );
};

export default EditProfile;
