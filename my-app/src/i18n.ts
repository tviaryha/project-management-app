import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { TranslationKeys as EditProfileTK } from './units/pages/EditProfile/enum';
import { TranslationKeys as ToastTK } from './units/Toast/enum';
import { TranslationKeys as NewBoardTK } from './units/NewBoard/enum';
import { TranslationKeys as NewTaskTK } from './units/NewTask/enum';
import { TranslationKeys as HeaderTK } from './units/layout/Header/enums';
import { TranslationKeys as ErrorPageTK } from './units/pages/ErrorPage/enum';
import { FormTranslationKeys as FormTK } from './enums';
import { TranslationKeys as SignTK } from './units/auth/enum';
import { TranslationKeys as ConfirmationModalTK } from './components/ConfirmationModal/enum';
import { BoardsListTranslations as BoardsListTK } from './units/pages/Main/Main';
import { WelcomePageTarnslations as WelcomePageTK } from './units/pages/Welcome/Welcome';
import { TranslationKeys as BoardTK } from './units/pages/Board/enums';

const ns = [
  EditProfileTK.ns,
  ToastTK.ns,
  NewBoardTK.ns,
  HeaderTK.ns,
  ErrorPageTK.ns,
  FormTK.ns,
  SignTK.ns,
  ConfirmationModalTK.ns,
  BoardsListTK.ns,
  WelcomePageTK.ns,
  BoardTK.ns
  NewTaskTK.ns
];

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    ns,
    fallbackLng: 'en',
    debug: false,
    detection: {
      caches: ['localStorage']
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
