export { openPopup, renderCloseButtons, setProfileFormStartInfo, setProfileAvatar, addFormProfileElementListener, addFormAddCardListener, addPopupsListeners, addUpdateProfileAvatarListener}
import { addCard } from './card.js'
import { registerCard, updateProfileAvatar } from './api.js'

const formProfileElement = document.querySelector('.popup-profile__form');
const nameInput = formProfileElement.querySelector('[name="profile-name"]');
const bioInput = formProfileElement.querySelector('[name="profile-bio"]');
const buttonProfileSubmit = formProfileElement.querySelector('.popup-profile__button');

const profilePopup = document.querySelector('.popup-profile');
const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');
const profileAvatar = document.querySelector('.profile__avatar');
const closeButtons = document.querySelectorAll('.popup__close');
const formAddCardElement = document.querySelector('.popup-add-card__form');
const cardNameInput = formAddCardElement.querySelector('[name="card-name"]');
const cardLinkInput = formAddCardElement.querySelector('[name="card-link"]');
const addButtonPopup = document.querySelector('.popup-add-card');
const popups = document.querySelectorAll('.popup');

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape)
}
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape)
}
function renderCloseButtons() {
    closeButtons.forEach((button) => {
        const popup = button.closest('.popup');
        button.addEventListener('click', () => closePopup(popup));
    });
}
function setProfileFormStartInfo() {
    nameInput.value = profileName.textContent;
    bioInput.value = profileBio.textContent;
    buttonProfileSubmit.textContent = "Сохранить";
}

import { updateProfileInfo } from './api.js'
function addFormProfileElementListener() {
    formProfileElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        buttonProfileSubmit.textContent = "Сохранение...";
        updateProfileInfo(nameInput.value, bioInput.value)
        .then((result) => {
            profileName.textContent = nameInput.value;
            profileBio.textContent = bioInput.value;
            closePopup(profilePopup);
        })
        .catch((reason) => {
            console.log(reason);
            closePopup(profilePopup);
        })
    })
}

function addFormAddCardListener() {
    formAddCardElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        registerCard(cardNameInput.value, cardLinkInput.value)
        .then((result) => {
            addCard(result, result.owner);
        })
        .catch((reason) => {
            console.log(reason);
        })
        .then(() => {
            evt.target.reset();
            closePopup(addButtonPopup);
        })
    })
}
const popupUpdateAvatar = document.querySelector('.popup-update-avatar');
const formUpdateProfileAvatar = document.querySelector('.popup-update-avatar__form');
const formUpdateAvatarUrl = formUpdateProfileAvatar.querySelector("[name='avatar-link']");
const formUpdateAvatarSubmit = formUpdateProfileAvatar.querySelector(".popup__button");
function setProfileAvatar(avatarUrl) {
    profileAvatar.src = avatarUrl;
}
function addUpdateProfileAvatarListener() {
    formUpdateProfileAvatar.addEventListener('submit', (evt) => {
        evt.preventDefault();
        formUpdateAvatarSubmit.textContent = "Сохранение...";
        updateProfileAvatar(formUpdateAvatarUrl.value)
        .catch((reason) => {
            console.log(reason);
        })
        .then(() => {
            setProfileAvatar(formUpdateAvatarUrl.value);
            closePopup(popupUpdateAvatar);
        })
    })
}

function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened')
        closePopup(openedPopup);
    }
}

function addPopupsListeners () {
    popups.forEach((popup) => {
        const popupContainer = popup.querySelector('.popup__container');
        popupContainer.addEventListener('mousedown', function(evt) {
            evt.stopPropagation();
        });
        popup.addEventListener('mousedown', (evt) => {
            closePopup(popup);
        })
    })
}