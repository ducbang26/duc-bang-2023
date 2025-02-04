import "./styles/index.scss";

import { gsap } from "gsap";
import Lenis from "@studio-freight/lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import GUI from "lil-gui";

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

  lenis.scrollTo(".home__hero");

  const viewport = {
    w: window.innerWidth,
    h: window.innerHeight,
  };
  function updateViewportSize() {
    viewport.w = window.innerWidth;
    viewport.h = window.innerHeight;
  }
  // eslint-disable-next-line no-undef
  $(window).on("resize", updateViewportSize);

  let uniforms;

  function calcTransform(property, value) {
    let alias = {
      y: "translateY",
      x: "translateX",
      z: "translateZ",
      rotation: "rotate",
    };
    return function (i, target) {
      let transform = target.style.transform; // remember the original transform
      target.style.transform =
        (alias[property] || property) + "(" + value + ")"; // apply the new value
      let computed = parseFloat(
        gsap.getProperty(
          target,
          property,
          property.substr(0, 3) === "rot" ? "deg" : "px",
          true
        )
      ); // grab the pixel value
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
    image.onload = () => {
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
    // update cursor here
   console.log('update cursor here');
  }
  // End-Cursor

  // Loading
  function initLoading() {
    const element = document
      .querySelector(".loading__numbers")
      .getBoundingClientRect();
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
      .to(".loading__numbers", {
        x: calcTransform("x", `calc(${elementWidth}px + 1rem)`),
        delay: 1,
        ease: "power4.inOut",
      })
      .to(".loading__numbers", {
        x: calcTransform("x", `calc(${elementWidth * 2}px + 2rem)`),
        delay: 0.5,
        ease: "power4.inOut",
      })
      .to(".loading__numbers", {
        x: calcTransform("x", `calc(${elementWidth * 3}px + 3rem)`),
        delay: 0.5,
        ease: "power4.inOut",
      })
      .to(".loading__numbers", {
        x: calcTransform("x", `calc(${elementWidth * 4}px + 4rem)`),
        delay: 0.5,
        ease: "power4.inOut",
      })
      .to(".loading__numbers", {
        x: calcTransform("x", `calc(${elementWidth * 5}px + 5rem)`),
        delay: 0.5,
        ease: "power4.inOut",
      })
      .to(".hero__title-letter", {
        x: 0,
        duration: 0.8,
        delay: 0.7,
        ease: "power2.inOut",
      })
      .to(".loading", { autoAlpha: 0, ease: "power4.inOut" }, "-=0.7");

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
    // Canvas
    const canvas = document.querySelector("#laptop-canvas");

    // Scene
    const scene = new THREE.Scene();

    /**
     * Models
     */
    let laptopModel = null;
    const gltfLoaders = new GLTFLoader();
    gltfLoaders.load("/models/laptop.glb", (gltf) => {
      gltf.scene.scale.set(0.1, 0.1, 0.1);
      laptopModel = gltf.scene;
      scene.add(laptopModel);
      laptopModel.rotation.x = -0.23;
      laptopModel.rotation.y = -0.31;
      laptopModel.rotation.z = 0.46;
    });


    /**
     * Lights
     */
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.8);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.set(1024, 1024);
    directionalLight.shadow.camera.far = 15;
    directionalLight.shadow.camera.left = -7;
    directionalLight.shadow.camera.top = 7;
    directionalLight.shadow.camera.right = 7;
    directionalLight.shadow.camera.bottom = -7;
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    /**
     * Sizes
     */
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    window.addEventListener("resize", () => {
      // Update sizes
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      // Update camera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    /**
     * Camera
     */
    // Base camera
    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      100
    );
    camera.position.set(2, 4.3, 2);
    camera.lookAt(new THREE.Vector3(0, 2.5, 0));
    scene.add(camera);

    /**
     * Renderer
     */
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    /**
     * Animate
     */
    const clock = new THREE.Clock();
    let previousTime = 0;

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();
      const deltaTime = elapsedTime - previousTime;
      previousTime = elapsedTime;

      // Update controls

      // Render
      renderer.render(scene, camera);

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();
  }
  initWebGl();

  function starfieldBg() {
    
    //change setting here
    const SETTINGS = {
      amount: 6000,
      radius: 50,
      speed: 1.7,
      fogEnabled: true,
      elapsedTime: 0,
      // trails: true,
    };

    // Canvas
    const canvas = document.querySelector("#bg-canvas");

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    /**
     * Sizes
     */
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    window.addEventListener("resize", () => {
      // Update sizes
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      // Update camera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(window.devicePixelRatio);
    });

    const spaceColor = new THREE.Color(0x020202);
    const globalFog = new THREE.Fog(spaceColor, 0, SETTINGS.radius);
    const scene = new THREE.Scene();
    scene.background = spaceColor;
    scene.fog = globalFog;

    // ----------------------- create stars

    const texture = new THREE.TextureLoader().load('/images/textures/star.webp');
    const geometry = new THREE.BufferGeometry();
    const material = new THREE.PointsMaterial({
      map: texture,
      size: 0.12,
      blending: THREE.AdditiveBlending,
      depthTest: false,
    });

    // tweak the shader
    material.onBeforeCompile = (shader, renderer) => {
      shader.uniforms.elapsedTime = {
        get value() {
          return SETTINGS.elapsedTime;
        },
      };
      shader.uniforms.spawnRadius = {
        get value() {
          return SETTINGS.radius;
        },
      };
      shader.uniforms.speed = {
        get value() {
          return SETTINGS.speed;
        },
      };

      shader.vertexShader = "uniform float elapsedTime;" + shader.vertexShader;
      shader.vertexShader = "uniform float spawnRadius;" + shader.vertexShader;
      shader.vertexShader = "uniform float speed;" + shader.vertexShader;

      shader.vertexShader = shader.vertexShader.replace(
        "#include <project_vertex>",
        `
          // move stars in one direction
          transformed.z += speed * elapsedTime;

          // constrain stars inside cube
          // (ex: if a star goes to far on one side, it'll be put back to the other side)
          transformed.xyz = mod(transformed.xyz, spawnRadius * 2.0) - spawnRadius;

          #include <project_vertex>
        `
      );

      shader.vertexShader = shader.vertexShader.replace(
        "gl_PointSize = size;",
        `
          // hide points that are outside sphere shape
          gl_PointSize = size * step(distance(vec3(0.0, 0.0, 0.0), transformed), spawnRadius);
        `
      );
      
    };

    // generate stars vertices
    function updateStarsVertices(radius, amount) {
      radius = radius || SETTINGS.radius;
      amount = amount || SETTINGS.amount;

      const diameter = radius * 2;
      const vertices = [];
      for (let i = 0; i < amount; i++) {
        const x = Math.random() * diameter - radius;
        const y = Math.random() * diameter - radius;
        const z = Math.random() * diameter - radius;
        vertices.push(x, y, z);
      }

      geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(vertices, 3)
      );
    }

    updateStarsVertices();

    const stars = new THREE.Points(geometry, material);
    scene.add(stars);

    // -----------------------

    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 20;

    /**
     * Animate
     */
    const clock = new THREE.Clock();
    let oldElapsedTime = 0;

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();
      const deltaTime = elapsedTime - oldElapsedTime;
      oldElapsedTime = elapsedTime;
      SETTINGS.elapsedTime += deltaTime;

      // Render
      renderer.render(scene, camera);

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();
  }
  starfieldBg();
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
          // this.overlapAnim();
        },
        onComplete: () => {},
      });

      this.tlHero
        .to(".sec-nav", { opacity: 1, duration: 1.2, ease: "power3.inOut" });
        // .to(
        //   ".home__hero-title",
        //   { backgroundColor: "#0e0e0e1a", ease: "power3.inOut" },
        //   "-=0.6"
        // );
    }

    overlapAnim() {
      this.tlOverlapAnim = gsap.timeline({
        scrollTrigger: {
          trigger: ".home__hero-title",
          start: `top+=${viewport.h * 0.3} top`,
          end: "95% 30%",
          scrub: 0.5,
        },
      });
      this.tlOverlapAnim
        .to(".home__heroShowReel", { opacity: 0, duration: 1, ease: "none" })
        .to(
          ".hero__title-letter",
          { xPercent: -100, opacity: 0, ease: "none" },
          "<"
        );
    }

    play() {
      this.tlHero.play();
    }
  }
  let homeHeroAnim = new homeHeroAnimate();

  class homeProjectAnimate {
    constructor() {
      this.tlHeadlineAnim;
      this.tlProjectsAnim;
      this.tlStarfieldAnim;
      this.projectBox;
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
      // eslint-disable-next-line no-undef
      const firstWords = new SplitType(".first-words", {
        types: "words, chars",
        charClass: "headline-char",
      });
      // eslint-disable-next-line no-undef
      const secondWords = new SplitType(".second-words", {
        types: "words, chars",
        charClass: "headline-char",
      });
      this.projectBox = gsap.utils.toArray(".project-box");

      gsap.set(".first-words", { opacity: 1 });
      gsap.set(".second-words", { opacity: 1 });

      this.tlHeadlineAnim = gsap.timeline({
        onComplete: () => {
          this.projectsAnim();
          // this.starfieldAnim();
        },
        scrollTrigger: {
          trigger: ".headline",
          start: `top+=${viewport.h * 0.4} top`,
          end: "90% 70%",
          scrub: true,
        },
      });
      this.tlHeadlineAnim
        .to(firstWords.chars, {
          translateY: "0px",
          translateZ: "0px",
          rotate: "0deg",
          opacity: 1,
          ease: "none",
          stagger: 0.03,
        })
        .to(".first-words", { opacity: 0, duration: 2, ease: "none" })
        .to(secondWords.chars, {
          translateY: "0px",
          translateZ: "0px",
          rotate: "0deg",
          opacity: 1,
          ease: "none",
          stagger: 0.03,
        })
        .to(".second-words", { opacity: 0, duration: 2, ease: "none" });

      for (let i = 0; i < this.projectBox.length; i++) {
        gsap.set(this.projectBox[i], {
          z: -5000,
          autoAlpha: 0,
        });
      }

      // initWebGl();
    }

    projectsAnim() {
      this.tlProjectsAnim = gsap.timeline({
        scrollTrigger: {
          trigger: ".projects",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      this.tlProjectsAnim.to(".projects", {
        opacity: 1,
        duration: 2.5,
        ease: "none",
      });

      this.projectBox.forEach((item) => {
        this.tlProjectsAnim
          .to(item, { autoAlpha: 1, ease: "none" })
          .to(item, { z: 500, duration: 4, ease: "linear" }, "<")
          .to(item, { autoAlpha: 0, ease: "linear" }, "-=0.45");
      });
    }

    // starfieldAnim() {
    //   this.tlStarfieldAnim = gsap.timeline({
    //     scrollTrigger: {
    //       trigger: ".projects",
    //       start: "top top",
    //       end: "bottom bottom",
    //       scrub: true,
    //       onUpdate: (self) => {
    //         uniforms.scrollOffset.value = gsap.utils.mapRange(0, 1, 1, 0.3, self.progress);
    //       }
    //     },
    //   });

    // }
  }

  let homeProjectAnim = new homeProjectAnimate();

  const SCRIPT = {};
  SCRIPT.homeScript = () => {
    lenis.scrollTo(".home__hero");

    homeHeroAnim.setup();
    homeProjectAnim.setTrigger();
  };

  SCRIPT.homeScript();
};
window.onload = mainScript;
