import React from "react";
import {Todo} from "../model/Todo";
import TodoTile from "./TodoTile";

type TodoGalleryProps = {
    todos: Todo[]
}

export default function TodoList(props: TodoGalleryProps) {

    const todoComponents = props.todos.map(todo => <TodoTile todo={todo} key={todo.id} />)

    return (
        <section>
            <h3>Tasks:</h3>
            <div>{todoComponents}</div>
        </section>
);
}
