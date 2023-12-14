// import "./style.css";
import './styles/demos/demo-1.scss';

import App from "./app.js";

new App();

document.querySelector("#app").innerHTML = `
  <div class="demo-1">
    <div class="demo-1__header">
      <h1 class="demo-1__title">
        Planete Elevene
      </h1>
    </div>

    <div class="demo-1__gallery">
      <figure class="demo-1__gallery__figure">
        <img class="demo-1__gallery__image" src="images/hero-img/1.jpg">
      </figure>

      <figure class="demo-1__gallery__figure">
        <img class="demo-1__gallery__image" src="images/hero-img/2.jpg">
      </figure>

      <figure class="demo-1__gallery__figure">
        <img class="demo-1__gallery__image" src="images/hero-img/3.jpg">
      </figure>

      <figure class="demo-1__gallery__figure">
        <img class="demo-1__gallery__image" src="images/hero-img/4.jpg">
      </figure>

      <figure class="demo-1__gallery__figure">
        <img class="demo-1__gallery__image" src="images/hero-img/5.jpg">
      </figure>

      <figure class="demo-1__gallery__figure">
        <img class="demo-1__gallery__image" src="images/hero-img/6.jpg">
      </figure>

      <figure class="demo-1__gallery__figure">
        <img class="demo-1__gallery__image" src="images/hero-img/7.jpg">
      </figure>

      <figure class="demo-1__gallery__figure">
        <img class="demo-1__gallery__image" src="images/hero-img/8.jpg">
      </figure>

      <figure class="demo-1__gallery__figure">
        <img class="demo-1__gallery__image" src="images/hero-img/9.jpg">
      </figure>

      <figure class="demo-1__gallery__figure">
        <img class="demo-1__gallery__image" src="images/hero-img/10.jpg">
      </figure>

      <figure class="demo-1__gallery__figure">
        <img class="demo-1__gallery__image" src="images/hero-img/11.jpg">
      </figure>

      <figure class="demo-1__gallery__figure">
        <img class="demo-1__gallery__image" src="images/hero-img/12.jpg">
      </figure>
    </div>
  </div>
`;

const images = document.querySelectorAll('img')
let imagesIndex = 0

Array.from(images).forEach(element => {
  const image = new Image()

  image.src = element.src
  image.onload = _ => {
    imagesIndex += 1

    if (imagesIndex === images.length) {
      document.documentElement.classList.remove('loading')
      document.documentElement.classList.add('loaded')
    }
  }
})
