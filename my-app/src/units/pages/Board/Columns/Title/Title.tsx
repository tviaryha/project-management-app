import { Typography } from '@mui/material';
import { useState } from 'react';
import Form from './Form';

type Props = { title: string; columnId: string };

const Title = ({ title, columnId }: Props) => {
  const [shouldShowTitle, setShouldShowTitle] = useState<boolean>(true);
  const [columnTitle, setColumnTitle] = useState<string>(title);

  const toggleShouldShowTitle = () => {
    setShouldShowTitle(!shouldShowTitle);
  };

  const setNewTitle = (title: string) => setColumnTitle(title);

  const displayTitle = shouldShowTitle ? (
    <Typography variant="h6" onClick={toggleShouldShowTitle} sx={{ cursor: 'pointer' }}>
      {columnTitle}
    </Typography>
  ) : (
    <Form
      title={columnTitle}
      columnId={columnId}
      toggleShouldShowTitle={toggleShouldShowTitle}
      setNewTitle={setNewTitle}
    />
  );

  return displayTitle;
};

export default Title;
