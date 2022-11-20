import "./TodoTile.css"
import {Todo} from "../model/Todo";
import React, {ChangeEvent, useState} from "react";

type TodoTileProps = {
    todo: Todo
    handleUpdateTodo(newTodo: Todo): void
    handleFinishTodo(todoId: string): void
}

export default function TodoTile(props: TodoTileProps) {

    const [description, setDescription] = useState(props.todo.description)

    function handleUpdateTodo() {
        const newTodo: Todo = {
            id: props.todo.id,
            description: description,
            status: props.todo.status
        }
        props.handleUpdateTodo(newTodo)
    }

    function handleFinishTodo() {
        // Ausrufezeichen heißt "Yo, die id GIBT es WIRKLICH!"
        props.handleFinishTodo(props.todo.id!)
    }

    return (
        <div className={"TodoTile"}>
            <div>Status: {props.todo.status}</div>
            Beschreibung: <input value={description} onChange={(event: ChangeEvent<HTMLInputElement>) => setDescription(event.target.value)}/>
            <br />
            <button onClick={handleUpdateTodo}>Aktualisieren 🔃</button>
            <button onClick={handleFinishTodo}>Beenden ✅</button>
            <br />
        </div>
    );
}