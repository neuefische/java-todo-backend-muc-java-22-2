export type Todo = {
    id: string,
    description: string,
    status: TodoStatus
}

export type TodoStatus = {
    status: "OPEN" | "IN_PROGRESS" | "DONE"
}