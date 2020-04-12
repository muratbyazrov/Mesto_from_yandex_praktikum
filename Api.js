class Api {
    constructor(options) {
      // тело конструктора
    }
    getUserData(){
        return fetch('https://praktikum.tk/cohort9/users/me',{
            method: 'GET',
            headers: {
                authorization: 'a25b3164-8e6a-4013-a015-7479adc9af6c',
                'Content-Type': 'application/json'
            }
        })
    }

    getInitialCards() {
        return fetch('https://praktikum.tk/cohort9/cards',{
            method: 'GET',
            headers: {
                authorization: 'a25b3164-8e6a-4013-a015-7479adc9af6c',
                'Content-Type': 'application/json'
            }
        })
    }

    patchUserInfo(name, about) {
        return fetch('https://praktikum.tk/cohort9/users/me',{
            method: 'PATCH',
            headers: {
                authorization: 'a25b3164-8e6a-4013-a015-7479adc9af6c',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: `${name}`,
                about: `${about}`,
            })
        })
    }


    postNewCard(place, link){
        return fetch('https://praktikum.tk/cohort9/cards',{
            method: 'POST',
            headers: {
                authorization: 'a25b3164-8e6a-4013-a015-7479adc9af6c',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: `${place}`,
                link: `${link}`
            })
        })
    }

    deleteCard(cardId){
        return fetch(`https://praktikum.tk/cohort9/cards/${cardId}`,{
            method: 'DELETE',
            headers: {
                authorization: 'a25b3164-8e6a-4013-a015-7479adc9af6c',
                'Content-Type': 'application/json'
            }
        })
    }

    likeCard(cardId){
        return fetch(`https://praktikum.tk/cohort9/cards/like/${cardId}`,{
            method: 'PUT',
            headers: {
                authorization: 'a25b3164-8e6a-4013-a015-7479adc9af6c',
                'Content-Type': 'application/json'
            }
        })
    }

    disLikeCard(cardId){
        return fetch(`https://praktikum.tk/cohort9/cards/like/${cardId}`,{
            method: 'DELETE',
            headers: {
                authorization: 'a25b3164-8e6a-4013-a015-7479adc9af6c',
                'Content-Type': 'application/json'
            }
        })
    }
}
