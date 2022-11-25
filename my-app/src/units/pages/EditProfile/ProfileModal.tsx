import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { LocalStorageKeys, Paths } from '../../../enums';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from '../../../hooks/useAppSelector';
import { closeProfileModal, deleteUser } from '../../../redux/profileSlice';
import { signOut } from '../../../redux/signInSlice';
import { TranslationKeys } from './enum';
import { TranslationKeys as ToastTranslations } from '../../Toast/enum';
import { openToast, RespRes } from '../../../redux/toastSlice';
import ConfirmationModal from '../../../components/ConfirmationModal/ConfirmationModal';

const ProfileModal = () => {
  const { modalIsOpen, isLoading } = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();
  const { t } = useTranslation([TranslationKeys.ns, ToastTranslations.ns]);
  const navigate = useNavigate();

  const { successDeleteProfile, fail } = ToastTranslations;

  const deleteProfile = async () => {
    const userId = localStorage.getItem(LocalStorageKeys.userId);

    if (userId) {
      try {
        await dispatch(deleteUser(userId)).unwrap();
        dispatch(signOut());
        navigate(Paths.base);
        dispatch(
          openToast({
            message: t(successDeleteProfile, { ns: ToastTranslations.ns }),
            type: RespRes.success
          })
        );
      } catch (eCode) {
        dispatch(
          openToast({ message: t(fail, { ns: ToastTranslations.ns }), type: RespRes.error })
        );
      } finally {
        dispatch(closeProfileModal());
      }
    }
  };

  const handleClose = () => {
    dispatch(closeProfileModal());
  };

  return (
    <ConfirmationModal
      description={t(TranslationKeys.modalDescription)}
      handleClose={handleClose}
      isOpen={modalIsOpen}
      isLoading={isLoading}
      yesBtnClickHandler={deleteProfile}
    />
  );
};

export default ProfileModal;
