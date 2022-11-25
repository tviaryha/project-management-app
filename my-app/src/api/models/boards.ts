export interface IBoardReq {
  title: string;
  owner: string;
  users: string[];
}

export interface IBoardResp extends IBoardReq {
  _id: string;
}
