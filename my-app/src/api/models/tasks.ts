interface ITaskResp {
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
