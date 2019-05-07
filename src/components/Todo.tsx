import * as React from "react";
import { ITodo } from "./IApp";

interface ITodoProps {
    index: number;
    todo: ITodo;
    onComplete: (index: number) => void;
    onRemove: (index: number) => void;
}

export const Todo = (props: ITodoProps) => {
    const { todo } = props;
    return  (
        <div
          className="todo"
          style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
          >
          {todo.text}
    
          <div>
            <button onClick={() => { props.onComplete(props.index) }}>Complete</button>
            <button onClick={() => { props.onRemove(props.index) }}>x</button>
          </div>
        </div>
      );
}