import { Box, Container, Grid, Link, List, Toolbar, Typography } from '@mui/material';
import { Developers } from '../../../enums';
import logo from './../../../assets/rs_school_js.svg';
import { fontSize } from './constants';
import FooterListItem from './FooterListItem';

const Footer = () => {
  return (
    <Toolbar component="footer">
      <Container>
        <Grid
          container
          justifyContent={{ sm: 'space-between', xs: 'center' }}
          alignItems="center"
          gap="10px">
          <Grid
            container
            component={List}
            justifyContent={{ xs: 'center', sm: 'flex-start' }}
            flexGrow={1}
            flexBasis={0}>
            <FooterListItem content={Developers.Nozeil} nickname={Developers.Nozeil} />
            <FooterListItem content={Developers.Verigota} nickname={Developers.Verigota} />
            <FooterListItem content={Developers.OlyaPolya} nickname={Developers.OlyaPolya} />
          </Grid>
          <Grid component={Typography} fontSize={fontSize}>
            © 2022
          </Grid>
          <Grid
            container
            flexGrow={1}
            flexBasis={0}
            justifyContent={{ xs: 'center', sm: 'flex-end' }}>
            <Link href="https://rs.school/react/" alignItems="center" target="_blank">
              <Box
                component="img"
                src={logo}
                alt="RSSchool logo"
                height={{ xs: '30px', sm: '40px' }}
              />
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Toolbar>
  );
};

export default Footer;
