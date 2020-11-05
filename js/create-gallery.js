import images from "./gallery-items.js";
console.log(images);

const galleryContainer = document.querySelector('.js-gallery');
const addGalleryContainer = createGalleryMarkup(images);
galleryContainer.insertAdjacentHTML("beforeend", addGalleryContainer)

function createGalleryMarkup(img) {
  return img
    .map(({ preview, original, description }) => {
      let i = `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
      return i;
    })
    .join("");
  
} 

const containerModalOpen = document.querySelector('div.lightbox');
const currentCardActive = document.querySelector('.lightbox.is-open');
const lightboxImageRef = document.querySelector('.lightbox__image'); 
const modalCloseBtnRef = document.querySelector('button[data-action="close-lightbox"]');
const lightboxOverlayRef = document.querySelector('lightbox__overlay');

galleryContainer.addEventListener('click', onGalleryContainerClick);


function onGalleryContainerClick(e) {
  e.preventDefault();
  const isGalleryEl = e.target.classList.contains('js-gallery');
  if (isGalleryEl) {
    return;
  }
  console.log('target', e.target);
  console.log('currenttarget', e.currentTarget);

  onOpenModal();
  onAddModalImage(e );

}

function onOpenModal() {
  containerModalOpen.classList.add('is-open');
  window.addEventListener('keydown', onEscKeyPress);
}

function onAddModalImage(e) {
  lightboxImageRef.src = e.target.dataset.source;
  lightboxImageRef.alt = e.target.alt; 
}

modalCloseBtnRef.addEventListener('click', onClouseModal);
lightboxOverlayRef.addEventListener('click', onClouseModal);

function onClouseModal() {
  containerModalOpen.classList.remove('is-open');
  lightboxImageRef.src = '';
  lightboxImageRef.alt = ''; 
  window.removeEventListener('keydown', onEscKeyPress);
}

function onEscKeyPress(e) {
  const isEscKey = e.code === 'Escape';
  if (isEscKey) {
    onClouseModal();
  }
}



















