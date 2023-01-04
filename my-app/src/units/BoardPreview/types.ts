import { SyntheticEvent } from 'react';

export interface IBoard {
  title: string;
  key: string;
  boardId: string;
  linkTo: string;
  users: string[];
  onDeleteButtonClick: (id: string, title: string, event: SyntheticEvent<HTMLElement>) => void;
}
