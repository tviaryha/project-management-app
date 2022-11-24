export interface ICreateBoardReq {
  title: string;
  owner: string;
  users: string[];
}

export interface ICreateBoardResp extends ICreateBoardReq {
  _id: string;
}
