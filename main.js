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
  lenis.stop();

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
    console.log("update cursor here");
  }
  // End-Cursor

  // Loading
  function initLoading() {
    const progress = { value: 0 };
    const loadInner = document.querySelector("#load-inner");
    const loadProgress = document.querySelector("#load-progress");
    const loaderText = document.querySelector(".loader-text");
    let loadTl = gsap.timeline({
      defaults: {
        ease: "none",
      },
      onComplete() {
        gsap.to(loadProgress, {
          strokeDasharray: "0, 300",
          duration: 1.2,
          ease: "circ.inOut",
          onComplete: () => {
            gsap.set(loadProgress, { strokeDasharray: `0px, 999999px`, "--dash-offset": 0.001, });
          },
        });

        gsap.to(loadInner, {
          strokeDasharray: "0, 301",
          duration: .3,
          delay: .2,
          ease: "circ.inOut",
          onComplete: () => {
            gsap.set(loadInner, { strokeDasharray: `0px, 999999px`, "--dash-offset": 0.001, });
          },
        });

        gsap.to(loaderText, { opacity: 0, duration: 1, delay: .2, filter: "blur(10px)", ease: "circ.inOut", });

        initCursor();
        homeHeroAnim.play();
        laptopTl.play();
        BACKGROUND_SETTINGS.speed = 2.3;
      },
    });

    loadTl.to(progress, {
      value: 100,
      duration: 3,
      ease: "circ.inOut",
      onUpdate: () => {
        const newProgress = Math.round(progress.value);
        loaderText.textContent = `${newProgress}`;
        gsap.set(loadProgress, { strokeDasharray: `${3 * newProgress}, 300`, });
      },
    });
  }

  initLoading();
  // End Loading

  //WebGl
  // Canvas
  const canvas = document.querySelector("#canvas");
  const videoEl = document.createElement("video");

  let laptopTl, laptopAppearTl, laptopOpeningTl, screenOnTl, floatingTl;
  let darkPlasticMaterial,
    cameraMaterial,
    baseMetalMaterial,
    logoMaterial,
    screenMaterial,
    keyboardMaterial;
  let macGroup, lidGroup, bottomGroup, screenMesh, lightHolder, screenLight;
  let screenVideoTexture;
  const screenSize = [29.4, 20];

  // Scene
  const scene = new THREE.Scene();

  //change setting here
  const BACKGROUND_SETTINGS = {
    amount: 2000,
    radius: 70,
    speed: 10,
    elapsedTime: 0,
    // trails: true,
  };

  /**
   * Camera
   */
  // Base camera
  const camera = new THREE.PerspectiveCamera(
    75,
    viewport.w / viewport.h,
    0.1,
    100
  );
  camera.position.set(0, 4.3, 10);
  // camera.lookAt(new THREE.Vector3(0, 2.5, 0));
  scene.add(camera);

  //renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  function createMaterials() {
    const textLoader = new THREE.TextureLoader();

    videoEl.setAttribute("src", "/video/showreel.mp4");
    videoEl.muted = true;
    videoEl.loop = true;
    videoEl.play();

    screenVideoTexture = new THREE.VideoTexture(videoEl);
    screenVideoTexture.flipY = false;
    screenMaterial = new THREE.MeshBasicMaterial({
      map: screenVideoTexture,
      transparent: true,
      opacity: 0,
      side: THREE.BackSide,
    });
    const keyboardTexture = textLoader.load(
      "/images/textures/keyboard-overlay.png"
    );
    keyboardMaterial = new THREE.MeshBasicMaterial({
      color: 0xfffffff,
      alphaMap: keyboardTexture,
      transparent: true,
    });

    darkPlasticMaterial = new THREE.MeshStandardMaterial({
      color: 0x000000,
      roughness: 0.9,
      metalness: 0.9,
      transparent: true,
    });
    cameraMaterial = new THREE.MeshBasicMaterial({
      color: 0x333333,
      transparent: true,
    });
    baseMetalMaterial = new THREE.MeshStandardMaterial({
      color: 0xcecfd3,
      transparent: true,
    });
    logoMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
    });
  }

  function parseModel(glb) {
    [...glb.scene.children].forEach((child) => {
      if (child.name === "_top") {
        lidGroup.add(child);
        [...child.children].forEach((mesh) => {
          if (mesh.name === "lid") {
            mesh.material = baseMetalMaterial;
          } else if (mesh.name === "logo") {
            mesh.material = logoMaterial;
          } else if (mesh.name === "screen-frame") {
            mesh.material = darkPlasticMaterial;
          } else if (mesh.name === "camera") {
            mesh.material = cameraMaterial;
          }
        });
      } else if (child.name === "_bottom") {
        bottomGroup.add(child);
        [...child.children].forEach((mesh) => {
          if (mesh.name === "base") {
            mesh.material = baseMetalMaterial;
          } else if (mesh.name === "legs") {
            mesh.material = darkPlasticMaterial;
          } else if (mesh.name === "keyboard") {
            mesh.material = darkPlasticMaterial;
          } else if (mesh.name === "inner") {
            mesh.material = darkPlasticMaterial;
          }
        });
      }
    });
  }

  function addScreen() {
    screenMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(screenSize[0], screenSize[1]),
      screenMaterial
    );
    screenMesh.position.set(0, 10.5, -0.11);
    screenMesh.rotation.set(Math.PI, 0, 0);
    lidGroup.add(screenMesh);

    screenLight = new THREE.RectAreaLight(
      0xffffff,
      0,
      screenSize[0],
      screenSize[1]
    );
    screenLight.position.set(0, 10.5, 0);
    screenLight.rotation.set(Math.PI, 0, 0);
    lidGroup.add(screenLight);
  }

  function addKeyboard() {
    const keyboardKeys = new THREE.Mesh(
      new THREE.PlaneGeometry(27.7, 11.6),
      keyboardMaterial
    );
    keyboardKeys.rotation.set(-0.5 * Math.PI, 0, 0);
    keyboardKeys.position.set(0, 0.045, 7.21);
    bottomGroup.add(keyboardKeys);
  }

  function createTimelines() {
    // ---------------------------------------------------
    floatingTl = gsap
      .timeline({
        repeat: -1,
      })
      .to([lidGroup.position, bottomGroup.position], { duration: 1.5, y: "+=1", ease: "power1.inOut" }, 0)
      .to([lidGroup.position, bottomGroup.position], { duration: 1.5,y: "-=1",ease: "power1.inOut", })
      .timeScale(0);

    // ---------------------------------------------------
    screenOnTl = gsap
      .timeline({
        paused: true,
      })
      .to(screenMaterial, { duration: 0.1,  opacity: 1, }, 0)
      .to(screenLight, { duration: 0.1, intensity: 1.5, }, 0);

    // ---------------------------------------------------
    laptopOpeningTl = gsap
      .timeline({
        paused: true,
        onUpdate: () => {},
      })
      .from(lidGroup.position, { duration: 0.75, z: "+=.5", }, 0)
      .fromTo(lidGroup.rotation, { duration: 1, x: 0.5 * Math.PI, }, { x: -0.2 * Math.PI, }, 0)
      .to(screenOnTl, { duration: 0.06, progress: 1, }, 0.05);

    // ---------------------------------------------------
    laptopAppearTl = gsap
      .timeline({
        paused: true,
      })
      .fromTo(macGroup.rotation, { x: 0.5 * Math.PI, y: 0.2 * Math.PI, }, { duration: 2, x: 0.04 * Math.PI, y: -0.08 * Math.PI, }, 0)
      .fromTo(macGroup.position, { y: -50, }, { duration: 1, y: -2, }, 0);

    // ---------------------------------------------------
    // ---------------------------------------------------
    laptopTl = gsap
      .timeline({
        defaults: {
          ease: "none",
        },
        paused: true,
      })
      .to(laptopAppearTl,{ duration: 1.5, progress: 1, }, '+=0.5')
      .to(laptopOpeningTl,{ duration: 1,progress: 0.34, }, 0.5)
      .to(floatingTl,{ duration: 1, timeScale: 1, }, 1);
  }

  function initWebGl() {
    /**
     * Models
     */
    const gltfLoaders = new GLTFLoader();
    createMaterials();
    gltfLoaders.load("/models/laptop.glb", (gltf) => {
      parseModel(gltf);
      addScreen();
      addKeyboard();
      createTimelines();
    });

    /**
     * Lights
     */
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    lightHolder = new THREE.Group();
    scene.add(lightHolder);
    const light = new THREE.PointLight(0xfff5e1, 0.8);
    light.position.set(0, 5, 0);
    lightHolder.add(light);

    macGroup = new THREE.Group();
    macGroup.position.z = -12;
    macGroup.scale.set(0.38, 0.38, 0.38);
    scene.add(macGroup);
    lidGroup = new THREE.Group();
    macGroup.add(lidGroup);
    bottomGroup = new THREE.Group();
    macGroup.add(bottomGroup);
  }

  function starfieldBg() {
    const globalFog = new THREE.Fog(0x060606, 20, BACKGROUND_SETTINGS.radius);
    // scene.background = spaceColor;
    scene.fog = globalFog;
    // const spaceColor = new THREE.Color(0x020202);

    // ----------------------- create stars

    const texture = new THREE.TextureLoader().load(
      "/images/textures/star.webp"
    );
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
          return BACKGROUND_SETTINGS.elapsedTime;
        },
      };
      shader.uniforms.spawnRadius = {
        get value() {
          return BACKGROUND_SETTINGS.radius;
        },
      };

      shader.vertexShader = "uniform float elapsedTime;" + shader.vertexShader;
      shader.vertexShader = "uniform float spawnRadius;" + shader.vertexShader;

      shader.vertexShader = shader.vertexShader.replace(
        "#include <project_vertex>",
        `
          // move stars in one direction
          transformed.z += elapsedTime;

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
      radius = radius || BACKGROUND_SETTINGS.radius;
      amount = amount || BACKGROUND_SETTINGS.amount;

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
  }
  starfieldBg();

  initWebGl();

  window.addEventListener("resize", () => {
    // Update sizes
    viewport.w = window.innerWidth;
    viewport.h = window.innerHeight;

    // Update camera
    camera.aspect = viewport.w / viewport.h;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(viewport.w, viewport.h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  /**
   * Animate
   */
  const clock = new THREE.Clock();
  let oldElapsedTime = 0;

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - oldElapsedTime;
    oldElapsedTime = elapsedTime;
    BACKGROUND_SETTINGS.elapsedTime += deltaTime * BACKGROUND_SETTINGS.speed;

    lightHolder.quaternion.copy(camera.quaternion);

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
  };

  tick();
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
        onComplete: () => {
          lenis.start();
        },
      });

      this.tlHero
        .to(BACKGROUND_SETTINGS, { speed: 2, duration: 3, ease: "power2.inOut" })
        .to(".hero__title-letter", { scaleY: 1, ease: "elastic.out(1,0.5)", duration: 1.3, stagger: 0.07, }, "-=0.5")
        .to(".sec-nav", { opacity: 1, duration: 1.2, ease: "power3.out", }, "-=0.6")
        .to(".subtext__role", { opacity: 1, duration: 1.2, ease: "power3.out" }, "<");
    }

    overlapAnim() {
      this.tlOverlapAnim = gsap.timeline({
        scrollTrigger: {
          trigger: ".home__heroShowReel-wrap",
          start: `top bottom`,
          end: "95% top",
          scrub: 0.5,
        },
      });
      this.tlOverlapAnim.to(baseMetalMaterial, { opacity: 0, duration: .1 }, 0)
      .to(darkPlasticMaterial, { opacity: 0, duration: .1 }, '<')
      .to(cameraMaterial, { opacity: 0, duration: .1 }, '<')
      .to(keyboardMaterial, { opacity: 0, duration: .1 }, '<')
      .to(macGroup.rotation, { x: 0, y: 0, })
      .to(lidGroup.rotation, { x: 0, }, "<")
      .to(macGroup.scale, { x: 1.5, y: 1.5, z: 1.5,}, "<")
      .to(macGroup.position, { y: -12, }, "<")
      .to(macGroup.position, { y: 22, })
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
        .to(".first-words", { opacity: 0, scale: 1.1, duration: 2, ease: "none" })
        .to(secondWords.chars, {
          translateY: "0px",
          translateZ: "0px",
          rotate: "0deg",
          opacity: 1,
          ease: "none",
          stagger: 0.03,
        })
        .to(".second-words", { opacity: 0, scale: 1.1, duration: 2, ease: "none" });

      for (let i = 0; i < this.projectBox.length; i++) {
        gsap.set(this.projectBox[i], {
          z: -5000,
          autoAlpha: 0,
        });
      }
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

      this.tlProjectsAnim.to(".projects", { opacity: 1, duration: 2.5, ease: "none", });

      this.projectBox.forEach((item) => {
        this.tlProjectsAnim
          .to(item, { autoAlpha: 1, ease: "none" })
          .to(item, { z: 500, duration: 4, ease: "linear" }, "<")
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
