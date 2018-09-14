import axios from 'axios';
import {Observable} from 'rxjs/Observable';

export class WP {

    constructor(){
        this.keyRoteiro = "roteiro"
    }

    LoadAllData(){
         console.log("Loading all data...")

         const UrlRoteiro = "http://localhost:8080/wp-json/wp/v2/roteiro?filter[category]=viagem1";
         const keyRoteiro = "roteiro"
         axios.get(UrlRoteiro)
         .then(data => saveToLocalStorage(keyRoteiro, getRoteiroDTO(data.data)))
         .catch(err => console.error(err))

         const UrlHoteis = "http://localhost:8080/wp-json/wp/v2/hoteis?filter[category]=viagem1";
         const keyHoteis = "hoteis"
         axios.get(UrlHoteis)
         .then(data => saveToLocalStorage(keyHoteis, getWPDTO(data.data)))
         .catch(err => console.error(err))

         const UrlVoos = "http://localhost:8080/wp-json/wp/v2/voo?filter[category]=viagem1";
         const keyVoos = "voos"
         axios.get(UrlVoos)
         .then(data => saveToLocalStorage(keyVoos, getWPDTO(data.data)))
         .catch(err => console.error(err))
    }

    GetAllRoteiros(){
        const keyRoteiro = "roteiro"
        
        return Observable.create(observer => {
            observer.next(JSON.parse(window.localStorage.getItem(keyRoteiro)));
            observer.complete();
        });
    }

    GetRoteiroById(id){
        return Observable.create(observer => {
            observer.next(JSON.parse(window.localStorage.getItem(this.keyRoteiro).find(function (element){
                return element.id == id;
            })));
            observer.complete();
        });
    }

}

class WPDTO {
    constructor(id, title, description) {
        this.id = id
        this.title = title;
        this.description = description;
    }

}

class RoteiroDTO extends WPDTO {
    constructor(id, title, description, diaRoteiro) {
        super(id, title, description);
        this.diaRoteiro = diaRoteiro;
    }

}



function saveToLocalStorage(key, data){
    console.log(data)
    window.localStorage.setItem(key, JSON.stringify(data))
}

function getRoteiroDTO (data) {
    
    var finalData = []
    data.forEach(element => {
        finalData.splice(0, 0, new RoteiroDTO(element.id, element.title.rendered, element.content.rendered, element.dia_roteiro))
    });

    return finalData;
}

function getWPDTO (data) {
    
    var finalData = []
    data.forEach(element => {
        finalData.splice(0, 0, new WPDTO(element.id, element.title.rendered, element.content.rendered))
    });

    return finalData;
}