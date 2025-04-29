export type AccessTokenBody = {
  accessToken: string
}

export type AccessTokenPayload = {
  sub: number;
  email: string;
  firstName: string;
  lastName: string;
}