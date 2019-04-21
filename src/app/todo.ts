  export class Todo {
      id: number;
      title: string;
      content:string;
      state:State;
     
      
    }
  export enum State {
      todo = 1,
      done = 2
    }