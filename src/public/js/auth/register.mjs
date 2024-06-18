"use strict";

import { formDataToJson, handleMsg, wait } from "./utils.mjs";

{
  const form = document.querySelector("form");

  const register = () => {
    const formData = new FormData(form);
    const jsonData = formDataToJson(formData);

    fetch("http://127.0.0.1:8000/auth/register", {
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
              location.href = "/verify-email";
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
