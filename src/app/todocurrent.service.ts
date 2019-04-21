import { Injectable } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { Todo } from './todo';
import { identifierModuleUrl } from '@angular/compiler';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Data } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class TodocurrentService {
  //ATTRIBUT
  id : BehaviorSubject<number>;
  
  //CONSTRUCTOR
  constructor(){
    this.id = new BehaviorSubject(null);
    
  }
  //METHODE
 setID(id: number):void{
  console.log("on stock l'id " +id); 
  this.id.next(id);
  console.log("2");
 }

  getID(){
    console.log("1");
    console.log(this.id);
    return this.id;  
  }

}
