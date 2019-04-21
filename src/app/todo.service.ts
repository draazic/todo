import { Injectable } from '@angular/core';
import { Todo } from './todo';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  private todoUrl = '/todoLists';  // URL to localhost
  

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todoUrl)
   
  }

  /**Get by ID */
  getTodo(id: number):Observable<Todo>{
    return this.http.get<Todo>(this.todoUrl+'/'+id) 
    
  }

   /**delete by ID  */
   deleteByID(id : number):Observable<Todo>{
     console.log(id);
     return this.http.delete<Todo>(this.todoUrl+'/'+id)
   }

   /** POST: add a new todo to the server */
  addTodo (todo: Todo): Observable<Object> {
     console.log(this.http.post<Todo>(this.todoUrl, todo));

      return this.http.post<Todo>(this.todoUrl, todo)
  
}
  /** PUT: update the todo on the server */
  updateTodo (todo: Todo): Observable<Object> {
      console.log(todo)
      return this.http.post<Todo>(this.todoUrl, todo);
}

  /** Update state todo on the server */
  updateTodostate(id: number): Observable<Object>{
    console.log(id)
    return this.http.get<Todo>(this.todoUrl+'/'+id+'/updateState');
  }


 
}
