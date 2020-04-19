import "./pages/style.css";
import {Api} from './Api';
import {Card} from './Card';
import {CardList} from './CardList';
import {FormValidator} from './FormValidator';
import {ImagePopup} from './ImagePopup';
import {Popup} from './Popup';
import {PopupUser} from './PopupUser';
import {UserInfo} from './UserInfo';

//ПЕРЕМЕННЫЕ И КОНСТАНТЫ
//Контейнер с карточками


const placeList = document.querySelector('.places-list');
//Форма новой карточки
const popup = document.querySelector('.popup');
const plusButton = document.querySelector('.user-info__button');
const popupClose = document.querySelector('.popup__close');
//Элементы формы
const form = document.querySelector('.popup__form');
const formName = document.querySelector('.popup__input_type_name');
const formLink = document.querySelector('.popup__input_type_link-url');
const placeAddButton = document.querySelector('.popup__button');
//ПЕРЕМЕННЫЕ И КОНСТАНТЫ
//вся форма popup-user, кнопка edit, и кнопка close
const popupUser = document.querySelector('#user-popup');
const editButton = document.querySelector('.user-info__button_edit');
const popupUserClose = document.querySelector('#popup-user-close');
//форма и поля формы: имя пользвателя, о пользователе и ссылка на фото пользователя
const userForms= document.forms.userForm
const UserNameForm = document.querySelector('#user-name');
const UserJobForm = document.querySelector('#user-about');
const UserPhotoForm = document.querySelector('#user-photo')
const submit = document.querySelector('#user-button');
//Исходная разметка о пользователе: имя, about, фото
const UserName = document.querySelector('.user-info__name');
const UserJob = document.querySelector('.user-info__job');
const UserPhoto = document.querySelector('.user-info__photo')
//попап с картинкой
const imagePopup = document.querySelector('#image-popup')

/* const image = document.querySelector('.popup__image'); */

export {placeList, popup, plusButton, popupClose, form, formName, formLink, placeAddButton, popupUser,
  editButton,popupUserClose,userForms, UserNameForm, UserJobForm, UserPhotoForm, submit, UserName,
  UserJob, UserPhoto, imagePopup, userInfo, formValidate, card, cardlist, placepopup, userpopup, imagePopups, api
}
//запуск объекиа card
const card = new Card(placeList, api);
//Запуск объекта cardlist
const cardlist = new CardList(placeList, card);
//Запуск объекта форм
const placepopup = new Popup(popup);
const userpopup = new PopupUser();
//запуск объекта валидации
const formValidate = new FormValidator(UserNameForm, placeAddButton, formValidate);
//запуск объекта редактирования данных пользователя
const userInfo = new UserInfo(userForms);
//запуск объекта всплывающей картинки
const imagePopups = new ImagePopup();
//Запуск API
const api = new Api();

//загружаем данные пользователя из сервера
api.getUserData()
    .then(res => {
      if(res.ok){return res.json()}
      return Promise.reject(res.status)
    })
    .then(data => {
      userInfo.userInfoEdit(data.name, data.about, data.avatar)
    })
    .catch(err => {console.log(`Ошибка: ${err}`)})
//загружаем карточки из сервера
api.getInitialCards()
    .then(res => {
      if(res.ok){
        return res.json()
      }
      return Promise.reject(res.status)
    })
    .then(data => {
        cardlist.render(addServerCard(data))
    })
    .catch(err => {console.log(`Ошибка: ${err}`)})


//Функции
//функция addServerCard. Составляет массив карточек. На вход принимает массив данных о карточках. Далее этот массив карточек передается в CardList.
function addServerCard(arr){
    const arrCard = [];
    arr.forEach(function (item){
        let newPlace = card.createCard(item.name, item.link, item.likes.length, item._id);
        arrCard.push(newPlace);
    });
    return arrCard;
}

//Добавить карточку, если с полями всё ок, закрыть и форму и сделать резет
function sendFormPlace(event) {
    event.preventDefault();
    const inputs = Array.from(form);
    let isValidForm = true;
    inputs.forEach((elem) => {
      if (elem.id !== submit.id) {
        if (!formValidate.validate(elem)) {isValidForm = false}
      } else {isValidForm = true}
    })
    if (isValidForm) {
        api.postNewCard(formName.value, formLink.value)
            .then(res => {
              if(res.ok){
              return res.json()
              }
              return Promise.reject(res.status)
          })
            .then(data =>{
              cardlist.addCard(data.name, data.link, data.likes, data._id);
              placepopup.closeForm();
              form.reset();
            })
            .catch(err => {console.log(`Ошибка: ${err}`)})      
    }
}

//Добавить данные пользователя, если все окей, закрыть и форму и сделать резет
 function sendForm(event) {
    event.preventDefault();
    const inputs = Array.from(userForms);
    let isValidForm = true;
    inputs.forEach((elem) => {
      if (elem.id !== submit.id) {
        if (!formValidate.validate(elem)) isValidForm = false;
        }
    })
      if (isValidForm) {
        api.patchUserInfo(this.form.elements.name.value, this.form.elements.about.value)
            .then(res => {
              if(res.ok){
              return res.json()
              }
              return Promise.reject(res.status)
          })
          .then(data => {
            userInfo.userInfoEdit(data.name, data.about)
            userpopup.closeUserForm();
          })
          .catch(err => {console.log(`Ошибка: ${err}`)})
    }
}


//Слушатели
//Открыть попап с картинкой
placeList.addEventListener('click', imagePopups.addImagePopup);
//закрыть попап с картинкой
window.addEventListener('scroll', imagePopups.closeImagePopupScroll);
document.addEventListener('click', imagePopups.closeImagePopup);
document.addEventListener('keydown', imagePopups.closeImagePopupEsc);
//Слушатели для валидации формы новой карточки
formName.addEventListener('input', formValidate.handleValidate);
formLink.addEventListener('input', formValidate.handleValidate);
//Слушатели для валидации формы пользователя
UserNameForm.addEventListener('input', formValidate.handleValidate)
UserJobForm.addEventListener('input', formValidate.handleValidate)
//UserPhotoForm.addEventListener('input', formValidate.handleValidate)
//полная проверка полей новой карточки
placeAddButton.addEventListener('click', sendFormPlace);
//полная проверка полей формы пользователя
submit.addEventListener('click', sendForm);
//Постоянный слушатель, который рендерит кнопку формы новой карточки
form.addEventListener('input', formValidate.renderPlaceForm);
//слушатель, который рендерит кнопку формы при нажатии на кнопку edit с помощью функции userFormRender
editButton.addEventListener('click', formValidate.userFormRender);
 //открыть форму пользователя
 editButton.addEventListener('click', userpopup.openUserForm);
 //закрыть форму (крестик)
 popupUserClose.addEventListener('click', userpopup.closeUserForm);
 //закрыть форму(esc)
 document.addEventListener('keydown', userpopup.closeUserFormEsc);

plusButton.addEventListener('click', placepopup.openForm);
popupClose.addEventListener('click', placepopup.closeForm)
document.addEventListener('keydown', placepopup.closeFormEsc);