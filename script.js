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
function add_photo(name, link) {
    const imageElement = imageTemplate.querySelector('.gallery__card').cloneNode(true);
    
    imageElement.querySelector('.gallery__name').textContent = name;
    imageElement.querySelector('.gallery__photo').src = link;
    imageElement.querySelector('.gallery__photo').alt = name;
    
    function deleteCard(item) {
      item.remove();
    }
    imageElement.querySelector('.gallery__delete-card').addEventListener('click',function() {
      deleteCard(imageElement);
    });

    function heartClick(item) {
      item.classList.toggle('gallery__icon_active');
    }
    imageElement.querySelector('.gallery__icon').addEventListener('click',function() {
      heartClick(imageElement.querySelector('.gallery__icon'));
    });

    function photoClick(name, src) {
      const popupPhoto = document.querySelector('.popup-card');
      
      popupPhoto.classList.add('popup-card_active');

      popupPhoto.querySelector('.popup-card__photo').src = src;
      popupPhoto.querySelector('.popup-card__name').textContent = name;
      popupPhoto.querySelector('.popup-card__close-icon').addEventListener('click', function() { popupPhoto.classList.remove('popup-card_active'); });
    }
    imageElement.querySelector('.gallery__photo-area').addEventListener('click', function() {
      photoClick(name, link);
    });

    galleryBlock.prepend(imageElement);
}
function update_photos() {
    for (let item = initialCards.length - 1; item >= 0; --item) {
        add_photo(initialCards[item].name, initialCards[item].link);
    }
}
update_photos();

//edit profile popup
const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');
const profilePopup = document.querySelector('.popup-profile');
const editProfileButton = document.querySelector('.profile__edit-button');
editProfileButton.addEventListener('click', function() {
    nameInput.value = profileName.textContent;
    bioInput.value = profileBio.textContent;

    profilePopup.classList.add('popup-profile_active');
});
const popupEditCloseButton = document.querySelector('.popup-profile__close-icon');
popupEditCloseButton.addEventListener('click', function() {
   profilePopup.classList.remove('popup-profile_active');
});
const formProfileElement = document.querySelector('.popup-profile__form');

const nameInput = formProfileElement.querySelector('[name="profile-name"]');
const bioInput = formProfileElement.querySelector('[name="profile-bio"]');
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileBio.textContent = bioInput.value;

  profilePopup.classList.remove('popup-profile_active');
}
formProfileElement.addEventListener('submit', handleProfileFormSubmit);

//add card popup
const addButtonPopup = document.querySelector('.popup-add-card');
const addCardButton = document.querySelector('.profile__add-button');
addCardButton.addEventListener('click', function() {
  addButtonPopup.classList.add('popup-add-card_active');
});
const popupAddCardCloseButton = document.querySelector('.popup-add-card__close-icon');
popupAddCardCloseButton.addEventListener('click', function() {
  addButtonPopup.classList.remove('popup-add-card_active');
});
const formAddCardElement = document.querySelector('.popup-add-card__form');

const cardNameInput = formAddCardElement.querySelector('[name="card-name"]');
const cardLinkInput = formAddCardElement.querySelector('[name="card-link"]');
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  add_photo(cardNameInput.value, cardLinkInput.value);

  addButtonPopup.classList.remove('popup-add-card_active');
}
formAddCardElement.addEventListener('submit', handleAddCardFormSubmit);



