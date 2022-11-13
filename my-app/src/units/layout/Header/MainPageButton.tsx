import { Button, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Paths } from '../../../enums';

const MainPageButton = () => {
  const navigate = useNavigate();
  const { mainPage } = Paths;
  const mainPageClickHandler = () => navigate(mainPage);

  return (
    <Button component={Link} onClick={mainPageClickHandler}>
      Go to Main Page
    </Button>
  );
};

export default MainPageButton;
