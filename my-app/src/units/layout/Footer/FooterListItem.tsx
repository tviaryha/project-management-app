import { Link, ListItem, Typography } from '@mui/material';
import { fontSize } from './constants';

type FooterListItemProps = { content: string; nickname: string };

const FooterListItem = ({ content, nickname }: FooterListItemProps) => {
  return (
    <ListItem sx={{ width: 'fit-content', p: '0 5px' }}>
      <Typography
        component={Link}
        href={`https://github.com/${nickname}`}
        color="inherit"
        fontSize={fontSize}
        target="_blank"
        underline="none">
        {content}
      </Typography>
    </ListItem>
  );
};

export default FooterListItem;
