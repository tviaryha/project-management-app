import { Box, Container } from '@mui/material';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer/Footer';
import Header from './Header';

const Layout: FC = () => {
  return (
    <>
      <Header />
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
