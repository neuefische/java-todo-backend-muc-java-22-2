import {Todo} from "../model/Todo";
import React from "react";

type TodoTileProps = {
    todo: Todo
}

export default function TodoTile(props: TodoTileProps) {

    return (
        <div>
            <div>Status: {props.todo.status}</div>
            <div>Beschreibung: {props.todo.description}</div>
        </div>
    );
}