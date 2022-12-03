export interface ITaskResp {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  columnId: string;
  description: string;
  userId: string;
  users: string[];
}

export type TasksResp = ITaskResp[];

export type GetTasksParams = Pick<ITaskResp, 'boardId' | 'columnId'>;

export interface IColumnTasks {
  columnId: string;
  tasks: TasksResp;
}

export type UpdateTasksOrderReq = Pick<ITaskResp, '_id' | 'columnId' | 'order'>[];

export type UpdateTasksOrderParams = {
  columnId: string;
  tasks: UpdateTasksOrderReq;
};

export type DeleteTaskParams = {
  boardId: string;
  columnId: string;
  taskId: string;
};

export interface IUpdateTask extends ITaskResp {
  newColumnId?: string;
}
