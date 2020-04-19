import {imagePopups, imagePopup} from './index'

export class ImagePopup{
    constructor(){
    }
    //Эта функция принимает ссылку на картинку в попап и добавляет картинку с помощью присваивания атрибута src
    createImagePopup(link){
        const image = document.querySelector('.popup__image');
        image.setAttribute('src', link)
        return image;
    }
    //Эта функция, которая открывает попап с картинкой, используя функцию createImagePopup
    addImagePopup(event){
        if(event.target.classList.contains('place-card__image')){
            imagePopup.classList.add('popup_is-opened')
            let url =  event.target.style.backgroundImage;
            url = url.substr(5, (url.length-7))
            imagePopups.createImagePopup(url)
        }
    }
    //Эта функция закрывает попап с картиинкой при щелчке на крестик
    closeImagePopup (event){
        if(event.target.classList.contains('popup__close')){
            imagePopup.classList.remove('popup_is-opened')
        }
    }
    //Эта функция закрывает попап с картиинкой при нажатии на esc
    closeImagePopupEsc(event){
        if(event.keyCode === 27){
            imagePopup.classList.remove('popup_is-opened')
        }
    }
    //Эта функция закрывает попап с картиинкой при прокручивании страницы
    closeImagePopupScroll(){
        imagePopup.classList.remove('popup_is-opened');
    }
}

