import { ITaskResp } from './tasks';

export interface ICreateTaskParamResp {
  title: string;
  order: number;
  description: string;
  userId: string;
  users: string[];
}

export interface ICreateTaskReq {
  data: ICreateTaskParamResp;
  columnId: string;
  boardId: string;
}

export interface IGetTasksReq {
  columnId: string;
  boardId: string;
}

export interface ICreateTaskResp extends ICreateTaskParamResp {
  _id: string;
}

export interface ICreatedTask {
  columnId: string;
  task: ITaskResp;
}
