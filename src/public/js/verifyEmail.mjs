"use strict";

import { wait } from "./utils.mjs";

{
  const display = document.getElementById("timer");
  const checkLink = document.getElementById("check");

  let time = 1 * 60 * 60 - 1;

  const startCountdown = async () => {
    while (time > 0) {
      updateDisplay(time);
      await wait(1000);
      time--;
    }

    updateDisplay(0);

    Object.assign(display.style, {
      backgroundColor: "#e22",
      color: "#fff",
    });

    checkLink.textContent = "Return";
    checkLink.href = "/register";

    Object.assign(checkLink.style, {
      borderColor: "#bbb",
      backgroundColor: "#bbb",
      color: "#fff",
    });
  };

  const updateDisplay = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;

    display.textContent = formattedTime;
  };

  startCountdown();
}
