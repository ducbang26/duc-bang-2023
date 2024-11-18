import "./styles/index.scss";

import { gsap } from "gsap";
import Lenis from "@studio-freight/lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from 'three';

const mainScript = () => {
  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis({
    lerp: false,
    duration: 1.6,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  lenis.scrollTo('.home__hero');

  const viewport = {
    w: window.innerWidth,
    h: window.innerHeight,
  };
  function updateViewportSize() {
    viewport.w = window.innerWidth;
    viewport.h = window.innerHeight;
  }
  $(window).on("resize", updateViewportSize);

  function calcTransform(property, value) {
    let alias = { y: "translateY", x: "translateX", z: "translateZ", rotation: "rotate" };
    return function (i, target) {
      let transform = target.style.transform; // remember the original transform
      target.style.transform = (alias[property] || property) + "(" + value + ")"; // apply the new value
      let computed = parseFloat(gsap.getProperty(target, property, property.substr(0, 3) === "rot" ? "deg" : "px", true)); // grab the pixel value
      target.style.transform = transform; // revert
      gsap.getProperty(target, property, "px", true); // reset the cache so the new value is reflected
      return computed; 
    };
  }

  const images = document.querySelectorAll("img");
  let imagesIndex = 0;
  const links = document.querySelectorAll(".cursorLink");
  const sections = document.querySelectorAll(".sectionLink");

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

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      if (!link.href) return;
      if (!link.href.includes("#")) return;

      e.preventDefault();
      scrollToSection();
    });

    function scrollToSection() {
      let id = link.href.split("#");
      sections.forEach((el) => {
        if (el.id === id[1]) lenis.scrollTo(link.getAttribute("href"));
      });
    }
  });

  const headerBtn = document.querySelector(".headerBtn");
  headerBtn.addEventListener("click", () => {
    headerBtn.classList.toggle("open");
  });
  document.addEventListener("click", (e) => {
    let check1 = e.target.closest(".header-btn");
    let check2 = e.target.closest(".header-menu");
    if (check1 == null && check2 == null) {
      headerBtn.classList.remove("open");
    }
  });

  // Cursor
  function initCursor() {
    // Sticky Cursor with delay
    // https://greensock.com/forums/topic/21161-animated-mouse-cursor/

    var posXBtn = 0;
    var posYBtn = 0;
    var mouseX = 0;
    var mouseY = 0;

    if (document.querySelector(".custom-cursor")) {
      gsap.to({}, 0.0083333333, {
        repeat: -1,
        onRepeat: function () {
          if (document.querySelector(".custom-cursor")) {
            posXBtn += (mouseX - posXBtn) / 6;
            posYBtn += (mouseY - posYBtn) / 6;
            gsap.set($(".custom-cursor"), {
              css: {
                left: posXBtn,
                top: posYBtn,
              },
            });
            gsap.set($(".custom-cursor .rotate-cursor"), {
              css: {
                rotate: (mouseX - posXBtn) / 3,
              },
            });
          }
        },
      });
    }

    $(document).on("mousemove", function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Mouse Init
    $("main").on("mousemove", function () {
      if ($(".custom-cursor").hasClass("cursor-init")) {
      } else {
        $(".custom-cursor").addClass("cursor-init");
      }
    });

    // Link Hover
    $("a").on("mouseenter", function () {
      $(".custom-cursor").addClass("cursor-hover");
    });
    $("a").on("mouseleave", function () {
      $(".custom-cursor").removeClass("cursor-hover");
    });

    // Pressed
    $("main").on("mousedown", function () {
      $(".custom-cursor").addClass("pressed");
    });
    $("main").on("mouseup", function () {
      $(".custom-cursor").removeClass("pressed");
    });

    // Work Case Hover
    $(".project-box").on("mouseenter", function () {
      $(".custom-cursor").addClass("cursor-work");
    });
    $(".project-box").on("mouseleave", function () {
      $(".custom-cursor").removeClass("cursor-work");
    });

    // Home Header Rotate
    $(".home__hero").on("mousemove", function () {
      if ($(".custom-cursor").hasClass("cursor-tiles")) {
      } else {
        $(".custom-cursor").addClass("cursor-tiles");
      }
    });
    $(".home__hero").on("mouseleave", function () {
      $(".custom-cursor").removeClass("cursor-tiles");
    });
  }
  // End-Cursor

  // Loading
  function initLoading() {
    const element = document.querySelector('.loading__numbers').getBoundingClientRect();
    const elementWidth = element.width;

    let loadTl = gsap.timeline({
      defaults: {
        ease: "none",
      },
      onComplete() {
        initCursor();
        homeHeroAnim.play();
      },
    });
    
    loadTl
      .to(".loading__numbers", { x: calcTransform("x", `calc(${elementWidth}px + 1rem)`), delay: 1, ease: "power4.inOut" })
      .to(".loading__numbers", { x: calcTransform("x", `calc(${elementWidth * 2}px + 2rem)`), delay: 0.5, ease: "power4.inOut" })
      .to(".loading__numbers", { x: calcTransform("x", `calc(${elementWidth * 3}px + 3rem)`), delay: 0.5, ease: "power4.inOut" })
      .to(".loading__numbers", { x: calcTransform("x", `calc(${elementWidth * 4}px + 4rem)`), delay: 0.5, ease: "power4.inOut" })
      .to(".loading__numbers", { x: calcTransform("x", `calc(${elementWidth * 5}px + 5rem)`), delay: 0.5, ease: "power4.inOut" })
      .to(".hero__title-letter", { x: 0, duration: 0.8, delay: 0.7, ease: "power2.inOut" })
      .to(".loading", { autoAlpha: 0, ease: "power4.inOut" }, '-=0.7');

    const numberOne = gsap.utils.toArray(".number-one div");
    numberOne.forEach((element, index) => {
      let counterTl = gsap.timeline({
        defaults: {
          ease: "none",
        },
        delay: 0.1,
      });
      counterTl
        .to(element, { xPercent: 100, delay: index, ease: "power4.inOut" }, 0)
        .to(element, { x: "10vw", delay: index + 1, ease: "power4.inOut" }, 0);
    });

    const numberTwo = gsap.utils.toArray(".number-two div");
    numberTwo.forEach((element, index) => {
      let counterTl = gsap.timeline({
        defaults: {
          ease: "none",
        },
        delay: 0.1,
      });
      counterTl
        .to(element, { xPercent: 100, delay: index, ease: "power4.inOut" }, 0)
        .to(element, { x: "10vw", delay: index + 1, ease: "power4.inOut" }, 0);
    });
  }

  initLoading();
  // End Loading

  //WebGl
  function initWebGl() {
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.querySelector('.projects-bg').appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(2, 2);
    const uniforms = {
      iTime: { value: 0 },
      iResolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      }
    }

    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: document.getElementById('vertexShader').textContent,
      fragmentShader: document.getElementById('fragmentShader').textContent,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let lastTime = 0;
    function animated(time) {
      const deltaTime = time - lastTime;
      lastTime = time;
      uniforms.iTime.value += deltaTime * 0.001;
      renderer.render(scene, camera);

      requestAnimationFrame(animated);
    }

    animated(0);

    window.addEventListener('resize', () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      uniforms.iResolution.value.set(width, height);
    });
  }
  //End WebGL

  // Animation
  class homeHeroAnimate {
    constructor() {
      this.tlHero;
      this.tlOverlapAnim;
    }

    setup() {
      this.tlHero = gsap.timeline({
        paused: true,
        onStart: () => {
          this.overlapAnim();
        },
        onComplete: () => {},
      });

      this.tlHero.to(".sec-nav", { opacity: 1, duration: 1.2, ease: 'power3.inOut' })
      .to(".home__hero-title", { backgroundColor: '#0e0e0e1a', ease: 'power3.inOut' }, '-=0.6');
    }

    overlapAnim() {
      this.tlOverlapAnim = gsap.timeline({
        scrollTrigger: {
            trigger: '.home__hero-title',
            start: `top+=${viewport.h * .3} top`,
            end: 'bottom 30%',
            scrub: .5,
        }
      })
      this.tlOverlapAnim
      .to('.home__heroShowReel', { opacity: 0, duration: 1, ease: 'none' })
      .to(".hero__title-letter", { xPercent: -100, opacity: 0, ease: 'none' }, "<")
    }

    play() {
      this.tlHero.play();
    }
  }
  let homeHeroAnim = new homeHeroAnimate();

  class homeProjectAnimate {
    constructor() {
      this.headlineAnim;
    }

    setTrigger() {
      ScrollTrigger.create({
        trigger: ".home__projects",
        start: "top bottom",
        end: "bottom top",
        once: true,
        onEnter: () => {
          this.setup();
        },
      });
    }

    setup() {
      const firstWords = new SplitType('.first-words', {types: 'words, chars', charClass: 'headline-char'});
      const secondWords = new SplitType('.second-words', {types: 'words, chars', charClass: 'headline-char'});
      const projectBox = gsap.utils.toArray(".project-box");

      gsap.set('.first-words', { opacity: 1 });
      gsap.set('.second-words', { opacity: 1 });

      this.headlineAnim = gsap.timeline({
        scrollTrigger: {
            trigger: '.headline',
            start: `top+=${viewport.h * .4} top`,
            end: '90% 70%',
            scrub: true,
        }
      })
      this.headlineAnim
      .to(firstWords.chars, { translateY: '0px', translateZ: '0px', rotate: '0deg', opacity: 1, ease: 'none', stagger: 0.03 })
      .to('.first-words', { opacity: 0, duration: 2, ease: 'none' })
      .to(secondWords.chars, { translateY: '0px', translateZ: '0px', rotate: '0deg', opacity: 1, ease: 'none', stagger: 0.03 })
      .to('.second-words', { opacity: 0, duration: 2, ease: 'none' })

      for (let i = 0; i < projectBox.length; i++) {
        gsap.set(projectBox[i], {
          z: -5000,
          autoAlpha: 0,
        });
      }

      const tlAnim = gsap.timeline({
        scrollTrigger: {
          trigger: ".projects",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      projectBox.forEach((item) => {
        tlAnim
          .to(item, { autoAlpha: 1, ease: "none" })
          .to(item, { z: 500, duration: 4, ease: "linear" }, "<")
          .to(item, { autoAlpha: 0, ease: "linear" }, "-=0.45");
      });

      initWebGl();
    }
  }

  let homeProjectAnim = new homeProjectAnimate();

  const SCRIPT = {};
  SCRIPT.homeScript = () => {
    lenis.scrollTo('.home__hero');

    homeHeroAnim.setup();
    homeProjectAnim.setTrigger();
  };

  SCRIPT.homeScript();
};
window.onload = mainScript;
