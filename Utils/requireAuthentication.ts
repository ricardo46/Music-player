import axios from "axios";
import { UserType } from "./tsTypes";
import { HOME_PAGE_PATH, LOGIN_PAGE_PATH, REGISTER_PAGE_PATH, USER_PAGE_PATH } from "@/globalVariables";

export const requireAuthentication = async (
  context: any,
  currentPath: string,
  redirectPath?: string
) => {
  let errorData = null;

  const authToken = context.req.cookies.tokenCookie;

  const response = await axios
    .get("https://x8ki-letl-twmt.n7.xano.io/api:71Gy7uAA/auth/me", {
      headers: { Authorization: "Bearer " + authToken },
    })
    .catch((err) => {
      errorData = err.response?.data;
    });


  switch (currentPath) {
    case USER_PAGE_PATH:
      if (!response) {
        return {
          redirect: {
            destination: LOGIN_PAGE_PATH,
            permanent: false,
          },
        };
      }
      break;

    case LOGIN_PAGE_PATH:
      if (response) {
        return {
          redirect: {
            destination: USER_PAGE_PATH,
            permanent: false,
          },
        };
      }
      break;
    case REGISTER_PAGE_PATH:
      if (response) {
        return {
          redirect: {
            destination: USER_PAGE_PATH,
            permanent: false,
          },
        };
      }
      break;

    default:
      return {
        redirect: {
          destination: HOME_PAGE_PATH,
          permanent: false,
        },
      };
  }

  const user: UserType = response?.data;

  return {
    props: {
      userData: user ? user : null,
      errorAuth: errorData,
    },
  };
};
