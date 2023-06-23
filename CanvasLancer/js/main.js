"use strict";

let burger = document.querySelector(".burger");
let mobile_menu_div = document.querySelector(".burger-menu-div");
let x = document.querySelector(".x");

burger.addEventListener("click", () => {
  mobile_menu_div.classList.toggle("block");
  mobile_menu_div.classList.add("open");
  mobile_menu_div.classList.remove("close");
});
x.addEventListener("click", () => {
  mobile_menu_div.classList.toggle("block");
  mobile_menu_div.classList.remove("open");
  mobile_menu_div.classList.add("close");
});
