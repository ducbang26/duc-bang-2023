import "./styles/index.scss";

import { gsap } from "gsap";
import Lenis from "@studio-freight/lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const mainScript = () => {
  gsap.registerPlugin(ScrollTrigger);
  window.scrollTo(0, 0);

  var starfield;

  const lenis = new Lenis({
    lerp: false,
    duration: 1.6,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  const viewport = {
    w: window.innerWidth,
    h: window.innerHeight,
  };
  function updateViewportSize() {
    viewport.w = window.innerWidth;
    viewport.h = window.innerHeight;
  }
  $(window).on("resize", updateViewportSize);

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
    let loadTl = gsap.timeline({
      // paused: true,
      defaults: {
        ease: "none",
      },
      onComplete() {
        initCursor();
      },
    });
    loadTl
      .to(".loading__numbers", { x: "20vw", delay: 1, ease: "power4.inOut" })
      .to(".loading__numbers", { x: "40vw", delay: 0.5, ease: "power4.inOut" })
      .to(".loading__numbers", { x: "60vw", delay: 0.5, ease: "power4.inOut" })
      .to(".loading__numbers", { x: "80vw", delay: 0.5, ease: "power4.inOut" })
      .to(
        ".loading-overlay-block",
        {
          clipPath: "polygon(100% 0, 100% 0%, 100% 100%, 100% 100%)",
          duration: 1,
          stagger: 0.04,
          delay: 0.1,
          ease: "power1.easeIn",
        },
        ">=.5"
      )
      .to(".loading", { autoAlpha: 0, delay: 0.1, ease: "power4.inOut" });

    const numberOne = gsap.utils.toArray(".number-one span");
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

    const numberTwo = gsap.utils.toArray(".number-two span");
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
    let webglOpts;
    var webgl = null;
    var opening = document.querySelector(".projects").offsetTop;
    var canvas = document.querySelector("#starfield");
    var webglContextParams = ['webgl', 'experimental-webgl', 'webkit-3d', 'moz-webgl'];
    var webglContext = null;
    for (var index = 0; index < webglContextParams.length; index++) {
      try {
        webglContext = canvas.getContext(webglContextParams[index]);
        if (webglContext) {
          //breaking as we got our context
          webgl = true;
          break;
        }
      } catch (E) {
        console.log(E);
      }
    }

    if ($(window).width() > 768) {
      webglOpts = {
        starCount: 1500,
        follow: true,
      };
    } else {
      webglOpts = {
        starCount: 300,
        follow: false,
      };
    }
    starfield = new WebGLBackground({
      canvas: document.querySelector("#starfield"),
      button: document.querySelector('.webgl-center'),
      backgroundColor: "#020518",
      followButton: webglOpts.follow,
      starCount: webglOpts.starCount,
      starsScrollRange: [opening, 1500],
      cloudsScrollRange: [opening, 1500],
      idleIntensity: 0.1,
      clickIntensity: 0.1,
      buttonIntensity: 0.1,
    });

    console.log(starfield);
  }
  initWebGl();
  //End WebGL

  // Animation
  class homeHeroAnimate {
    constructor() {
      this.tlHero;
    }

    setup() {
      this.tlHero = gsap.timeline({
        paused: true,
        onStart: () => {},
        onComplete: () => {},
      });
    }

    play() {
      this.tlHero.play();
    }
  }
  let homeHeroAnim = new homeHeroAnimate();

  class homeProjectAnimate {
    constructor() {}

    setTrigger() {
      ScrollTrigger.create({
        trigger: ".projects",
        start: "top bottom",
        end: "bottom top",
        once: true,
        onEnter: () => {
          this.setup();
        },
      });
    }

    setup() {
      const projectBox = gsap.utils.toArray(".project-box");

      for (let i = 0; i < projectBox.length; i++) {
        gsap.set(projectBox[i], {
          z: -1000,
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
          .to(item, { z: -200, autoAlpha: 1, duration: 4, ease: "linear" })
          .to(item, { z: 1000, duration: 4, ease: "linear" })
          .to(item, { autoAlpha: 0, ease: "linear" }, "-=0.45");
      });
    }
  }

  let homeProjectAnim = new homeProjectAnimate();

  const SCRIPT = {};
  SCRIPT.homeScript = () => {
    homeHeroAnim.setup();
    homeProjectAnim.setTrigger();
  };

  SCRIPT.homeScript();
};
window.onload = mainScript;
