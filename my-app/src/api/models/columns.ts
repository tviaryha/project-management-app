export interface IColumnReq {
  title: string;
  order?: 0;
  boardId: string;
}

export interface IColumnResp extends Omit<IColumnReq, 'order'> {
  _id: string;
  order: 1;
}

export interface IColumnUpdate extends IColumnReq {
  _id: string;
}

export type ColumnsResp = IColumnResp[];
