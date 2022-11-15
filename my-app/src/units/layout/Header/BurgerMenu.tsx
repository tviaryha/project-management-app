import { Drawer, DrawerProps, styled } from '@mui/material';

const BurgerMenu = styled(Drawer)<DrawerProps>(() => ({
  '& .MuiBackdrop-root': { cursor: 'pointer' },
  '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '270px' }
}));

export default BurgerMenu;
