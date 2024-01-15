import { listIsEmpty } from "@/Utils/functionUtils";
import { StyledSelect } from "../StyledComponents/StyledComponents";
import DropDownContainer from "./DropDownStyles";

interface DropDownProp {
  onChangeFunction: (e: any) => void;
  defaultDropDownValue: string;
  listOfLists: any[];
  listProp: string;
  itemPropertyToShow: string;
  // songListObj,
}

const DropDown = ({
  onChangeFunction,
  defaultDropDownValue,
  listOfLists,
  listProp,
  itemPropertyToShow,
}: // songListObj,
DropDownProp) => {
  return (
    <>
      {/* {console.log("listOfLists[0][itemPropertyToShow]", listOfLists[0][itemPropertyToShow])} */}

      {console.log("listOfLists", listOfLists)}
      {console.log("defaultDropDownValue", defaultDropDownValue)}
      {/* <DropDownContainer> */}
        <StyledSelect
          onChange={onChangeFunction}
          defaultValue="default"
          disabled={listIsEmpty(listOfLists) ? true : false}
        >
          {listIsEmpty(listOfLists) && (
            <option value="default">{"No lists Created"}</option>
          )}
          {/* {!listIsEmpty(listOfLists) && (
          <option value="default">{defaultDropDownValue}</option>
        )} */}

          {listOfLists.map((el) => {
            return (
              // movieListObj.id != el[listIterator] && (
              <option key={el[listProp]} value={el[listProp]}>
                {el[itemPropertyToShow]}
              </option>
              // )
            );
          })}
        </StyledSelect>
      {/* </DropDownContainer> */}
    </>
  );
};

export default DropDown;
