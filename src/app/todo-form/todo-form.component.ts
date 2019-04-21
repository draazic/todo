import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Todo, State } from '../todo';
import { TodoService } from '../todo.service';
import { TodocurrentService }  from '../todocurrent.service';
import { TodosComponent} from '../todos/todos.component';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit, OnDestroy {
  
  
  @Output() echo = new EventEmitter();

  
  model=new Todo();
  states=['0','1'];
  
  private subscribeArray: Subscription[] = [];
  
  
  constructor(private todoService: TodoService, private todocurrentService:TodocurrentService) { }

  ngOnInit() {
   
  }

  ngOnDestroy() {
    this.subscribeArray.forEach((s) => {
      s.unsubscribe();
    })
  }


  newTodo(todo:Todo):void{
    console.log(todo);
    this.subscribeArray.push(this.todoService.addTodo(todo).subscribe(
      (data:any) => {
        console.log(data);
        data.state = (data.state === "DOING") ? State.done : State.todo;
        this.echo.emit(data)
      },
      error => console.log(error)
    ));    
  }

}
