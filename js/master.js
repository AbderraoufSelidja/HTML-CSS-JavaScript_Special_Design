let content = document.querySelector(".content");
content.onclick = function (el) {
  if (document.querySelector(".settings-box").classList.contains("open")) {
    document.querySelector(".settings-box").classList.remove("open");
    document.querySelector(".icon").classList.toggle("fa-spin");
  }
};
// Toggle Spin Class On Icon
document
  .querySelector(".icon-container")
  .addEventListener("click", function () {
    document.querySelector(".icon").classList.toggle("fa-spin");
    this.parentElement.classList.toggle("open");
  });

//   -------------------Colors Option

let lis = document.querySelectorAll(
  ".settings-box .settings-container .option-box:nth-child(1) li"
);
// console.log(lis);
lis.forEach((el) => {
  el.addEventListener("click", function (el) {
    // lis.forEach((el) => el.classList.remove("active"));
    el.target.parentElement.querySelector(".active").classList.remove("active");
    el.target.classList.add("active");
    let currentColor = el.target.dataset.color;
    document.documentElement.style.setProperty("--main-color", currentColor);
    // Add currentColor to local storage
    localStorage.setItem("color", currentColor);
  });
});

// Check if there is a color in local storage

if (localStorage.getItem("color")) {
  let color = localStorage.getItem("color");
  document.documentElement.style.setProperty("--main-color", color);
  lis.forEach((el) => {
    el.classList.remove("active");
    if (el.dataset.color === color) {
      el.classList.add("active");
    }
  });
}
// -----------------------Random background option
let btns = document.querySelectorAll(".option-box:nth-child(2) button");
let bgOption = true;
// Variable to stop setInterval
let bgClear;
let backgroud = document.querySelector(".landing-page .background");
if (localStorage.getItem("random")) {
  let desicion = localStorage.getItem("random");
  if (desicion === "no") {
    bgOption = false;
    // set saved background color in local storage to background element
    backgroud.style.backgroundImage = `${localStorage.getItem("background")}`;
  }
  btns.forEach((el) => {
    el.classList.remove("active");
    if (el.dataset.background === desicion) {
      el.classList.add("active");
    }
  });
}

btns.forEach((el) => {
  el.onclick = (btn) => {
    // Toggle active class in buttons
    btns.forEach((el) => el.classList.remove("active"));
    btn.target.classList.add("active");
    if (btn.target.dataset.background === "yes") {
      bgOption = true;
      randomizeImages();
      // save user desicion in local storage
      localStorage.setItem("random", "yes");
      // check if there is background in local storage then remove it
      if (localStorage.getItem("background")) {
        localStorage.removeItem("background");
      }
    } else {
      // bgOption = false;
      clearInterval(bgClear);
      localStorage.setItem("random", "no");
      // Save current background in local storage
      localStorage.setItem(
        "background",
        backgroud.style.getPropertyValue("background-image")
      );
    }
  };
});
// Change Background Randomly every 5 seconds

let imgsArray = [
  "background1.jpg",
  "background2.jpg",
  "background3.jpg",
  "background4.jpg",
  "background5.jpg",
  "background6.jpg",
  "background7.jpg",
  "background8.jpg",
];
function randomizeImages() {
  if (bgOption) {
    bgClear = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * imgsArray.length);
      backgroud.style.backgroundImage = `url("imgs/${imgsArray[randomNumber]}")`;
    }, 5000);
  }
}
randomizeImages();

// ------------Progress fill effect

let ourSkills = document.querySelector(".skills");
window.onscroll = function () {
  // skills offset top
  let skillsOffsetTop = ourSkills.offsetTop;
  // console.log(skillsOffsetTop)
  // skills height
  let skillsHeight = ourSkills.offsetHeight;
  // console.log(skillsHeight);
  // console.log(`la some : ${skillsOffsetTop + skillsHeight}`);
  // window height
  let windowInnerHeight = this.innerHeight;
  // console.log(windowInnerHeight);
  // window scroll top
  let windowScrollY = this.scrollY;
  // console.log(windowScrollY);
  // console.log(`la some : ${windowScrollY + windowInnerHeight}`);
  let spans = document.querySelectorAll(".skills .skill span");
  if (windowScrollY > skillsOffsetTop) {
    spans.forEach((span) => {
      span.style.width = span.dataset.progress;
    });
  } else if (windowScrollY + windowInnerHeight < skillsOffsetTop) {
    spans.forEach((span) => {
      span.style.width = 0;
    });
  }
};

// Images Popup

let imgs = document.querySelectorAll(".gallery img");

imgs.forEach((img) => {
  img.addEventListener("click", function () {
    // create and append popup overlay to body
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);
    // create and append popup image
    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";
    let imgContainer = document.createElement("div");
    let popupImg = document.createElement("img");
    popupImg.src = img.src;
    imgContainer.className = "img-container";
    imgContainer.appendChild(popupImg);
    popupBox.appendChild(imgContainer);
    document.body.appendChild(popupBox);
    // create and append heading
    if (img.alt !== null) {
      let heading = document.createElement("h3");
      heading.textContent = img.alt;
      popupBox.prepend(heading);
    }
    // create and append close button
    let closeButton = document.createElement("span");
    let closeButtonText = document.createTextNode("x");
    closeButton.appendChild(closeButtonText);
    closeButton.className = "close-button";
    popupBox.prepend(closeButton);
  });
});

// Close popup

document.addEventListener("click", function (e) {
  if (e.target.className === "close-button") {
    e.target.parentElement.remove();
    document.querySelector(".popup-overlay").remove();
  }
})