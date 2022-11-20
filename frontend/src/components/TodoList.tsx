import React from "react";
import {Todo} from "../model/Todo";
import TodoTile from "./TodoTile";

type TodoGalleryProps = {
    todos: Todo[],
    handleUpdateTodo(newTodo: Todo): void
    handleFinishTodo(todoId: string): void
}

export default function TodoList(props: TodoGalleryProps) {

    const todoComponents = props.todos.map(todo => <TodoTile todo={todo} handleUpdateTodo={props.handleUpdateTodo} handleFinishTodo={props.handleFinishTodo} key={todo.id} />)

    return (
        <section>
            <h3>Tasks:</h3>
            <div>{todoComponents}</div>
        </section>
);
}
