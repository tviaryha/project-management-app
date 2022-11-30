import { IColumnResp } from '../../../../../api/models/columns';

export type TitleProps = Omit<IColumnResp, 'boardId'>;
export interface ITitleFormProps extends TitleProps {
  toggleShouldShowTitle: () => void;
  setNewTitle: (title: string) => void;
}
