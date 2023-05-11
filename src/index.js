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
function init() {
  Promise.all([
    getProfileInfo(), 
    getCards()
  ]) 
  .then(([info, initialCards])=>{
    thisUser = info;
    profileName.textContent = info["name"];
    profileBio.textContent = info["about"];
    setProfileAvatar(info["avatar"]);
    renderCards(initialCards, thisUser);
  }) 
  .catch((error)=>{
    console.log(error);
  })
}
init();