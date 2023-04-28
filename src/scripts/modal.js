export { openPopup, renderCloseButtons, setProfileFormStartInfo, addFormProfileElementListener, addFormAddCardListener, addPopupsListeners}
import { addCard } from './card.js'

const formProfileElement = document.querySelector('.popup-profile__form');
const nameInput = formProfileElement.querySelector('[name="profile-name"]');
const bioInput = formProfileElement.querySelector('[name="profile-bio"]');
const profilePopup = document.querySelector('.popup-profile');
const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');
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
}
function addFormProfileElementListener() {
    formProfileElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        profileName.textContent = nameInput.value;
        profileBio.textContent = bioInput.value;
        closePopup(profilePopup);
    })
}

function addFormAddCardListener() {
    formAddCardElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        addCard(cardNameInput.value, cardLinkInput.value);
        evt.target.reset();
        closePopup(addButtonPopup);
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