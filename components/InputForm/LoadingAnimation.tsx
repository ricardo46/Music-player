// import { PropagateLoader } from "react-spinners";

// const LoadingAnimation = ({ submitRequest }) => {
//   return (
//     <PropagateLoader
//       loading={submitRequest.isLoading}
//       size={11}
//       color="#d2d2d2"
//       speedMultiplier={4}
//     />
//   );
// };

// export { LoadingAnimation };

import { PuffLoader } from "react-spinners";

function LoadingAnimation() {
  return (
    <>
      <PuffLoader color="blue" size="30" />
      {/* <SpinnerContainer>
        <Spinner animation="border" variant="primary" />
      </SpinnerContainer> */}
    </>
  );
}

export default LoadingAnimation;
