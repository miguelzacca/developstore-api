"use strict";

import utils from "../utils.mjs";
import config from "../config.mjs";

{
  const form = document.querySelector("form") as HTMLFormElement;

  const changePasswd = () => {
    const formData = new FormData(form);
    const jsonData = utils.formDataToJson(formData);

    const email = JSON.parse(jsonData).email;

    fetch(`${config.baseURL}/api/auth/passwd-recovery/${email}`, {
      credentials: "include",
    })
      .then((res) =>
        res
          .json()
          .then((data) => {
            if (!res.ok) {
              return utils.handleMsg(data);
            }
            utils.handleMsg({ msg: "Verify your email." });
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
