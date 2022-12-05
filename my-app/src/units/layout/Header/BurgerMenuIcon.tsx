import { Close, Menu } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { toggleBurgerIsOpen } from '../../../redux/burgerSlice';

type BurgerMenuIconProps = {
  Icon: typeof Menu | typeof Close;
};

const BurgerMenuIconButton = ({ Icon }: BurgerMenuIconProps) => {
  const dispatch = useAppDispatch();
  const onClick = () => dispatch(toggleBurgerIsOpen());

  return (
    <IconButton
      onClick={onClick}
      sx={{
        display: { md: 'none' },
        width: 'fit-content',
        alignSelf: 'flex-end',
        color: '#000000'
      }}>
      <Icon fontSize="large" />
    </IconButton>
  );
};

export default BurgerMenuIconButton;
