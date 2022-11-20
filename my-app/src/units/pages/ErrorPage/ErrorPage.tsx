import { useTranslation } from 'react-i18next';
import { TranslationKeys } from './enum';

const ErrorPage = () => {
  const { t } = useTranslation([TranslationKeys.ns]);

  return <div>{t(TranslationKeys.message)}</div>;
};

export default ErrorPage;
