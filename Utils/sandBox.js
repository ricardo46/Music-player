const { default: axios } = require("axios");

const deletePlaylist = async (
  user_id,
  listofsongs_id,

  authToken
) => {
  const response = await axios.delete(
    `https://x8ki-letl-twmt.n7.xano.io/api:71Gy7uAA/listofsongs/${listofsongs_id}`,
    {
      data: {
        user_id: user_id,
        listofsongs_id: listofsongs_id,
      },

      headers: {
        Authorization: "Bearer " + authToken,
      },
    }
  );
  return response;
};

deletePlaylist(3, 42,'eyJhbGciOiJBMjU2S1ciLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwiemlwIjoiREVGIn0.YXtVb2ui3xijVAR2HUlFbx306Yajx5DtaxzNaw2zzzeSm1sntKjCx_TM3NfA6U531ShCDR_XHvNaB8TFYqfvDU9aEr1ki9cG.n6dkL6XxFYWxBy3TQPX35Q.lNvGVot4qFHNIO-mI_Bb0Lk6Z38VaQ6BKIZv1juIfeYyOXWz6agPYaDhCHutR_7pxSyF3mKwxJKYPOo7Gz5yWElRH8hzf5gsnHq_JzWeEwXB71jBVVQzpgbeg56Dv20uqvUj-D4ZST_N9zajZ5CvJOIXdBfEyGL8M7L0G7cT_Jk.ON9zRBI74FftVesEdYqOzw-4pT8eqj7q-QdhRbBv8D4')