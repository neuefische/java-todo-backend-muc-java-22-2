import "./TodoItem.css"

// Komponentename + Props
import {Todo} from "../models/Todo";
import {ChangeEvent, useState} from "react";

type TodoProps = {
    todoToDisplay: Todo,
    handleUpdateTodo(newTodo: Todo): void
    handleFinishTodo(todoId: string): void
}

// Zeigt eine einzige Todo (Aufgabe) an
export default function TodoItem(props: TodoProps) {

    const [description, setDescription] = useState(props.todoToDisplay.description)

    function handleUpdateTodo() {
        const newTodo: Todo = {
            id: props.todoToDisplay.id,
            description: description,
            status: props.todoToDisplay.status
        }

        props.handleUpdateTodo(newTodo)
    }

    function handleFinishTodo() {
        // Alternative zu dem unteren:
        // props.handleFinishTodo(props.todo.id!)
        // Ausrufezeichen heißt "Yo, die id GIBT es WIRKLICH!"

        if (props.todoToDisplay.id) {
            props.handleFinishTodo(props.todoToDisplay.id)
        } else {
            console.error("Die ID die du löschen möchtest, gibt es nicht!")
        }
    }

    return (
        <div className={"TodoItem"}>
            <p>STATUS: {props.todoToDisplay.status}</p>
            Beschreibung: <input value={description} onChange={(event: ChangeEvent<HTMLInputElement>) => setDescription(event.target.value)}/>
            <br/>
            <button onClick={handleUpdateTodo}>Aktualisieren 🔃</button>
            <button onClick={handleFinishTodo}>Beendet ✅</button>
            <br/>
        </div>
    )
}