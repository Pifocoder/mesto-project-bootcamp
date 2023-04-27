import { openPopup } from './modal.js'
export { addCard, renderCards }

const popupPhoto = document.querySelector('.popup-card');
const photoPopup = popupPhoto.querySelector('.popup-card__photo');
const galleryBlock = document.querySelector('.gallery');
const imageTemplate = document.querySelector('#gallery__card').content;

function createCard(name, link) {
    const imageElement = imageTemplate.querySelector('.gallery__card').cloneNode(true);
    imageElement.querySelector('.gallery__name').textContent = name;
    const imagePhoto = imageElement.querySelector('.gallery__photo');
  
    imagePhoto.src = link;
    imagePhoto.alt = name;
    
    function deleteCard(item) {
      item.remove();
    }
    imageElement.querySelector('.gallery__delete-card').addEventListener('click',function() {
      deleteCard(imageElement);
    });
  
    function toggleLike(item) {
      item.classList.toggle('gallery__icon_active');
    }
    const imageIcon = imageElement.querySelector('.gallery__icon');
    imageIcon.addEventListener('click', () => {
      toggleLike(imageIcon);
    });
  
    function clickPhoto(name, src) {
      openPopup(popupPhoto);
  
      photoPopup.src = src;
      photoPopup.alt = name;
      popupPhoto.querySelector('.popup-card__name').textContent = name;
    }
    imageElement.querySelector('.gallery__photo-area').addEventListener('click', function() {
      clickPhoto(name, link);
    });
    return imageElement;
}
function addCard(name, link) {
    const imageElement = createCard(name, link);
    galleryBlock.prepend(imageElement);
}
function renderCards(initialCards) {
    for (let item = initialCards.length - 1; item >= 0; --item) {
        addCard(initialCards[item].name, initialCards[item].link);
    }
}