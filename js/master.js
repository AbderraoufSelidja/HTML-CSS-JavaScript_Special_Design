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


// Handle active function
function hundleActive(el) {
  el.target.parentElement.querySelector(".active").classList.remove("active");
  el.target.classList.add("active");
}
let lis = document.querySelectorAll(
  ".settings-box .settings-container .option-box:nth-child(1) li"
);
// console.log(lis);
lis.forEach((el) => {
  el.addEventListener("click", function (el) {
    // lis.forEach((el) => el.classList.remove("active"));
    // el.target.parentElement.querySelector(".active").classList.remove("active");
    // el.target.classList.add("active");
    hundleActive(el);
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
let btnsRandom = document.querySelectorAll(".random-backgrounds button");
let backgroud = document.querySelector(".landing-page .background");
let bgOption = true;
// Variable to stop setInterval
let bgClear;
if (localStorage.getItem("random")) {
  let randomLocal = localStorage.getItem("random");
  if (randomLocal === "no") {
    bgOption = false;
    // set saved background color in local storage to background element
    backgroud.style.backgroundImage = `${localStorage.getItem("background")}`;
  }
  btnsRandom.forEach((el) => {
    el.classList.remove("active");
    if (el.dataset.background === randomLocal) {
      el.classList.add("active");
    }
  });
}

btnsRandom.forEach((el) => {
  el.onclick = (btn) => {
    // Toggle active class in buttons
    hundleActive(btn);
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
      clearInterval(bgClear);
      localStorage.setItem("random", "no");
      // Save current background in local storage
      localStorage.setItem(
        "background",
        backgroud.style.getPropertyValue("background-image")
      );
      console.log(backgroud.style.getPropertyValue("background-image"));
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
  if (windowScrollY + 1 >= skillsOffsetTop) {
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

let bullets = document.querySelectorAll(".bullets .bullet");
let scrollSmothly = function (elements) {
  elements.forEach(el => {
    el.addEventListener("click", function (e) {
      document.querySelector(`.${e.target.dataset.section}`).scrollIntoView({
        behavior: "smooth",
      })
    })
  });
}

scrollSmothly(bullets);

// handle show and hide bullets


let bulletsContainer = document.querySelector(".bullets");
let btnsBullets = document.querySelectorAll(".show-bullets button");
if (localStorage.getItem("bullets")) {
  let bulletsLocal = localStorage.getItem("bullets");
  btnsBullets.forEach(bullet => {
    bullet.classList.remove("active");
  })
  if (bulletsLocal === "none") {
    bulletsContainer.style.setProperty("display", "none");
    document.querySelector(".show-bullets .no").classList.add("active");
  } else {
    document.querySelector(".show-bullets .yes").classList.add("active");
  }
}
btnsBullets.forEach(bullet => {
  bullet.addEventListener("click", function (e) {
    // toggle active class
    hundleActive(e);
    if (e.target.dataset.display === "show") {
      bulletsContainer.style.setProperty("display", "block");
      localStorage.setItem("bullets", "block");
    } else {
      bulletsContainer.style.setProperty("display", "none");
      localStorage.setItem("bullets", "none");
    }
  })
});


// Reset Options

let resetOptions = document.querySelector(".settings-box .settings-container .reset-options");
resetOptions.addEventListener("click", function () {
  localStorage.clear();
  window.location.reload();
})

// =========== Show Menu ===========

const showMenu = (toggleClass, menuClass) => {
  const toggle = document.querySelector(`.${toggleClass}`);
  menu = document.querySelector(`.${menuClass}`);
  toggle.addEventListener("click", () => {
    menu.classList.toggle('show-menu');
    toggle.classList.toggle("show-icon");
  })
}

showMenu("nav-toggle", "nav-menu");