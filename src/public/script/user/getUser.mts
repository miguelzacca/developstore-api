"use strict";

import config from "../config.mjs";

{
  fetch(`${config.baseURL}/api/user`, {
    credentials: "include",
  })
    .then((res) => {
      if (!res.ok) {
        location.href = "/login";
      }
    })
    .catch((err) => console.error(err));
}
