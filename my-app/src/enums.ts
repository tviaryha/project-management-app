export enum Paths {
  base = '/',
  signIn = 'signIn',
  signUp = 'signUp',
  mainPage = '/mainPage',
  editProfile = 'editProfile',
  error = 'error',
  board = 'board'
}

export enum Developers {
  Nozeil = 'Nozeil',
  Verigota = 'Verigota',
  OlyaPolya = 'OlyaPolya'
}

export enum LocalStorageKeys {
  token = 'token',
  userId = 'userId'
}

export enum FormTranslationKeys {
  ns = 'form',
  title = 'title',
  login = 'login',
  name = 'name',
  password = 'password',
  requiredE = 'requiredE',
  minLength3E = 'minLength3E',
  minLength8E = 'minLength8E',
  maxLength30E = 'maxLength30E',
  passwordPatternE = 'passwordPattern'
}

export enum ErrorCodes {
  CONFLICT = 409,
  NOT_FOUND = 404
}
