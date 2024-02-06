import { useRouter } from "next/router";
import { PageNameContainer } from "./PageNameStyles";
import { HOME_PAGE_NAME } from "@/globalVariables";
import { getTextWithFirstLetterToUpperCase } from "@/Utils/functionUtils";

const PageName = () => {
  const router = useRouter();

 const pathname=  router.pathname
 const pageName=pathname=='/'? `${HOME_PAGE_NAME} Page` : `${getTextWithFirstLetterToUpperCase(pathname.slice(1))} Page`
  return (
    
      <PageNameContainer>{pageName}</PageNameContainer>
    
  )
};

export default PageName