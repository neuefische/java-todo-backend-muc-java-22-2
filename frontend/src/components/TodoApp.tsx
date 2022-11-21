// export default = Standardexport
import TodoList from "./TodoList";
import axios from "axios";
import {Todo} from "../models/Todo";
import {useEffect, useState} from "react";
import AddTodo from "./AddTodo";

export default function TodoApp() {

    const todoBaseUrl = "/api/todo";
    // Was ist ein State?
    // React Mechanismus, um Daten zu aktualisieren,
    // wenn diese sich ändern, wird neu gerendert

    // todos = Daten
    // setTodos = Funktionen um die Daten zu ändern
    const [todos, setTodos] = useState<Todo []>([])

    // Eine Funktion um "Seiteneffekte" zu verarbeiten
    // Wir nutzen useEffect um eine Endlosschleife zu vermeiden
    useEffect(() => {
        getTodos()
        // [] : useEffect wird beim ERSTEN Laden der Komponente aufgerufen
    }, [])

    function getTodos() {
        console.log("...Lese Todos vom Backend")
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
            .catch(errorMessageResponse => {
                console.log("ALARM! Es gab einen Fehler beim GET: " + errorMessageResponse)
            })
    }

    function addTodo(newTodoWithoutId: Todo) {
        axios.post(todoBaseUrl, newTodoWithoutId)
            .then(newTodoResponse => {
                // 3. Das neue Todo MIT der ID in der Liste speichern
                console.log("Early Christmas! Neues TODO: " + newTodoResponse.data)
            })
    }

    return (
        <section>
            <h1>Beste Todo App wo geht</h1>
            <TodoList todosToMap={todos}/>
            <AddTodo handleAddTodo={addTodo}/>
        </section>
    )
}