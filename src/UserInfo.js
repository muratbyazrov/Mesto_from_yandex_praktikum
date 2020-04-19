import {UserName, UserJob, UserPhoto, UserNameForm, UserJobForm} from './index'

export class UserInfo{
    constructor(form){
        this.form = form;
    }
    //Функция редактирования данных пользователя
    //Эта функция принимает имя и about и прописывает их в html, но она не запускается сама
    userInfoEdit(name, job, photoLink){
        UserName.textContent = name;
        UserJob.textContent = job;
        UserPhoto.style.backgroundImage = `url(${photoLink})`
    }
    //функция, которая записывает начальные значения в форму "редактировать профиль"
        addInitialData(){
            UserNameForm.value = UserName.textContent;
            UserJobForm.value = UserJob.textContent;
        }
}

