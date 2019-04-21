import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { TodoService }  from '../todo.service';
import { TodocurrentService }  from '../todocurrent.service';
import { Todo } from '../todo';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]
})
export class DialogComponent implements OnInit {
  @Input() closable = true;
  @Input() visible: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() up = new EventEmitter();
  todo:Todo=null;
  todos: Todo[];

  constructor(private todoService: TodoService, private todocurrentService:TodocurrentService) { }


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

  ngOnInit() { 
    this.getTodo();
  }


  save(): void {
    console.log(this.todo)
    this.todoService.updateTodo(this.todo).subscribe(
      data => this.up.emit(data),
      error => console.log(error));   
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

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
