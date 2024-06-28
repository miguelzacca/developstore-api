"use strict";

import { IObjFromFormData, IObjKey } from "../../types/global";

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

  public handleMsg = (data: IObjKey) => {
    const display = document.getElementById("msg") as HTMLElement;
    display.textContent = data.msg || data.zod;
    this._animeMsg(display);
  };
}

export default new Utils();
