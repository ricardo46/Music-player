import { UserType } from "@/Contexts/UserContext";
import axios from "axios";

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
      // console.log("errrrrrrrrr", err.response?.data);
      errorData = err.response?.data;
    });

  // console.log("response", response);

  switch (currentPath) {
    case "/user":
      if (!response) {
        return {
          redirect: {
            destination: "/login",
            permanent: false,
          },
        };
      }
      break;

    case "/login":
      if (response) {
        return {
          redirect: {
            destination: "/user",
            permanent: false,
          },
        };
      }
      break;
    case "/register":
      if (response) {
        return {
          redirect: {
            destination: "/user",
            permanent: false,
          },
        };
      }
      break;

    default:
      console.log(`The page ${currentPath} does not exist.`);
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
  }

  const user: UserType = response?.data;
  // console.log("userData", errorData);

  return {
    props: {
      userData: user ? user : null,
      errorAuth: errorData,
    },
  };
};
