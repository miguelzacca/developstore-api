"use strict";

import utils from "./utils.mjs";

const display = document.getElementById("timer") as HTMLElement;
const checkLink = document.getElementById("check") as HTMLAnchorElement;

const totalSeconds = Number(localStorage.getItem("_timer")) || 1 * 60 * 60;

const updateDisplay = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  display.textContent = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;
};

const countdown = async () => {
  for (let time = totalSeconds; time >= 0; time--) {
    localStorage.setItem("_timer", String(time));
    if (time === 0) {
      break;
    }
    updateDisplay(time);
    await utils.wait(1000);
  }

  display.textContent = "00:00";
  display.style.backgroundColor = "#aaa";
  display.style.color = "#fff";

  checkLink.classList.add("disable");
  checkLink.textContent = "Return";
  checkLink.href = "/register";
};

countdown();
