"use strict";

import utils from "./utils.mjs";

const display = document.getElementById("timer") as HTMLElement;
const checkLink = document.getElementById("check") as HTMLAnchorElement;

const totalSeconds = 1 * 60 * 60;

const updateDisplay = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  display.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

const countdown = async () => {
  for (let time = totalSeconds; time > 0; time--) {
    updateDisplay(time);
    await utils.wait(1000);
  }

  display.textContent = "00:00";
  display.style.backgroundColor = "#e22";
  display.style.color = "#fff";

  checkLink.textContent = "Return";
  checkLink.href = "/register";
  checkLink.style.borderColor = "#bbb";
  checkLink.style.backgroundColor = "#bbb";
  checkLink.style.color = "#fff";
};

countdown();
