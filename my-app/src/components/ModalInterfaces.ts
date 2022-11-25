export interface ITransitionsModalProps {
  children: React.ReactElement | React.ReactElement[];
  isOpen: boolean;
  handleClose: () => void;
  isLoading?: boolean;
}

export interface IConfirmationModalProps extends Omit<ITransitionsModalProps, 'children'> {
  description: string;
  yesBtnClickHandler: () => void;
}
