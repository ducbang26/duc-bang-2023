import "./styles/index.scss";

import App from "./app.js";
import { gsap } from "gsap";
import Lenis from "@studio-freight/lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

<div class="container">
    <div class="video-wrapper">
      <video class="hero__video" src="https://player.vimeo.com/progressive_redirect/playback/843200618/rendition/1080p/file.mp4?loc=external&signature=e367b1f00745e52dd54f909d9260f853245f515ab17265aa3933b61222dc5d44 " muted autoplay loop></video>
    </div>
  </div>

<section id="projects" class="section grey-section">
    <div class="slide-cursor">
        <div>view demo</div>
    </div>
    <div class="headline">
        <h2>
            <div style="overflow: hidden;">
                <div class="split-line">
                    <div>PROJECT</div>
                </div>
            </div>
        </h2>
    </div>
    <div class="our-projects">
        <div class="project-box">
            <div class="project-box-number">
                <div class="grande">01</div>
            </div>
            <div cursor-class="selected" class="project-box-image" style="clip-path: none;">
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
                <div class="grande">02</div>
            </div>
            <div cursor-class="selected" class="project-box-image" style="clip-path: none;">
                <img
                    src="https://assets-global.website-files.com/656f349790ab66e73956b52d/656f349790ab66e73956b558_hashuftim-thumb-min.jpg"
                    loading="lazy" sizes="(max-width: 991px) 80vw, 33vw"
                    srcset="https://assets-global.website-files.com/656f349790ab66e73956b52d/656f349790ab66e73956b558_hashuftim-thumb-min-p-500.jpg 500w, https://assets-global.website-files.com/656f349790ab66e73956b52d/656f349790ab66e73956b558_hashuftim-thumb-min-p-800.jpg 800w, https://assets-global.website-files.com/656f349790ab66e73956b52d/656f349790ab66e73956b558_hashuftim-thumb-min-p-1080.jpg 1080w, https://assets-global.website-files.com/656f349790ab66e73956b52d/656f349790ab66e73956b558_hashuftim-thumb-min.jpg 1136w"
                    alt="">
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
                <div class="grande">03</div>
            </div>
            <div cursor-class="selected" class="project-box-image" style="clip-path: none;">
                <img
                    src="https://assets-global.website-files.com/656f349790ab66e73956b52d/656f349790ab66e73956b55b_gordosky-thumb-min.jpg"
                    loading="lazy" sizes="(max-width: 991px) 80vw, 33vw"
                    srcset="https://assets-global.website-files.com/656f349790ab66e73956b52d/656f349790ab66e73956b55b_gordosky-thumb-min-p-500.jpg 500w, https://assets-global.website-files.com/656f349790ab66e73956b52d/656f349790ab66e73956b55b_gordosky-thumb-min-p-800.jpg 800w, https://assets-global.website-files.com/656f349790ab66e73956b52d/656f349790ab66e73956b55b_gordosky-thumb-min-p-1080.jpg 1080w, https://assets-global.website-files.com/656f349790ab66e73956b52d/656f349790ab66e73956b55b_gordosky-thumb-min.jpg 1136w"
                    alt="">
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
                <div class="grande">04</div>
            </div>
            <div cursor-class="selected" class="project-box-image" style="clip-path: none;">
                <img
                    src="https://assets-global.website-files.com/656f349790ab66e73956b52d/656f349790ab66e73956b557_tsharnihovsky-thumb-min.jpg"
                    loading="lazy" sizes="(max-width: 991px) 80vw, 33vw"
                    srcset="https://assets-global.website-files.com/656f349790ab66e73956b52d/656f349790ab66e73956b557_tsharnihovsky-thumb-min-p-500.jpg 500w, https://assets-global.website-files.com/656f349790ab66e73956b52d/656f349790ab66e73956b557_tsharnihovsky-thumb-min-p-800.jpg 800w, https://assets-global.website-files.com/656f349790ab66e73956b52d/656f349790ab66e73956b557_tsharnihovsky-thumb-min-p-1080.jpg 1080w, https://assets-global.website-files.com/656f349790ab66e73956b52d/656f349790ab66e73956b557_tsharnihovsky-thumb-min.jpg 1136w"
                    alt="">
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

const lenis = new Lenis({
  lerp: 0.1,
  duration: 1.5,
  smoothTouch: true,
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

gsap.to(".parallax-scroll-caption", {
  translate: "0% 5%",
  opacity: 0.5,
  ease: "power1.inOut",
  duration: 0.5,
  scrollTrigger: {
    trigger: ".parallax-scroll-caption",
    start: "top top",
    end: "60%",
    scrub: 1,
  },
});
