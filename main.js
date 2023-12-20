import "./styles/hero/hero.scss";
import "./styles/hero-caption/hero-caption.scss";

import App from "./app.js";
import { gsap } from "gsap";
import Lenis from '@studio-freight/lenis';
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
<div style="height: 100vh"></div>
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

const lenis = new Lenis({
  lerp: 0.1,
  duration: 1.5,
  smoothTouch: true
});

function raf(time) {
  lenis.raf(time * 1000);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline();

tl.from(".caption-timeline span", {
  duration: 1,
  y: "100%",
  opacity: 0,
  ease: "power3.out",
  delay: .7,
  stagger: {
    amount: 0.3
  }
})

gsap.to(".hero", {
  clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
  ease: "power1.inOut",
  scrollTrigger: {
    trigger: '.hero',
    start: "top top",
    pin: true,
    end: `+=700`,
    scrub: 1
  }
})

gsap.to(".parallax-scroll-caption", {
  translate: '0% 5%',
  opacity: 0.5,
  ease: "power1.inOut",
  duration: .5,
  scrollTrigger: {
    trigger: '.parallax-scroll-caption',
    start: "top top",
    end: "60%",
    scrub: 1,
  }
})

gsap.utils.toArray(".hero__title").forEach(function (elem) {
  ScrollTrigger.create({
    trigger: elem,
    start: "top 300px",
    end: "bottom top",
    markers: true,
    onEnter: function () {
      gsap.fromTo(
        elem,
        { y: 100, autoAlpha: 0 },
        {
          duration: 1.25,
          y: 0,
          autoAlpha: 1,
          ease: "back",
          // overwrite: "auto"
        }
      );
    },
    // onLeave: function () {
    //   gsap.fromTo(elem, { autoAlpha: 1 }, { autoAlpha: 0, overwrite: "auto" });
    // },
    // onEnterBack: function () {
    //   gsap.fromTo(
    //     elem,
    //     { y: -100, autoAlpha: 0 },
    //     {
    //       duration: 1.25,
    //       y: 0,
    //       autoAlpha: 1,
    //       ease: "back",
    //       overwrite: "auto"
    //     }
    //   );
    // },
    // onLeaveBack: function () {
    //   gsap.fromTo(elem, { autoAlpha: 1 }, { autoAlpha: 0, overwrite: "auto" });
    // }
  });
});

