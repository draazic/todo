import { Component, OnInit,Output, EventEmitter, Input } from '@angular/core';
import { Todo } from '../todo';
import { TodoService }  from '../todo.service';
import { TodocurrentService }  from '../todocurrent.service';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss']
})
export class TodoDetailComponent implements OnInit {

 
  @Output() up = new EventEmitter();
  todo:Todo=null;
  todos: Todo[];
  

constructor(private todoService: TodoService, private todocurrentService:TodocurrentService) { 
   
}

getTodo(): void {
  
  this.todocurrentService.getID().subscribe((id) => {
    //console.log("gettodo")
    if(id !== undefined && id !== null) {
      this.todoService.getTodo(id).subscribe((todo:Todo) => {
        this.todo = todo;
       
      });
    }
  })
}

save(): void {
  console.log(this.todo)
  this.todoService.updateTodo(this.todo).subscribe(
    data => this.up.emit(data),
    
    error => console.log(error));   
}

  ngOnInit() {
    
    this.getTodo();
    
  }

  updateState(id :number):void{
    console.log(id)
    this.todoService.updateTodostate(id).subscribe((data)=>{
       console.log(data);
        this.todoService.getTodo(id).subscribe((todo:Todo) => {
        this.todo = todo;
        })
      })
    }


 
}

