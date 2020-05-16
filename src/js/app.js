/* eslint-disable no-console */
import ImageLoader from './ImageLoader';

const loadedImage = document.getElementsByClassName('loaded-images')[0];
const error = document.getElementById('error');
const selectFile = document.querySelector('#select-file');
const dropFile = document.querySelector('#drop-file');
const imageLoader = new ImageLoader(loadedImage, error);

const server = 'https://ahj-homeworks-http-task2.herokuapp.com/';

function loadFile(files) {
  for (const item of files) {
    const formData = new FormData();
    formData.append('file', item);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${server}`);

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const imageUrl = `${server}/${xhr.response}`;
        imageLoader.addImage('no-name', imageUrl);
      }
    });
    xhr.send(formData);
  }
}

dropFile.addEventListener('click', () => {
  selectFile.value = null;
  selectFile.dispatchEvent(new MouseEvent('click'));
});

dropFile.addEventListener('dragover', (event) => {
  event.preventDefault();
});

dropFile.addEventListener('drop', (event) => {
  event.preventDefault();
  const files = Array.from(event.dataTransfer.files);
  loadFile(files);
});

selectFile.addEventListener('input', (event) => {
  const files = Array.from(event.currentTarget.files);
  loadFile(files);
});

loadedImage.addEventListener('click', (event) => {
  if (event.target.className === 'delete') {
    const image = event.target.closest('.loaded-image');
    const params = new URLSearchParams();
    params.append('file', image.querySelector('.image').src);

    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', `${server}/?${params}`);
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        console.log(xhr.responseText);
      }

      console.log(xhr.responseText);
    });
    xhr.send();

    loadedImage.removeChild(image);
  }
});