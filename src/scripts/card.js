import { openPopup } from './modal.js'
import { addReaction, removeReaction, unregisterCard} from './api.js'
export { addCard, renderCards }

const popupPhoto = document.querySelector('.popup-card');
const photoPopup = popupPhoto.querySelector('.popup-card__photo');
const photoName = popupPhoto.querySelector('.popup-card__name');
const galleryBlock = document.querySelector('.gallery');
const imageTemplate = document.querySelector('#gallery__card').content;

function createCard(card, thisUser) {
    const imageElement = imageTemplate.querySelector('.gallery__card').cloneNode(true);
    imageElement.querySelector('.gallery__name').textContent = card.name;

    const imagePhoto = imageElement.querySelector('.gallery__photo');
    const numberOfLikes = imageElement.querySelector('.gallery__likes-number');

    numberOfLikes.textContent = card.likes.length;
    imagePhoto.src = card.link;
    imagePhoto.alt = card.name;
    imageElement.dataset.cardId = card._id;

    function deleteCard(item) {
;
      unregisterCard(item.dataset.cardId)
      .then(()=>{
        item.remove();
      })
      .catch((reason) => {
        console.log(reason);
      })
    }
    const bucket = imageElement.querySelector('.gallery__delete-card');
    if (card.owner._id != thisUser._id) {
      bucket.setAttribute('disabled', 'disabled');
      bucket.classList.add('gallery__icon_disabled')
    }
    bucket.addEventListener('click',function() {
      deleteCard(imageElement);
    });
  
    function toggleLike(item) {
      item.classList.toggle('gallery__icon_active');
    }

    const imageIcon = imageElement.querySelector('.gallery__icon');
    for (let number in card.likes) {
      if (card.likes[number]._id == thisUser._id) {
        toggleLike(imageIcon);
        break;
      }
    }
    imageIcon.addEventListener('click', () => {
      if (imageIcon.classList.contains('gallery__icon_active')) {
        removeReaction(imageElement.dataset.cardId)
        .then((result) => {
          numberOfLikes.textContent = result.likes.length;
          toggleLike(imageIcon);
        })
        .catch((reason) => {
          console.log(reason);
        })
      } else {
        addReaction(imageElement.dataset.cardId)
        .then((result) => {
          numberOfLikes.textContent = result.likes.length;
          toggleLike(imageIcon);
        })
        .catch((reason) => {
          console.log(reason);
        })
      }
    });
  
    function clickPhoto(name, src) {
      openPopup(popupPhoto);
  
      photoPopup.src = src;
      photoPopup.alt = name;
      photoName.textContent = name;
    }
    imageElement.querySelector('.gallery__photo-area').addEventListener('click', function() {
      clickPhoto(card.name, card.link);
    });
    return imageElement;
}
function addCard(card, thisUser) {
    const imageElement = createCard(card, thisUser);
    galleryBlock.prepend(imageElement);
}
function renderCards(initialCards, thisUser) {
    for (let item = initialCards.length - 1; item >= 0; --item) {
        addCard(initialCards[item], thisUser);
    }
}
