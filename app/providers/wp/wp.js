import axios from 'axios';
import {Observable} from 'rxjs/Observable';

export const keyRoteiro = "roteiro";
export const keyHoteis = "hoteis";
export const keyVoos = "voo";
const UrlRoteiro = "http://www.thediarytours.com/wp-json/wp/v2/" + keyRoteiro + "?per_page=100";
const UrlHoteis = "http://www.thediarytours.com/wp-json/wp/v2/" + keyHoteis + "?per_page=100";
const UrlVoos = "http://www.thediarytours.com/wp-json/wp/v2/" + keyVoos + "?per_page=100";


export class WP {

    constructor(){
        this.keyRoteiro = "roteiro"
    }

    LoadAllData(){
         console.log("Loading all data...")
         fetchData (keyRoteiro)
         fetchData (keyHoteis)
         fetchData (keyVoos)
    }

    GetAllRoteiros(){
        const keyRoteiro = "roteiro"
        
        return Observable.create(observer => {
            observer.next(getDataFromLocalStorage(keyRoteiro));
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
    constructor(id, title, description, diaRoteiro, image) {
        super(id, title, description);
        this.diaRoteiro = diaRoteiro;
        this.image = image;
    }

}



function saveToLocalStorage(key, data){
    console.log(data)
    window.localStorage.setItem(key, JSON.stringify(data))
}

function getRoteiroDTO (data) {
    
    var finalData = []
    data.forEach(element => {
        finalData.splice(0, 0, new RoteiroDTO(
            element.id, 
            element.title.rendered, 
            element.content.rendered, 
            element.dia_roteiro, 
            // getImageFromElement(element)
        ));
    });

    return finalData;
}

function getImageFromElement(element) {
    if (element.better_featured_image == null) {
        return;
    }

    return getDataURL(element.better_featured_image.media_details.sizes.medium.source_url);
}

function getWPDTO (data) {
    
    var finalData = []
    data.forEach(element => {
        finalData.splice(0, 0, new WPDTO(element.id, element.title.rendered, element.content.rendered))
    });

    return finalData;
}

function getDataURIImage(img) {
    var canvas = document.createElement("canvas");    
    var image = new Image;
    image.src = img;
    image.width = 300;
    image.height = 169;

    canvas.width = image.width;
    canvas.height = image.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0);

    var dataURL = canvas.toDataURL("image/jpg");
    console.log(dataURL)

    return dataURL;
}

function getDataURL(url){
    var xmlHTTP = new XMLHttpRequest();
    xmlHTTP.open('GET', url, true);
    xmlHTTP.responseType = 'arraybuffer';
    xhr.withCredentials = true;
    xhr.setRequestHeader('Content-Type', 'application/json');
    xmlHTTP.onload = function(e) {
        var arr = new Uint8Array(this.response);
        var raw = String.fromCharCode.apply(null,arr);
        var b64 = base64.encode(raw);
        return dataURL="data:image/png;base64," + b64;
    };
    xmlHTTP.send();
}

function getDataFromLocalStorage(key){
    var data = JSON.parse(window.localStorage.getItem(key));
    if (data != null){
        return data;
    } else {
        fetchData(key);
    }
}

function fetchData(key){

    switch (key) {
        case keyRoteiro: 
         axios.get(UrlRoteiro)
         .then(data => {
             saveToLocalStorage(keyRoteiro, getRoteiroDTO(data.data))
        })
         .catch(err => console.error(err));
         break;

        case keyHoteis:
        axios.get(UrlHoteis)
        .then(data => saveToLocalStorage(keyHoteis, getWPDTO(data.data)))
        .catch(err => console.error(err));
        break;

        case keyVoos:
        axios.get(UrlVoos)
        .then(data => saveToLocalStorage(keyVoos, getWPDTO(data.data)))
        .catch(err => console.error(err));
        break;
        
        default:
            getDataFromLocalStorage(key)

    }
    
         
}