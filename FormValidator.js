class FormValidator{
    constructor(){
    }
    //Эта функция проверяет валидность всех полей ввода. Поэтому она явлется колбеком для всех слушаетелй элемнтов формы.
    //данная фукция содержит три подфункции. О них ниже:
    handleValidate (event) {
        formValidate.resetError(event.target);
        formValidate.validate(event.target);
        //здесь эта же функция userFormRender постоянно мониторит состояние полей и рендерит кнопку. Постоянно - потому что функция handlValidate 
        //работает с событием input
        formValidate.userFormRender();
      }
    //Эта функция проверяет общую валидацию. Если поле не валидно - выдаёт ошибку element.validationMessage и записывает её в span
    //element.validationMessage - эта встроенная функция со стандартными сообщениями, но их можно поменять. Это делает функция ниже.
    validate(element) {
        const errorElement = document.querySelector(`#error-${element.id}`);
        if (!element.validity.valid) {
            formValidate.setMessege(element);
            errorElement.textContent = element.validationMessage;
            formValidate.activateError(element);
            return false
        }
        return true
    }
    //Эта функция меняет встроенные в validationMessage сообщения благодаря методу setCustomValidity
    setMessege(field){
        if(field.validity.valueMissing) {
            field.setCustomValidity('Это обязательное поле');
         } else if (field.validity.tooShort) {
           field.setCustomValidity('Должно быть от 2 до 30 символов');
         } else if (field.validity.typeMismatch){
           field.setCustomValidity('Здесь должна быть ссылка')
         } else {
             field.setCustomValidity('')
         }
    }
    //Это функция добавляет определенный класс полю, чтобы тот приобрел новые стили
    activateError(element) {
        const errorElement = document.querySelector(`#error-${element.id}`);
        errorElement.classList.add('input-container__invalid');
    }
    //Вторая функция удаляет класс стилизованный под ошибку и удаляет сообщение об ошибке
    resetError(element) {
        const errorElement = document.querySelector(`#error-${element.id}`);
        errorElement.classList.remove('input-container__invalid');
    }
//render place-form function. Эта функция работает с кнопкой:  черная/белая
    renderPlaceForm(){
      if(!formName.validity.valid || !formLink.validity.valid){
        placeAddButton.classList.remove('popup__button_active')
      } else {
          placeAddButton.classList.add('popup__button_active')
      }
    }
    //Управлем кнопкой формы пользователя
    userFormRender(){
      const userButton = document.querySelector('#user-button')
      if(!UserNameForm.validity.valid || !UserJobForm.validity.valid /* || !UserPhotoForm.validity.valid */ ){
          userButton.classList.remove('popup__button_active')
      } else {
          userButton.classList.add('popup__button_active')
      }
  }
}

