import { Grid } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import LinearLoadingIndicator from '../../../components/LinearLoadingIndicator';
import { ErrorCodes, LocalStorageKeys, Paths } from '../../../enums';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from '../../../hooks/useAppSelector';
import useCloseMenu from '../../../hooks/useCloseMenu';
import { clearProfile, getUser } from '../../../redux/profileSlice';
import ProfileForm from './ProfileForm';
import ProfileInfo from './ProfileInfo';

const EditProfile = () => {
  useCloseMenu();

  const { name, login, isLoading } = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loadUser = async () => {
    const userId = localStorage.getItem(LocalStorageKeys.userId);

    if (userId) {
      try {
        await dispatch(getUser(userId)).unwrap();
      } catch (eCode) {
        if (eCode === ErrorCodes.e404) {
          navigate(Paths.error);
        }
      }
    }
  };

  useEffect(() => {
    loadUser();
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
