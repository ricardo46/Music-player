import { DescriptionContainer, DescriptionStyled } from "./DescriptionStyles";

const Description = ({ text }: { text: string }) => {
  return (
    <DescriptionContainer>
      <DescriptionStyled>{text}</DescriptionStyled>
    </DescriptionContainer>
  );
};

export default Description;
