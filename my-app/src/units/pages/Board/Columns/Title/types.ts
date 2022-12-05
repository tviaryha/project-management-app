import { DraggableProvided } from 'react-beautiful-dnd';
import { IColumnResp } from '../../../../../api/models/columns';

export interface ITitleProps extends Omit<IColumnResp, 'boardId'> {
  provided: DraggableProvided;
}
export interface ITitleFormProps extends Omit<IColumnResp, 'boardId'> {
  toggleShouldShowTitle: () => void;
  setNewTitle: (title: string) => void;
}
