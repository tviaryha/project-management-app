import { useTranslation } from 'react-i18next';
import useCloseMenu from '../../../hooks/useCloseMenu';
import { TranslationKeys } from './enum';

const ErrorPage = () => {
  useCloseMenu();

  const { t } = useTranslation([TranslationKeys.ns]);

  return <div>{t(TranslationKeys.message)}</div>;
};

export default ErrorPage;
