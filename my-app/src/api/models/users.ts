export interface ISignIn {
  login: string;
  password: string;
}

export interface IUserReq {
  name: string;
  login: string;
  password: string;
}

export interface ISignInResp {
  token: string;
}

export interface IUserResp {
  _id: string;
  name: string;
  login: string;
}

export type IUsersResp = IUserResp[];
