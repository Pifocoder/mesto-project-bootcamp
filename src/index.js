import './pages/index.css';

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];
  
import { renderCards } from './scripts/card.js'
import { openPopup, renderCloseButtons, setProfileFormStartInfo, addFormProfileElementListener, addFormAddCardListener, addPopupsListeners} from './scripts/modal.js'

renderCards(initialCards);
renderCloseButtons();

const profilePopup =  document.querySelector('.popup-profile');
const editProfileButton = document.querySelector('.profile__edit-button');
setProfileFormStartInfo();
editProfileButton.addEventListener('click', function() {
    setProfileFormStartInfo();
    openPopup(profilePopup);
});
addFormProfileElementListener()
addFormAddCardListener();

const addCardButton = document.querySelector('.profile__add-button');
const addButtonPopup = document.querySelector('.popup-add-card');
addCardButton.addEventListener('click', function() {
    openPopup(addButtonPopup);
});

import { enableValidation } from './scripts/validate.js'
enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__item',

    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',

    inputErrorClass: 'popup__item_type_error',
    errorClass: 'popup__error_visible'
})
addPopupsListeners();