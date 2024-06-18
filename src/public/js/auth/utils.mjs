"use strict";

const animeMsg = async (display) => {
  display.classList.toggle("msg-anime");
  await wait(5000);
  display.classList.toggle("msg-anime");
};

export const wait = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const formDataToJson = (formData) => {
  const obj = {};
  for (const [key, value] of formData) {
    obj[key] = value;
  }
  return JSON.stringify(obj);
};

export const handleMsg = async (data) => {
  const display = document.getElementById("msg");

  const msg = data.msg || data.zod;

  if (!msg.issues) {
    display.textContent = msg;
    await animeMsg(display);
    return;
  }

  const dir = msg.issues[0];
  display.textContent = `${dir.path}: ${dir.message}`;
  animeMsg(display);
};
