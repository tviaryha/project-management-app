import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import useAppSelector from '../../hooks/useAppSelector';
import { Loader } from '../Loader';
import { Toast } from '../Toast/Toast';
import Footer from './Footer/Footer';
import Header from './Header/Header';

const Layout = () => {
  const toastMessage = useAppSelector((state) => state.toast.message);
  const toastType = useAppSelector((state) => state.toast.type);
  const toastIsOpen = useAppSelector((state) => state.toast.isOpen);

  return (
    <>
      <Header />
      <Toast message={toastMessage} type={toastType} isOpen={toastIsOpen} />
      <Loader />
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
