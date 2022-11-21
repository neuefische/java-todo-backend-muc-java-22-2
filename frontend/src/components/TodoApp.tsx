// export default = Standardexport
import TodoList from "./TodoList";
import axios from "axios";
import {Todo} from "../models/Todo";
import {useEffect, useState} from "react";
import AddTodo from "./AddTodo";
import Search from "./Search";

export default function TodoApp() {

    const todoBaseUrl = "/api/todo/";
    // Was ist ein State?
    // React Mechanismus, um Daten zu aktualisieren,
    // wenn diese sich ändern, wird neu gerendert

    // todos = Daten
    // setTodos = Funktionen um die Daten zu ändern
    const [todos, setTodos] = useState<Todo []>([])
    const [searchQuery, setSearchQuery] = useState<string>("")

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
                console.error("ALARM! Es gab einen Fehler beim GET: " + errorMessageResponse)
            })
    }

    function addTodo(newTodoWithoutId: Todo) {
        axios.post(todoBaseUrl, newTodoWithoutId)
            // Statuscode = Erfolgreich
            // Auf Antwort reagieren
            .then(newTodoResponse => addNewTodoToList(newTodoResponse.data))
            // Fehlercode
            .catch(errorMessageResponse => {
                console.error("ALARM! Es gab einen Fehler beim POST: " + errorMessageResponse)
            })
    }

    function addNewTodoToList(newTodo: Todo) {
        // Wir aktualisieren den "todoList" State und nutzen dafür den vorherigen State mittels
        // "prev" (= previous) + <stateName>
        // = prevTodoList
        setTodos(prevTodoList => {
            // Hier nutzen wir den "Spread Operator" = "..."
            // https://stackoverflow.com/a/37002941

            // Was passiert: mit den drei Punkten kopieren wir alles aus dem "prevTodos" Array
            // und fügen das neue Element zur Liste hinzu
            // mit return geben wir die neu erstellte Liste (alte Liste + neues Element) zurück

            // Was bei den Pünktchen unter der Haube passiert:
            // const newTodoList: Todo[] = []
            // for (const todo of prevTodoList) {
            //     newTodoList.push(todo)
            // }
            return [...prevTodoList, newTodo]
        })
    }

    function handleUpdateTodo(newTodo: Todo) {
        axios.put(todoBaseUrl + newTodo.id, newTodo)
            .then((updatedTodoResponse) => {
                setTodos((prevTodos) => {
                        const updatedTodo: Todo = updatedTodoResponse.data

                        return prevTodos.map((todo) => {
                            if (todo.id === updatedTodo.id) {
                                return updatedTodo
                            } else {
                                return todo
                            }
                        })
                    }
                )
            })
            .catch(errorMessageResponse => {
                console.error("ALARM! Es gab einen Fehler beim PUT: " + errorMessageResponse)
            })
    }

    function deleteTodo(todoIdToDelete: string) {
        axios.delete(todoBaseUrl + todoIdToDelete).then(
            () => {
                const updatedTodoList = todos.filter((todo) => todo.id !== todoIdToDelete)
                setTodos(updatedTodoList)
            }
        )
        .catch(errorMessageResponse => {
                console.error("ALARM! Es gab einen Fehler beim DELETE: " + errorMessageResponse)
        })
    }

    function updateSearchQuery(newSearchQuery: string) {
        setSearchQuery(newSearchQuery)
    }

    // Suche alle Todos, die in der Beschreibung den Suchbegriffen haben
    // Groß- und Kleinschreibung soll ignoriert werden via ".toLowerCase()"
    const filteredTodos = todos
        .filter(todo => todo.description.toLowerCase().includes(searchQuery.toLowerCase()))

    return (
        <section>
            <h1>Beste Todo App wo geht</h1>
            <Search handleSearchQueryChange={updateSearchQuery}/>
            <TodoList todosToMap={filteredTodos} handleUpdateTodo={handleUpdateTodo} handleFinishTodo={deleteTodo}/>
            <AddTodo handleAddTodo={addTodo}/>
        </section>
    )
}