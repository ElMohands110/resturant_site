'use strict';
/* =================== Main Variables =================== */
let btnUp = document.querySelector('.btn_up');
let btnOpenNav = document.querySelector('.open_nav');
let btnCloseNav = document.querySelector('.close_nav');
let navMenu = document.querySelector('.nav_menu');
let navbar = document.querySelector('nav');

/* =================== Menu Show (Navbar) ================== */
btnOpenNav.addEventListener('click', function() {
    navMenu.style.right = '0';
});

/* ==================== Close Button  ======================== */
btnCloseNav.addEventListener('click', function() {
    navMenu.style.right = '-100%';
});

/* =================== Change of Navbar ==================== */
window.addEventListener('scroll', function() {
    var scrollNav = window.scrollY;
    if(scrollNav >= '60') {
        btnUp.classList.remove('hidden');
        navbar.classList.add('nav_fixed');
        console.log('Hello');
    }
    else {
        btnUp.classList.add('hidden');
        navbar.classList.remove('nav_fixed');
    }
});

/* =============== slides ================= */
const slides = document.getElementById("slides");
const allSlides = document.querySelectorAll(".slide");
const slidesLength = allSlides.length;
const slideWidth = allSlides[0].offsetWidth;

let index = 0;
let posX1;
let posX2;
let initialPosition;
let finalPosition;

let canISlide = true;

const left = document.getElementById("left");
const right = document.getElementById("right");

const firstSlide = allSlides[0];
const lastSlide = allSlides[allSlides.length - 1];

const cloneFirstSlide = firstSlide.cloneNode(true);
const cloneLastSlide = lastSlide.cloneNode(true);

slides.appendChild(cloneFirstSlide);
slides.insertBefore(cloneLastSlide, firstSlide);

right.addEventListener("click", () => switchSlide("right"));
left.addEventListener("click", () => switchSlide("left"));

slides.addEventListener("transitionend", checkIndex);

slides.addEventListener("mousedown", dragStart);

slides.addEventListener("touchstart", dragStart);
slides.addEventListener("touchmove", dragMove);
slides.addEventListener("touchend", dragEnd);

function dragStart(e) {
  e.preventDefault();
  initialPosition = slides.offsetLeft;

  if (e.type == "touchstart") {
    posX1 = e.touches[0].clientX;
  } else {
    posX1 = e.clientX;

    document.onmouseup = dragEnd;
    document.onmousemove = dragMove;
  }
}

function dragMove(e) {
  if (e.type == "touchmove") {
    posX2 = posX1 - e.touches[0].clientX;
    posX1 = e.touches[0].clientX;
  } else {
    posX2 = posX1 - e.clientX;
    posX1 = e.clientX;
  }

  slides.style.left = `${slides.offsetLeft - posX2}px`;
}

function dragEnd() {
  /* 
    three possibilities:
    1. next slide
    2. prev slide
    3. stay still
    */
  finalPosition = slides.offsetLeft;
  if (finalPosition - initialPosition < (slideWidth/2)) {
    switchSlide("right", "dragging");
  } else if (finalPosition - initialPosition > (slideWidth/2)) {
    switchSlide("left", "dragging");
  } else {
    slides.style.left = `${initialPosition}px`;
  }

  document.onmouseup = null;
  document.onmousemove = null;
};

function switchSlide(arg, arg2) {
  slides.classList.add("transition");

  if (canISlide) {
    if (!arg2) {
      initialPosition = slides.offsetLeft;
    }
    if (arg == "right") {
      slides.style.left = `${initialPosition - slideWidth}px`;
      index++;
    } else {
      slides.style.left = `${initialPosition + slideWidth}px`;
      index--;
    }
  }

  canISlide = false;
}
function checkIndex() {
  slides.classList.remove("transition");

  if (index == -1) {
    slides.style.left = `-${slidesLength * slideWidth}px`;
    index = slidesLength - 1;
  }

  if (index == slidesLength) {
    slides.style.left = `-${1 * slideWidth}px`;
    index = 0;
  }

  canISlide = true;
}