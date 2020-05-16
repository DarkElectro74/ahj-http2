/* eslint-disable class-methods-use-this */
export default class ImageLoader {
  constructor(loadedImages, error) {
    this.loadedImages = loadedImages;
    this.error = error;
  }

  addImage(name, url) {
    const image = document.createElement('img');
    image.src = url;

    image.addEventListener('load', () => {
      this.error.classList.add('hidden');
      image.className = 'image';
      image.alt = name;
      // <img class="image" src="" alt="${name}">

      const loadedImage = document.createElement('div');
      loadedImage.className = 'loaded-image';
      loadedImage.innerHTML = '<div class="delete"></div>';
      loadedImage.appendChild(image);
      this.loadedImages.appendChild(loadedImage);
      // <div class="loaded-image">
      //   <div class="delete"></div>
      //   <img class="image" src="./img/image-2.png" alt="image-2">
      // </div>
    });

    image.addEventListener('error', () => {
      this.error.classList.remove('hidden');
    });
  }
}