import { setCookie } from "nookies";
import { jwtDecode } from "jwt-decode";
import { User, UserInstance } from "@/store/models/user";
import { AccessTokenBody, AccessTokenPayload } from "@/shared/types/access-token";
import { COOKIE_ACCESS_TOKEN_KEY } from "@/shared/constants";

const ONE_HOUR = 60*60;

export const initialiseUser = (responseData: AccessTokenBody): UserInstance => {
  const { accessToken } = responseData;

  setCookie(null, COOKIE_ACCESS_TOKEN_KEY, accessToken, {
    maxAge: ONE_HOUR,
    path: "/",
  });


  const payload = jwtDecode<AccessTokenPayload>(accessToken)

  return User.create({
    id: payload.sub,
    email: payload.email,
    firstName: payload.firstName,
    lastName: payload.lastName,
    isAdmin: payload.isAdmin,
  });
};
