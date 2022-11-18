import React, {useEffect, useState} from "react";
import "./TodoApp.css"
import TodoList from "./TodoList";
import axios from "axios";
import {Todo} from "../model/Todo";
import Search from "./Search";
import AddTodo from "./AddTodo";

export default function TodoApp() {

    const [allTodos, setAllTodos] = useState<Todo []>([])
    const [descriptionSearchQuery, setDescriptionSearchQuery] = useState<string>("")

    useEffect(() => {
        axios.get("/api/todo")
            .then(result => setAllTodos(result.data))
    }, [])

    function handleSearchChange(searchQuery: string) {
        setDescriptionSearchQuery(searchQuery)
    }

    function addTodo(newTodoWithoutId: Todo) {
        axios.post("/api/todo", newTodoWithoutId)
            .then(savedTodo => {
                // Wir aktualisieren den "allTodos" State und nutzen dafür den vorherigen State mittels
                // "prev" (= previous) + <stateName>
                // = prevAllTodos
                setAllTodos((prevTodos) => {
                    // Hier nutzen wir den "Spread Operator"
                    // https://stackoverflow.com/a/37002941

                    // Was passiert: mit den drei Punkten kopieren wir alles aus dem "prevTodos" Array
                    // und fügen das neue Element zur Liste hinzu
                    // mit return geben wir die neu erstellte Liste (alte Liste + neues Element) zurück
                    return [...prevTodos, savedTodo.data]
                })
            })
    }

    function deleteTodo(todoIdToDelete: string) {
        axios.delete("/api/todo/" + todoIdToDelete).then(
            () => {
                const updatedTodoList = allTodos.filter((todo) => todo.id !== todoIdToDelete)
                setAllTodos(updatedTodoList)
            }
        )
    }

    const filteredTodos = allTodos.filter(todo => todo.description.toLowerCase().includes(descriptionSearchQuery?.toLowerCase()))

    return (
        <div className={"TodoApp"}>
            <h1 >Beste Todo App wo geht</h1>
            <Search handleSearchChange={handleSearchChange}/>
            <TodoList todos={filteredTodos} handleFinishTodo={deleteTodo}/>
            <AddTodo handleAddTodo={addTodo} />
        </div>
    );
}