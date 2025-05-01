import { setCookie } from "nookies";
import { jwtDecode } from "jwt-decode";
import { User, UserInstance } from "@/store/models/user";
import { AccessTokenBody, AccessTokenPayload } from "@/shared/types/access-token";

const ONE_HOUR = 60*60;

export const initialiseUser = (responseData: AccessTokenBody): UserInstance => {
  const { accessToken } = responseData;

  setCookie(null, "accessToken", accessToken, {
    maxAge: ONE_HOUR,
    path: "/",
  });


  const payload = jwtDecode<AccessTokenPayload>(accessToken)

  return User.create({
    id: payload.sub,
    email: payload.email,
    firstName: payload.firstName,
    lastName: payload.lastName,
  });
};
