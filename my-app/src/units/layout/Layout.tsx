import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Footer from './Footer/Footer';
import { Loader } from '../Loader';
import Header from './Header/Header';
import { Toast } from '../toast/Toast';
import useAppSelector from '../../hooks/useAppSelector';

const Layout = () => {
  const toastMessage = useAppSelector((state) => state.toast.message);
  const toastType = useAppSelector((state) => state.toast.type);
  const toastIsOpen = useAppSelector((state) => state.toast.isOpen);
  const isLoading = useAppSelector((state) => state.signIn.isLoading || state.signUp.isLoading);

  return (
    <>
      <Header />
      <Toast message={toastMessage} type={toastType} isOpen={toastIsOpen} />
      <Loader open={isLoading || false} />
      <Box component="main" flexGrow={1}>
        <Container>
          <Outlet />
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default Layout;
