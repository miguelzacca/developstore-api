"use strict";

{
  const lists = document.querySelectorAll("section ul");
  const leftBtns = document.querySelectorAll("section .scroll-left");
  const rightBtns = document.querySelectorAll("section .scroll-right");

  const moveScroll = (list: Element, value: number) => {
    list.scrollBy({
      left: value,
      behavior: "smooth",
    });
  };

  const scrollMove = 500;

  for (const [i, leftbtn] of leftBtns.entries()) {
    leftbtn.addEventListener("click", () => {
      moveScroll(lists[i], scrollMove);
    });
  }

  for (const [i, rightbtn] of rightBtns.entries()) {
    rightbtn.addEventListener("click", () => {
      moveScroll(lists[i], -scrollMove);
    });
  }
}
