"use strict";

{
  fetch("http://127.0.0.1:8000/user", {
    credentials: "include",
  })
    .then((res) => {
      if (!res.ok) {
        location.href = "/login";
      }
    })
    .catch((err) => console.error(err));
}
