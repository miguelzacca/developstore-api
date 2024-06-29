"use strict";

import utils from "../utils.mjs";
import config from "../config.mjs";

const form = document.querySelector("form") as HTMLFormElement;

const changePasswd = () => {
  const formData = new FormData(form);
  const jsonData = utils.formDataToJson(formData);

  fetch(`${config.baseURL}/api/user/change-passwd`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: jsonData,
    credentials: "include",
  })
    .then((res) =>
      res
        .json()
        .then(async (data) => {
          utils.handleMsg(data);
          if (res.ok) {
            await utils.wait(1000);
            location.href = "/login";
          }
        })
        .catch((err) => console.error(err))
    )
    .catch((err) => console.error(err));
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  changePasswd();
  form.reset();
});
