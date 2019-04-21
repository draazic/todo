import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TodoDeleteService {
  //ATTRIBUT
  id : BehaviorSubject<number>;
 
  //CONSTRUCTOR
  constructor(){
    this.id = new BehaviorSubject(null);
   
  }
  //METHODE
 setID(id: number):void{
  console.log("on stock l'id a suprimer " +id); 
  this.id.next(id);
  console.log(id);
 }

  getID(){
  //console.log("1");
  console.log(this.id);
  return this.id;
   
  }

 
}