const { default: axios } = require("axios");

const editListNameInAPI = async (name, listId,   authToken
  ) => {
  const response = await axios.patch(
    `https://x8ki-letl-twmt.n7.xano.io/api:71Gy7uAA/listofsongs/${listId}/edit_list_name`,
    {
      data: {
        name: name,
      },
      headers: {
        Authorization: "Bearer " + authToken,
      },
    }
  );

  return response;
};

editListNameInAPI('ric list 2', 73, 'eyJhbGciOiJBMjU2S1ciLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwiemlwIjoiREVGIn0.pamWyJEyPE-axfL2b7VSSpB3Pu1MpFJLEb9pXkyIG-rMj7eAp907rFMQQt44R2ERr2F3b1MmswFbwgkt0JdAQDa4TI4GvPnd.ueuJT1rYanMazHLqlGkshg._XCuT6fhJb1nuDgwmwnICa47Uo0uSPcS47EX0II2VN5mBLlILLN7_y22BWET64mDUsvpDHAVSa0H2J05VbXYfzMDjxWvGVa6zhfOaiQgGEJeguUQKLBNS5CGIynHeEc4H25BiYYq0rVvFEM-IOU1meBt8KmNLWSXeKNrBmZdMSE.sxGebcfmV0rU0-uVrSKcSkXPlFTWR8wcv-T6IaaEdKY')