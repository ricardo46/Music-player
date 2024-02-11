import { useMediaQuery } from "@mui/material";
import { StyledButton } from "../StyledComponents/StyledComponents";
import { IconContainer } from "./ButtonOrClickableIconStyles";
import { LAPTOP_WIDTH_ONE } from "@/globalVariables";
import { IconLabel } from "../Icons/Icons";

const ButtonOrClickableIcon = ({
  handleButtonClick,
  IconStyled,
  label,
}: {
  handleButtonClick: () => void;
  IconStyled: any;
  label: string;
}) => {
  const maxMobileWidth = useMediaQuery(`(max-width:${LAPTOP_WIDTH_ONE})`);
  return (
    <IconContainer>
      <StyledButton
        onClick={() => {
          handleButtonClick();
        }}
      >
        {maxMobileWidth ? (
          <>
            <IconStyled /> <IconLabel>{label}</IconLabel>
          </>
        ) : (
          label
        )}
      </StyledButton>
    </IconContainer>
  );
};


export default ButtonOrClickableIcon