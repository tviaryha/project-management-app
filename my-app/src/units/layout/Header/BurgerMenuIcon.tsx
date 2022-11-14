import { Close, Menu } from '@mui/icons-material';
import { IconButton } from '@mui/material';

type BurgerMenuIconProps = {
  Icon: typeof Menu | typeof Close;
  handler: () => void;
};

const BurgerMenuIconButton = ({ Icon, handler }: BurgerMenuIconProps) => {
  return (
    <IconButton
      color="inherit"
      onClick={handler}
      sx={{ display: { md: 'none' }, width: 'fit-content', alignSelf: 'flex-end', m: 1 }}>
      <Icon fontSize="large" />
    </IconButton>
  );
};

export default BurgerMenuIconButton;
