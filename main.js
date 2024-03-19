import "./styles/index.scss";

import { gsap } from "gsap";
import Lenis from "@studio-freight/lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

document.querySelector("#app").innerHTML = `
  

`;

gsap.registerPlugin(ScrollTrigger);

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

const lenis = new Lenis({
  smoothWheel: true,
  duration: 2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

initScript();

function initScript() {
  pageTransition();
  initMarqueeAnimation();
  initStickyCursorWithDelay();
}

function pageTransition() {
  var tl = gsap.timeline();

  tl.from(".caption-timeline span", {
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
    one: 10,
    two: 10,
    three: 50,
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
            clipPath: `inset(${clipValue.one}% ${clipValue.two}% round ${clipValue.three}px)`,
          });
        },
      },
      "<"
    );

  gsap.to(".headline-content", {
    transform: "translate(0px, 0px)",
    ease: "power1.inOut",
    duration: 0.7,
    opacity: 1,
    scrollTrigger: {
      trigger: ".headline-content",
      start: "center bottom",
      end: "center 10%",
      toggleActions: "play reverse play reverse",
    },
  });

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

//marquee section
function initMarqueeAnimation() {
  let currentScroll = 0;
  let isScrollingDown = true;
  let arrow = document.querySelectorAll(".arrow");

  let tween = gsap
    .to(".marquee-part", {
      xPercent: -100,
      repeat: -1,
      duration: 5,
      ease: "linear",
    })
    .totalProgress(0.5);

  gsap.set(".marquee-inner", { xPercent: -50 });

  window.addEventListener("scroll", () => {
    if (window.scrollY > currentScroll) {
      isScrollingDown = true;
    } else {
      isScrollingDown = false;
    }

    gsap.to(tween, {
      timeScale: isScrollingDown ? 1 : -1,
    });

    arrow.forEach((item) => {
      if (isScrollingDown) {
        item.classList.remove("active");
      } else {
        item.classList.add("active");
      }
    });

    currentScroll = window.scrollY;
  });
}

function initStickyCursorWithDelay() {
  // Sticky Cursor with delay
  // https://greensock.com/forums/topic/21161-animated-mouse-cursor/

  var posXBtn = 0;
  var posYBtn = 0;
  var posXImage = 0;
  var posYImage = 0;
  var mouseX = 0;
  var mouseY = 0;

  if (document.querySelector(".custom-cursor, .mouse-pos-list-image")) {
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
        if (document.querySelector(".mouse-pos-list-image")) {
          posXImage += (mouseX / 4 - posXImage) / 6;
          posYImage += (mouseY - posYImage) / 6;
          gsap.set($(".mouse-pos-list-image"), {
            css: {
              left: posXImage,
              top: posYImage,
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

  // Archive Preview Hover
  $(".lab-preview").on("mouseenter", function () {
    $(".custom-cursor").addClass("cursor-lab");
  });
  $(".lab-preview").on("mouseleave", function () {
    $(".custom-cursor").removeClass("cursor-lab");
  });

  // // Jobs Preview Hover
  // $('.single-job').on('mouseenter', function() {
  //   $('.custom-cursor').addClass('cursor-job');
  // });
  // $('.single-job').on('mouseleave', function() {
  //   $('.custom-cursor').removeClass('cursor-job');
  // });
  // $('.single-job .btn-click').on('mouseenter', function() {
  //   $('.custom-cursor').addClass('cursor-job-tiny');
  // });
  // $('.single-job .btn-click').on('mouseleave', function() {
  //   $('.custom-cursor').removeClass('cursor-job-tiny');
  // });

  // Home Header Rotate
  $(".home-header").on("mousemove", function () {
    if ($(".custom-cursor").hasClass("cursor-tiles")) {
    } else {
      $(".custom-cursor").addClass("cursor-tiles");
    }
  });
  $(".home-header").on("mouseleave", function () {
    $(".custom-cursor").removeClass("cursor-tiles");
  });

  // Service + Collective Image
  $(".mouse-pos-list-image-hover").on("mouseenter", function () {
    $(".mouse-pos-list-image").addClass("active");
  });
  $(".mouse-pos-list-image-hover").on("mouseleave", function () {
    $(".mouse-pos-list-image").removeClass("active");
  });

  $(".mouse-pos-list-image-ul li").on("mouseenter mouseleave", function () {
    var index = $(this).index();
    $(".mouse-pos-list-image-ul, .mouse-pos-list-image").each(function () {
      $("li", this).eq(index).siblings().removeClass("active");
      $("li", this).eq(index).addClass("active");
    });
  });

  $(".collective-ul li").on("mouseenter", function () {
    $(".fixed-cursor-wrap").addClass("inactive");
  });
  $(".collective-ul li").on("mouseleave", function () {
    $(".fixed-cursor-wrap").removeClass("inactive");
  });

  // Single Vimeo
  $(".video-hover").on("mouseenter", function () {
    $(".custom-cursor").addClass("cursor-video");
  });
  $(".video-hover").on("mouseleave", function () {
    $(".custom-cursor").removeClass("cursor-video");
  });
  $(".video-hover .vimeo-control-play").on("mouseenter", function () {
    $(".custom-cursor").addClass("cursor-video-play");
    $(".custom-cursor").removeClass("cursor-video-pause");
  });
  $(".video-hover .vimeo-control-pause").on("mouseenter", function () {
    $(".custom-cursor").addClass("cursor-video-pause");
    $(".custom-cursor").removeClass("cursor-video-play");
  });
}
