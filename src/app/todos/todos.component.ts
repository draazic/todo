//import { Component, OnInit } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';
import { Todo, State } from '../todo';
import { TODOS } from '../mock-todos';
import { TodoService } from '../todo.service';

import { TodocurrentService } from '../todocurrent.service';
import { TodoDeleteService } from '../todoDeleteService';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { EventEmitter } from 'events';




@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']

})

export class TodosComponent implements OnInit {

  public state = State;
  todos: Todo[];

  selectedTodo: Todo;
  


  constructor(private todoService: TodoService, private todocurrentService: TodocurrentService) { }


  //fait appel au serveur a la liste des taches
  getTodos(): void {
    this.todoService.getTodos().subscribe((todos: any) => {
      console.log(todos)
      todos.content.map((e) => {
        e.state = (e.state === "DOING") ? State.done : State.todo;
        console.log(e.state )
        return e;
      });
      this.todos = todos.content
      
    })
  }


  ngOnInit() {
    this.getTodos();

  }

  onSelect(id: number): void {
    // console.log("clic sur bouton de l'id : "+id);

    this.todocurrentService.setID(id)

  }

  delete(id: number): void {
    this.todoService.deleteByID(id).subscribe((result) => {
      console.log(result)
      //appel au serveur pour rafraichir
      this.todoService.getTodos().subscribe((todos: any) => {
        todos.content.map((e) => {
          e.state = (e.state === "DOING") ? State.done : State.todo;
          console.log(e)
          return e;
        });
        this.todos = todos.content
      })
    })


  }
  onRefrech(todo: Todo): void {
    console.log(todo)
    this.todos.push(todo)

  }

  onServerRefresh(): void {
    this.todoService.getTodos().subscribe((result) => {
      console.log(result)
      //appel au serveur pour rafraichir
      this.todoService.getTodos().subscribe((todos: any) => {
        todos.content.map((e) => {
          e.state = (e.state === "DOING") ? State.done : State.todo;
          console.log(e)
          return e;
        });
        this.todos = todos.content
      })
    })
  }


  updateState(id: number): void {
    this.todoService.updateTodostate(id).subscribe((data: any) => {
      console.log(data);
      this.todos.map((e) => {
        if(data.id === e.id){
          e.state = (data.state === "DOING") ? State.done : State.todo;
        }
        console.log(e);
        return e;
      });
    })
  }




}
