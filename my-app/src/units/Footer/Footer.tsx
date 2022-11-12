import { Box, Container, Link, List, ListItem, Toolbar, Typography } from '@mui/material';
import Grid from '@mui/system/Unstable_Grid';
import { FC } from 'react';
import { Developers } from '../../enums';
import logo from './../../assets/rs_school_js.svg';

const fontSize = { xs: '14px', sm: '1rem' };

type FooterListItemProps = { content: string };

const FooterListItem: FC<FooterListItemProps> = ({ content }) => {
  return (
    <ListItem sx={{ width: 'fit-content', p: '0 5px' }}>
      <Typography
        component={Link}
        href={`https://github.com/${content}`}
        color="inherit"
        fontSize={fontSize}
        underline="none">
        {content}
      </Typography>
    </ListItem>
  );
};

const Footer: FC = () => {
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
            <FooterListItem content={Developers.Nozeil} />
            <FooterListItem content={Developers.Verigota} />
          </Grid>
          <Grid component={Typography} fontSize={fontSize}>
            © 2022
          </Grid>
          <Grid
            container
            component={Link}
            href="https://rs.school/react/"
            alignItems="center"
            justifyContent={{ xs: 'center', sm: 'flex-end' }}
            flexGrow={1}
            flexBasis={0}>
            <Box
              component="img"
              src={logo}
              alt="RSSchool logo"
              height={{ xs: '30px', sm: '40px' }}
            />
          </Grid>
        </Grid>
      </Container>
    </Toolbar>
  );
};

export default Footer;
