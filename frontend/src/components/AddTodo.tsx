import {Todo} from "../model/Todo";
import {ChangeEvent, useState} from "react";

type AddTodoProps = {
    handleAddTodo(todo: Todo): void
}

export default function AddTodo(props: AddTodoProps) {

    const [todoDescription, setTodoDescription] = useState<string>("");

    function handleDescriptionChange(event: ChangeEvent<HTMLInputElement>) {
        setTodoDescription(event.target.value)
    }

    function handleAddTodo() {
        const newTodo: Todo = {
            description: todoDescription,
            // Der Status ist zunächst natürlich IMMER offen, weil die Aufgabe ja noch zu erledigen ist
            status: "OPEN"
        }

        props.handleAddTodo(newTodo)
    }

    return (
        <section>
            <br />
            <br />
            <input onChange={handleDescriptionChange}/>
            <button onClick={handleAddTodo}>Todo hinzufügen</button>
        </section>
    )
}