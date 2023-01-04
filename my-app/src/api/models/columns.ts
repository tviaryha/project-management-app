export interface IColumnReq {
  title: string;
  order: number;
  boardId: string;
}

export interface IColumnResp extends IColumnReq {
  _id: string;
}

export type ColumnDelete = Pick<IColumnResp, '_id' | 'boardId'>;

export type ColumnsResp = IColumnResp[];

export type UpdateColumnsOrderReq = Pick<IColumnResp, '_id' | 'order'>[];
