import { IColumnResp } from '../api/models/columns';
import { ITaskResp } from '../api/models/tasks';

export const reorder = <T>(list: T[], startIndex: number, endIndex: number) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const mapItemsByOrder = <T extends ITaskResp | IColumnResp>(items: T[]) => {
  return items.map((item, index) => {
    const newItem = { ...item };
    newItem.order = index;
    return newItem;
  });
};
