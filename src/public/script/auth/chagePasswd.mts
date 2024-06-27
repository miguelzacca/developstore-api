"use strict";

import utils from "../utils.mjs";
import config from "../config.mjs";

{
  const form = document.querySelector("form");

  if (!form) {
    throw new Error("Missing HTML Elements.");
  }

  const changePasswd = () => {
    const formData = new FormData(form);
    const jsonData = utils.formDataToJson(formData);

    const email = JSON.parse(jsonData).email;

    fetch(`${config.HOST}/auth/passwd-recovery/${email}`, {
      credentials: "include",
    })
      .then((res) =>
        res
          .json()
          .then(async (data) => {
            utils.handleMsg(data);
            if (res.ok) {
              await utils.wait(1000);
              location.href = `/change-passwd`;
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
}
