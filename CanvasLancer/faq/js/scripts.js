/*!
 * Start Bootstrap - Clean Blog v6.0.9 (https://startbootstrap.com/theme/clean-blog)
 * Copyright 2013-2023 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-clean-blog/blob/master/LICENSE)
 */
window.addEventListener("DOMContentLoaded", () => {
  let scrollPos = 0;
  const mainNav = document.getElementById("mainNav");
  const headerHeight = mainNav.clientHeight;
  window.addEventListener("scroll", function () {
    const currentTop = document.body.getBoundingClientRect().top * -1;
    if (currentTop < scrollPos) {
      // Scrolling Up
      if (currentTop > 0 && mainNav.classList.contains("is-fixed")) {
        mainNav.classList.add("is-visible");
      } else {
        console.log(123);
        mainNav.classList.remove("is-visible", "is-fixed");
      }
    } else {
      // Scrolling Down
      mainNav.classList.remove(["is-visible"]);
      if (
        currentTop > headerHeight &&
        !mainNav.classList.contains("is-fixed")
      ) {
        mainNav.classList.add("is-fixed");
      }
    }
    scrollPos = currentTop;
  });
});

onload = GetData;
async function GetData() {
  let div = document.querySelector(".post-preview");

  let response = await fetch(
    `https://auth-admin-319e0-default-rtdb.firebaseio.com/faq.json`
  );

  let data = await response.json();

  let faq = [];

  for (let key in data) {
    data[key].id = key;
    faq.push(data[key]);
  }

  let content = "";

  faq.forEach((item) => {
    content += `
    <a href="#">
    <h2 class="post-title">${item.question}</h2>
    <h3 class="post-subtitle">${item.answer}</h3>
</a>
<div><img class='back-img' src='${item.img}'/></div>
<p class="post-meta">
    ${item.date}
</p>
        `;
  });

  div.innerHTML = content;
}
