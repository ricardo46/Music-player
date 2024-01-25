import { selectComponentOptionsType } from "@/Utils/tsTypes";
import { StyledSelect } from "../StyledComponents/StyledComponents";
import DropDownContainer from "./DropDownStyles";
import { USER_PLAYLISTS_DROPDOWN_NAME } from "@/globalVariables";
import { useState } from "react";

interface DropDownProps {
  options: selectComponentOptionsType;
  onChangeFunction: (e: any) => void;
  dropDownID: string;
  resetAfterClick: boolean;
}

const DropDown = ({
  options,
  onChangeFunction,
  dropDownID,
  resetAfterClick,
}: DropDownProps) => {
  const [value, setValue] = useState("");

  const onChange = (selectedOption: any) => {
    onChangeFunction(selectedOption);
    setValue("");
  };

  return (
    <DropDownContainer>
      <StyledSelect
        menuPosition={"fixed"} //makes the options adjust according to available height
        options={options}
        onChange={onChange}
        instanceId={dropDownID}
        placeholder={USER_PLAYLISTS_DROPDOWN_NAME}
        classNamePrefix="Select"
        value={resetAfterClick ? value : undefined}
      ></StyledSelect>
    </DropDownContainer>
  );
};

export default DropDown;
