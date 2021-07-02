import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { resolve } from 'q';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  user
  constructor(
    private storage: Storage
  ) { }

    async store(storageKey: string, value: any){
      const encrypteValue = btoa(escape(JSON.stringify(value)))
      return await this.storage.set(storageKey, encrypteValue)
      // return await this.storage.set(storageKey, value)
    }

    async get(storageKey: string){
      return new Promise(resolve =>{
        this.storage.get(storageKey).then((value) =>{
          if(value == null){
            resolve(false);
          }else{
            resolve(JSON.parse(unescape(atob(value))))
          }
        })
      })
    }
    

    async removeItem(storageKey: string){
      await this.storage.remove(storageKey);
    }

    async clear(){
      await this.storage.clear();
    }
}
