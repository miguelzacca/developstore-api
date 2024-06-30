"use strict";

import config from "../config.mjs";

fetch(`${config.baseURL}/api/user`, {
  credentials: "include",
})
  .then((res) => {
    if (!res.ok) {
      return location.href = "/login";
    }
    const main = document.querySelector("main") as HTMLElement;
    main.textContent = "SUCCESS";
  })
  .catch((err) => console.error(err));
