export interface ISignIn {
  login: string;
  password: string;
}

export interface ISignUp {
  name: string;
  login: string;
  password: string;
}

export interface ISignInResp {
  token: string;
}

export interface ISignUpResp {
  _id: string;
  name: string;
  login: string;
}
