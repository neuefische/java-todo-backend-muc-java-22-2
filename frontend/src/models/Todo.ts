// Datenmodell
export type Todo = {
    id: string,
    description: string,
    // Mit dem "Pipe Operator" können wir Möglichkeiten festlegen
    status: "OPEN" | "IN_PROGRESS" | "DONE"
}