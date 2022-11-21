// Komponentename + Props
import {Todo} from "../models/Todo";

type TodoProps = {
    todoToDisplay: Todo
}

// Zeigt eine einzige Todo (Aufgabe) an
export default function TodoItem(props: TodoProps) {

    return (
        <div>
            <p>STATUS: {props.todoToDisplay.status}</p>
            <p>Beschreibung: {props.todoToDisplay.description}</p>
        </div>
    )
}