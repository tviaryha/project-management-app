import CloseRoundedButton from './CloseRoundedButton';
import { ITransitionsModalProps } from './ModalInterfaces';
import TransitionsModal from './TransitionsModal';

const TransitionsModalWithCloseBtn = ({
  children,
  isOpen,
  handleClose,
  isLoading
}: ITransitionsModalProps) => {
  return (
    <TransitionsModal isOpen={isOpen} handleClose={handleClose} isLoading={isLoading}>
      <>
        {children}
        <CloseRoundedButton onClick={handleClose} />
      </>
    </TransitionsModal>
  );
};

export default TransitionsModalWithCloseBtn;
