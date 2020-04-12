class PopupUser{
    constructor(){
    }
//отркыть форму
    openUserForm(){
        popupUser.classList.add('popup_is-opened');
        userInfo.addInitialData();
        formValidate.userFormRender();
    }
//закрыть форму
    closeUserForm(){
        popupUser.classList.remove('popup_is-opened');
    }
    closeUserFormEsc(event){
        if(event.keyCode === 27){
            popupUser.classList.remove('popup_is-opened');
        };
    }
}
