import './pages/index.css';
  
import { renderCards } from './scripts/card.js'
import { openPopup, renderCloseButtons, setProfileFormStartInfo, addFormProfileElementListener, addFormAddCardListener, addPopupsListeners, addUpdateProfileAvatarListener, setProfileAvatar} from './scripts/modal.js'
import { enableValidation } from './scripts/validate.js'


const profilePopup =  document.querySelector('.popup-profile');
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const addButtonPopup = document.querySelector('.popup-add-card');

const profileAvatar = document.querySelector('.profile__avatar');
const profileAvatarArea = document.querySelector('.profile__avatar-area');
const profileAvatarEdit = document.querySelector('.profile__avatar-edit');
const profileAvatarPopup = document.querySelector('.popup-update-avatar');
profileAvatarArea.addEventListener('mouseover', function() {
  profileAvatar.classList.add('profile__avatar_handel');
  profileAvatarEdit.classList.add('profile__avatar-edit_active');
})
profileAvatarArea.addEventListener('mouseout', function() {
  profileAvatar.classList.remove('profile__avatar_handel');
  profileAvatarEdit.classList.remove('profile__avatar-edit_active');
})
profileAvatarArea.addEventListener('click', function() {
  openPopup(profileAvatarPopup);
})
// renderCards(initialCards);
renderCloseButtons();

setProfileFormStartInfo();
editProfileButton.addEventListener('click', function() {
    setProfileFormStartInfo();
    openPopup(profilePopup);
});
addFormProfileElementListener()
addFormAddCardListener();
addUpdateProfileAvatarListener();

addCardButton.addEventListener('click', function() {
    openPopup(addButtonPopup);
});

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__item',

    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',

    inputErrorClass: 'popup__item_type_error',
    errorClass: 'popup__error_visible'
})
addPopupsListeners();

const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');

import { getProfileInfo, getCards } from './scripts/api.js'

let thisUser;
function initProfile() {
  getProfileInfo()
  .then((result) => {
    thisUser = result;
    profileName.textContent = result["name"];
    profileBio.textContent = result["about"];
    setProfileAvatar(result["avatar"]);
    //profileAvatar.src = result[""]
  })
}

initProfile();


function initGallery() {
  getCards()
  .then((result) => {
    renderCards(result, thisUser);
  })
  .catch((reason) => {
    console.log(reason);
  })
}
initGallery();
// getProfileInfo();
// updateProfileData('Andrey','I would like to finish mapku');
// console.log(getProfileInfo());