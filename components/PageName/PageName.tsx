import { useRouter } from "next/router";
import { PageNameContainer } from "./PageNameStyles";

const PageName = () => {
  const router = useRouter();

 const pathname=  router.pathname
 const pageName=pathname=='/'? 'Home Page' : `${pathname.slice(1,2).toUpperCase()}${pathname.slice(2)} Page`
  return (
    
      <PageNameContainer>{pageName}</PageNameContainer>
    
  )
};

export default PageName