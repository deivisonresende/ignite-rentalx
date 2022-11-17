interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
    id: string;
  };
  token: string;
  refresh_token: string;
}

export { IRequest, IResponse };
