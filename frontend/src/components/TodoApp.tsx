// export default = Standardexport
import TodoList from "./TodoList";
import axios from "axios";
import {Todo} from "../models/Todo";
import {useState} from "react";

export default function TodoApp() {

    const todoBaseUrl = "/api/todo";
    // Was ist ein State?
    // React Mechanismus, um Daten zu aktualisieren,
    // wenn diese sich ändern, wird neu gerendert

    // todos = Daten
    // setTodos = Funktionen um die Daten zu ändern
    const [todos, setTodos] = useState<Todo []>([])

    function getTodos() {
        // get weil HTTP GET
        // Eine Anfrage ist asynchron
        // Um auf die Antwort zu antworten SOBALD sie da ist,
        // arbeiten wir mit "Promises"
        axios.get(todoBaseUrl)
            // Was passiert, wenn die Anfrage erfolgreich war
            .then(todoListResponse => {
                const newTodoList: Todo[] = todoListResponse.data;
                setTodos(newTodoList)
            })
            // ... und wenn's schief läuft...?
            .catch(errorResponse => {
                console.log("ALARM! Es gab einen Fehler beim GET: " + errorResponse)
            })
    }

    return (
        <section>
            <h1>Beste Todo App wo geht</h1>
            <TodoList todosToMap={todos}/>
        </section>
    )
}