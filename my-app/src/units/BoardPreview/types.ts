import { MouseEvent } from 'react';
export interface IBoard {
  title: string;
  boardId: string;
  linkTo: string;
  users: string[];
  onDeleteButtonClick: (id: string, title: string, event: MouseEvent<HTMLButtonElement>) => void;
}
