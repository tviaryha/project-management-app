import { Grid } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ErrorCodes, LocalStorageKeys, Paths } from '../../../enums';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from '../../../hooks/useAppSelector';
import useCloseMenu from '../../../hooks/useCloseMenu';
import { hideLoader, showLoader } from '../../../redux/appSlice';
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
      dispatch(showLoader());
      try {
        await dispatch(getUser(userId)).unwrap();
      } catch (eCode) {
        if (eCode === ErrorCodes.NOT_FOUND) {
          navigate(Paths.error);
        }
      } finally {
        dispatch(hideLoader());
      }
    }
  };

  useEffect(() => {
    loadUser();
    return () => {
      dispatch(clearProfile());
    };
  }, []);

  return isLoading ? null : (
    <Grid container alignItems="center" gap={5} sx={{ mt: 8 }} flexDirection="column">
      <ProfileInfo name={name} login={login} />
      <ProfileForm />
    </Grid>
  );
};

export default EditProfile;
