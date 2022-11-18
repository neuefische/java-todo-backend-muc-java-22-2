import React, {useEffect, useState} from "react";
import TodoList from "./TodoList";
import axios from "axios";
import {Todo} from "../model/Todo";

export default function TodoApp() {

    const [allTodos, setAllTodos] = useState<Todo []>([])
    const [descriptionSearchText, setDescriptionSearchText] = useState<string>("")

    useEffect(() => {
        axios.get("/api/todo")
            .then(result => setAllTodos(result.data))
    }, [])

    const filteredTodos = allTodos.filter(todo => todo.description.toLowerCase().includes(descriptionSearchText?.toLowerCase()))

    return (
        <div>
            <TodoList todos={filteredTodos} />
        </div>
    );
}