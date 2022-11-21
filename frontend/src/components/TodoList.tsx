// Komponentename + Props
import {Todo} from "../models/Todo";
import TodoItem from "./TodoItem";

type TodoListProps = {
    todosToMap: Todo []
}

// Erstellt eine Liste von den einzelnen Todo Komponenten
export default function TodoList(props: TodoListProps ) {

    const todoItemComponents = props.todosToMap.map(todoData => {
        return <TodoItem todoToDisplay={todoData} key={todoData.id} />
    })

    return (
        <section>
            {todoItemComponents}
        </section>
    )
}