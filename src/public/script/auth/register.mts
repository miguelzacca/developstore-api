"use strict";

import { formDataToJson, handleMsg, wait } from "../utils.mjs";
import config from "../config.mjs";

{
  const form = document.querySelector("form");

  if (!form) {
    throw new Error("Missing HTML Elements.");
  }

  const register = () => {
    const formData = new FormData(form);
    const jsonData = formDataToJson(formData);

    fetch(`${config.HOST}/auth/register`, {
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
          .then(async (data) => {
            handleMsg(data);
            if (res.ok) {
              await wait(1000);
              const objData = JSON.parse(jsonData);
              location.href = `/verify-email/${objData.email}`;
            }
          })
          .catch((err) => console.error(err))
      )
      .catch((err) => console.error(err));
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    register();
    form.reset();
  });
}
