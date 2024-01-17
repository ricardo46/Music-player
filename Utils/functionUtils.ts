const validNewListName = (input: string, lists: any[] | null) => {
    if(!lists) return true
    if (stringIsEmpty(input)) return false;
  
    if (listNameExists(input, getListNamesArray(lists))) return false;
    return true;
  };
  
  const listNameExists = (input: string, lists: any[]) => {
    return lists.includes(input);
  };
  
  const getListNamesArray = (lists: any[] | null) => {
    if(!lists) return []
    return lists.map((list) => list.name);
  };
  
  const stringIsEmpty = (input: string) => input == "";

  const listIsEmpty = (list: any[]) => {
    return list.length == 0;
  };
  
  export { validNewListName, stringIsEmpty, listNameExists, getListNamesArray , listIsEmpty};
  
  