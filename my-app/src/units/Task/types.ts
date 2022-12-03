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
  editTask: (boardId: string, columnId: string, _id: string) => void;
  deleteTask: (boardId: string, columnId: string, _id: string) => void;
}

export interface IEditProps extends ITask {
  editTask: (
    title: string,
    description: string,
    _id: string,
    columnId: string,
    boardId: string
  ) => void;
  closeModal: () => void;
}

export interface IFullTask extends ITask {
  order: number;
  userId: string;
  users: string[];
}

export interface ITaskProps extends IFullTask {
  showConfirmationModal: (boardId: string, columnId: string, _id: string) => void;
}

export enum TaskTranslationKeys {
  ns = 'task',
  modalTitle = 'title',
  buttonDelete = 'buttonDelete',
  buttonCancel = 'buttonCancel',
  buttonEdit = 'buttonEdit',
  buttonClose = 'buttonClose',
  helperTextTitle = 'helperTextTitle',
  helperTextDescription = 'helperTextDescription'
}
