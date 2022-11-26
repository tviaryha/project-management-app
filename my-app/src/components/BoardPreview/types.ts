export interface IBoard {
  title: string;
  boardId: string;
  linkTo: string;
}
export interface IDeleteTask {
  _id: string;
  boardId: string;
  columnId: string;
  title: string;
}

export interface IEditTaskProps extends ITask {
  closeModal: () => void;
}

export interface ITask extends IDeleteTask {
  description: string;
}

export interface IDeleteTaskProps extends IDeleteTask {
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
