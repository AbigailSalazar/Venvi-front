export class LocalStorageService{
    constructor() {

    }

    static setItem(key,value){
        const encryptedData =value
        localStorage.setItem(key,encryptedData)
    }

    static getItem(key){
        const encryptedData=localStorage.getItem(key)
        return encryptedData
    }

    static deleteItem(key){
        localStorage.removeItem(key)
    }
}