export interface IColumnReq {
  title: string;
  order?: 0;
  boardId: string;
}

export interface IColumnResp extends Omit<IColumnReq, 'order'> {
  _id: string;
  order: 1;
}

export type ColumnsResp = IColumnResp[];
