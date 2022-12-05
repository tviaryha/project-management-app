export interface IDeleteTask {
  _id: string;
  boardId: string;
  columnId: string;
  title: string;
}

export interface ITask extends IDeleteTask {
  description: string;
}

export interface ICurrentTaskProps extends ITask {
  index: number;
}

export interface IFullTask extends ITask {
  order: number;
  userId: string;
  users: string[];
}

export interface ITaskProps extends IFullTask {
  showConfirmationModal: (boardId: string, columnId: string, _id: string) => void;
}
