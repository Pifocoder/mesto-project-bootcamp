export { openPopup, renderCloseButtons, setProfileFormStartInfo, addFormProfileElementListener, addFormAddCardListener, addPopupsListeners}
import { addCard } from './card.js'
function openPopup(popup) {
    popup.classList.add('popup_opened');
}
function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

const closeButtons = document.querySelectorAll('.popup__close');
function renderCloseButtons() {
    closeButtons.forEach((button) => {
        const popup = button.closest('.popup');
        button.addEventListener('click', () => closePopup(popup));
    });
}
const formProfileElement = document.querySelector('.popup-profile__form');
const nameInput = formProfileElement.querySelector('[name="profile-name"]');
const bioInput = formProfileElement.querySelector('[name="profile-bio"]');
const profilePopup = document.querySelector('.popup-profile');
const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');
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

const formAddCardElement = document.querySelector('.popup-add-card__form');
const cardNameInput = formAddCardElement.querySelector('[name="card-name"]');
const cardLinkInput = formAddCardElement.querySelector('[name="card-link"]');
const addButtonPopup = document.querySelector('.popup-add-card');
function addFormAddCardListener() {
    formAddCardElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        addCard(cardNameInput.value, cardLinkInput.value);
        evt.target.reset();
        closePopup(addButtonPopup);
    })
}

const popups = document.querySelectorAll('.popup');
function addPopupsListeners () {
    popups.forEach((popup) => {
        const popupContainer = popup.querySelector('.popup__container');
        popupContainer.addEventListener('click', function(evt) {
            evt.stopPropagation();
        });
        popup.addEventListener('click', (evt) => {
            closePopup(popup);
        })
        
        popup.addEventListener('keydown', (evt) => {
            if (evt.key !== "Escape") {
                return;
            }
            if ('.popup_opened' in popup.classList()) {
                closePopup(openedPopup);
            }
        })
    })
}