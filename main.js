import "./styles/hero/hero.scss";
import "./styles/hero-caption/hero-caption.scss";

import App from "./app.js";
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

document.querySelector("#app").innerHTML = `
<div class="heading" style="height: auto">
  <div id="hero-caption" class="content-full-width text-align-center parallax-scroll-caption subtitle-padding-left no-padding-bottom">
    <div class="inner">
      <h1 class="hero-title caption-timeline">
        <span><em>Duc Bang</em></span>
        <span>Portfolio Website</span>
      </h1>
      <div class="hero-subtitle caption-timeline">
        <span>Experience the</span>
        <span>perfect blend of creativity</span>
        <span>and functionality</span>
      </div>
    </div>
  </div>
</div>

<div class="hero__wrapper">
  <div class="hero">
    <div class="hero__header">
      <h1 class="hero__title">
          A <span class="hero-color-text"> Creative Mind </span>
      </h1>
      <h1 class="hero__title">
          Knows How to do
      </h1>
      <h1 class="hero__title">
          The Right Thing
      </h1>
    </div>

    <div class="hero__gallery">
      <figure class="hero__gallery__figure">
        <img class="hero__gallery__image" src="images/hero-img/1.jpg">
      </figure>

      <figure class="hero__gallery__figure">
        <img class="hero__gallery__image" src="images/hero-img/2.jpg">
      </figure>

      <figure class="hero__gallery__figure">
        <img class="hero__gallery__image" src="images/hero-img/3.jpg">
      </figure>

      <figure class="hero__gallery__figure">
        <img class="hero__gallery__image" src="images/hero-img/4.jpg">
      </figure>

      <figure class="hero__gallery__figure">
        <img class="hero__gallery__image" src="images/hero-img/5.jpg">
      </figure>

      <figure class="hero__gallery__figure">
        <img class="hero__gallery__image" src="images/hero-img/6.jpg">
      </figure>

      <figure class="hero__gallery__figure">
        <img class="hero__gallery__image" src="images/hero-img/7.jpg">
      </figure>

      <figure class="hero__gallery__figure">
        <img class="hero__gallery__image" src="images/hero-img/8.jpg">
      </figure>

      <figure class="hero__gallery__figure">
        <img class="hero__gallery__image" src="images/hero-img/9.jpg">
      </figure>

      <figure class="hero__gallery__figure">
        <img class="hero__gallery__image" src="images/hero-img/10.jpg">
      </figure>

      <figure class="hero__gallery__figure">
        <img class="hero__gallery__image" src="images/hero-img/11.jpg">
      </figure>

      <figure class="hero__gallery__figure">
        <img class="hero__gallery__image" src="images/hero-img/12.jpg">
      </figure>
    </div>
  </div>
</div>
<div style="height: 100vh"></div>
`;

const images = document.querySelectorAll("img");
let imagesIndex = 0;

Array.from(images).forEach((element) => {
  const image = new Image();

  image.src = element.src;
  image.onload = (_) => {
    imagesIndex += 1;

    if (imagesIndex === images.length) {
      document.documentElement.classList.remove("loading");
      document.documentElement.classList.add("loaded");
    }
  };
});

new App();

gsap.registerPlugin(ScrollTrigger);

gsap.to(".hero", {
  clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
  ease: "power1.inOut",
  scrollTrigger: {
    trigger: '.hero',
    start: "top top",
    end: `+=500`,
    scrub: 1
  }
})

gsap.to(".hero__wrapper", {
  translateY: '500px',
  ease: "strong",
  scrollTrigger: {
    trigger: '.hero',
    start: "top top",
    end: `+=1000`,
    scrub: 1  
  }
})
