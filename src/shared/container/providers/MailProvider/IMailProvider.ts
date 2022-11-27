export interface IParameters {
  to: string;
  subject: string;
  variables: {
    name: string;
    link: string;
  };
  path: string;
}

interface IMailProvider {
  sendEmail({ to, subject, variables, path }: IParameters): Promise<void>;
}

export { IMailProvider };
