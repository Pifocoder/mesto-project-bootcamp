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

const galleryBlock = document.querySelector('.gallery');
const imageTemplate = document.querySelector('#gallery__card').content;
const popupPhoto = document.querySelector('.popup-card');
const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');
const profilePopup = document.querySelector('.popup-profile');
const editProfileButton = document.querySelector('.profile__edit-button');
const formProfileElement = document.querySelector('.popup-profile__form');
const nameInput = formProfileElement.querySelector('[name="profile-name"]');
const bioInput = formProfileElement.querySelector('[name="profile-bio"]');
const addButtonPopup = document.querySelector('.popup-add-card');
const addCardButton = document.querySelector('.profile__add-button');
const formAddCardElement = document.querySelector('.popup-add-card__form');
const cardNameInput = formAddCardElement.querySelector('[name="card-name"]');
const cardLinkInput = formAddCardElement.querySelector('[name="card-link"]');

const popupCloseButtons = document.querySelectorAll('.popup__close')
popupCloseButtons.forEach(element => {
  element.addEventListener('click', () => {
    element.parentNode.parentElement.classList.add('popup_close');
  })
});

function addPhoto(name, link) {
    let imageElement = imageTemplate.querySelector('.gallery__card').cloneNode(true);
    imageElement.querySelector('.gallery__name').textContent = name;
    let imagePhoto = imageElement.querySelector('.gallery__photo');

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
    let imageIcon = imageElement.querySelector('.gallery__icon');
    imageIcon.addEventListener('click', () => {
      toggleLike(imageIcon);
    });

    function photoClick(name, src) {
      popupPhoto.classList.remove('popup_close');
      
      popupPhoto.querySelector('.popup-card__photo').src = src;
      popupPhoto.querySelector('.popup-card__name').textContent = name;
      popupPhoto.querySelector('.popup__close').addEventListener('click', function() {   
        popupPhoto.classList.add('popup_close');
      });
    }
    imageElement.querySelector('.gallery__photo-area').addEventListener('click', function() {
      photoClick(name, link);
    });

    galleryBlock.prepend(imageElement);
}
function updatePhotos() {
    for (let item = initialCards.length - 1; item >= 0; --item) {
        addPhoto(initialCards[item].name, initialCards[item].link);
    }
}
updatePhotos();

//edit profile popup
editProfileButton.addEventListener('click', function() {
    nameInput.value = profileName.textContent;
    bioInput.value = profileBio.textContent;

    profilePopup.classList.remove('popup_close');
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileBio.textContent = bioInput.value;

  profilePopup.classList.add('popup_close');  
}
formProfileElement.addEventListener('submit', handleProfileFormSubmit);

addCardButton.addEventListener('click', function() {
  addButtonPopup.classList.remove('popup_close');
});


function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  addPhoto(cardNameInput.value, cardLinkInput.value);
  cardNameInput.value = "";
  cardLinkInput.value = "";
  addButtonPopup.classList.add('popup_close');
}
formAddCardElement.addEventListener('submit', handleAddCardFormSubmit);



