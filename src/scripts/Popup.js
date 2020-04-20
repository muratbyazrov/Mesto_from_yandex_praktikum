import {popup} from '../index'
export class Popup {
    constructor(){
       /*  plusButton.addEventListener('click', this.openForm);
        popupClose.addEventListener('click', this.closeForm)
        document.addEventListener('keydown', this.closeFormEsc); */
        /* this.popup = popup; */
    }
    //открыть форму
    openForm(){
        popup.classList.add('popup_is-opened');
    }
    //далее закрыть форму
    closeForm(){
        popup.classList.remove('popup_is-opened');
    }
    closeFormEsc(event){
        if(event.keyCode === 27){
            popup.classList.remove('popup_is-opened');
        };
    }
}
