import { ColumnsResp, IColumnResp } from '../api/models/columns';

export const reorder = (list: ColumnsResp, startIndex: number, endIndex: number) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const mapColumnsOrder = (columns: IColumnResp[]) => {
  return columns.map((column, index) => {
    const newColumn = { ...column };
    newColumn.order = index;
    return newColumn;
  });
};
