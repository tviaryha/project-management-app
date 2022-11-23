import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { TranslationKeys as EditProfileTK } from './units/pages/EditProfile/enum';
import { TranslationKeys as ToastTK } from './units/Toast/enum';
import { TranslationKeys as NewBoardTK } from './units/pages/NewBoard/enum';
import { TranslationKeys as HeaderTK } from './units/layout/Header/enums';
import { TranslationKeys as ErrorPageTK } from './units/pages/ErrorPage/enum';
import { FormTranslationKeys as FormTK } from './enums';
import { TranslationKeys as SignTK } from './units/auth/enum';

const ns = [
  EditProfileTK.ns,
  ToastTK.ns,
  NewBoardTK.ns,
  HeaderTK.ns,
  ErrorPageTK.ns,
  FormTK.ns,
  SignTK.ns
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
