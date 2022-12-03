import { Box, Container } from '@mui/material';
import { Outlet, useParams } from 'react-router-dom';
import useAppSelector from '../../hooks/useAppSelector';
import { Loader } from '../Loader';
import ProfileModal from '../pages/EditProfile/ProfileModal';
import NewBoardModal from '../NewBoard/NewBoard';
import { Toast } from '../Toast/Toast';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import CreateColumnModal from '../pages/Board/Columns/CreateColumnModal';

const Layout = () => {
  const toastMessage = useAppSelector((state) => state.toast.message);
  const toastType = useAppSelector((state) => state.toast.type);
  const toastIsOpen = useAppSelector((state) => state.toast.isOpen);

  const { id } = useParams();

  const content = id ? (
    <Outlet />
  ) : (
    <Container>
      <Outlet />
    </Container>
  );

  return (
    <>
      <Header />
      <Toast message={toastMessage} type={toastType} isOpen={toastIsOpen} />
      <Loader />
      <ProfileModal />
      <NewBoardModal />
      <CreateColumnModal />
      <Box
        component="main"
        flexGrow={1}
        sx={{
          mx: { xs: '16px', sm: '24px' }
        }}>
        {content}
      </Box>
      <Footer />
    </>
  );
};

export default Layout;
