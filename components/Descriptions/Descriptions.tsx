import Description from "../Description/Description";
import { DescriptionsContainer } from "../StyledComponents/StyledComponents";

const Descriptions = () => {
  
  return (
    <DescriptionsContainer>
        <Description text="Your favorite songs everywhere!" />
        <Description text="Create playlists!" />
        <Description text="Upload Songs!" />
        <Description text="Find what others are listening to!" />
        <Description text="Login / Register to join!" />
        <Description text="You have the control!" />
        <Description text="Search songs!" />
        <Description text="Hit play!" />

      </DescriptionsContainer>
  )
};

export default Descriptions