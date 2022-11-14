import { Button, Link } from '@mui/material';
import { Paths } from '../../../enums';
import useNavItemHandler from '../../../hooks/useNavItemHandler';

const MainPageButton = () => {
  const { mainPage } = Paths;
  const mainPageClickHandler = useNavItemHandler(mainPage);

  return (
    <Button component={Link} onClick={mainPageClickHandler}>
      Go to Main Page
    </Button>
  );
};

export default MainPageButton;
