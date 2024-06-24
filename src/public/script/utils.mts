"use strict";

import { IObjFromFormData, PublicData } from "../../types/global";

const animeMsg = async (display: Element) => {
  display.classList.toggle("msg-anime");
  await wait(5000);
  display.classList.toggle("msg-anime");
};

export const wait = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const formDataToJson = (formData: FormData) => {
  const obj: IObjFromFormData = {};
  for (const [key, value] of formData) {
    obj[key] = value;
  }
  return JSON.stringify(obj);
};

export const handleMsg = async (data: PublicData) => {
  const display = document.getElementById("msg");

  if (!display) {
    return;
  }

  if ("msg" in data) {
    display.textContent = data.msg;
    await animeMsg(display);
    return;
  }

  const dir = data.zod.issues[0];
  display.textContent = `${dir.path}: ${dir.message}`;
  animeMsg(display);
};
