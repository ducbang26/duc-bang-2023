import "./styles/index.scss";

import { gsap } from "gsap";
import Lenis from "@studio-freight/lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

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
            gsap.set(loadProgress, {
              strokeDasharray: `0px, 999999px`,
              "--dash-offset": 0.001,
            });
          },
        });

        gsap.to(loadInner, {
          strokeDasharray: "0, 301",
          duration: 0.3,
          delay: 0.2,
          ease: "circ.inOut",
          onComplete: () => {
            gsap.set(loadInner, {
              strokeDasharray: `0px, 999999px`,
              "--dash-offset": 0.001,
            });
          },
        });

        gsap.to(loaderText, {
          opacity: 0,
          duration: 1,
          delay: 0.2,
          filter: "blur(10px)",
          ease: "circ.inOut",
        });

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
        gsap.set(loadProgress, { strokeDasharray: `${3 * newProgress}, 300` });
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
      .to(
        [lidGroup.position, bottomGroup.position],
        { duration: 1.5, y: "+=1", ease: "power1.inOut" },
        0
      )
      .to([lidGroup.position, bottomGroup.position], {
        duration: 1.5,
        y: "-=1",
        ease: "power1.inOut",
      })
      .timeScale(0);

    // ---------------------------------------------------
    screenOnTl = gsap
      .timeline({
        paused: true,
      })
      .to(screenMaterial, { duration: 0.1, opacity: 1 }, 0)
      .to(screenLight, { duration: 0.1, intensity: 1.5 }, 0);

    // ---------------------------------------------------
    laptopOpeningTl = gsap
      .timeline({
        paused: true,
        onUpdate: () => {},
      })
      .from(lidGroup.position, { duration: 0.75, z: "+=.5" }, 0)
      .fromTo(
        lidGroup.rotation,
        { duration: 1, x: 0.5 * Math.PI },
        { x: -0.2 * Math.PI },
        0
      )
      .to(screenOnTl, { duration: 0.06, progress: 1 }, 0.05);

    // ---------------------------------------------------
    laptopAppearTl = gsap
      .timeline({
        paused: true,
      })
      .fromTo(
        macGroup.rotation,
        { x: 0.5 * Math.PI, y: 0.2 * Math.PI },
        { duration: 2, x: 0.04 * Math.PI, y: -0.08 * Math.PI },
        0
      )
      .fromTo(macGroup.position, { y: -50 }, { duration: 1, y: -2 }, 0);

    // ---------------------------------------------------
    // ---------------------------------------------------
    laptopTl = gsap
      .timeline({
        defaults: {
          ease: "none",
        },
        paused: true,
      })
      .to(laptopAppearTl, { duration: 1.5, progress: 1 }, "+=0.5")
      .to(laptopOpeningTl, { duration: 1, progress: 0.34 }, 0.5)
      .to(floatingTl, { duration: 1, timeScale: 1 }, 1);
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
  // Cursor
  function initCursor() {
    // update cursor here
    console.log("update cursor here");
    const canvas = document.getElementById("fluid");
    resizeCanvas();

    let config = {
      SIM_RESOLUTION: 256,
      DYE_RESOLUTION: 1440,
      CAPTURE_RESOLUTION: 512,
      DENSITY_DISSIPATION: 4,
      VELOCITY_DISSIPATION: 4,
      PRESSURE: 0.3,
      PRESSURE_ITERATIONS: 20,
      CURL: 0,
      SPLAT_RADIUS: 0.5,
      SPLAT_FORCE: 6000,
      SHADING: true,
      COLOR_UPDATE_SPEED: 1000,
      PAUSED: false,
      BACK_COLOR: { r: 0, g: 0, b: 0 },
      TRANSPARENT: true,
    };

    function pointerPrototype() {
      this.id = -1;
      this.texcoordX = 0;
      this.texcoordY = 0;
      this.prevTexcoordX = 0;
      this.prevTexcoordY = 0;
      this.deltaX = 0;
      this.deltaY = 0;
      this.down = false;
      this.moved = false;
      this.color = [30, 0, 300];
    }

    let pointers = [];
    pointers.push(new pointerPrototype());

    const { gl, ext } = getWebGLContext(canvas);

    if (!ext.supportLinearFiltering) {
      config.DYE_RESOLUTION = 512;
      config.SHADING = false;
    }

    function getWebGLContext(canvas) {
      const params = {
        alpha: true,
        depth: false,
        stencil: false,
        antialias: false,
        preserveDrawingBuffer: false,
      };

      let gl = canvas.getContext("webgl2", params);
      const isWebGL2 = !!gl;
      if (!isWebGL2)
        gl =
          canvas.getContext("webgl", params) ||
          canvas.getContext("experimental-webgl", params);

      let halfFloat;
      let supportLinearFiltering;
      if (isWebGL2) {
        gl.getExtension("EXT_color_buffer_float");
        supportLinearFiltering = gl.getExtension("OES_texture_float_linear");
      } else {
        halfFloat = gl.getExtension("OES_texture_half_float");
        supportLinearFiltering = gl.getExtension(
          "OES_texture_half_float_linear"
        );
      }

      gl.clearColor(0.0, 0.0, 0.0, 1.0);

      const halfFloatTexType = isWebGL2
        ? gl.HALF_FLOAT
        : halfFloat.HALF_FLOAT_OES;
      let formatRGBA;
      let formatRG;
      let formatR;

      if (isWebGL2) {
        formatRGBA = getSupportedFormat(
          gl,
          gl.RGBA16F,
          gl.RGBA,
          halfFloatTexType
        );
        formatRG = getSupportedFormat(gl, gl.RG16F, gl.RG, halfFloatTexType);
        formatR = getSupportedFormat(gl, gl.R16F, gl.RED, halfFloatTexType);
      } else {
        formatRGBA = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
        formatRG = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
        formatR = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
      }

      return {
        gl,
        ext: {
          formatRGBA,
          formatRG,
          formatR,
          halfFloatTexType,
          supportLinearFiltering,
        },
      };
    }

    function getSupportedFormat(gl, internalFormat, format, type) {
      if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {
        switch (internalFormat) {
          case gl.R16F:
            return getSupportedFormat(gl, gl.RG16F, gl.RG, type);
          case gl.RG16F:
            return getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, type);
          default:
            return null;
        }
      }

      return {
        internalFormat,
        format,
      };
    }

    function supportRenderTextureFormat(gl, internalFormat, format, type) {
      let texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        internalFormat,
        4,
        4,
        0,
        format,
        type,
        null
      );

      let fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(
        gl.FRAMEBUFFER,
        gl.COLOR_ATTACHMENT0,
        gl.TEXTURE_2D,
        texture,
        0
      );

      let status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
      return status == gl.FRAMEBUFFER_COMPLETE;
    }

    class Material {
      constructor(vertexShader, fragmentShaderSource) {
        this.vertexShader = vertexShader;
        this.fragmentShaderSource = fragmentShaderSource;
        this.programs = [];
        this.activeProgram = null;
        this.uniforms = [];
      }

      setKeywords(keywords) {
        let hash = 0;
        for (let i = 0; i < keywords.length; i++) hash += hashCode(keywords[i]);

        let program = this.programs[hash];
        if (program == null) {
          let fragmentShader = compileShader(
            gl.FRAGMENT_SHADER,
            this.fragmentShaderSource,
            keywords
          );
          program = createProgram(this.vertexShader, fragmentShader);
          this.programs[hash] = program;
        }

        if (program == this.activeProgram) return;

        this.uniforms = getUniforms(program);
        this.activeProgram = program;
      }

      bind() {
        gl.useProgram(this.activeProgram);
      }
    }

    class Program {
      constructor(vertexShader, fragmentShader) {
        this.uniforms = {};
        this.program = createProgram(vertexShader, fragmentShader);
        this.uniforms = getUniforms(this.program);
      }

      bind() {
        gl.useProgram(this.program);
      }
    }

    function createProgram(vertexShader, fragmentShader) {
      let program = gl.createProgram();
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS))
        console.trace(gl.getProgramInfoLog(program));

      return program;
    }

    function getUniforms(program) {
      let uniforms = [];
      let uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
      for (let i = 0; i < uniformCount; i++) {
        let uniformName = gl.getActiveUniform(program, i).name;
        uniforms[uniformName] = gl.getUniformLocation(program, uniformName);
      }
      return uniforms;
    }

    function compileShader(type, source, keywords) {
      source = addKeywords(source, keywords);

      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
        console.trace(gl.getShaderInfoLog(shader));

      return shader;
    }

    function addKeywords(source, keywords) {
      if (keywords == null) return source;
      let keywordsString = "";
      keywords.forEach((keyword) => {
        keywordsString += "#define " + keyword + "\n";
      });

      return keywordsString + source;
    }

    const baseVertexShader = compileShader(
      gl.VERTEX_SHADER,
      `
        precision highp float;
    
        attribute vec2 aPosition;
        varying vec2 vUv;
        varying vec2 vL;
        varying vec2 vR;
        varying vec2 vT;
        varying vec2 vB;
        uniform vec2 texelSize;
    
        void main () {
            vUv = aPosition * 0.5 + 0.5;
            vL = vUv - vec2(texelSize.x, 0.0);
            vR = vUv + vec2(texelSize.x, 0.0);
            vT = vUv + vec2(0.0, texelSize.y);
            vB = vUv - vec2(0.0, texelSize.y);
            gl_Position = vec4(aPosition, 0.0, 1.0);
        }
    `
    );

    const blurVertexShader = compileShader(
      gl.VERTEX_SHADER,
      `
        precision highp float;
    
        attribute vec2 aPosition;
        varying vec2 vUv;
        varying vec2 vL;
        varying vec2 vR;
        uniform vec2 texelSize;
    
        void main () {
            vUv = aPosition * 0.5 + 0.5;
            float offset = 1.33333333;
            vL = vUv - texelSize * offset;
            vR = vUv + texelSize * offset;
            gl_Position = vec4(aPosition, 0.0, 1.0);
        }
    `
    );

    const blurShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision mediump float;
        precision mediump sampler2D;
    
        varying vec2 vUv;
        varying vec2 vL;
        varying vec2 vR;
        uniform sampler2D uTexture;
    
        void main () {
            vec4 sum = texture2D(uTexture, vUv) * 0.29411764;
            sum += texture2D(uTexture, vL) * 0.35294117;
            sum += texture2D(uTexture, vR) * 0.35294117;
            gl_FragColor = sum;
        }
    `
    );

    const copyShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision mediump float;
        precision mediump sampler2D;
    
        varying highp vec2 vUv;
        uniform sampler2D uTexture;
    
        void main () {
            gl_FragColor = texture2D(uTexture, vUv);
        }
    `
    );

    const clearShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision mediump float;
        precision mediump sampler2D;
    
        varying highp vec2 vUv;
        uniform sampler2D uTexture;
        uniform float value;
    
        void main () {
            gl_FragColor = value * texture2D(uTexture, vUv);
        }
    `
    );

    const colorShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision mediump float;
    
        uniform vec4 color;
    
        void main () {
            gl_FragColor = color;
        }
    `
    );

    const displayShaderSource = `
        precision highp float;
        precision highp sampler2D;
    
        varying vec2 vUv;
        varying vec2 vL;
        varying vec2 vR;
        varying vec2 vT;
        varying vec2 vB;
        uniform sampler2D uTexture;
        uniform sampler2D uDithering;
        uniform vec2 ditherScale;
        uniform vec2 texelSize;
    
        vec3 linearToGamma (vec3 color) {
            color = max(color, vec3(0));
            return max(1.055 * pow(color, vec3(0.416666667)) - 0.055, vec3(0));
        }
    
        void main () {
            vec3 c = texture2D(uTexture, vUv).rgb;
    
        #ifdef SHADING
            vec3 lc = texture2D(uTexture, vL).rgb;
            vec3 rc = texture2D(uTexture, vR).rgb;
            vec3 tc = texture2D(uTexture, vT).rgb;
            vec3 bc = texture2D(uTexture, vB).rgb;
    
            float dx = length(rc) - length(lc);
            float dy = length(tc) - length(bc);
    
            vec3 n = normalize(vec3(dx, dy, length(texelSize)));
            vec3 l = vec3(0.0, 0.0, 1.0);
    
            float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
            c *= diffuse;
        #endif
    
            float a = max(c.r, max(c.g, c.b));
            gl_FragColor = vec4(c, a);
        }
    `;

    const splatShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision highp float;
        precision highp sampler2D;
    
        varying vec2 vUv;
        uniform sampler2D uTarget;
        uniform float aspectRatio;
        uniform vec3 color;
        uniform vec2 point;
        uniform float radius;
    
        void main () {
            vec2 p = vUv - point.xy;
            p.x *= aspectRatio;
            vec3 splat = exp(-dot(p, p) / radius) * color;
            vec3 base = texture2D(uTarget, vUv).xyz;
            gl_FragColor = vec4(base + splat, 1.0);
        }
    `
    );

    const advectionShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision highp float;
        precision highp sampler2D;
    
        varying vec2 vUv;
        uniform sampler2D uVelocity;
        uniform sampler2D uSource;
        uniform vec2 texelSize;
        uniform vec2 dyeTexelSize;
        uniform float dt;
        uniform float dissipation;
    
        vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
            vec2 st = uv / tsize - 0.5;
    
            vec2 iuv = floor(st);
            vec2 fuv = fract(st);
    
            vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
            vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
            vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
            vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);
    
            return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
        }
    
        void main () {
        #ifdef MANUAL_FILTERING
            vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
            vec4 result = bilerp(uSource, coord, dyeTexelSize);
        #else
            vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
            vec4 result = texture2D(uSource, coord);
        #endif
            float decay = 1.0 + dissipation * dt;
            gl_FragColor = result / decay;
        }`,
      ext.supportLinearFiltering ? null : ["MANUAL_FILTERING"]
    );

    const divergenceShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision mediump float;
        precision mediump sampler2D;
    
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uVelocity;
    
        void main () {
            float L = texture2D(uVelocity, vL).x;
            float R = texture2D(uVelocity, vR).x;
            float T = texture2D(uVelocity, vT).y;
            float B = texture2D(uVelocity, vB).y;
    
            vec2 C = texture2D(uVelocity, vUv).xy;
            if (vL.x < 0.0) { L = -C.x; }
            if (vR.x > 1.0) { R = -C.x; }
            if (vT.y > 1.0) { T = -C.y; }
            if (vB.y < 0.0) { B = -C.y; }
    
            float div = 0.5 * (R - L + T - B);
            gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
        }
    `
    );

    const curlShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision mediump float;
        precision mediump sampler2D;
    
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uVelocity;
    
        void main () {
            float L = texture2D(uVelocity, vL).y;
            float R = texture2D(uVelocity, vR).y;
            float T = texture2D(uVelocity, vT).x;
            float B = texture2D(uVelocity, vB).x;
            float vorticity = R - L - T + B;
            gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
        }
    `
    );

    const vorticityShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision highp float;
        precision highp sampler2D;
    
        varying vec2 vUv;
        varying vec2 vL;
        varying vec2 vR;
        varying vec2 vT;
        varying vec2 vB;
        uniform sampler2D uVelocity;
        uniform sampler2D uCurl;
        uniform float curl;
        uniform float dt;
    
        void main () {
            float L = texture2D(uCurl, vL).x;
            float R = texture2D(uCurl, vR).x;
            float T = texture2D(uCurl, vT).x;
            float B = texture2D(uCurl, vB).x;
            float C = texture2D(uCurl, vUv).x;
    
            vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
            force /= length(force) + 0.0001;
            force *= curl * C;
            force.y *= -1.0;
    
            vec2 velocity = texture2D(uVelocity, vUv).xy;
            velocity += force * dt;
            velocity = min(max(velocity, -1000.0), 1000.0);
            gl_FragColor = vec4(velocity, 0.0, 1.0);
        }
    `
    );

    const pressureShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision mediump float;
        precision mediump sampler2D;
    
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uPressure;
        uniform sampler2D uDivergence;
    
        void main () {
            float L = texture2D(uPressure, vL).x;
            float R = texture2D(uPressure, vR).x;
            float T = texture2D(uPressure, vT).x;
            float B = texture2D(uPressure, vB).x;
            float C = texture2D(uPressure, vUv).x;
            float divergence = texture2D(uDivergence, vUv).x;
            float pressure = (L + R + B + T - divergence) * 0.25;
            gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
        }
    `
    );

    const gradientSubtractShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision mediump float;
        precision mediump sampler2D;
    
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uPressure;
        uniform sampler2D uVelocity;
    
        void main () {
            float L = texture2D(uPressure, vL).x;
            float R = texture2D(uPressure, vR).x;
            float T = texture2D(uPressure, vT).x;
            float B = texture2D(uPressure, vB).x;
            vec2 velocity = texture2D(uVelocity, vUv).xy;
            velocity.xy -= vec2(R - L, T - B);
            gl_FragColor = vec4(velocity, 0.0, 1.0);
        }
    `
    );

    const blit = (() => {
      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]),
        gl.STATIC_DRAW
      );
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(
        gl.ELEMENT_ARRAY_BUFFER,
        new Uint16Array([0, 1, 2, 0, 2, 3]),
        gl.STATIC_DRAW
      );
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(0);

      return (target, clear = false) => {
        if (target == null) {
          gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
          gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        } else {
          gl.viewport(0, 0, target.width, target.height);
          gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
        }
        if (clear) {
          gl.clearColor(0.0, 0.0, 0.0, 1.0);
          gl.clear(gl.COLOR_BUFFER_BIT);
        }
        // CHECK_FRAMEBUFFER_STATUS();
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
      };
    })();

    function CHECK_FRAMEBUFFER_STATUS() {
      let status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
      if (status != gl.FRAMEBUFFER_COMPLETE)
        console.trace("Framebuffer error: " + status);
    }

    let dye;
    let velocity;
    let divergence;
    let curl;
    let pressure;
    let ditheringTexture = createTextureAsync(
      "../app/themes/flipp/dist/images/LDR_LLL1_0.png"
    );

    const blurProgram = new Program(blurVertexShader, blurShader);
    const copyProgram = new Program(baseVertexShader, copyShader);
    const clearProgram = new Program(baseVertexShader, clearShader);
    const colorProgram = new Program(baseVertexShader, colorShader);
    const splatProgram = new Program(baseVertexShader, splatShader);
    const advectionProgram = new Program(baseVertexShader, advectionShader);
    const divergenceProgram = new Program(baseVertexShader, divergenceShader);
    const curlProgram = new Program(baseVertexShader, curlShader);
    const vorticityProgram = new Program(baseVertexShader, vorticityShader);
    const pressureProgram = new Program(baseVertexShader, pressureShader);
    const gradienSubtractProgram = new Program(
      baseVertexShader,
      gradientSubtractShader
    );

    const displayMaterial = new Material(baseVertexShader, displayShaderSource);

    function initFramebuffers() {
      let simRes = getResolution(config.SIM_RESOLUTION);
      let dyeRes = getResolution(config.DYE_RESOLUTION);

      const texType = ext.halfFloatTexType;
      const rgba = ext.formatRGBA;
      const rg = ext.formatRG;
      const r = ext.formatR;
      const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;

      gl.disable(gl.BLEND);

      if (dye == null)
        dye = createDoubleFBO(
          dyeRes.width,
          dyeRes.height,
          rgba.internalFormat,
          rgba.format,
          texType,
          filtering
        );
      else
        dye = resizeDoubleFBO(
          dye,
          dyeRes.width,
          dyeRes.height,
          rgba.internalFormat,
          rgba.format,
          texType,
          filtering
        );

      if (velocity == null)
        velocity = createDoubleFBO(
          simRes.width,
          simRes.height,
          rg.internalFormat,
          rg.format,
          texType,
          filtering
        );
      else
        velocity = resizeDoubleFBO(
          velocity,
          simRes.width,
          simRes.height,
          rg.internalFormat,
          rg.format,
          texType,
          filtering
        );

      divergence = createFBO(
        simRes.width,
        simRes.height,
        r.internalFormat,
        r.format,
        texType,
        gl.NEAREST
      );
      curl = createFBO(
        simRes.width,
        simRes.height,
        r.internalFormat,
        r.format,
        texType,
        gl.NEAREST
      );
      pressure = createDoubleFBO(
        simRes.width,
        simRes.height,
        r.internalFormat,
        r.format,
        texType,
        gl.NEAREST
      );
    }

    function createFBO(w, h, internalFormat, format, type, param) {
      gl.activeTexture(gl.TEXTURE0);
      let texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        internalFormat,
        w,
        h,
        0,
        format,
        type,
        null
      );

      let fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(
        gl.FRAMEBUFFER,
        gl.COLOR_ATTACHMENT0,
        gl.TEXTURE_2D,
        texture,
        0
      );
      gl.viewport(0, 0, w, h);
      gl.clear(gl.COLOR_BUFFER_BIT);

      let texelSizeX = 1.0 / w;
      let texelSizeY = 1.0 / h;

      return {
        texture,
        fbo,
        width: w,
        height: h,
        texelSizeX,
        texelSizeY,
        attach(id) {
          gl.activeTexture(gl.TEXTURE0 + id);
          gl.bindTexture(gl.TEXTURE_2D, texture);
          return id;
        },
      };
    }

    function createDoubleFBO(w, h, internalFormat, format, type, param) {
      let fbo1 = createFBO(w, h, internalFormat, format, type, param);
      let fbo2 = createFBO(w, h, internalFormat, format, type, param);

      return {
        width: w,
        height: h,
        texelSizeX: fbo1.texelSizeX,
        texelSizeY: fbo1.texelSizeY,
        get read() {
          return fbo1;
        },
        set read(value) {
          fbo1 = value;
        },
        get write() {
          return fbo2;
        },
        set write(value) {
          fbo2 = value;
        },
        swap() {
          let temp = fbo1;
          fbo1 = fbo2;
          fbo2 = temp;
        },
      };
    }

    function resizeFBO(target, w, h, internalFormat, format, type, param) {
      let newFBO = createFBO(w, h, internalFormat, format, type, param);
      copyProgram.bind();
      gl.uniform1i(copyProgram.uniforms.uTexture, target.attach(0));
      blit(newFBO);
      return newFBO;
    }

    function resizeDoubleFBO(
      target,
      w,
      h,
      internalFormat,
      format,
      type,
      param
    ) {
      if (target.width == w && target.height == h) return target;
      target.read = resizeFBO(
        target.read,
        w,
        h,
        internalFormat,
        format,
        type,
        param
      );
      target.write = createFBO(w, h, internalFormat, format, type, param);
      target.width = w;
      target.height = h;
      target.texelSizeX = 1.0 / w;
      target.texelSizeY = 1.0 / h;
      return target;
    }

    function createTextureAsync(url) {
      let texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGB,
        1,
        1,
        0,
        gl.RGB,
        gl.UNSIGNED_BYTE,
        new Uint8Array([255, 255, 255])
      );

      let obj = {
        texture,
        width: 1,
        height: 1,
        attach(id) {
          gl.activeTexture(gl.TEXTURE0 + id);
          gl.bindTexture(gl.TEXTURE_2D, texture);
          return id;
        },
      };

      let image = new Image();
      image.onload = () => {
        obj.width = image.width;
        obj.height = image.height;
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGB,
          gl.RGB,
          gl.UNSIGNED_BYTE,
          image
        );
      };
      image.src = url;

      return obj;
    }

    function updateKeywords() {
      let displayKeywords = [];
      if (config.SHADING) displayKeywords.push("SHADING");
      displayMaterial.setKeywords(displayKeywords);
    }

    updateKeywords();
    initFramebuffers();

    let lastUpdateTime = Date.now();
    let colorUpdateTimer = 0.0;

    function update() {
      const dt = calcDeltaTime();
      // console.log(dt)
      if (resizeCanvas()) initFramebuffers();
      // updateColors(dt);
      applyInputs();
      step(dt);
      render(null);
      requestAnimationFrame(update);
    }

    function calcDeltaTime() {
      let now = Date.now();
      let dt = (now - lastUpdateTime) / 1000;
      dt = Math.min(dt, 0.016666);
      lastUpdateTime = now;
      return dt;
    }

    function resizeCanvas() {
      let width = scaleByPixelRatio(canvas.clientWidth);
      let height = scaleByPixelRatio(canvas.clientHeight);
      if (canvas.width != width || canvas.height != height) {
        canvas.width = width;
        canvas.height = height;
        return true;
      }
      return false;
    }

    function updateColors(dt) {
      colorUpdateTimer += dt * config.COLOR_UPDATE_SPEED;
      if (colorUpdateTimer >= 1) {
        colorUpdateTimer = wrap(colorUpdateTimer, 0, 1);
        pointers.forEach((p) => {
          p.color = generateColor();
        });
      }
    }

    function applyInputs() {
      pointers.forEach((p) => {
        if (p.moved) {
          p.moved = false;
          splatPointer(p);
        }
      });
    }

    function step(dt) {
      gl.disable(gl.BLEND);

      curlProgram.bind();
      gl.uniform2f(
        curlProgram.uniforms.texelSize,
        velocity.texelSizeX,
        velocity.texelSizeY
      );
      gl.uniform1i(curlProgram.uniforms.uVelocity, velocity.read.attach(0));
      blit(curl);

      vorticityProgram.bind();
      gl.uniform2f(
        vorticityProgram.uniforms.texelSize,
        velocity.texelSizeX,
        velocity.texelSizeY
      );
      gl.uniform1i(
        vorticityProgram.uniforms.uVelocity,
        velocity.read.attach(0)
      );
      gl.uniform1i(vorticityProgram.uniforms.uCurl, curl.attach(1));
      gl.uniform1f(vorticityProgram.uniforms.curl, config.CURL);
      gl.uniform1f(vorticityProgram.uniforms.dt, dt);
      blit(velocity.write);
      velocity.swap();

      divergenceProgram.bind();
      gl.uniform2f(
        divergenceProgram.uniforms.texelSize,
        velocity.texelSizeX,
        velocity.texelSizeY
      );
      gl.uniform1i(
        divergenceProgram.uniforms.uVelocity,
        velocity.read.attach(0)
      );
      blit(divergence);

      clearProgram.bind();
      gl.uniform1i(clearProgram.uniforms.uTexture, pressure.read.attach(0));
      gl.uniform1f(clearProgram.uniforms.value, config.PRESSURE);
      blit(pressure.write);
      pressure.swap();

      pressureProgram.bind();
      gl.uniform2f(
        pressureProgram.uniforms.texelSize,
        velocity.texelSizeX,
        velocity.texelSizeY
      );
      gl.uniform1i(pressureProgram.uniforms.uDivergence, divergence.attach(0));
      for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {
        gl.uniform1i(
          pressureProgram.uniforms.uPressure,
          pressure.read.attach(1)
        );
        blit(pressure.write);
        pressure.swap();
      }

      gradienSubtractProgram.bind();
      gl.uniform2f(
        gradienSubtractProgram.uniforms.texelSize,
        velocity.texelSizeX,
        velocity.texelSizeY
      );
      gl.uniform1i(
        gradienSubtractProgram.uniforms.uPressure,
        pressure.read.attach(0)
      );
      gl.uniform1i(
        gradienSubtractProgram.uniforms.uVelocity,
        velocity.read.attach(1)
      );
      blit(velocity.write);
      velocity.swap();

      advectionProgram.bind();
      gl.uniform2f(
        advectionProgram.uniforms.texelSize,
        velocity.texelSizeX,
        velocity.texelSizeY
      );
      if (!ext.supportLinearFiltering)
        gl.uniform2f(
          advectionProgram.uniforms.dyeTexelSize,
          velocity.texelSizeX,
          velocity.texelSizeY
        );
      let velocityId = velocity.read.attach(0);
      gl.uniform1i(advectionProgram.uniforms.uVelocity, velocityId);
      gl.uniform1i(advectionProgram.uniforms.uSource, velocityId);
      gl.uniform1f(advectionProgram.uniforms.dt, dt);
      gl.uniform1f(
        advectionProgram.uniforms.dissipation,
        config.VELOCITY_DISSIPATION
      );
      blit(velocity.write);
      velocity.swap();

      if (!ext.supportLinearFiltering)
        gl.uniform2f(
          advectionProgram.uniforms.dyeTexelSize,
          dye.texelSizeX,
          dye.texelSizeY
        );
      gl.uniform1i(
        advectionProgram.uniforms.uVelocity,
        velocity.read.attach(0)
      );
      gl.uniform1i(advectionProgram.uniforms.uSource, dye.read.attach(1));
      gl.uniform1f(
        advectionProgram.uniforms.dissipation,
        config.DENSITY_DISSIPATION
      );
      blit(dye.write);
      dye.swap();
    }

    function render(target) {
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.enable(gl.BLEND);
      drawDisplay(target);
    }

    function drawDisplay(target) {
      let width = target == null ? gl.drawingBufferWidth : target.width;
      let height = target == null ? gl.drawingBufferHeight : target.height;

      displayMaterial.bind();
      if (config.SHADING)
        gl.uniform2f(
          displayMaterial.uniforms.texelSize,
          1.0 / width,
          1.0 / height
        );
      gl.uniform1i(displayMaterial.uniforms.uTexture, dye.read.attach(0));
      blit(target);
    }

    function splatPointer(pointer) {
      let dx = pointer.deltaX * config.SPLAT_FORCE;
      let dy = pointer.deltaY * config.SPLAT_FORCE;
      splat(pointer.texcoordX, pointer.texcoordY, dx, dy, pointer.color);
    }

    function clickSplat(pointer) {
      const color = generateColor();
      color.r *= 10.0;
      color.g *= 10.0;
      color.b *= 10.0;
      let dx = 10 * (Math.random() - 0.5);
      let dy = 30 * (Math.random() - 0.5);
      splat(pointer.texcoordX, pointer.texcoordY, dx, dy, color);
    }

    function splat(x, y, dx, dy, color) {
      splatProgram.bind();
      gl.uniform1i(splatProgram.uniforms.uTarget, velocity.read.attach(0));
      gl.uniform1f(
        splatProgram.uniforms.aspectRatio,
        canvas.width / canvas.height
      );
      gl.uniform2f(splatProgram.uniforms.point, x, y);
      gl.uniform3f(splatProgram.uniforms.color, dx, dy, 0.0);
      gl.uniform1f(
        splatProgram.uniforms.radius,
        correctRadius(config.SPLAT_RADIUS / 100.0)
      );
      blit(velocity.write);
      velocity.swap();

      gl.uniform1i(splatProgram.uniforms.uTarget, dye.read.attach(0));
      gl.uniform3f(splatProgram.uniforms.color, color.r, color.g, color.b);
      blit(dye.write);
      dye.swap();
    }

    function correctRadius(radius) {
      let aspectRatio = canvas.width / canvas.height;
      if (aspectRatio > 1) radius *= aspectRatio;
      return radius;
    }

    window.addEventListener("mousedown", (e) => {
      let pointer = pointers[0];
      let posX = scaleByPixelRatio(e.clientX);
      let posY = scaleByPixelRatio(e.clientY);
      updatePointerDownData(pointer, -1, posX, posY);
      clickSplat(pointer);
    });

    $("body").one("mousemove", (e) => {
      let pointer = pointers[0];
      let posX = scaleByPixelRatio(e.clientX);
      let posY = scaleByPixelRatio(e.clientY);
      let color = generateColor();
      update();
      updatePointerMoveData(pointer, posX, posY, color);
    });

    window.addEventListener("mousemove", (e) => {
      let pointer = pointers[0];
      let posX = scaleByPixelRatio(e.clientX);
      let posY = scaleByPixelRatio(e.clientY);
      let color = pointer.color;
      updatePointerMoveData(pointer, posX, posY, color);
    });

    $("body").one("touchstart", (e) => {
      const touches = e.targetTouches;
      let touch = touches[0];
      let pointer = pointers[0];
      for (let i = 0; i < touches.length; i++) {
        let posX = scaleByPixelRatio(touches[i].clientX);
        let posY = scaleByPixelRatio(touches[i].clientY);
        update();
        updatePointerDownData(pointer, touches[i].identifier, posX, posY);
      }
    });

    window.addEventListener("touchstart", (e) => {
      const touches = e.targetTouches;
      let pointer = pointers[0];
      for (let i = 0; i < touches.length; i++) {
        let posX = scaleByPixelRatio(touches[i].clientX);
        let posY = scaleByPixelRatio(touches[i].clientY);
        updatePointerDownData(pointer, touches[i].identifier, posX, posY);
      }
    });

    window.addEventListener(
      "touchmove",
      (e) => {
        const touches = e.targetTouches;
        let pointer = pointers[0];
        for (let i = 0; i < touches.length; i++) {
          let posX = scaleByPixelRatio(touches[i].clientX);
          let posY = scaleByPixelRatio(touches[i].clientY);
          updatePointerMoveData(pointer, posX, posY, pointer.color);
        }
      },
      false
    );

    window.addEventListener("touchend", (e) => {
      const touches = e.changedTouches;
      let pointer = pointers[0];

      for (let i = 0; i < touches.length; i++) {
        updatePointerUpData(pointer);
      }
    });

    function updatePointerDownData(pointer, id, posX, posY) {
      pointer.id = id;
      pointer.down = true;
      pointer.moved = false;
      pointer.texcoordX = posX / canvas.width;
      pointer.texcoordY = 1.0 - posY / canvas.height;
      pointer.prevTexcoordX = pointer.texcoordX;
      pointer.prevTexcoordY = pointer.texcoordY;
      pointer.deltaX = 0;
      pointer.deltaY = 0;
      pointer.color = generateColor();
    }

    function updatePointerMoveData(pointer, posX, posY, color) {
      // pointer.down = false;
      pointer.prevTexcoordX = pointer.texcoordX;
      pointer.prevTexcoordY = pointer.texcoordY;
      pointer.texcoordX = posX / canvas.width;
      pointer.texcoordY = 1.0 - posY / canvas.height;
      pointer.deltaX = correctDeltaX(pointer.texcoordX - pointer.prevTexcoordX);
      pointer.deltaY = correctDeltaY(pointer.texcoordY - pointer.prevTexcoordY);
      pointer.moved =
        Math.abs(pointer.deltaX) > 0 || Math.abs(pointer.deltaY) > 0;
      pointer.color = color;
    }

    function updatePointerUpData(pointer) {
      pointer.down = false;
    }

    function correctDeltaX(delta) {
      let aspectRatio = canvas.width / canvas.height;
      if (aspectRatio < 1) delta *= aspectRatio;
      return delta;
    }

    function correctDeltaY(delta) {
      let aspectRatio = canvas.width / canvas.height;
      if (aspectRatio > 1) delta /= aspectRatio;
      return delta;
    }

    function generateColor() {
      let temp = 0.04052904016747072; //cursor Math.random()
      let c = HSVtoRGB(temp, 1.0, 1.0);
      c.r *= 0.15;
      c.g *= 0.15;
      c.b *= 0.15;
      return c;
    }

    function HSVtoRGB(h, s, v) {
      let r, g, b, i, f, p, q, t;
      i = Math.floor(h * 6);
      f = h * 6 - i;
      p = v * (1 - s);
      q = v * (1 - f * s);
      t = v * (1 - (1 - f) * s);

      switch (i % 6) {
        case 0:
          (r = v), (g = t), (b = p);
          break;
        case 1:
          (r = q), (g = v), (b = p);
          break;
        case 2:
          (r = p), (g = v), (b = t);
          break;
        case 3:
          (r = p), (g = q), (b = v);
          break;
        case 4:
          (r = t), (g = p), (b = v);
          break;
        case 5:
          (r = v), (g = p), (b = q);
          break;
      }

      return {
        r,
        g,
        b,
      };
    }

    function wrap(value, min, max) {
      let range = max - min;
      if (range == 0) return min;
      return ((value - min) % range) + min;
    }

    function getResolution(resolution) {
      let aspectRatio = gl.drawingBufferWidth / gl.drawingBufferHeight;
      if (aspectRatio < 1) aspectRatio = 1.0 / aspectRatio;

      let min = Math.round(resolution);
      let max = Math.round(resolution * aspectRatio);

      if (gl.drawingBufferWidth > gl.drawingBufferHeight)
        return { width: max, height: min };
      else return { width: min, height: max };
    }

    function scaleByPixelRatio(input) {
      let pixelRatio = window.devicePixelRatio || 1;
      return Math.floor(input * pixelRatio);
    }

    function hashCode(s) {
      if (s.length == 0) return 0;
      let hash = 0;
      for (let i = 0; i < s.length; i++) {
        hash = (hash << 5) - hash + s.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
      }
      return hash;
    }
  }
  // End-Cursor
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
        .to(BACKGROUND_SETTINGS, {
          speed: 2,
          duration: 3,
          ease: "power2.inOut",
        })
        .to(
          ".hero__title-letter",
          {
            scaleY: 1,
            ease: "elastic.out(1,0.5)",
            duration: 1.3,
            stagger: 0.07,
          },
          "-=0.5"
        )
        .to(
          ".sec-nav",
          { opacity: 1, duration: 1.2, ease: "power3.out" },
          "-=0.6"
        )
        .to(
          ".subtext__role",
          { opacity: 1, duration: 1.2, ease: "power3.out" },
          "<"
        );
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
      this.tlOverlapAnim
        .to(baseMetalMaterial, { opacity: 0, duration: 0.1 }, 0)
        .to(darkPlasticMaterial, { opacity: 0, duration: 0.1 }, "<")
        .to(cameraMaterial, { opacity: 0, duration: 0.1 }, "<")
        .to(keyboardMaterial, { opacity: 0, duration: 0.1 }, "<")
        .to(macGroup.rotation, { x: 0, y: 0 })
        .to(lidGroup.rotation, { x: 0 }, "<")
        .to(macGroup.scale, { x: 1.5, y: 1.5, z: 1.5 }, "<")
        .to(macGroup.position, { y: -12 }, "<")
        .to(macGroup.position, { y: 22 });
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
        .to(".first-words", {
          opacity: 0,
          scale: 1.1,
          duration: 2,
          ease: "none",
        })
        .to(secondWords.chars, {
          translateY: "0px",
          translateZ: "0px",
          rotate: "0deg",
          opacity: 1,
          ease: "none",
          stagger: 0.03,
        })
        .to(".second-words", {
          opacity: 0,
          scale: 1.1,
          duration: 2,
          ease: "none",
        });

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
