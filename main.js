import "./styles/index.scss";

import { gsap } from "gsap";
import Lenis from "@studio-freight/lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const mainScript = () => {
  gsap.registerPlugin(ScrollTrigger);
  window.scrollTo(0, 0);

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

  // Animation
  class homeHeroAnimate {
    tlHero;

    constructor() {
      this.tlHero;
    }

    setup() {
      this.tlHero = gsap.timeline({
        paused: true,
        onStart: () => {},
        onComplete: () => {},
      });

      // this.tlHero
      //   .from(".caption-timeline span span", {
      //     duration: 1,
      //     y: "100%",
      //     opacity: 0,
      //     ease: "power3.out",
      //     delay: 0.7,
      //     stagger: {
      //       amount: 0.3,
      //     },
      //   })
      //   .from(".video-wrapper", {
      //     duration: 1,
      //     y: "5%",
      //     opacity: 0,
      //     ease: "power3.out",
      //     stagger: {
      //       amount: 0.3,
      //     },
      //   });

      // let clipValue = {
      //   one: 35,
      //   two: 3,
      // };

      // gsap
      //   .timeline({
      //     scrollTrigger: {
      //       trigger: ".video-wrapper",
      //       start: `center center`,
      //       end: "+=700",
      //       pin: true,
      //       scrub: true,
      //     },
      //   })
      //   .to(
      //     clipValue,
      //     {
      //       duration: 1,
      //       one: 0,
      //       two: 0,
      //       three: 0,
      //       onUpdate: () => {
      //         gsap.set(".hero__video", {
      //           clipPath: `inset(${clipValue.one}% round ${clipValue.two}rem)`,
      //         });
      //       },
      //     },
      //     "<"
      //   );
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
      const projectBoxImage = gsap.utils.toArray(".project-box-image");
      const projectBoxNumber = gsap.utils.toArray(".project-box-number");

      projectBoxNumber.forEach((item) => {
        gsap.to(item, {
          translate: "0% -30%",
          ease: "power2.inOut",
          duration: 1,
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });

      projectBoxImage.forEach((item) => {
        gsap.to(
          item,
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            ease: "power4.out",
            duration: 1.5,
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              end: "bottom center",
            },
          },
          "-=1"
        );
      });
    }
  }

  let homeProjectAnim = new homeProjectAnimate();

  // initScript();

  // function initScript() {
  //   pageTransition();
  // }

  function pageTransition() {
    var tl = gsap.timeline();

    tl.from(".caption-timeline span span", {
      duration: 1,
      y: "100%",
      opacity: 0,
      ease: "power3.out",
      delay: 0.7,
      stagger: {
        amount: 0.3,
      },
    }).from(".video-wrapper", {
      duration: 1,
      y: "5%",
      opacity: 0,
      ease: "power3.out",
      stagger: {
        amount: 0.3,
      },
    });

    let clipValue = {
      one: 35,
      two: 3,
    };

    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".video-wrapper",
          start: `center center`,
          end: "+=700",
          pin: true,
          scrub: true,
        },
      })
      .to(
        clipValue,
        {
          duration: 1,
          one: 0,
          two: 0,
          three: 0,
          onUpdate: () => {
            gsap.set(".hero__video", {
              clipPath: `inset(${clipValue.one}% round ${clipValue.two}rem)`,
            });
          },
        },
        "<"
      );

    const projectBoxNumber = gsap.utils.toArray(".project-box-number");

    projectBoxNumber.forEach((item) => {
      gsap.to(item, {
        translate: "0% -30%",
        ease: "power2.inOut",
        duration: 1,
        scrollTrigger: {
          trigger: item,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    });

    const projectBoxImage = gsap.utils.toArray(".project-box-image");

    projectBoxImage.forEach((item) => {
      gsap.to(
        item,
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "power4.out",
          duration: 1.5,
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            end: "bottom center",
          },
        },
        "-=1"
      );
    });
  }
};
window.onload = mainScript;
