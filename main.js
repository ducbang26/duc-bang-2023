import "./styles/index.scss";

import { gsap } from "gsap";
import Lenis from "@studio-freight/lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

document.querySelector("#app").innerHTML = `
  
<div class="heading home-header" style="height: auto">
  <div id="hero-caption"
    class="content-full-width text-align-center parallax-scroll-caption subtitle-padding-left no-padding-bottom">
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

<div class="custom-cursor no-select cursor-init pressed">
  <div class="overlay cursor-tiles-inner">
    <span>
      <div class="rotate-cursor">Scroll <svg height="47"
          viewBox="0 0 64 47" width="64" xmlns="http://www.w3.org/2000/svg">
          <g fill-rule="evenodd" transform="translate(.321569 .725586)">
            <path
              d="m36.8278451 45.6240234c.970052 0 9.7773437-7.6040039 26.421875-22.8120117l-16.8408204-22.8120117 3.5699849 22.8120117c-9.7374118 15.2080078-14.1210916 22.8120117-13.1510395 22.8120117z">
            </path>
            <path d="m56.1767578 21.3847656v2.0036621l-56.17341143 1.9235835-.00334637-7.0173335z"
              fill-rule="nonzero"></path>
          </g>
        </svg></div>
    </span>
  </div>
  <div class="overlay cursor-work-inner">
    <span>
      <div class="rotate-cursor" style="transform: rotate(1.51582e-13deg);">View <svg height="47" viewBox="0 0 64 47"
          width="64" xmlns="http://www.w3.org/2000/svg">
          <g fill-rule="evenodd" transform="translate(.321569 .725586)">
            <path
              d="m36.8278451 45.6240234c.970052 0 9.7773437-7.6040039 26.421875-22.8120117l-16.8408204-22.8120117 3.5699849 22.8120117c-9.7374118 15.2080078-14.1210916 22.8120117-13.1510395 22.8120117z">
            </path>
            <path d="m56.1767578 21.3847656v2.0036621l-56.17341143 1.9235835-.00334637-7.0173335z"
              fill-rule="nonzero"></path>
          </g>
        </svg></div>
    </span>
  </div>
  <div class="overlay cursor-lab-inner">
    <span>
      <div class="rotate-cursor" style="transform: rotate(1.51582e-13deg);">Archive <svg height="47"
          viewBox="0 0 64 47" width="64" xmlns="http://www.w3.org/2000/svg">
          <g fill-rule="evenodd" transform="translate(.321569 .725586)">
            <path
              d="m36.8278451 45.6240234c.970052 0 9.7773437-7.6040039 26.421875-22.8120117l-16.8408204-22.8120117 3.5699849 22.8120117c-9.7374118 15.2080078-14.1210916 22.8120117-13.1510395 22.8120117z">
            </path>
            <path d="m56.1767578 21.3847656v2.0036621l-56.17341143 1.9235835-.00334637-7.0173335z"
              fill-rule="nonzero"></path>
          </g>
        </svg></div>
    </span>
  </div>
  <div class="overlay cursor-job-inner">
    <span>
      <div class="rotate-cursor" style="transform: rotate(1.51582e-13deg);">More info</div>
    </span>
  </div>
  <div class="custom-cursor-inner custom-cursor-span-video">
    <div class="play"><svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 7.5V0L6.5 3.75L13 7.5L6.5 11.25L0 15V7.5Z" fill="#1C1D23"></path>
      </svg>
    </div>
    <div class="pause"><svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" width="3" height="15" fill="#1C1D23"></rect>
        <rect x="9" width="3" height="15" fill="#1C1D23"></rect>
      </svg>
    </div>
  </div>
</div>

<div class="mouse-pos-list-image mouse-pos-list-service no-select">
  <li class="overlay mouse-pos-list-image-inner">
    <div class="overlay overlay-image">
      <div class="overlay overlay-image-inner active-image lazy entered loaded"
        style="opacity: 1; background-position: center center; background-repeat: no-repeat; background-size: cover; background-image: url(&quot;https://www.graphichunters.com/media/pages/home/4a34fb0126-1658411318/02-720x720-crop-1-q72.jpg&quot;);"
        data-bg="https://www.graphichunters.com/media/pages/home/4a34fb0126-1658411318/02-720x720-crop-1-q72.jpg"
        data-ll-status="loaded"></div>
    </div>
  </li>
  <li class="overlay mouse-pos-list-image-inner">
    <div class="overlay overlay-image">
      <div class="overlay overlay-image-inner active-image lazy entered loaded"
        style="opacity: 1; background-position: center center; background-repeat: no-repeat; background-size: cover; background-image: url(&quot;https://www.graphichunters.com/media/pages/home/a08bef3cc1-1658411327/otw-2-720x720-crop-1-q72.jpg&quot;);"
        data-bg="https://www.graphichunters.com/media/pages/home/a08bef3cc1-1658411327/otw-2-720x720-crop-1-q72.jpg"
        data-ll-status="loaded"></div>
    </div>
  </li>
  <li class="overlay mouse-pos-list-image-inner active">
    <div class="overlay overlay-image">
      <div class="overlay overlay-image-inner active-image lazy entered loaded"
        style="opacity: 1; background-position: center center; background-repeat: no-repeat; background-size: cover; background-image: url(&quot;https://www.graphichunters.com/media/pages/home/caef95186b-1658411320/cw5rgehwqaaqvfd-720x720-crop-1-q72.jpg&quot;);"
        data-bg="https://www.graphichunters.com/media/pages/home/caef95186b-1658411320/cw5rgehwqaaqvfd-720x720-crop-1-q72.jpg"
        data-ll-status="loaded"></div>
    </div>
  </li>
</div>

<div class="container">
  <div class="video-wrapper">
    <video class="hero__video"
      src="https://player.vimeo.com/progressive_redirect/playback/843200618/rendition/1080p/file.mp4?loc=external&signature=e367b1f00745e52dd54f909d9260f853245f515ab17265aa3933b61222dc5d44 "
      muted autoplay loop></video>
  </div>
</div>

<section id="projects" class="projects section grey-section">
  <div class="headline">
    <h2>
      <div style="overflow: hidden;">
          <div class="headline-content">PROJECT</div>
      </div>
    </h2>
  </div>
  <div class="our-projects">
    <div class="project-box">
      <div class="project-box-number">
        01
      </div>
      <div  class="project-box-image" >
        <a href="/brener-21-boutique-project" class="link w-inline-block"><img
            src="https://assets-global.website-files.com/656f349790ab66e73956b52d/656f349790ab66e73956b55c_brener-clip-min.jpg"
            loading="lazy" sizes="(max-width: 991px) 80vw, 33vw"
            srcset="https://assets-global.website-files.com/656f349790ab66e73956b52d/656f349790ab66e73956b55c_brener-clip-min-p-500.jpg 500w, https://assets-global.website-files.com/656f349790ab66e73956b52d/656f349790ab66e73956b55c_brener-clip-min-p-800.jpg 800w, https://assets-global.website-files.com/656f349790ab66e73956b52d/656f349790ab66e73956b55c_brener-clip-min-p-1080.jpg 1080w, https://assets-global.website-files.com/656f349790ab66e73956b52d/656f349790ab66e73956b55c_brener-clip-min.jpg 1484w"
            alt="" class="open"></a>
      </div>
      <div class="project-box-name">
        <h3 style="">
          <div style="overflow: hidden;">
            <div class="split-line">
              <div>ברנר 21 - פרויקט בוטיק</div>
            </div>
          </div>
        </h3>
        <div style="overflow: hidden;">
          <div class="split-line">32 יח״ד</div>
        </div>
      </div>
      <p class="project-box-description" style="">
        הפרוייקט ממוקם ברחוב ברנר פינת רחוב נגבה ברחובות. זהו פרוייקט בוטיק הכולל בניין
      </p>
    </div>
    <div class="project-box">
      <div class="project-box-number">
        02
      </div>
      <div  class="project-box-image" >
        <a href="/brener-21-boutique-project" class="link w-inline-block"><img
          src="https://assets-global.website-files.com/656f349790ab66e73956b52d/656f349790ab66e73956b558_hashuftim-thumb-min.jpg"
          loading="lazy" sizes="(max-width: 991px) 80vw, 33vw"
          srcset="https://assets-global.website-files.com/656f349790ab66e73956b52d/656f349790ab66e73956b558_hashuftim-thumb-min-p-500.jpg 500w, https://assets-global.website-files.com/656f349790ab66e73956b52d/656f349790ab66e73956b558_hashuftim-thumb-min-p-800.jpg 800w, https://assets-global.website-files.com/656f349790ab66e73956b52d/656f349790ab66e73956b558_hashuftim-thumb-min-p-1080.jpg 1080w, https://assets-global.website-files.com/656f349790ab66e73956b52d/656f349790ab66e73956b558_hashuftim-thumb-min.jpg 1136w"
          alt=""></a>
      </div>
      <div class="project-box-name">
        <h3 style="">
          <div style="overflow: hidden;">
            <div class="split-line">
              <div>השופטים 4-6 (בקרוב)</div>
            </div>
          </div>
        </h3>
        <div style="overflow: hidden;">
          <div class="split-line">64 יח״ד</div>
        </div>
      </div>
      <p class="project-box-description" style="">
        התחדשות עירונית במרכז רחובות, הכוללת הריסת בניין מגורים קיים ומבנה ציבור ישן
      </p>
    </div>
    <div class="project-box">
      <div class="project-box-number">
        03
      </div>
      <div  class="project-box-image" >
        <a href="/brener-21-boutique-project" class="link w-inline-block"><img
          src="https://assets-global.website-files.com/656f349790ab66e73956b52d/656f349790ab66e73956b55b_gordosky-thumb-min.jpg"
          loading="lazy" sizes="(max-width: 991px) 80vw, 33vw"
          srcset="https://assets-global.website-files.com/656f349790ab66e73956b52d/656f349790ab66e73956b55b_gordosky-thumb-min-p-500.jpg 500w, https://assets-global.website-files.com/656f349790ab66e73956b52d/656f349790ab66e73956b55b_gordosky-thumb-min-p-800.jpg 800w, https://assets-global.website-files.com/656f349790ab66e73956b52d/656f349790ab66e73956b55b_gordosky-thumb-min-p-1080.jpg 1080w, https://assets-global.website-files.com/656f349790ab66e73956b52d/656f349790ab66e73956b55b_gordosky-thumb-min.jpg 1136w"
          alt=""></a>
      </div>
      <div class="project-box-name">
        <h3 style="">
          <div style="overflow: hidden;">
            <div class="split-line">
              <div>גורדוסקי 7-9 (בקרוב)</div>
            </div>
          </div>
        </h3>
        <div style="overflow: hidden;">
          <div class="split-line">35 יח״ד</div>
        </div>
      </div>
      <p class="project-box-description" style="">
        הפרוייקט ממוקם ברחוב גורודסקי והוא כולל מבנה לשימור משנות ה-30. המבנה יעבור
      </p>
    </div>
    <div class="project-box">
      <div class="project-box-number">
        04
      </div>
      <div  class="project-box-image" >
        <a href="/brener-21-boutique-project" class="link w-inline-block"><img
          src="https://assets-global.website-files.com/656f349790ab66e73956b52d/656f349790ab66e73956b557_tsharnihovsky-thumb-min.jpg"
          loading="lazy" sizes="(max-width: 991px) 80vw, 33vw"
          srcset="https://assets-global.website-files.com/656f349790ab66e73956b52d/656f349790ab66e73956b557_tsharnihovsky-thumb-min-p-500.jpg 500w, https://assets-global.website-files.com/656f349790ab66e73956b52d/656f349790ab66e73956b557_tsharnihovsky-thumb-min-p-800.jpg 800w, https://assets-global.website-files.com/656f349790ab66e73956b52d/656f349790ab66e73956b557_tsharnihovsky-thumb-min-p-1080.jpg 1080w, https://assets-global.website-files.com/656f349790ab66e73956b52d/656f349790ab66e73956b557_tsharnihovsky-thumb-min.jpg 1136w"
          alt=""></a>
      </div>
      <div class="project-box-name">
        <h3 style="">
          <div style="overflow: hidden;">
            <div class="split-line">
              <div>טשרניחובסקי 75-79 (בקרוב)</div>
            </div>
          </div>
        </h3>
        <div style="overflow: hidden;">
          <div class="split-line">30 יח״ד</div>
        </div>
      </div>
      <p class="project-box-description" style="">
        הפרוייקט ממוקם ברחוב טשרניחובסקי והוא נמצא באחת הנקודות הגבוהות של רחובות.
      </p>
    </div>
  </div>
</section>
<section class="marquee">
  <div class="marquee-inner">
    <div class="marquee-part">
      <span>coding skill set</span>
      <div class="arrow">
        <img src="/images/shape.svg"/>
      </div>
    </div>
    <div class="marquee-part">
      coding skill set
      <div class="arrow">
        <img src="/images/shape.svg"/>
      </div>
    </div>
    <div class="marquee-part">
      coding skill set
      <div class="arrow">
        <img src="/images/shape.svg"/>
      </div>
    </div>
    <div class="marquee-part">
      coding skill set
      <div class="arrow">
        <img src="/images/shape.svg"/>
      </div>
    </div>
    <div class="marquee-part">
      coding skill set
      <div class="arrow">
        <img src="/images/shape.svg"/>
      </div>
    </div>
    <div class="marquee-part">
      coding skill set
      <div class="arrow">
        <img src="/images/shape.svg"/>
      </div>
    </div>
    <div class="marquee-part">
      coding skill set
      <div class="arrow">
        <img src="/images/shape.svg"/>
      </div>
    </div>
  </div>
</section>

<section class="skills">
  <div class="row">
    <ul class="flex-col skills-ul mouse-pos-list-image-ul is-inview">
      <li class="single-service mouse-pos-list-image-hover">
        <h3>Creative Direction</h3>
        <h4 class="serif">01</h4>
      </li>
      <li class="single-service mouse-pos-list-image-hover active">
        <h3>Brand and Identity</h3>
        <h4 class="serif">02</h4>
      </li>
      <li class="single-service mouse-pos-list-image-hover">
        <h3>Visual Content</h3>
        <h4 class="serif">03</h4>
      </li>
    </ul>
  </div>
</section>

<div style="height: 100vh"></div>
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
