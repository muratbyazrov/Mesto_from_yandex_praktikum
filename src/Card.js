import{placeList, api} from './index'
export class Card{
    constructor(placeList, api){
        this.placeList = placeList;
        this.api = api;
    }
    //функция создания карточки. Функция createCard() принимает имя и ссылку и возвращает готовый dom элемент(html)
    createCard(name, link, likesCount, cardId){
    const newCard = document.createElement('div')
    newCard.insertAdjacentHTML('afterbegin',
    `<div class="place-card">
        <div class="place-card__image">
            <button class="place-card__delete-icon"></button>
        </div>
        <div class="place-card__description">
            <h3 class="place-card__name"></h3>
            <div class='place-card__like-container'>
                <button class="place-card__like-icon"></button>
                <p class="place-card__likes-count"></p>
            </div>   
        </div>
    </div>`);
    newCard.firstElementChild.querySelector('.place-card__name').textContent = name;
    newCard.firstElementChild.querySelector('.place-card__image').style.backgroundImage = `url(${link})`
    newCard.firstElementChild.querySelector('.place-card__likes-count').textContent = likesCount;
    newCard.firstElementChild.querySelector('.place-card__delete-icon').setAttribute('data-cardId', cardId)
    const readyCard = newCard.firstElementChild;
    readyCard.querySelector('.place-card__like-icon').addEventListener('click', this.like);
    readyCard.querySelector('.place-card__delete-icon').addEventListener('click', this.remove)
    return readyCard;
    }
    //лайкнуть
    like(event){
        const targebCard = event.target.parentElement.parentElement.parentElement;
        const id = targebCard.querySelector('.place-card__delete-icon').getAttribute('data-cardid');
        const likesCounter = targebCard.querySelector('.place-card__likes-count');
        event.target.classList.toggle('place-card__like-icon_liked');
        if(event.target.classList.contains('place-card__like-icon_liked')){
            api.likeCard(id)
                .then(res => {
                    if(res.ok){
                    return res.json()
                    }
                    return Promise.reject(res.status)
                })
                .then(data => {
                    likesCounter.textContent = data.likes.length
                })
                .catch(err => {console.log(`Ошибка: ${err}`)})
        } else {
            api.disLikeCard(id)
                .then(res => {
                    if(res.ok){
                    return res.json()
                    }
                    return Promise.reject(res.status)
                })
                .then(data => {
                    likesCounter.textContent = data.likes.length
                })
                .catch(err => {console.log(`Ошибка: ${err}`)})
        }
    }
    //удалить
    remove(event){
        const parentCard = event.target.parentElement.parentElement
        const id = event.target.getAttribute('data-cardid')
        api.deleteCard(id)
            .then(res => {
                if(res.ok){
                placeList.removeChild(parentCard)
                return res.json()
                }
                return Promise.reject(res.status)
            })
            .catch(err => {console.log(`Ошибка: ${err}`)})
    }
}


