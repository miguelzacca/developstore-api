"use strict";

import { IObjFromFormData, PublicData } from "../../types/global";

class Utils {
  private _animeMsg = async (display: Element) => {
    display.classList.toggle("msg-anime");
    await this.wait(5000);
    display.classList.toggle("msg-anime");
  };

  public wait = (ms: number) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  };

  public formDataToJson = (formData: FormData) => {
    const obj: IObjFromFormData = {};
    for (const [key, value] of formData) {
      obj[key] = value;
    }
    return JSON.stringify(obj);
  };

  public handleMsg = async (data: PublicData) => {
    const display = document.getElementById("msg");

    if (!display) {
      return;
    }

    if ("msg" in data) {
      display.textContent = data.msg;
      await this._animeMsg(display);
      return;
    }

    const dir = data.zod.issues[0];
    display.textContent = `${dir.path}: ${dir.message}`;
    this._animeMsg(display);
  };
}

export default new Utils();
