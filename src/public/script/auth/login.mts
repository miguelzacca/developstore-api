"use strict";

import utils from "../utils.mjs";
import config from "../config.mjs";

const form = document.querySelector("form") as HTMLFormElement;

const login = () => {
  const formData = new FormData(form);
  const jsonData = utils.formDataToJson(formData);

  fetch(`${config.baseURL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: jsonData,
    credentials: "include",
  })
    .then((res) =>
      res
        .json()
        .then((data) => utils.handleMsg(data))
        .catch((err) => console.error(err))
    )
    .catch((err) => console.error(err));
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  login();
  form.reset();
});
