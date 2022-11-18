import "./TodoTile.css"
import {Todo} from "../model/Todo";
import React from "react";

type TodoTileProps = {
    todo: Todo
    handleFinishTodo(todoId: string): void
}

export default function TodoTile(props: TodoTileProps) {

    function handleFinishTodo() {
        // Ausrufezeichen heißt "Yo, die id GIBT es WIRKLICH!"
        props.handleFinishTodo(props.todo.id!)
    }

    return (
        <div className={"TodoTile"}>
            <div>Status: {props.todo.status}</div>
            <div>Beschreibung: {props.todo.description}</div>
            <br />
            <button onClick={handleFinishTodo}>Beendet ✅</button>
            <br />
        </div>
    );
}