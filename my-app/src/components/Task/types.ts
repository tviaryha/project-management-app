export interface IDeleteTask {
  _id: string;
  boardId: string;
  columnId: string;
}

export interface ITask extends IDeleteTask {
  title: string;
  description: string;
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
