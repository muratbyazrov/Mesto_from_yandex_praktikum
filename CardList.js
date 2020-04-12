class CardList{
    constructor(container, classCard){
        this.container = container;
        this.mycard = classCard;
    }
//функция добавления нового места. Запускает объект Card cо значениями полей формы.
    addCard(place, link, likesCount, cardId){
        const cardListContainer = this.container;
        const newPlace = this.mycard.createCard(place, link, likesCount, cardId);
        cardListContainer.appendChild(newPlace);
    }
//Эта функция записывает в контейнер массив карточек, которые хранятся предположительно на сервере
    render(arr){
        const cardListContainer = this.container;
        arr.forEach(function(item){
        cardListContainer.appendChild(item)
        })
    }
}
