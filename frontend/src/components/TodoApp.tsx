import React, {useEffect, useState} from "react";
import TodoList from "./TodoList";
import axios from "axios";
import {Todo} from "../model/Todo";
import Search from "./Search";

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

    const filteredTodos = allTodos.filter(todo => todo.description.toLowerCase().includes(descriptionSearchQuery?.toLowerCase()))

    return (
        <div>
            <h1>Beste Todo App wo geht</h1>
            <Search handleSearchChange={handleSearchChange} />
            <TodoList todos={filteredTodos}/>
        </div>
    );
}