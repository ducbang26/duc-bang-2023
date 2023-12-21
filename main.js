import "./styles/index.scss";

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

<section id="projects" class="section grey-section">
    <div class="slide-cursor">
        <div>view demo</div>
    </div>
    <div class="headline">
        <h2 style="">
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
                <div class="marketing-badge">
                    <div>פרויקט<br>בשיווק</div>
                </div><a href="/brener-21-boutique-project" class="link w-inline-block"><img
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
                <p class="project-box-size" style="">
                <div style="overflow: hidden;">
                    <div class="split-line">32 יח״ד</div>
                </div>
                </p>
            </div>
            <p class="project-box-description" style="">
            <div style="overflow: hidden;">
                <div class="split-line">
                    הפרוייקט ממוקם ברחוב ברנר פינת רחוב נגבה ברחובות. זהו פרוייקט בוטיק הכולל בניין </div>
            </div>
            <div style="overflow: hidden;">
                <div class="split-line">
                    מגורים בן 9 קומות מעל קומת קרקע ו2 קומות חניון. </div>
            </div>
            </p>
        </div>
        <div class="project-box">
            <div class="project-box-number">
                <div class="grande">02</div>
            </div>
            <div class="project-box-image" style="clip-path: none;">
                <div class="marketing-badge soon">
                    <div>יפתח בקרוב</div>
                </div><img
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
                <p class="project-box-size" style="">
                <div style="overflow: hidden;">
                    <div class="split-line">64 יח״ד</div>
                </div>
                </p>
            </div>
            <p class="project-box-description" style="">
            <div style="overflow: hidden;">
                <div class="split-line">התחדשות עירונית במרכז רחובות, הכוללת הריסת בניין מגורים קיים ומבנה ציבור ישן </div>
            </div>
            <div style="overflow: hidden;">
                <div class="split-line">
                    והקמת בניין מגורים חדש בן 64 יח"ד. כ-15 קומות מגורים מעל 3 קומות עסקים ומסחר ו3 </div>
            </div>
            <div style="overflow: hidden;">
                <div class="split-line">קומות חניון. הפרוייקט נמצא במיקום מרכזי מאוד בעיר סמוך לכיכר העיר (גן המייסדים).</div>
            </div>
            </p>
        </div>
        <div class="project-box">
            <div class="project-box-number">
                <div class="grande">03</div>
            </div>
            <div class="project-box-image" style="clip-path: none;">
                <div class="marketing-badge soon">
                    <div>יפתח בקרוב</div>
                </div><img
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
                <p class="project-box-size" style="">
                <div style="overflow: hidden;">
                    <div class="split-line">35 יח״ד</div>
                </div>
                </p>
            </div>
            <p class="project-box-description" style="">
            <div style="overflow: hidden;">
                <div class="split-line">הפרוייקט ממוקם ברחוב גורודסקי והוא כולל מבנה לשימור משנות ה-30. המבנה יעבור </div>
            </div>
            <div style="overflow: hidden;">
                <div class="split-line">שימור ובסמיכות אליו ייבנה בניין מגורים בן 8 קומות, 2 קומות חניון. ו- 35 יח"ד. הפרוייקט </div>
            </div>
            <div style="overflow: hidden;">
                <div class="split-line">נמצא בסמוך לבית העם של רחובות ולבית הכנסת הגדול.</div>
            </div>
            </p>
        </div>
        <div class="project-box">
            <div class="project-box-number">
                <div class="grande">04</div>
            </div>
            <div class="project-box-image" style="clip-path: none;">
                <div class="marketing-badge soon">
                    <div>יפתח בקרוב</div>
                </div><img
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
                <p class="project-box-size" style="">
                <div style="overflow: hidden;">
                    <div class="split-line">30 יח״ד</div>
                </div>
                </p>
            </div>
            <p class="project-box-description" style="">
            <div style="overflow: hidden;">
                <div class="split-line">הפרוייקט ממוקם ברחוב טשרניחובסקי והוא נמצא באחת הנקודות הגבוהות של רחובות. </div>
            </div>
            <div style="overflow: hidden;">
                <div class="split-line">
                    הנוף אשר ישקף ממרפסות הבניין יהיה עוצר נשימה והדיירים בפרויקט יוכלו להנות מאיכות </div>
            </div>
            <div style="overflow: hidden;">
                <div class="split-line">חיים במרכז השקט של העיר. יבנו שני בנייני מגורים עם סה"כ 30 יח"ד וחניון תת קרקעי.</div>
            </div>
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

